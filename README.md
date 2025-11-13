# Stock5 📈

A simple, clean stock market viewer with demo data. Everything in one HTML file!

## 🚀 Quick Start

Just open `index.html` in any web browser. That's it!

No build process, no dependencies, no installation needed.

## ✨ Features

- **8 Popular Stocks**: AAPL, MSFT, GOOGL, TSLA, AMZN, META, NVDA, NFLX
- **Auto-load**: Shows 4 stocks when you open the page
- **Search**: Type stock symbols (e.g., "AAPL" or "AAPL,MSFT,TSLA")
- **Quick Access**: Click any stock chip to view instantly
- **Responsive**: Works on desktop and mobile
- **Demo Data**: Static data for demonstration purposes

## 📋 How to Use

### Open the App
1. Double-click `index.html`
2. Or open it in any browser
3. Or use a local server: `python3 -m http.server 8080`

### Search for Stocks
- **Single stock**: Type `AAPL` and click Search
- **Multiple stocks**: Type `AAPL,MSFT,GOOGL` and click Search
- **Quick access**: Click any chip button (AAPL, MSFT, etc.)

### Available Stocks
- AAPL - Apple Inc.
- MSFT - Microsoft Corporation
- GOOGL - Alphabet Inc.
- TSLA - Tesla, Inc.
- AMZN - Amazon.com, Inc.
- META - Meta Platforms, Inc.
- NVDA - NVIDIA Corporation
- NFLX - Netflix, Inc.

## 🎨 What's Displayed

Each stock card shows:
- Stock symbol and company name
- Current price
- Price change (absolute and percentage)
- Day high and low
- Trading volume
- Market capitalization

## 💡 Technical Details

- **Single HTML file**: All CSS and JavaScript inline
- **No frameworks**: Pure HTML, CSS, and vanilla JavaScript
- **No API calls**: Uses static demo data
- **Instant load**: No loading delays
- **Lightweight**: ~12KB total size

## ⚠️ Important Notes

- This app uses **demo data only**
- Data is static and for educational purposes
- **Not for real trading or investment decisions**
- No live market data

## 📁 File Structure

```
Stock5/
├── index.html        # Complete app (CSS + JS + HTML)
├── README.md         # This file
├── app.js.old       # Old separate JS (archived)
└── styles.css.old   # Old separate CSS (archived)
```

## 🔧 Customization

To modify stock data, edit the `stocks` object in the `<script>` section of `index.html`:

```javascript
const stocks = {
    'AAPL': {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 189.25,
        // ... more properties
    }
};
```

## 📄 License

Open source - feel free to use and modify!

---

**Built with simplicity in mind - just HTML, CSS, and JavaScript**
