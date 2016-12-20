System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ActivityEntry;
    return {
        setters:[],
        execute: function() {
            ActivityEntry = (function () {
                function ActivityEntry() {
                }
                ActivityEntry.prototype.assignParams = function (params) {
                    if (params.entry_id) {
                        this.entry_id = params.entry_id;
                    }
                    if (params.status) {
                        this.status = params.status;
                    }
                    if (params.created_at) {
                        this.created_at = params.created_at;
                    }
                    if (params.updated_at) {
                        this.update_at = params.updated_at;
                    }
                    if (params.activity) {
                        this.activity_id = params.activity.id;
                        this.activity_type = params.activity.type;
                        this.activity_name = params.activity.name;
                    }
                };
                return ActivityEntry;
            }());
            exports_1("ActivityEntry", ActivityEntry);
        }
    }
});
//# sourceMappingURL=activity_entry.js.map