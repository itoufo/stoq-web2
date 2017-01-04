"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
require('jquery');
var core_1 = require('@angular/core');
var services_1 = require("./../../../services");
var models_1 = require("./../../../models");
var CoursesIndexComponent = (function () {
    function CoursesIndexComponent(route, _router, _api, el, _auth, _err, _logger, _loading, _popup) {
        this.route = route;
        this._router = _router;
        this._api = _api;
        this.el = el;
        this._auth = _auth;
        this._err = _err;
        this._logger = _logger;
        this._loading = _loading;
        this._popup = _popup;
        this.courses = [];
        // Load開始
        this._loading.startLoading();
    }
    CoursesIndexComponent.prototype.routerOnActivate = function (e) {
        console.log('routerOnActivate');
        console.log(e);
        //this._logger.debug(`Finished navigating from "${prev ? prev.urlPath : 'null'}" to "${next.urlPath}"`); return new Promise(resolve => {
        //  // The ChildCmp gets instantiated only when the Promise is resolved
        //  setTimeout(() => resolve(null), 1000);
        //});
    };
    CoursesIndexComponent.prototype.routerOnDeactivate = function (e) {
        console.log('routerOnDeactivate');
        console.log(e);
        //this._logger.debug(`Finished navigating from "${prev ? prev.urlPath : 'null'}" to "${next.urlPath}"`);
        //return new Promise(resolve => {
        //  // The ChildCmp gets instantiated only when the Promise is resolved
        //  setTimeout(() => resolve(null), 1000);
        //});
    };
    CoursesIndexComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._logger.debug("oninit course index");
        this.coursesLoading = true;
        this._api.getCourses().subscribe(function (data) {
            var body = data.json();
            body.data.forEach(function (obj) {
                console.log(obj);
                var course = new models_1.Course();
                course.id = obj['course_id'];
                course.course_type = obj['course_type'];
                course.name = obj['name'];
                course.description = obj['description'];
                course.questions_count = obj['questions_count'];
                course.times = obj['times'];
                course.userData = {
                    permission: obj['data']['permission'],
                    memo: obj['data']['memo']
                };
                _this.courses.push(course);
                _this._logger.debug(_this.courses);
                _this.coursesLoading = false;
            });
        }, function (err) {
            _this._err.errorInit(err);
            _this._popup.displayError(err, "Error");
        }, function () {
            _this._logger.debug('get courses success');
            _this._loading.endLoading();
        });
    };
    CoursesIndexComponent.prototype.getDetail = function (course_id) {
        this._logger.debug("****** get Datail *******");
        this._logger.debug(course_id);
        this._router.navigate([course_id], { relativeTo: this.route.parent });
    };
    CoursesIndexComponent.prototype.ngAfterContentChecked = function () {
        //jQuery(this.el.nativeElement).find('.project-line')
        //  .each(function(i){
        //    //var self = jQuery(this.el.nativeElement).find('.project-line')[i];
        //    jQuery(this).sparkline([9, 5, 3, 2, 2, 4, 6, 7, 5, 6, 7, 9, 5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7], {
        //      type: 'line',
        //      width: '100%',
        //      height: '30',
        //      lineWidth: 2,
        //      lineColor: '#00bcd4',
        //      fillColor: 'rgba(0, 188, 212, 0.5)',
        //    });
        //});
    };
    CoursesIndexComponent.prototype.deleteCourse = function (course) {
        this._selectedCourse = course;
        var popup = new models_1.PopupBase();
        popup.id = "#modal4";
        popup.contentText = course.name + "を削除してよろしいですか？";
        popup.headerText = "確認";
        popup.okFunction = this._deleteCourse.bind(this);
        popup.cancelFunction = function () { };
        this._popup.displayPopup(popup);
    };
    CoursesIndexComponent.prototype._deleteCourse = function () {
        var _this = this;
        var index = this.courses.indexOf(this._selectedCourse);
        this._loading.startLoading();
        this._api.deleteCourse(this._selectedCourse.id).subscribe(function (data) {
            /**
             * TODO: 処理実装
             */
            _this.courses.splice(index, 1);
        }, function (err) {
            _this._err.errorInit(err);
            _this._popup.displayError(err, "Error");
        }, function () {
            _this._logger.debug('delete courses success');
            _this._loading.endLoading();
        });
    };
    CoursesIndexComponent = __decorate([
        core_1.Component({
            selector: 'courses-index',
            templateUrl: './index.component.html',
            styleUrls: ['./index.component.scss'],
            providers: [
                services_1.ApiService,
                services_1.AuthService,
                services_1.LoggerService,
                services_1.LoadingService,
            ]
        })
    ], CoursesIndexComponent);
    return CoursesIndexComponent;
}());
exports.CoursesIndexComponent = CoursesIndexComponent;
//# sourceMappingURL=index.component.js.map