## DAY 1 

## DATE 24 JAN 2025

Install nodemon 
Created nodemon.json

```
    {
        "watch": ["src"],
        "ext": "js,json",
        "ignore": ["node_modules"],
        "exec": "node src/index.js"
    }
```
Run main file index file by `nodemon`

Install `express mongoose dotenv`


## DAY 2

## DATE 25 JAN 2025

Refactor files 
  - docker-composer 
  - index

First, to reflect changes made in the file must get reflected in the container's dir `:/usr/src/app` for that we use 
volume
```
    volumes:
      - .:/usr/src/app
```
however, in dev mode we want auto restart system, for that we have to run nodemon using docker by overriding command

```
    command: npm run dev
```

Also, keep db credentials in the .env file


To run mongo inside from the container

1. docker exec -it mongo bash
2. run mongoose: mongosh -u root -p example --authenticationDatabase admin
3. show databases; use ecommerce;
3. show collections //Cmd: for listing collections
4. db.products.find() // list documents of a particular collection


Also, new routes are added for CRUD operation on product document

Besides, custom functions can also added in the model as shown below 
```}, {
    statics: {
        findByName(name) {
            return this.find({ name: name });
        }
    }
```


## DAY 3

## DATE 26 JAN 2025

Support registering users
Use jsonwebtoken for authentication and information exchange


Use Argon2 hashing algorithm for storing password.

Also, use pre save hooks to save hashed password.

Note: to remove all records in mongodb `db.users.remove({})`


. Added Cart Module, with 1-1 association User and 1-n association with Product

. Added middleware to fetchLoggedIn user details via jwt
. for that first, get the token when user log in then pass as a bearer token via postman 
  ![img.png](img.png)
. from req object logged-in user details are retrieved

## DAY 4-5

## DATE 9 FEB 2025

Install React for front-end
commands:
> yarn install vite@latest

Also, install bun over yarn and npm
with this we can locally run dev like
> bun dev

## DAY 6-7-8-9-10

## DATE 22 FEB 2025

Installed CORS for registering domain of front-end

### DAY 11

## DATE 23 FEB 2025

> Dir Str
> /src
> /config # Configuration files (e.g., DB, environment variables)
> /controllers # Request handlers
> /services # Business logic (Service Layer)
> /repositories # Database interactions
> /models # ORM models (Mongoose/Sequelize)
> /routes # Express routes
> /middlewares # Middleware functions
> /utils # Helper functions
> server.js # Entry point


Fetch the specific columns from a document in mongodb
> db.users.find({}, {address: 1, zipcode: 1})


Fetch the specific columns from a document using mongoose
> db.users.find(), select({address: 1, zipcode: 1})


UserEffect Hook:
Used for handling side effects in functional components.

1. Initial Rendering: When the components mounts, useEffects can run its function to perform its operation like data
   fetching
2. Dependencies: Determines when the useEffect should re-run, if any of its value changes, the effect will re-run.
3. Cleanup: This hook returns the clean up function to clean the after effect e.g unsubscribing the events or clearing
   the timers.

Side Effect: An operation that affects something that is outside of the function

Controlled Component: Those components whose data are handled by React component state.
E.g:- StateManagement, EventHandlers, StateUpdates etx

UnControlled Component: Those components whose data is handled by the dom.
E.g:- Direct Dom Manipulation, Event handling, Accessing Form Data

UserEffect Hook:
E.g: Fetching data from external source, updating the component after changing the data 

## DAY 12

## DATE 9 MARCH 2025

Install passport passport-google-oauth20 express-session connect-mongo

> Passport: This is like a security guard for your website.
> It checks if people are allowed to enter special areas of your site.
> It's the main tool that handles signing in.

> Passport-Google-OAuth20: This is a special add-on for Passport that knows how to talk to Google.
> It's like having a special door in your website that lets people use their Google account to enter instead of creating
> a
> new username and password.

> Express-Session: This is like a memory bracelet for your website.
> When someone logs in, the website gives them this invisible bracelet so it remembers who they are as they move around
> different pages.
> Without this, the website would forget who you are every time you click on something!

> Connect-Mongo: This is like a storage box for all those memory bracelets.
> Instead of keeping them in a pile that might get lost if the computer restarts, this package puts them in a safe
> MongoDB
> drawer
> so they stay organized and don't get lost, even if the website needs to restart.

> Together, these packages help your website let people sign in with Google, remember who they are as they browse
> around,
> and keep that information safe even if something goes wrong with the server.


app.use(express.urlencoded({ extended: true }));
It is used just to encode the complex object into a simple object.

E.g:
submitted form data is like name=John&hobbies[indoor]=chess&hobbies[outdoor]=cycling
After encoding it will be like
{
name: 'John',
hobbies: {'indoor' : chess, 'outdoor' : cycling}
}

But with { extended: false }, you'd only get:

{
name: "John",
"hobbies[indoor]": "chess",
"hobbies[outdoor]": "cycling"
}

To delete/truncate the documents in a collection of mongo db run:
> db.users.deleteMany({})
> or
> db.users.drop()

## GUIDE HOW TO Create a Google OAuth Project

Before writing any code, you need to set up a project in the Google Developer Console:

1. Go to the Google Cloud Console (https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" and select "OAuth client ID"
5. Configure the consent screen if prompted
6. For "Application type", select "Web application"
7. Add a name for your OAuth client
8. Add authorized redirect URIs: http://localhost:5000/api/auth/google/callback (for development)
9. Click "Create"
10. Note your Client ID and Client Secret - you'll need these