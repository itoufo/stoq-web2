var jQuery, $ = require('jquery');
var moment = require('moment');

import {
  Answer,
  Question,
  Config,
  Score,
} from "./../models";

export class Course {
  public id:string;
  public name:string; // required
  public description:string;
  public course_type:string; // required
  public questions:Question[] = [];
  public questions_count:number;
  public times:number;
  public config:Config = new Config();
  public created_at:number;
  public updated_at:number;
  public userData: {};
  private _isValid: boolean = false;

  constructor(name:string = "", description:string = "", course_type:string = "", questions:Question[] = []) {
    this.name = name;
    this.description = description;
    this.course_type = course_type;
    this.questions = questions;
    this.userData  = {}
  }

  miniId(): string {
    return this.id.replace(/-.*/, "");
  }

  isValid(){
    return (this.id && this.name && this.course_type);
  }

  createdAt(){
    return moment(this.created_at * 1000).format("YYYY.MM.DD");
  }

  updatedAt(){
    return moment(this.updated_at * 1000).format("YYYY.MM.DD");
  }

  assignParams(
    params: {
      course_id: string,
      name:string,
      description: string,
      course_type: string,
      times: number,
      questions_count: number,
      updated_at: number,
      created_at: number,
      data: {
        memo: string,
        permission: string
      }
      config: {
        copy_forbidden: boolean,
        is_draft: boolean,
        is_private: boolean,
        allow_show_answer: boolean,
        allow_show_score: boolean,
        auto_weigh: boolean
      },
      questions: [{
        data: {
          forget_rate: number,
          memo: string,
          permission: string,
          recommended_score: number
        },
        text: string,
        question_type: string,
        question_id: string,
        answers_count: number,
        version: string,
        weight: number,
        hint: string,
        difficulty: string,
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
        }]
      }]
    }
  ){
    /**
     * データ設定
     * @type {string}
     */
    this.id = params.course_id;
    this.name = params.name;
    this.description = params.description;
    this.course_type = params.course_type;
    this.times = params.times;
    this.questions_count = params.questions_count;
    this.updated_at = params.updated_at;
    this.created_at = params.created_at;
    this.userData = {
      memo: params.data.memo,
      permission: params.data.permission
    };

    /**
     * コンフィグ設定
     */
    if(params.config){
      this.config.copy_forbidden = params.config.copy_forbidden;
      this.config.is_draft = params.config.is_draft;
      this.config.is_private = params.config.is_private;
      this.config.allow_show_answer = params.config.allow_show_answer;
      this.config.allow_show_score = params.config.allow_show_score;
      this.config.auto_weigh = params.config.auto_weigh;
    }

    //this.questions = params.questions;

    /**
     * Question設定
     */
    params.questions.forEach(
      (data: any, index: number) =>{
        var question = new Question(data.question_type, this);
        question.text = data.text;
        question.id = data.question_id;
        question.hint = data.hint;
        question.difficulty = data.difficulty;
        question.index = data.index;
        question.explanation = data.explanation;
        question.answers_count = data.answers_count;
        question.version = data.version;
        question.weight = data.weight;

        if(data.target_score)  {
          question.targetScore = new Score();
          question.targetScore.max = data.target_score.max;
          question.targetScore.min = data.target_score.min;
          question.targetScore.raw = data.target_score.raw;
        }

        if(data.data){
          question.memo = data.data.memo;
          question.forgetRate = data.forget_rate;
          question.recommendedScore = data.recommended_score;
        }

        if(data.config){
          question.config.allow_show_answer = data.config.allow_show_answer;
          question.config.allow_show_score = data.config.allow_show_score;
          question.config.is_draft = data.config.is_draft;
          question.config.is_private = data.config.is_private;
          question.config.copy_forbidden = data.config.copy_forbidden;
          question.config.auto_weigh = data.config.auto_weigh;
        }

        // Answerの初期化
        question.answers = [];
        data.answers.forEach(
          (ans: any, index: number) => {
            var answer = new Answer(question);
            answer.value = ans.value;
            answer.index = ans.index;
            answer.is_dummy = ans.is_dummy;

            // Answerそれぞれの Scoreの初期化
            answer.score = new Score();
            answer.score.max = ans.score.max || 100;
            answer.score.min = ans.score.min || 0;
            answer.score.raw = ans.score.raw;

            question.answers.push(answer);
          }
        );

        this.questions.push(question)
      }
    )
  }
}
