import React from 'react';
import ReactDOM from 'react-dom';
class Welcome extends React.Component {
    render () {
        console.log('hello world');

        return <h1>Hello World from React boilerplate</h1>;
    }
}
ReactDOM.render(<Welcome />, document.getElementById('page'));
