import type { Plugin } from '..';
export declare type IsToday = () => boolean;
declare module '../types' {
    interface Extend {
        isToday: IsToday;
    }
}
declare const plugin: Plugin;
export default plugin;
