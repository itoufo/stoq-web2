import {
  Course,
  Question,
  Answer,
  Config,
} from "./../models";

export class ActivityEntry {
  entry_id: string;
  status: string;
  //statements_count: number; 必要ないべ
  activity_type: string;
  activity_id: string;
  activity_name: string;
  created_at: number;
  update_at: number;

  constructor (
  ) {
  }

  assignParams(params:{
    entry_id: string,
    status: string,
    created_at: number,
    updated_at: number,
    activity: {
      id: string,
      type: string,
      name: string
    }
  }) {
    if(params.entry_id) {
      this.entry_id = params.entry_id;
    }
    if(params.status) {
      this.status = params.status;
    }
    if(params.created_at) {
      this.created_at = params.created_at;
    }
    if(params.updated_at) {
      this.update_at = params.updated_at;
    }
    if(params.activity){
      this.activity_id = params.activity.id;
      this.activity_type = params.activity.type;
      this.activity_name = params.activity.name;
    }
  }
}
