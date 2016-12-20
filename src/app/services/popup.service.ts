import {Injectable} from "@angular/core";

import {
  PopupBase,
  ErrorMessage,
} from "./../models";

import {
  ErrorService,
} from "./../services";

var POPUPBASE = new PopupBase();

@Injectable()
export class PopupService {
  private _currentPopup: PopupBase;

  constructor(
    private _error: ErrorService
  ){ }

  currentBase(): PopupBase {
    return POPUPBASE;
  }

  closePopup(){
    jQuery(POPUPBASE.id).closeModal();
  }


  displayPopup(popup: PopupBase){
    POPUPBASE = popup;
    jQuery(POPUPBASE.id).openModal();
  }

  /**
   * エラーレスポンスをポップアップに表示する
   * @param err エラーレスポンス
   */
  displayError(err, headerText, modalId="#modal3"){
    if (this._error.errorInit(err)) {
      var popup = new PopupBase();
      popup.errorMessages = this._error.errors();
      //popup.contentText = this._error.errorText();
      popup.headerText = headerText;
      popup.id = modalId;
      this.displayPopup(popup);
    }
  }
}
