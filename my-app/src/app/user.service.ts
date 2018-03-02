import { Injectable } from "@angular/core"
import { HttpClient} from "@angular/common/http";
import { user } from "../models/user.model";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService{

  server = 'http://localhost:3000/users'
  LoggedIn = false;

  constructor( private http: HttpClient,
               private user: user
  ){}
  getStatus(){
    return this.LoggedIn;
  }
  UserLogin(){
    this.LoggedIn = true;
  }
  UserLogout(){
    this.LoggedIn = false;
    this.user.clear();
  }
  UserProfileUpdate(next){
    this.update().take(1).subscribe(
      ()=>{
        next("update success!");
      },
      ()=>{
        next("error!");
      }
    );
  }
  signup():Observable<any>{
    return this.http.post(this.server + '/signup', this.user.getSignupData())
  }

  check():Observable<any>{
    return this.http.get(this.server+'/check')
  }
  login():Observable<any>{
    //console.log(this.user.getUsername())
    return this.http.post(this.server + '/login', this.user.getUserInfo())
  }
  update():Observable<any>{
    return this.http.put(this.server+"/user", this.user.getOrderInfo());
  }
}
