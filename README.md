# Chinese Character Recognition Test
This application is intended for Chinese teachers and language researchers to obtain an estimate of the number of Chinese characters that their students or research subjects recognize. The application contains the following features:

-A back-end built with Ruby on Rails and PostgreSQL

-A front-end built with React where users can interact with the API to view student .

-Camp staff can view the rosters for each camp and can view and respond to communications from parents.

## Running
First set up:
 From the root directory run
 $ bundle install
 $ rails db: migrate db:seed
 $ npm install --prefix client

Then to start run:
$ foreman start -f Procfile.dev

---IMPORTANT---
Users are required to log in to access most of the functionality of the app. Users can create a new account under sign up. To access the admin version of the site you need to log in as:

username: admin
password: password