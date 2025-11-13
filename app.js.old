// ===========================
// App Configuration
// ===========================
const CONFIG = {
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
// DOM Elements (initialized in init())
// ===========================
let elements = {};

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
// Demo Data (fallback when API is unavailable)
// ===========================
const DEMO_DATA = {
    'AAPL': {
        symbol: 'AAPL',
        longName: 'Apple Inc.',
        shortName: 'Apple',
        regularMarketPrice: 189.25,
        regularMarketChange: 2.15,
        regularMarketChangePercent: 1.15,
        regularMarketDayHigh: 190.50,
        regularMarketDayLow: 187.20,
        regularMarketVolume: 52341000,
        marketCap: 2950000000000,
        currency: 'USD',
        exchange: 'NASDAQ',
        quoteType: 'EQUITY',
        marketState: 'CLOSED',
        fiftyTwoWeekHigh: 199.62,
        fiftyTwoWeekLow: 164.08,
        previousClose: 187.10
    },
    'MSFT': {
        symbol: 'MSFT',
        longName: 'Microsoft Corporation',
        shortName: 'Microsoft',
        regularMarketPrice: 378.91,
        regularMarketChange: 4.23,
        regularMarketChangePercent: 1.13,
        regularMarketDayHigh: 380.15,
        regularMarketDayLow: 375.50,
        regularMarketVolume: 18234000,
        marketCap: 2820000000000,
        currency: 'USD',
        exchange: 'NASDAQ',
        quoteType: 'EQUITY',
        marketState: 'CLOSED',
        fiftyTwoWeekHigh: 384.30,
        fiftyTwoWeekLow: 309.45,
        previousClose: 374.68
    },
    'GOOGL': {
        symbol: 'GOOGL',
        longName: 'Alphabet Inc.',
        shortName: 'Alphabet',
        regularMarketPrice: 142.58,
        regularMarketChange: 1.87,
        regularMarketChangePercent: 1.33,
        regularMarketDayHigh: 143.25,
        regularMarketDayLow: 140.90,
        regularMarketVolume: 24156000,
        marketCap: 1780000000000,
        currency: 'USD',
        exchange: 'NASDAQ',
        quoteType: 'EQUITY',
        marketState: 'CLOSED',
        fiftyTwoWeekHigh: 151.55,
        fiftyTwoWeekLow: 121.46,
        previousClose: 140.71
    },
    'TSLA': {
        symbol: 'TSLA',
        longName: 'Tesla, Inc.',
        shortName: 'Tesla',
        regularMarketPrice: 242.84,
        regularMarketChange: -3.21,
        regularMarketChangePercent: -1.30,
        regularMarketDayHigh: 248.50,
        regularMarketDayLow: 241.20,
        regularMarketVolume: 98234000,
        marketCap: 771000000000,
        currency: 'USD',
        exchange: 'NASDAQ',
        quoteType: 'EQUITY',
        marketState: 'CLOSED',
        fiftyTwoWeekHigh: 299.29,
        fiftyTwoWeekLow: 138.80,
        previousClose: 246.05
    },
    'AMZN': {
        symbol: 'AMZN',
        longName: 'Amazon.com, Inc.',
        shortName: 'Amazon',
        regularMarketPrice: 178.35,
        regularMarketChange: 2.45,
        regularMarketChangePercent: 1.39,
        regularMarketDayHigh: 179.80,
        regularMarketDayLow: 176.20,
        regularMarketVolume: 43250000,
        marketCap: 1850000000000,
        currency: 'USD',
        exchange: 'NASDAQ',
        quoteType: 'EQUITY',
        marketState: 'CLOSED',
        fiftyTwoWeekHigh: 201.20,
        fiftyTwoWeekLow: 139.52,
        previousClose: 175.90
    },
    'META': {
        symbol: 'META',
        longName: 'Meta Platforms, Inc.',
        shortName: 'Meta',
        regularMarketPrice: 485.50,
        regularMarketChange: 6.75,
        regularMarketChangePercent: 1.41,
        regularMarketDayHigh: 488.20,
        regularMarketDayLow: 481.30,
        regularMarketVolume: 15230000,
        marketCap: 1240000000000,
        currency: 'USD',
        exchange: 'NASDAQ',
        quoteType: 'EQUITY',
        marketState: 'CLOSED',
        fiftyTwoWeekHigh: 501.85,
        fiftyTwoWeekLow: 279.43,
        previousClose: 478.75
    },
    'NVDA': {
        symbol: 'NVDA',
        longName: 'NVIDIA Corporation',
        shortName: 'NVIDIA',
        regularMarketPrice: 875.28,
        regularMarketChange: 12.34,
        regularMarketChangePercent: 1.43,
        regularMarketDayHigh: 879.50,
        regularMarketDayLow: 868.40,
        regularMarketVolume: 28450000,
        marketCap: 2160000000000,
        currency: 'USD',
        exchange: 'NASDAQ',
        quoteType: 'EQUITY',
        marketState: 'CLOSED',
        fiftyTwoWeekHigh: 974.00,
        fiftyTwoWeekLow: 403.85,
        previousClose: 862.94
    },
    'NFLX': {
        symbol: 'NFLX',
        longName: 'Netflix, Inc.',
        shortName: 'Netflix',
        regularMarketPrice: 625.40,
        regularMarketChange: -4.55,
        regularMarketChangePercent: -0.72,
        regularMarketDayHigh: 632.10,
        regularMarketDayLow: 623.75,
        regularMarketVolume: 3240000,
        marketCap: 270000000000,
        currency: 'USD',
        exchange: 'NASDAQ',
        quoteType: 'EQUITY',
        marketState: 'CLOSED',
        fiftyTwoWeekHigh: 697.49,
        fiftyTwoWeekLow: 442.60,
        previousClose: 629.95
    }
};

// ===========================
// API Functions
// ===========================

/**
 * Fetch stock data - uses demo data
 */
async function fetchStockData(symbols) {
    console.log('fetchStockData called with:', symbols);
    console.log('DEMO_DATA defined:', typeof DEMO_DATA);

    const symbolArray = Array.isArray(symbols) ? symbols : [symbols];
    console.log('symbolArray:', symbolArray);
    const results = [];

    for (const symbol of symbolArray) {
        const upperSymbol = symbol.toUpperCase();
        console.log('Looking for:', upperSymbol);
        const stockData = DEMO_DATA[upperSymbol];
        console.log('Found data:', stockData ? 'YES' : 'NO');
        if (stockData) {
            results.push(stockData);
        }
    }

    console.log('Total results:', results.length);
    if (results.length === 0) {
        throw new Error('Stock symbol not found. Available: AAPL, MSFT, GOOGL, TSLA, AMZN, META, NVDA, NFLX');
    }

    return results;
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
    if (!symbols || (typeof symbols === 'string' && symbols.trim() === '')) {
        showError('Invalid Input', 'Please enter a stock symbol (AAPL, MSFT, GOOGL, TSLA, AMZN, META, NVDA, NFLX)');
        return;
    }

    try {
        showLoading();

        // Clean and split symbols if string
        let symbolArray;
        if (typeof symbols === 'string') {
            symbolArray = symbols
                .toUpperCase()
                .split(',')
                .map(s => s.trim())
                .filter(s => s.length > 0);
        } else {
            symbolArray = symbols;
        }

        if (symbolArray.length === 0) {
            showError('Invalid Input', 'Please enter valid stock symbols');
            return;
        }

        const stockData = await fetchStockData(symbolArray);
        state.currentStocks = stockData;
        displayStocks(stockData);
    } catch (error) {
        showError(
            'Stock Not Found',
            error.message
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
    // Load popular stocks by default
    const defaultSymbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA'];
    await searchStocks(defaultSymbols.join(','));
}

// ===========================
// Initialization
// ===========================

/**
 * Initialize DOM elements
 */
function initElements() {
    elements = {
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
    console.log('DOM elements initialized');
}

/**
 * Initialize the application
 */
function init() {
    console.log('Stock5 Application Starting...');
    initElements();
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
