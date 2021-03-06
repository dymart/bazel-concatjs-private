"use strict";
/**
 * @license
 * Copyright 2017 The Bazel Authors. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
exports.snapshotMemoryUsage = exports.write = exports.counter = exports.wrapAsync = exports.wrap = void 0;
/**
 * perf_trace records traces in the Chrome Trace format (which is actually used
 * for more than just Chrome).  See:
 * https://github.com/catapult-project/catapult/blob/master/tracing/README.md
 */
const fs = require("fs");
/** @return a high-res timestamp of the current time. */
function now() {
    const [sec, nsec] = process.hrtime();
    return (sec * 1e6) + (nsec / 1e3);
}
const events = [];
/** wrap wraps enter()/leave() calls around a block of code. */
function wrap(name, f) {
    const start = now();
    try {
        return f();
    }
    finally {
        const end = now();
        events.push({ name, ph: 'X', pid: 1, ts: start, dur: (end - start) });
    }
}
exports.wrap = wrap;
/**
 * Records the execution of the given async function by invoking it. Execution
 * is recorded until the async function completes.
 */
function wrapAsync(name, f) {
    return __awaiter(this, void 0, void 0, function* () {
        const start = now();
        try {
            return yield f();
        }
        finally {
            const end = now();
            events.push({ name, ph: 'X', pid: 1, ts: start, dur: (end - start) });
        }
    });
}
exports.wrapAsync = wrapAsync;
/**
 * counter records a snapshot of counts.  The counter name identifies a
 * single graph, while the counts object provides data for each count
 * of a line on the stacked bar graph.
 */
function counter(name, counts) {
    events.push({ name, ph: 'C', pid: 1, ts: now(), args: counts });
}
exports.counter = counter;
/** write writes the trace in Chrome Trace format to a given path. */
function write(path) {
    fs.writeFileSync(path, JSON.stringify(events), { encoding: 'utf8' });
}
exports.write = write;
/** Record the current heap usage to the performance trace. */
function snapshotMemoryUsage() {
    const snapshot = process.memoryUsage();
    // The counter displays as a stacked bar graph, so compute metrics
    // that sum to the appropriate total.
    const unused = snapshot.heapTotal - snapshot.heapUsed;
    counter('memory', { 'used': snapshot.heapUsed, 'unused': unused });
}
exports.snapshotMemoryUsage = snapshotMemoryUsage;
