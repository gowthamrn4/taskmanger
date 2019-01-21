import { Component, OnInit } from '@angular/core';
import { ShareService } from '../../service/share.service';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlanding',
  templateUrl: './adminlanding.component.html',
  styleUrls: ['./adminlanding.component.css']
})
export class AdminlandingComponent implements OnInit {
  user_details:any=[];
  offlineSet:any;
  getUser:any;
  session={
    username:'',
    email:''
  };
  online:any;
  getTask:any;
  theme:any={
    aside_color:'',
    header_color:'',
    email:''
  };
  theme1:any;
  constructor(private shareservice:ShareService,private router : Router,private dataservice:DataService) { }

  ngOnInit() {
    this.dataservice.getAllTaskService().subscribe(res=>{this.getTask=res;console.log(res)})
    
    var name = JSON.parse(localStorage.getItem("userdetails"));
    this.session.username = name.user.username;
    this.session.email = name.user.email;
    console.log(this.session.username) ;
    let data = {
      status:1
    }
    this.dataservice.findOnline(data).subscribe(res=>{
      this.online=res;
    })
    let data1 = {
      email:this.session.email
    }
    this.dataservice.getThemeservice(data1).subscribe(res=>{
      this.theme1=res;
      this.shareservice.setCurrentTheme(res)
      for(let i=0;i<this.theme1.length;i++){
         this.theme.aside_color = this.theme1[i].aside_color;
         this.theme.header_color = this.theme1[i].header_color;
      }
      console.log(res)
    });
    console.log(this.theme)
  }
   logout(){
     let data = {
       email :this.session.email,
       status:0
     }
    this.dataservice.offline(data).subscribe(res=>{
    this.offlineSet=res;
    })
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userdetails');
    this.router.navigate(['/login'])
    }
    changeTheme(value){
       console.log(value)
        this.theme.aside_color=value.aside_color,
        this.theme.header_color=value.header_color,
        this.theme.email=this.session.email
       this.dataservice.addtheme(this.theme).subscribe(res=>{
        this.theme=res;
        this.shareservice.setCurrentTheme(res)
       })
      console.log(this.theme)
    }
}
