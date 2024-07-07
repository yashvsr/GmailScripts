# Gmail Email Fetcher

This project is a simple Node.js application that fetches and displays the sender and subject of the last 200 emails from a Gmail account using the Gmail API.

## Features

- Authenticates with Gmail using OAuth 2.0
- Fetches the last 200 emails from the authenticated Gmail account
- Displays the sender and subject of each email
- Includes a basic HTTP server with a `/fetch-emails` endpoint

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your local machine
- A Google Cloud Platform project with the Gmail API enabled
- OAuth 2.0 credentials (Client ID and Client Secret) for your Google Cloud Platform project

## Installation

1. Clone this repository
2. Navigate to the project directory
3. Install the required dependencies
4. Set up your Gmail API credentials
- Replace `CLIENT_ID`, `CLIENT_SECRET`, and `REDIRECT_URI` in `gmailFetcher.js` with your own credentials

## Usage

1. Run the application:
2. The server will start running at `http://127.0.0.1:3000/`
3. On first run, you'll be prompted to authorize the application. Follow the provided URL and enter the authorization code.
4. The application will fetch and display the last 200 emails from your Gmail account.
