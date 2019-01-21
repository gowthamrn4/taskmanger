import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { ActivatedRoute, Route, Router} from '@angular/router';
import {Http} from '@angular/http';
import date from 'date-and-time';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  data:any;
  interval :any;
  id:any;
  text:any;
  toMail:any;
  getFromMsg:any;
  getMsg=[];
  getFMsg=[];
  bindFMsg:any;
  bindMsg:any;
  getUserMsg:any;
  getusers:any;
  session={
    username:'',
    email:''
  };
  createMessage = {
    username:'',
    email:'',
    usernameTo:'',
    emailTo:'',
    message:[
      { text:this.text}
    ]
  };
  message:any;
  msgTime:any;
  online:any;
  constructor(private dataservice:DataService,private route:ActivatedRoute,private router:Router,private http:Http) { }
  
  ngOnInit() {
    let now = new Date();
    this.msgTime =date.format(now, 'YYYY/MM/DD HH:mm:ss');
    /* get current user data from local storage */
    var name = JSON.parse(localStorage.getItem("userdetails"));
    this.session.username = name.user.username;
    this.session.email = name.user.email;
    this.createMessage.email = name.user.email;
    this.createMessage.username = name.user.username;
    /* end get current user data from local storage */

    /* find online */
    let data = {
      status:1
    }
    this.dataservice.findOnline(data).subscribe(res=>{
      this.online=res;
    })
    /* end find online */
    this.dataservice.getUsers().subscribe(res=>{
    this.getusers=res;
    console.log(res)
    this.id = this.route.snapshot.params['id'];
    for(let i=0;i<this.getusers.length;i++){
      if(this.id===this.getusers[i]._id){
        this.createMessage.usernameTo = this.getusers[i].username;
        this.createMessage.emailTo=this.getusers[i].email;
        this.toMail = this.getusers[i].email;
        console.log(this.id)
      }
    }
    let data = {
      email:this.session.email,
      emailTo:this.toMail
    }
    console.log(data)
    this.dataservice.getuserMessage(data).subscribe(res=>{
    this.getUserMsg=res;
    for(let i=0;i<this.getUserMsg.length;i++){
      this.getMsg.push(this.getUserMsg[i].message);
      console.log(this.getMsg);
      for(let j=0;j<this.getMsg.length;j++){
      this.bindMsg=this.getMsg[j]
      }
    }
    })
    let data1 = {
      email:this.toMail,
      emailTo:this.session.email
    }
    console.log(data)
    this.dataservice.getFromMessage(data1).subscribe(res=>{
    this.getFromMsg=res;
    for(let i=0;i<this.getFromMsg.length;i++){
      this.getFMsg.push(this.getFromMsg[i].message);
      for(let j=0;j<this.getFMsg.length;j++){
        this.bindFMsg=this.getFMsg[j];
      }
    }
    })
    });
  
  }
  sendMessage(value){
    this.text= value;
    let data = {
      username:this.session.username,
      email: this.session.email,
      usernameTo:this.createMessage.usernameTo,
      emailTo:this.toMail,
      message:[
         value] 
         
     
    }
    console.log(value);
    this.dataservice.sendMessageservice(data).subscribe(res=>{
    this.message=res;
    console.log(this.msgTime)
 
    })
  }
 
}
