import {
  ErrorMessage
} from "./../models";

export class PopupBase {
  public headerText: string;
  public contentText: string;
  public errorMessages: ErrorMessage[];
  public contentColor: String = "teal";
  public imageSrc: String;
  public id: string;

  public okFunction: Function = () => {};
  public cancelFunction: Function = () => {};

  constructor() {}
}