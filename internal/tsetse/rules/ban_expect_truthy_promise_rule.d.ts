/**
 * @fileoverview Bans expect(returnsPromise()).toBeTruthy(). Promises are always
 * truthy, and this pattern is likely to be a bug where the developer meant
 * expect(await returnsPromise()).toBeTruthy() and forgot the await.
 */
import { Checker } from '../checker';
import { ErrorCode } from '../error_code';
import { AbstractRule } from '../rule';
export declare class Rule extends AbstractRule {
    static readonly RULE_NAME = "ban-expect-truthy-promise";
    readonly ruleName = "ban-expect-truthy-promise";
    readonly code = ErrorCode.BAN_EXPECT_TRUTHY_PROMISE;
    register(checker: Checker): void;
}
