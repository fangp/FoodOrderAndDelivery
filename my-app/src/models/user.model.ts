export class user{
  private _id: string;
  private username: string;
  private password: string;
  private passwordconf: string;
  private address: string;
  private type: string;
  private contact: string;

  getUserType(){
    return this.type;
  }
  getUserInfo(){
    return{
      username: this.username,
      password: this.password,
    }
  }
  getSignupData(){
    return {
      username: this.username,
      password: this.password,
      passwordconf: this.passwordconf,
      address: this.address,
      type: this.type
    }
  }
  getOrderInfo(){
    return {
      address: this.address,
      contact: this.contact
    }
  }
  getUsername(){
    return this.username==null?"":this.username;
  }
  clear(){
    this.username = '';
  }
  update(user){
    if(user._id)
      this._id = user._id
    if(user.username)
      this.username = user.username
    if(user.address)
      this.address = user.address
    if(user.password)
      this.password = user.password
    if(user.type)
      this.type = user.type
    if(user.passwordconf)
      this.passwordconf=user.passwordconf
  }
}
