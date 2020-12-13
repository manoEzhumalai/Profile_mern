import axios from 'axios';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
const URL="http://192.168.43.89:5000/user/profile/"



toast.configure()
export const success = (data) => {
    toast.success(data,{autoClose:2000})
    // toast.success('Basic notification',{autoClose:3000})

};
export const info = (data) => {
    toast.info(data,{autoClose:2000})

};
export const infodelay = (data) => {
    toast.info(data,{autoClose:5000})

};
export const errorAlert = (data) => {
    toast.error(data,{autoClose:2000})

};

export const getProfile = value => {
    var options = {
    url: URL,
    method: 'GET'
    };
    return axios(options)
  };

  export const addProfile = (value) => {
    var options = {
    url: URL,
    method: 'POST',
      headers: {'Content-Type': 'application/json'}, data: value
    };
    return axios(options)
  };
  
  export const updateProfile = (value) => {
    console.log(value)
    var options = {
    url: URL+value.id+'/',
    method: 'PUT',
      headers: {'Content-Type': 'application/json'}, data: value
    };
    return axios(options)
  };
  
  export const deleteProfile = (value) => {
    var options = {
    url: URL+value,
    method: 'DELETE',
      
    };
    return axios(options)
  };
