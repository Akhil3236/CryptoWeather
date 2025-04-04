# CryptoWeather
# 🌍 Crypto & Weather Dashboard

## 📌 Project Overview
This Next.js web application fetches real-time **cryptocurrency prices** and **weather details** for a given city. The app features live updates through WebSockets and allows users to check historical weather data.

## 🚀 Features
- 🔄 **Live Crypto Price Updates** (via WebSockets)
- 🌤️ **Weather Search** (Enter city name to fetch weather data)
- 📊 **Historical Weather Data** (Last 30 days)
- 🚀 **Optimized for Deployment** on Vercel

## 🛠️ Tech Stack
- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **APIs Used:**
  - CoinCap API (for crypto prices)
  - OpenWeatherMap API (for weather data)
- **WebSockets:** Real-time price updates

## 🔧 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone  https://github.com/Akhil3236/CryptoWeather
cd crypto weather
```
### 2️⃣ Install Dependencies
```sh
npm install  # or yarn install
```
### 3️⃣ Set Up Environment Variables
Create a `.env.local` file in the root folder and add:
```sh
NEXT_PUBLIC_CRYPTO_API=https://api.coincap.io/v2/assets
NEXT_PUBLIC_WEATHER_API=https://api.openweathermap.org/data/2.5/forecast

```
### 4️⃣ Run the App Locally
```sh
npm run dev  # or yarn dev
```
App will be live at **http://localhost:3000** 🚀

## 📤 Deployment on Vercel


content :


This web application allows users to fetch real-time weather details of any city and track live cryptocurrency prices with just a few clicks.

🌤️ Weather Details
Track real-time prices of popular cryptocurrencies like Bitcoin, Ethereum, and more.
Search for any cryptocurrency by name to get live price, market cap, and 24-hour changes.
Data is fetched from CoinCap API to ensure fast and reliable updates
💰 Cryptocurrency Tracker
Enter a city name to get current weather conditions, including temperature, humidity, and weather status.
View the past 5 days weather history to analyze trends.
Powered by OpenWeatherMap API for accurate and up-to-date information.
Real-Time Notifications
Establish a WebSocket connection to receive price changes for BTC/ETH.
Display notifications (toast or dropdown) for significant price shifts or simulated weather alerts.
Shows the live prices of the some crypto


## 🤝 Contributing
Feel free to submit a pull request or open an issue if you have suggestions!

## 📧 Contact
akhiltuluri123@gmail.com


