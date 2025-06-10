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

3. Configure your Azure credentials in `config/.env` with the following environment variables:
   ```
   REACT_APP_AZURE_API_ENDPOINT=your-azure-endpoint
   REACT_APP_AZURE_API_KEY=your-azure-key
   ```
   Replace `your-azure-endpoint` and `your-azure-key` with your Azure AI Health Insights service credentials.

## Usage

To start the application in development mode with hot reloading, run:

```bash
npm run dev
```

For production build and server:

```bash
npm start
```

The development server will run on `http://localhost:3000` with the API server on `http://localhost:3001`.

## API Endpoints

The application communicates with the Azure AI Health Insights API through the following endpoints:

- `GET /api/health-insights`: Fetch health insights data based on user configuration.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.