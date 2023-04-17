# movies-explorer-api   
    Backend for practicum diplom

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
3. Clone the repo
4. install project dependencies: `npm install`
5. run the server: `npm run dev`

<br/>

----
### Project dependencies:
* `bcryptjs` - for hashing passwords
* `celebrate`, `joi` - for request data validation
* `cors` - for enabling CORS 
* `dotenv` - for storing environment variables
* `express` - for creating a server
* `express-rate-limit` - for limiting repeated requests
* `express-winston`, `winston` - for logging requests and errors
* `helmet` - for setting security HTTP headers
* `jsonwebtoken` - for creating JWT
* `mongoose` - for working with MongoDB 
* `validator` - for validating user data
  
### Dev dependencies:
* `nodemon` - for automatic server restart
* `eslint`, `eslint-config-airbnb-base`, `eslint-plugin-import` - for code linting