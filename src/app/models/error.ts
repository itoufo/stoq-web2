// バリデーション関連 errorMessage
export class ErrorMessage {

  private _params: string[];
  private _message: string[];
  private _code: string;

  constructor(error) {
    this._params =  error.params;
    this._message = error.messages;
    this._code = error.code;
  }
  params(separator: string  = ", "): string {
    if(this._params == null) {
      return null;
    }
    return this._params.join(separator)
  }

  paramsArray(): string[] {
    return this._params
  }

  messagesArray(): string[] {
    return this._message
  }

  messages(separator: string  = ", "): string {
    if(this._message == null) {
      return null;
    }
    return this._message.join(separator)
  }
}