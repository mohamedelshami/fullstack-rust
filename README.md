# Carbon Trading

A simple trading application developed with a full stack Rust, utilizing Axum for the backend and MongoDB as the database. The frontend is written using NextJS and React.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
  - [Using Docker](#using-docker)
- [How to Run](#how-to-run)
- [API Reference](#api-reference)

## Prerequisites

- Docker
- Docker-compose 2.12.2
- Node v16.x (for frontend)
- Yarn 1.22.19 (for frontend)
- Rust 1.71.1 (for backend if not using Docker)

## Setup

### Using Docker:

#### Build Backend:

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the Docker image for the backend:

   ```
   docker build -t carbon-sim .
   ```

3. List docker image to check that image `carbon-sim:latest` was created successfully

   ```
    docker image ls
   ```
#### Build Frontend:

1. Navigate to the frontend directory:
   ```bash
   cd ftontend
   ```
  
2. Build the Docker image for the frontend:

   ```
   docker build -t carbon-ui . 
   ```
3. List docker image to check that image `carbon-ui:latest` was created successfully

   ```
    docker image ls
   ```

## How to Run

Upon successful completion of the Docker builds, you should now have local images established for both the frontend and backend components.

Within the root directory of this project, designated as carbon-sim, there is a docker-compose file. This file has been configured to facilitate e2e initiation of MongoDB, the backend, and the frontend servers.

To execute these services, navigate to the root directory of the project and issue the following command:

  ```
   docker-compose up
   ```

This procedure will initiate and run the services in the foreground. Ensure you monitor the console output for any potential issues or confirmations of successful service launches.

<img width="1405" alt="Screenshot 2023-08-14 at 18 14 16" src="https://github.com/mohamedelshami/carbon-sim/assets/1651925/228e9824-417f-4903-baf9-bdac26ff0a92">

Open your web browser and navigate to:

```
http://localhost:3000
```

## API Reference

#### Create User

Create new user

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id`      | `string` | **Required**. The unique user_id |
| `name`      | `string` | **Required**. The provided name of the user |
| `balance`      | `decimal (64)` | **Required**. The initial balance of the user |

```shell
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice", "user_id": "alice", "balance": 1000}' \
  http://localhost:8787/users/create
```

#### Get user

```http
  GET /users/${user_id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id`      | `string` | **Required**. User Id of user to fetch |

**Example**

```shell
curl -X GET http://localhost:8787/users/alice
```

#### Get all users

```http
  GET /users
```

**Example**

```shell
curl -X GET http://localhost:8787/users
```

#### Transfer

Transfer balance between two users

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `sender`      | `string` | **Required**. User Id of the sender |
| `receiver`      | `string` | **Required**. User Id of the receiver |
| `amount`      | `string` | **Required**. The amount to be transferred |

```shell
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"sender": "alice", "receiver": "bob", "balance": 1000, "amount": 10}' \
  http://localhost:8787/transactions/transfer
```

#### Get all transactions

```http
  GET /transactions
```

**Example**

```shell
curl -X GET http://localhost:8787/transactions
```
