/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, forwardRef, HostListener, Input } from '@angular/core';
import { NgxMaterialTimepickerComponent } from '../ngx-material-timepicker.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TimeAdapter } from '../services/time-adapter';
/** @type {?} */
const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line
    useExisting: forwardRef(() => TimepickerDirective),
    multi: true
};
export class TimepickerDirective {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
        this._format = 12;
        this._value = '';
        this.timepickerSubscriptions = [];
        this.onTouched = () => {
        };
        this.onChange = () => {
        };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set format(value) {
        this._format = value === 24 ? 24 : 12;
    }
    /**
     * @return {?}
     */
    get format() {
        return this._format;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set min(value) {
        if (typeof value === 'string') {
            this._min = TimeAdapter.convertTimeToDateTime(value);
            return;
        }
        this._min = value;
    }
    /**
     * @return {?}
     */
    get min() {
        return this._min;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set max(value) {
        if (typeof value === 'string') {
            this._max = TimeAdapter.convertTimeToDateTime(value);
            return;
        }
        this._max = value;
    }
    /**
     * @return {?}
     */
    get max() {
        return this._max;
    }
    /**
     * @param {?} picker
     * @return {?}
     */
    set timepicker(picker) {
        this.registerTimepicker(picker);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        if (!value) {
            this._value = '';
            this.updateInputValue();
            return;
        }
        /** @type {?} */
        const time = TimeAdapter.formatTime(value, this._format);
        if (TimeAdapter.isTimeAvailable(time, (/** @type {?} */ (this._min)), (/** @type {?} */ (this._max)), 'minutes', this._timepicker.minutesGap)) {
            this._value = time;
            this.updateInputValue();
            return;
        }
        console.warn('Selected time doesn\'t match min or max value');
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @private
     * @param {?} time
     * @return {?}
     */
    set defaultTime(time) {
        this._timepicker.setDefaultTime(time);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onInput(value) {
        this.value = value;
        this.onChange(value);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['value'] && changes['value'].currentValue) {
            this.defaultTime = changes['value'].currentValue;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        if (!this.disableClick) {
            this._timepicker.open();
            event.stopPropagation();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
        this.defaultTime = value;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.timepickerSubscriptions.forEach(s => s.unsubscribe());
    }
    /**
     * @private
     * @param {?} picker
     * @return {?}
     */
    registerTimepicker(picker) {
        if (picker) {
            this._timepicker = picker;
            this._timepicker.registerInput(this);
            this.timepickerSubscriptions.push(this._timepicker.timeSet.subscribe((time) => {
                this.value = time;
                this.onChange(this._value);
                this.onTouched();
            }));
            this.timepickerSubscriptions.push(this._timepicker.closed.subscribe(() => this.defaultTime = this._value));
        }
        else {
            throw new Error('NgxMaterialTimepickerComponent is not defined.' +
                ' Please make sure you passed the timepicker to ngxTimepicker directive');
        }
    }
    /**
     * @private
     * @return {?}
     */
    updateInputValue() {
        this.elementRef.nativeElement.value = this.value;
    }
}
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
TimepickerDirective.ctorParameters = () => [
    { type: ElementRef }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvZGlyZWN0aXZlcy9uZ3gtdGltZXBpY2tlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUF1QyxNQUFNLGVBQWUsQ0FBQztBQUM1SCxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN0RixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztNQUdqRCxjQUFjLEdBQUc7SUFDbkIsT0FBTyxFQUFFLGlCQUFpQjs7SUFFMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztJQUNsRCxLQUFLLEVBQUUsSUFBSTtDQUNkO0FBV0QsTUFBTSxPQUFPLG1CQUFtQjs7OztJQW1GNUIsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQXhFbEMsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQTJEYixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBS1osNEJBQXVCLEdBQW1CLEVBQUUsQ0FBQztRQUVyRCxjQUFTLEdBQUcsR0FBRyxFQUFFO1FBQ2pCLENBQUMsQ0FBQTtRQUVPLGFBQVEsR0FBeUIsR0FBRyxFQUFFO1FBQzlDLENBQUMsQ0FBQTtJQUdELENBQUM7Ozs7O0lBbEZELElBQ0ksTUFBTSxDQUFDLEtBQWE7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJ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O1lBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBZ0Q7Z0JBQzVELHdFQUF3RSxDQUFDLENBQUM7U0FDakY7SUFDTCxDQUFDOzs7OztJQUVPLGdCQUFnQjtRQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNyRCxDQUFDOzs7WUE5SkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFNBQVMsRUFBRSxDQUFDLGNBQWMsQ0FBQztnQkFDM0IsSUFBSSxFQUFFO29CQUNGLFlBQVksRUFBRSxVQUFVO29CQUN4QixTQUFTLEVBQUUsOEJBQThCO29CQUN6QyxRQUFRLEVBQUUsYUFBYTtpQkFDMUI7YUFDSjs7OztZQXRCbUIsVUFBVTs7O3FCQXlCekIsS0FBSztrQkFXTCxLQUFLO2tCQWVMLEtBQUs7eUJBZUwsS0FBSyxTQUFDLGVBQWU7b0JBT3JCLEtBQUs7dUJBc0JMLEtBQUs7MkJBQ0wsS0FBSztzQkE0QkwsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzs7Ozs7OztJQTFGakMsc0NBQXFCOzs7OztJQWVyQixtQ0FBZ0M7Ozs7O0lBZWhDLG1DQUFnQzs7Ozs7SUFPaEMsMENBQW9EOzs7OztJQXNCcEQscUNBQW9COztJQUVwQix1Q0FBMkI7O0lBQzNCLDJDQUErQjs7Ozs7SUFFL0Isc0RBQXFEOztJQUVyRCx3Q0FDQzs7Ozs7SUFFRCx1Q0FDQzs7Ozs7SUFFVyx5Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb21wb25lbnQgfSBmcm9tICcuLi9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBUaW1lQWRhcHRlciB9IGZyb20gJy4uL3NlcnZpY2VzL3RpbWUtYWRhcHRlcic7XG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcblxuY29uc3QgVkFMVUVfQUNDRVNTT1IgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVGltZXBpY2tlckRpcmVjdGl2ZSksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW25neFRpbWVwaWNrZXJdJyxcbiAgICBwcm92aWRlcnM6IFtWQUxVRV9BQ0NFU1NPUl0sXG4gICAgaG9zdDoge1xuICAgICAgICAnW2Rpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgICAgICcoaW5wdXQpJzogJ29uSW5wdXQoJGV2ZW50LnRhcmdldC52YWx1ZSknLFxuICAgICAgICAnKGJsdXIpJzogJ29uVG91Y2hlZCgpJyxcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBUaW1lcGlja2VyRGlyZWN0aXZlIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGZvcm1hdCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2Zvcm1hdCA9IHZhbHVlID09PSAyNCA/IDI0IDogMTI7XG4gICAgfVxuXG4gICAgZ2V0IGZvcm1hdCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZm9ybWF0O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Zvcm1hdCA9IDEyO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgbWluKHZhbHVlOiBzdHJpbmcgfCBEYXRlVGltZSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5fbWluID0gVGltZUFkYXB0ZXIuY29udmVydFRpbWVUb0RhdGVUaW1lKHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9taW4gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgbWluKCk6IHN0cmluZyB8IERhdGVUaW1lIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbjtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9taW46IHN0cmluZyB8IERhdGVUaW1lO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgbWF4KHZhbHVlOiBzdHJpbmcgfCBEYXRlVGltZSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5fbWF4ID0gVGltZUFkYXB0ZXIuY29udmVydFRpbWVUb0RhdGVUaW1lKHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tYXggPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgbWF4KCk6IHN0cmluZyB8IERhdGVUaW1lIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tYXg6IHN0cmluZyB8IERhdGVUaW1lO1xuXG4gICAgQElucHV0KCduZ3hUaW1lcGlja2VyJylcbiAgICBzZXQgdGltZXBpY2tlcihwaWNrZXI6IE5neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudCkge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyVGltZXBpY2tlcihwaWNrZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RpbWVwaWNrZXI6IE5neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudDtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSAnJztcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRWYWx1ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRpbWUgPSBUaW1lQWRhcHRlci5mb3JtYXRUaW1lKHZhbHVlLCB0aGlzLl9mb3JtYXQpO1xuICAgICAgICBpZiAoVGltZUFkYXB0ZXIuaXNUaW1lQXZhaWxhYmxlKHRpbWUsIDxEYXRlVGltZT50aGlzLl9taW4sIDxEYXRlVGltZT50aGlzLl9tYXgsICdtaW51dGVzJywgdGhpcy5fdGltZXBpY2tlci5taW51dGVzR2FwKSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB0aW1lO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dFZhbHVlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS53YXJuKCdTZWxlY3RlZCB0aW1lIGRvZXNuXFwndCBtYXRjaCBtaW4gb3IgbWF4IHZhbHVlJyk7XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF92YWx1ZSA9ICcnO1xuXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgQElucHV0KCkgZGlzYWJsZUNsaWNrOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSB0aW1lcGlja2VyU3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAgIG9uVG91Y2hlZCA9ICgpID0+IHtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldCBkZWZhdWx0VGltZSh0aW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fdGltZXBpY2tlci5zZXREZWZhdWx0VGltZSh0aW1lKTtcbiAgICB9XG5cbiAgICBvbklucHV0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzWyd2YWx1ZSddICYmIGNoYW5nZXNbJ3ZhbHVlJ10uY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRUaW1lID0gY2hhbmdlc1sndmFsdWUnXS5jdXJyZW50VmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gICAgb25DbGljayhldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZUNsaWNrKSB7XG4gICAgICAgICAgICB0aGlzLl90aW1lcGlja2VyLm9wZW4oKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5kZWZhdWx0VGltZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy50aW1lcGlja2VyU3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZ2lzdGVyVGltZXBpY2tlcihwaWNrZXI6IE5neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudCk6IHZvaWQge1xuICAgICAgICBpZiAocGlja2VyKSB7XG4gICAgICAgICAgICB0aGlzLl90aW1lcGlja2VyID0gcGlja2VyO1xuICAgICAgICAgICAgdGhpcy5fdGltZXBpY2tlci5yZWdpc3RlcklucHV0KHRoaXMpO1xuICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyU3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuX3RpbWVwaWNrZXIudGltZVNldC5zdWJzY3JpYmUoKHRpbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aW1lO1xuICAgICAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5fdmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXJTdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICAgICAgICAgICAgdGhpcy5fdGltZXBpY2tlci5jbG9zZWQuc3Vic2NyaWJlKCgpID0+IHRoaXMuZGVmYXVsdFRpbWUgPSB0aGlzLl92YWx1ZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb21wb25lbnQgaXMgbm90IGRlZmluZWQuJyArXG4gICAgICAgICAgICAgICAgJyBQbGVhc2UgbWFrZSBzdXJlIHlvdSBwYXNzZWQgdGhlIHRpbWVwaWNrZXIgdG8gbmd4VGltZXBpY2tlciBkaXJlY3RpdmUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlSW5wdXRWYWx1ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgIH1cblxufVxuXG4iXX0=