import { Component, OnInit,ViewChild} from '@angular/core';
import { DataService } from '../../service/data.service';
import { ShareService} from '../../service/share.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  Task:any;
  getTask:any;
  delTask:any;
  theme:any={
    btnColor:''
  };
  theme1:any=[]
  @ViewChild ('task') formvalue;
  constructor(private dataservice:DataService,private shareservice:ShareService) {
    this.theme1 = this.shareservice.getCurrentTheme();

   }

  ngOnInit() {
    this.dataservice.getAllTaskService().subscribe(res=>{this.getTask=res;console.log(res)});
    for(let i=0;i<this.theme1.length;i++){
      this.theme.btnColor = this.theme1[i].header_color;
      console.log(this.theme)
    }
  }
  addTask(value){
    this.dataservice.addTaskservice(value).subscribe(res=>{this.getTask=res;this.formvalue.reset()})
  }
  deleteTask(value){
    let data  = {
      _id:value._id
    }
    this.dataservice.deleteTaskservice(data).subscribe(res=>{this.getTask=res})
  }
}
