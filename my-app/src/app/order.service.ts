import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { order } from "../models/order.model";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/first'

@Injectable()
export class OrderService{

  private CurrentOrders: order[] = [
  ];

  private HistoryOrders: order[] = [
  ];

  server:string = 'http://localhost:3000/users/order';

  constructor(private http: HttpClient)
  {}

  requestCurrentOrders():Observable<any>{
    return this.http.get(this.server);
  }
  requestHistoryOrders():Observable<any>{
    return this.http.get(this.server);
  }
  getCurrentOrders(){
    return this.CurrentOrders;
  }
  getHistoryOrders(){
    return this.HistoryOrders;
  }
  addToCurrentOders(order: order){
    this.CurrentOrders.push(order);
  }
  addToHistoryOrders(order: order){
    this.HistoryOrders.push(order);
  }
  placeOrder(Order: order):Observable<any>{
    return this.http.post(this.server, Order);
  }
  updateCurrentOrder(){
    this.requestCurrentOrders().take(1).subscribe(
      (data)=>{
        this.CurrentOrders = [];
        //Array.from(data.orderdata).forEach()
        for(let ele of data.orderdata){
          let status = "waiting";
          if(ele.driver){
            status = "delivering";
          }
          let tmp: order = {
            _id: ele._id,
            username: ele.username,
            description: ele.description,
            address: ele.address,
            driver: ele.driver,
            contact: ele.contact,
            status: status
          };
          //console.log(tmp)
          this.CurrentOrders.push(tmp);
        }
      }
    );
    //console.log(this.CurrentOrders);
  }
  updateHistoryOrder(){
    this.requestHistoryOrders().take(1).subscribe(
      (data)=>{
        this.CurrentOrders = [];
        for(let ele of data.orderdata){
          let status = "finished";
          let tmp: order = {
            _id: ele._id,
            username: ele.username,
            description: ele.description,
            address: ele.address,
            driver: ele.driver,
            contact: ele.contact,
            status: status
          };
          //console.log(tmp)
          this.HistoryOrders.push(tmp);
        }
      }
    );
  }
}
