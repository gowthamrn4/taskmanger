import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { ShareService } from '../../service/share.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  online:any;
  getTask:any;
  theme:any={
    btnColor:''
  };
  theme1:any=[]
  constructor(private dataservice:DataService,private shareservice:ShareService) { 
    this.theme1 = this.shareservice.getCurrentTheme();
  }

  ngOnInit() {
    let data = {
      status:1
    }
    
    console.log(this.theme1)
    this.dataservice.findOnline(data).subscribe(res=>{
    this.online=res;
    });
    this.dataservice.getAllTaskService().subscribe(res=>{this.getTask=res;console.log(res)})
  }
}
