import type { Dayjs, Plugin } from '..';
declare module '../types' {
    interface Extend {
        toArray: typeof toArray;
    }
}
declare function toArray(this: Dayjs): [number, number, number, number, number, number, number];
declare const plugin: Plugin;
export default plugin;
