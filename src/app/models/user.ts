export class User {
  public id:string;
  public uid:string; // required
  public email:string;
  public role:{name: string};

  constructor(params){
    if(params){
      this.id = params.id;
      this.uid = params.uid;
      this.email = params.email;
      this.role = params.role;
    }
  }
  assignParams(
    params: {
      id: string,
      uid:string,
      email: string,
  }){
      this.id = params.id;
      this.uid = params.uid;
      this.email = params.email;
  }
}
