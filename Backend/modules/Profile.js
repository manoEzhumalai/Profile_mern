var express = require('express');
var router = express.Router();
var moment =require("moment");
const ProfileModel = require('../model/ProfileModel');
var ObjectId = require('mongodb').ObjectID;


router.get('/profile', (req, res) => {
    getProfile(req,res,"")
});
router.post('/profile', (req, res) => {
  
      var x = Validation(req, res)
      if (x == 1) {
          var profileNew= new ProfileModel(req.body)
          profileNew.save((err, data) => {
            if (!err) {
                var alert="Profile Added Successfully !!!"
                getProfile(req,res,alert)

            } else {

                res.status(404).json({ 'message': ["Error in the table"] })

            }
  
  
      })
    }
});
router.put('/profile/:id', (req, res) => {
    var id = req.params.id

    if(ObjectId.isValid(id) !=true){
        res.status(404).json({ 'message': ["Pass data id to update"] })

        // console.log("Valid ObjectID")

     }

    var x = Validation(req, res)
    if (x == 1) {
        ProfileModel.findOneAndUpdate({ _id:ObjectId(req.params.id) }, req.body)
        .exec(function (err, data) {
          if (!err) {
              var alert="Profile Updated Successfully !!!"
              getProfile(req,res,alert)

          } else {

              res.status(404).json({ 'message': ["Error in the table"] })

          }


    })
  }
});
router.delete('/profile/:id', (req, res) => {
    var id = req.params.id
    if(ObjectId.isValid(id) !=true){
        res.status(404).json({ 'message': ["Pass data id to update"] })
     }

        ProfileModel.deleteMany({ _id:ObjectId(req.params.id) })
        .exec(function (err, data) {
          if (!err) {
              var alert="Profile Deleted Successfully !!!"
              getProfile(req,res,alert)

          } else {

              res.status(404).json({ 'message': ["Error in the table"] })

          }


    })
});
function getProfile(req,res){
    ProfileModel.find().then((data, err) => {
        if (err) {

            res.status(400).json({ 'message': "No Data for this user" })
        } else {
            res.status(200).json({ 'data': data })


        }
    })



}
function Validation(req, res) {
    var data = [{ name: "name", type: 1, message_name: "Profile name" },
    { name: "email", type: 2, message_name: "Email ID" },
    { name: "contact", type: 3, message_name: "Contact number" },
    { name: "DOB", type: 4, message_name: "DOB" },
    { name: "address", type: 1, message_name: "Address" },
    { name: "education", type: 5, message_name: "Education" },
    { name: "career", type: 6, message_name: "Career" }]
    var error = []
    var array = data.map((obj) => {
        var y = req.body[obj.name]
        var z = ""
        var x=true
        var mess= " must be a Valid"
if(obj.type != 5 && obj.type != 6){      
        if (y == undefined || y == "") {
            x=false
        }else{           
            if(obj.type==2){
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                x=re.test(String(y).toLowerCase())
               
              
            }else if(obj.type==3){
                var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;

                if (filter.test(y)) {
                  if(y.toString().length==10){
                       x = true;
                  } else {
                      mess='  must be 10  digit mobile number'
                      x = false;
                  }
                }
                else {
                  mess='Not a valid number'
                  x = false;
                }

            }else if(obj.type==4){
               x= moment(y, 'YYYY-MM-DD',true).isValid()
               var mess= " must be a in the format YYYY-MM-DD"
            }
            
        }
   
}else{
    var dats=[]
    var data1 = [{ name: "institute", type: 1, message_name: "Institute name" },
    { name: "start", type: 4, message_name: "Joined Date" },
    { name: "end", type: 5, message_name: "Completed Date" },
    { name: "degree", type: 1, message_name: "Degree name" },
    { name: "subject", type: 1, message_name: "Subject" }]
    var data2 = [{ name: "position", type: 1, message_name: "Position name" },
    { name: "company", type: 1, message_name: "Company name" },
    { name: "start", type: 4, message_name: "Joined Date" },
    { name: "end", type: 5, message_name: "Resigned Date" },
   ]
    if(obj.type==5){
       dats=data1
             
    }else if(obj.type==6){
        dats=data2
              
     }
    if ( typeof y == "object") {
        var array = y.map((obj2,index) => {
            var array1 = dats.map((obj1,index1) => {
               var y1= obj2[obj1.name]
               var z1 = ""
               var ind=index+1
               var end_message="in "+ind +" row of " + obj.message_name
               var mess1= " must be a Valid " +end_message

            var bool =true
            // console.log(obj1.name,y1)
            if (y1 == undefined || y1 == "") {
                bool=false
            }else{           
                if(obj1.type==2){
                    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    bool=re.test(String(y1).toLowerCase())
                   
                  
                }else if(obj1.type==3){
                    var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
    
                    if (filter.test(y1)) {
                      if(y1.toString().length==10){
                        bool = true;
                      } else {
                          mess1='  must be 10  digit mobile number'  +end_message
                          bool = false;
                      }
                    }
                    else {
                      mess1='Not a valid number' +end_message
                      bool = false;
                    }
    
                }else if(obj1.type==4){
                    bool= moment(y1, 'YYYY-MM-DD',true).isValid()
                   var mess1= " must be a in the format YYYY-MM-DD" +end_message
                }else if(obj1.type==5){
                    if(y1!=true){
                        bool= moment(y1, 'YYYY-MM-DD',true).isValid()
                        var mess1= " must be a in the format YYYY-MM-DD" +end_message
                    }
                   
                }
                
            }
            if(bool==false){
                z1 = obj1.message_name + mess1
                error.push(z1)
            }
                return obj1

            })
            // for (var key in obj) {
            //     if (obj.hasOwnProperty(key)) {
            //         console.log(key + " -> " + obj[key]);
            //     }
            // }
            // var x=true
            // var mess= " must be a Valid"
            // if (y == undefined || y == "") {
            //     x=false
            // }else{           
            // }
        })

    }else{           
        x=false
       
    }
    
}

if(x==false){
    z = obj.message_name + mess
    error.push(z)
}
        return obj
    })

    if (error.length != 0) {
        res.status(400).json({ 'message': error })
        return 0
    } else {
        return 1
    }
}

module.exports = router;