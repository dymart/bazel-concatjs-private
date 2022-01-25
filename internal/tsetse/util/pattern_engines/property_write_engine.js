"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyWriteEngine = exports.matchPropertyWrite = void 0;
const ts = require("typescript");
const ast_tools_1 = require("../ast_tools");
const property_engine_1 = require("./property_engine");
/** Test if an AST node is a matched property write. */
function matchPropertyWrite(tc, n, matcher) {
    ast_tools_1.debugLog(() => `inspecting ${n.parent.getText().trim()}`);
    if (property_engine_1.matchProperty(tc, n, matcher) === undefined)
        return;
    const assignment = n.parent;
    if (!ts.isBinaryExpression(assignment))
        return;
    if (assignment.operatorToken.kind !== ts.SyntaxKind.EqualsToken)
        return;
    if (assignment.left !== n)
        return;
    return assignment;
}
exports.matchPropertyWrite = matchPropertyWrite;
/**
 * The engine for BANNED_PROPERTY_WRITE.
 */
class PropertyWriteEngine extends property_engine_1.PropertyEngine {
    register(checker) {
        this.registerWith(checker, matchPropertyWrite);
    }
}
exports.PropertyWriteEngine = PropertyWriteEngine;
