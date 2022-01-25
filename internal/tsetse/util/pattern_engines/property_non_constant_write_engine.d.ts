import { Checker } from '../../checker';
import { PropertyWriteEngine } from './property_write_engine';
/**
 * The engine for BANNED_PROPERTY_NON_CONSTANT_WRITE.
 */
export declare class PropertyNonConstantWriteEngine extends PropertyWriteEngine {
    register(checker: Checker): void;
}
