/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export var TimepickerUtils;
(function (TimepickerUtils) {
    /**
     * @param {?} time
     * @param {?} compareWith
     * @param {?=} unit
     * @return {?}
     */
    function isSameOrAfter(time, compareWith, unit = 'minutes') {
        if (unit === 'hours') {
            return time.hour >= compareWith.hour;
        }
        if (unit === 'minutes') {
            return time.hasSame(compareWith, unit) || time.valueOf() > compareWith.valueOf();
        }
    }
    TimepickerUtils.isSameOrAfter = isSameOrAfter;
    /**
     * @param {?} time
     * @param {?} compareWith
     * @param {?=} unit
     * @return {?}
     */
    function isSameOrBefore(time, compareWith, unit = 'minutes') {
        if (unit === 'hours') {
            return time.hour <= compareWith.hour;
        }
        if (unit === 'minutes') {
            return time.hasSame(compareWith, unit) || time.valueOf() <= compareWith.valueOf();
        }
    }
    TimepickerUtils.isSameOrBefore = isSameOrBefore;
    /**
     * @param {?} time
     * @param {?} before
     * @param {?} after
     * @param {?=} unit
     * @return {?}
     */
    function isBetween(time, before, after, unit = 'minutes') {
        if (unit === 'hours') {
            return isSameOrBefore(time, after, unit) && isSameOrAfter(time, before, unit);
        }
        if (unit === 'minutes') {
            return isSameOrBefore(time, after) && isSameOrAfter(time, before);
        }
    }
    TimepickerUtils.isBetween = isBetween;
})(TimepickerUtils || (TimepickerUtils = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL3V0aWxzL3RpbWVwaWNrZXIudXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE1BQU0sS0FBVyxlQUFlLENBNEIvQjtBQTVCRCxXQUFpQixlQUFlOzs7Ozs7O0lBRTVCLFNBQWdCLGFBQWEsQ0FBQyxJQUFjLEVBQUUsV0FBcUIsRUFBRSxPQUE0QixTQUFTO1FBQ3RHLElBQUksSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQztTQUN4QztRQUNELElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUNwQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDcEY7SUFDTCxDQUFDO0lBUGUsNkJBQWEsZ0JBTzVCLENBQUE7Ozs7Ozs7SUFFRCxTQUFnQixjQUFjLENBQUMsSUFBYyxFQUFFLFdBQXFCLEVBQUUsT0FBNEIsU0FBUztRQUN2RyxJQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDbEIsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUM7U0FDeEM7UUFDRCxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDcEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3JGO0lBQ0wsQ0FBQztJQVBlLDhCQUFjLGlCQU83QixDQUFBOzs7Ozs7OztJQUVELFNBQWdCLFNBQVMsQ0FBQyxJQUFjLEVBQUUsTUFBZ0IsRUFBRSxLQUFlLEVBQUUsT0FBNEIsU0FBUztRQUM5RyxJQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDbEIsT0FBTyxjQUFjLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNqRjtRQUNELElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUNwQixPQUFPLGNBQWMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNyRTtJQUNMLENBQUM7SUFQZSx5QkFBUyxZQU94QixDQUFBO0FBQ0wsQ0FBQyxFQTVCZ0IsZUFBZSxLQUFmLGVBQWUsUUE0Qi9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVGltZXBpY2tlclV0aWxzIHtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBpc1NhbWVPckFmdGVyKHRpbWU6IERhdGVUaW1lLCBjb21wYXJlV2l0aDogRGF0ZVRpbWUsIHVuaXQ6ICdob3VycycgfCAnbWludXRlcycgPSAnbWludXRlcycpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHVuaXQgPT09ICdob3VycycpIHtcbiAgICAgICAgICAgIHJldHVybiB0aW1lLmhvdXIgPj0gY29tcGFyZVdpdGguaG91cjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodW5pdCA9PT0gJ21pbnV0ZXMnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGltZS5oYXNTYW1lKGNvbXBhcmVXaXRoLCB1bml0KSB8fCB0aW1lLnZhbHVlT2YoKSA+IGNvbXBhcmVXaXRoLnZhbHVlT2YoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBpc1NhbWVPckJlZm9yZSh0aW1lOiBEYXRlVGltZSwgY29tcGFyZVdpdGg6IERhdGVUaW1lLCB1bml0OiAnaG91cnMnIHwgJ21pbnV0ZXMnID0gJ21pbnV0ZXMnKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh1bml0ID09PSAnaG91cnMnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGltZS5ob3VyIDw9IGNvbXBhcmVXaXRoLmhvdXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVuaXQgPT09ICdtaW51dGVzJykge1xuICAgICAgICAgICAgcmV0dXJuIHRpbWUuaGFzU2FtZShjb21wYXJlV2l0aCwgdW5pdCkgfHwgdGltZS52YWx1ZU9mKCkgPD0gY29tcGFyZVdpdGgudmFsdWVPZigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGlzQmV0d2Vlbih0aW1lOiBEYXRlVGltZSwgYmVmb3JlOiBEYXRlVGltZSwgYWZ0ZXI6IERhdGVUaW1lLCB1bml0OiAnaG91cnMnIHwgJ21pbnV0ZXMnID0gJ21pbnV0ZXMnKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh1bml0ID09PSAnaG91cnMnKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNTYW1lT3JCZWZvcmUodGltZSwgYWZ0ZXIsIHVuaXQpICYmIGlzU2FtZU9yQWZ0ZXIodGltZSwgYmVmb3JlLCB1bml0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodW5pdCA9PT0gJ21pbnV0ZXMnKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNTYW1lT3JCZWZvcmUodGltZSwgYWZ0ZXIpICYmIGlzU2FtZU9yQWZ0ZXIodGltZSwgYmVmb3JlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==