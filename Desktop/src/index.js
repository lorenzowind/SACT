import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Lister from './screen/Lister';

//ReactDOM.render(<App />, document.getElementById('root'));
var type = "project";

class WindowManager extends React.Component {

}

ReactDOM.render(<Lister name={type} />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
