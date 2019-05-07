/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { TimeUnit } from '../models/time-unit.enum';
import { DateTime } from 'luxon';
var TimeFormatterPipe = /** @class */ (function () {
    function TimeFormatterPipe() {
    }
    /**
     * @param {?} time
     * @param {?} timeUnit
     * @return {?}
     */
    TimeFormatterPipe.prototype.transform = /**
     * @param {?} time
     * @param {?} timeUnit
     * @return {?}
     */
    function (time, timeUnit) {
        if (time === undefined) {
            return time;
        }
        switch (timeUnit) {
            case TimeUnit.HOUR:
                return DateTime.fromObject({ hour: time }).toFormat('HH');
            case TimeUnit.MINUTE:
                return DateTime.fromObject({ minute: time }).toFormat('mm');
            default:
                throw new Error('no such time unit');
        }
    };
    TimeFormatterPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'timeFormatter'
                },] }
    ];
    return TimeFormatterPipe;
}());
export { TimeFormatterPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1mb3JtYXR0ZXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL3BpcGVzL3RpbWUtZm9ybWF0dGVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRWpDO0lBQUE7SUFtQkEsQ0FBQzs7Ozs7O0lBZEcscUNBQVM7Ozs7O0lBQVQsVUFBVSxJQUFZLEVBQUUsUUFBa0I7UUFDdEMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3BCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxRQUFRLFFBQVEsRUFBRTtZQUNkLEtBQUssUUFBUSxDQUFDLElBQUk7Z0JBQ2QsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVELEtBQUssUUFBUSxDQUFDLE1BQU07Z0JBQ2hCLE9BQU8sUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5RDtnQkFDSSxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDNUM7SUFDTCxDQUFDOztnQkFqQkosSUFBSSxTQUFDO29CQUNGLElBQUksRUFBRSxlQUFlO2lCQUN4Qjs7SUFpQkQsd0JBQUM7Q0FBQSxBQW5CRCxJQW1CQztTQWhCWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaW1lVW5pdCB9IGZyb20gJy4uL21vZGVscy90aW1lLXVuaXQuZW51bSc7XG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcblxuQFBpcGUoe1xuICAgIG5hbWU6ICd0aW1lRm9ybWF0dGVyJ1xufSlcbmV4cG9ydCBjbGFzcyBUaW1lRm9ybWF0dGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gICAgdHJhbnNmb3JtKHRpbWU6IG51bWJlciwgdGltZVVuaXQ6IFRpbWVVbml0KTogYW55IHtcbiAgICAgICAgaWYgKHRpbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoICh0aW1lVW5pdCkge1xuICAgICAgICAgICAgY2FzZSBUaW1lVW5pdC5IT1VSOlxuICAgICAgICAgICAgICAgIHJldHVybiBEYXRlVGltZS5mcm9tT2JqZWN0KHtob3VyOiB0aW1lfSkudG9Gb3JtYXQoJ0hIJyk7XG4gICAgICAgICAgICBjYXNlIFRpbWVVbml0Lk1JTlVURTpcbiAgICAgICAgICAgICAgICByZXR1cm4gRGF0ZVRpbWUuZnJvbU9iamVjdCh7bWludXRlOiB0aW1lfSkudG9Gb3JtYXQoJ21tJyk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm8gc3VjaCB0aW1lIHVuaXQnKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19