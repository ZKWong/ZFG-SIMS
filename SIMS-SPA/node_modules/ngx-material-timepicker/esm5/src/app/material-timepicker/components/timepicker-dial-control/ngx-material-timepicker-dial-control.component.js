/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable:triple-equals */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeUnit } from '../../models/time-unit.enum';
import { TimeFormatterPipe } from '../../pipes/time-formatter.pipe';
var NgxMaterialTimepickerDialControlComponent = /** @class */ (function () {
    function NgxMaterialTimepickerDialControlComponent() {
        this.timeUnitChanged = new EventEmitter();
        this.timeChanged = new EventEmitter();
        this.focused = new EventEmitter();
        this.unfocused = new EventEmitter();
    }
    Object.defineProperty(NgxMaterialTimepickerDialControlComponent.prototype, "selectedTime", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (!!this.time) {
                return this.timeList.find(function (t) { return t.time === +_this.time; });
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxMaterialTimepickerDialControlComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['time'] && (changes['time'].currentValue !== undefined)) {
            if (this.isEditable && !changes['time'].firstChange) {
                return;
            }
            this.time = new TimeFormatterPipe().transform(+changes['time'].currentValue, this.timeUnit);
        }
    };
    /**
     * @param {?} event
     * @param {?} unit
     * @return {?}
     */
    NgxMaterialTimepickerDialControlComponent.prototype.saveTimeAndChangeTimeUnit = /**
     * @param {?} event
     * @param {?} unit
     * @return {?}
     */
    function (event, unit) {
        event.preventDefault();
        this.previousTime = this.time;
        this.timeUnitChanged.next(unit);
        this.focused.next();
    };
    /**
     * @return {?}
     */
    NgxMaterialTimepickerDialControlComponent.prototype.updateTime = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var time = this.selectedTime;
        if (time) {
            this.timeChanged.next(time);
            this.previousTime = time.time;
        }
    };
    /**
     * @return {?}
     */
    NgxMaterialTimepickerDialControlComponent.prototype.formatTime = /**
     * @return {?}
     */
    function () {
        if (this.isEditable) {
            /** @type {?} */
            var time = this.time || this.previousTime;
            this.time = new TimeFormatterPipe().transform(+time, this.timeUnit);
            this.unfocused.next();
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgxMaterialTimepickerDialControlComponent.prototype.onKeyDown = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var char = String.fromCharCode(e.keyCode);
        if ((!isInputAllowed(e)) || isTimeDisabledToChange(this.time, char, this.timeList)) {
            e.preventDefault();
        }
        if (isInputAllowed(e)) {
            this.changeTimeByArrow(e.keyCode);
        }
    };
    /**
     * @private
     * @param {?} keyCode
     * @return {?}
     */
    NgxMaterialTimepickerDialControlComponent.prototype.changeTimeByArrow = /**
     * @private
     * @param {?} keyCode
     * @return {?}
     */
    function (keyCode) {
        /** @type {?} */
        var ARROW_UP = 38;
        /** @type {?} */
        var ARROW_DOWN = 40;
        /** @type {?} */
        var time;
        if (keyCode === ARROW_UP) {
            time = String(+this.time + (this.minutesGap || 1));
        }
        else if (keyCode === ARROW_DOWN) {
            time = String(+this.time - (this.minutesGap || 1));
        }
        if (!isTimeUnavailable(time, this.timeList)) {
            this.time = time;
            this.updateTime();
        }
    };
    NgxMaterialTimepickerDialControlComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-material-timepicker-dial-control',
                    template: "<!--suppress HtmlFormInputWithoutLabel -->\n<input class=\"timepicker-dial__control timepicker-dial__item\"\n       [ngClass]=\"{'timepicker-dial__item_active': isActive, 'timepicker-dial__control_editable': isEditable}\"\n       [(ngModel)]=\"time\" (input)=\"updateTime()\" (focus)=\"saveTimeAndChangeTimeUnit($event, timeUnit)\"\n       (blur)=\"formatTime()\" [readonly]=\"!isEditable\" [timepickerAutofocus]=\"isActive\" (keydown)=\"onKeyDown($event)\">\n",
                    styles: [".timepicker-dial__item{cursor:pointer;color:rgba(255,255,255,.5);font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-dial__item{font-family:var(--primary-font-family);color:var(--dial-inactive-color)}}.timepicker-dial__item_active{color:#fff}@supports (color:var(--dial-active-color)){.timepicker-dial__item_active{color:var(--dial-active-color)}}.timepicker-dial__control{border:none;background-color:transparent;font-size:50px;width:60px;padding:0;border-radius:3px}.timepicker-dial__control_editable:focus{color:#00bfff;background-color:#fff;outline:#00bfff}"]
                }] }
    ];
    NgxMaterialTimepickerDialControlComponent.propDecorators = {
        timeList: [{ type: Input }],
        timeUnit: [{ type: Input }],
        time: [{ type: Input }],
        isActive: [{ type: Input }],
        isEditable: [{ type: Input }],
        minutesGap: [{ type: Input }],
        timeUnitChanged: [{ type: Output }],
        timeChanged: [{ type: Output }],
        focused: [{ type: Output }],
        unfocused: [{ type: Output }]
    };
    return NgxMaterialTimepickerDialControlComponent;
}());
export { NgxMaterialTimepickerDialControlComponent };
if (false) {
    /** @type {?} */
    NgxMaterialTimepickerDialControlComponent.prototype.previousTime;
    /** @type {?} */
    NgxMaterialTimepickerDialControlComponent.prototype.timeList;
    /** @type {?} */
    NgxMaterialTimepickerDialControlComponent.prototype.timeUnit;
    /** @type {?} */
    NgxMaterialTimepickerDialControlComponent.prototype.time;
    /** @type {?} */
    NgxMaterialTimepickerDialControlComponent.prototype.isActive;
    /** @type {?} */
    NgxMaterialTimepickerDialControlComponent.prototype.isEditable;
    /** @type {?} */
    NgxMaterialTimepickerDialControlComponent.prototype.minutesGap;
    /** @type {?} */
    NgxMaterialTimepickerDialControlComponent.prototype.timeUnitChanged;
    /** @type {?} */
    NgxMaterialTimepickerDialControlComponent.prototype.timeChanged;
    /** @type {?} */
    NgxMaterialTimepickerDialControlComponent.prototype.focused;
    /** @type {?} */
    NgxMaterialTimepickerDialControlComponent.prototype.unfocused;
}
/**
 * @param {?} e
 * @return {?}
 */
function isInputAllowed(e) {
    // Allow: backspace, delete, tab, escape, enter
    if ([46, 8, 9, 27, 13].some(function (n) { return n === e.keyCode; }) ||
        // Allow: Ctrl/cmd+A
        (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+C
        (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+X
        (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right, up, down
        (e.keyCode >= 35 && e.keyCode <= 40)) {
        return true;
    }
    return !((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105));
}
/**
 * @param {?} currentTime
 * @param {?} nextTime
 * @param {?} timeList
 * @return {?}
 */
function isTimeDisabledToChange(currentTime, nextTime, timeList) {
    /** @type {?} */
    var isNumber = /\d/.test(nextTime);
    if (isNumber) {
        /** @type {?} */
        var time = currentTime + nextTime;
        return isTimeUnavailable(time, timeList);
    }
}
/**
 * @param {?} time
 * @param {?} timeList
 * @return {?}
 */
function isTimeUnavailable(time, timeList) {
    /** @type {?} */
    var selectedTime = timeList.find(function (value) { return value.time === +time; });
    return !selectedTime || (selectedTime && selectedTime.disabled);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC1jb250cm9sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1kaWFsLWNvbnRyb2wvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC1jb250cm9sLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRWpHLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVwRTtJQUFBO1FBZ0JjLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVksQ0FBQztRQUMvQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBQ2hELFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ25DLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBc0VuRCxDQUFDO0lBcEVHLHNCQUFZLG1FQUFZOzs7OztRQUF4QjtZQUFBLGlCQUlDO1lBSEcsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDYixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQXJCLENBQXFCLENBQUMsQ0FBQzthQUN6RDtRQUNMLENBQUM7OztPQUFBOzs7OztJQUVELCtEQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFD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QUFDLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQy9ELDBDQUEwQztRQUMxQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLEVBQUU7UUFFdEMsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUNELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN4RixDQUFDOzs7Ozs7O0FBRUQsU0FBUyxzQkFBc0IsQ0FBQyxXQUFtQixFQUFFLFFBQWdCLEVBQUUsUUFBeUI7O1FBQ3RGLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUVwQyxJQUFJLFFBQVEsRUFBRTs7WUFDSixJQUFJLEdBQUcsV0FBVyxHQUFHLFFBQVE7UUFDbkMsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDNUM7QUFDTCxDQUFDOzs7Ozs7QUFFRCxTQUFTLGlCQUFpQixDQUFDLElBQVksRUFBRSxRQUF5Qjs7UUFDeEQsWUFBWSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFwQixDQUFvQixDQUFDO0lBQ2pFLE9BQU8sQ0FBQyxZQUFZLElBQUksQ0FBQyxZQUFZLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3BFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZTp0cmlwbGUtZXF1YWxzICovXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbG9ja0ZhY2VUaW1lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Nsb2NrLWZhY2UtdGltZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVGltZVVuaXQgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZS11bml0LmVudW0nO1xuaW1wb3J0IHsgVGltZUZvcm1hdHRlclBpcGUgfSBmcm9tICcuLi8uLi9waXBlcy90aW1lLWZvcm1hdHRlci5waXBlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1kaWFsLWNvbnRyb2wnLFxuICAgIHRlbXBsYXRlVXJsOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC1jb250cm9sLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC1jb250cm9sLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VyRGlhbENvbnRyb2xDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgcHJldmlvdXNUaW1lOiBudW1iZXIgfCBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSB0aW1lTGlzdDogQ2xvY2tGYWNlVGltZVtdO1xuICAgIEBJbnB1dCgpIHRpbWVVbml0OiBUaW1lVW5pdDtcbiAgICBASW5wdXQoKSB0aW1lOiBzdHJpbmc7XG4gICAgQElucHV0KCkgaXNBY3RpdmU6IGJvb2xlYW47XG4gICAgQElucHV0KCkgaXNFZGl0YWJsZTogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBtaW51dGVzR2FwOiBudW1iZXI7XG5cbiAgICBAT3V0cHV0KCkgdGltZVVuaXRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxUaW1lVW5pdD4oKTtcbiAgICBAT3V0cHV0KCkgdGltZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPENsb2NrRmFjZVRpbWU+KCk7XG4gICAgQE91dHB1dCgpIGZvY3VzZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bGw+KCk7XG4gICAgQE91dHB1dCgpIHVuZm9jdXNlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcblxuICAgIHByaXZhdGUgZ2V0IHNlbGVjdGVkVGltZSgpOiBDbG9ja0ZhY2VUaW1lIHtcbiAgICAgICAgaWYgKCEhdGhpcy50aW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50aW1lTGlzdC5maW5kKHQgPT4gdC50aW1lID09PSArdGhpcy50aW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXNbJ3RpbWUnXSAmJiAoY2hhbmdlc1sndGltZSddLmN1cnJlbnRWYWx1ZSAhPT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNFZGl0YWJsZSAmJiAhY2hhbmdlc1sndGltZSddLmZpcnN0Q2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy50aW1lID0gbmV3IFRpbWVGb3JtYXR0ZXJQaXBlKCkudHJhbnNmb3JtKCtjaGFuZ2VzWyd0aW1lJ10uY3VycmVudFZhbHVlLCB0aGlzLnRpbWVVbml0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNhdmVUaW1lQW5kQ2hhbmdlVGltZVVuaXQoZXZlbnQ6IEZvY3VzRXZlbnQsIHVuaXQ6IFRpbWVVbml0KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMucHJldmlvdXNUaW1lID0gdGhpcy50aW1lO1xuICAgICAgICB0aGlzLnRpbWVVbml0Q2hhbmdlZC5uZXh0KHVuaXQpO1xuICAgICAgICB0aGlzLmZvY3VzZWQubmV4dCgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVRpbWUoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLnNlbGVjdGVkVGltZTtcbiAgICAgICAgaWYgKHRpbWUpIHtcbiAgICAgICAgICAgIHRoaXMudGltZUNoYW5nZWQubmV4dCh0aW1lKTtcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNUaW1lID0gdGltZS50aW1lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9ybWF0VGltZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFZGl0YWJsZSkge1xuICAgICAgICAgICAgY29uc3QgdGltZSA9IHRoaXMudGltZSB8fCB0aGlzLnByZXZpb3VzVGltZTtcbiAgICAgICAgICAgIHRoaXMudGltZSA9IG5ldyBUaW1lRm9ybWF0dGVyUGlwZSgpLnRyYW5zZm9ybSgrdGltZSwgdGhpcy50aW1lVW5pdCk7XG4gICAgICAgICAgICB0aGlzLnVuZm9jdXNlZC5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleURvd24oZTogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLmtleUNvZGUpO1xuXG5cbiAgICAgICAgaWYgKCghaXNJbnB1dEFsbG93ZWQoZSkpIHx8IGlzVGltZURpc2FibGVkVG9DaGFuZ2UodGhpcy50aW1lLCBjaGFyLCB0aGlzLnRpbWVMaXN0KSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzSW5wdXRBbGxvd2VkKGUpKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRpbWVCeUFycm93KGUua2V5Q29kZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZVRpbWVCeUFycm93KGtleUNvZGU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCBBUlJPV19VUCA9IDM4O1xuICAgICAgICBjb25zdCBBUlJPV19ET1dOID0gNDA7XG4gICAgICAgIGxldCB0aW1lOiBzdHJpbmc7XG5cbiAgICAgICAgaWYgKGtleUNvZGUgPT09IEFSUk9XX1VQKSB7XG4gICAgICAgICAgICB0aW1lID0gU3RyaW5nKCt0aGlzLnRpbWUgKyAodGhpcy5taW51dGVzR2FwIHx8IDEpKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBBUlJPV19ET1dOKSB7XG4gICAgICAgICAgICB0aW1lID0gU3RyaW5nKCt0aGlzLnRpbWUgLSAodGhpcy5taW51dGVzR2FwIHx8IDEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNUaW1lVW5hdmFpbGFibGUodGltZSwgdGhpcy50aW1lTGlzdCkpIHtcbiAgICAgICAgICAgIHRoaXMudGltZSA9IHRpbWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRpbWUoKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5mdW5jdGlvbiBpc0lucHV0QWxsb3dlZChlOiBLZXlib2FyZEV2ZW50KTogYm9vbGVhbiB7XG4gICAgLy8gQWxsb3c6IGJhY2tzcGFjZSwgZGVsZXRlLCB0YWIsIGVzY2FwZSwgZW50ZXJcbiAgICBpZiAoWzQ2LCA4LCA5LCAyNywgMTNdLnNvbWUobiA9PiBuID09PSBlLmtleUNvZGUpIHx8XG4gICAgICAgIC8vIEFsbG93OiBDdHJsL2NtZCtBXG4gICAgICAgIChlLmtleUNvZGUgPT0gNjUgJiYgKGUuY3RybEtleSA9PT0gdHJ1ZSB8fCBlLm1ldGFLZXkgPT09IHRydWUpKSB8fFxuICAgICAgICAvLyBBbGxvdzogQ3RybC9jbWQrQ1xuICAgICAgICAoZS5rZXlDb2RlID09IDY3ICYmIChlLmN0cmxLZXkgPT09IHRydWUgfHwgZS5tZXRhS2V5ID09PSB0cnVlKSkgfHxcbiAgICAgICAgLy8gQWxsb3c6IEN0cmwvY21kK1hcbiAgICAgICAgKGUua2V5Q29kZSA9PSA4OCAmJiAoZS5jdHJsS2V5ID09PSB0cnVlIHx8IGUubWV0YUtleSA9PT0gdHJ1ZSkpIHx8XG4gICAgICAgIC8vIEFsbG93OiBob21lLCBlbmQsIGxlZnQsIHJpZ2h0LCB1cCwgZG93blxuICAgICAgICAoZS5rZXlDb2RlID49IDM1ICYmIGUua2V5Q29kZSA8PSA0MCkpIHtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuICEoKGUua2V5Q29kZSA8IDQ4IHx8IGUua2V5Q29kZSA+IDU3KSAmJiAoZS5rZXlDb2RlIDwgOTYgfHwgZS5rZXlDb2RlID4gMTA1KSk7XG59XG5cbmZ1bmN0aW9uIGlzVGltZURpc2FibGVkVG9DaGFuZ2UoY3VycmVudFRpbWU6IHN0cmluZywgbmV4dFRpbWU6IHN0cmluZywgdGltZUxpc3Q6IENsb2NrRmFjZVRpbWVbXSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGlzTnVtYmVyID0gL1xcZC8udGVzdChuZXh0VGltZSk7XG5cbiAgICBpZiAoaXNOdW1iZXIpIHtcbiAgICAgICAgY29uc3QgdGltZSA9IGN1cnJlbnRUaW1lICsgbmV4dFRpbWU7XG4gICAgICAgIHJldHVybiBpc1RpbWVVbmF2YWlsYWJsZSh0aW1lLCB0aW1lTGlzdCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc1RpbWVVbmF2YWlsYWJsZSh0aW1lOiBzdHJpbmcsIHRpbWVMaXN0OiBDbG9ja0ZhY2VUaW1lW10pOiBib29sZWFuIHtcbiAgICBjb25zdCBzZWxlY3RlZFRpbWUgPSB0aW1lTGlzdC5maW5kKHZhbHVlID0+IHZhbHVlLnRpbWUgPT09ICt0aW1lKTtcbiAgICByZXR1cm4gIXNlbGVjdGVkVGltZSB8fCAoc2VsZWN0ZWRUaW1lICYmIHNlbGVjdGVkVGltZS5kaXNhYmxlZCk7XG59XG4iXX0=