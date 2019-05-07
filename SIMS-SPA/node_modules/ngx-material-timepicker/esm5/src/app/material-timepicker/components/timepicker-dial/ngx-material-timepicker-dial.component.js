/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { TimePeriod } from '../../models/time-period.enum';
import { TimeUnit } from '../../models/time-unit.enum';
import { TimepickerTime } from '../../utils/timepicker-time.namespace';
import { DateTime } from 'luxon';
var NgxMaterialTimepickerDialComponent = /** @class */ (function () {
    function NgxMaterialTimepickerDialComponent() {
        this.timeUnit = TimeUnit;
        this.periodChanged = new EventEmitter();
        this.timeUnitChanged = new EventEmitter();
        this.hourChanged = new EventEmitter();
        this.minuteChanged = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxMaterialTimepickerDialComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['period'] && changes['period'].currentValue
            || changes['format'] && changes['format'].currentValue) {
            /** @type {?} */
            var hours = TimepickerTime.getHours(this.format);
            this.hours = TimepickerTime.disableHours(hours, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
        if (changes['period'] && changes['period'].currentValue
            || changes['hour'] && changes['hour'].currentValue) {
            /** @type {?} */
            var minutes = TimepickerTime.getMinutes(this.minutesGap);
            this.minutes = TimepickerTime.disableMinutes(minutes, +this.hour, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    };
    /**
     * @param {?} unit
     * @return {?}
     */
    NgxMaterialTimepickerDialComponent.prototype.changeTimeUnit = /**
     * @param {?} unit
     * @return {?}
     */
    function (unit) {
        this.timeUnitChanged.next(unit);
    };
    /**
     * @param {?} period
     * @return {?}
     */
    NgxMaterialTimepickerDialComponent.prototype.changePeriod = /**
     * @param {?} period
     * @return {?}
     */
    function (period) {
        this.periodChanged.next(period);
    };
    /**
     * @param {?} hour
     * @return {?}
     */
    NgxMaterialTimepickerDialComponent.prototype.changeHour = /**
     * @param {?} hour
     * @return {?}
     */
    function (hour) {
        this.hourChanged.next(hour);
    };
    /**
     * @param {?} minute
     * @return {?}
     */
    NgxMaterialTimepickerDialComponent.prototype.changeMinute = /**
     * @param {?} minute
     * @return {?}
     */
    function (minute) {
        this.minuteChanged.next(minute);
    };
    /**
     * @return {?}
     */
    NgxMaterialTimepickerDialComponent.prototype.showHint = /**
     * @return {?}
     */
    function () {
        this.isHintVisible = true;
    };
    /**
     * @return {?}
     */
    NgxMaterialTimepickerDialComponent.prototype.hideHint = /**
     * @return {?}
     */
    function () {
        this.isHintVisible = false;
    };
    NgxMaterialTimepickerDialComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-material-timepicker-dial',
                    template: "<div class=\"timepicker-dial\">\n    <div class=\"timepicker-dial__container\">\n        <div class=\"timepicker-dial__time\">\n            <ngx-material-timepicker-dial-control [timeList]=\"hours\" [time]=\"hour\" [timeUnit]=\"timeUnit.HOUR\"\n                                                  [isActive]=\"activeTimeUnit === timeUnit.HOUR\"\n                                                  [isEditable]=\"isEditable\"\n                                                  (timeUnitChanged)=\"changeTimeUnit($event)\"\n                                                  (timeChanged)=\"changeHour($event)\"\n                                                  (focused)=\"showHint()\"\n                                                  (unfocused)=\"hideHint()\">\n\n            </ngx-material-timepicker-dial-control>\n            <span>:</span>\n            <ngx-material-timepicker-dial-control [timeList]=\"minutes\" [time]=\"minute\" [timeUnit]=\"timeUnit.MINUTE\"\n                                                  [isActive]=\"activeTimeUnit === timeUnit.MINUTE\"\n                                                  [isEditable]=\"isEditable\"\n                                                  [minutesGap]=\"minutesGap\"\n                                                  (timeUnitChanged)=\"changeTimeUnit($event)\"\n                                                  (timeChanged)=\"changeMinute($event)\"\n                                                  (focused)=\"showHint()\"\n                                                  (unfocused)=\"hideHint()\">\n\n            </ngx-material-timepicker-dial-control>\n        </div>\n        <ngx-material-timepicker-period class=\"timepicker-dial__period\"\n                                        [ngClass]=\"{'timepicker-dial__period--hidden': format === 24}\"\n                                        [selectedPeriod]=\"period\" [activeTimeUnit]=\"activeTimeUnit\"\n                                        [maxTime]=\"maxTime\" [minTime]=\"minTime\" [format]=\"format\"\n                                        [hours]=\"hours\" [minutes]=\"minutes\" [selectedHour]=\"hour\"\n                                        (periodChanged)=\"changePeriod($event)\"></ngx-material-timepicker-period>\n    </div>\n    <div *ngIf=\"isEditable\" [ngClass]=\"{'timepicker-dial__hint-container--hidden': !isHintVisible}\">\n        <!--suppress HtmlUnknownAttribute -->\n        <ng-container *ngTemplateOutlet=\"editableHintTmpl ? editableHintTmpl : editableHintDefault\"></ng-container>\n        <ng-template #editableHintDefault>\n            <small class=\"timepicker-dial__hint\"> * use arrows (<span>&#8645;</span>) to change the time</small>\n        </ng-template>\n    </div>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".timepicker-dial{text-align:right}.timepicker-dial__container{display:flex;align-items:center;justify-content:flex-end;-webkit-tap-highlight-color:transparent}.timepicker-dial__time{display:flex;align-items:baseline;line-height:normal;font-size:50px;color:rgba(255,255,255,.5);font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-dial__time{font-family:var(--primary-font-family);color:var(--dial-inactive-color)}}.timepicker-dial__period{display:block;margin-left:10px}.timepicker-dial__hint-container--hidden,.timepicker-dial__period--hidden{visibility:hidden}.timepicker-dial__hint{display:inline-block;font-size:10px;color:#fff}@supports (color:var(--dial-active-color)){.timepicker-dial__hint{color:var(--dial-active-color)}}.timepicker-dial__hint span{font-size:14px}@media (max-device-width:1023px) and (orientation:landscape){.timepicker-dial__container{flex-direction:column}.timepicker-dial__period{margin-left:0}}"]
                }] }
    ];
    NgxMaterialTimepickerDialComponent.propDecorators = {
        editableHintTmpl: [{ type: Input }],
        hour: [{ type: Input }],
        minute: [{ type: Input }],
        format: [{ type: Input }],
        period: [{ type: Input }],
        activeTimeUnit: [{ type: Input }],
        minTime: [{ type: Input }],
        maxTime: [{ type: Input }],
        isEditable: [{ type: Input }],
        minutesGap: [{ type: Input }],
        periodChanged: [{ type: Output }],
        timeUnitChanged: [{ type: Output }],
        hourChanged: [{ type: Output }],
        minuteChanged: [{ type: Output }]
    };
    return NgxMaterialTimepickerDialComponent;
}());
export { NgxMaterialTimepickerDialComponent };
if (false) {
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.timeUnit;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.hours;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.minutes;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.isHintVisible;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.editableHintTmpl;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.hour;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.minute;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.format;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.period;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.activeTimeUnit;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.minTime;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.maxTime;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.isEditable;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.minutesGap;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.periodChanged;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.timeUnitChanged;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.hourChanged;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.minuteChanged;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9jb21wb25lbnRzL3RpbWVwaWNrZXItZGlhbC9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1kaWFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZJLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRXZFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFakM7SUFBQTtRQVFJLGFBQVEsR0FBRyxRQUFRLENBQUM7UUFrQlYsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO1FBQy9DLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVksQ0FBQztRQUMvQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBQ2hELGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7SUFrRGhFLENBQUM7Ozs7O0lBaERHLHdEQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWTtlQUNoRCxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksRUFBRTs7Z0JBQ2xELEtBQUssR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFFbEQsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRTtnQkFDNUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNqQixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2FBQ3RCLENBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVk7ZUFDaEQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEVBQUU7O2dCQUM5QyxPQUFPLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBRTFELElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUM5RCxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ2pCLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07YUFDdEIsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDOzs7OztJQUVELDJEQUFjOzs7O0lBQWQsVUFBZSxJQUFjO1FBQ3pCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBRUQseURBQVk7Ozs7SUFBWixVQUFhLE1BQWtCO1FBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBRUQsdURBQVU7Ozs7SUFBVixVQUFXLElBQW1CO1FBQzFCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Ozs7O0lBRUQseURBQVk7Ozs7SUFBWixVQUFhLE1BQXFCO1FBQzlCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7SUFFRCxxREFBUTs7O0lBQVI7UUFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQscURBQVE7OztJQUFSO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7SUFDL0IsQ0FBQzs7Z0JBOUVKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsOEJBQThCO29CQUN4QywrckZBQTBEO29CQUUxRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2xEOzs7bUNBVUksS0FBSzt1QkFDTCxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSzt5QkFDTCxLQUFLO2lDQUNMLEtBQUs7MEJBQ0wsS0FBSzswQkFDTCxLQUFLOzZCQUNMLEtBQUs7NkJBQ0wsS0FBSztnQ0FFTCxNQUFNO2tDQUNOLE1BQU07OEJBQ04sTUFBTTtnQ0FDTixNQUFNOztJQWtEWCx5Q0FBQztDQUFBLEFBL0VELElBK0VDO1NBekVZLGtDQUFrQzs7O0lBRTNDLHNEQUFvQjs7SUFFcEIsbURBQXVCOztJQUN2QixxREFBeUI7O0lBRXpCLDJEQUF1Qjs7SUFFdkIsOERBQTZDOztJQUM3QyxrREFBK0I7O0lBQy9CLG9EQUFpQzs7SUFDakMsb0RBQXdCOztJQUN4QixvREFBNEI7O0lBQzVCLDREQUFrQzs7SUFDbEMscURBQTJCOztJQUMzQixxREFBMkI7O0lBQzNCLHdEQUE2Qjs7SUFDN0Isd0RBQTRCOztJQUU1QiwyREFBeUQ7O0lBQ3pELDZEQUF5RDs7SUFDekQseURBQTBEOztJQUMxRCwyREFBNEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcywgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRpbWVQZXJpb2QgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZS1wZXJpb2QuZW51bSc7XG5pbXBvcnQgeyBUaW1lVW5pdCB9IGZyb20gJy4uLy4uL21vZGVscy90aW1lLXVuaXQuZW51bSc7XG5pbXBvcnQgeyBUaW1lcGlja2VyVGltZSB9IGZyb20gJy4uLy4uL3V0aWxzL3RpbWVwaWNrZXItdGltZS5uYW1lc3BhY2UnO1xuaW1wb3J0IHsgQ2xvY2tGYWNlVGltZSB9IGZyb20gJy4uLy4uL21vZGVscy9jbG9jay1mYWNlLXRpbWUuaW50ZXJmYWNlJztcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLWRpYWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLWRpYWwuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJEaWFsQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAgIHRpbWVVbml0ID0gVGltZVVuaXQ7XG5cbiAgICBob3VyczogQ2xvY2tGYWNlVGltZVtdO1xuICAgIG1pbnV0ZXM6IENsb2NrRmFjZVRpbWVbXTtcblxuICAgIGlzSGludFZpc2libGU6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBlZGl0YWJsZUhpbnRUbXBsOiBUZW1wbGF0ZVJlZjxOb2RlPjtcbiAgICBASW5wdXQoKSBob3VyOiBudW1iZXIgfCBzdHJpbmc7XG4gICAgQElucHV0KCkgbWludXRlOiBudW1iZXIgfCBzdHJpbmc7XG4gICAgQElucHV0KCkgZm9ybWF0OiBudW1iZXI7XG4gICAgQElucHV0KCkgcGVyaW9kOiBUaW1lUGVyaW9kO1xuICAgIEBJbnB1dCgpIGFjdGl2ZVRpbWVVbml0OiBUaW1lVW5pdDtcbiAgICBASW5wdXQoKSBtaW5UaW1lOiBEYXRlVGltZTtcbiAgICBASW5wdXQoKSBtYXhUaW1lOiBEYXRlVGltZTtcbiAgICBASW5wdXQoKSBpc0VkaXRhYmxlOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIG1pbnV0ZXNHYXA6IG51bWJlcjtcblxuICAgIEBPdXRwdXQoKSBwZXJpb2RDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxUaW1lUGVyaW9kPigpO1xuICAgIEBPdXRwdXQoKSB0aW1lVW5pdENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFRpbWVVbml0PigpO1xuICAgIEBPdXRwdXQoKSBob3VyQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xvY2tGYWNlVGltZT4oKTtcbiAgICBAT3V0cHV0KCkgbWludXRlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xvY2tGYWNlVGltZT4oKTtcblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXNbJ3BlcmlvZCddICYmIGNoYW5nZXNbJ3BlcmlvZCddLmN1cnJlbnRWYWx1ZVxuICAgICAgICAgICAgfHwgY2hhbmdlc1snZm9ybWF0J10gJiYgY2hhbmdlc1snZm9ybWF0J10uY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBob3VycyA9IFRpbWVwaWNrZXJUaW1lLmdldEhvdXJzKHRoaXMuZm9ybWF0KTtcblxuICAgICAgICAgICAgdGhpcy5ob3VycyA9IFRpbWVwaWNrZXJUaW1lLmRpc2FibGVIb3Vycyhob3Vycywge1xuICAgICAgICAgICAgICAgIG1pbjogdGhpcy5taW5UaW1lLFxuICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXhUaW1lLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogdGhpcy5mb3JtYXQsXG4gICAgICAgICAgICAgICAgcGVyaW9kOiB0aGlzLnBlcmlvZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ3BlcmlvZCddICYmIGNoYW5nZXNbJ3BlcmlvZCddLmN1cnJlbnRWYWx1ZVxuICAgICAgICAgICAgfHwgY2hhbmdlc1snaG91ciddICYmIGNoYW5nZXNbJ2hvdXInXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IG1pbnV0ZXMgPSBUaW1lcGlja2VyVGltZS5nZXRNaW51dGVzKHRoaXMubWludXRlc0dhcCk7XG5cbiAgICAgICAgICAgIHRoaXMubWludXRlcyA9IFRpbWVwaWNrZXJUaW1lLmRpc2FibGVNaW51dGVzKG1pbnV0ZXMsICt0aGlzLmhvdXIsIHtcbiAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluVGltZSxcbiAgICAgICAgICAgICAgICBtYXg6IHRoaXMubWF4VGltZSxcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0LFxuICAgICAgICAgICAgICAgIHBlcmlvZDogdGhpcy5wZXJpb2RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hhbmdlVGltZVVuaXQodW5pdDogVGltZVVuaXQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aW1lVW5pdENoYW5nZWQubmV4dCh1bml0KTtcbiAgICB9XG5cbiAgICBjaGFuZ2VQZXJpb2QocGVyaW9kOiBUaW1lUGVyaW9kKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGVyaW9kQ2hhbmdlZC5uZXh0KHBlcmlvZCk7XG4gICAgfVxuXG4gICAgY2hhbmdlSG91cihob3VyOiBDbG9ja0ZhY2VUaW1lKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaG91ckNoYW5nZWQubmV4dChob3VyKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VNaW51dGUobWludXRlOiBDbG9ja0ZhY2VUaW1lKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWludXRlQ2hhbmdlZC5uZXh0KG1pbnV0ZSk7XG4gICAgfVxuXG4gICAgc2hvd0hpbnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNIaW50VmlzaWJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgaGlkZUhpbnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNIaW50VmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cbn1cbiJdfQ==