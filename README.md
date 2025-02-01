# E-Commerce Project

This project is an e-commerce application built with NestJS and MongoDB. It includes authentication, order processing, and integration with AWS services.

## Features

- **MongoDB Collections**:
  - `user`: Stores user information.
  - `products`: Contains details about products available for purchase.
  - `cart`: Holds the user's cart items before placing an order.
  - `order`: Stores order details once a user submits an order.

- **Authentication**: 
  - Users can authenticate and register through JWT authentication.

- **Order Processing**:
  - When an order is submitted, it is sent to an AWS SQS (Simple Queue Service) queue.

- **AWS Lambda**:
  - A serverless repository contains an AWS Lambda function that consumes the order from the SQS queue and updates the order information in the MongoDB database. https://github.com/Gabicolombo/order-consumer

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **MongoDB**: A NoSQL database used to store user, product, cart, and order data.
- **AWS SQS**: Amazon Simple Queue Service is used to decouple and manage messages between services.
- **AWS Lambda**: A serverless compute service that processes the order data asynchronously.

## Setup

### Prerequisites

- Node.js
- MongoDB
- AWS Account (for SQS and Lambda setup)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```
2. Install dependencies:
  ```bash
  npm install
  ```
3. Set up your environment variables for MongoDB, AWS, and authentication.
4. Run the application:
  ```bash
  npm run start
  ```

### Project Idea
https://roadmap.sh/projects/ecommerce-api