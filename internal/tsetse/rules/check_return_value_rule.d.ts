/**
 * @fileoverview A Tsetse rule that checks the return value of certain functions
 * must be used.
 */
import { Checker } from '../checker';
import { ErrorCode } from '../error_code';
import { AbstractRule } from '../rule';
/** A rule to ensure required return values from common functions are used. */
export declare class Rule extends AbstractRule {
    static readonly RULE_NAME = "check-return-value";
    readonly ruleName = "check-return-value";
    readonly code = ErrorCode.CHECK_RETURN_VALUE;
    register(checker: Checker): void;
}
