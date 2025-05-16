/**
 * Clones an object while removing relevant properties
 * @param obj 
 * @param keys 
 * @returns 
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const clone = { ...obj };
    keys.forEach(key => delete clone[key]);
    return clone;
}