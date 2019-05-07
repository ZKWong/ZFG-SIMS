/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { merge } from 'rxjs';
import { NgxMaterialTimepickerService } from './services/ngx-material-timepicker.service';
import { TimeUnit } from './models/time-unit.enum';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgxMaterialTimepickerEventService } from './services/ngx-material-timepicker-event.service';
import { filter } from 'rxjs/operators';
/** @enum {string} */
const AnimationState = {
    ENTER: 'enter',
    LEAVE: 'leave',
};
export { AnimationState };
/** @type {?} */
const ESCAPE = 27;
export class NgxMaterialTimepickerComponent {
    /**
     * @param {?} timepickerService
     * @param {?} eventService
     */
    constructor(timepickerService, eventService) {
        this.timepickerService = timepickerService;
        this.eventService = eventService;
        this.timeUnit = TimeUnit;
        this.activeTimeUnit = TimeUnit.HOUR;
        this.isOpened = false;
        this.isEsc = true;
        this.timeSet = new EventEmitter();
        this.opened = new EventEmitter();
        this.closed = new EventEmitter();
        this.hourSelected = new EventEmitter();
        this.subscriptions = [];
        this.subscriptions.push(merge(this.eventService.backdropClick, this.eventService.keydownEvent.pipe(filter(e => e.keyCode === ESCAPE && this.isEsc)))
            .subscribe(() => this.close()));
    }
    /**
     * @param {?} gap
     * @return {?}
     */
    set minutesGap(gap) {
        if (gap == null) {
            return;
        }
        gap = Math.floor(gap);
        this._minutesGap = gap <= 59 ? gap : 1;
    }
    /**
     * @return {?}
     */
    get minutesGap() {
        return this._minutesGap;
    }
    /**
     * @param {?} time
     * @return {?}
     */
    set defaultTime(time) {
        this.setDefaultTime(time);
    }
    /**
     * @return {?}
     */
    get minTime() {
        return this.timepickerInput && this.timepickerInput.min;
    }
    /**
     * @return {?}
     */
    get maxTime() {
        return this.timepickerInput && this.timepickerInput.max;
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this.timepickerInput && this.timepickerInput.disabled;
    }
    /**
     * @return {?}
     */
    get format() {
        return this.timepickerInput && this.timepickerInput.format;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscriptions.push(this.timepickerService.selectedHour
            .subscribe(hour => this.selectedHour = hour));
        this.subscriptions.push(this.timepickerService.selectedMinute
            .subscribe(minute => this.selectedMinute = minute));
        this.subscriptions.push(this.timepickerService.selectedPeriod
            .subscribe(period => this.selectedPeriod = period));
    }
    /**
     *
     * Register an input with this timepicker.
     * input - The timepicker input to register with this timepicker
     * @param {?} input
     * @return {?}
     */
    registerInput(input) {
        if (this.timepickerInput) {
            throw Error('A Timepicker can only be associated with a single input.');
        }
        this.timepickerInput = input;
    }
    /**
     * @param {?} hour
     * @return {?}
     */
    onHourChange(hour) {
        this.timepickerService.hour = hour;
    }
    /**
     * @param {?} hour
     * @return {?}
     */
    onHourSelected(hour) {
        this.changeTimeUnit(TimeUnit.MINUTE);
        this.hourSelected.next(hour);
    }
    /**
     * @param {?} minute
     * @return {?}
     */
    onMinuteChange(minute) {
        this.timepickerService.minute = minute;
    }
    /**
     * @param {?} period
     * @return {?}
     */
    changePeriod(period) {
        this.timepickerService.period = period;
    }
    /**
     * @param {?} unit
     * @return {?}
     */
    changeTimeUnit(unit) {
        this.activeTimeUnit = unit;
    }
    /**
     * @return {?}
     */
    setTime() {
        this.timeSet.next(this.timepickerService.getFullTime(this.format));
        this.close();
    }
    /**
     * @param {?} time
     * @return {?}
     */
    setDefaultTime(time) {
        this.timepickerService.setDefaultTimeIfAvailable(time, (/** @type {?} */ (this.minTime)), (/** @type {?} */ (this.maxTime)), this.format, this.minutesGap);
    }
    /**
     * @return {?}
     */
    open() {
        this.isOpened = true;
        this.animationState = AnimationState.ENTER;
        this.opened.next();
    }
    /**
     * @return {?}
     */
    close() {
        this.animationState = AnimationState.LEAVE;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    animationDone(event) {
        if (event.phaseName === 'done' && event.toState === AnimationState.LEAVE) {
            this.isOpened = false;
            this.activeTimeUnit = TimeUnit.HOUR;
            this.closed.next();
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onKeydown(e) {
        this.eventService.dispatchEvent(e);
        e.stopPropagation();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
NgxMaterialTimepickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker',
                template: "<div class=\"timepicker-backdrop-overlay\" *ngIf=\"isOpened\" [overlay]=\"preventOverlayClick\"></div>\n<div class=\"timepicker-overlay\" *ngIf=\"isOpened\">\n    <div class=\"timepicker\" [@timepicker]=\"animationState\" (@timepicker.done)=\"animationDone($event)\" #timepicker>\n        <header class=\"timepicker__header\">\n            <ngx-material-timepicker-dial [format]=\"format\" [hour]=\"selectedHour?.time\"\n                                          [minute]=\"selectedMinute?.time\"\n                                          [period]=\"selectedPeriod\" [activeTimeUnit]=\"activeTimeUnit\"\n                                          [minTime]=\"minTime\" [maxTime]=\"maxTime\"\n                                          [isEditable]=\"enableKeyboardInput\"\n                                          [editableHintTmpl]=\"editableHintTmpl\"\n                                          [minutesGap]=\"minutesGap\"\n                                          (periodChanged)=\"changePeriod($event)\"\n                                          (timeUnitChanged)=\"changeTimeUnit($event)\"\n                                          (hourChanged)=\"onHourChange($event)\"\n                                          (minuteChanged)=\"onMinuteChange($event)\"\n            ></ngx-material-timepicker-dial>\n        </header>\n        <div class=\"timepicker__main-content\">\n            <div class=\"timepicker__body\" [ngSwitch]=\"activeTimeUnit\">\n                <div *ngSwitchCase=\"timeUnit.HOUR\">\n                    <ngx-material-timepicker-24-hours-face *ngIf=\"format === 24;else ampmHours\"\n                                                           (hourChange)=\"onHourChange($event)\"\n                                                           [selectedHour]=\"selectedHour\"\n                                                           [minTime]=\"minTime\"\n                                                           [maxTime]=\"maxTime\"\n                                                           [format]=\"format\"\n                                                           (hourSelected)=\"onHourSelected($event)\"></ngx-material-timepicker-24-hours-face>\n                    <ng-template #ampmHours>\n                        <ngx-material-timepicker-12-hours-face\n                            (hourChange)=\"onHourChange($event)\"\n                            [selectedHour]=\"selectedHour\"\n                            [period]=\"selectedPeriod\"\n                            [minTime]=\"minTime\"\n                            [maxTime]=\"maxTime\"\n                            (hourSelected)=\"onHourSelected($event)\"></ngx-material-timepicker-12-hours-face>\n                    </ng-template>\n                </div>\n                <ngx-material-timepicker-minutes-face *ngSwitchCase=\"timeUnit.MINUTE\"\n                                                      [selectedMinute]=\"selectedMinute\"\n                                                      [selectedHour]=\"selectedHour?.time\"\n                                                      [minTime]=\"minTime\"\n                                                      [maxTime]=\"maxTime\"\n                                                      [format]=\"format\"\n                                                      [period]=\"selectedPeriod\"\n                                                      [minutesGap]=\"minutesGap\"\n                                                      (minuteChange)=\"onMinuteChange($event)\"></ngx-material-timepicker-minutes-face>\n            </div>\n            <div class=\"timepicker__actions\">\n                <div (click)=\"close()\">\n                    <!--suppress HtmlUnknownAttribute -->\n                    <ng-container *ngTemplateOutlet=\"cancelBtnTmpl ? cancelBtnTmpl : cancelBtnDefault\"></ng-container>\n                </div>\n                <div (click)=\"setTime()\">\n                    <!--suppress HtmlUnknownAttribute -->\n                    <ng-container\n                        *ngTemplateOutlet=\"confirmBtnTmpl ? confirmBtnTmpl : confirmBtnDefault\"></ng-container>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<ng-template #cancelBtnDefault>\n    <ngx-material-timepicker-button>Cancel</ngx-material-timepicker-button>\n</ng-template>\n<ng-template #confirmBtnDefault>\n    <ngx-material-timepicker-button>Ok</ngx-material-timepicker-button>\n</ng-template>\n",
                animations: [
                    trigger('timepicker', [
                        transition(`* => ${AnimationState.ENTER}`, [
                            style({ transform: 'translateY(-30%)' }),
                            animate('0.2s ease-out', style({ transform: 'translateY(0)' }))
                        ]),
                        transition(`${AnimationState.ENTER} => ${AnimationState.LEAVE}`, [
                            style({ transform: 'translateY(0)', opacity: 1 }),
                            animate('0.2s ease-out', style({ transform: 'translateY(-30%)', opacity: 0 }))
                        ])
                    ])
                ],
                providers: [NgxMaterialTimepickerService],
                styles: [":host{--body-background-color:#fff;--primary-font-family:'Roboto',sans-serif;--button-color:deepskyblue;--dial-active-color:#fff;--dial-inactive-color:rgba(255, 255, 255, .5);--dial-background-color:deepskyblue;--clock-face-time-active-color:#fff;--clock-face-time-inactive-color:#6c6c6c;--clock-face-inner-time-inactive-color:#929292;--clock-face-time-disabled-color:#c5c5c5;--clock-face-background-color:#f0f0f0;--clock-hand-color:deepskyblue}.timepicker-backdrop-overlay{position:fixed;top:0;bottom:0;right:0;left:0;background-color:rgba(0,0,0,.3);z-index:999;pointer-events:auto}.timepicker-overlay{position:fixed;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;z-index:999;pointer-events:none}.timepicker{width:300px;border-radius:2px;box-shadow:rgba(0,0,0,.25) 0 14px 45px,rgba(0,0,0,.22) 0 10px 18px;outline:0;position:static;z-index:999;pointer-events:auto}.timepicker__header{padding:15px 30px;background-color:#00bfff}@supports (background-color:var(--dial-background-color)){.timepicker__header{background-color:var(--dial-background-color)}}.timepicker__body{padding:15px 5px;display:flex;justify-content:center;align-items:center;background-color:#fff}@supports (background-color:var(--body-background-color)){.timepicker__body{background-color:var(--body-background-color)}}.timepicker__actions{display:flex;justify-content:flex-end;padding:15px;background-color:#fff}@supports (background-color:var(--body-background-color)){.timepicker__actions{background-color:var(--body-background-color)}}@media (max-device-width:1023px) and (orientation:landscape){.timepicker{display:flex;width:515px}.timepicker__header{display:flex;align-items:center}.timepicker__main-content{display:flex;flex-direction:column;width:100%}.timepicker__actions{padding:5px;margin-top:-1px}}"]
            }] }
];
/** @nocollapse */
NgxMaterialTimepickerComponent.ctorParameters = () => [
    { type: NgxMaterialTimepickerService },
    { type: NgxMaterialTimepickerEventService }
];
NgxMaterialTimepickerComponent.propDecorators = {
    cancelBtnTmpl: [{ type: Input }],
    editableHintTmpl: [{ type: Input }],
    confirmBtnTmpl: [{ type: Input }],
    isEsc: [{ type: Input, args: ['ESC',] }],
    enableKeyboardInput: [{ type: Input }],
    preventOverlayClick: [{ type: Input }],
    minutesGap: [{ type: Input }],
    defaultTime: [{ type: Input }],
    timeSet: [{ type: Output }],
    opened: [{ type: Output }],
    closed: [{ type: Output }],
    hourSelected: [{ type: Output }],
    timepickerComponent: [{ type: ViewChild, args: ['timepickerww',] }],
    onKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.selectedHour;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.selectedMinute;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.selectedPeriod;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.timeUnit;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.activeTimeUnit;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.isOpened;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.animationState;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.cancelBtnTmpl;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.editableHintTmpl;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.confirmBtnTmpl;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.isEsc;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.enableKeyboardInput;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.preventOverlayClick;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.timeSet;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.opened;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.closed;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.hourSelected;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.timepickerComponent;
    /**
     * @type {?}
     * @private
     */
    NgxMaterialTimepickerComponent.prototype._minutesGap;
    /**
     * @type {?}
     * @private
     */
    NgxMaterialTimepickerComponent.prototype.timepickerInput;
    /**
     * @type {?}
     * @private
     */
    NgxMaterialTimepickerComponent.prototype.subscriptions;
    /**
     * @type {?}
     * @private
     */
    NgxMaterialTimepickerComponent.prototype.timepickerService;
    /**
     * @type {?}
     * @private
     */
    NgxMaterialTimepickerComponent.prototype.eventService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHNUksT0FBTyxFQUFFLEtBQUssRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDMUYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQWtCLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUYsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDckcsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7SUFLcEMsT0FBUSxPQUFPO0lBQ2YsT0FBUSxPQUFPOzs7O01BSWIsTUFBTSxHQUFHLEVBQUU7QUFvQmpCLE1BQU0sT0FBTyw4QkFBOEI7Ozs7O0lBZ0R2QyxZQUFvQixpQkFBK0MsRUFDL0MsWUFBK0M7UUFEL0Msc0JBQWlCLEdBQWpCLGlCQUFpQixDQUE4QjtRQUMvQyxpQkFBWSxHQUFaLFlBQVksQ0FBbUM7UUEzQ25FLGFBQVEsR0FBRyxRQUFRLENBQUM7UUFDcEIsbUJBQWMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBRS9CLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFNSCxVQUFLLEdBQUcsSUFBSSxD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QUUsRUFBRTs0QkFDN0QsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUM7NEJBQy9DLE9BQU8sQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO3lCQUMvRSxDQUFDO3FCQUNMLENBQUM7aUJBQ0w7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7O2FBQzVDOzs7O1lBakNRLDRCQUE0QjtZQUc1QixpQ0FBaUM7Ozs0QkEyQ3JDLEtBQUs7K0JBQ0wsS0FBSzs2QkFDTCxLQUFLO29CQUNMLEtBQUssU0FBQyxLQUFLO2tDQUNYLEtBQUs7a0NBQ0wsS0FBSzt5QkFFTCxLQUFLOzBCQWFMLEtBQUs7c0JBS0wsTUFBTTtxQkFDTixNQUFNO3FCQUNOLE1BQU07MkJBQ04sTUFBTTtrQ0FFTixTQUFTLFNBQUMsY0FBYzt3QkFzR3hCLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7SUE5SW5DLHNEQUE0Qjs7SUFDNUIsd0RBQThCOztJQUM5Qix3REFBMkI7O0lBRTNCLGtEQUFvQjs7SUFDcEIsd0RBQStCOztJQUUvQixrREFBaUI7O0lBQ2pCLHdEQUErQjs7SUFFL0IsdURBQTBDOztJQUMxQywwREFBNkM7O0lBQzdDLHdEQUEyQzs7SUFDM0MsK0NBQTJCOztJQUMzQiw2REFBc0M7O0lBQ3RDLDZEQUFzQzs7SUFvQnRDLGlEQUErQzs7SUFDL0MsZ0RBQTRDOztJQUM1QyxnREFBNEM7O0lBQzVDLHNEQUFvRDs7SUFFcEQsNkRBQTJEOzs7OztJQUUzRCxxREFBNEI7Ozs7O0lBQzVCLHlEQUE2Qzs7Ozs7SUFDN0MsdURBQTJDOzs7OztJQUUvQiwyREFBdUQ7Ozs7O0lBQ3ZELHNEQUF1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbG9ja0ZhY2VUaW1lIH0gZnJvbSAnLi9tb2RlbHMvY2xvY2stZmFjZS10aW1lLmludGVyZmFjZSc7XG5pbXBvcnQgeyBUaW1lUGVyaW9kIH0gZnJvbSAnLi9tb2RlbHMvdGltZS1wZXJpb2QuZW51bSc7XG5pbXBvcnQgeyBtZXJnZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci5zZXJ2aWNlJztcbmltcG9ydCB7IFRpbWVVbml0IH0gZnJvbSAnLi9tb2RlbHMvdGltZS11bml0LmVudW0nO1xuaW1wb3J0IHsgYW5pbWF0ZSwgQW5pbWF0aW9uRXZlbnQsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJFdmVudFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWV2ZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVGltZXBpY2tlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ3gtdGltZXBpY2tlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XG5cbmV4cG9ydCBlbnVtIEFuaW1hdGlvblN0YXRlIHtcbiAgICBFTlRFUiA9ICdlbnRlcicsXG4gICAgTEVBVkUgPSAnbGVhdmUnXG59XG5cblxuY29uc3QgRVNDQVBFID0gMjc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ3RpbWVwaWNrZXInLCBbXG4gICAgICAgICAgICB0cmFuc2l0aW9uKGAqID0+ICR7QW5pbWF0aW9uU3RhdGUuRU5URVJ9YCwgW1xuICAgICAgICAgICAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC0zMCUpJ30pLFxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJzAuMnMgZWFzZS1vdXQnLCBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKSd9KSlcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgdHJhbnNpdGlvbihgJHtBbmltYXRpb25TdGF0ZS5FTlRFUn0gPT4gJHtBbmltYXRpb25TdGF0ZS5MRUFWRX1gLCBbXG4gICAgICAgICAgICAgICAgc3R5bGUoe3RyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLCBvcGFjaXR5OiAxfSksXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgnMC4ycyBlYXNlLW91dCcsIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC0zMCUpJywgb3BhY2l0eTogMH0pKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW05neE1hdGVyaWFsVGltZXBpY2tlclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIHNlbGVjdGVkSG91cjogQ2xvY2tGYWNlVGltZTtcbiAgICBzZWxlY3RlZE1pbnV0ZTogQ2xvY2tGYWNlVGltZTtcbiAgICBzZWxlY3RlZFBlcmlvZDogVGltZVBlcmlvZDtcblxuICAgIHRpbWVVbml0ID0gVGltZVVuaXQ7XG4gICAgYWN0aXZlVGltZVVuaXQgPSBUaW1lVW5pdC5IT1VSO1xuXG4gICAgaXNPcGVuZWQgPSBmYWxzZTtcbiAgICBhbmltYXRpb25TdGF0ZTogQW5pbWF0aW9uU3RhdGU7XG5cbiAgICBASW5wdXQoKSBjYW5jZWxCdG5UbXBsOiBUZW1wbGF0ZVJlZjxOb2RlPjtcbiAgICBASW5wdXQoKSBlZGl0YWJsZUhpbnRUbXBsOiBUZW1wbGF0ZVJlZjxOb2RlPjtcbiAgICBASW5wdXQoKSBjb25maXJtQnRuVG1wbDogVGVtcGxhdGVSZWY8Tm9kZT47XG4gICAgQElucHV0KCdFU0MnKSBpc0VzYyA9IHRydWU7XG4gICAgQElucHV0KCkgZW5hYmxlS2V5Ym9hcmRJbnB1dDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBwcmV2ZW50T3ZlcmxheUNsaWNrOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgbWludXRlc0dhcChnYXA6IG51bWJlcikge1xuICAgICAgICBpZiAoZ2FwID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBnYXAgPSBNYXRoLmZsb29yKGdhcCk7XG4gICAgICAgIHRoaXMuX21pbnV0ZXNHYXAgPSBnYXAgPD0gNTkgPyBnYXAgOiAxO1xuICAgIH1cblxuICAgIGdldCBtaW51dGVzR2FwKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9taW51dGVzR2FwO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGRlZmF1bHRUaW1lKHRpbWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldERlZmF1bHRUaW1lKHRpbWUpO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKSB0aW1lU2V0ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gICAgQE91dHB1dCgpIG9wZW5lZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcbiAgICBAT3V0cHV0KCkgY2xvc2VkID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xuICAgIEBPdXRwdXQoKSBob3VyU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ3RpbWVwaWNrZXJ3dycpIHRpbWVwaWNrZXJDb21wb25lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgICBwcml2YXRlIF9taW51dGVzR2FwOiBudW1iZXI7XG4gICAgcHJpdmF0ZSB0aW1lcGlja2VySW5wdXQ6IFRpbWVwaWNrZXJEaXJlY3RpdmU7XG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0aW1lcGlja2VyU2VydmljZTogTmd4TWF0ZXJpYWxUaW1lcGlja2VyU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGV2ZW50U2VydmljZTogTmd4TWF0ZXJpYWxUaW1lcGlja2VyRXZlbnRTZXJ2aWNlKSB7XG5cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2gobWVyZ2UodGhpcy5ldmVudFNlcnZpY2UuYmFja2Ryb3BDbGljayxcbiAgICAgICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmtleWRvd25FdmVudC5waXBlKGZpbHRlcihlID0+IGUua2V5Q29kZSA9PT0gRVNDQVBFICYmIHRoaXMuaXNFc2MpKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKSk7XG5cbiAgICB9XG5cbiAgICBnZXQgbWluVGltZSgpOiBzdHJpbmcgfCBEYXRlVGltZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVwaWNrZXJJbnB1dCAmJiB0aGlzLnRpbWVwaWNrZXJJbnB1dC5taW47XG4gICAgfVxuXG4gICAgZ2V0IG1heFRpbWUoKTogc3RyaW5nIHwgRGF0ZVRpbWUge1xuICAgICAgICByZXR1cm4gdGhpcy50aW1lcGlja2VySW5wdXQgJiYgdGhpcy50aW1lcGlja2VySW5wdXQubWF4O1xuICAgIH1cblxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZXBpY2tlcklucHV0ICYmIHRoaXMudGltZXBpY2tlcklucHV0LmRpc2FibGVkO1xuICAgIH1cblxuICAgIGdldCBmb3JtYXQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZXBpY2tlcklucHV0ICYmIHRoaXMudGltZXBpY2tlcklucHV0LmZvcm1hdDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy50aW1lcGlja2VyU2VydmljZS5zZWxlY3RlZEhvdXJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoaG91ciA9PiB0aGlzLnNlbGVjdGVkSG91ciA9IGhvdXIpKTtcblxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLnNlbGVjdGVkTWludXRlXG4gICAgICAgICAgICAuc3Vic2NyaWJlKG1pbnV0ZSA9PiB0aGlzLnNlbGVjdGVkTWludXRlID0gbWludXRlKSk7XG5cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy50aW1lcGlja2VyU2VydmljZS5zZWxlY3RlZFBlcmlvZFxuICAgICAgICAgICAgLnN1YnNjcmliZShwZXJpb2QgPT4gdGhpcy5zZWxlY3RlZFBlcmlvZCA9IHBlcmlvZCkpO1xuICAgIH1cblxuICAgIC8qKipcbiAgICAgKiBSZWdpc3RlciBhbiBpbnB1dCB3aXRoIHRoaXMgdGltZXBpY2tlci5cbiAgICAgKiBpbnB1dCAtIFRoZSB0aW1lcGlja2VyIGlucHV0IHRvIHJlZ2lzdGVyIHdpdGggdGhpcyB0aW1lcGlja2VyXG4gICAgICovXG4gICAgcmVnaXN0ZXJJbnB1dChpbnB1dDogVGltZXBpY2tlckRpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50aW1lcGlja2VySW5wdXQpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdBIFRpbWVwaWNrZXIgY2FuIG9ubHkgYmUgYXNzb2NpYXRlZCB3aXRoIGEgc2luZ2xlIGlucHV0LicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGltZXBpY2tlcklucHV0ID0gaW5wdXQ7XG4gICAgfVxuXG4gICAgb25Ib3VyQ2hhbmdlKGhvdXI6IENsb2NrRmFjZVRpbWUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aW1lcGlja2VyU2VydmljZS5ob3VyID0gaG91cjtcbiAgICB9XG5cbiAgICBvbkhvdXJTZWxlY3RlZChob3VyOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VUaW1lVW5pdChUaW1lVW5pdC5NSU5VVEUpO1xuICAgICAgICB0aGlzLmhvdXJTZWxlY3RlZC5uZXh0KGhvdXIpO1xuICAgIH1cblxuICAgIG9uTWludXRlQ2hhbmdlKG1pbnV0ZTogQ2xvY2tGYWNlVGltZSk6IHZvaWQge1xuICAgICAgICB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLm1pbnV0ZSA9IG1pbnV0ZTtcbiAgICB9XG5cbiAgICBjaGFuZ2VQZXJpb2QocGVyaW9kOiBUaW1lUGVyaW9kKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGltZXBpY2tlclNlcnZpY2UucGVyaW9kID0gcGVyaW9kO1xuICAgIH1cblxuICAgIGNoYW5nZVRpbWVVbml0KHVuaXQ6IFRpbWVVbml0KTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWN0aXZlVGltZVVuaXQgPSB1bml0O1xuICAgIH1cblxuICAgIHNldFRpbWUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGltZVNldC5uZXh0KHRoaXMudGltZXBpY2tlclNlcnZpY2UuZ2V0RnVsbFRpbWUodGhpcy5mb3JtYXQpKTtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cblxuICAgIHNldERlZmF1bHRUaW1lKHRpbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLnNldERlZmF1bHRUaW1lSWZBdmFpbGFibGUoXG4gICAgICAgICAgICB0aW1lLCB0aGlzLm1pblRpbWUgYXMgRGF0ZVRpbWUsIHRoaXMubWF4VGltZSBhcyBEYXRlVGltZSwgdGhpcy5mb3JtYXQsIHRoaXMubWludXRlc0dhcCk7XG4gICAgfVxuXG4gICAgb3BlbigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc09wZW5lZCA9IHRydWU7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSBBbmltYXRpb25TdGF0ZS5FTlRFUjtcbiAgICAgICAgdGhpcy5vcGVuZWQubmV4dCgpO1xuICAgIH1cblxuICAgIGNsb3NlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gQW5pbWF0aW9uU3RhdGUuTEVBVkU7XG4gICAgfVxuXG4gICAgYW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKGV2ZW50LnBoYXNlTmFtZSA9PT0gJ2RvbmUnICYmIGV2ZW50LnRvU3RhdGUgPT09IEFuaW1hdGlvblN0YXRlLkxFQVZFKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbmVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVRpbWVVbml0ID0gVGltZVVuaXQuSE9VUjtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VkLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICAgIG9uS2V5ZG93bihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YnNjcmlwdGlvbiA9PiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKSk7XG4gICAgfVxufVxuIl19