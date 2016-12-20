import {
  Result,
  Question,
} from "./../models";

export class UserAnswer {
  public answered_time: number;
  public relative_score: number;
  public result: Result;
  public value: string;
  public question: Question;

  constructor() {}

  assignParams(
    params: any
    //{
    //  answered_time: number,
    //  relative_score: number,
    //  result: any,
    //  value: string
    //}
  ) {
    if(params.answered_time) {
      this.answered_time = params.answered_time;
    }
    if(params.relative_score) {
      this.relative_score = params.relative_score;
    }
    if(params.result) {
      this.result = new Result();
      this.result.assignParams(params.result);
    }
    if(params.value) {
      this.value = params.value;
    }
  }

}