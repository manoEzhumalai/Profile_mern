import React, { Component } from 'react';
import { Hoc,routings,Reducer } from "../variables/importfile"
import { Switch, Route ,Redirect} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import "../assets/style.css"

// const hist = createBrowserHistory();
const store = createStore(Reducer);


class App extends Component {
    constructor(props){
        super(props)
    }
  
    render() {
     
        return (
            <Provider store={store}>  

                <Switch>

                    {routings.map((route, index) => {
                        return <Route
                            key={index}
                            path={route.path}
                            // exact={route.exact}
                            name={route.path}
                            render={props => (
                                <route.component {...props} />
                            )} />

                    })
                    }   
                    <Redirect from="/" to="profile/list" />
 
                </Switch>
           </Provider>
        );
    }
}


export default Hoc(App);
