/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { TimeAdapter } from '../services/time-adapter';
import { TimeFormat } from '../models/time-format.enum';
import { DateTime } from 'luxon';
export var TimepickerTime;
(function (TimepickerTime) {
    /**
     * @param {?} format
     * @return {?}
     */
    function getHours(format) {
        return Array(format).fill(1).map(function (v, i) {
            /** @type {?} */
            var angleStep = 30;
            /** @type {?} */
            var time = v + i;
            /** @type {?} */
            var angle = angleStep * time;
            return { time: time === 24 ? 0 : time, angle: angle };
        });
    }
    TimepickerTime.getHours = getHours;
    /**
     * @param {?} hours
     * @param {?} config
     * @return {?}
     */
    function disableHours(hours, config) {
        if (config.min || config.max) {
            return hours.map(function (value) {
                /** @type {?} */
                var hour = config.format === 24 ? value.time : TimeAdapter.formatHour(value.time, config.format, config.period);
                /** @type {?} */
                var currentTime = DateTime.fromObject({ hour: hour }).toFormat(TimeFormat.TWELVE);
                return tslib_1.__assign({}, value, { disabled: !TimeAdapter.isTimeAvailable(currentTime, config.min, config.max, 'hours') });
            });
        }
        return hours;
    }
    TimepickerTime.disableHours = disableHours;
    /**
     * @param {?=} gap
     * @return {?}
     */
    function getMinutes(gap) {
        if (gap === void 0) { gap = 1; }
        /** @type {?} */
        var minutesCount = 60;
        /** @type {?} */
        var angleStep = 360 / minutesCount;
        /** @type {?} */
        var minutes = [];
        for (var i = 0; i < minutesCount; i++) {
            /** @type {?} */
            var angle = angleStep * i;
            if (i % gap === 0) {
                minutes.push({ time: i, angle: angle !== 0 ? angle : 360 });
            }
        }
        return minutes;
    }
    TimepickerTime.getMinutes = getMinutes;
    /**
     * @param {?} minutes
     * @param {?} selectedHour
     * @param {?} config
     * @return {?}
     */
    function disableMinutes(minutes, selectedHour, config) {
        if (config.min || config.max) {
            /** @type {?} */
            var hour_1 = TimeAdapter.formatHour(selectedHour, config.format, config.period);
            return minutes.map(function (value) {
                /** @type {?} */
                var currentTime = DateTime.fromObject({ hour: hour_1, minute: value.time }).toFormat(TimeFormat.TWELVE);
                return tslib_1.__assign({}, value, { disabled: !TimeAdapter.isTimeAvailable(currentTime, config.min, config.max, 'minutes') });
            });
        }
        return minutes;
    }
    TimepickerTime.disableMinutes = disableMinutes;
})(TimepickerTime || (TimepickerTime = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci10aW1lLm5hbWVzcGFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL3V0aWxzL3RpbWVwaWNrZXItdGltZS5uYW1lc3BhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXhELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFakMsTUFBTSxLQUFXLGNBQWMsQ0F5RDlCO0FBekRELFdBQWlCLGNBQWM7Ozs7O0lBRTNCLFNBQWdCLFFBQVEsQ0FBQyxNQUFjO1FBQ25DLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQzs7Z0JBQzVCLFNBQVMsR0FBRyxFQUFFOztnQkFDZCxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7O2dCQUNaLEtBQUssR0FBRyxTQUFTLEdBQUcsSUFBSTtZQUM5QixPQUFPLEVBQUMsSUFBSSxFQUFFLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssT0FBQSxFQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBUGUsdUJBQVEsV0FPdkIsQ0FBQTs7Ozs7O0lBRUQsU0FBZ0IsWUFBWSxDQUFDLEtBQXNCLEVBQUUsTUFBMEI7UUFDM0UsSUFBSSxNQUFNLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFFMUIsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSzs7b0JBQ1osSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDOztvQkFDM0csV0FBVyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBQyxJQUFJLE1BQUEsRUFBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7Z0JBRTNFLDRCQUNPLEtBQUssSUFDUixRQUFRLEVBQUUsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLElBQ3RGO1lBQ04sQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFkZSwyQkFBWSxlQWMzQixDQUFBOzs7OztJQUVELFNBQWdCLFVBQVUsQ0FBQyxHQUFPO1FBQVAsb0JBQUEsRUFBQSxPQUFPOztZQUN4QixZQUFZLEdBQUcsRUFBRTs7WUFDakIsU0FBUyxHQUFHLEdBQUcsR0FBRyxZQUFZOztZQUM5QixPQUFPLEdBQUcsRUFBRTtRQUVsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFOztnQkFDN0IsS0FBSyxHQUFHLFNBQVMsR0FBRyxDQUFDO1lBQzNCLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQzthQUM3RDtTQUNKO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQVplLHlCQUFVLGFBWXpCLENBQUE7Ozs7Ozs7SUFFRCxTQUFnQixjQUFjLENBQUMsT0FBd0IsRUFBRSxZQUFvQixFQUFFLE1BQTBCO1FBQ3JHLElBQUksTUFBTSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFOztnQkFFcEIsTUFBSSxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUUvRSxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLOztvQkFDZCxXQUFXLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFDLElBQUksUUFBQSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztnQkFFL0YsNEJBQ08sS0FBSyxJQUNSLFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsSUFDeEY7WUFDTixDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQWZlLDZCQUFjLGlCQWU3QixDQUFBO0FBQ0wsQ0FBQyxFQXpEZ0IsY0FBYyxLQUFkLGNBQWMsUUF5RDlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2xvY2tGYWNlVGltZSB9IGZyb20gJy4uL21vZGVscy9jbG9jay1mYWNlLXRpbWUuaW50ZXJmYWNlJztcbmltcG9ydCB7IFRpbWVBZGFwdGVyIH0gZnJvbSAnLi4vc2VydmljZXMvdGltZS1hZGFwdGVyJztcbmltcG9ydCB7IFRpbWVGb3JtYXQgfSBmcm9tICcuLi9tb2RlbHMvdGltZS1mb3JtYXQuZW51bSc7XG5pbXBvcnQgeyBEaXNhYmxlZFRpbWVDb25maWcgfSBmcm9tICcuLi9tb2RlbHMvZGlzYWJsZWQtdGltZS1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xuXG5leHBvcnQgbmFtZXNwYWNlIFRpbWVwaWNrZXJUaW1lIHtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRIb3Vycyhmb3JtYXQ6IG51bWJlcik6IENsb2NrRmFjZVRpbWVbXSB7XG4gICAgICAgIHJldHVybiBBcnJheShmb3JtYXQpLmZpbGwoMSkubWFwKCh2LCBpKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhbmdsZVN0ZXAgPSAzMDtcbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSB2ICsgaTtcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gYW5nbGVTdGVwICogdGltZTtcbiAgICAgICAgICAgIHJldHVybiB7dGltZTogdGltZSA9PT0gMjQgPyAwIDogdGltZSwgYW5nbGV9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gZGlzYWJsZUhvdXJzKGhvdXJzOiBDbG9ja0ZhY2VUaW1lW10sIGNvbmZpZzogRGlzYWJsZWRUaW1lQ29uZmlnKTogQ2xvY2tGYWNlVGltZVtdIHtcbiAgICAgICAgaWYgKGNvbmZpZy5taW4gfHwgY29uZmlnLm1heCkge1xuXG4gICAgICAgICAgICByZXR1cm4gaG91cnMubWFwKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBob3VyID0gY29uZmlnLmZvcm1hdCA9PT0gMjQgPyB2YWx1ZS50aW1lIDogVGltZUFkYXB0ZXIuZm9ybWF0SG91cih2YWx1ZS50aW1lLCBjb25maWcuZm9ybWF0LCBjb25maWcucGVyaW9kKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGVUaW1lLmZyb21PYmplY3Qoe2hvdXJ9KS50b0Zvcm1hdChUaW1lRm9ybWF0LlRXRUxWRSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAuLi52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICFUaW1lQWRhcHRlci5pc1RpbWVBdmFpbGFibGUoY3VycmVudFRpbWUsIGNvbmZpZy5taW4sIGNvbmZpZy5tYXgsICdob3VycycpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBob3VycztcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0TWludXRlcyhnYXAgPSAxKTogQ2xvY2tGYWNlVGltZVtdIHtcbiAgICAgICAgY29uc3QgbWludXRlc0NvdW50ID0gNjA7XG4gICAgICAgIGNvbnN0IGFuZ2xlU3RlcCA9IDM2MCAvIG1pbnV0ZXNDb3VudDtcbiAgICAgICAgY29uc3QgbWludXRlcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWludXRlc0NvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gYW5nbGVTdGVwICogaTtcbiAgICAgICAgICAgIGlmIChpICUgZ2FwID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbWludXRlcy5wdXNoKHt0aW1lOiBpLCBhbmdsZTogYW5nbGUgIT09IDAgPyBhbmdsZSA6IDM2MH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtaW51dGVzO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlTWludXRlcyhtaW51dGVzOiBDbG9ja0ZhY2VUaW1lW10sIHNlbGVjdGVkSG91cjogbnVtYmVyLCBjb25maWc6IERpc2FibGVkVGltZUNvbmZpZykge1xuICAgICAgICBpZiAoY29uZmlnLm1pbiB8fCBjb25maWcubWF4KSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGhvdXIgPSBUaW1lQWRhcHRlci5mb3JtYXRIb3VyKHNlbGVjdGVkSG91ciwgY29uZmlnLmZvcm1hdCwgY29uZmlnLnBlcmlvZCk7XG5cbiAgICAgICAgICAgIHJldHVybiBtaW51dGVzLm1hcCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBEYXRlVGltZS5mcm9tT2JqZWN0KHtob3VyLCBtaW51dGU6IHZhbHVlLnRpbWV9KS50b0Zvcm1hdChUaW1lRm9ybWF0LlRXRUxWRSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAuLi52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICFUaW1lQWRhcHRlci5pc1RpbWVBdmFpbGFibGUoY3VycmVudFRpbWUsIGNvbmZpZy5taW4sIGNvbmZpZy5tYXgsICdtaW51dGVzJylcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1pbnV0ZXM7XG4gICAgfVxufVxuIl19