import {Injectable} from '@angular/core';

@Injectable()

//
// まだ実装してない〜

export class LoadingService {

  constructor() { }

  startLoading(){
    console.log('@@@ startLoading Called');
    setTimeout(()=>this.updateStatus(true), 0);
  }

  endLoading(){
    console.log('@@@ endLoading Called')
    setTimeout(()=>this.updateStatus(false), 0);

  }

  updateStatus(status){
    console.log('@@@ updateLoading Called');
    if(loadingStatus !== status){
      loadingStatus = status
    }
    if(!loadingStatus){
      this.unsetCurtain();
    }
  }

  setCurtain(){
    this.startLoading();
    loadingCurtain = true;
    this.no_scroll();
  }

  unsetCurtain(){
    loadingCurtain = false;
    this.return_scroll();
  }

  isSetCurtain(): boolean {
    return loadingStatus && loadingCurtain;
  }

  isLoading(): boolean {
    return loadingStatus;
  }

  no_scroll() {
    //PC用
    var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    jQuery(document).on(scroll_event,function(e){e.preventDefault();});
    //SP用
    jQuery(document).on('touchmove.noScroll', function(e) {e.preventDefault();});
  }

  //スクロール復活用関数
  return_scroll() {
    //PC用
    var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    jQuery(document).off(scroll_event);
    //SP用
    jQuery(document).off('.noScroll');
  }
}

var loadingStatus: boolean;
var loadingCurtain: boolean;
