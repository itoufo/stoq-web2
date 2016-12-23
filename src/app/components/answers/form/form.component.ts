import {Component} from '@angular/core';

import {
  Answer,
  Question
} from "./../../../models"

@Component({
  selector: 'answer-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  inputs: ["answer", "question"],
})

export class AnswersFormComponent {
  public question: Question;
  public answer: Answer;
  public random = Math.floor( Math.random() * 10000000 );
  public dummy_id =  "is_dummy_" + this.random;
  public index: number;

  constructor(){

  }

  deleteAnswer(){

  }
  setAnswer(answer: Answer) {
    this.answer = answer;
  }
}
