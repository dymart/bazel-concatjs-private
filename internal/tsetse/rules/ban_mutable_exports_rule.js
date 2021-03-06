"use strict";
/**
 * @fileoverview Bans 'export' of mutable variables.
 * It is illegal to mutate them, so you might as well use 'const'.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
const ts = require("typescript");
const error_code_1 = require("../error_code");
const rule_1 = require("../rule");
class Rule extends rule_1.AbstractRule {
    constructor() {
        super(...arguments);
        this.ruleName = Rule.RULE_NAME;
        this.code = error_code_1.ErrorCode.BAN_MUTABLE_EXPORTS;
    }
    register(checker) {
        // Strategy: take all the exports of the file, then look at whether
        // they're const or not.  This is simpler than the alternative of
        // trying to match all the various kinds of 'export' syntax, such
        // as 'export var ...', 'export {...}', 'export default ...'.
        checker.on(ts.SyntaxKind.SourceFile, checkFile, this.code);
    }
}
exports.Rule = Rule;
Rule.RULE_NAME = 'ban-mutable-exports';
function checkFile(checker, file) {
    // Allow in d.ts files, which are modelling external JS that doesn't
    // follow our rules.
    if (file.fileName.endsWith('.d.ts')) {
        return;
    }
    const sym = checker.typeChecker.getSymbolAtLocation(file);
    if (!sym)
        return;
    const exports = checker.typeChecker.getExportsOfModule(sym);
    for (const exp of exports) {
        // In the case of
        //   let x = 3; export {x};
        // The exported symbol is the latter x, but we must dealias to
        // the former to judge whether it's const or not.
        let sym = exp;
        if (sym.flags & ts.SymbolFlags.Alias) {
            sym = checker.typeChecker.getAliasedSymbol(exp);
        }
        const decl = sym.valueDeclaration;
        if (!decl)
            continue; // Skip e.g. type declarations.
        if (decl.getSourceFile() !== file) {
            // Reexports are best warned about in the original file
            continue;
        }
        if (!ts.isVariableDeclaration(decl) && !ts.isBindingElement(decl)) {
            // Skip e.g. class declarations.
            continue;
        }
        const isConst = (ts.getCombinedNodeFlags(decl) & ts.NodeFlags.Const) !== 0;
        if (!isConst && exp.declarations !== undefined) {
            // Note: show the failure at the exported symbol's declaration site,
            // not the dealiased 'sym', so that the error message shows at the
            // 'export' statement and not the variable declaration.
            checker.addFailureAtNode(exp.declarations[0], `Exports must be const.`);
        }
    }
}
