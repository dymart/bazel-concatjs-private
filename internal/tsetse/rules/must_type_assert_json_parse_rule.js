"use strict";
/**
 * @fileoverview Bans `JSON.parse(...)` that is not wrapped in a type assertion.
 * See http://tsetse.info/must-type-assert-json-parse
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
const ts = require("typescript");
const error_code_1 = require("../error_code");
const rule_1 = require("../rule");
const FAILURE_STRING = 'type assert `JSON.parse() as SomeExplicitType` for type & optimization safety.\n\t' +
    'See http://tsetse.info/must-type-assert-json-parse.';
/**
 * Ensures that all calls to JSON.parse are wrapped in an `as` expression.
 */
class Rule extends rule_1.AbstractRule {
    constructor() {
        super(...arguments);
        this.ruleName = Rule.RULE_NAME;
        this.code = error_code_1.ErrorCode.MUST_TYPE_ASSERT_JSON_PARSE;
    }
    register(checker) {
        checker.on(ts.SyntaxKind.CallExpression, checkCallExpression, this.code);
    }
}
exports.Rule = Rule;
Rule.RULE_NAME = 'must-type-assert-json-parse';
/**
 * Checks whether a given `parse` symbol is the JSON.parse symbol declared in
 * lib.es5.d.ts.
 */
function isEcmascriptJsonParse(checker, node) {
    const parseSymbol = checker.typeChecker.getSymbolAtLocation(node);
    if (parseSymbol === undefined)
        return false;
    const declaration = parseSymbol.valueDeclaration;
    if (declaration === undefined)
        return false;
    const fileName = declaration.getSourceFile().fileName;
    if (!fileName.includes('typescript'))
        return false;
    if (!fileName.endsWith('lib.es5.d.ts'))
        return false;
    // Narrow the node type so we can get `name`.
    if (!ts.isMethodSignature(declaration))
        return false;
    if (declaration.name.getText() !== 'parse')
        return false;
    if (!ts.isInterfaceDeclaration(declaration.parent))
        return false;
    if (declaration.parent.name.getText() !== 'JSON')
        return false;
    return true;
}
function checkCallExpression(checker, node) {
    const funcexpr = node.expression;
    if (!ts.isPropertyAccessExpression(funcexpr)) {
        return;
    }
    // We're inside a type assert expression (JSON.parse as SomeExplicitType) so
    // this is an acceptable use. Don't add a failure.
    if (node.parent != null && node.parent.kind === ts.SyntaxKind.AsExpression) {
        return;
    }
    if (!isEcmascriptJsonParse(checker, funcexpr))
        return;
    checker.addFailureAtNode(node, FAILURE_STRING);
}
