import * as ts from 'typescript';
/**
 * This class matches a property access node, based on a property holder type
 * (through its name), i.e. a class, and a property name.
 *
 * The logic is voluntarily simple: if a matcher for `a.b` tests a `x.y` node,
 * it will return true if:
 * - `x` is of type `a` either directly (name-based) or through inheritance
 *   (ditto),
 * - and, textually, `y` === `b`.
 *
 * Note that the logic is different from TS's type system: this matcher doesn't
 * have any knowledge of structural typing.
 */
export declare class PropertyMatcher {
    readonly bannedType: string;
    readonly bannedProperty: string;
    static fromSpec(spec: string): PropertyMatcher;
    constructor(bannedType: string, bannedProperty: string);
    /**
     * @param n The PropertyAccessExpression we're looking at.
     */
    matches(n: ts.PropertyAccessExpression, tc: ts.TypeChecker): boolean;
    private exactTypeMatches;
    typeMatches(inspectedType: ts.Type): boolean;
}
