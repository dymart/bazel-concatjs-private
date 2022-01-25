/**
 * An exemption list entry, corresponding to a logical exemption rule. Use these
 * to distinguish between various logical reasons for exempting something:
 * for instance, tie these to particular bugs that needed to be exempted, per
 * legacy project, manually reviewed entries, and so on.
 *
 * Exemption lists are based on the file paths provided by the TS compiler, with
 * both regexp-based checks and prefix-based checks.
 *
 *
 * Follows the logic in
 * https://github.com/google/closure-compiler/blob/master/src/com/google/javascript/jscomp/conformance.proto.
 */
export interface AllowlistEntry {
    /** The category corresponding to this entry. */
    readonly reason: ExemptionReason;
    /** Why is this okay to be exempted?. */
    readonly explanation?: string;
    /**
     * Regexps for the paths of files that will be ignored by the
     * ConformancePattern. Beware, escaping can be tricky.
     */
    readonly regexp?: readonly string[];
    /**
     * Prefixes for the paths of files that will be ignored by the
     * ConformancePattern.
     */
    readonly prefix?: readonly string[];
}
/**
 * The categories of exemption entries.
 */
export declare enum ExemptionReason {
    /** No reason. */
    UNSPECIFIED = 0,
    /** Code that has to be grandfathered in (no guarantees). */
    LEGACY = 1,
    /**
     * Code that does not enter the scope of this particular check  (no
     * guarantees).
     */
    OUT_OF_SCOPE = 2,
    /** Manually reviewed exceptions (supposedly okay). */
    MANUALLY_REVIEWED = 3
}
/**
 * A complete allowlist with all related AllowlistEntry grouped together, with
 * ExemptionReason ignored since it is purely for documentary purposes.
 */
export declare class Allowlist {
    private readonly allowlistedPrefixes;
    private readonly allowlistedRegExps;
    private readonly allowlistMemoizer;
    constructor(allowlistEntries?: AllowlistEntry[]);
    isAllowlisted(filePath: string): boolean;
}
