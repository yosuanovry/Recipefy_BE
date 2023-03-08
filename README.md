# Food-Recipes-Backend 🍕
Food-Recipes-Backend is an API built for food recipes app that contains users, recipes, and category data using Express.js and Node.js  

![Food-Recipes-Backend Flowchart](https://github.com/yosuanovry/food-recipes_backend/blob/master/flowchart_aplikasi.png)

## Tools to have
1. Visual Studio Code
2. Node.js
3. PostgreSQL for database (not necessary this is just what i use)
4. Multer and Cloudinary (for store & upload photo)
5. Postman

## How to use
1. Clone this repository to your project file
```
git clone https://github.com/yosuanovry/food-recipes_backend.git
```
2. Open your visual studio code and install the requirements dependencies in package-lock.json using
```
npm i nodemon
or
npm install nodemon
```
3. Set up your cloudinary acc at [cloudinary website](https://cloudinary.com/)
4. Turn on the server (in this case im using nodemon and postgreSQL)
5. Create the databases that includes in recipes.sql
6. Set up the credentials in the .env file
```
DB_USER= (username) 
DB_NAME= (database_name)
DB_PASSWORD=(user password)
DB_PORT= (port you're using)
DB_HOST= (your host/ip)

JWT_KEY= (any)


EMAIL_NAME= (your email)
EMAIL_PASSWORD= (email password)

BASE_URL=localhost

PORT=3000

PHOTO_NAME= (cloudinary)
PHOTO_KEY= (cloudinary)
PHOTO_SECRET= (cloudinary
```

8. Open Postman and choose HTTP request method and request URL example
```
http://localhost:3000/(get, post, delete, update)
```
9. Ready to use

## Routes
1. '/' GET example
   - http://localhost:3000/recipes
   - http://localhost:3000/users
   - http://localhost:3000/category
   
2. '/' POST example
    - http://localhost:3000/register
    - http://localhost:3000/login
    
3. '/:id' DELETE example
    - http://localhost:3000/recipes/id
    - http://localhost:3000/users/id
    - http://localhost:3000/category/id
    
4. '/:id' UPDATE example
    - http://localhost:3000/recipes/id
    - http://localhost:3000/users/id
    - http://localhost:3000/category/id
    
## Deployed API
[Food-Recipe-API](https://puce-victorious-bandicoot.cyclic.app/recipes)

    
