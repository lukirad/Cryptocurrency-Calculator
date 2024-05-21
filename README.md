# README

## Cryptocurrency Calculator

This project is a web application that allows users to convert different types of currencies to cryptocurrencies and vice versa.

### Features

- Convert from a variety of currencies to different cryptocurrencies.
- Convert from a variety of cryptocurrencies to different currencies.
- User-friendly interface with easy navigation.
- User registration and login functionality.
- Utilizes the CoinGecko REST API for real-time cryptocurrency data.

### Technologies Used

- Django and Python for backend
- HTML, CSS, and JavaScript for frontend
- Select2 plugin for customizable select boxes
- CoinGecko REST API for real-time cryptocurrency data

### Installation

1. Clone the repository
2. Install the required Python packages by running `pip install -r requirements.txt`
3. Generate a new secret key by running the following Python command in your terminal: `python -c "import secrets; print(secrets.token_hex(24))"`
4. Create a `.env` file in the project root and add your secret key in the format `SECRET_KEY=your_secret_key_here`
5. Generate your own API key from CoinGecko (see the "API Key Setup" section) and add it to the `.env` file in the format `API_KEY=your_api_key_here`
6. Start the Django server by running `python manage.py runserver`
7. Access the application at `localhost:8000`

### API Key Setup

For this project to work, you need to generate your own API key from CoinGecko. Follow the instructions in this [User Guide](https://support.coingecko.com/hc/en-us/articles/21880397454233-User-Guide-How-to-sign-up-for-CoinGecko-Demo-API-and-generate-an-API-key) to sign up for CoinGecko Demo API and generate an API key.

### Files

- `index.js`: Main JavaScript file for frontend logic.
- `settings.py`: Django settings file for the project.
- `views.py`: Django views file for handling requests.
- `register.html`: HTML file for the registration page.
- `login.html`: HTML file for the login page.
- `layout.html`: Base HTML layout file.
- `index.html`: Main HTML file for the home page.
- `requirements.txt`: Contains all the Python dependencies.
