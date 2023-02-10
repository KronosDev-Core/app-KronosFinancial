import type { Plugin } from '..';
export declare type IsYesterday = () => boolean;
declare module '../types' {
    interface Extend {
        isYesterday: IsYesterday;
    }
}
declare const plugin: Plugin;
export default plugin;
