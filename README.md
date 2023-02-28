# BikeTracks
A web app to track YOUR bike sales and inventory.


# Install necessary dependencies
```
npm i
```

# How to run client
```
npm start
```

# How to run server
```
npm run dev
```

# Set up
You will need to have a SQL database to connect to. As seen in /config/database.js you will need the following environment variables: DB_NAME, DB_USER, DB_PWORD, DB_HOST. The necessary tables will be automatically created once you run the application. 

You will additionally need an ORIGIN environment variable. During development, this was tested using ORIGIN=http://localhost:3000
