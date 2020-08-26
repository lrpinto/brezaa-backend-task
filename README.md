

## Usage

```
$ yarn install
$ yarn start
```

## Routes

### Public
`POST /users/signup`

`POST /users/login`

`GET /users/getAllSellers`

`GET /getSellerReviews/?sellerId=:sellerId`

`GET /getNearestSellers/?longitude=:long&latitude=:lat&maxDistance=:dist`

### Auth (Bearer Token) Required: 
`POST /review/?sellerId=:sellerId`

## Project Structure

```
├── dist
├── node_modules
├── src
   ├── app.ts
   ├── controllers
   |  └── reviews
   |     └── index.ts
   |  └── sellers
   |     └── index.ts
   |  └── users
   |     └── index.ts
   ├── helpers
   |  └── error-handler.ts
   |  └── jwt.ts
   ├── models
   |  └── user.ts
   |  └── review.ts
   ├── routes
   |  └── index.ts
   └── types
      └── review.ts
      └── user.ts
├── nodemon.json
├── package.json
├── tsconfig.json
```