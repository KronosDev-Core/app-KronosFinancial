import type { Dayjs, Plugin } from '..';
import type { GetUnit, Unit } from './../units';
export declare type holiday = {
    date: Dayjs;
    name: string;
    repeat?: number;
    repeatUnit?: Exclude<Unit, GetUnit<'D'>>;
};
export declare type optsHoliday = {
    [key: string]: holiday;
};
declare module '../types' {
    interface DayjsFn {
        setHoliday: (holiday: holiday[] | holiday) => void;
        clearHoliday(): void;
    }
}
declare module '../dayjs' {
    interface Dayjs {
        _holiday: optsHoliday;
        isBusinessDay(): boolean;
        addBusinessDay(value: number, unit?: Unit): Dayjs;
        subtractBusinessDay(value: number, unit?: Unit): Dayjs;
        nextBusinessDay(): Dayjs;
        previousBusinessDay(): Dayjs;
        lastBusinessDayOf(): Dayjs;
        firstBusinessDayOf(): Dayjs;
        businessDaysInMonth(): Dayjs[];
        businessDaysInMonthGroupByWeek(): Dayjs[][];
        isHoliday(): boolean;
        getHolidays(): optsHoliday;
    }
}
declare const plugin: Plugin;
export default plugin;
