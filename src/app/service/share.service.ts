import { Injectable } from '@angular/core';
@Injectable()
export class ShareService {

    user:any
    currentProfile:any;
    currentTheme:any;
    constructor() { }
    // setUser(value){
    //     this.user=value
    // }
    setCurrentProfile(value){
        this.currentProfile=value;
        console.log(value)
    }
    getCurrentProfile(){
        return this.currentProfile;
    }
    setCurrentTheme(value){
      this.currentTheme=value
    }
    getCurrentTheme(){
        return this.currentTheme;
    }
}