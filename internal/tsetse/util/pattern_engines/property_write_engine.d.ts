import * as ts from 'typescript';
import { Checker } from '../../checker';
import { PropertyMatcher } from '../property_matcher';
import { PropertyEngine } from './property_engine';
/** Test if an AST node is a matched property write. */
export declare function matchPropertyWrite(tc: ts.TypeChecker, n: ts.PropertyAccessExpression | ts.ElementAccessExpression, matcher: PropertyMatcher): ts.BinaryExpression | undefined;
/**
 * The engine for BANNED_PROPERTY_WRITE.
 */
export declare class PropertyWriteEngine extends PropertyEngine {
    register(checker: Checker): void;
}
