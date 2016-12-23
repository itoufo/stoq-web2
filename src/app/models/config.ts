//TODO: config-containerの共通化
export class Config {
  public is_private: boolean = false;
  public is_draft: boolean = false;
  public copy_forbidden: boolean = false;

  public auto_weigh: boolean = true;
  
  public allow_show_answer: boolean = false;
  public allow_show_score: boolean = false;

  constructor () {
  }
}
