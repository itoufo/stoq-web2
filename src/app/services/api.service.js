"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var ApiService = (function () {
    function ApiService(_http) {
        this._http = _http;
        this.api_path = process.env.API_ENDPOINT;
        this.analyze_path = process.env.ANALYZE_ENDPOINT;
        this.material_bucket = process.env.MATERIAL_BUCKET;
    }
    // *********************** ***************************
    // **  User 関連  *******+ ***************************
    // *********************** ***************************
    /**
     * ユーザ登録
     * @param params {email, password, password_confirmation}
     * @returns {Observable<Response>|Observable<R>}
     */
    ApiService.prototype.postSignup = function (params) {
        params['email'] = params['email'] || "";
        params['password'] = params['password'] || "";
        params['password_confirmation'] = params['password_confirmation'] || "";
        params['confirm_success_url'] = "https://" + document.location.hostname + "#/confirmation";
        console.log("post signup");
        return this._callPostApi('Anonymous', '/auth', params);
    };
    /**
     * ログイン
     * @param params { email, passeword }
     * @returns {Observable<Response>|Observable<R>}
     */
    ApiService.prototype.postLogin = function (params) {
        return this._callPostApi('Anonymous', '/auth/sign_in', params);
    };
    /**
     * ログイン
     * @param params { email, passeword }
     * @returns {Observable<Response>|Observable<R>}
     */
    ApiService.prototype.postResetPassword = function (params) {
        params['redirect_udl'] = "https://" + document.location.hostname + "#/login";
        return this._callPostApi('Anonymous', '/auth/password', params);
    };
    /**
     * トークンの有効性検証
     * ヘッダから uid, client, access-token を取得
     * @returns {Observable<R>|Observable<R>}
     */
    ApiService.prototype.getValidateToken = function () {
        console.log("get validate_token");
        var params = {
            'access-token': localStorage.getItem('Access-Token'),
            'client': localStorage.getItem('Client'),
            'uid': localStorage.getItem('Uid')
        };
        return this._callGetApi('Anonymous', '/auth/validate_token', params);
    };
    /**
     * ログアウト
     * @returns {Observable<R>|Observable<R>}
     */
    ApiService.prototype.deleteLogout = function () {
        console.log("delete logout");
        return this._callDeleteApi('Secured', '/auth/sign_out');
    };
    // *********************** ***************************
    // **  Course 関連  *******+ ***************************
    // *********************** ***************************
    /**
     * コースの新規作成
     * @param course
     * @returns {Observable<Response>|Observable<R>}
     */
    ApiService.prototype.postCreateCourse = function (course) {
        console.log("post create course");
        var config = course.config;
        var params = {
            course: {
                name: course.name,
                course_type: course.course_type,
                description: course.description,
                config: {
                    is_private: config.is_private,
                    is_draft: config.is_draft,
                    copy_forbidden: config.copy_forbidden,
                    auto_weigh: config.auto_weigh
                },
                questions: []
            }
        };
        course.questions.forEach(function (question) {
            var question_params = {
                text: question.text,
                hint: question.hint,
                explanation: question.explanation,
                question_type: question.type,
                answers: []
            };
            question.answers.forEach(function (answer) {
                if (answer.value) {
                    var answer_params = {
                        value: answer.value,
                        is_dummy: answer.is_dummy,
                        delete_flag: answer.delete_flag
                    };
                    question_params.answers.push(answer_params);
                }
            });
            params.course.questions.push(question_params);
        });
        return this._callPostApi('Secured', '/courses/new', params);
    };
    /**
     * Publicコース一覧取得
     * @returns {Observable<R>|Observable<R>}
     */
    ApiService.prototype.getPublicCourses = function () {
        console.log("get public courses");
        return this._callGetApi('Secured', '/courses/public');
    };
    /**
     * コース一覧取得
     * @returns {Observable<R>|Observable<R>}
     */
    ApiService.prototype.getCourses = function () {
        console.log("get courses");
        return this._callGetApi('Secured', '/courses');
    };
    /**
     * コースの編集
     * @param course
     * @returns {Observable<Response>|Observable<R>}
     */
    ApiService.prototype.postEditCourse = function (course) {
        console.log("post edit course");
        var config = course.config;
        var params = {
            course: {
                name: course.name,
                course_type: course.course_type,
                description: course.description,
                config: {
                    is_private: config.is_private,
                    is_draft: config.is_draft,
                    copy_forbidden: config.copy_forbidden,
                    auto_weigh: config.auto_weigh
                }
            }
        };
        return this._callPostApi('Secured', '/courses/' + course.id + "/edit", params);
    };
    /**
     * コース詳細取得
     * @param course_id
     * @returns {Observable<R>|Observable<R>}
     */
    ApiService.prototype.getCourse = function (course_id) {
        console.log('get course');
        return this._callGetApi('Secured', '/courses/' + course_id);
    };
    /**
     * コース詳細 ..同上
     * @param id
     * @returns {Observable<R>|Observable<R>}
     */
    ApiService.prototype.getCourseDetail = function (id) {
        return this.getCourse(id);
    };
    /**
     * コース削除
     * @param course_id
     * @returns {Observable<R>|Observable<R>}
     */
    ApiService.prototype.deleteCourse = function (course_id) {
        console.log('delete course');
        return this._callDeleteApi('Secured', '/courses/' + course_id);
    };
    /**
     * Question 追加
     * @param course
     * @param question
     * @returns {Observable<Response>|Observable<R>}
     */
    ApiService.prototype.postAddQuestion = function (course, question) {
        console.log("post create course");
        var question_param = {
            text: question.text,
            hint: question.hint,
            explanation: question.explanation,
            question_type: question.type,
            answers: []
        };
        question.answers.forEach(function (answer) {
            if (answer.value) {
                var answer_params = {
                    value: answer.value,
                    is_dummy: answer.is_dummy || false,
                    delete_flag: answer.delete_flag
                };
                question_param.answers.push(answer_params);
            }
        });
        var params = { question: question_param };
        return this._callPostApi('Secured', '/courses/' + course.id + "/add_question/", params);
    };
    /**
     * Question 追加
     * @param course
     * @param question
     * @returns {Observable<Response>|Observable<R>}
     */
    ApiService.prototype.postEditQuestion = function (course, question) {
        console.log("post create course");
        var question_param = {
            text: question.text,
            hint: question.hint,
            explanation: question.explanation,
            difficulty: question.difficulty,
            question_type: question.type,
            answers: []
        };
        question.answers.forEach(function (answer) {
            if (answer.value) {
                var answer_params = {
                    value: answer.value,
                    is_dummy: answer.is_dummy || false,
                    //is_new: answer.is_new,
                    delete_flag: answer.delete_flag,
                    index: answer.index
                };
                if (question.type == 'input') {
                    answer_params['score'] = answer.score.raw;
                }
                //if(answer.index != null) {
                //  answer_params['index'] = answer.index;
                //} else {
                //  answer_params['is_new'] = true;
                //}
                question_param.answers.push(answer_params);
            }
        });
        var params = { question: question_param };
        return this._callPostApi('Secured', '/courses/' + course.id + "/questions/" + question.id + '/edit', params);
    };
    /**
     * Question 削除
     * @param course
     * @param question
     * @returns {Observable<Response>|Observable<R>}
     */
    ApiService.prototype.deleteCourseQuestion = function (course, question) {
        return this._callDeleteApi('Secured', '/courses/' + course.id + "/questions/" + question.id);
    };
    // *********************** ***************************
    // **  ActivityEntry 関連  *******+ ***************************
    // *********************** ***************************
    /**
     * エントリー一覧取得
     * @returns {Observable<R>|Observable<R>}
     */
    ApiService.prototype.getEntries = function () {
        console.log('start get Entries');
        return this._callGetApi('Secured', '/entries/');
    };
    /**
     * トレーニング解答
     * @param entryId string
     * @param questionId string
     * @param userAnswer string
     * @returns {Observable<R>|Observable<R>}
     */
    ApiService.prototype.postTrainingAnswer = function (entryId, questionId, userAnswer, memo) {
        console.log('Training Answer');
        return this._callPostApi('Secured', '/trainings/' + entryId + '/questions/' + questionId + "/answer", { user_answer: userAnswer, memo: memo });
    };
    /**
     * トレーニング一時停止
     * @param entryId
     */
    ApiService.prototype.postTrainingSuspend = function (entryId, current_index) {
        if (current_index === void 0) { current_index = null; }
        console.log('suspend training');
        return this._callPostApi('Secured', '/trainings/' + entryId + '/suspend', { current_index: current_index });
    };
    /**
     * エントリーの詳細取得
     * @param entryId
     * @returns {Observable<R>|Observable<R>}
     */
    ApiService.prototype.getActivity = function (entryId) {
        console.log('Get Activity' + entryId);
        return this._callGetApi('Secured', '/trainings/' + entryId);
    };
    // *********************** ***************************
    // **  Training 関連  *******+ ***************************
    // *********************** ***************************
    /**
     * トレーニング開始
     * @param course_id
     * @returns {Observable<R>|Observable<R>}
     */
    ApiService.prototype.getTrainingStart = function (course_id) {
        console.log('start training');
        return this._callGetApi('Secured', '/trainings/' + course_id + '/start');
    };
    /**
     * トレーニング終了
     * @param entry_id
     */
    ApiService.prototype.postTrainingEnd = function (entryId) {
        console.log('end training');
        return this._callPostApi('Secured', '/trainings/' + entryId + '/end');
    };
    /**
     * トレーニング結果取得
     * @param entryId
     */
    ApiService.prototype.getTrainingResults = function (entryId) {
        console.log('end training');
        return this._callGetApi('Secured', '/trainings/' + entryId + '/results');
    };
    /**
     * トレーニング再開
     * @param entryId
     */
    ApiService.prototype.postTrainingResume = function (entryId) {
        console.log('resume training');
        return this._callPostApi('Secured', '/trainings/' + entryId + '/' + 'resume');
    };
    /**
     * トレーニング 強制終了
     * @param entryId
     */
    ApiService.prototype.postTrainingExit = function (entryId) {
    };
    /**
     * エントリーの再開
     * @param entryId
     * @returns {Observable<R>|Observable<R>}
     */
    ApiService.prototype.postResumeActivity = function (entryId) {
        console.log('Resume Activity' + entryId);
        return this._callPostApi('Secured', '/trainings/' + entryId + '/resume');
    };
    // *********************** ***************************
    // **  グループ関連  *******+ ***************************
    // *********************** ***************************
    /**
     * ユーザランクの取得
     * @param userId
     * @returns {Observable<Response>}
     */
    ApiService.prototype.getGroup = function (group_id) {
        return this._callGetApi('Secured', "/groups/detail?group_id=" + group_id);
    };
    ApiService.prototype.getGroups = function () {
        return this._callGetApi('Secured', "/groups/");
    };
    /**
     * グループの作成
     * @param group: Group
     * @returns {Observable<Response>}
     */
    ApiService.prototype.postCreateGroup = function (group, parent) {
        if (parent === void 0) { parent = null; }
        if (parent) {
            return this._callPostApi('Secured', "/groups/add_group", {
                group_id: parent,
                group: {
                    name: group.name,
                    group_code: group.group_code,
                    description: group.description
                }
            });
        }
        else {
            return this._callPostApi('Secured', "/groups/new", {
                group: {
                    name: group.name,
                    group_code: group.group_code,
                    description: group.description
                } });
        }
    };
    ApiService.prototype.postEditGroup = function (group) {
        return this._callPostApi('Secured', "/groups/edit", {
            group_id: group.id,
            group: {
                name: group.name,
                description: group.description
            }
        });
    };
    // *********************** ***************************
    // **  解析 関連  *******+ ***************************
    // *********************** ***************************
    /**
     * ユーザランクの取得
     * @param userId
     * @returns {Observable<Response>}
     */
    ApiService.prototype.getUserRanks = function (userId) {
        console.log('getUesrRank ' + userId);
        return this._callGetApi('Secured', "/user_ranks/" + userId + "/", {}, true);
    };
    ApiService.prototype.getQuestionDataset = function (userId, questionId) {
        console.log('getQuestionDataset user:' + userId + ', question_id: ' + questionId);
        return this._callGetApi('Secured', "/question_dataset/" + userId + "/" + questionId, {}, true);
    };
    ApiService.prototype.postCalcUserRank = function (userId, questionId, result) {
        console.log('postCalcUserRank user:' + userId + ', question_id: ' + questionId);
        return this._callPostApi('Secured', "/calc_user_rank/" + userId + "/" + questionId + "/" + result, {}, true);
    };
    ApiService.prototype.getImageSignature = function (group) {
        if (group === void 0) { group = null; }
        if (group) {
            return this._callGetApi('Secured', "/group/request/upload", {});
        }
        else {
            return this._callGetApi('Secured', "/user/request/upload", {});
        }
    };
    ApiService.prototype.postImage = function (params) {
        var url = "http://" + this.material_bucket + ".s3.amazonaws.com/";
        return this._http.post(url, params, {});
    };
    // *********************** ***************************
    // **  共通処理  *******+ ***************************
    // *********************** ***************************
    ApiService.prototype._callGetApi = function (type, url, params, analyze) {
        if (analyze === void 0) { analyze = false; }
        if (analyze) {
            url = this.analyze_path + url;
        }
        else {
            url = this.api_path + url;
        }
        if (type === 'Anonymous') {
            this._setHeader();
            // For non-protected routes, just use Http
            console.log(this.headers);
            return this._http.get(url, { headers: this.headers });
        }
        else if (type === 'Secured') {
            this._setHeader(true);
            return this._http.get(url, { headers: this.headers });
        }
    };
    /**
     * POSTのコール
     * @param type
     * @param url
     * @param params
     * @param analyze
     * @returns {Observable<Response>}
     * @private
     */
    ApiService.prototype._callPostApi = function (type, url, params, analyze) {
        if (analyze === void 0) { analyze = false; }
        params = JSON.stringify(params);
        console.log(params);
        if (analyze) {
            url = this.analyze_path + url;
        }
        else {
            url = this.api_path + url;
        }
        if (type === 'Anonymous') {
            this._setHeader();
            return this._http.post(url, params, { headers: this.headers });
        }
        else if (type === 'Secured') {
            this._setHeader(true);
            return this._http.post(url, params, { headers: this.headers });
        }
    };
    /**
     * Deleteのコール
     * @param type
     * @param url
     * @param params
     * @param analyze
     * @returns {Observable<Response>}
     * @private
     */
    ApiService.prototype._callDeleteApi = function (type, url, params, analyze) {
        if (analyze === void 0) { analyze = false; }
        if (analyze) {
            url = this.analyze_path + this._urlWithQuery(url, params);
        }
        else {
            url = this.api_path + this._urlWithQuery(url, params);
        }
        if (type === 'Anonymous') {
            this._setHeader();
            return this._http.delete(url, { headers: this.headers });
        }
        else if (type === 'Secured') {
            this._setHeader(true);
            return this._http.delete(url, { headers: this.headers });
        }
    };
    /**
     * urlにパラメーターの付与
     * @param url
     * @param params
     * @returns {string}
     * @private
     */
    ApiService.prototype._urlWithQuery = function (url, params) {
        if (params) {
            Object.keys(params).forEach(function (value, index) {
                if (index === 0) {
                    url += "?" + value + "=" + params[value];
                }
                else {
                    url += "&" + value + "=" + params[value];
                }
            });
        }
        return url;
    };
    /**
     * ヘッダーの付与
     * @param auth
     * @private
     */
    ApiService.prototype._setHeader = function (auth) {
        this.headers = new http_1.Headers();
        this.headers.append('Accept', 'application/json');
        this.headers.append('Content-Type', 'application/json; charset=utf-8');
        this.headers.append('Cache-Control', 'no-chache');
        if (auth && localStorage.getItem('Access-Token') && localStorage.getItem('Client') && localStorage.getItem('Uid')) {
            console.log("set_header");
            this.headers.append('Access-Token', localStorage.getItem('Access-Token'));
            this.headers.append('Client', localStorage.getItem('Client'));
            this.headers.append('Uid', localStorage.getItem('Uid'));
        }
    };
    ApiService = __decorate([
        core_1.Injectable()
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map