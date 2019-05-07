/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { TimeUnit } from '../../models/time-unit.enum';
/** @type {?} */
const CLOCK_HAND_STYLES = {
    small: {
        height: '75px',
        top: 'calc(50% - 75px)'
    },
    large: {
        height: '103px',
        top: 'calc(50% - 103px)'
    }
};
export class NgxMaterialTimepickerFaceComponent {
    constructor() {
        this.timeUnit = TimeUnit;
        this.innerClockFaceSize = 85;
        this.timeChange = new EventEmitter();
        this.timeSelected = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.setClockHandPosition();
        this.addTouchEvents();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const faceTimeChanges = changes['faceTime'];
        /** @type {?} */
        const selectedTimeChanges = changes['selectedTime'];
        if ((faceTimeChanges && faceTimeChanges.currentValue)
            && (selectedTimeChanges && selectedTimeChanges.currentValue)) {
            /* Set time according to passed an input value */
            this.selectedTime = this.faceTime.find(time => time.time === this.selectedTime.time);
        }
        if (selectedTimeChanges && selectedTimeChanges.currentValue) {
            this.setClockHandPosition();
        }
        if (faceTimeChanges && faceTimeChanges.currentValue) {
            // To avoid an error ExpressionChangedAfterItHasBeenCheckedError
            setTimeout(() => this.selectAvailableTime());
        }
    }
    /**
     * @param {?} _
     * @param {?} time
     * @return {?}
     */
    trackByTime(_, time) {
        return time.time;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onMousedown(e) {
        e.preventDefault();
        this.isStarted = true;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    selectTime(e) {
        if (!this.isStarted && (e instanceof MouseEvent && e.type !== 'click')) {
            return;
        }
        /** @type {?} */
        const clockFaceCords = this.clockFace.nativeElement.getBoundingClientRect();
        /* Get x0 and y0 of the circle */
        /** @type {?} */
        const centerX = clockFaceCords.left + clockFaceCords.width / 2;
        /** @type {?} */
        const centerY = clockFaceCords.top + clockFaceCords.height / 2;
        /* Counting the arctangent and convert it to from radian to deg */
        /** @type {?} */
        const arctangent = Math.atan(Math.abs(e.clientX - centerX) / Math.abs(e.clientY - centerY)) * 180 / Math.PI;
        /* Get angle according to quadrant */
        /** @type {?} */
        const circleAngle = countAngleByCords(centerX, centerY, e.clientX, e.clientY, arctangent);
        /* Check if selected time from the inner clock face (24 hours format only) */
        /** @type {?} */
        const isInnerClockChosen = this.format && this.isInnerClockFace(centerX, centerY, e.clientX, e.clientY);
        /* Round angle according to angle step */
        /** @type {?} */
        const angleStep = this.unit === TimeUnit.MINUTE ? 6 : 30;
        /** @type {?} */
        const roundedAngle = isInnerClockChosen
            ? roundAngle(circleAngle, angleStep) + 360
            : roundAngle(circleAngle, angleStep);
        /** @type {?} */
        const angle = roundedAngle === 0 ? 360 : roundedAngle;
        /** @type {?} */
        const selectedTime = this.faceTime.find(val => val.angle === angle);
        if (selectedTime && !selectedTime.disabled) {
            this.timeChange.next(selectedTime);
            /* To let know whether user ended interaction with clock face */
            if (!this.isStarted) {
                this.timeSelected.next(selectedTime.time);
            }
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onMouseup(e) {
        e.preventDefault();
        this.isStarted = false;
    }
    /**
     * @param {?} hour
     * @return {?}
     */
    isHourSelected(hour) {
        return (hour === this.selectedTime.time) && !this.isClockFaceDisabled;
    }
    /**
     * @param {?} minute
     * @return {?}
     */
    isMinuteSelected(minute) {
        return ((this.selectedTime.time === minute) && (minute % (this.minutesGap || 5) === 0)) && !this.isClockFaceDisabled;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.removeTouchEvents();
    }
    /**
     * @private
     * @return {?}
     */
    addTouchEvents() {
        this.touchStartHandler = this.onMousedown.bind(this);
        this.touchEndHandler = this.onMouseup.bind(this);
        this.clockFace.nativeElement.addEventListener('touchstart', this.touchStartHandler);
        this.clockFace.nativeElement.addEventListener('touchend', this.touchEndHandler);
    }
    /**
     * @private
     * @return {?}
     */
    removeTouchEvents() {
        this.clockFace.nativeElement.removeEventListener('touchstart', this.touchStartHandler);
        this.clockFace.nativeElement.removeEventListener('touchend', this.touchEndHandler);
    }
    /**
     * @private
     * @return {?}
     */
    setClockHandPosition() {
        if (this.format === 24) {
            if (this.selectedTime.time > 12 || this.selectedTime.time === 0) {
                this.decreaseClockHand();
            }
            else {
                this.increaseClockHand();
            }
        }
        this.clockHand.nativeElement.style.transform = `rotate(${this.selectedTime.angle}deg)`;
    }
    /**
     * @private
     * @return {?}
     */
    selectAvailableTime() {
        /** @type {?} */
        const currentTime = this.faceTime.find(time => this.selectedTime.time === time.time);
        this.isClockFaceDisabled = this.faceTime.every(time => time.disabled);
        if ((currentTime && currentTime.disabled) && !this.isClockFaceDisabled) {
            /** @type {?} */
            const availableTime = this.faceTime.find(time => !time.disabled);
            this.timeChange.next(availableTime);
        }
    }
    /**
     * @private
     * @param {?} x0
     * @param {?} y0
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    isInnerClockFace(x0, y0, x, y) {
        /* Detect whether time from the inner clock face or not (24 format only) */
        return Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2)) < this.innerClockFaceSize;
    }
    /**
     * @private
     * @return {?}
     */
    decreaseClockHand() {
        this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.small.height;
        this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.small.top;
    }
    /**
     * @private
     * @return {?}
     */
    increaseClockHand() {
        this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.large.height;
        this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.large.top;
    }
}
NgxMaterialTimepickerFaceComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker-face',
                template: "<div class=\"clock-face\" #clockFace>\n    <div *ngIf=\"unit !== timeUnit.MINUTE;else minutesFace\" class=\"clock-face__container\">\n        <div class=\"clock-face__number clock-face__number--outer\"\n             [style.transform]=\"'rotateZ('+ time.angle +'deg) translateX(-50%)' | styleSanitizer\"\n             *ngFor=\"let time of faceTime.slice(0, 12); trackBy: trackByTime\">\n\t\t\t<span [style.transform]=\"'rotateZ(-'+ time.angle +'deg)' | styleSanitizer\"\n                  [ngClass]=\"{'active': isHourSelected(time.time), 'disabled': time.disabled}\">{{time.time}}</span>\n        </div>\n        <div class=\"clock-face__inner\" *ngIf=\"faceTime.length > 12\"\n             [style.top]=\"'calc(50% - ' + innerClockFaceSize + 'px)'\">\n            <div class=\"clock-face__number clock-face__number--inner\"\n                 [style.transform]=\"'rotateZ('+ time.angle +'deg) translateX(-50%)' | styleSanitizer\"\n                 [style.height.px]=\"innerClockFaceSize\"\n                 *ngFor=\"let time of faceTime.slice(12, 24); trackBy: trackByTime\">\n\t\t\t<span [style.transform]=\"'rotateZ(-'+ time.angle +'deg)' | styleSanitizer\"\n                  [ngClass]=\"{'active': isHourSelected(time.time), 'disabled': time.disabled}\">\n                {{time.time === 0 ? '00' : time.time}}</span>\n            </div>\n        </div>\n    </div>\n\n    <span class=\"clock-face__clock-hand\" [ngClass]=\"{'clock-face__clock-hand_minute': unit === timeUnit.MINUTE}\"\n          #clockHand [hidden]=\"isClockFaceDisabled\"></span>\n</div>\n<ng-template #minutesFace>\n    <div class=\"clock-face__container\">\n        <div class=\"clock-face__number clock-face__number--outer\"\n             [style.transform]=\"'rotateZ('+ time.angle +'deg) translateX(-50%)' | styleSanitizer\"\n             *ngFor=\"let time of faceTime; trackBy: trackByTime\">\n\t<span [style.transform]=\"'rotateZ(-'+ time.angle +'deg)' | styleSanitizer\"\n          [ngClass]=\"{'active': isMinuteSelected(time.time), 'disabled': time.disabled}\">\n\t{{time.time === 0 ? '00' : time.time | minutesFormatter: minutesGap}}</span>\n        </div>\n    </div>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".clock-face{width:290px;height:290px;border-radius:50%;position:relative;display:flex;justify-content:center;padding:20px;box-sizing:border-box;background-color:#f0f0f0}@supports (background-color:var(--clock-face-background-color)){.clock-face{background-color:var(--clock-face-background-color)}}.clock-face__inner{position:absolute}.clock-face__container{margin-left:-2px}.clock-face__number{position:absolute;-webkit-transform-origin:0 100%;transform-origin:0 100%;width:50px;text-align:center;z-index:2}.clock-face__number--outer{height:calc(290px / 2 - 20px)}.clock-face__number--outer>span{font-size:16px;color:#6c6c6c}@supports (color:var(--clock-face-time-inactive-color)){.clock-face__number--outer>span{color:var(--clock-face-time-inactive-color)}}.clock-face__number--inner>span{font-size:14px;color:#929292}@supports (color:var(--clock-face-inner-time-inactive-color)){.clock-face__number--inner>span{color:var(--clock-face-inner-time-inactive-color)}}.clock-face__number>span{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:30px;height:30px;display:flex;justify-content:center;align-items:center;margin:auto;border-radius:50%;font-weight:500;font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.clock-face__number>span{font-family:var(--primary-font-family)}}.clock-face__number>span.active{background-color:#00bfff;color:#fff}@supports (background-color:var(--clock-hand-color)){.clock-face__number>span.active{background-color:var(--clock-hand-color);color:var(--clock-face-time-active-color)}}.clock-face__number>span.disabled{color:#c5c5c5}@supports (color:var(--clock-face-time-disabled-color)){.clock-face__number>span.disabled{color:var(--clock-face-time-disabled-color)}}.clock-face__clock-hand{height:103px;width:2px;-webkit-transform-origin:0 100%;transform-origin:0 100%;position:absolute;top:calc(50% - 103px);z-index:1;background-color:#00bfff}@supports (background-color:var(--clock-hand-color)){.clock-face__clock-hand{background-color:var(--clock-hand-color)}}.clock-face__clock-hand:after{content:'';width:7px;height:7px;border-radius:50%;background-color:inherit;position:absolute;bottom:-3px;left:-3.5px}.clock-face__clock-hand_minute:before{content:'';width:7px;height:7px;background-color:#fff;border-radius:50%;position:absolute;top:-8px;left:calc(50% - 8px);box-sizing:content-box;border:4px solid #00bfff}@supports (border-color:var(--clock-hand-color)){.clock-face__clock-hand_minute:before{border-color:var(--clock-hand-color)}}@media (max-device-width:1023px) and (orientation:landscape){.clock-face{width:225px;height:225px;padding:5px}.clock-face__number--outer{height:calc(225px / 2 - 5px)}.clock-face__clock-hand_minute:before{top:0}}"]
            }] }
];
NgxMaterialTimepickerFaceComponent.propDecorators = {
    faceTime: [{ type: Input }],
    selectedTime: [{ type: Input }],
    unit: [{ type: Input }],
    format: [{ type: Input }],
    minutesGap: [{ type: Input }],
    timeChange: [{ type: Output }],
    timeSelected: [{ type: Output }],
    clockFace: [{ type: ViewChild, args: ['clockFace',] }],
    clockHand: [{ type: ViewChild, args: ['clockHand',] }],
    onMousedown: [{ type: HostListener, args: ['mousedown', ['$event'],] }],
    selectTime: [{ type: HostListener, args: ['click', ['$event'],] }, { type: HostListener, args: ['touchmove', ['$event.changedTouches[0]'],] }, { type: HostListener, args: ['touchend', ['$event.changedTouches[0]'],] }, { type: HostListener, args: ['mousemove', ['$event'],] }],
    onMouseup: [{ type: HostListener, args: ['mouseup', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    NgxMaterialTimepickerFaceComponent.prototype.timeUnit;
    /** @type {?} */
    NgxMaterialTimepickerFaceComponent.prototype.isClockFaceDisabled;
    /** @type {?} */
    NgxMaterialTimepickerFaceComponent.prototype.innerClockFaceSize;
    /** @type {?} */
    NgxMaterialTimepickerFaceComponent.prototype.faceTime;
    /** @type {?} */
    NgxMaterialTimepickerFaceComponent.prototype.selectedTime;
    /** @type {?} */
    NgxMaterialTimepickerFaceComponent.prototype.unit;
    /** @type {?} */
    NgxMaterialTimepickerFaceComponent.prototype.format;
    /** @type {?} */
    NgxMaterialTimepickerFaceComponent.prototype.minutesGap;
    /** @type {?} */
    NgxMaterialTimepickerFaceComponent.prototype.timeChange;
    /** @type {?} */
    NgxMaterialTimepickerFaceComponent.prototype.timeSelected;
    /** @type {?} */
    NgxMaterialTimepickerFaceComponent.prototype.clockFace;
    /** @type {?} */
    NgxMaterialTimepickerFaceComponent.prototype.clockHand;
    /**
     * @type {?}
     * @private
     */
    NgxMaterialTimepickerFaceComponent.prototype.isStarted;
    /**
     * @type {?}
     * @private
     */
    NgxMaterialTimepickerFaceComponent.prototype.touchStartHandler;
    /**
     * @type {?}
     * @private
     */
    NgxMaterialTimepickerFaceComponent.prototype.touchEndHandler;
}
/**
 * @param {?} angle
 * @param {?} step
 * @return {?}
 */
function roundAngle(angle, step) {
    return Math.round(angle / step) * step;
}
/**
 * @param {?} x0
 * @param {?} y0
 * @param {?} x
 * @param {?} y
 * @param {?} currentAngle
 * @return {?}
 */
function countAngleByCords(x0, y0, x, y, currentAngle) {
    if (y > y0 && x >= x0) { // II quarter
        return 180 - currentAngle;
    }
    else if (y > y0 && x < x0) { // III quarter
        return 180 + currentAngle;
    }
    else if (y < y0 && x < x0) { // IV quarter
        return 360 - currentAngle;
    }
    else { // I quarter
        return currentAngle;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZmFjZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9jb21wb25lbnRzL3RpbWVwaWNrZXItZmFjZS9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1mYWNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFFTixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztNQUVqRCxpQkFBaUIsR0FBRztJQUN0QixLQUFLLEVBQUU7UUFDSCxNQUFNLEVBQUUsTUFBTTtRQUNkLEdBQUcsRUFBRSxrQkFBa0I7S0FDMUI7SUFDRCxLQUFLLEVBQUU7UUFDSCxNQUFNLEVBQUUsT0FBTztRQUNmLEdBQUcsRUFBRSxtQkFBbUI7S0FDM0I7Q0FDSjtBQVFELE1BQU0sT0FBTyxrQ0FBa0M7SUFOL0M7UUFRSSxhQUFRLEdBQUcsUUFBUSxDQUFDO1FBR3BCLHVCQUFrQixHQUFHLEVBQUUsQ0FBQztRQVFkLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUMvQyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUF1SnhELENBQUM7Ozs7SUE5SUcsZUFBZTtRQUNYLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjs7Y0FDeEIsZUFBZSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7O2NBQ3JDLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxj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LElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFDLGFBQWE7UUFDakMsT0FBTyxHQUFHLEdBQUcsWUFBWSxDQUFDO0tBQzdCO1NBQU0sSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBQyxjQUFjO1FBQ3hDLE9BQU8sR0FBRyxHQUFHLFlBQVksQ0FBQztLQUM3QjtTQUFNLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUMsYUFBYTtRQUN2QyxPQUFPLEdBQUcsR0FBRyxZQUFZLENBQUM7S0FDN0I7U0FBTSxFQUFDLFlBQVk7UUFDaEIsT0FBTyxZQUFZLENBQUM7S0FDdkI7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPdXRwdXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbG9ja0ZhY2VUaW1lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Nsb2NrLWZhY2UtdGltZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVGltZVVuaXQgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZS11bml0LmVudW0nO1xuXG5jb25zdCBDTE9DS19IQU5EX1NUWUxFUyA9IHtcbiAgICBzbWFsbDoge1xuICAgICAgICBoZWlnaHQ6ICc3NXB4JyxcbiAgICAgICAgdG9wOiAnY2FsYyg1MCUgLSA3NXB4KSdcbiAgICB9LFxuICAgIGxhcmdlOiB7XG4gICAgICAgIGhlaWdodDogJzEwM3B4JyxcbiAgICAgICAgdG9wOiAnY2FsYyg1MCUgLSAxMDNweCknXG4gICAgfVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1mYWNlJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZmFjZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZmFjZS5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGltZXBpY2tlckZhY2VDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgICB0aW1lVW5pdCA9IFRpbWVVbml0O1xuXG4gICAgaXNDbG9ja0ZhY2VEaXNhYmxlZDogYm9vbGVhbjtcbiAgICBpbm5lckNsb2NrRmFjZVNpemUgPSA4NTtcblxuICAgIEBJbnB1dCgpIGZhY2VUaW1lOiBDbG9ja0ZhY2VUaW1lW107XG4gICAgQElucHV0KCkgc2VsZWN0ZWRUaW1lOiBDbG9ja0ZhY2VUaW1lO1xuICAgIEBJbnB1dCgpIHVuaXQ6IFRpbWVVbml0O1xuICAgIEBJbnB1dCgpIGZvcm1hdDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIG1pbnV0ZXNHYXA6IG51bWJlcjtcblxuICAgIEBPdXRwdXQoKSB0aW1lQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDbG9ja0ZhY2VUaW1lPigpO1xuICAgIEBPdXRwdXQoKSB0aW1lU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2Nsb2NrRmFjZScpIGNsb2NrRmFjZTogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCdjbG9ja0hhbmQnKSBjbG9ja0hhbmQ6IEVsZW1lbnRSZWY7XG5cbiAgICBwcml2YXRlIGlzU3RhcnRlZDogYm9vbGVhbjtcbiAgICBwcml2YXRlIHRvdWNoU3RhcnRIYW5kbGVyOiAoKSA9PiBhbnk7XG4gICAgcHJpdmF0ZSB0b3VjaEVuZEhhbmRsZXI6ICgpID0+IGFueTtcblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZXRDbG9ja0hhbmRQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLmFkZFRvdWNoRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBjb25zdCBmYWNlVGltZUNoYW5nZXMgPSBjaGFuZ2VzWydmYWNlVGltZSddO1xuICAgICAgICBjb25zdCBzZWxlY3RlZFRpbWVDaGFuZ2VzID0gY2hhbmdlc1snc2VsZWN0ZWRUaW1lJ107XG5cbiAgICAgICAgaWYgKChmYWNlVGltZUNoYW5nZXMgJiYgZmFjZVRpbWVDaGFuZ2VzLmN1cnJlbnRWYWx1ZSlcbiAgICAgICAgICAgICYmIChzZWxlY3RlZFRpbWVDaGFuZ2VzICYmIHNlbGVjdGVkVGltZUNoYW5nZXMuY3VycmVudFZhbHVlKSkge1xuICAgICAgICAgICAgLyogU2V0IHRpbWUgYWNjb3JkaW5nIHRvIHBhc3NlZCBhbiBpbnB1dCB2YWx1ZSAqL1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRpbWUgPSB0aGlzLmZhY2VUaW1lLmZpbmQodGltZSA9PiB0aW1lLnRpbWUgPT09IHRoaXMuc2VsZWN0ZWRUaW1lLnRpbWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxlY3RlZFRpbWVDaGFuZ2VzICYmIHNlbGVjdGVkVGltZUNoYW5nZXMuY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldENsb2NrSGFuZFBvc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZhY2VUaW1lQ2hhbmdlcyAmJiBmYWNlVGltZUNoYW5nZXMuY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAvLyBUbyBhdm9pZCBhbiBlcnJvciBFeHByZXNzaW9uQ2hhbmdlZEFmdGVySXRIYXNCZWVuQ2hlY2tlZEVycm9yXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2VsZWN0QXZhaWxhYmxlVGltZSgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgdHJhY2tCeVRpbWUoXywgdGltZTogQ2xvY2tGYWNlVGltZSk6IHN0cmluZyB8IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aW1lLnRpbWU7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSlcbiAgICBvbk1vdXNlZG93bihlOiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuaXNTdGFydGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gICAgQEhvc3RMaXN0ZW5lcigndG91Y2htb3ZlJywgWyckZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0nXSlcbiAgICBASG9zdExpc3RlbmVyKCd0b3VjaGVuZCcsIFsnJGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdJ10pXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2Vtb3ZlJywgWyckZXZlbnQnXSlcbiAgICBzZWxlY3RUaW1lKGU6IE1vdXNlRXZlbnQgfCBUb3VjaCk6IHZvaWQge1xuXG4gICAgICAgIGlmICghdGhpcy5pc1N0YXJ0ZWQgJiYgKGUgaW5zdGFuY2VvZiBNb3VzZUV2ZW50ICYmIGUudHlwZSAhPT0gJ2NsaWNrJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjbG9ja0ZhY2VDb3JkcyA9IHRoaXMuY2xvY2tGYWNlLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgLyogR2V0IHgwIGFuZCB5MCBvZiB0aGUgY2lyY2xlICovXG4gICAgICAgIGNvbnN0IGNlbnRlclggPSBjbG9ja0ZhY2VDb3Jkcy5sZWZ0ICsgY2xvY2tGYWNlQ29yZHMud2lkdGggLyAyO1xuICAgICAgICBjb25zdCBjZW50ZXJZID0gY2xvY2tGYWNlQ29yZHMudG9wICsgY2xvY2tGYWNlQ29yZHMuaGVpZ2h0IC8gMjtcbiAgICAgICAgLyogQ291bnRpbmcgdGhlIGFyY3RhbmdlbnQgYW5kIGNvbnZlcnQgaXQgdG8gZnJvbSByYWRpYW4gdG8gZGVnICovXG4gICAgICAgIGNvbnN0IGFyY3RhbmdlbnQgPSBNYXRoLmF0YW4oTWF0aC5hYnMoZS5jbGllbnRYIC0gY2VudGVyWCkgLyBNYXRoLmFicyhlLmNsaWVudFkgLSBjZW50ZXJZKSkgKiAxODAgLyBNYXRoLlBJO1xuICAgICAgICAvKiBHZXQgYW5nbGUgYWNjb3JkaW5nIHRvIHF1YWRyYW50ICovXG4gICAgICAgIGNvbnN0IGNpcmNsZUFuZ2xlID0gY291bnRBbmdsZUJ5Q29yZHMoY2VudGVyWCwgY2VudGVyWSwgZS5jbGllbnRYLCBlLmNsaWVudFksIGFyY3RhbmdlbnQpO1xuICAgICAgICAvKiBDaGVjayBpZiBzZWxlY3RlZCB0aW1lIGZyb20gdGhlIGlubmVyIGNsb2NrIGZhY2UgKDI0IGhvdXJzIGZvcm1hdCBvbmx5KSAqL1xuICAgICAgICBjb25zdCBpc0lubmVyQ2xvY2tDaG9zZW4gPSB0aGlzLmZvcm1hdCAmJiB0aGlzLmlzSW5uZXJDbG9ja0ZhY2UoY2VudGVyWCwgY2VudGVyWSwgZS5jbGllbnRYLCBlLmNsaWVudFkpO1xuICAgICAgICAvKiBSb3VuZCBhbmdsZSBhY2NvcmRpbmcgdG8gYW5nbGUgc3RlcCAqL1xuICAgICAgICBjb25zdCBhbmdsZVN0ZXAgPSB0aGlzLnVuaXQgPT09IFRpbWVVbml0Lk1JTlVURSA/IDYgOiAzMDtcbiAgICAgICAgY29uc3Qgcm91bmRlZEFuZ2xlID0gaXNJbm5lckNsb2NrQ2hvc2VuXG4gICAgICAgICAgICA/IHJvdW5kQW5nbGUoY2lyY2xlQW5nbGUsIGFuZ2xlU3RlcCkgKyAzNjBcbiAgICAgICAgICAgIDogcm91bmRBbmdsZShjaXJjbGVBbmdsZSwgYW5nbGVTdGVwKTtcbiAgICAgICAgY29uc3QgYW5nbGUgPSByb3VuZGVkQW5nbGUgPT09IDAgPyAzNjAgOiByb3VuZGVkQW5nbGU7XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRUaW1lID0gdGhpcy5mYWNlVGltZS5maW5kKHZhbCA9PiB2YWwuYW5nbGUgPT09IGFuZ2xlKTtcblxuICAgICAgICBpZiAoc2VsZWN0ZWRUaW1lICYmICFzZWxlY3RlZFRpbWUuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMudGltZUNoYW5nZS5uZXh0KHNlbGVjdGVkVGltZSk7XG5cbiAgICAgICAgICAgIC8qIFRvIGxldCBrbm93IHdoZXRoZXIgdXNlciBlbmRlZCBpbnRlcmFjdGlvbiB3aXRoIGNsb2NrIGZhY2UgKi9cbiAgICAgICAgICAgIGlmICghdGhpcy5pc1N0YXJ0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVTZWxlY3RlZC5uZXh0KHNlbGVjdGVkVGltZS50aW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2V1cCcsIFsnJGV2ZW50J10pXG4gICAgb25Nb3VzZXVwKGU6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5pc1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0hvdXJTZWxlY3RlZChob3VyOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChob3VyID09PSB0aGlzLnNlbGVjdGVkVGltZS50aW1lKSAmJiAhdGhpcy5pc0Nsb2NrRmFjZURpc2FibGVkO1xuICAgIH1cblxuICAgIGlzTWludXRlU2VsZWN0ZWQobWludXRlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICgodGhpcy5zZWxlY3RlZFRpbWUudGltZSA9PT0gbWludXRlKSAmJiAobWludXRlICUgKHRoaXMubWludXRlc0dhcCB8fCA1KSA9PT0gMCkpICYmICF0aGlzLmlzQ2xvY2tGYWNlRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlVG91Y2hFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFRvdWNoRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRvdWNoU3RhcnRIYW5kbGVyID0gdGhpcy5vbk1vdXNlZG93bi5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnRvdWNoRW5kSGFuZGxlciA9IHRoaXMub25Nb3VzZXVwLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5jbG9ja0ZhY2UubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy50b3VjaFN0YXJ0SGFuZGxlcik7XG4gICAgICAgIHRoaXMuY2xvY2tGYWNlLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRvdWNoRW5kSGFuZGxlcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVUb3VjaEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jbG9ja0ZhY2UubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy50b3VjaFN0YXJ0SGFuZGxlcik7XG4gICAgICAgIHRoaXMuY2xvY2tGYWNlLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRvdWNoRW5kSGFuZGxlcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRDbG9ja0hhbmRQb3NpdGlvbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZm9ybWF0ID09PSAyNCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRUaW1lLnRpbWUgPiAxMiB8fCB0aGlzLnNlbGVjdGVkVGltZS50aW1lID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWNyZWFzZUNsb2NrSGFuZCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluY3JlYXNlQ2xvY2tIYW5kKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNsb2NrSGFuZC5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHt0aGlzLnNlbGVjdGVkVGltZS5hbmdsZX1kZWcpYDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNlbGVjdEF2YWlsYWJsZVRpbWUoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gdGhpcy5mYWNlVGltZS5maW5kKHRpbWUgPT4gdGhpcy5zZWxlY3RlZFRpbWUudGltZSA9PT0gdGltZS50aW1lKTtcbiAgICAgICAgdGhpcy5pc0Nsb2NrRmFjZURpc2FibGVkID0gdGhpcy5mYWNlVGltZS5ldmVyeSh0aW1lID0+IHRpbWUuZGlzYWJsZWQpO1xuXG4gICAgICAgIGlmICgoY3VycmVudFRpbWUgJiYgY3VycmVudFRpbWUuZGlzYWJsZWQpICYmICF0aGlzLmlzQ2xvY2tGYWNlRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGF2YWlsYWJsZVRpbWUgPSB0aGlzLmZhY2VUaW1lLmZpbmQodGltZSA9PiAhdGltZS5kaXNhYmxlZCk7XG5cbiAgICAgICAgICAgIHRoaXMudGltZUNoYW5nZS5uZXh0KGF2YWlsYWJsZVRpbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0lubmVyQ2xvY2tGYWNlKHgwOiBudW1iZXIsIHkwOiBudW1iZXIsIHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIC8qIERldGVjdCB3aGV0aGVyIHRpbWUgZnJvbSB0aGUgaW5uZXIgY2xvY2sgZmFjZSBvciBub3QgKDI0IGZvcm1hdCBvbmx5KSAqL1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHggLSB4MCwgMikgKyBNYXRoLnBvdyh5IC0geTAsIDIpKSA8IHRoaXMuaW5uZXJDbG9ja0ZhY2VTaXplO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVjcmVhc2VDbG9ja0hhbmQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2xvY2tIYW5kLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gQ0xPQ0tfSEFORF9TVFlMRVMuc21hbGwuaGVpZ2h0O1xuICAgICAgICB0aGlzLmNsb2NrSGFuZC5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IENMT0NLX0hBTkRfU1RZTEVTLnNtYWxsLnRvcDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluY3JlYXNlQ2xvY2tIYW5kKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsb2NrSGFuZC5uYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9IENMT0NLX0hBTkRfU1RZTEVTLmxhcmdlLmhlaWdodDtcbiAgICAgICAgdGhpcy5jbG9ja0hhbmQubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSBDTE9DS19IQU5EX1NUWUxFUy5sYXJnZS50b3A7XG4gICAgfVxufVxuXG5mdW5jdGlvbiByb3VuZEFuZ2xlKGFuZ2xlOiBudW1iZXIsIHN0ZXA6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoYW5nbGUgLyBzdGVwKSAqIHN0ZXA7XG59XG5cbmZ1bmN0aW9uIGNvdW50QW5nbGVCeUNvcmRzKHgwOiBudW1iZXIsIHkwOiBudW1iZXIsIHg6IG51bWJlciwgeTogbnVtYmVyLCBjdXJyZW50QW5nbGU6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHkgPiB5MCAmJiB4ID49IHgwKSB7Ly8gSUkgcXVhcnRlclxuICAgICAgICByZXR1cm4gMTgwIC0gY3VycmVudEFuZ2xlO1xuICAgIH0gZWxzZSBpZiAoeSA+IHkwICYmIHggPCB4MCkgey8vIElJSSBxdWFydGVyXG4gICAgICAgIHJldHVybiAxODAgKyBjdXJyZW50QW5nbGU7XG4gICAgfSBlbHNlIGlmICh5IDwgeTAgJiYgeCA8IHgwKSB7Ly8gSVYgcXVhcnRlclxuICAgICAgICByZXR1cm4gMzYwIC0gY3VycmVudEFuZ2xlO1xuICAgIH0gZWxzZSB7Ly8gSSBxdWFydGVyXG4gICAgICAgIHJldHVybiBjdXJyZW50QW5nbGU7XG4gICAgfVxufVxuIl19