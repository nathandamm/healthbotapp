# Azure Health Insights Demo

This project is a demonstration application for the Azure AI Health Insights endpoint. It features a clean and vibrant front-end user interface, allowing users to trial and explore the capabilities of the Azure AI Health Insights service. The application includes back-end integrations for manual entry of API endpoints and keys.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User-friendly interface for entering API endpoints and keys.
- Dashboard for an overview of health insights data.
- Results viewer to display data retrieved from the Azure AI Health Insights API.
- Configurable settings for API integration.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/azure-health-insights-demo.git
   cd azure-health-insights-demo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `config` directory based on the `.env.example` template, and fill in your Azure API keys and endpoints.

## Usage

To start the application, run the following command:

```bash
npm start
```

This will start both the front-end and back-end servers. You can access the application in your web browser at `http://localhost:3000`.

## API Endpoints

The application communicates with the Azure AI Health Insights API through the following endpoints:

- `GET /api/health-insights`: Fetch health insights data based on user configuration.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.