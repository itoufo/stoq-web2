import {
  User,
} from "./../models";

export class Group {
  public id:string;
  public name:string; // required
  public description:string;
  public group_code:string;
  public role_name:string;
  public users: User[] = [];

  assignParams(
    params: {
      group_id: string,
      name:string,
      group_code: string,
      description: string,
      group_users: User[],
      role: {name: string}
    }){
    this.id = params.group_id;
    this.name = params.name;
    this.group_code = params.group_code;
    this.description = params.description;
    this.role_name = params.role.name;
    var that = this;
    params.group_users.forEach(
      function(user){
        that.users.push(new User(user));
      }
    );
  }
}
