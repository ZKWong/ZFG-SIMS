/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EventEmitter, Input, Output } from '@angular/core';
import { DateTime } from 'luxon';
import { TimepickerTime } from '../../utils/timepicker-time.namespace';
export class NgxMaterialTimepickerHoursFace {
    /**
     * @protected
     * @param {?} format
     */
    constructor(format) {
        this.hourChange = new EventEmitter();
        this.hourSelected = new EventEmitter();
        this.hoursList = [];
        this.hoursList = TimepickerTime.getHours(format);
    }
    /**
     * @param {?} time
     * @return {?}
     */
    onTimeSelected(time) {
        this.hourSelected.next(time);
    }
}
NgxMaterialTimepickerHoursFace.propDecorators = {
    selectedHour: [{ type: Input }],
    minTime: [{ type: Input }],
    maxTime: [{ type: Input }],
    format: [{ type: Input }],
    hourChange: [{ type: Output }],
    hourSelected: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItaG91cnMtZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1ob3Vycy1mYWNlL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWhvdXJzLWZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRWpDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUd2RSxNQUFNLE9BQU8sOEJBQThCOzs7OztJQVl2QyxZQUFzQixNQUFjO1FBTDFCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUMvQyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFcEQsY0FBUyxHQUFvQixFQUFFLENBQUM7UUFHNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JELENBQUM7Ozs7O0lBRUQsY0FBYyxDQUFDLElBQVk7UUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQzs7OzJCQWhCQSxLQUFLO3NCQUNMLEtBQUs7c0JBQ0wsS0FBSztxQkFDTCxLQUFLO3lCQUVMLE1BQU07MkJBQ04sTUFBTTs7OztJQU5QLHNEQUFxQzs7SUFDckMsaURBQTJCOztJQUMzQixpREFBMkI7O0lBQzNCLGdEQUF3Qjs7SUFFeEIsb0RBQXlEOztJQUN6RCxzREFBb0Q7O0lBRXBELG1EQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XG5pbXBvcnQgeyBDbG9ja0ZhY2VUaW1lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Nsb2NrLWZhY2UtdGltZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVGltZXBpY2tlclRpbWUgfSBmcm9tICcuLi8uLi91dGlscy90aW1lcGlja2VyLXRpbWUubmFtZXNwYWNlJztcblxuXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VySG91cnNGYWNlIHtcblxuICAgIEBJbnB1dCgpIHNlbGVjdGVkSG91cjogQ2xvY2tGYWNlVGltZTtcbiAgICBASW5wdXQoKSBtaW5UaW1lOiBEYXRlVGltZTtcbiAgICBASW5wdXQoKSBtYXhUaW1lOiBEYXRlVGltZTtcbiAgICBASW5wdXQoKSBmb3JtYXQ6IG51bWJlcjtcblxuICAgIEBPdXRwdXQoKSBob3VyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDbG9ja0ZhY2VUaW1lPigpO1xuICAgIEBPdXRwdXQoKSBob3VyU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgIGhvdXJzTGlzdDogQ2xvY2tGYWNlVGltZVtdID0gW107XG5cbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoZm9ybWF0OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5ob3Vyc0xpc3QgPSBUaW1lcGlja2VyVGltZS5nZXRIb3Vycyhmb3JtYXQpO1xuICAgIH1cblxuICAgIG9uVGltZVNlbGVjdGVkKHRpbWU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmhvdXJTZWxlY3RlZC5uZXh0KHRpbWUpO1xuICAgIH1cbn1cbiJdfQ==