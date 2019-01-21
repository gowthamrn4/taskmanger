import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, XHRBackend } from '@angular/http';
import { resource } from 'selenium-webdriver/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';
import { map } from 'rxjs-compat/operator/map';

@Injectable()
export class DataService {

  
    loginService:any;   /* Login  */
    adduserdata:any;    /* add user */
    getalluser:any; /* Get all User */
    findusers:any; /* find users */
    deleteuser:any /* delete user */
    offlineservice:any; /* set offilne */
    onlineservice:any; /* find online service */
    message:any;
    getUsermsg:any;
    getFrommsg:any;
    task:any;
    theme:any;
    sub_task:any;
    getSub_task:any;
    private socket; 
    // baseURL='https://taskmangertriodesk.herokuapp.com'
    
    baseURL='http://localhost:3000'

    constructor(public http:Http) {
     }
   /* Login Service */
   login(value){
    return this.http.post(this.baseURL+'/users/login',value)
    .map(result=>this.loginService=result.json())
  }
   /** End Login */

   /* add user */
   adduserService(value){
     return this.http.post(this.baseURL+'/users/adduser',value)
     .map(result=>this.adduserdata=result.json())
   }
   /* end add user */

   
   /* Get All User */
   getUsers(){
    const stoken = localStorage.getItem('currentUser');
    const ptoken = JSON.parse(stoken);
    const token = ptoken.token;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
     const options = new RequestOptions({ headers: headers });
     return this.http.get(this.baseURL+'/users/getusers',options)
     .map(result=>this.getalluser=result.json())
   }
   /* End get all user */

   /* find User */
   finduserservice(value){
    const stoken = localStorage.getItem('currentUser');
    const ptoken = JSON.parse(stoken);
    const token = ptoken.token;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
     const options = new RequestOptions({ headers: headers });
     return this.http.post(this.baseURL+'/users/finduser',value,options)
     .map(result=>this.findusers=result.json())
   }
   /* end find user */
  

   /* delete user */
    deluser(value){
      const stoken = localStorage.getItem('currentUser');
      const ptoken = JSON.parse(stoken);
      const token = ptoken.token;
      const headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
       const options = new RequestOptions({ headers: headers });
       return this.http.post(this.baseURL+'/users/delusers',value,options)
       .map(result=>this.deleteuser=result.json())
    }
   /* end delete user */

    /* set offline user */
    offline(value){
      const stoken = localStorage.getItem('currentUser');
      const ptoken = JSON.parse(stoken);
      const token = ptoken.token;
      const headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
       const options = new RequestOptions({ headers: headers });
       return this.http.post(this.baseURL+'/users/setoffline',value,options)
       .map(result=>this.offlineservice=result.json())
    }
    /* set offline user */

   /* find online  */
   findOnline(value){
    const stoken = localStorage.getItem('currentUser');
    const ptoken = JSON.parse(stoken);
    const token = ptoken.token;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
     const options = new RequestOptions({ headers: headers });
     return this.http.post(this.baseURL+'/users/findOnlieUser',value,options)
     .map(result=>this.onlineservice=result.json())
   }
   /* end find online */

   /* send message */
   sendMessageservice(value){
    return this.http.post(this.baseURL+'/message/sendMessage',value)
    .map(result=>this.message=result.json())
   }
   /* end send message */
   /* get current user msg */
   getuserMessage(value){
    return this.http.post(this.baseURL+'/message/getUsermesg',value)
    .map(result=>this.getUsermsg=result.json())
   }
   /* end get current user msg */

   /* get from messgae */
   getFromMessage(value){
    return this.http.post(this.baseURL+'/message/getFrommesg',value)
    .map(result=>this.getFrommsg=result.json())
   }
   /* get from message */

   /* add task */
   addTaskservice(value){
     return this.http.post(this.baseURL+'/task/addTask',value)
     .map(result=>this.task=result.json())
   }
   /* end add task */

   /* get all task */
   getAllTaskService(){
     return this.http.get(this.baseURL+'/task/getTask')
     .map(result=>this.task=result.json())
   }
   /* end get all task */

   /* delete task */
   deleteTaskservice(value){
    return this.http.post(this.baseURL+'/task/delTask',value)
    .map(result=>this.task=result.json())
   }
   /* end delete task */

   /* change theme */
   addtheme(value){
    return this.http.post(this.baseURL+'/theme/changeTheme',value)
    .map(result=>this.theme=result.json())
   }
   /* change theme */

   /* get theme */
   getThemeservice(value){
    return this.http.post(this.baseURL+'/theme/getTheme',value)
    .map(result=>this.theme=result.json())
   }
   /* end get theme */

   /* add sub task */
   addSubTaskService(value){
    return this.http.post(this.baseURL+'/sub_task/addTask',value)
    .map(result=>this.sub_task=result.json())
   }
   /* end add sub task */

   /* get all task */
   getSubTask(value){
    return this.http.post(this.baseURL+'/sub_task/findTask',value)
    .map(result=>this.getSub_task=result.json());
   }
   /* end get all task */
}