import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { ActivatedRoute, Route, Router} from '@angular/router';
import {Http} from '@angular/http';
import {formatDate} from '@angular/common';
@Component({
  selector: 'app-sub-task',
  templateUrl: './sub-task.component.html',
  styleUrls: ['./sub-task.component.css'],
})
export class SubTaskComponent implements OnInit {
  id:any;
  date= formatDate(new Date(), 'dd/MM/yyy', 'en');
  getTask:any;
  bindData:any={
    taskName:'',
    inchargeName:''
  }
  addSubTask:any;
  constructor(private dataservice:DataService,private route:ActivatedRoute,private router:Router,private http:Http) { 
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log("id"+this.id)
    this.dataservice.getAllTaskService().subscribe(res=>{
      this.getTask=res;
      console.log(res)
      for(let i=0;i<this.getTask.length;i++){
        if(this.id===this.getTask[i]._id){
          this.bindData.taskName = this.getTask[i].taskName;
          this.bindData.inchargeName = this.getTask[i].inchargeName
          let data = {
            taskName:this.getTask[i].taskName
          }
          this.dataservice.getSubTask(data).subscribe(res=>{
            this.addSubTask=res;
            console.log("taskName"+data)
          })
        }
      }
    });
  }

  subTask(value){
    let data = {
      taskName:this.bindData.taskName,
      subTaskName:value.subTaskName,
      inchargeName:this.bindData.inchargeName,
      createDate:this.date,
      description:value.description,
    }
 this.dataservice.addSubTaskService(data).subscribe(res=>{
 this.addSubTask=res;
 })
  }

}
