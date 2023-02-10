import type { PickByValue } from 'utility-types';
export declare type UnitBase = 'year' | 'month' | 'date' | 'hour' | 'minute' | 'second' | 'millisecond';
export declare const units: import("utility-types").Mutable<{
    readonly y: "year";
    readonly M: "month";
    readonly D: "date";
    readonly h: "hour";
    readonly m: "minute";
    readonly s: "second";
    readonly ms: "millisecond";
    /** Day of week */
    readonly d: "day";
    /** Week of year */
    readonly w: "week";
}>;
export declare type UnitMap = typeof units;
export declare type UnitShort = keyof UnitMap;
export declare type UnitLong = UnitMap[UnitShort];
export declare type GetUnit<K extends UnitShort> = K | `${UnitMap[K]}${'' | 's'}`;
export declare type Unit = GetUnit<UnitShort>;
export declare type GetShortByLong<T extends UnitLong> = keyof PickByValue<UnitMap, T>;
export declare const unitsShort: ("y" | "M" | "D" | "h" | "m" | "s" | "ms" | "d" | "w")[];
export declare const unitsLong: UnitLong[];
declare type RemovePlural<T extends Unit> = T extends `${infer U}s` ? U : T;
export declare type UnitShorter<U extends Unit> = U extends UnitShort ? U : RemovePlural<U> extends UnitLong ? GetShortByLong<RemovePlural<U>> : never;
export declare type UnitLonger<U extends Unit> = U extends UnitLong ? U : RemovePlural<U> extends UnitLong ? RemovePlural<U> : U extends UnitShort ? UnitMap[U] : never;
export declare const normalize: <T extends Unit>(unit: T) => UnitLonger<T>;
export {};
