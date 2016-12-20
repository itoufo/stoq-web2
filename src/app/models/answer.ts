import {
  Question,
  Score,
  Result,
  UserAnswer,
} from "./../models";


export class Answer {
  public value: string;
  public is_dummy: boolean;
  public question: Question;
  public index: number;
  public score: Score;
  public result: Result;

  public delete_flag: boolean = false;
  //public is_new: boolean = false;

  constructor(question: Question) {
    this.question = question;
    this.score = new Score;
    this.index = null;
  }
}
