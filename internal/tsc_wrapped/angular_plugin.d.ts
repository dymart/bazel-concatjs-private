import type { NgTscPlugin } from '@angular/compiler-cli';
/**
 * Gets the constructor for instantiating the Angular `ngtsc`
 * emit plugin supported by `tsc_wrapped`.
 * @throws An error when the Angular emit plugin could not be retrieved.
 */
export declare function getAngularEmitPluginOrThrow(): Promise<typeof NgTscPlugin>;
