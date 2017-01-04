"use strict";
var models_1 = require("./../models");
var ActivitySession = (function () {
    function ActivitySession(activity_type, activity_params) {
        console.log("activity params");
        console.log(activity_params);
        switch (activity_type) {
            case 'training':
                this.course = new models_1.Course('training');
                // activityとしてコースが指定された場合の処理
                this.course.assignParams(activity_params.activity);
            case 'test':
                this.course = new models_1.Course('test');
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
    ActivitySession.prototype.getCourse = function () {
        return this.course;
    };
    return ActivitySession;
}());
exports.ActivitySession = ActivitySession;
//# sourceMappingURL=activity_session.js.map