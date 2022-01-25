"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = exports.PatternKind = exports.ConformancePatternRule = void 0;
const error_code_1 = require("../error_code");
Object.defineProperty(exports, "ErrorCode", { enumerable: true, get: function () { return error_code_1.ErrorCode; } });
const pattern_config_1 = require("../util/pattern_config");
Object.defineProperty(exports, "PatternKind", { enumerable: true, get: function () { return pattern_config_1.PatternKind; } });
const name_engine_1 = require("../util/pattern_engines/name_engine");
const property_engine_1 = require("../util/pattern_engines/property_engine");
const property_non_constant_write_engine_1 = require("../util/pattern_engines/property_non_constant_write_engine");
const property_write_engine_1 = require("../util/pattern_engines/property_write_engine");
/**
 * Builds a Rule that matches a certain pattern, given as parameter, and
 * that can additionally run a suggested fix generator on the matches.
 *
 * This is templated, mostly to ensure the nodes that have been matched
 * correspond to what the Fixer expects.
 */
class ConformancePatternRule {
    constructor(config, fixer) {
        this.code = config.errorCode;
        // Avoid empty rule names.
        this.ruleName = config.name || `conformance-pattern-${config.kind}`;
        switch (config.kind) {
            case pattern_config_1.PatternKind.BANNED_PROPERTY:
                this.engine = new property_engine_1.PropertyEngine(config, fixer);
                break;
            case pattern_config_1.PatternKind.BANNED_PROPERTY_WRITE:
                this.engine = new property_write_engine_1.PropertyWriteEngine(config, fixer);
                break;
            case pattern_config_1.PatternKind.BANNED_PROPERTY_NON_CONSTANT_WRITE:
                this.engine = new property_non_constant_write_engine_1.PropertyNonConstantWriteEngine(config, fixer);
                break;
            case pattern_config_1.PatternKind.BANNED_NAME:
                this.engine = new name_engine_1.NameEngine(config, fixer);
                break;
            default:
                throw new Error('Config type not recognized, or not implemented yet.');
        }
    }
    register(checker) {
        this.engine.register(checker);
    }
}
exports.ConformancePatternRule = ConformancePatternRule;
