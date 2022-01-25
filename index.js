var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@bazel/concatjs", ["require", "exports", "crypto", "fs", "karma/lib/file", "path", "process", "readline", "./internal/tsc_wrapped"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    ///<amd-module name="@bazel/concatjs"/>
    /*
     * Concat all JS files before serving.
     */
    var crypto = require("crypto");
    var fs = require("fs");
    var File = require("karma/lib/file");
    var path = require("path");
    var process = require("process");
    var readline_1 = require("readline");
    ///<reference types="lib.dom"/>
    /**
     * Return SHA1 of data buffer.
     */
    function sha1(data) {
        var hash = crypto.createHash('sha1');
        hash.update(data);
        return hash.digest('hex');
    }
    /**
     * Entry-point for the Karma plugin.
     */
    function initConcatJs(logger, emitter, basePath, hostname, port) {
        var log = logger.create('framework.concat_js');
        // Create a tmp file for the concat bundle, rely on Bazel to clean the TMPDIR
        var tmpFile = path.join(process.env['TEST_TMPDIR'], crypto.randomBytes(6).readUIntLE(0, 6).toString(36));
        emitter.on('file_list_modified', function (files) {
            var bundleFile = new File('/concatjs_bundle.js');
            bundleFile.contentPath = tmpFile;
            // Preserve all non-JS that were there in the included list.
            var included = files.included.filter(function (f) { return path.extname(f.originalPath) !== '.js'; });
            var bundledFiles = files.included.filter(function (f) { return path.extname(f.originalPath) === '.js'; }).map(function (file) {
                var relativePath = path.relative(basePath, file.originalPath).replace(/\\/g, '/');
                var content = file.content + ("\n//# sourceURL=http://" + hostname + ":" + port + "/base/") +
                    relativePath + '\n';
                return "\n  loadFile(\n      " + JSON.stringify(relativePath) + ",\n      " + JSON.stringify(content) + ");";
            });
            // Execute each file by putting it in a <script> tag. This makes them create
            // global variables, even with 'use strict'; (unlike eval).
            bundleFile.content = "\n(function() {  // Hide local variables\n  // Use policy to support Trusted Types enforcement.\n  var policy = null;\n  if (window.trustedTypes) {\n    try {\n      policy = window.trustedTypes.createPolicy('bazel-karma', {\n        createScript: function(s) { return s; }\n      });\n    } catch (e) {\n      // In case the policy has been unexpectedly created before, log the error\n      // and fall back to the old behavior.\n      console.log(e);\n    }\n  }\n  // IE 8 and below do not support document.head.\n  var parent = document.getElementsByTagName('head')[0] ||\n                    document.documentElement;\n  function loadFile(path, src) {\n    var trustedSrc = policy ? policy.createScript(src) : src;\n    try {\n      var script = document.createElement('script');\n      if ('textContent' in script) {\n        script.textContent = trustedSrc;\n      } else {\n        // This is for IE 8 and below.\n        script.text = trustedSrc;\n      }\n      parent.appendChild(script);\n      // Don't pollute the DOM with hundreds of <script> tags.\n      parent.removeChild(script);\n    } catch(err) {\n      window.__karma__ && window.__karma__.error(\n          'An error occurred while loading ' + path + ':\\n' +\n          (err.stack || err.message || err.toString()));\n      console.error('An error occurred while loading ' + path, err);\n      throw err;\n    }\n  }\n" + bundledFiles.join('') + "\n})();";
            bundleFile.sha = sha1(Buffer.from(bundleFile.content));
            bundleFile.mtime = new Date();
            included.unshift(bundleFile);
            files.included = included;
            files.served.push(bundleFile);
            log.debug('Writing concatjs bundle to tmp file %s', bundleFile.contentPath);
            fs.writeFileSync(bundleFile.contentPath, bundleFile.content);
        });
    }
    initConcatJs.$inject =
        ['logger', 'emitter', 'config.basePath', 'config.hostname', 'config.port'];
    function watcher(fileList) {
        // ibazel will write this string after a successful build
        // We don't want to re-trigger tests if the compilation fails, so
        // we should only listen for this event.
        var IBAZEL_NOTIFY_BUILD_SUCCESS = 'IBAZEL_BUILD_COMPLETED SUCCESS';
        // ibazel communicates with us via stdin
        var rl = readline_1.createInterface({ input: process.stdin, terminal: false });
        rl.on('line', function (chunk) {
            if (chunk === IBAZEL_NOTIFY_BUILD_SUCCESS) {
                fileList.refresh();
            }
        });
        rl.on('close', function () {
            // Give ibazel 5s to kill our process, otherwise do it ourselves
            setTimeout(function () {
                console.error('ibazel failed to stop karma after 5s; probably a bug');
                process.exit(1);
            }, 5000);
        });
    }
    watcher.$inject = ['fileList'];
    __exportStar(require("./internal/tsc_wrapped"), exports);
    module.exports = {
        'framework:concat_js': ['factory', initConcatJs],
        'watcher': ['value', watcher]
    };
});
