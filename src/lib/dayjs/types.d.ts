import type { Dayjs, extend, isDayjs, locale, unix } from './dayjs';
import type { Unit } from './units';
export declare type DateInput = Dayjs | Date | string | number | number[] | null | undefined | object;
export declare type DateOutput = Date | string | number | number[];
export declare type FormatOption = string | string[];
export declare type GetterFn = {
    (value: number): Dayjs;
    (): Dayjs;
    (): number;
};
export declare type SetterFn = {
    (value: number, unit: Unit): Dayjs;
    (value: number): Dayjs;
};
export declare type AccessorFn = {
    (value: number, unit: Unit): Dayjs;
    (value: number): Dayjs;
    (): number;
};
export interface ParseOptions {
    format?: FormatOption;
    locale?: string;
    strict?: boolean;
}
export interface DayjsFn {
    (date?: DateInput, format?: FormatOption, locale?: boolean, strict?: boolean): Dayjs;
    (date?: DateInput, format?: FormatOption, strict?: boolean): Dayjs;
    isDayjs: typeof isDayjs;
    unix: typeof unix;
    extend: typeof extend;
    locale: typeof locale;
}
export declare type Plugin<T = never> = ((cls: typeof Dayjs, fn: DayjsFn, option?: T) => void) & {
    /** installed */
    _i?: boolean;
};
export declare type PluginOption<T extends Plugin<any>> = T extends Plugin<infer O> ? O : T;
export interface Extend {
    new (): Extend;
}
