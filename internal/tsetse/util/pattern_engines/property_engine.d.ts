import * as ts from 'typescript';
import { Checker } from '../../checker';
import { PropertyMatcher } from '../property_matcher';
import { PatternEngine } from './pattern_engine';
/** Match an AST node with a property matcher. */
export declare function matchProperty(tc: ts.TypeChecker, n: ts.PropertyAccessExpression | ts.ElementAccessExpression, matcher: PropertyMatcher): ts.Node | undefined;
/**
 * Engine for the BANNED_PROPERTY pattern. It captures accesses to property
 * matching the spec regardless whether it's a read or write.
 */
export declare class PropertyEngine extends PatternEngine {
    protected registerWith(checker: Checker, matchNode: typeof matchProperty): void;
    register(checker: Checker): void;
}
