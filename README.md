<h2 align="center">RESTful Ecommerce API v2 🚀</h2>

> Authentication middlewares haven't been tested yet (but feel free to test it out for yourself)

## 🔄 Built with

- NodeJS
- ExpressJS
- MySQL

## 🚩 How to install API

#### Fork and clone this repository using

   ```bash
   git clone https://github.com/sandip2224/RESTful-Ecommerce-API-Version_2.git
   ```   
#### Install dependencies and dev dependency using

   ```bash
   npm install
   npm install -D nodemon cross-env
   ```  

#### Create a _config.env_ file inside the _/config_ directory and add the following key-value pairs

   ```bash
   USER=<MySQL server username>
   PASS=<Local MySQL instance password>
   JWT_KEY=<Private JWT key>
   ```  

 #### Start the server locally at _localhost:3000_ using

   ```bash
   npm run dev
   ```
   
## 🔱 API Endpoints

### Products

```bash
GET    /api/v2/items
GET    /api/v2/items/:itemId
POST   /api/v2/items
PATCH  /api/v2/items/:itemId
DELETE /api/v2/items/:itemId
DELETE /api/v2/items
```

### Orders
To manage user order details:

```bash
GET    /api/v2/orders
GET    /api/v2/orders/:orderId
POST   /api/v2/orders
DELETE /api/v2/orders/:orderId
```

### Users
To manage user credentials and roles:

```bash
GET    /api/v2/users
GET    /api/v2/users/:userId
DELETE /api/v2/users/:userId
```

### Payments
To process pending payments on existing orders:

```bash
GET  /api/v2/payments
POST /api/v2/payments
```

### Register
To register a new user before login:

```bash
POST /api/v2/users/register
```

### Login
To login a user and generate a JWT token for accessing protected routes:

```bash
POST /api/v2/users/login
```

## 🎴 License

Distributed under the MIT License. See `LICENSE` for more information.

### 👩‍💻 Project Created & Maintained By - [Sandipan Das](https://linkedin.com/in/sandipan0164)
