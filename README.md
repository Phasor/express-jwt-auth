## Basic JWT Authentication Using Passport.js

Uses passport-jwt strategy.

It uses the private key here to sign the jwt. The private key would be held privately on the Express server. Here it is exposed. Generate a new one locally and use that when using in prpoduction:

`node generateKeypair.js`

Create a .env with the following variables:
* DB_STRING=[your db connection string]
* NODE_ENV=
* DB_STRING_PROD=

### Run the Express App
`nodemon app.js`

### Send a Test GET to Protected Route
Use requests setup in `test.rest`.

First login by sending POST to /users/login

Send a GET to /users/protected ensuring you send the JWT token gained from /users/login as the Authorization header, ensuring you include the word Bearer and the space. You should be able to access the protected route.

#### Links:

* Written - https://www.zachgollwitzer.com/posts/2020/passport-js/
* Video - https://www.youtube.com/playlist?list=PLYQSCk-qyTW2ewJ05f_GKHtTIzjynDgjK
