import { DateTime } from 'luxon';
export declare namespace TimepickerUtils {
    function isSameOrAfter(time: DateTime, compareWith: DateTime, unit?: 'hours' | 'minutes'): boolean;
    function isSameOrBefore(time: DateTime, compareWith: DateTime, unit?: 'hours' | 'minutes'): boolean;
    function isBetween(time: DateTime, before: DateTime, after: DateTime, unit?: 'hours' | 'minutes'): boolean;
}
