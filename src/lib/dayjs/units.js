import { mutable } from './utils';
import { UNIT_DATE, UNIT_DAY, UNIT_HOUR, UNIT_MILLISECOND, UNIT_MINUTE, UNIT_MONTH, UNIT_SECOND, UNIT_WEEK, UNIT_YEAR, } from './constants';
export const units = mutable({
    y: UNIT_YEAR,
    M: UNIT_MONTH,
    D: UNIT_DATE,
    h: UNIT_HOUR,
    m: UNIT_MINUTE,
    s: UNIT_SECOND,
    ms: UNIT_MILLISECOND,
    /** Day of week */
    d: UNIT_DAY,
    /** Week of year */
    w: UNIT_WEEK,
});
export const unitsShort = Object.keys(units);
export const unitsLong = Object.values(units);
const isShortUnit = (unit) => unitsShort.includes(unit);
export const normalize = (unit) => {
    var _a, _b;
    if (isShortUnit(unit)) {
        return units[unit];
    }
    const normalizedUnit = (_b = (_a = unit === null || unit === void 0 ? void 0 : unit.toLowerCase()) === null || _a === void 0 ? void 0 : _a.replace(/s$/, '')) !== null && _b !== void 0 ? _b : '';
    return normalizedUnit;
};
