# PixelPulse - Gaming News & Reviews

A modern gaming news and reviews platform built with React and Material-UI, powered by the RAWG Video Games Database API.

## Features

- Browse latest gaming news and updates
- View popular games with ratings and reviews
- Filter games by platform (PC, PlayStation, Xbox, Nintendo)
- Detailed game information including screenshots and ratings
- Modern, responsive UI with dark theme
- Real-time search functionality

## Technologies Used

- React 18
- Material-UI (MUI)
- React Router
- Axios
- RAWG Video Games Database API

## Getting Started

1. Clone the repository:
```bash
git clone [your-repo-url]
cd game-news-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your RAWG API key:
```
REACT_APP_RAWG_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
```

The application will start running at `http://localhost:3000`

## Project Structure

- `/src/components` - React components
- `/src/services` - API services and utilities
- `/src/theme.js` - Material-UI theme configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- RAWG Video Games Database for providing the API
- Material-UI team for the amazing component library
