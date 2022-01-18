# crud-app-2

### Front -- ReactJS

### Back -- NodeJS and mySQL

# How to set up files

Followed PedroTech's Tutorial:\
https://www.youtube.com/watch?v=T8mqZZ0r-RA&t=4s

```
mkdir crud-app-2
cd crud-app-2
mkdir client
mkdir server
cd client
npx create-react-app .
npm start
```

Delete files in client > src:\
App.test.js\
index.css\
logo.svg\
serviceWorker.js\
setupTests.js

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

\
This produces a blank webpage.
