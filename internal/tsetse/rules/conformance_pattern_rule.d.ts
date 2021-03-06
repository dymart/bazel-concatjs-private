import { Checker } from '../checker';
import { ErrorCode } from '../error_code';
import { AbstractRule } from '../rule';
import { Fixer } from '../util/fixer';
import { PatternKind, PatternRuleConfig } from '../util/pattern_config';
/**
 * Builds a Rule that matches a certain pattern, given as parameter, and
 * that can additionally run a suggested fix generator on the matches.
 *
 * This is templated, mostly to ensure the nodes that have been matched
 * correspond to what the Fixer expects.
 */
export declare class ConformancePatternRule implements AbstractRule {
    readonly ruleName: string;
    readonly code: number;
    private readonly engine;
    constructor(config: PatternRuleConfig, fixer?: Fixer);
    register(checker: Checker): void;
}
/**
 * The list of supported patterns useable in ConformancePatternRule. The
 * patterns whose name match JSConformance patterns should behave similarly (see
 * https://github.com/google/closure-compiler/wiki/JS-Conformance-Framework).
 */
export { PatternKind };
export { ErrorCode };
