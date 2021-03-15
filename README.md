# AmsterdamEvents
This project was made as a university course project. It involved doing assignments every week for 14 weeks long. 
The project is split up into two parts. There is an Angular front-end and there is Java Spring Framework with Spring Boot as the back-end for HTTP endpoints and authentication.

## Context
The assignments were done around the idea of a website that displays upcoming events in Amsterdam that people could sign up for. The events can either be free or cost money, and they can have a ticket limit or no ticket limit. The events can have a maximum number of tickets.

## Features
The project is not for real use and was purely made for educational purposes. 

The front-end is a basic CRUD application and allows for adding events, and also allows for editing their status and information after they are created. When created events have been edited and the user attempts to leave the page, a confirmation dialogue is made.

There is also user registration and using login. Only logged in users can edit and view events. Logging in is done through HTTP followed by a received JWT token that is stored in the browser session.

In the back-end, there are endpoints for posting, updating and deleting events that the front-end uses, as previously mentioned. There is also a login and register system using JWT as the authentication. Requests are blocked when the JWT is invalid or outdated, or when no JWT token has been provided at all for secured endpoints.

## Structure
The main folder contains the Angular front-end, and the "aeserver" folder contains the whole of the back-end server.
