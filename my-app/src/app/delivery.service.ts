import {Injectable} from "@angular/core";
import {order} from "../models/order.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";


@Injectable()
export class DeliveryService{
  private CurrentOrders: order[] = [];
  private PickedOrder: order;

  server:string = 'http://localhost:3000/users/order';

  constructor(private http: HttpClient){}

  requestCurrentOrders():Observable<any>{
    return this.http.get(this.server);
  }
  requestPickingOrder(orderId: string):Observable<any>{
    return this.http.put(this.server, orderId);
  }
  requestFinishingOrder(orderId: string):Observable<any>{
    return this.http.delete(this.server+"/"+orderId);
  }
  getCurrentOrders(){
    return this.CurrentOrders;
  }
  getPickedOrder(){
    return this.PickedOrder;
  }
  updateCurrentOrders(){
    this.requestCurrentOrders().take(1).subscribe(
      (data)=>{
        this.CurrentOrders = [];
        //Array.from(data.orderdata).forEach()
        for(let ele of data.orderdata){
          let tmp: order = {
            _id: ele._id,
            username: ele.username,
            description: ele.description,
            address: ele.address,
            contact: ele.contact,
          };
          //console.log(tmp)
          this.CurrentOrders.push(tmp);
        }
      }
    );
    //console.log(this.CurrentOrders);
  }
  pickupOrder(order: order, next){
    this.requestPickingOrder(order._id).take(1).subscribe(
      ()=>{
        let index = this.CurrentOrders.indexOf(order);
        this.PickedOrder = order;
        this.CurrentOrders.splice(index, 1);
        next("success");
      },
      ()=>{
        next("invalid order");
      }
    );
  }
  finishOrder(next){
    let id = this.PickedOrder._id;
    this.requestFinishingOrder(id).take(1).subscribe(
      ()=>{
        this.PickedOrder = null;
        next("success");
      },
      ()=>{
        next("invalid operation");
      });
  }

}
