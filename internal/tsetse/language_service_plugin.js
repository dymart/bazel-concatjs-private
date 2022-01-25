"use strict";
const pluginApi = require("../tsc_wrapped/plugin_api");
const checker_1 = require("./checker");
const runner_1 = require("./runner");
// Installs the Tsetse language server plugin, which checks Tsetse rules in your
// editor and shows issues as semantic errors (red squiggly underline).
function init() {
    return {
        create(info) {
            const oldService = info.languageService;
            const proxy = pluginApi.createProxy(oldService);
            proxy.getSemanticDiagnostics = (fileName) => {
                const program = oldService.getProgram();
                if (!program) {
                    throw new Error('Failed to initialize tsetse language_service_plugin: program is undefined');
                }
                const checker = new checker_1.Checker(program);
                // Add disabledRules to tsconfig to disable specific rules
                // "plugins": [
                //   {"name": "...", "disabledRules": ["equals-nan"]}
                // ]
                runner_1.registerRules(checker, info.config.disabledRules || []);
                const result = [...oldService.getSemanticDiagnostics(fileName)];
                // Note that this ignores suggested fixes.
                result.push(...checker.execute(program.getSourceFile(fileName))
                    .map(failure => failure.toDiagnostic()));
                return result;
            };
            return proxy;
        }
    };
}
module.exports = init;
