import React, { Component } from 'react';
import { Hoc } from "../../variables/importfile"
import { connect } from 'react-redux';
import { FormControlLabel, TextField, Button, Stepper,Checkbox, ListItemSecondaryAction, StepLabel, Step, List, ListSubheader, ListItem, ListItemText, IconButton } from '@material-ui/core';
import "../../assets/style.css"
import { DeleteForever,KeyboardBackspace, Label } from '@material-ui/icons';
import moment from "moment"
import { addProfile, updateProfile,info,errorAlert } from "../../others/apiservice"

import {
  FormBuilder,
  FieldGroup,
  FieldControl,
  Validators,
} from "react-reactive-form";
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      activeStep: 0,
      educationArray:[],
      careerArray:[],
      name:"Add",
      // educationArray: [{ "institute": "test", "start": "2020-10-29", "end": "2020-10-29", "subject": "tested", "degree": "testedr" }],
      // careerArray: [{ "position": "test", "company": "test", "start": "2020-10-29", "end": "2020-10-29" }],
      step: ['Personal Info', 'Educational Info', 'Career Info', 'Preview']
    }
  }
  profileForm = FormBuilder.group({
    id: [""],
    name: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    contact: ["", [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    DOB: ["", [Validators.required]],
    address: ["", [Validators.required]]
  });
  componentDidMount() {

    var x = this.props.history.location.state
    if (x == undefined) {
      this.props.history.push({
        pathname: '/profile/list'
      });
    } else {
      if (x != true) {
        this.profileForm.setValue({
          id: x._id,
          name: x.name,
          email: x.email,
          contact: x.contact,
          DOB: x.DOB,
          address: x.address

        })
        this.setState({ educationArray: x.education, careerArray: x.career,name:"Update" })

      }
    }
  }
  switchstep(data) {
    var x = this.state.activeStep
    var y = 0
    if (data == true) {
      if (x == 0) {
        y = 1
      } else if (x == 1) {
        y = 2
      } else if (x == 2) {
        y = 3
      } else if (x == 3) {
        y = 3
      }

    } else if (data == false) {
      if (x == 1) {
        y = 0
      } else if (x == 2) {
        y = 1
      } else if (x == 3) {
        y = 2
      }

    }
    this.setState({ activeStep: y })
    // console.log(this.state.educationArray)

  }
  AddEducation() {
    var x = { "institute": "", "start": "", "end": "", "subject": "", "degree": "" ,'type':false}
    var y = this.state.educationArray
    y.push(x)
    this.setState({ educationArray: y }, () => {
      // console.log(this.state.educationArray)
    })
  }
  RemoveEducation(ind) {
    var y = this.state.educationArray
    y = y.filter((obj, index) => index != ind)
    this.setState({ educationArray: y })
  }
  AddCareer() {
    var x = { "position": "", "company": "", "start": "", "end": "","type":false }
    var y = this.state.careerArray
    y.push(x)
    this.setState({ careerArray: y })
  }
  RemoveCareer(ind) {
    var y = this.state.careerArray
    y = y.filter((obj, index) => index != ind)
    this.setState({ careerArray: y })
  }


  onchangeInput(value, key, index) {
    // console.log(value)
    var x = this.state.educationArray
    x[index][key] = value
    this.setState({ educationArray: x }, () => {
      // console.log(this.state.educationArray)
    })


  }
  onchangecheckbox(value, key, index) {
    // console.log(value.target.checked,12345)
      var y=true
      if(value=="false" || value==false){
        y=false
      }
    var x = this.state.educationArray
    x[index][key] = y
    x[index]["end"] = ""
    if(y==true){
      x[index]["end"] = true

    }
    this.setState({ educationArray: x }, () => {
    })


  }
  onchangecheckbox1(value, key, index) {
    // console.log(value.target.checked,12345)
      var y=true
      if(value=="false" || value==false){
        y=false
      }
    var x = this.state.careerArray
    x[index][key] = y
    x[index]["end"] = ""

    if(y==true){
      x[index]["end"] = true

    }
    this.setState({ careerArray: x }, () => {
    })


  }
  onchangeInput1(value, key, index) {
    var x = this.state.careerArray
    x[index][key] = value
    this.setState({ careerArray: x })


  }
  educationtab() {
    var array = []
    var x = this.state.educationArray
    x.map((obj, index) => {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          var x = obj[key]
          var z = index + 1

          if (key == "institute" || key == "subject" || key == "degree") {
            if (x == undefined || x == null || x == "") {
              console.log(key,x)

              var message = key + " is an mandatory field in " + z + " row"
              array.push(message)
            }
          }else  if ( key == "type") {
           
          } else {
            if(obj.type==false){
              var bool = moment(x, 'YYYY-MM-DD', true).isValid()
              // console.log(bool,obj.type,x)
              if (bool == false) {
                var message = key + " is an mandatory field in " + z + " row"
                array.push(message)
              }
            }
          

          }
        }
      }
      return obj
    })
    // console.log(array)
    if (array.length == 0) {
      this.switchstep(true)

    }else{
      errorAlert(array[0])

    }
  }
  careertab() {
    var array = []
    var x = this.state.careerArray
    x.map((obj, index) => {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          var x = obj[key]
          var z = index + 1

          if (key == "position" || key == "company") {
            if (x == undefined || x == null || x == "") {
              var message = key + " is an mandatory field in " + z + " row"
              array.push(message)
            }
          }else  if ( key == "type") {
           
          } else {
            if(obj.type==false){
            var bool = moment(x, 'YYYY-MM-DD', true).isValid()
            if (bool == false) {
              var message = key + " is an mandatory field in " + z + " row"
              array.push(message)
            }

          }
          }
        }
      }
      return obj
    })
    if (array.length == 0) {
      this.switchstep(true)

    }else{
      errorAlert(array[0])

    }
  }
 
  submit() {
    var x = this.profileForm.value
    x.education = this.state.educationArray
    x.career = this.state.careerArray
    if (x.id == "" || x.id == undefined) {
      this.props.changeList(this.props.profile_array,true)

      addProfile(x).then(response => {
        this.props.changeList(response.data.data,false)
        info("Profile Added Successfully")

        this.props.history.push({ pathname: '/profile/list' })

      }).catch(error => {
        // console.log(error.response.data.message[0])
        this.props.changeList(this.props.profile_array,false)
        errorAlert(error.response.data.message[0])


      })
    } else {
      this.props.changeList(this.props.profile_array,true)

      updateProfile(x).then(response => {
        this.props.changeList(response.data.data,false)
        info("Profile Updated Successfully")

        this.props.history.push({ pathname: '/profile/list' })
      }).catch(error => {
        this.props.changeList(this.props.profile_array,false)
        errorAlert(error.response.data.message[0])

      })
    }
  }
  render() {
    const { step, activeStep } = this.state
    var form = this.profileForm.value


    return (
      <div style={{ margin: 20 }}>
        <h4>
        <IconButton edge="start" color="primary"
                    onClick={() =>this.props.history.push({ pathname: '/profile/list' })}
                    aria-label="menu" size="medium">
                    <KeyboardBackspace />
                  </IconButton>
          {this.state.name + " Profile"}
        </h4>

        <Stepper activeStep={this.state.activeStep}>
          {step.map((label, index) => {
            const stepProps = {};
            stepProps.completed = true;



            if (index > this.state.activeStep) {
              stepProps.completed = false;
            }

            return <Step key={index} >
              <StepLabel >{label}</StepLabel>
            </Step>
          })}
        </Stepper>
        <div>
          {activeStep == 0 &&
            <div className="col-lg-12" >
              <div class="card">
                <div class="card-body">
                  <FieldGroup
                    control={this.profileForm}
                    strict={false}
                    render={({ get, invalid, value }) => (
                      <form>
                        <div className="row" >
                          <div className="col-lg-3 inputs" >
                            <FieldControl
                              name="name"
                              strict={false}
                              render={({ handler, touched, hasError }) => (
                                <div >

                                  <TextField  type="text" required fullWidth variant="outlined" error={touched && hasError("required")} label="Profile Name" {...handler("text")} />
                                  <span className="error">
                                    {touched
                                      && hasError("required")
                                      && `* Profile name is required`}
                                  </span>
                                </div>
                              )}
                            />
                          </div>
                          <div className="col-lg-3 inputs">
                            <FieldControl
                              name="email"
                              strict={false}
                              render={({ handler, touched, hasError }) => (
                                <div >
                                  <TextField type="text" required fullWidth variant="outlined" error={touched && hasError("required")} label="Email Id" {...handler("text")} />

                                  <span className="error">{touched
                                    && hasError("required")
                                    && `* Email is required`}
                                    {touched
                                      && hasError("email")
                                      && `* Enter Valid Email Id`}
                                  </span>

                                </div>
                              )}
                            />
                          </div>
                          <div className="col-lg-3 inputs">
                            <FieldControl
                              name="contact"
                              strict={false}
                              render={({ handler, touched, hasError }) => (
                                <div >

                                  <TextField type="number" required fullWidth variant="outlined" error={touched && hasError("required")} label="Contact number" {...handler("number")} />
                                  <span className="error">{touched
                                    && hasError("required")
                                    && `* Contact number is required`}
                                    {touched
                                      && hasError("minLength")
                                      && `* Contact number must be 10 digits`}
                                    {touched
                                      && hasError("maxLength")
                                      && `* Contact number must be 10 digits`}

                                  </span>

                                </div>
                              )}
                            />
                          </div>
                          <div className="col-lg-3 inputs">
                            <FieldControl
                              name="DOB"
                              strict={false}
                              render={({ handler, touched, hasError }) => (
                                <div >

                                  <TextField type="date" required fullWidth variant="outlined" error={touched && hasError("required")} label="DOB" {...handler("date")} />
                                  <span className="error">
                                    {touched
                                      && hasError("required")
                                      && `* DOB is required`}
                                  </span>
                                </div>
                              )}
                            />
                          </div>
                          <div className="col-lg-3 inputs">
                            <FieldControl
                              name="address"
                              strict={false}
                              render={({ handler, touched, hasError }) => (
                                <div >

                                  <TextField type="text" required fullWidth variant="outlined" error={touched && hasError("required")} label="Address" {...handler("text")} />
                                  <span className="error">
                                    {touched
                                      && hasError("required")
                                      && `* Address is required`}
                                  </span>
                                </div>
                              )}
                            />
                          </div>
                        </div>
                        <div className="row">

                          <div className="col-lg-3 inputs">
                            <div className="login-button changepassword text-center">
                              <Button disabled={activeStep === 0} onClick={() => this.switchstep(false)}>
                              <KeyboardBackspace />  Back
              </Button>
                              <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={invalid}
                                onClick={() => this.switchstep(true)}
                              >Next</Button>
                            </div>
                          </div>
                       

                        </div>
                      </form>
                    )}
                  />
                </div>
              </div>  </div>
          }
          {activeStep == 1 &&
            <div class="card"  >
              {/* <img class="card-img-top" src={images.im1} alt="Card image cap" /> */}
              <div class="card-body" >
                <div className="row inputs" >

                  <div className="col-md-3">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.AddEducation()}
                    // className={classes.button}
                    >
                      Add Education Details
              </Button>

                  </div>
                  <div className="col-md-2">

                    <Button disabled={activeStep === 0} onClick={() => this.switchstep(false)}>
                    <KeyboardBackspace />    Back
</Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.educationtab()}
                    // onClick={() => this.switchstep(true)}
                    // className={classes.button}
                    >
                      {activeStep === step.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>

              </div>
              {this.state.educationArray.map((obj, index) => {

                return <div className="row inputs" key={index} >
                  <div className="col-lg-2 inputs">
                    <TextField type="text"
                      value={obj.institute}
                      onChange={(event) => this.onchangeInput(event.target.value, "institute", index)}
                      fullWidth variant="outlined" label="Insitute Name" />
                  </div>
                  <div className="col-md-2 inputs">
                    <TextField type="date"
                      onChange={(event) => this.onchangeInput(event.target.value, "start", index)}
                      value={obj.start}

                      fullWidth variant="outlined" label="Profile Name" />
                  </div>
                  <div className="col-md-1 inputs" style={{display:'flex',flexDirection:"column"}}>
                  <span>Working</span>
                  <Checkbox checked={obj.type}
                  value={obj.type} color="primary" 
                  onChange={(event) => this.onchangecheckbox(event.target.checked, "type", index)}
                  />
                  </div>
                  {obj.type==false &&
                  <div className="col-md-2 inputs">
                    <TextField type="date"
                      value={obj.end}

                      onChange={(event) => this.onchangeInput(event.target.value, "end", index)}
                      fullWidth variant="outlined" label="Profile Name" />
                  </div>
                  }
                 <div className="col-lg-2 inputs">
                    <TextField type="text"
                      value={obj.subject}

                      onChange={(event) => this.onchangeInput(event.target.value, "subject", index)}
                      fullWidth variant="outlined" label="Subject Name" />
                  </div>
                  <div className="col-lg-2 inputs">
                    <TextField type="text"
                      value={obj.degree}

                      onChange={(event) => this.onchangeInput(event.target.value, "degree", index)}
                      fullWidth variant="outlined" label="Degree" />
                  </div>
                  <IconButton edge="start" color="secondary"
                    onClick={() => this.RemoveEducation(index)}
                    aria-label="menu" size="medium">
                    <DeleteForever />
                  </IconButton>
                </div>

              })}

            </div>}
          {activeStep == 2 &&
            <div class="card" >
              {/* <img class="card-img-top" src={images.im1} alt="Card image cap" /> */}
              <div class="card-body " >
                <div className="row inputs" >

                  <div className="col-md-2">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.AddCareer()}
                    // className={classes.button}
                    >
                      Add Company
              </Button>

                  </div>
                  <div className="col-md-2">

                    <Button disabled={activeStep === 0} onClick={() => this.switchstep(false)}>
                    <KeyboardBackspace /> Back
</Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.careertab()}
                    // className={classes.button}
                    >
                      {activeStep === step.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>

              </div>
              {this.state.careerArray.map((obj, index) => {
                return <div className="row rows" key={index}>
                  <div className="col-lg-2 inputs">
                    <TextField type="text"
                      value={obj.position}

                      onChange={(event) => this.onchangeInput1(event.target.value, "position", index)}
                      fullWidth variant="outlined" label="Position Name" />
                  </div>
                  <div className="col-lg-2 inputs">
                    <TextField type="text"
                      value={obj.company}

                      onChange={(event) => this.onchangeInput1(event.target.value, "company", index)}
                      fullWidth variant="outlined" label="Company Name" />
                  </div>
                  <div className="col-lg-2 inputs">
                    <TextField type="date"
                      value={obj.start}

                      onChange={(event) => this.onchangeInput1(event.target.value, "start", index)}

                      fullWidth variant="outlined" label="Joined" />
                  </div>
                  <div className="col-md-2 inputs" >
                  <span>Still Working</span>
                  <Checkbox checked={obj.type}
                  value={obj.type} color="primary" 
                  onChange={(event) => this.onchangecheckbox1(event.target.checked, "type", index)}
                  />
                  </div>
                  {obj.type==false &&
                  <div className="col-lg-2 inputs">
                    <TextField type="date"
                      value={obj.end}

                      onChange={(event) => this.onchangeInput1(event.target.value, "end", index)}
                      fullWidth variant="outlined" label="Resigned" />
                  </div>
              }
                  <IconButton edge="start" color="secondary"
                    onClick={() => this.RemoveCareer(index)}
                    aria-label="menu" size="medium">
                    <DeleteForever />
                  </IconButton>
                </div>

              })}

            </div>}
          {activeStep == 3 &&
            <div class="card" >
              {/* <img class="card-img-top" src={images.im1} alt="Card image cap" /> */}
              <div class="card-body">
                <div className="row rows" >

                  <div className="col-md-2">

                    <Button disabled={activeStep === 0} onClick={() => this.switchstep(false)}>
                    <KeyboardBackspace /> Back
</Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.submit()}
                    // className={classes.button}
                    >
                      Submit
                    </Button>
                  </div>
                </div>

              </div>
              <div className="show">
              <List subheader={<ListSubheader>Profile</ListSubheader>} >

                <ListItem  ><ListItemText primary={"Name : " + form.name} /></ListItem>
                <ListItem  ><ListItemText primary={"Email ID : " + form.email} /></ListItem>
                <ListItem  ><ListItemText primary={"Contact no : " + form.contact} /></ListItem>
                <ListItem  ><ListItemText primary={"DOB : " + form.DOB} /></ListItem>
                <ListItem  ><ListItemText primary={"Address : " + form.address} /></ListItem>
              </List>
              <List subheader={<ListSubheader>Education Info</ListSubheader>}>

                {this.state.educationArray.map((obj, index) => {
                  return <ListItem key={index}>

                    <ListItemText primary={"Institute : " + obj.institute} />
                    <ListItemText primary={"Started : " + obj.start} />
                    {obj.end==true ?  <ListItemText primary={"Completed : " +  "not completed"} />:
                     <ListItemText primary={"Completed : " + obj.end} />}
                    <ListItemText primary={"Subject : " + obj.subject} />
                    <ListItemText primary={"Degree : " + obj.degree} />

                  </ListItem>


                })}
              </List>


              <List subheader={<ListSubheader>Career Info</ListSubheader>}>

                {this.state.careerArray.map((obj, index) => {
                  return <ListItem key={index}>

                    <ListItemText primary={"Position : " + obj.position} />
                    <ListItemText primary={"Company : " + obj.company} />
                    <ListItemText primary={"Joined : " + obj.start} />
                    {obj.end==true ?  <ListItemText primary={"Completed : " +  "Still Working"} />:
                     <ListItemText primary={"Completed : " + obj.end} />}

                  </ListItem>


                })}
              </List>
           </div>
            </div>}

          {/* <Typography >{() => this.getStepContent(activeStep)}</Typography> */}
          <div>

          </div>
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
