import React, { Component } from 'react';
import { Hoc, images } from "../../variables/importfile"
import { connect } from 'react-redux';
import {Button} from '@material-ui/core';
import {Add,Edit,DeleteForever} from '@material-ui/icons';
import {deleteProfile,errorAlert,info} from "../../others/apiservice"



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      array: []
    }
  }

  crudpage(data) {
    this.props.history.push({ 
      pathname: '/profile/crud',
      state: data
    });
  }


  deleteProfile(data){
    this.props.changeList(this.props.profile_array,true)
    deleteProfile(data).then(response => {
      info("Profile Deleted Successfully")

      this.props.changeList(response.data.data,false)

    }).catch(error => {
      this.props.changeList(this.props.profile_array,false)
      errorAlert(error.response.data.message[0])

    })
  }
  render() {

    return (
      <div style={{ margin: 20 }}>
        <div style={{ margin: 20 }}  >
          <Button variant="contained" color="primary" onClick={()=>this.crudpage(true)}><Add />Add New Profile</Button>
        </div>
        <div className="row">
          {this.props.profile_array.map((obj, index) => {
            return <div className="col-lg-3" key={index}>
              <div className="card">
                <img className="card-img-top" src={images.im1} alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title">{obj.name}</h5>
                  <p className="card-text">Email ID : {obj.email}</p>
                  <p className="card-text">Contact no : {obj.contact}</p>
                  <p className="card-text">DOB : {obj.DOB}</p>

                  {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                  <Button style={{marginRight:10}} variant="contained" color="primary" onClick={()=>this.crudpage(obj)}><Edit /></Button>                
                  <Button variant="contained" color="secondary" onClick={()=>this.deleteProfile(obj._id)}><DeleteForever /></Button>
                </div>
              </div>  </div>

          })}

        </div>

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
