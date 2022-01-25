"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameEngine = void 0;
const absolute_matcher_1 = require("../absolute_matcher");
const ast_tools_1 = require("../ast_tools");
const pattern_engine_1 = require("./pattern_engine");
function checkId(tc, n, matcher) {
    ast_tools_1.debugLog(() => `inspecting ${n.getText().trim()}`);
    if (!matcher.matches(n, tc)) {
        ast_tools_1.debugLog(() => 'Not the right global name.');
        return;
    }
    return n;
}
/** Engine for the BANNED_NAME pattern */
class NameEngine extends pattern_engine_1.PatternEngine {
    register(checker) {
        for (const value of this.config.values) {
            const matcher = new absolute_matcher_1.AbsoluteMatcher(value);
            // `String.prototype.split` only returns emtpy array when both the string
            // and the splitter are empty. Here we should be able to safely assert pop
            // returns a non-null result.
            const bannedIdName = matcher.bannedName.split('.').pop();
            checker.onNamedIdentifier(bannedIdName, this.wrapCheckWithAllowlistingAndFixer((tc, n) => checkId(tc, n, matcher)), this.config.errorCode);
        }
    }
}
exports.NameEngine = NameEngine;
