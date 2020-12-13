import React, { Component } from 'react';
import { Hoc, routings } from "../variables/importfile"
import {AppBar,Toolbar,Typography,IconButton} from '@material-ui/core';
import {AccountCircle,Menu} from '@material-ui/icons';

import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {getProfile} from "../others/apiservice"
import Loader from "../others/loader"



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      array:[]
    }
  }
  componentDidMount(){
    this.props.changeList([],true)

    getProfile().then(response => {
      this.setState({array:response.data.data})
      this.props.changeList(response.data.data,false)

    }).catch(error => {
      this.props.changeList(this.state.array,false)

    })
  }
  route() {
    this.props.history.push('/comp');
  }

  render() {
 
  

    return (
      <div>
        <Loader />
           <AppBar position="static">
        <Toolbar>
          <IconButton edge="start"  color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6" >
            Profile
          </Typography>
          {/* {auth && ( */}
            <div style={{position:"absolute",right:15}}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                // onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
             </div>
        </Toolbar>
      </AppBar>

        <Switch>

          {routings[0].sub.map((route, index) => {
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
          <Redirect from="/" to="comp1/sub1" />

        </Switch>
      </div>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    profile_array:state.profile_array,
    Loader:state.Loader
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    changeList: (profile_array,Loader) => { dispatch({ type: 'Profile_list', profile_array: profile_array,"Loader":Loader}) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hoc(App));
