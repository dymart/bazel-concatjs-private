import * as ts from 'typescript';
/**
 * This class matches symbols given a "foo.bar.baz" name, where none of the
 * steps are instances of classes.
 *
 * Note that this isn't smart about subclasses and types: to write a check, we
 * strongly suggest finding the expected symbol in externs to find the object
 * name on which the symbol was initially defined.
 *
 * This matcher requires a scope for the symbol, which may be `GLOBAL`,
 * `ANY_SYMBOL`, `CLOSURE` or a file path filter. `CLOSURE` indicates that the
 * symbol is from the JS Closure library processed by clutz. The matcher begins
 * with this scope, then the separator "|", followed by the symbol name. For
 * example, "GLOBAL|eval".
 *
 * The file filter specifies
 * (part of) the path of the file in which the symbol of interest is defined.
 * For example, "path/to/file.ts|foo.bar.baz".
 * With this filter, only symbols named "foo.bar.baz" that are defined in a path
 * that contains "path/to/file.ts" are matched.
 *
 * This filter is useful when mutiple symbols have the same name but
 * you want to match with a specific one. For example, assume that there are
 * two classes named "Foo" defined in /path/to/file0 and /path/to/file1.
 * // in /path/to/file0
 * export class Foo { static bar() {return "Foo.bar in file0";} }
 *
 * // in /path/to/file1
 * export class Foo { static bar() {return "Foo.bar in file1";} }
 *
 * Suppose that these two classes are referenced in two other files.
 * // in /path/to/file2
 * import {Foo} from /path/to/file0;
 * Foo.bar();
 *
 * // in /path/to/file3
 * import {Foo} from /path/to/file1;
 * Foo.bar();
 *
 * An absolute matcher "Foo.bar" without a file filter will match with both
 * references to "Foo.bar" in /path/to/file2 and /path/to/file3.
 * An absolute matcher "/path/to/file1|Foo.bar", however, only matches with the
 * "Foo.bar()" in /path/to/file3 because that references the "Foo.bar" defined
 * in /path/to/file1.
 *
 * Note that an absolute matcher will match with any reference to the symbol
 * defined in the file(s) specified by the file filter. For example, assume that
 * Foo from file1 is extended in file4.
 *
 * // in /path/to/file4
 * import {Foo} from /path/to/file1;
 * class Moo { static tar() {return "Moo.tar in file4";} }
 * Moo.bar();
 *
 * An absolute matcher "/path/to/file1|Foo.bar" matches with "Moo.bar()" because
 * "bar" is defined as part of Foo in /path/to/file1.
 */
export declare class AbsoluteMatcher {
    /**
     * From a "path/to/file.ts|foo.bar.baz", builds a Matcher.
     */
    readonly filePath: string;
    readonly bannedName: string;
    constructor(spec: string);
    matches(n: ts.Node, tc: ts.TypeChecker): boolean;
}
