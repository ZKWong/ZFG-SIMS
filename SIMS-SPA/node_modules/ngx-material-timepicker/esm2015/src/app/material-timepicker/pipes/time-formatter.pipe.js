/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { TimeUnit } from '../models/time-unit.enum';
import { DateTime } from 'luxon';
export class TimeFormatterPipe {
    /**
     * @param {?} time
     * @param {?} timeUnit
     * @return {?}
     */
    transform(time, timeUnit) {
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
    }
}
TimeFormatterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'timeFormatter'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1mb3JtYXR0ZXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL3BpcGVzL3RpbWUtZm9ybWF0dGVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBS2pDLE1BQU0sT0FBTyxpQkFBaUI7Ozs7OztJQUUxQixTQUFTLENBQUMsSUFBWSxFQUFFLFFBQWtCO1FBQ3RDLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUNwQixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsUUFBUSxRQUFRLEVBQUU7WUFDZCxLQUFLLFFBQVEsQ0FBQyxJQUFJO2dCQUNkLE9BQU8sUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1RCxLQUFLLFFBQVEsQ0FBQyxNQUFNO2dCQUNoQixPQUFPLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUQ7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQzVDO0lBQ0wsQ0FBQzs7O1lBakJKLElBQUksU0FBQztnQkFDRixJQUFJLEVBQUUsZUFBZTthQUN4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRpbWVVbml0IH0gZnJvbSAnLi4vbW9kZWxzL3RpbWUtdW5pdC5lbnVtJztcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xuXG5AUGlwZSh7XG4gICAgbmFtZTogJ3RpbWVGb3JtYXR0ZXInXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVGb3JtYXR0ZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgICB0cmFuc2Zvcm0odGltZTogbnVtYmVyLCB0aW1lVW5pdDogVGltZVVuaXQpOiBhbnkge1xuICAgICAgICBpZiAodGltZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGltZTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKHRpbWVVbml0KSB7XG4gICAgICAgICAgICBjYXNlIFRpbWVVbml0LkhPVVI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIERhdGVUaW1lLmZyb21PYmplY3Qoe2hvdXI6IHRpbWV9KS50b0Zvcm1hdCgnSEgnKTtcbiAgICAgICAgICAgIGNhc2UgVGltZVVuaXQuTUlOVVRFOlxuICAgICAgICAgICAgICAgIHJldHVybiBEYXRlVGltZS5mcm9tT2JqZWN0KHttaW51dGU6IHRpbWV9KS50b0Zvcm1hdCgnbW0nKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBzdWNoIHRpbWUgdW5pdCcpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=