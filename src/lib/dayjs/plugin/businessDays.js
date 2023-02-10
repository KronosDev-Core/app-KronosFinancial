// This plugin is based on the work of https://github.com/soar-tech & https://github.com/eduolalo
import { abs, absFloor } from '../utils';
import { UNIT_DAY, UNIT_MONTH, UNIT_WEEK, UNIT_YEAR } from './../constants';
import { normalize } from './../units';
const idxBusinessDays = [1, 2, 3, 4, 5];
function $add(value) {
    let restBusinessDay = idxBusinessDays.length - this.day();
    let nbrWeekAdd = 0;
    let nbrDayAdd = value;
    let idxThisDay = this.day();
    if (restBusinessDay < 0) {
        restBusinessDay = 0;
        idxThisDay = 0;
    }
    if (restBusinessDay < nbrDayAdd) {
        nbrDayAdd -= restBusinessDay;
        idxThisDay = 0;
        if (nbrWeekAdd === 0) {
            nbrWeekAdd += 1;
        }
    }
    else {
        if (restBusinessDay === nbrDayAdd) {
            nbrWeekAdd = 0;
        }
        if (restBusinessDay > nbrDayAdd) {
            nbrWeekAdd = 0;
        }
    }
    if (nbrDayAdd > 5) {
        nbrWeekAdd += absFloor(nbrDayAdd / 5);
        nbrDayAdd -= absFloor(nbrDayAdd / 5) * 5;
    }
    return this.add(nbrWeekAdd, UNIT_WEEK)
        .day(idxThisDay)
        .add(nbrDayAdd, UNIT_DAY);
}
// REWORK: This function is not working properly i think or i'm missing something
function $subtract(value) {
    let restBusinessDay = idxBusinessDays.length - (idxBusinessDays.length - this.day()) - 1;
    let nbrWeekAdd = 0;
    let nbrDayAdd = value;
    let idxThisDay = this.day();
    if (restBusinessDay <= 0) {
        restBusinessDay = 0;
        idxThisDay = 6;
    }
    if (restBusinessDay < nbrDayAdd) {
        nbrDayAdd -= restBusinessDay;
        idxThisDay = 6;
        if (nbrWeekAdd === 0) {
            nbrWeekAdd += 1;
        }
    }
    else {
        if (restBusinessDay === nbrDayAdd) {
            nbrWeekAdd = 0;
        }
        if (restBusinessDay > nbrDayAdd) {
            nbrWeekAdd = 0;
        }
    }
    if (nbrDayAdd > 5) {
        nbrWeekAdd += absFloor(nbrDayAdd / 5);
        nbrDayAdd -= absFloor(nbrDayAdd / 5) * 5;
    }
    // NOTE: Probably not the best solution, but it works.
    const res = this.subtract(nbrWeekAdd, UNIT_WEEK)
        .day(idxThisDay)
        .subtract(nbrDayAdd, UNIT_DAY);
    return [0, 1].includes(this.day()) && nbrWeekAdd > 1
        ? res.nextBusinessDay()
        : res;
}
function businessDay(value, unit) {
    //  value is not 0
    const v = absFloor(value);
    let res = undefined;
    if (v > 0) {
        if (unit === UNIT_DAY)
            res = $add.call(this, v);
        if (unit === UNIT_WEEK)
            res = $add.call(this, v * 5);
    }
    if (v < 0) {
        if (unit === UNIT_DAY)
            res = $subtract.call(this, abs(v));
        if (unit === UNIT_WEEK)
            res = $subtract.call(this, abs(v) * 5);
    }
    while (res !== undefined && res.isHoliday()) {
        if (v > 0)
            res = res.nextBusinessDay();
        if (v < 0)
            res = res.previousBusinessDay();
    }
    return res;
}
function $setHoliday(old, key, value) {
    return {
        ...old,
        [key]: value,
    };
}
const plugin = (cls, fn) => {
    // (cls: DayjsClass, fn: DayjsFn)
    const proto = cls.prototype;
    // global var
    proto._holiday = proto._holiday || {};
    // global function
    fn.setHoliday = function (holiday) {
        if (Array.isArray(holiday) && holiday.length > 0) {
            holiday.forEach((h) => {
                if (!h.repeat)
                    proto._holiday = $setHoliday(proto._holiday, h.date.format('YYYY-MM-DD'), h);
                else {
                    for (let i = 0, l = h.repeat; i < l; i++) {
                        if (!h.repeatUnit)
                            h.repeatUnit = UNIT_YEAR;
                        proto._holiday = $setHoliday(proto._holiday, h.repeatUnit === UNIT_DAY || h.repeatUnit === UNIT_MONTH
                            ? h.date.addBusinessDay(i, h.repeatUnit).format('YYYY-MM-DD')
                            : h.date.add(i, h.repeatUnit).format('YYYY-MM-DD'), {
                            ...h,
                            date: h.date.add(i, h.repeatUnit),
                        });
                    }
                }
            });
        }
        else if (holiday && !Array.isArray(holiday))
            if (!holiday.repeat)
                proto._holiday = $setHoliday(proto._holiday, holiday.date.format('YYYY-MM-DD'), holiday);
            else {
                for (let i = 0, l = holiday.repeat; i < l; i++) {
                    if (!holiday.repeatUnit)
                        holiday.repeatUnit = UNIT_YEAR;
                    proto._holiday = $setHoliday(proto._holiday, holiday.repeatUnit === UNIT_DAY || holiday.repeatUnit === UNIT_MONTH
                        ? holiday.date
                            .addBusinessDay(i, holiday.repeatUnit)
                            .format('YYYY-MM-DD')
                        : holiday.date.add(i, holiday.repeatUnit).format('YYYY-MM-DD'), {
                        ...holiday,
                        date: holiday.date.add(i, holiday.repeatUnit),
                    });
                }
            }
    };
    fn.clearHoliday = function () {
        proto._holiday = {};
    };
    // Business day
    proto.isBusinessDay = function () {
        return idxBusinessDays.includes(this.day()) && !this.isHoliday();
    };
    proto.addBusinessDay = function (value, unit) {
        /* NOTE:
          1.  !(absFloor(value=undefined) => NaN, absFloor(value=0) => 0) => true,
              but ts doesn't know that apparently, so we obligate to check if value is not undefined and not 0
    
          2.  uncovered branch (l.241), but it's not possible to reach it, because if value is 0 `!value` will be true and we will return `this`
        */
        if (!value)
            return this;
        // if (!absFloor(value)) return this
        const u = unit ? normalize(unit) : UNIT_DAY;
        return businessDay.call(this, abs(value), u);
    };
    proto.subtractBusinessDay = function (value, unit) {
        /* NOTE:
          1.  !(absFloor(value=undefined) => NaN, absFloor(value=0) => 0) => true,
              but ts doesn't know that apparently, so we obligate to check if value is not undefined and not 0
    
          2.  uncovered branch (l.241), but it's not possible to reach it, because if value is 0 `!value` will be true and we will return `this`
        */
        if (!value)
            return this;
        // if (!absFloor(value)) return this
        const u = unit ? normalize(unit) : UNIT_DAY;
        return businessDay.call(this, -abs(value), u);
    };
    proto.nextBusinessDay = function () {
        return this.addBusinessDay(1);
    };
    proto.previousBusinessDay = function () {
        return this.subtractBusinessDay(1);
    };
    proto.lastBusinessDayOf = function (unit) {
        const lm = this.endOf(unit || UNIT_MONTH);
        return lm.isBusinessDay() ? lm : lm.previousBusinessDay();
    };
    proto.firstBusinessDayOf = function (unit) {
        const fm = this.startOf(unit || UNIT_MONTH);
        return fm.isBusinessDay() ? fm : fm.nextBusinessDay();
    };
    proto.businessDaysInMonth = function () {
        let start = this.startOf(UNIT_MONTH).hour(this.hour());
        let end = this.endOf(UNIT_MONTH).hour(this.hour());
        if (!start.isBusinessDay())
            start = start.nextBusinessDay();
        if (!end.isBusinessDay())
            end = end.previousBusinessDay();
        const arr = [];
        let current = start;
        while (current.month() === end.month()) {
            arr.push(current);
            current = current.nextBusinessDay();
        }
        return arr;
    };
    proto.businessDaysInMonthGroupByWeek = function () {
        const days = this.businessDaysInMonth();
        const arr = [];
        let lastDate, idxWeek = 0;
        days.forEach((day) => {
            if (!lastDate)
                arr.push([day]);
            else if (lastDate.day() + 1 === day.day())
                arr[idxWeek].push(day);
            else {
                arr.push([day]);
                idxWeek += 1;
            }
            lastDate = day;
        });
        return arr;
    };
    // holidays
    proto.getHolidays = function () {
        return proto._holiday;
    };
    proto.isHoliday = function () {
        return !!this.getHolidays()[this.format('YYYY-MM-DD')];
    };
};
export default plugin;
