/**
 * @fileoverview A Tsetse rule that checks that all promises in async function
 * blocks are awaited or used.
 */
import { Checker } from '../checker';
import { ErrorCode } from '../error_code';
import { AbstractRule } from '../rule';
/** A rule to ensure promises in async functions are awaited or used. */
export declare class Rule extends AbstractRule {
    static readonly RULE_NAME = "must-use-promises";
    readonly ruleName = "must-use-promises";
    readonly code = ErrorCode.MUST_USE_PROMISES;
    register(checker: Checker): void;
}
