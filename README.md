# Monthly Red
### Online wine shop where you don't get a chance to choose your wine.

Overview
========

Monthly Red is an online wine shop where wine orders can be made online but the user will not be able to choose which bottle of wine they will receive. The website is run by a sommerlier, who will choose a special bottle of wine for the customers based on their preferences.
The deployed webpage can be found here: https://monthlyred.herokuapp.com

* [Project brief](#project-brief)
* [Problem](#problem)
   * [Problem Introduction](#problem-introduction)
   * [Problem Description](#problem-description)
   * [Problem Solution](#problem-solution)
* [Design Jurney](#design-journey)
* [User stories](#user-stories)
   * [User](#user)
   * [Admin](#admin)
* [Sketching](#sketching)
* [Getting Started](#getting-started)
* [Dependencies Used](#dependencies-used)
* [Future of the Project](#future-of-the-project)

Project Brief
============
Monthly Red is the final project I had to complete during the course at Coder Factory Academy.

The requirements of the project include:
1. One page summary of your application including problem definition, solution.
2. Determine the appropriate client technology, development tools, and platform for writing the UI
3. Review the conceptual design with the client, and edit as required
2. A workflow diagram of the user journey/s.
3. Wireframes for at least 5 screens.
4. User stories for the whole application.
5. Entity Relationship Diagram (ERD).
6. Project plan and effort estimation.

Problem
============
Problem Description
========
Many of the wine consumers are not very familiar with different types of wine. Yes, we can all distinguish between red and white but if we don't pair the correct wine with our meal we might not enjoy either of them, or enjoy to a limited degree.

Problem Solution
========
Monthly Red is an online platform where users, upon registration and placing the order of the wine, will be requested to take a simple test. Based on their answers, the sommelier will choose a bottle of wine according to their taste and send it to them.

Design Journey
============

User Stories
========
User 
--
I as a user want to be able to log in so that I can see the content of the website/app
I as a user want to be able to see the description of each package so that I can make my decision easily
I as a user want to input my address so that wine can be delivered to my address
I as a user want to subscribe so that I can receive wine monthly
I as a user want to make payments online
I as a user want to see a history of my purchases

Admin
--
I as an admin want to see a list of all the users so that I can see who is using my website
I as an admin want to see a list of all the orders so that I know where I should send the placed orders
I as an admin want to see the result of the quiz so that I can choose an appropriate wine for them

Sketching
========

Getting Started
============
```
express --view=handlebars GrapplingEducation
```
Dependencies used:
========
```
    "bcryptjs"
    "body-parser"
    "connect-flash"
    "connect-mongo"
    "cookie-parser"
    "debug"
    "dotenv"
    "ejs"
    "express"
    "express-handlebars"
    "express-messages"
    "express-session"
    "express-validator"
    "jquery"
    "mongodb"
    "mongoose"
    "morgan"
    "passport"
    "passport-facebook"
    "passport-http"
    "passport-local"
    "serve-favicon"
    "stripe"
```

Future of the project
========
- Implement monthly subscription
- Create a React app and display all the views there
