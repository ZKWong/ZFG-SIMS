/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { TimePeriod } from '../../models/time-period.enum';
import { TimeUnit } from '../../models/time-unit.enum';
import { TimepickerTime } from '../../utils/timepicker-time.namespace';
import { DateTime } from 'luxon';
export class NgxMaterialTimepickerDialComponent {
    constructor() {
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
    ngOnChanges(changes) {
        if (changes['period'] && changes['period'].currentValue
            || changes['format'] && changes['format'].currentValue) {
            /** @type {?} */
            const hours = TimepickerTime.getHours(this.format);
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
            const minutes = TimepickerTime.getMinutes(this.minutesGap);
            this.minutes = TimepickerTime.disableMinutes(minutes, +this.hour, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    }
    /**
     * @param {?} unit
     * @return {?}
     */
    changeTimeUnit(unit) {
        this.timeUnitChanged.next(unit);
    }
    /**
     * @param {?} period
     * @return {?}
     */
    changePeriod(period) {
        this.periodChanged.next(period);
    }
    /**
     * @param {?} hour
     * @return {?}
     */
    changeHour(hour) {
        this.hourChanged.next(hour);
    }
    /**
     * @param {?} minute
     * @return {?}
     */
    changeMinute(minute) {
        this.minuteChanged.next(minute);
    }
    /**
     * @return {?}
     */
    showHint() {
        this.isHintVisible = true;
    }
    /**
     * @return {?}
     */
    hideHint() {
        this.isHintVisible = false;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9jb21wb25lbnRzL3RpbWVwaWNrZXItZGlhbC9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1kaWFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZJLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRXZFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFRakMsTUFBTSxPQUFPLGtDQUFrQztJQU4vQztRQVFJLGFBQVEsR0FBRyxRQUFRLENBQUM7UUFrQlYsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO1FBQy9DLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVksQ0FBQztRQUMvQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBQ2hELGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7SUFrRGhFLENBQUM7Ozs7O0lBaERHLFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWTtlQUNoRCxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksRUFBRTs7a0JBQ2xELEtBQUssR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFFbEQsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRTtnQkFDNUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNqQixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2FBQ3RCLENBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVk7ZUFDaEQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEVBQUU7O2tCQUM5QyxPQUFPLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBRTFELElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUM5RCxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ2pCLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07YUFDdEIsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDOzs7OztJQUVELGNBQWMsQ0FBQyxJQUFjO1FBQ3pCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBRUQsWUFBWSxDQUFDLE1BQWtCO1FBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLElBQW1CO1FBQzFCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Ozs7O0lBRUQsWUFBWSxDQUFDLE1BQXFCO1FBQzlCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7SUFDOUIsQ0FBQzs7OztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztJQUMvQixDQUFDOzs7WUE5RUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw4QkFBOEI7Z0JBQ3hDLCtyRkFBMEQ7Z0JBRTFELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7OytCQVVJLEtBQUs7bUJBQ0wsS0FBSztxQkFDTCxLQUFLO3FCQUNMLEtBQUs7cUJBQ0wsS0FBSzs2QkFDTCxLQUFLO3NCQUNMLEtBQUs7c0JBQ0wsS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7NEJBRUwsTUFBTTs4QkFDTixNQUFNOzBCQUNOLE1BQU07NEJBQ04sTUFBTTs7OztJQXJCUCxzREFBb0I7O0lBRXBCLG1EQUF1Qjs7SUFDdkIscURBQXlCOztJQUV6QiwyREFBdUI7O0lBRXZCLDhEQUE2Qzs7SUFDN0Msa0RBQStCOztJQUMvQixvREFBaUM7O0lBQ2pDLG9EQUF3Qjs7SUFDeEIsb0RBQTRCOztJQUM1Qiw0REFBa0M7O0lBQ2xDLHFEQUEyQjs7SUFDM0IscURBQTJCOztJQUMzQix3REFBNkI7O0lBQzdCLHdEQUE0Qjs7SUFFNUIsMkRBQXlEOztJQUN6RCw2REFBeUQ7O0lBQ3pELHlEQUEwRDs7SUFDMUQsMkRBQTREIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaW1lUGVyaW9kIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3RpbWUtcGVyaW9kLmVudW0nO1xuaW1wb3J0IHsgVGltZVVuaXQgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZS11bml0LmVudW0nO1xuaW1wb3J0IHsgVGltZXBpY2tlclRpbWUgfSBmcm9tICcuLi8uLi91dGlscy90aW1lcGlja2VyLXRpbWUubmFtZXNwYWNlJztcbmltcG9ydCB7IENsb2NrRmFjZVRpbWUgfSBmcm9tICcuLi8uLi9tb2RlbHMvY2xvY2stZmFjZS10aW1lLmludGVyZmFjZSc7XG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1kaWFsJyxcbiAgICB0ZW1wbGF0ZVVybDogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLWRpYWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWyduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1kaWFsLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VyRGlhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICB0aW1lVW5pdCA9IFRpbWVVbml0O1xuXG4gICAgaG91cnM6IENsb2NrRmFjZVRpbWVbXTtcbiAgICBtaW51dGVzOiBDbG9ja0ZhY2VUaW1lW107XG5cbiAgICBpc0hpbnRWaXNpYmxlOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgZWRpdGFibGVIaW50VG1wbDogVGVtcGxhdGVSZWY8Tm9kZT47XG4gICAgQElucHV0KCkgaG91cjogbnVtYmVyIHwgc3RyaW5nO1xuICAgIEBJbnB1dCgpIG1pbnV0ZTogbnVtYmVyIHwgc3RyaW5nO1xuICAgIEBJbnB1dCgpIGZvcm1hdDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHBlcmlvZDogVGltZVBlcmlvZDtcbiAgICBASW5wdXQoKSBhY3RpdmVUaW1lVW5pdDogVGltZVVuaXQ7XG4gICAgQElucHV0KCkgbWluVGltZTogRGF0ZVRpbWU7XG4gICAgQElucHV0KCkgbWF4VGltZTogRGF0ZVRpbWU7XG4gICAgQElucHV0KCkgaXNFZGl0YWJsZTogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBtaW51dGVzR2FwOiBudW1iZXI7XG5cbiAgICBAT3V0cHV0KCkgcGVyaW9kQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VGltZVBlcmlvZD4oKTtcbiAgICBAT3V0cHV0KCkgdGltZVVuaXRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxUaW1lVW5pdD4oKTtcbiAgICBAT3V0cHV0KCkgaG91ckNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPENsb2NrRmFjZVRpbWU+KCk7XG4gICAgQE91dHB1dCgpIG1pbnV0ZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPENsb2NrRmFjZVRpbWU+KCk7XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzWydwZXJpb2QnXSAmJiBjaGFuZ2VzWydwZXJpb2QnXS5jdXJyZW50VmFsdWVcbiAgICAgICAgICAgIHx8IGNoYW5nZXNbJ2Zvcm1hdCddICYmIGNoYW5nZXNbJ2Zvcm1hdCddLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgaG91cnMgPSBUaW1lcGlja2VyVGltZS5nZXRIb3Vycyh0aGlzLmZvcm1hdCk7XG5cbiAgICAgICAgICAgIHRoaXMuaG91cnMgPSBUaW1lcGlja2VyVGltZS5kaXNhYmxlSG91cnMoaG91cnMsIHtcbiAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluVGltZSxcbiAgICAgICAgICAgICAgICBtYXg6IHRoaXMubWF4VGltZSxcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0LFxuICAgICAgICAgICAgICAgIHBlcmlvZDogdGhpcy5wZXJpb2RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydwZXJpb2QnXSAmJiBjaGFuZ2VzWydwZXJpb2QnXS5jdXJyZW50VmFsdWVcbiAgICAgICAgICAgIHx8IGNoYW5nZXNbJ2hvdXInXSAmJiBjaGFuZ2VzWydob3VyJ10uY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBtaW51dGVzID0gVGltZXBpY2tlclRpbWUuZ2V0TWludXRlcyh0aGlzLm1pbnV0ZXNHYXApO1xuXG4gICAgICAgICAgICB0aGlzLm1pbnV0ZXMgPSBUaW1lcGlja2VyVGltZS5kaXNhYmxlTWludXRlcyhtaW51dGVzLCArdGhpcy5ob3VyLCB7XG4gICAgICAgICAgICAgICAgbWluOiB0aGlzLm1pblRpbWUsXG4gICAgICAgICAgICAgICAgbWF4OiB0aGlzLm1heFRpbWUsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiB0aGlzLmZvcm1hdCxcbiAgICAgICAgICAgICAgICBwZXJpb2Q6IHRoaXMucGVyaW9kXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoYW5nZVRpbWVVbml0KHVuaXQ6IFRpbWVVbml0KTogdm9pZCB7XG4gICAgICAgIHRoaXMudGltZVVuaXRDaGFuZ2VkLm5leHQodW5pdCk7XG4gICAgfVxuXG4gICAgY2hhbmdlUGVyaW9kKHBlcmlvZDogVGltZVBlcmlvZCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBlcmlvZENoYW5nZWQubmV4dChwZXJpb2QpO1xuICAgIH1cblxuICAgIGNoYW5nZUhvdXIoaG91cjogQ2xvY2tGYWNlVGltZSk6IHZvaWQge1xuICAgICAgICB0aGlzLmhvdXJDaGFuZ2VkLm5leHQoaG91cik7XG4gICAgfVxuXG4gICAgY2hhbmdlTWludXRlKG1pbnV0ZTogQ2xvY2tGYWNlVGltZSk6IHZvaWQge1xuICAgICAgICB0aGlzLm1pbnV0ZUNoYW5nZWQubmV4dChtaW51dGUpO1xuICAgIH1cblxuICAgIHNob3dIaW50KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzSGludFZpc2libGUgPSB0cnVlO1xuICAgIH1cblxuICAgIGhpZGVIaW50KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzSGludFZpc2libGUgPSBmYWxzZTtcbiAgICB9XG59XG4iXX0=