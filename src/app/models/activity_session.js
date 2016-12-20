System.register(["./../models"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var models_1;
    var ActivitySession;
    return {
        setters:[
            function (models_1_1) {
                models_1 = models_1_1;
            }],
        execute: function() {
            ActivitySession = (function () {
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
            exports_1("ActivitySession", ActivitySession);
        }
    }
});
//# sourceMappingURL=activity_session.js.map