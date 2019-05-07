/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, forwardRef, HostListener, Input } from '@angular/core';
import { NgxMaterialTimepickerComponent } from '../ngx-material-timepicker.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TimeAdapter } from '../services/time-adapter';
/** @type {?} */
var VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line
    useExisting: forwardRef(function () { return TimepickerDirective; }),
    multi: true
};
var TimepickerDirective = /** @class */ (function () {
    function TimepickerDirective(elementRef) {
        this.elementRef = elementRef;
        this._format = 12;
        this._value = '';
        this.timepickerSubscriptions = [];
        this.onTouched = function () {
        };
        this.onChange = function () {
        };
    }
    Object.defineProperty(TimepickerDirective.prototype, "format", {
        get: /**
         * @return {?}
         */
        function () {
            return this._format;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._format = value === 24 ? 24 : 12;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimepickerDirective.prototype, "min", {
        get: /**
         * @return {?}
         */
        function () {
            return this._min;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (typeof value === 'string') {
                this._min = TimeAdapter.convertTimeToDateTime(value);
                return;
            }
            this._min = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimepickerDirective.prototype, "max", {
        get: /**
         * @return {?}
         */
        function () {
            return this._max;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (typeof value === 'string') {
                this._max = TimeAdapter.convertTimeToDateTime(value);
                return;
            }
            this._max = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimepickerDirective.prototype, "timepicker", {
        set: /**
         * @param {?} picker
         * @return {?}
         */
        function (picker) {
            this.registerTimepicker(picker);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimepickerDirective.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value) {
                this._value = '';
                this.updateInputValue();
                return;
            }
            /** @type {?} */
            var time = TimeAdapter.formatTime(value, this._format);
            if (TimeAdapter.isTimeAvailable(time, (/** @type {?} */ (this._min)), (/** @type {?} */ (this._max)), 'minutes', this._timepicker.minutesGap)) {
                this._value = time;
                this.updateInputValue();
                return;
            }
            console.warn('Selected time doesn\'t match min or max value');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimepickerDirective.prototype, "defaultTime", {
        set: /**
         * @private
         * @param {?} time
         * @return {?}
         */
        function (time) {
            this._timepicker.setDefaultTime(time);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    TimepickerDirective.prototype.onInput = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
        this.onChange(value);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    TimepickerDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['value'] && changes['value'].currentValue) {
            this.defaultTime = changes['value'].currentValue;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TimepickerDirective.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.disableClick) {
            this._timepicker.open();
            event.stopPropagation();
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TimepickerDirective.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
        this.defaultTime = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TimepickerDirective.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TimepickerDirective.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    TimepickerDirective.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @return {?}
     */
    TimepickerDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.timepickerSubscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    /**
     * @private
     * @param {?} picker
     * @return {?}
     */
    TimepickerDirective.prototype.registerTimepicker = /**
     * @private
     * @param {?} picker
     * @return {?}
     */
    function (picker) {
        var _this = this;
        if (picker) {
            this._timepicker = picker;
            this._timepicker.registerInput(this);
            this.timepickerSubscriptions.push(this._timepicker.timeSet.subscribe(function (time) {
                _this.value = time;
                _this.onChange(_this._value);
                _this.onTouched();
            }));
            this.timepickerSubscriptions.push(this._timepicker.closed.subscribe(function () { return _this.defaultTime = _this._value; }));
        }
        else {
            throw new Error('NgxMaterialTimepickerComponent is not defined.' +
                ' Please make sure you passed the timepicker to ngxTimepicker directive');
        }
    };
    /**
     * @private
     * @return {?}
     */
    TimepickerDirective.prototype.updateInputValue = /**
     * @private
     * @return {?}
     */
    function () {
        this.elementRef.nativeElement.value = this.value;
    };
    TimepickerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ngxTimepicker]',
                    providers: [VALUE_ACCESSOR],
                    host: {
                        '[disabled]': 'disabled',
                        '(input)': 'onInput($event.target.value)',
                        '(blur)': 'onTouched()',
                    },
                },] }
    ];
    /** @nocollapse */
    TimepickerDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    TimepickerDirective.propDecorators = {
        format: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        timepicker: [{ type: Input, args: ['ngxTimepicker',] }],
        value: [{ type: Input }],
        disabled: [{ type: Input }],
        disableClick: [{ type: Input }],
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return TimepickerDirective;
}());
export { TimepickerDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    TimepickerDirective.prototype._format;
    /**
     * @type {?}
     * @private
     */
    TimepickerDirective.prototype._min;
    /**
     * @type {?}
     * @private
     */
    TimepickerDirective.prototype._max;
    /**
     * @type {?}
     * @private
     */
    TimepickerDirective.prototype._timepicker;
    /**
     * @type {?}
     * @private
     */
    TimepickerDirective.prototype._value;
    /** @type {?} */
    TimepickerDirective.prototype.disabled;
    /** @type {?} */
    TimepickerDirective.prototype.disableClick;
    /**
     * @type {?}
     * @private
     */
    TimepickerDirective.prototype.timepickerSubscriptions;
    /** @type {?} */
    TimepickerDirective.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    TimepickerDirective.prototype.onChange;
    /**
     * @type {?}
     * @private
     */
    TimepickerDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvZGlyZWN0aXZlcy9uZ3gtdGltZXBpY2tlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUF1QyxNQUFNLGVBQWUsQ0FBQztBQUM1SCxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN0RixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztJQUdqRCxjQUFjLEdBQUc7SUFDbkIsT0FBTyxFQUFFLGlCQUFpQjs7SUFFMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsbUJBQW1CLEVBQW5CLENBQW1CLENBQUM7SUFDbEQsS0FBSyxFQUFFLElBQUk7Q0FDZDtBQUVEO0lBNEZJLDZCQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBeEVsQyxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBMkRiLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFLWiw0QkFBdUIsR0FBbUIsRUFBRSxDQUFDO1FBRXJELGNBQVMsR0FBRztRQUNaLENBQUMsQ0FBQTtRQUVPLGFBQVEsR0FBeUI7UUFDekMsQ0FBQyxDQUFBO0lBR0QsQ0FBQztJQWxGRCxzQkFDSSx1Q0FBTTs7OztRQUlWO1lBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7Ozs7O1FBUEQsVUFDVyxLQUFhO1lBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFD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ZFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4uL25neC1tYXRlcmlhbC10aW1lcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFRpbWVBZGFwdGVyIH0gZnJvbSAnLi4vc2VydmljZXMvdGltZS1hZGFwdGVyJztcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xuXG5jb25zdCBWQUxVRV9BQ0NFU1NPUiA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUaW1lcGlja2VyRGlyZWN0aXZlKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbmd4VGltZXBpY2tlcl0nLFxuICAgIHByb3ZpZGVyczogW1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdbZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAgICAgJyhpbnB1dCknOiAnb25JbnB1dCgkZXZlbnQudGFyZ2V0LnZhbHVlKScsXG4gICAgICAgICcoYmx1ciknOiAnb25Ub3VjaGVkKCknLFxuICAgIH0sXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVwaWNrZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgZm9ybWF0KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZm9ybWF0ID0gdmFsdWUgPT09IDI0ID8gMjQgOiAxMjtcbiAgICB9XG5cbiAgICBnZXQgZm9ybWF0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mb3JtYXQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZm9ybWF0ID0gMTI7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBtaW4odmFsdWU6IHN0cmluZyB8IERhdGVUaW1lKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLl9taW4gPSBUaW1lQWRhcHRlci5jb252ZXJ0VGltZVRvRGF0ZVRpbWUodmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21pbiA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBtaW4oKTogc3RyaW5nIHwgRGF0ZVRpbWUge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWluO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21pbjogc3RyaW5nIHwgRGF0ZVRpbWU7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBtYXgodmFsdWU6IHN0cmluZyB8IERhdGVUaW1lKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXggPSBUaW1lQWRhcHRlci5jb252ZXJ0VGltZVRvRGF0ZVRpbWUodmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21heCA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBtYXgoKTogc3RyaW5nIHwgRGF0ZVRpbWUge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4O1xuICAgIH1cblxuICAgIHByaXZhdGUgX21heDogc3RyaW5nIHwgRGF0ZVRpbWU7XG5cbiAgICBASW5wdXQoJ25neFRpbWVwaWNrZXInKVxuICAgIHNldCB0aW1lcGlja2VyKHBpY2tlcjogTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29tcG9uZW50KSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJUaW1lcGlja2VyKHBpY2tlcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdGltZXBpY2tlcjogTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29tcG9uZW50O1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dFZhbHVlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGltZSA9IFRpbWVBZGFwdGVyLmZvcm1hdFRpbWUodmFsdWUsIHRoaXMuX2Zvcm1hdCk7XG4gICAgICAgIGlmIChUaW1lQWRhcHRlci5pc1RpbWVBdmFpbGFibGUodGltZSwgPERhdGVUaW1lPnRoaXMuX21pbiwgPERhdGVUaW1lPnRoaXMuX21heCwgJ21pbnV0ZXMnLCB0aGlzLl90aW1lcGlja2VyLm1pbnV0ZXNHYXApKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHRpbWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0VmFsdWUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLndhcm4oJ1NlbGVjdGVkIHRpbWUgZG9lc25cXCd0IG1hdGNoIG1pbiBvciBtYXggdmFsdWUnKTtcbiAgICB9XG5cbiAgICBnZXQgdmFsdWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3ZhbHVlID0gJyc7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBkaXNhYmxlQ2xpY2s6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIHRpbWVwaWNrZXJTdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gICAgb25Ub3VjaGVkID0gKCkgPT4ge1xuICAgIH1cblxuICAgIHByaXZhdGUgb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0IGRlZmF1bHRUaW1lKHRpbWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl90aW1lcGlja2VyLnNldERlZmF1bHRUaW1lKHRpbWUpO1xuICAgIH1cblxuICAgIG9uSW5wdXQodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXNbJ3ZhbHVlJ10gJiYgY2hhbmdlc1sndmFsdWUnXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdFRpbWUgPSBjaGFuZ2VzWyd2YWx1ZSddLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgICBvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVwaWNrZXIub3BlbigpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmRlZmF1bHRUaW1lID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnRpbWVwaWNrZXJTdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVnaXN0ZXJUaW1lcGlja2VyKHBpY2tlcjogTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29tcG9uZW50KTogdm9pZCB7XG4gICAgICAgIGlmIChwaWNrZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVwaWNrZXIgPSBwaWNrZXI7XG4gICAgICAgICAgICB0aGlzLl90aW1lcGlja2VyLnJlZ2lzdGVySW5wdXQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXJTdWJzY3JpcHRpb25zLnB1c2godGhpcy5fdGltZXBpY2tlci50aW1lU2V0LnN1YnNjcmliZSgodGltZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRpbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLl92YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHRoaXMudGltZXBpY2tlclN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgICAgICAgICB0aGlzLl90aW1lcGlja2VyLmNsb3NlZC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kZWZhdWx0VGltZSA9IHRoaXMuX3ZhbHVlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudCBpcyBub3QgZGVmaW5lZC4nICtcbiAgICAgICAgICAgICAgICAnIFBsZWFzZSBtYWtlIHN1cmUgeW91IHBhc3NlZCB0aGUgdGltZXBpY2tlciB0byBuZ3hUaW1lcGlja2VyIGRpcmVjdGl2ZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVJbnB1dFZhbHVlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgfVxuXG59XG5cbiJdfQ==