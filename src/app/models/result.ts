import {
  Score,
} from "./../models";

export class Result {
  public targetScore: Score;
  public userScore: Score;
  public userAnswer: any;
  public completion: boolean;
  public success: boolean;
  public duration: number;
  public score: Score;

  constructor() {}

  init(
    targetScore: Score,
    userScore: Score,
    userAnswer: any
  ){

  }

  assignParams(params: {
    completion: boolean,
    duration: number,
    success:boolean,
    score: {
      max: number,
      min: number,
      raw: number
    }
  }){
    this.completion = params.completion;
    this.duration = params.duration;
    this.success = params.success;
    this.score = new Score();
    this.score.max = params.score.max;
    this.score.min = params.score.min;
    this.score.raw = params.score.raw;
  }
}