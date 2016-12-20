export class Role {

  constructor(public name: string  = null){

  }
  assignParams(
    params: {
      name: string
    }){
    this.name = params.name;
  }
}
