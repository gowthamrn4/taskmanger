import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HttpModule} from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './service/data.service';
import { ShareService } from './service/share.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminlandingComponent } from './admin/adminlanding/adminlanding.component';
import { HomeComponent } from './admin/home/home.component';
import { UsersComponent } from './admin/users/users.component';
import { MessageComponent } from './admin/message/message.component';
import { TaskComponent } from './admin/task/task.component';
import { SubTaskComponent } from './admin/sub-task/sub-task.component';
import { UserlandingComponent } from './user/userlanding/userlanding.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminlandingComponent,
    HomeComponent,
    UsersComponent,
    MessageComponent,
    TaskComponent,
    SubTaskComponent,
    UserlandingComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    HttpModule,
    FormsModule, ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot([
      { path:'login',component:LoginComponent },
      { path:'',pathMatch:'full',redirectTo:'login'},
      { path:'admin',component:AdminlandingComponent,
      children:[
      { path:'home',component:HomeComponent },
      { path:'',pathMatch:'full',redirectTo:'home'},
      { path:'users',component:UsersComponent } ,
      { path:'message/:id',component:MessageComponent },
      { path:'task',component:TaskComponent },
      { path:'sub_task/:id',component:SubTaskComponent }
      ]},
      { path:'user',component:UserlandingComponent } 
    ])
  ],
  providers: [DataService,ShareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
