import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Buttons} from "../../variables/material"
import "../assets/style.css"

class App extends Component {
  constructor(props) {
    super(props)

  }


  render() {

    return (
        <div>
 {this.props.Loader && <div className="loader">Loading...</div>}

        </div>
       

    );
  }
}
const mapStateToProps = (state) => {
  return {
    Loader: state.Loader
  }
}

export default connect(mapStateToProps)(App);
