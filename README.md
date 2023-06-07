# Wallet App API (Back-End)

## Intro

This is an API created using Node.js, Express and PostGres.
The main goal is to create an application that controls the user finances.

## Requirements

- Node.js
- Docker

## Steps to run this project

1. Clone the project

```
git clone https://github.com/davif13/wallet-app-backend.git
```

2. Navigate to project folder and install dependencies

```
cd wallet-app-backend
npm install
```

3. Create an PostGres instance at Docker
   Example:

```
docker run --name postgres-finances -e POSTGRES_PASSWORD=docker -e POSTGRES_USER=docker -p 5432:5432 -d -t postgres
```

4. Create a .env file in root following the example

```
DB_USER=docker
DB_PASSWORD=docker
DB_NAME=finances
DB_HOST=localhost
DB_PORT=5432
```

5. Run config script to create database and table

```
npm run config:init
OBS: If it don't stop, press CTRL + C
```

6. Run the project in dev version

```
npm run start:dev
```

7. Run the project in dev version

```
npm run start
```

# Documentation:

Use Insomnia to import the file below:
https://github.com/davif13/wallet-app-backend/blob/main/insomnia.json
