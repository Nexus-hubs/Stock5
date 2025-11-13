# Stock5 📈

A modern, elegant web application for viewing real-time stock market data from Yahoo Finance. Built with vanilla JavaScript, HTML5, and CSS3 - no frameworks required!

## ✨ Features

- **Real-time Stock Data** - Fetch live stock quotes from Yahoo Finance API
- **Responsive Design** - Optimized for both mobile and desktop devices
- **Dark Mode** - Toggle between light and dark themes with persistent storage
- **Popular Stocks** - Quick access to commonly traded stocks (AAPL, MSFT, GOOGL, etc.)
- **Multi-stock Search** - Search for multiple stocks at once (comma-separated)
- **Comprehensive Data** - View price, change, volume, market cap, 52-week highs/lows, and more
- **Elegant UI** - Modern card-based design with smooth animations
- **Auto-load** - Default stocks load automatically on page load

## 🚀 Getting Started

### Local Development

1. Clone this repository
2. Open `index.html` in your web browser
3. That's it! No build process or dependencies required

You can use any local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

Then open your browser to `http://localhost:8000`

## 📖 Usage

### Searching for Stocks

1. **Use the search bar**: Type a stock symbol (e.g., `AAPL`) and click Search or press Enter
2. **Search multiple stocks**: Enter comma-separated symbols (e.g., `AAPL,MSFT,TSLA`)
3. **Click popular stocks**: Click any of the popular stock chips for quick access

### Stock Information Displayed

Each stock card shows:
- **Symbol & Company Name**
- **Current Price** with currency
- **Price Change** (absolute and percentage)
- **Day High/Low**
- **Trading Volume**
- **Market Capitalization**
- **52-Week High/Low** (when available)
- **Exchange, Quote Type, Market State**

### Dark Mode

Click the sun/moon icon in the header to toggle between light and dark themes. Your preference is saved automatically.

## 🔧 Technical Details

### API

This application uses the Yahoo Finance public API:

- **Endpoint**: `https://query1.finance.yahoo.com/v7/finance/quote`
- **Parameters**: `symbols` (comma-separated stock symbols)
- **CORS Handling**: Includes fallback to CORS proxy if needed

### Technologies

- **HTML5** - Semantic markup
- **CSS3** - Modern features (Grid, Flexbox, CSS Variables, Animations)
- **Vanilla JavaScript** - No frameworks or libraries
- **Yahoo Finance API** - Real-time stock data

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎨 Design Features

- Mobile-first responsive design
- CSS Grid and Flexbox layouts
- Smooth transitions and animations
- Accessible color contrast (WCAG compliant)
- System font stack with Inter as primary typeface
- Custom SVG icons
- Card-based UI with elevation shadows

## ⚠️ Important Notes

- **Market Data Delays**: Yahoo Finance data may have slight delays
- **Not Investment Advice**: This tool is for informational purposes only
- **CORS Limitations**: Due to browser CORS policies, a proxy may be used for API requests
- **Rate Limiting**: Yahoo Finance may rate-limit requests

## 🔐 Security & Privacy

- No user data is collected or stored (except theme preference in localStorage)
- All API requests go directly to Yahoo Finance (or through a CORS proxy)
- No analytics or tracking
- Open source - inspect the code yourself!

## 🛠️ Customization

### Adding More Popular Stocks

Edit the `CONFIG.defaultStocks` array in `app.js`:

```javascript
const CONFIG = {
    defaultStocks: ['AAPL', 'MSFT', 'GOOGL', 'YOUR_SYMBOL']
};
```

### Changing Theme Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary: #3b82f6;  /* Your brand color */
    /* ... other variables */
}
```

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork, modify, and submit pull requests!

## 📞 Support

For issues or questions, please open an issue on the GitHub repository.

---

**Built with ❤️ using vanilla web technologies**

**Data provided by Yahoo Finance • Not investment advice**
