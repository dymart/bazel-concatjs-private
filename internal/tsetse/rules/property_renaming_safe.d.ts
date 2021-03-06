import { Checker } from '../checker';
import { ErrorCode } from '../error_code';
import { AbstractRule } from '../rule';
/**
 * A Tsetse rule that checks for some potential unsafe property renaming
 * patterns.
 *
 * Note: This rule can have false positives.
 */
export declare class Rule extends AbstractRule {
    static readonly RULE_NAME = "property-renaming-safe";
    readonly ruleName = "property-renaming-safe";
    readonly code = ErrorCode.PROPERTY_RENAMING_SAFE;
    register(checker: Checker): void;
}
