# crud-application

### Stack:

- Front
  - ReactJS
- Back
  - NodeJS
  - MySQL

# How to set up files

Followed PedroTech's Tutorial:\
https://www.youtube.com/watch?v=T8mqZZ0r-RA&t=4s

```
mkdir crud-app-2
cd crud-app-2
mkdir client
mkdir server
```

## Set up Client

```
cd client
npx create-react-app .
npm start
```

Delete files in src folder:

- App.test.js
- index.css
- logo.svg
- serviceWorker.js
- setupTests.js

\
<b>Update index.js</b>

```diff
import React from 'react';
import ReactDOM from 'react-dom';
- import './index.css';
import App from './App';
- import reportWebVitals from './reportWebVitals';

ReactDOM.render(
-  <React.StrictMode>
+    <App />,
-  </React.StrictMode>,
  document.getElementById('root')
);

- // If you want to start measuring performance in your app, pass a function
- // to log results (for example: reportWebVitals(console.log))
- // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
- reportWebVitals();
```

\
<b>Update App.js</b>

```diff
- import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
-      <header className="App-header">
-        <img src={logo} className="App-logo" alt="logo" />
-        <p>
-          Edit <code>src/App.js</code> and save to reload.
-        </p>
-        <a
-          className="App-link"
-          href="https://reactjs.org"
-          target="_blank"
-          rel="noopener noreferrer"
-        >
-          Learn React
-        </a>
-      </header>
    </div>
  );
}

export default App;
```

This produces a blank webpage.

## Set up Server

```
cd server
npm init
// press enter to all prompts
// create new file index.js
npm install express body-parser MySQL nodemon
```

<b>Create server\index.js</b>

```
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('hello world');
})

app.listen(3001, () => {
    console.log("running on port 3001")
});
```

<b>Update server\package.json</b>

```diff
  "scripts": {
+   "start": "node index.js",
+   "devStart": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

Then in terminal (inside server directory)

```
npm run devStart
```

Everytime a file is edited and saved, server will refresh automatically

## Configure MySQL database

### <b>Known issues:</b>

1. SQL can't establish connection
2. Error - ` Client does not support authentication protocol requested by server; consider upgrading MySQL client`

### <b>Fixes:</b>

1. Go to task manager > services tab > right click MySQL > start (if status is stopped)
2. https://stackoverflow.com/questions/50093144/MySQL-8-0-client-does-not-support-authentication-protocol-requested-by-server

### <b>Create Database</b>

- Open <i>MySQLWorkbench</i>
- Click + next to MySQL Connections
- Create new connection name and change Hostname to <i>localhost</i>
- Select new connection <i>(if red error in bottom left see Know Issues above)</i>
- Right click left tab under <b>SCHEMAS</b>
- Select <i>Create Schema...</i> and name it <i>cruddatabase</i>
- Open <i>cruddatabase</i> accordion menu
- Right click <i>Tables</i> > <i>Create Table...</i>
- Table Name: <i>movie_reviews</i>
  - Column Name: <i>id</i>, Datatype: <i>INT</i>, Check boxes: PK NN AI
  - Column Name: <i>movieName</i>, Datatype: <i>VARCHAR(200)</i>, Check boxes: NN
  - Column Name: <i>movieReview</i>, Datatype: <i>TEXT</i>, Check boxes: NN
- Open <i>Tables</i> accordion menu
- Right click <i>movie_reviews</i> > <i>Select Rows - Limit 1000</i>
  - Table should be empty

\
<b>Update server\index.js to test connection to database </b>

```diff
const express = require("express");
const app = express();
const MySQL = require("MySQL");

+ // change " " fields as necessary
+ const db = MySQL.createConnection({
+    host: "localhost",
+    user: "root",
+    password: "password",
+    database: "cruddatabase",
+ });
+
app.get('/', (req, res) => {

+     const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('inception', 'good movie');"
+     db.query(sqlInsert, (err, result) => {
+          // add console.log only if not working
+          // should throw NULL then work+
+          console.log(err);
+         res.send("hello world");
+    });
});

app.listen(3001, () => {
    console.log("running on port 3001")
});
```

- Save file
- Refresh webpage
  - Should say <i>hello world</i>
- Tab back to MySQL Workbench
- Click lightening bolt icon
  - Should have inserted <i>inception, good movie</i> into first row

\
<b>Update server\index.js after connection test passes</b>

```diff
app.get('/', (req, res) => {

-     const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('inception', 'good movie');"
-     db.query(sqlInsert, (err, result) => {
-          // add console.log only if not working
-          // should throw NULL then work+
-          console.log(err);
-         res.send("hello world");
-    });
});
```
