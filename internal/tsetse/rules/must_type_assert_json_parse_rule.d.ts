/**
 * @fileoverview Bans `JSON.parse(...)` that is not wrapped in a type assertion.
 * See http://tsetse.info/must-type-assert-json-parse
 */
import { Checker } from '../checker';
import { ErrorCode } from '../error_code';
import { AbstractRule } from '../rule';
/**
 * Ensures that all calls to JSON.parse are wrapped in an `as` expression.
 */
export declare class Rule extends AbstractRule {
    static readonly RULE_NAME = "must-type-assert-json-parse";
    readonly ruleName = "must-type-assert-json-parse";
    readonly code = ErrorCode.MUST_TYPE_ASSERT_JSON_PARSE;
    register(checker: Checker): void;
}
