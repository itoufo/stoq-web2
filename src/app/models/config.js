"use strict";
//TODO: config-containerの共通化
var Config = (function () {
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
exports.Config = Config;
//# sourceMappingURL=config.js.map