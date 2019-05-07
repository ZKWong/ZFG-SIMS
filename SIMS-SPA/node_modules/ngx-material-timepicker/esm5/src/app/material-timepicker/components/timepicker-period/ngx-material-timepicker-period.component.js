/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimePeriod } from '../../models/time-period.enum';
import { TimeUnit } from '../../models/time-unit.enum';
import { TimepickerTime } from '../../utils/timepicker-time.namespace';
import { animate, sequence, style, transition, trigger } from '@angular/animations';
import { DateTime } from 'luxon';
var NgxMaterialTimepickerPeriodComponent = /** @class */ (function () {
    function NgxMaterialTimepickerPeriodComponent() {
        this.timePeriod = TimePeriod;
        this.isPeriodAvailable = true;
        this.periodChanged = new EventEmitter();
    }
    /**
     * @param {?} period
     * @return {?}
     */
    NgxMaterialTimepickerPeriodComponent.prototype.changePeriod = /**
     * @param {?} period
     * @return {?}
     */
    function (period) {
        this.isPeriodAvailable = this.isSwitchPeriodAvailable(period);
        if (this.isPeriodAvailable) {
            this.periodChanged.next(period);
        }
    };
    /**
     * @return {?}
     */
    NgxMaterialTimepickerPeriodComponent.prototype.animationDone = /**
     * @return {?}
     */
    function () {
        this.isPeriodAvailable = true;
    };
    /**
     * @private
     * @param {?} period
     * @return {?}
     */
    NgxMaterialTimepickerPeriodComponent.prototype.isSwitchPeriodAvailable = /**
     * @private
     * @param {?} period
     * @return {?}
     */
    function (period) {
        /** @type {?} */
        var time = this.getDisabledTimeByPeriod(period);
        return !time.every(function (t) { return t.disabled; });
    };
    /**
     * @private
     * @param {?} period
     * @return {?}
     */
    NgxMaterialTimepickerPeriodComponent.prototype.getDisabledTimeByPeriod = /**
     * @private
     * @param {?} period
     * @return {?}
     */
    function (period) {
        switch (this.activeTimeUnit) {
            case TimeUnit.HOUR:
                return TimepickerTime.disableHours(this.hours, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period: period
                });
            case TimeUnit.MINUTE:
                return TimepickerTime.disableMinutes(this.minutes, +this.selectedHour, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period: period
                });
            default:
                throw new Error('no such TimeUnit');
        }
    };
    NgxMaterialTimepickerPeriodComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-material-timepicker-period',
                    template: "<div class=\"timepicker-period\">\n\t\t\t<button class=\"timepicker-dial__item timepicker-period__btn\"\n                  [ngClass]=\"{'timepicker-dial__item_active': selectedPeriod === timePeriod.AM}\"\n                  (click)=\"changePeriod(timePeriod.AM)\"\n                  type=\"button\">AM</button>\n    <button class=\"timepicker-dial__item timepicker-period__btn\"\n          [ngClass]=\"{'timepicker-dial__item_active': selectedPeriod === timePeriod.PM}\"\n          (click)=\"changePeriod(timePeriod.PM)\"\n          type=\"button\">PM</button>\n    <div class=\"timepicker-period__warning\" [@scaleInOut] (@scaleInOut.done)=\"animationDone()\" *ngIf=\"!isPeriodAvailable\">\n        <p>Current time would be invalid in this period.</p>\n    </div>\n</div>\n",
                    animations: [
                        trigger('scaleInOut', [
                            transition(':enter', [
                                style({ transform: 'scale(0)' }),
                                animate('.2s', style({ transform: 'scale(1)' })),
                                sequence([
                                    animate('3s', style({ opacity: 1 })),
                                    animate('.3s', style({ opacity: 0 }))
                                ])
                            ])
                        ])
                    ],
                    styles: [".timepicker-dial__item{cursor:pointer;color:rgba(255,255,255,.5);font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-dial__item{font-family:var(--primary-font-family);color:var(--dial-inactive-color)}}.timepicker-dial__item_active{color:#fff}@supports (color:var(--dial-active-color)){.timepicker-dial__item_active{color:var(--dial-active-color)}}.timepicker-period{display:flex;flex-direction:column;position:relative}.timepicker-period__btn{padding:1px 3px;border:0;background-color:transparent;font-size:18px;font-weight:500;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:0;border-radius:3px;transition:background-color .5s;font-family:Roboto,sans-serif}.timepicker-period__btn:focus{background-color:rgba(0,0,0,.07)}.timepicker-period__warning{padding:5px 10px;border-radius:3px;background-color:rgba(0,0,0,.55);color:#fff;position:absolute;width:200px;left:-20px;top:40px}.timepicker-period__warning>p{margin:0;font-size:12px;font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-period__btn,.timepicker-period__warning>p{font-family:var(--primary-font-family)}}"]
                }] }
    ];
    NgxMaterialTimepickerPeriodComponent.propDecorators = {
        selectedPeriod: [{ type: Input }],
        format: [{ type: Input }],
        activeTimeUnit: [{ type: Input }],
        hours: [{ type: Input }],
        minutes: [{ type: Input }],
        minTime: [{ type: Input }],
        maxTime: [{ type: Input }],
        selectedHour: [{ type: Input }],
        periodChanged: [{ type: Output }]
    };
    return NgxMaterialTimepickerPeriodComponent;
}());
export { NgxMaterialTimepickerPeriodComponent };
if (false) {
    /** @type {?} */
    NgxMaterialTimepickerPeriodComponent.prototype.timePeriod;
    /** @type {?} */
    NgxMaterialTimepickerPeriodComponent.prototype.isPeriodAvailable;
    /** @type {?} */
    NgxMaterialTimepickerPeriodComponent.prototype.selectedPeriod;
    /** @type {?} */
    NgxMaterialTimepickerPeriodComponent.prototype.format;
    /** @type {?} */
    NgxMaterialTimepickerPeriodComponent.prototype.activeTimeUnit;
    /** @type {?} */
    NgxMaterialTimepickerPeriodComponent.prototype.hours;
    /** @type {?} */
    NgxMaterialTimepickerPeriodComponent.prototype.minutes;
    /** @type {?} */
    NgxMaterialTimepickerPeriodComponent.prototype.minTime;
    /** @type {?} */
    NgxMaterialTimepickerPeriodComponent.prototype.maxTime;
    /** @type {?} */
    NgxMaterialTimepickerPeriodComponent.prototype.selectedHour;
    /** @type {?} */
    NgxMaterialTimepickerPeriodComponent.prototype.periodChanged;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItcGVyaW9kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1wZXJpb2Qvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItcGVyaW9kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFakM7SUFBQTtRQW1CSSxlQUFVLEdBQUcsVUFBVSxDQUFDO1FBQ3hCLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQVdmLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQWMsQ0FBQztJQXNDN0QsQ0FBQzs7Ozs7SUFwQ0csMkRBQVk7Ozs7SUFBWixVQUFhLE1BQWtCO1FBQzNCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbkM7SUFDTCxDQUFDOzs7O0lBRUQsNERBQWE7OztJQUFiO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztJQUNsQyxDQUFDOzs7Ozs7SUFFTyxzRUFBdUI7Ozs7O0lBQS9CLFVBQWdDLE1BQWtCOztZQUN4QyxJQUFJLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQztRQUNqRCxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLEVBQVYsQ0FBVSxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7Ozs7O0lBRU8sc0VBQXVCOzs7OztJQUEvQixVQUFnQyxNQUFrQjtRQUM5QyxRQUFRLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDekIsS0FBSyxRQUFRLENBQUMsSUFBSTtnQkFDZCxPQUFPLGNBQWMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDM0MsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNqQixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtvQkFDbkIsTUFBTSxRQUFBO2lCQUNULENBQUMsQ0FBQztZQUNQLEtBQUssUUFBUSxDQUFDLE1BQU07Z0JBQ2hCLE9BQU8sY0FBYyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDbkUsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNqQixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtvQkFDbkIsTUFBTSxRQUFBO2lCQUNULENBQUMsQ0FBQztZQUNQO2dCQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUMzQztJQUNMLENBQUM7O2dCQXBFSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGdDQUFnQztvQkFDMUMsaXhCQUE0RDtvQkFFNUQsVUFBVSxFQUFFO3dCQUNSLE9BQU8sQ0FBQyxZQUFZLEVBQUU7NEJBQ2xCLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0NBQ2pCLEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUMsQ0FBQztnQ0FDOUIsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztnQ0FDOUMsUUFBUSxDQUFDO29DQUNMLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7b0NBQ2xDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7aUNBQ3RDLENBQUM7NkJBQ0wsQ0FBQzt5QkFDTCxDQUFDO3FCQUNMOztpQkFDSjs7O2lDQU1JLEtBQUs7eUJBQ0wsS0FBSztpQ0FDTCxLQUFLO3dCQUNMLEtBQUs7MEJBQ0wsS0FBSzswQkFDTCxLQUFLOzBCQUNMLEtBQUs7K0JBQ0wsS0FBSztnQ0FFTCxNQUFNOztJQXNDWCwyQ0FBQztDQUFBLEFBckVELElBcUVDO1NBcERZLG9DQUFvQzs7O0lBRTdDLDBEQUF3Qjs7SUFDeEIsaUVBQXlCOztJQUV6Qiw4REFBb0M7O0lBQ3BDLHNEQUF3Qjs7SUFDeEIsOERBQWtDOztJQUNsQyxxREFBZ0M7O0lBQ2hDLHVEQUFrQzs7SUFDbEMsdURBQTJCOztJQUMzQix1REFBMkI7O0lBQzNCLDREQUF1Qzs7SUFFdkMsNkRBQXlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRpbWVQZXJpb2QgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZS1wZXJpb2QuZW51bSc7XG5pbXBvcnQgeyBUaW1lVW5pdCB9IGZyb20gJy4uLy4uL21vZGVscy90aW1lLXVuaXQuZW51bSc7XG5pbXBvcnQgeyBDbG9ja0ZhY2VUaW1lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Nsb2NrLWZhY2UtdGltZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVGltZXBpY2tlclRpbWUgfSBmcm9tICcuLi8uLi91dGlscy90aW1lcGlja2VyLXRpbWUubmFtZXNwYWNlJztcbmltcG9ydCB7IGFuaW1hdGUsIHNlcXVlbmNlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItcGVyaW9kJyxcbiAgICB0ZW1wbGF0ZVVybDogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLXBlcmlvZC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLXBlcmlvZC5jb21wb25lbnQuc2NzcyddLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignc2NhbGVJbk91dCcsIFtcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcbiAgICAgICAgICAgICAgICBzdHlsZSh7dHJhbnNmb3JtOiAnc2NhbGUoMCknfSksXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgnLjJzJywgc3R5bGUoe3RyYW5zZm9ybTogJ3NjYWxlKDEpJ30pKSxcbiAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGUoJzNzJywgc3R5bGUoe29wYWNpdHk6IDF9KSksXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGUoJy4zcycsIHN0eWxlKHtvcGFjaXR5OiAwfSkpXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJQZXJpb2RDb21wb25lbnQge1xuXG4gICAgdGltZVBlcmlvZCA9IFRpbWVQZXJpb2Q7XG4gICAgaXNQZXJpb2RBdmFpbGFibGUgPSB0cnVlO1xuXG4gICAgQElucHV0KCkgc2VsZWN0ZWRQZXJpb2Q6IFRpbWVQZXJpb2Q7XG4gICAgQElucHV0KCkgZm9ybWF0OiBudW1iZXI7XG4gICAgQElucHV0KCkgYWN0aXZlVGltZVVuaXQ6IFRpbWVVbml0O1xuICAgIEBJbnB1dCgpIGhvdXJzOiBDbG9ja0ZhY2VUaW1lW107XG4gICAgQElucHV0KCkgbWludXRlczogQ2xvY2tGYWNlVGltZVtdO1xuICAgIEBJbnB1dCgpIG1pblRpbWU6IERhdGVUaW1lO1xuICAgIEBJbnB1dCgpIG1heFRpbWU6IERhdGVUaW1lO1xuICAgIEBJbnB1dCgpIHNlbGVjdGVkSG91cjogbnVtYmVyIHwgc3RyaW5nO1xuXG4gICAgQE91dHB1dCgpIHBlcmlvZENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFRpbWVQZXJpb2Q+KCk7XG5cbiAgICBjaGFuZ2VQZXJpb2QocGVyaW9kOiBUaW1lUGVyaW9kKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNQZXJpb2RBdmFpbGFibGUgPSB0aGlzLmlzU3dpdGNoUGVyaW9kQXZhaWxhYmxlKHBlcmlvZCk7XG4gICAgICAgIGlmICh0aGlzLmlzUGVyaW9kQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnBlcmlvZENoYW5nZWQubmV4dChwZXJpb2QpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYW5pbWF0aW9uRG9uZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc1BlcmlvZEF2YWlsYWJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1N3aXRjaFBlcmlvZEF2YWlsYWJsZShwZXJpb2Q6IFRpbWVQZXJpb2QpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgdGltZSA9IHRoaXMuZ2V0RGlzYWJsZWRUaW1lQnlQZXJpb2QocGVyaW9kKTtcbiAgICAgICAgcmV0dXJuICF0aW1lLmV2ZXJ5KHQgPT4gdC5kaXNhYmxlZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREaXNhYmxlZFRpbWVCeVBlcmlvZChwZXJpb2Q6IFRpbWVQZXJpb2QpOiBDbG9ja0ZhY2VUaW1lW10ge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuYWN0aXZlVGltZVVuaXQpIHtcbiAgICAgICAgICAgIGNhc2UgVGltZVVuaXQuSE9VUjpcbiAgICAgICAgICAgICAgICByZXR1cm4gVGltZXBpY2tlclRpbWUuZGlzYWJsZUhvdXJzKHRoaXMuaG91cnMsIHtcbiAgICAgICAgICAgICAgICAgICAgbWluOiB0aGlzLm1pblRpbWUsXG4gICAgICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXhUaW1lLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0LFxuICAgICAgICAgICAgICAgICAgICBwZXJpb2RcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNhc2UgVGltZVVuaXQuTUlOVVRFOlxuICAgICAgICAgICAgICAgIHJldHVybiBUaW1lcGlja2VyVGltZS5kaXNhYmxlTWludXRlcyh0aGlzLm1pbnV0ZXMsICt0aGlzLnNlbGVjdGVkSG91ciwge1xuICAgICAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluVGltZSxcbiAgICAgICAgICAgICAgICAgICAgbWF4OiB0aGlzLm1heFRpbWUsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogdGhpcy5mb3JtYXQsXG4gICAgICAgICAgICAgICAgICAgIHBlcmlvZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIHN1Y2ggVGltZVVuaXQnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==