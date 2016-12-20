System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Config;
    return {
        setters:[],
        execute: function() {
            //TODO: config-containerの共通化
            Config = (function () {
                function Config() {
                    this.is_private = false;
                    this.is_draft = false;
                    this.copy_forbidden = false;
                    this.auto_weigh = true;
                    this.allow_show_answer = false;
                    this.allow_show_score = false;
                }
                return Config;
            }());
            exports_1("Config", Config);
        }
    }
});
//# sourceMappingURL=config.js.map