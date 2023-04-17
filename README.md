# movies-explorer-api   
    Backend for practicum diplom
    IP: 84.252.137.92
    Domain: https://TBD
    Frontend: TBD

<br/>


### API endpoints:
* `POST /signup` - create a user
* `POST /signin` - login
* `GET /users/me` - get current user info
* `PATCH /users/me` - update current user info
* `GET /movies` - get all saved movies of the current user
* `POST /movies` - save a movie for the current user
* `DELETE /movies/{id}` - delete a movie by id


<br/>

----
### Steps to run the project locally:
1. install `Node.js` 18.0.0 or higher
2. install and run `MongoDB` (https://www.mongodb.com/docs/manual/administration/install-community/) 
3. clone the repo
4. run command: `cp .env.example .env`
5. install project dependencies: `npm install`
6. run the server: `npm run dev`

<br/>

----
### Project dependencies:
* `bcryptjs` - hashing passwords
* `celebrate`, `joi` - request data validation
* `cors` - enabling CORS 
* `dotenv` - storing environment variables
* `express` - creating a server
* `express-rate-limit` - limiting repeated requests
* `express-winston`, `winston` - logging requests and errors
* `helmet` - setting security HTTP headers
* `jsonwebtoken` - creating JWT
* `mongoose` - working with MongoDB 
* `validator` - validating user data
  
### Dev dependencies:
* `nodemon` - automatic server restart
* `eslint`, `eslint-config-airbnb-base`, `eslint-plugin-import` - code linting