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
export class NgxMaterialTimepickerPeriodComponent {
    constructor() {
        this.timePeriod = TimePeriod;
        this.isPeriodAvailable = true;
        this.periodChanged = new EventEmitter();
    }
    /**
     * @param {?} period
     * @return {?}
     */
    changePeriod(period) {
        this.isPeriodAvailable = this.isSwitchPeriodAvailable(period);
        if (this.isPeriodAvailable) {
            this.periodChanged.next(period);
        }
    }
    /**
     * @return {?}
     */
    animationDone() {
        this.isPeriodAvailable = true;
    }
    /**
     * @private
     * @param {?} period
     * @return {?}
     */
    isSwitchPeriodAvailable(period) {
        /** @type {?} */
        const time = this.getDisabledTimeByPeriod(period);
        return !time.every(t => t.disabled);
    }
    /**
     * @private
     * @param {?} period
     * @return {?}
     */
    getDisabledTimeByPeriod(period) {
        switch (this.activeTimeUnit) {
            case TimeUnit.HOUR:
                return TimepickerTime.disableHours(this.hours, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period
                });
            case TimeUnit.MINUTE:
                return TimepickerTime.disableMinutes(this.minutes, +this.selectedHour, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period
                });
            default:
                throw new Error('no such TimeUnit');
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItcGVyaW9kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1wZXJpb2Qvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItcGVyaW9kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFtQmpDLE1BQU0sT0FBTyxvQ0FBb0M7SUFqQmpEO1FBbUJJLGVBQVUsR0FBRyxVQUFVLENBQUM7UUFDeEIsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBV2Ysa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO0lBc0M3RCxDQUFDOzs7OztJQXBDRyxZQUFZLENBQUMsTUFBa0I7UUFDM0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5RCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNuQztJQUNMLENBQUM7Ozs7SUFFRCxhQUFhO1FBQ1QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztJQUNsQyxDQUFDOzs7Ozs7SUFFTyx1QkFBdUIsQ0FBQyxNQUFrQjs7Y0FDeEMsSUFBSSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUM7UUFDakQsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7Ozs7O0lBRU8sdUJBQXVCLENBQUMsTUFBa0I7UUFDOUMsUUFBUSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3pCLEtBQUssUUFBUSxDQUFDLElBQUk7Z0JBQ2QsT0FBTyxjQUFjLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQzNDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztvQkFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07b0JBQ25CLE1BQU07aUJBQ1QsQ0FBQyxDQUFDO1lBQ1AsS0FBSyxRQUFRLENBQUMsTUFBTTtnQkFDaEIsT0FBTyxjQUFjLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUNuRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQ2pCLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztvQkFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO29CQUNuQixNQUFNO2lCQUNULENBQUMsQ0FBQztZQUNQO2dCQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUMzQztJQUNMLENBQUM7OztZQXBFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGdDQUFnQztnQkFDMUMsaXhCQUE0RDtnQkFFNUQsVUFBVSxFQUFFO29CQUNSLE9BQU8sQ0FBQyxZQUFZLEVBQUU7d0JBQ2xCLFVBQVUsQ0FBQyxRQUFRLEVBQUU7NEJBQ2pCLEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUMsQ0FBQzs0QkFDOUIsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQzs0QkFDOUMsUUFBUSxDQUFDO2dDQUNMLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7Z0NBQ2xDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7NkJBQ3RDLENBQUM7eUJBQ0wsQ0FBQztxQkFDTCxDQUFDO2lCQUNMOzthQUNKOzs7NkJBTUksS0FBSztxQkFDTCxLQUFLOzZCQUNMLEtBQUs7b0JBQ0wsS0FBSztzQkFDTCxLQUFLO3NCQUNMLEtBQUs7c0JBQ0wsS0FBSzsyQkFDTCxLQUFLOzRCQUVMLE1BQU07Ozs7SUFaUCwwREFBd0I7O0lBQ3hCLGlFQUF5Qjs7SUFFekIsOERBQW9DOztJQUNwQyxzREFBd0I7O0lBQ3hCLDhEQUFrQzs7SUFDbEMscURBQWdDOztJQUNoQyx1REFBa0M7O0lBQ2xDLHVEQUEyQjs7SUFDM0IsdURBQTJCOztJQUMzQiw0REFBdUM7O0lBRXZDLDZEQUF5RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaW1lUGVyaW9kIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3RpbWUtcGVyaW9kLmVudW0nO1xuaW1wb3J0IHsgVGltZVVuaXQgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZS11bml0LmVudW0nO1xuaW1wb3J0IHsgQ2xvY2tGYWNlVGltZSB9IGZyb20gJy4uLy4uL21vZGVscy9jbG9jay1mYWNlLXRpbWUuaW50ZXJmYWNlJztcbmltcG9ydCB7IFRpbWVwaWNrZXJUaW1lIH0gZnJvbSAnLi4vLi4vdXRpbHMvdGltZXBpY2tlci10aW1lLm5hbWVzcGFjZSc7XG5pbXBvcnQgeyBhbmltYXRlLCBzZXF1ZW5jZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLXBlcmlvZCcsXG4gICAgdGVtcGxhdGVVcmw6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1wZXJpb2QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWyduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1wZXJpb2QuY29tcG9uZW50LnNjc3MnXSxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ3NjYWxlSW5PdXQnLCBbXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXG4gICAgICAgICAgICAgICAgc3R5bGUoe3RyYW5zZm9ybTogJ3NjYWxlKDApJ30pLFxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJy4ycycsIHN0eWxlKHt0cmFuc2Zvcm06ICdzY2FsZSgxKSd9KSksXG4gICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRlKCczcycsIHN0eWxlKHtvcGFjaXR5OiAxfSkpLFxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlKCcuM3MnLCBzdHlsZSh7b3BhY2l0eTogMH0pKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VyUGVyaW9kQ29tcG9uZW50IHtcblxuICAgIHRpbWVQZXJpb2QgPSBUaW1lUGVyaW9kO1xuICAgIGlzUGVyaW9kQXZhaWxhYmxlID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHNlbGVjdGVkUGVyaW9kOiBUaW1lUGVyaW9kO1xuICAgIEBJbnB1dCgpIGZvcm1hdDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIGFjdGl2ZVRpbWVVbml0OiBUaW1lVW5pdDtcbiAgICBASW5wdXQoKSBob3VyczogQ2xvY2tGYWNlVGltZVtdO1xuICAgIEBJbnB1dCgpIG1pbnV0ZXM6IENsb2NrRmFjZVRpbWVbXTtcbiAgICBASW5wdXQoKSBtaW5UaW1lOiBEYXRlVGltZTtcbiAgICBASW5wdXQoKSBtYXhUaW1lOiBEYXRlVGltZTtcbiAgICBASW5wdXQoKSBzZWxlY3RlZEhvdXI6IG51bWJlciB8IHN0cmluZztcblxuICAgIEBPdXRwdXQoKSBwZXJpb2RDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxUaW1lUGVyaW9kPigpO1xuXG4gICAgY2hhbmdlUGVyaW9kKHBlcmlvZDogVGltZVBlcmlvZCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzUGVyaW9kQXZhaWxhYmxlID0gdGhpcy5pc1N3aXRjaFBlcmlvZEF2YWlsYWJsZShwZXJpb2QpO1xuICAgICAgICBpZiAodGhpcy5pc1BlcmlvZEF2YWlsYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5wZXJpb2RDaGFuZ2VkLm5leHQocGVyaW9kKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFuaW1hdGlvbkRvbmUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNQZXJpb2RBdmFpbGFibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNTd2l0Y2hQZXJpb2RBdmFpbGFibGUocGVyaW9kOiBUaW1lUGVyaW9kKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLmdldERpc2FibGVkVGltZUJ5UGVyaW9kKHBlcmlvZCk7XG4gICAgICAgIHJldHVybiAhdGltZS5ldmVyeSh0ID0+IHQuZGlzYWJsZWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGlzYWJsZWRUaW1lQnlQZXJpb2QocGVyaW9kOiBUaW1lUGVyaW9kKTogQ2xvY2tGYWNlVGltZVtdIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmFjdGl2ZVRpbWVVbml0KSB7XG4gICAgICAgICAgICBjYXNlIFRpbWVVbml0LkhPVVI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFRpbWVwaWNrZXJUaW1lLmRpc2FibGVIb3Vycyh0aGlzLmhvdXJzLCB7XG4gICAgICAgICAgICAgICAgICAgIG1pbjogdGhpcy5taW5UaW1lLFxuICAgICAgICAgICAgICAgICAgICBtYXg6IHRoaXMubWF4VGltZSxcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiB0aGlzLmZvcm1hdCxcbiAgICAgICAgICAgICAgICAgICAgcGVyaW9kXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjYXNlIFRpbWVVbml0Lk1JTlVURTpcbiAgICAgICAgICAgICAgICByZXR1cm4gVGltZXBpY2tlclRpbWUuZGlzYWJsZU1pbnV0ZXModGhpcy5taW51dGVzLCArdGhpcy5zZWxlY3RlZEhvdXIsIHtcbiAgICAgICAgICAgICAgICAgICAgbWluOiB0aGlzLm1pblRpbWUsXG4gICAgICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXhUaW1lLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0LFxuICAgICAgICAgICAgICAgICAgICBwZXJpb2RcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBzdWNoIFRpbWVVbml0Jyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=