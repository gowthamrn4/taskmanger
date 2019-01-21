import { Component, OnInit,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {DataService} from '../service/data.service';
import {ShareService} from '../service/share.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  resMessage:any;
  resUser:any;
  constructor(private router : Router,private dataservice:DataService,private shareService:ShareService) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')){
      var name = JSON.parse(localStorage.getItem("userdetails"));
      if(name.user.role==="admin"){
        this.router.navigate(['/admin'])
      }else if(name.user.role==="student"){
        this.router.navigate(['/studentlanding/studentHome'])

      }
      
    }
  }
  onLogin(value){
    console.log(value)
    //  let data = {
     //    email:value.email,
     //    password:value.password
     //  }   // http call start
     //  if(localStorage.getItem('currentUser',JSON.stringify({token:res.token}))){
 
     //  }
     
      this.dataservice.login(value).subscribe(res=>{
        if(res.message==="Authentication failed. User not found."){
          this.resMessage = "User Not Found !";

        }else if(res.message==="Authentication failed. Wrong password."){
          this.resMessage = "Wrong Password !";

        }
        else{

         if(res.user.role ==="admin"){
          this.router.navigate(['/admin']);
          localStorage.setItem('currentUser',JSON.stringify({token:res.token}));
          localStorage.setItem('userdetails',JSON.stringify({user:res.user}));
          this.shareService.setCurrentProfile(res.user);
          this.resUser = res.user;

         }else if(res.user.role ==="user"){
          this.router.navigate(['/user']);
          localStorage.setItem('currentUser',JSON.stringify({token:res.token}));
          localStorage.setItem('userdetails',JSON.stringify({user:res.user}));
          this.shareService.setCurrentProfile(res.user);
          this.resUser = res.user;

         }
        }
      
   })
 
 }

}
