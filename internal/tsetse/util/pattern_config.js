"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatternKind = void 0;
/**
 * The list of supported patterns useable in ConformancePatternRule. The
 * patterns whose name match JSConformance patterns should behave similarly (see
 * https://github.com/google/closure-compiler/wiki/JS-Conformance-Framework)
 */
var PatternKind;
(function (PatternKind) {
    /** Ban use of fully distinguished names. */
    PatternKind["BANNED_NAME"] = "banned-name";
    /** Ban use of instance properties */
    PatternKind["BANNED_PROPERTY"] = "banned-property";
    /**
     * Ban instance property, like BANNED_PROPERTY but where reads of the
     * property are allowed.
     */
    PatternKind["BANNED_PROPERTY_WRITE"] = "banned-property-write";
    /**
     * Ban instance property write unless the property is assigned a constant
     * literal.
     */
    PatternKind["BANNED_PROPERTY_NON_CONSTANT_WRITE"] = "banned-property-non-constant-write";
})(PatternKind = exports.PatternKind || (exports.PatternKind = {}));
