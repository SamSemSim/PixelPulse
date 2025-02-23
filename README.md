# 🎮 PixelPulse - Gaming News & Reviews

A modern gaming news and reviews platform built with React and Material-UI, powered by the RAWG Video Games Database API. Stay up-to-date with the latest gaming news, reviews, and discover new games across different platforms.

![PixelPulse Screenshot](screenshot.png)

## ✨ Features

- 🎯 **Latest Gaming News**: Stay updated with the newest game releases and updates
- 🏆 **Popular Games**: Discover top-rated games with detailed reviews and ratings
- 🎮 **Platform Filters**: Browse games by platform (PC, PlayStation, Xbox, Nintendo)
- 📱 **Responsive Design**: Modern, sleek interface that works on all devices
- 🌙 **Dark Theme**: Easy on the eyes with a beautiful dark mode interface
- 🔍 **Search**: Find your favorite games instantly

## 🚀 Technologies Used

- **Frontend Framework**: React 18
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **API**: RAWG Video Games Database
- **State Management**: React Hooks

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pixelpulse.git
   cd pixelpulse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Create a `.env` file in the root directory
   - Add your RAWG API key:
     ```env
     REACT_APP_RAWG_API_KEY=your_api_key_here
     ```
   - Get your API key from [RAWG](https://rawg.io/apidocs)

4. **Start the development server**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/        # React components
├── services/         # API services
├── theme.js          # MUI theme configuration
└── App.js            # Main app component
```

## 📸 Screenshots

### Home Page
![Home Page](home.png)

### Game Details
![Game Details](details.png)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [RAWG Video Games Database](https://rawg.io/) for their comprehensive gaming API
- [Material-UI](https://mui.com/) for the amazing component library
- All the contributors who help improve this project

---
⭐ Star this repo if you find it helpful!