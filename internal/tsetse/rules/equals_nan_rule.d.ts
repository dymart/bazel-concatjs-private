/**
 * @fileoverview Bans `== NaN`, `=== NaN`, `!= NaN`, and `!== NaN` in TypeScript
 * code, since no value (including NaN) is equal to NaN.
 */
import { Checker } from '../checker';
import { ErrorCode } from '../error_code';
import { AbstractRule } from '../rule';
export declare class Rule extends AbstractRule {
    static readonly RULE_NAME = "equals-nan";
    readonly ruleName = "equals-nan";
    readonly code = ErrorCode.EQUALS_NAN;
    register(checker: Checker): void;
}
