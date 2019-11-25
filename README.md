# Broadcaster
Broadcaster is a platform where you can be able to record or report any incident about corruption or any danger case that you want government to intervene.

[![Build Status](https://travis-ci.org/AnnetteTumukunde/Broadcaster.svg?branch=develop)](https://travis-ci.org/AnnetteTumukunde/Broadcaster)
[![Coverage Status](https://coveralls.io/repos/github/AnnetteTumukunde/Broadcaster/badge.svg?branch=develop)](https://coveralls.io/github/AnnetteTumukunde/Broadcaster?branch=develop)

## Documentation of Broadcaster

Broadcaster has so far the following features :

 1. Users can create an account and log in.
 2. Users can create a ​red-flag ​record.
 3. Users can create an ​intervention​ record​.
 4. Users can edit their ​red-flag ​or ​intervention ​records.
 5. Users can delete their ​red-flag ​or ​intervention ​records.

To get started, we might need to do the following steps to be able to run the APIs on Broadcaster :

* Tools we need preferably : Visual Studio Code editor, Postman for testing APIs, Browser(Chrome), Node server side framework, mocha testing framework.

    - Copy this repository link : https://github.com/AnnetteTumukunde/Broadcaster.git
    - In Visual Studio Code terminal write, git clone https://github.com/AnnetteTumukunde/Broadcaster.git
    - Then git checkout <branch_name> to access certain branch
    - npm install to have dependencies. This is optional 
    - npm run test to test APIs or npm start to test APIs using postman

### Testing API endpoints

#### User account

##### Creating a new user [post]

* route : /api/v1/auth/signup
    * In the body, parse :
        {
            "id" : Number,
            "firstname" : String,
            "lastname" : String,
            "email" : String,
            "phoneNumber" : String,
            "password" : String,
            "type" : String
        }

    Then click send

##### Logging in a user [post]

* route : /api/v1/auth/signin
    * In the body, parse :
        {
            "email" : String,
            "password" : String
        }

    Then click send
    
##### Creating a new record [post]

* route : /api/v1/incident
    * In headers, 
        - type this key : 'access-token'
        - type this key value : [token_received_after_signing_up_or_logging_in]
    * In the body, parse :
        {
            "title" : String,
            "type" : String,
            "location" : String,
            "status" : String,
            "comment" : String,
            "author" : String
        }

    Then click send

##### Viewing all records [get]

* route : /api/v1/incidents
    * In headers, 
        - type this key : 'access-token'
        - type this key value : [token_received_after_signing_up_or_logging_in]

    Then click send

##### Viewing a specified record [get]

* route : /api/v1/incidents/{id}
    * In headers, 
        - type this key : 'access-token'
        - type this key value : [token_received_after_signing_up_or_logging_in]

    Then click send

##### Modifying a record's location [patch]

* route : /api/v1/incidents/{id}/{location}
    * In headers, 
        - type this key : 'access-token'
        - type this key value : [token_received_after_signing_up_or_logging_in]
    * In the body, parse :
        {
            "location" : String
        }

    Then click send

##### Modifying a record's comment [patch]

* route : /api/v1/incident/{id}/{comment}
    * In headers, 
        - type this key : 'access-token'
        - type this key value : [token_received_after_signing_up_or_logging_in]
    * In the body, parse :
        {
            "comment" : String
        }

    Then click send

##### Deleting a specified record [delete]

* route : /api/v1/incidents/{id}
    * In headers, 
        - type this key : 'access-token'
        - type this key value : [token_received_after_signing_up_or_logging_in]

    Then click send

### Other links

#### Gh-pages link

If you want to see the interface for Broadcaster, copy the next link and paste it in your browser or click https://annettetumukunde.github.io/Broadcaster/Template/Html/home.html

#### Heroku link

If you want to run or test the endpoints on heroku, copy the next link and paste it in your browser or click https://afri-broadcaster.herokuapp.com/

## Author

Annette Tumukunde
2019