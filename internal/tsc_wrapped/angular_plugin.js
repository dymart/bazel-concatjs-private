"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAngularEmitPluginOrThrow = void 0;
/**
 * Gets the constructor for instantiating the Angular `ngtsc`
 * emit plugin supported by `tsc_wrapped`.
 * @throws An error when the Angular emit plugin could not be retrieved.
 */
function getAngularEmitPluginOrThrow() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        // Note: This is an interop allowing for the `@angular/compiler-cli` package
        // to be shipped as strict ESM, or as CommonJS. If the CLI is a CommonJS
        // package (pre v13 of Angular), then the exports are in the `default` property.
        // See: https://nodejs.org/api/esm.html#esm_import_statements.
        // Note: TypeScript downlevels the dynamic `import` to a `require` that is
        // not compatible with ESM. We create a function to workaround this issue.
        const exports = yield loadEsmOrFallbackToRequire('@angular/compiler-cli');
        const plugin = (_a = exports.NgTscPlugin) !== null && _a !== void 0 ? _a : (_b = exports.default) === null || _b === void 0 ? void 0 : _b.NgTscPlugin;
        if (plugin === undefined) {
            throw new Error('Could not find `NgTscPlugin` export in `@angular/compiler-cli`.');
        }
        return plugin;
    });
}
exports.getAngularEmitPluginOrThrow = getAngularEmitPluginOrThrow;
function loadEsmOrFallbackToRequire(moduleName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield new Function('m', `return import(m);`)(moduleName);
        }
        catch (_a) {
            // If the dynamic import failed, we still re-try with `require` because
            // some NodeJS versions do not even support the dynamic import expression.
            return require(moduleName);
        }
    });
}
