import { Component, OnInit,ViewChild} from '@angular/core';
import { DataService } from '../../service/data.service';
import { ShareService } from '../../service/share.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
 @ViewChild ('adduserForm') formValue;
  adduser:any;
  finduser:any;
  theme:any={
    btnColor:''
  };
  theme1:any=[]
  constructor(private dataservice:DataService,private shareservice:ShareService) { 
    this.theme1 = this.shareservice.getCurrentTheme();
  }
  ngOnInit() {
    for(let i=0;i<this.theme1.length;i++){
      this.theme.btnColor = this.theme1[i].header_color;
      console.log(this.theme)
    }
  }
  addUser(value){
    let data = {
      username:value.username,
      email:value.email,
      password:value.password,
      role:value.role,
      status:'0'
    }
    this.dataservice.adduserService(data).subscribe(res=>{
   this.adduser=res;
   })
   this.formValue.reset();
  }
  findrole(value){
   let data = {
     role:value
   }
   this.dataservice.finduserservice(data).subscribe(res=>{
   this.finduser=res;
   })
  }
  deleteUser(value){
    let data = {
      _id:value._id,
      role:value.role
    }
    this.dataservice.deluser(data).subscribe(res=>{this.finduser=res})
  }
}
