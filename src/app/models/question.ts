import 'jquery';
import 'moment';

import {
  Course,
  Answer,
  Config,
  Result,
  Score,
  Reference,
} from "./../models";

export class Question {
  public id:string;
  public text:string;
  public hint:string;
  public difficulty:number;
  public explanation:string;
  public type:string;
  public course:Course;
  public answers:Answer[] = [];
  public references:Reference[] = [];
  public answers_count:number;
  public version:string;
  public weight:number;
  public index:number;
  public config:Config = new Config();
  public created_at:number;
  public updated_at:number;
  public memo:string;
  public result:Result;
  public userAnswer:string;
  public forgetRate:number;
  public recommendedScore:number;
  public targetScore:Score;


  // この引数順序は絶対間違っていると思うｗ
  constructor(type:string = "", course:Course = undefined, index:number = undefined) {
    this.type = type;
    this.course = course;
    this.index = index;
    this.answers = [];
    //this.answers.push(new Answer(this));
  }

  textHtml() {
    return $(this.text).html();
  }

  createdAt() {
    return moment(this.created_at * 1000).format("YYYY-MM-DD");
  }

  updatedAt() {
    return moment(this.updated_at * 1000).format("YYYY-MM-DD");
  }

  assignParams(params:{
    data: {
      forget_rate: number,
      memo: string,
      recommended_score: number
    },
    text: string,
    question_type: string,
    question_id: string,
    answers_count: number,
    version: string,
    weight: number,
    hint: string,
    difficulty: number,
    explanation: string,
    index: number,
    target_score: {
      max: number,
      min: number,
      raw: number
    }
    config: {
      copy_forbidden: boolean,
      is_draft: boolean,
      is_private: boolean,
    },
    answers:[{
      value: string,
      index: number,
      is_dummy: boolean,
      score:{
        max: number,
        min: number,
        raw: number,
      }
    }],
    references: [{
      value: string,
      id: string,
      reference_type: string
    }]
  }) {
    /**
     * データ設定
     * @type {string}
     */
    //this.id = params.course_id;
    //this.created_at = params.created_at;
    //this.updated_at = params.updated_at;

    /**
     * コンフィグ設定
     */
    if (params.config) {
      this.config.copy_forbidden = params.config.copy_forbidden;
      this.config.is_draft = params.config.is_draft;
      this.config.is_private = params.config.is_private;
    }

    //this.questions = params.questions;

    /**
     * Question設定
     */
    this.text = params.text;
    this.id = params.question_id;
    this.hint = params.hint;
    this.difficulty = params.difficulty;
    this.index = params.index;
    this.explanation = params.explanation;
    this.answers_count = params.answers_count;
    this.version = params.version;
    this.weight = params.weight;

    if (params.target_score) {
      this.targetScore = new Score();
      this.targetScore.max = params.target_score.max;
      this.targetScore.min = params.target_score.min;
      this.targetScore.raw = params.target_score.raw;
    }

    if (params.data) {
      this.memo = params.data.memo;
      this.forgetRate = params.data.forget_rate;
      this.recommendedScore = params.data.recommended_score;
    }

    if (params.config) {
      this.config.is_draft = params.config.is_draft;
      this.config.is_private = params.config.is_private;
      this.config.copy_forbidden = params.config.copy_forbidden;
    }

    // Answerの初期化
    this.answers = [];
    params.answers.forEach(
      (ans:any, index:number) => {
        var answer = new Answer(this);
        answer.value = ans.value;
        answer.index = ans.index;
        answer.is_dummy = ans.is_dummy;

        // Answerそれぞれの Scoreの初期化
        answer.score = new Score();
        answer.score.max = ans.score.max || 100;
        answer.score.min = ans.score.min || 0;
        answer.score.raw = ans.score.raw;

        this.answers.push(answer);
      }
    );



    this.references = [];
    params.references.forEach(
      (ref_params: {
        value: string,
        id: string,
        reference_type: string
      }, index:number) => {
        var reference = new Reference(
          ref_params.value,
          ref_params.reference_type,
          this
        );
        this.references.push(reference);
      }
    );

  }
}

