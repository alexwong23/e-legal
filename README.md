# e-legal

Heroku link: (https://e-legal.herokuapp.com/)

An online EPL Football voting website built with NodeJS Express, websockets and MongoDB and linked up with external API data. Users were awarded tokens for every correct prediction. In case users run out of tokens, a cron job would run every sunday night, awarding 10 tokens to all users. The match info were pulled from an open-source external API. Changes in the match info were updated on the client using web-sockets so users would not need to refresh the page to get the latest updates.

Built while exploring NodeJS and integration of MongoDB.


# Diagrams and Wireframes

Entity Relationship Diagram:

![ERD](https://github.com/alexwong23/e-legal/blob/master/public/images/ERD.png)

User Flow Diagram:

![User Flow Diagram](https://github.com/alexwong23/e-legal/blob/master/public/images/Userflow.jpeg)

High-level Overview:

![flow1](https://github.com/alexwong23/e-legal/blob/master/public/images/E-legal_Flow1Initial.png)

![flow2](https://github.com/alexwong23/e-legal/blob/master/public/images/E-legal_Flow2exAPI.png)

![flow3](https://github.com/alexwong23/e-legal/blob/master/public/images/E-legal_Flow3CronSocket.png)

![flow4](https://github.com/alexwong23/e-legal/blob/master/public/images/E-legal_Flow4Complete.png)

# Credits

Many thanks go to the wonderful instructors from General Assembly Singapore for their help and support.

# How to deploy to heroku
* git fork the repo into your own github
* git clone it into your directory
* heroku create [insert name of yr heroku app]
* git push heroku master
