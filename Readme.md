# User Tracker

![Image0](https://github.com/xxrom/user_tracker/assets/14174697/049fde38-0c83-41e3-9ac4-d9e8b2b08109)

---

User Tracker is an open-source analytics tool inspired by Google Analytics.

It is designed to capture and analyze user interactions on websites, providing insights similar to those offered by major analytics services.

## Features

- **Event Tracking**: Captures user interactions similar to how Google Analytics operates.
- **Custom snippet**: Implemented custom snippet with similar to Google Analytics Snippet.
- **Real-time Analytics**: Process and analyze data as it comes into the backend in real-time.
- **Data Persistence**: Uses MongoDB to store event data, ensuring that event data is stored efficiently and reliably.
- **Mongoose**: Implemented MongoDB data type validation.

### Prerequisites

- Node.js (v18 or newer recommended)
- MongoDB
- yarn

## How to clone and install

```
git clone https://github.com/xxrom/user_tracker.git

cd user_tracker

yarn
```

## Setup .env

Create a `.env` file from `.env.example` in the backend directory:

```
MONGO_URL="mongodb://admin:admin@localhost:27017/"
PORT0=8888
PORT1=50000
```

## How to run project

- dev mode

```
yarn dev
```

- prod mode

```
yarn build && yarn start
```

Navigate to [http://localhost:3000/1.html](http://localhost:3000/1.html)

## k3s deploy

check all deployments
`kubectl get deployments --all-namespaces`

## Tech stack:

- yarn monorepo
- husky

Front:

- next.js
- prettier

Backend:

- fastify
- mongoDB
- mongoose
- prettier
