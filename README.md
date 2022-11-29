# Basic Bookstore API
Testing out knowledge of API with ExpressJs

# Contributing
This project is built with ExpressJs.

## Pull Requests
Pull Requests are welcome, please base your work on the `dev` branch, and make sure your pull requests are submitted against the `dev` branch.

## Getting started
- First, fork the project

- Then, run the development server:


`npm run dev`

- Open http://localhost:4000 with API testing tools such as `Postman` or `Thunder Client` in VSCode

- Test each Routes

## Requirements
- users can sign up
- users have two roles: visitor & admin
- admin user can get all registered user and delete a user
- both visitor and admin can view all available books
- admin user can create, update, and delete books
- visitor can loan and return books
- Password authententication and Access control level implemented
- File system DB 

## Routes
- users
- books

### users route
- GET: `/users/allUsers`
- POST: `/users/login`, `/users/create`

### books route
- GET: `/books/`
- POST: `/books/create`, `/books/loan`, `books/return`
- PUT: `/books/:id`
- DELETE: `/books/:id`
