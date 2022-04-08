'use strict';
// import Button from 'react-bootstrap/Button';

function App() {
  return React.createElement(
    Button,
    null,
    "Like"
  );
}

var domContainer = document.getElementById("root"); //querySelector('#root');
var root = ReactDOM.createRoot(domContainer);
root.render(React.createElement(App, null));