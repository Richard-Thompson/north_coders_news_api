# NorthCodersNews API

This is a backend project which links up with north_coders_news. There are several endpoints which provide data when called on.

PLease find the endpoints [here](https://northcodersnewsapi.herokuapp.com/)

You can find the deployed backend [here](https://rocky-earth-47954.herokuapp.com/api)

## Getting Started

To obtain a copy of this project you will need to follow the instructions below:

-On the command line change into the directory you wish to clone the project

-Fork the project onto your github account 

-Copy the HTTPS clone url 

-carry out the following commands:

    
    git clone https://github.com/username/project-name.git

    cd project/directory/where/project/is
    

## Prerequisites

### Node:

Install Node according to the instructions on https://nodejs.org/en/

run node -v to check if node is or has been installed

### NPM:

Ensure that npm is fully updated, carry out the following command in your terminal:

    npm install npm@latest -g

run npm -v to see if node has been installed and what version you are running

## Installing

Once you have all the required software installed, go to the directory of the cloned project and run the following commmand:

    npm install 

This will install all the dependencies of the project

To start the project on a localhost server run the following command

    npm start

To run this project locally please clone this repository,carry out in the root directory:

   npm install 
   
Then make mongoDB available with mongod

Seed the datebase:

  node seed/seed.js 
  
Start and instance of the development server by running the following command:

  npm start 
  
Now it should be available in your localhost:3000.

## Running the tests

To run all the automated tests for this project, all you have to do is the following command in the root directory:

  npm test

## Authors

* **Richard Thompson** - *Initial work* - [Richard Thompson](https://github.com/Richard-Thompson)

## Acknowledgments

* A great thanks to NorthCoders who mentored me and assisted in my learning of javascript and its libraries/frameworks