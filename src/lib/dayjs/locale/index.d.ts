declare type RepeatDay<T = string> = [T, T, T, T, T, T, T];
declare type RepeatMonth<T = string> = [T, T, T, T, T, T, T, T, T, T, T, T];
declare type Format = 'LT' | 'LTS' | 'L' | 'LL' | 'LLL' | 'LLLL' | 'l' | 'll' | 'lll' | 'llll';
declare type Relative = 'future' | 'past' | 's' | 'm' | 'mm' | 'h' | 'hh' | 'd' | 'dd' | 'M' | 'MM' | 'y' | 'yy';
export interface Locale {
    name: string;
    weekdays: RepeatDay;
    weekdaysShort?: RepeatDay;
    weekdaysMin?: RepeatDay;
    months: RepeatMonth;
    monthsShort?: RepeatMonth;
    ordinal?: (number: string, period?: 'W') => string;
    weekStart?: number;
    yearStart?: number;
    formats?: Partial<Record<Format, string>>;
    relativeTime?: Record<Relative, string>;
    meridiem?: (hour: number, minute: number, isLowercase: boolean) => string;
    invalidDate?: string;
}
export {};
