import {
  Course,
  Question,
} from "./../models";

export interface ActivityParams {
  entry_id: string,
  activity: any,
  status: string,
  current_index: number,
  actor: any
}

export class ActivitySession {
  public entry_id: string;
  public course: Course;
  public questions: Question[];
  public currentIndex: number;
  public status: string;
  public create_at: number;
  public updated_at: number;

  constructor(
    activity_type: string,
    activity_params: ActivityParams
  ){
    console.log("activity params");
    console.log(activity_params);
    switch(activity_type){
      case 'training':
        this.course = new Course('training');
        // activityとしてコースが指定された場合の処理
        this.course.assignParams(activity_params.activity);
      case 'test':
        this.course = new Course('test');
        // activityとしてコースが指定された場合の処理
        this.course.assignParams(activity_params.activity);
      case 'question':
      // activityとしてQuestionが指定された場合の処理
      default:
        break;
    }
    this.status = activity_params.status;
    this.entry_id = activity_params.entry_id;
    this.currentIndex = activity_params.current_index;
  }

  getCourse(){
    return this.course;
  }
}