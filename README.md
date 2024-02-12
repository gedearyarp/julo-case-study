# [Julo Case Study] Mini Wallet API

## Contributors

This project is the creation of **I Gede Arya Raditya Parameswara** and was constructed specifically for the Julo Technical Assessment.

## Overview

The Mini Wallet API is a RESTful backend service designed to facilitate the management of a simple virtual wallet system. It provides endpoints for initializing an account for wallet operations, enabling and disabling a wallet, and managing virtual money transactions.

This project serves as a technical exercise for software engineering candidates, demonstrating their ability to construct a robust API service.

## Features

- **Initialize Account**: Set up a wallet account using a POST request.
- **Enable Wallet**: Activate the wallet through a POST request.
- **View Wallet Balance**: Retrieve the current balance with a GET request.
- **View Transactions**: List all wallet transactions with a GET request.
- **Add Virtual Money**: Deposit the wallet by posting to an endpoint.
- **Use Virtual Money**: Withdraw the wallet using a POST request.
- **Disable Wallet**: Deactivate the wallet with a PATCH request.

## How To Run

This Mini Wallet API is built and tested with Node.js version `20.2.0` and Yarn version `1.22.19`. Ensure you have these versions installed to run the application successfully.

Follow these steps to get the API up and running on your local environment:

1. **Clone the Repository**

   Begin by cloning the repository to your local machine using the following command:
    ```
    git clone https://github.com/gedearyarp/julo-case-study.git
    ```
2. **Install Dependencies**

    Navigate to the cloned directory and run the following command to install all the required dependencies:
    ```
    cd julo-case-study
    yarn install
    ```
3. **.env File**

    Since the `.env` file contains sensitive information and should not be committed to version control, it is not included in the repository. To obtain the `.env` file, please reach out to me directly on WhatsApp, and I will provide you with the necessary configuration.
4. **Start the Application**

    Once the dependencies are installed, you can start the application using Yarn:
    ```
    yarn run start
    ```

This will start the API server, typically on `http://localhost:3000`, unless configured otherwise. You can now make API calls to this server using a tool like Postman or any HTTP client of your choice.

## API Documentation

For ease of testing and to get started with the API endpoints quickly, we have provided a Postman collection. You can use the collection to send requests to the API without having to manually set them up.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/sarpras/workspace/sharing-workspace/collection/15708562-7595e312-6c8a-438a-b24e-9d4f5bf01ac8?action=share&creator=15708562)

Simply click the button above to import the Mini Wallet API collection into your Postman workspace.
