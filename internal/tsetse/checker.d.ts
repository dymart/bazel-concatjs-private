/**
 * @fileoverview Checker contains all the information we need to perform source
 * file AST traversals and report errors.
 */
import * as ts from 'typescript';
import { Failure, Fix } from './failure';
/**
 * Tsetse rules use on() and addFailureAtNode() for rule implementations.
 * Rules can get a ts.TypeChecker from checker.typeChecker so typed rules are
 * possible. Compiler uses execute() to run the Tsetse check.
 */
export declare class Checker {
    /** Node to handlers mapping for all enabled rules. */
    private readonly nodeHandlersMap;
    /**
     * Mapping from identifier name to handlers for all rules inspecting property
     * names.
     */
    private readonly namedIdentifierHandlersMap;
    /**
     * Mapping from property name to handlers for all rules inspecting property
     * accesses expressions.
     */
    private readonly namedPropertyAccessHandlersMap;
    /**
     * Mapping from string literal value to handlers for all rules inspecting
     * string literals.
     */
    private readonly stringLiteralElementAccessHandlersMap;
    private failures;
    private currentSourceFile;
    private currentCode;
    /** Allow typed rules via typeChecker. */
    typeChecker: ts.TypeChecker;
    constructor(program: ts.Program);
    /**
     * This doesn't run any checks yet. Instead, it registers `handlerFunction` on
     * `nodeKind` node in `nodeHandlersMap` map. After all rules register their
     * handlers, the source file AST will be traversed.
     */
    on<T extends ts.Node>(nodeKind: T['kind'], handlerFunction: (checker: Checker, node: T) => void, code: number): void;
    /**
     * Similar to `on`, but registers handlers on more specific node type, i.e.,
     * identifiers.
     */
    onNamedIdentifier(identifierName: string, handlerFunction: (checker: Checker, node: ts.Identifier) => void, code: number): void;
    /**
     * Similar to `on`, but registers handlers on more specific node type, i.e.,
     * property access expressions.
     */
    onNamedPropertyAccess(propertyName: string, handlerFunction: (checker: Checker, node: ts.PropertyAccessExpression) => void, code: number): void;
    /**
     * Similar to `on`, but registers handlers on more specific node type, i.e.,
     * element access expressions with string literals as keys.
     */
    onStringLiteralElementAccess(key: string, handlerFunction: (checker: Checker, node: ts.ElementAccessExpression) => void, code: number): void;
    /**
     * Add a failure with a span.
     */
    addFailure(start: number, end: number, failureText: string, fix?: Fix): void;
    addFailureAtNode(node: ts.Node, failureText: string, fix?: Fix): void;
    /** Dispatch general handlers registered via `on` */
    dispatchNodeHandlers(node: ts.Node): void;
    /** Dispatch identifier handlers registered via `onNamedIdentifier` */
    dispatchNamedIdentifierHandlers(id: ts.Identifier): void;
    /**
     * Dispatch property access handlers registered via `onNamedPropertyAccess`
     */
    dispatchNamedPropertyAccessHandlers(prop: ts.PropertyAccessExpression): void;
    /**
     * Dispatch string literal handlers registered via
     * `onStringLiteralElementAccess`.
     */
    dispatchStringLiteralElementAccessHandlers(elem: ts.ElementAccessExpression): void;
    /**
     * Walk `sourceFile`, invoking registered handlers with Checker as the first
     * argument and current node as the second argument. Return failures if there
     * are any.
     */
    execute(sourceFile: ts.SourceFile): Failure[];
}
