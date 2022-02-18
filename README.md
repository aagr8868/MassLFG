# CSCI-3308-Fall21-014-02

## MassLFG

__Description__

As implied by the name, MassLFG takes the concept of an LFG (“Looking for Group”) and brings it to the masses.  Specifically, MassLFG allows users to find groups of other people who enjoy the same types of video games as the user.  

The user interface will be quite simple. After authenticating, the user will either manually select their favorite games from a list of the most popular video games at the moment, or they will hit a button to import their video game library from Steam.  Regardless of the method, users will have a very simple way to show which games they enjoy most.

After they have specified their preferred games, the user will then hit another button to join a group.  MassLFG will then pair this user with a group of other users based on their game preferences, allowing people to quickly and easily find gaming groups with people who share their preferences.

__App Architecture__

*Frontend*: We’ll be using React and Next.js hosted on Vercel to create the frontend.  Vercel will host the static pages for our website, and our site will connect with our backend via our REST API.

*Backend*: We’ll use a Node.js server hosted on Heroku as the REST API for this project.  The Node.js server will communicate with our database and the Steam API to serve the data to our frontend. 

*Database*: We’ll use a Postgresql database hosted on the same Heroku instance as our Node.js server.  

*Integration*: The various components of this web app will communicate via http(s) requests.  


