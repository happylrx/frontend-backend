import React from 'react';
import Header from './Header';
import {Link} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
    constructor(){
      super();
    }
    render() {
        return (
            <MuiThemeProvider>
              <div>
                <Header/>
                <Link to='/'>Home</Link>
                <Link to='/login'>Login</Link>
                {this.props.children}
                <h1>Footer</h1>
              </div>
            </MuiThemeProvider>
        )
    }
}
export default App
