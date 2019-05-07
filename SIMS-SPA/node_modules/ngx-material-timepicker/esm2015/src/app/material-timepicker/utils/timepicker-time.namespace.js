/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        return Array(format).fill(1).map((v, i) => {
            /** @type {?} */
            const angleStep = 30;
            /** @type {?} */
            const time = v + i;
            /** @type {?} */
            const angle = angleStep * time;
            return { time: time === 24 ? 0 : time, angle };
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
            return hours.map(value => {
                /** @type {?} */
                const hour = config.format === 24 ? value.time : TimeAdapter.formatHour(value.time, config.format, config.period);
                /** @type {?} */
                const currentTime = DateTime.fromObject({ hour }).toFormat(TimeFormat.TWELVE);
                return Object.assign({}, value, { disabled: !TimeAdapter.isTimeAvailable(currentTime, config.min, config.max, 'hours') });
            });
        }
        return hours;
    }
    TimepickerTime.disableHours = disableHours;
    /**
     * @param {?=} gap
     * @return {?}
     */
    function getMinutes(gap = 1) {
        /** @type {?} */
        const minutesCount = 60;
        /** @type {?} */
        const angleStep = 360 / minutesCount;
        /** @type {?} */
        const minutes = [];
        for (let i = 0; i < minutesCount; i++) {
            /** @type {?} */
            const angle = angleStep * i;
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
            const hour = TimeAdapter.formatHour(selectedHour, config.format, config.period);
            return minutes.map(value => {
                /** @type {?} */
                const currentTime = DateTime.fromObject({ hour, minute: value.time }).toFormat(TimeFormat.TWELVE);
                return Object.assign({}, value, { disabled: !TimeAdapter.isTimeAvailable(currentTime, config.min, config.max, 'minutes') });
            });
        }
        return minutes;
    }
    TimepickerTime.disableMinutes = disableMinutes;
})(TimepickerTime || (TimepickerTime = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci10aW1lLm5hbWVzcGFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL3V0aWxzL3RpbWVwaWNrZXItdGltZS5uYW1lc3BhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFeEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUVqQyxNQUFNLEtBQVcsY0FBYyxDQXlEOUI7QUF6REQsV0FBaUIsY0FBYzs7Ozs7SUFFM0IsU0FBZ0IsUUFBUSxDQUFDLE1BQWM7UUFDbkMsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTs7a0JBQ2hDLFNBQVMsR0FBRyxFQUFFOztrQkFDZCxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7O2tCQUNaLEtBQUssR0FBRyxTQUFTLEdBQUcsSUFBSTtZQUM5QixPQUFPLEVBQUMsSUFBSSxFQUFFLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQVBlLHVCQUFRLFdBT3ZCLENBQUE7Ozs7OztJQUVELFNBQWdCLFlBQVksQ0FBQyxLQUFzQixFQUFFLE1BQTBCO1FBQzNFLElBQUksTUFBTSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFO1lBRTFCLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTs7c0JBQ2YsSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDOztzQkFDM0csV0FBVyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO2dCQUUzRSx5QkFDTyxLQUFLLElBQ1IsUUFBUSxFQUFFLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxJQUN0RjtZQUNOLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBZGUsMkJBQVksZUFjM0IsQ0FBQTs7Ozs7SUFFRCxTQUFnQixVQUFVLENBQUMsR0FBRyxHQUFHLENBQUM7O2NBQ3hCLFlBQVksR0FBRyxFQUFFOztjQUNqQixTQUFTLEdBQUcsR0FBRyxHQUFHLFlBQVk7O2NBQzlCLE9BQU8sR0FBRyxFQUFFO1FBRWxCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O2tCQUM3QixLQUFLLEdBQUcsU0FBUyxHQUFHLENBQUM7WUFDM0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsRUFBRTtnQkFDZixPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDO2FBQzdEO1NBQ0o7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBWmUseUJBQVUsYUFZekIsQ0FBQTs7Ozs7OztJQUVELFNBQWdCLGNBQWMsQ0FBQyxPQUF3QixFQUFFLFlBQW9CLEVBQUUsTUFBMEI7UUFDckcsSUFBSSxNQUFNLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUU7O2tCQUVwQixJQUFJLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDO1lBRS9FLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTs7c0JBQ2pCLFdBQVcsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztnQkFFL0YseUJBQ08sS0FBSyxJQUNSLFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsSUFDeEY7WUFDTixDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQWZlLDZCQUFjLGlCQWU3QixDQUFBO0FBQ0wsQ0FBQyxFQXpEZ0IsY0FBYyxLQUFkLGNBQWMsUUF5RDlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2xvY2tGYWNlVGltZSB9IGZyb20gJy4uL21vZGVscy9jbG9jay1mYWNlLXRpbWUuaW50ZXJmYWNlJztcbmltcG9ydCB7IFRpbWVBZGFwdGVyIH0gZnJvbSAnLi4vc2VydmljZXMvdGltZS1hZGFwdGVyJztcbmltcG9ydCB7IFRpbWVGb3JtYXQgfSBmcm9tICcuLi9tb2RlbHMvdGltZS1mb3JtYXQuZW51bSc7XG5pbXBvcnQgeyBEaXNhYmxlZFRpbWVDb25maWcgfSBmcm9tICcuLi9tb2RlbHMvZGlzYWJsZWQtdGltZS1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xuXG5leHBvcnQgbmFtZXNwYWNlIFRpbWVwaWNrZXJUaW1lIHtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRIb3Vycyhmb3JtYXQ6IG51bWJlcik6IENsb2NrRmFjZVRpbWVbXSB7XG4gICAgICAgIHJldHVybiBBcnJheShmb3JtYXQpLmZpbGwoMSkubWFwKCh2LCBpKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhbmdsZVN0ZXAgPSAzMDtcbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSB2ICsgaTtcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gYW5nbGVTdGVwICogdGltZTtcbiAgICAgICAgICAgIHJldHVybiB7dGltZTogdGltZSA9PT0gMjQgPyAwIDogdGltZSwgYW5nbGV9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gZGlzYWJsZUhvdXJzKGhvdXJzOiBDbG9ja0ZhY2VUaW1lW10sIGNvbmZpZzogRGlzYWJsZWRUaW1lQ29uZmlnKTogQ2xvY2tGYWNlVGltZVtdIHtcbiAgICAgICAgaWYgKGNvbmZpZy5taW4gfHwgY29uZmlnLm1heCkge1xuXG4gICAgICAgICAgICByZXR1cm4gaG91cnMubWFwKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBob3VyID0gY29uZmlnLmZvcm1hdCA9PT0gMjQgPyB2YWx1ZS50aW1lIDogVGltZUFkYXB0ZXIuZm9ybWF0SG91cih2YWx1ZS50aW1lLCBjb25maWcuZm9ybWF0LCBjb25maWcucGVyaW9kKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGVUaW1lLmZyb21PYmplY3Qoe2hvdXJ9KS50b0Zvcm1hdChUaW1lRm9ybWF0LlRXRUxWRSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAuLi52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICFUaW1lQWRhcHRlci5pc1RpbWVBdmFpbGFibGUoY3VycmVudFRpbWUsIGNvbmZpZy5taW4sIGNvbmZpZy5tYXgsICdob3VycycpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBob3VycztcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0TWludXRlcyhnYXAgPSAxKTogQ2xvY2tGYWNlVGltZVtdIHtcbiAgICAgICAgY29uc3QgbWludXRlc0NvdW50ID0gNjA7XG4gICAgICAgIGNvbnN0IGFuZ2xlU3RlcCA9IDM2MCAvIG1pbnV0ZXNDb3VudDtcbiAgICAgICAgY29uc3QgbWludXRlcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWludXRlc0NvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gYW5nbGVTdGVwICogaTtcbiAgICAgICAgICAgIGlmIChpICUgZ2FwID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbWludXRlcy5wdXNoKHt0aW1lOiBpLCBhbmdsZTogYW5nbGUgIT09IDAgPyBhbmdsZSA6IDM2MH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtaW51dGVzO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlTWludXRlcyhtaW51dGVzOiBDbG9ja0ZhY2VUaW1lW10sIHNlbGVjdGVkSG91cjogbnVtYmVyLCBjb25maWc6IERpc2FibGVkVGltZUNvbmZpZykge1xuICAgICAgICBpZiAoY29uZmlnLm1pbiB8fCBjb25maWcubWF4KSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGhvdXIgPSBUaW1lQWRhcHRlci5mb3JtYXRIb3VyKHNlbGVjdGVkSG91ciwgY29uZmlnLmZvcm1hdCwgY29uZmlnLnBlcmlvZCk7XG5cbiAgICAgICAgICAgIHJldHVybiBtaW51dGVzLm1hcCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBEYXRlVGltZS5mcm9tT2JqZWN0KHtob3VyLCBtaW51dGU6IHZhbHVlLnRpbWV9KS50b0Zvcm1hdChUaW1lRm9ybWF0LlRXRUxWRSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAuLi52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICFUaW1lQWRhcHRlci5pc1RpbWVBdmFpbGFibGUoY3VycmVudFRpbWUsIGNvbmZpZy5taW4sIGNvbmZpZy5tYXgsICdtaW51dGVzJylcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1pbnV0ZXM7XG4gICAgfVxufVxuIl19