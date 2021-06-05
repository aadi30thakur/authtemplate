##  Auth Template

##### a  [express](https://expressjs.com), [mongoose](https://mongoosejs.com) , [node](https://nodejs.org/en/) template for a basic authentication using database with mongo db 


it says the users to the database along with hashed passwords with SHA256 with crypto. 

---
 Installation 
 
`npm i  auth-template`

----

###### Usage
please add your mongo uri  in index.js and add  express secret in controller/auth.js 
and you are ready to go!

`const { MainURLS } = require("authtemplate")`

`MainURLS("your-mongodb-url")`