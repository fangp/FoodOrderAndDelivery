export class user{
  _id: string;
  username: string;
  password: string;
  passwordconf: string;
  address: string;
  type: string;
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
  getUsername(){
    return this.username
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
