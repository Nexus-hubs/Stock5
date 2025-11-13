// ===========================
// App Configuration
// ===========================
const CONFIG = {
    apiEndpoint: 'https://query1.finance.yahoo.com/v7/finance/quote',
    corsProxy: 'https://api.allorigins.win/raw?url=',
    defaultStocks: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX']
};

// ===========================
// State Management
// ===========================
const state = {
    currentStocks: [],
    theme: localStorage.getItem('theme') || 'light'
};

// ===========================
// DOM Elements
// ===========================
const elements = {
    searchInput: document.getElementById('searchInput'),
    searchButton: document.getElementById('searchButton'),
    popularStocks: document.querySelectorAll('.stock-chip'),
    loadingState: document.getElementById('loadingState'),
    errorState: document.getElementById('errorState'),
    errorTitle: document.getElementById('errorTitle'),
    errorMessage: document.getElementById('errorMessage'),
    resultsSection: document.getElementById('resultsSection'),
    stockGrid: document.getElementById('stockGrid'),
    themeToggle: document.getElementById('themeToggle')
};

// ===========================
// Utility Functions
// ===========================

/**
 * Format number with commas and decimal places
 */
function formatNumber(num, decimals = 2) {
    if (num === null || num === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(num);
}

/**
 * Format large numbers (K, M, B, T)
 */
function formatLargeNumber(num) {
    if (num === null || num === undefined) return 'N/A';

    const absNum = Math.abs(num);

    if (absNum >= 1e12) {
        return (num / 1e12).toFixed(2) + 'T';
    } else if (absNum >= 1e9) {
        return (num / 1e9).toFixed(2) + 'B';
    } else if (absNum >= 1e6) {
        return (num / 1e6).toFixed(2) + 'M';
    } else if (absNum >= 1e3) {
        return (num / 1e3).toFixed(2) + 'K';
    }

    return formatNumber(num, 0);
}

/**
 * Format volume numbers
 */
function formatVolume(volume) {
    return formatLargeNumber(volume);
}

/**
 * Get change arrow SVG
 */
function getChangeArrow(isPositive) {
    if (isPositive) {
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="18 15 12 9 6 15"/>
        </svg>`;
    } else {
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"/>
        </svg>`;
    }
}

// ===========================
// API Functions
// ===========================

/**
 * Fetch stock data from Yahoo Finance API
 */
async function fetchStockData(symbols) {
    try {
        const symbolsParam = Array.isArray(symbols) ? symbols.join(',') : symbols;
        const url = `${CONFIG.apiEndpoint}?symbols=${encodeURIComponent(symbolsParam)}`;

        // Try direct request first
        let response;
        try {
            response = await fetch(url);
        } catch (corsError) {
            // If CORS fails, use proxy
            console.log('Using CORS proxy...');
            const proxyUrl = CONFIG.corsProxy + encodeURIComponent(url);
            response = await fetch(proxyUrl);
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.quoteResponse || !data.quoteResponse.result || data.quoteResponse.result.length === 0) {
            throw new Error('No data found for the requested symbol(s)');
        }

        return data.quoteResponse.result;
    } catch (error) {
        console.error('Error fetching stock data:', error);
        throw error;
    }
}

// ===========================
// UI Functions
// ===========================

/**
 * Show loading state
 */
function showLoading() {
    elements.loadingState.classList.add('active');
    elements.errorState.classList.remove('active');
    elements.resultsSection.classList.remove('active');
}

/**
 * Hide loading state
 */
function hideLoading() {
    elements.loadingState.classList.remove('active');
}

/**
 * Show error state
 */
function showError(title, message) {
    elements.errorTitle.textContent = title;
    elements.errorMessage.textContent = message;
    elements.errorState.classList.add('active');
    elements.loadingState.classList.remove('active');
    elements.resultsSection.classList.remove('active');
}

/**
 * Hide error state
 */
function hideError() {
    elements.errorState.classList.remove('active');
}

/**
 * Create stock card HTML
 */
function createStockCard(stock) {
    const isPositive = stock.regularMarketChange >= 0;
    const changeClass = isPositive ? 'positive' : 'negative';
    const changePercent = stock.regularMarketChangePercent || 0;
    const changeValue = stock.regularMarketChange || 0;

    return `
        <div class="stock-card">
            <div class="stock-header">
                <div class="stock-info">
                    <h3>${stock.symbol}</h3>
                    <span class="stock-name">${stock.longName || stock.shortName || 'N/A'}</span>
                </div>
                <div class="stock-price">
                    <span class="current-price">
                        ${formatNumber(stock.regularMarketPrice || 0)}
                        <span class="currency">${stock.currency || 'USD'}</span>
                    </span>
                    <div class="price-change ${changeClass}">
                        ${getChangeArrow(isPositive)}
                        <span>${isPositive ? '+' : ''}${formatNumber(changeValue)} (${isPositive ? '+' : ''}${formatNumber(changePercent)}%)</span>
                    </div>
                </div>
            </div>

            <div class="stock-details">
                <div class="detail-item">
                    <span class="detail-label">Day High</span>
                    <span class="detail-value">${formatNumber(stock.regularMarketDayHigh || 0)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Day Low</span>
                    <span class="detail-value">${formatNumber(stock.regularMarketDayLow || 0)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Volume</span>
                    <span class="detail-value">${formatVolume(stock.regularMarketVolume || 0)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Market Cap</span>
                    <span class="detail-value">${formatLargeNumber(stock.marketCap || 0)}</span>
                </div>
            </div>

            <div class="stock-meta">
                <div class="meta-item">
                    <span class="meta-badge">${stock.exchange || 'N/A'}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-badge">${stock.quoteType || 'N/A'}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-badge">${stock.marketState || 'N/A'}</span>
                </div>
                ${stock.fiftyTwoWeekHigh ? `
                <div class="meta-item">
                    <span style="font-size: 0.75rem;">52W High: ${formatNumber(stock.fiftyTwoWeekHigh)}</span>
                </div>
                ` : ''}
                ${stock.fiftyTwoWeekLow ? `
                <div class="meta-item">
                    <span style="font-size: 0.75rem;">52W Low: ${formatNumber(stock.fiftyTwoWeekLow)}</span>
                </div>
                ` : ''}
            </div>
        </div>
    `;
}

/**
 * Display stock data
 */
function displayStocks(stocks) {
    elements.stockGrid.innerHTML = stocks.map(stock => createStockCard(stock)).join('');
    elements.resultsSection.classList.add('active');
    hideLoading();
    hideError();
}

/**
 * Search for stocks
 */
async function searchStocks(symbols) {
    if (!symbols || symbols.trim() === '') {
        showError('Invalid Input', 'Please enter a stock symbol');
        return;
    }

    try {
        showLoading();

        // Clean and split symbols
        const symbolArray = symbols
            .toUpperCase()
            .split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        const stockData = await fetchStockData(symbolArray);
        state.currentStocks = stockData;
        displayStocks(stockData);
    } catch (error) {
        showError(
            'Unable to Fetch Stock Data',
            error.message || 'Please check the symbol and try again. Make sure you have an internet connection.'
        );
    }
}

// ===========================
// Theme Functions
// ===========================

/**
 * Initialize theme
 */
function initTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
}

/**
 * Toggle theme
 */
function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('theme', state.theme);
}

// ===========================
// Event Listeners
// ===========================

/**
 * Initialize event listeners
 */
function initEventListeners() {
    // Search button click
    elements.searchButton.addEventListener('click', () => {
        const query = elements.searchInput.value.trim();
        searchStocks(query);
    });

    // Search input enter key
    elements.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = elements.searchInput.value.trim();
            searchStocks(query);
        }
    });

    // Popular stock chips
    elements.popularStocks.forEach(chip => {
        chip.addEventListener('click', () => {
            const symbol = chip.getAttribute('data-symbol');
            elements.searchInput.value = symbol;
            searchStocks(symbol);
        });
    });

    // Theme toggle
    elements.themeToggle.addEventListener('click', toggleTheme);
}

// ===========================
// Auto-load Feature
// ===========================

/**
 * Load default stocks on page load
 */
async function loadDefaultStocks() {
    try {
        // Load a few popular stocks by default
        const defaultSymbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA'];
        await searchStocks(defaultSymbols.join(','));
    } catch (error) {
        console.log('Could not load default stocks:', error);
        // Silently fail - user can search manually
    }
}

// ===========================
// Initialization
// ===========================

/**
 * Initialize the application
 */
function init() {
    console.log('Stock5 Application Starting...');
    initTheme();
    initEventListeners();
    loadDefaultStocks();
    console.log('Stock5 Application Ready!');
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
