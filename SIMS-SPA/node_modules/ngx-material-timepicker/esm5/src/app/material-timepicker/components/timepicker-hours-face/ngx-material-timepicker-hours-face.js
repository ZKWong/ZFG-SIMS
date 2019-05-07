/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EventEmitter, Input, Output } from '@angular/core';
import { DateTime } from 'luxon';
import { TimepickerTime } from '../../utils/timepicker-time.namespace';
var NgxMaterialTimepickerHoursFace = /** @class */ (function () {
    function NgxMaterialTimepickerHoursFace(format) {
        this.hourChange = new EventEmitter();
        this.hourSelected = new EventEmitter();
        this.hoursList = [];
        this.hoursList = TimepickerTime.getHours(format);
    }
    /**
     * @param {?} time
     * @return {?}
     */
    NgxMaterialTimepickerHoursFace.prototype.onTimeSelected = /**
     * @param {?} time
     * @return {?}
     */
    function (time) {
        this.hourSelected.next(time);
    };
    NgxMaterialTimepickerHoursFace.propDecorators = {
        selectedHour: [{ type: Input }],
        minTime: [{ type: Input }],
        maxTime: [{ type: Input }],
        format: [{ type: Input }],
        hourChange: [{ type: Output }],
        hourSelected: [{ type: Output }]
    };
    return NgxMaterialTimepickerHoursFace;
}());
export { NgxMaterialTimepickerHoursFace };
if (false) {
    /** @type {?} */
    NgxMaterialTimepickerHoursFace.prototype.selectedHour;
    /** @type {?} */
    NgxMaterialTimepickerHoursFace.prototype.minTime;
    /** @type {?} */
    NgxMaterialTimepickerHoursFace.prototype.maxTime;
    /** @type {?} */
    NgxMaterialTimepickerHoursFace.prototype.format;
    /** @type {?} */
    NgxMaterialTimepickerHoursFace.prototype.hourChange;
    /** @type {?} */
    NgxMaterialTimepickerHoursFace.prototype.hourSelected;
    /** @type {?} */
    NgxMaterialTimepickerHoursFace.prototype.hoursList;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItaG91cnMtZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1ob3Vycy1mYWNlL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWhvdXJzLWZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRWpDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUd2RTtJQVlJLHdDQUFzQixNQUFjO1FBTDFCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUMvQyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFcEQsY0FBUyxHQUFvQixFQUFFLENBQUM7UUFHNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JELENBQUM7Ozs7O0lBRUQsdURBQWM7Ozs7SUFBZCxVQUFlLElBQVk7UUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQzs7K0JBaEJBLEtBQUs7MEJBQ0wsS0FBSzswQkFDTCxLQUFLO3lCQUNMLEtBQUs7NkJBRUwsTUFBTTsrQkFDTixNQUFNOztJQVdYLHFDQUFDO0NBQUEsQUFuQkQsSUFtQkM7U0FuQlksOEJBQThCOzs7SUFFdkMsc0RBQXFDOztJQUNyQyxpREFBMkI7O0lBQzNCLGlEQUEyQjs7SUFDM0IsZ0RBQXdCOztJQUV4QixvREFBeUQ7O0lBQ3pELHNEQUFvRDs7SUFFcEQsbURBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcbmltcG9ydCB7IENsb2NrRmFjZVRpbWUgfSBmcm9tICcuLi8uLi9tb2RlbHMvY2xvY2stZmFjZS10aW1lLmludGVyZmFjZSc7XG5pbXBvcnQgeyBUaW1lcGlja2VyVGltZSB9IGZyb20gJy4uLy4uL3V0aWxzL3RpbWVwaWNrZXItdGltZS5uYW1lc3BhY2UnO1xuXG5cbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJIb3Vyc0ZhY2Uge1xuXG4gICAgQElucHV0KCkgc2VsZWN0ZWRIb3VyOiBDbG9ja0ZhY2VUaW1lO1xuICAgIEBJbnB1dCgpIG1pblRpbWU6IERhdGVUaW1lO1xuICAgIEBJbnB1dCgpIG1heFRpbWU6IERhdGVUaW1lO1xuICAgIEBJbnB1dCgpIGZvcm1hdDogbnVtYmVyO1xuXG4gICAgQE91dHB1dCgpIGhvdXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENsb2NrRmFjZVRpbWU+KCk7XG4gICAgQE91dHB1dCgpIGhvdXJTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgaG91cnNMaXN0OiBDbG9ja0ZhY2VUaW1lW10gPSBbXTtcblxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihmb3JtYXQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLmhvdXJzTGlzdCA9IFRpbWVwaWNrZXJUaW1lLmdldEhvdXJzKGZvcm1hdCk7XG4gICAgfVxuXG4gICAgb25UaW1lU2VsZWN0ZWQodGltZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaG91clNlbGVjdGVkLm5leHQodGltZSk7XG4gICAgfVxufVxuIl19