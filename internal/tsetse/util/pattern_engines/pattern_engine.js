"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatternEngine = void 0;
const path = require("path");
const allowlist_1 = require("../../util/allowlist");
const ast_tools_1 = require("../ast_tools");
/**
 * A patternEngine is the logic that handles a specific PatternKind.
 */
class PatternEngine {
    constructor(config, fixer) {
        this.config = config;
        this.fixer = fixer;
        this.allowlist = new allowlist_1.Allowlist(config.allowlistEntries);
    }
    /**
     * A composer that wraps checking functions with code handling aspects of the
     * analysis that are not engine-specific, and which defers to the
     * subclass-specific logic afterwards. Subclasses should transform their
     * checking logic with this composer before registered on the checker.
     */
    wrapCheckWithAllowlistingAndFixer(checkFunction) {
        return (c, n) => {
            const sf = n.getSourceFile();
            if (!ast_tools_1.shouldExamineNode(n) || sf.isDeclarationFile) {
                return;
            }
            const matchedNode = checkFunction(c.typeChecker, n);
            if (matchedNode &&
                !this.allowlist.isAllowlisted(path.resolve(sf.fileName))) {
                const fix = this.fixer ?
                    this.fixer.getFixForFlaggedNode(matchedNode) :
                    undefined;
                c.addFailureAtNode(matchedNode, this.config.errorMessage, fix);
            }
        };
    }
}
exports.PatternEngine = PatternEngine;
