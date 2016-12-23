import {
  Question,
} from "./../models";

export class Reference {
  public id:string;
  public value: string;
  public reference_type: string;
  public question: Question;

  constructor(
    value: string,
    reference_type: string = "text",
    question:Question = undefined,
    id: string = undefined
  ) {
    this.value = value;
    this.reference_type = reference_type;
    this.question = question;
    this.id = id;
  }
};
