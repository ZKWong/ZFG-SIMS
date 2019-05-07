/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaterialTimepickerComponent } from './ngx-material-timepicker.component';
import { FormsModule } from '@angular/forms';
import { NgxMaterialTimepickerToggleComponent } from './components/timepicker-toggle-button/ngx-material-timepicker-toggle.component';
import { TimepickerDirective } from './directives/ngx-timepicker.directive';
import { NgxMaterialTimepickerToggleIconDirective } from './directives/ngx-material-timepicker-toggle-icon.directive';
import { NgxMaterialTimepickerThemeDirective } from './directives/ngx-material-timepicker-theme.directive';
import { NgxMaterialTimepicker24HoursFaceComponent } from './components/timepicker-24-hours-face/ngx-material-timepicker-24-hours-face.component';
import { NgxMaterialTimepicker12HoursFaceComponent } from './components/timepicker-12-hours-face/ngx-material-timepicker-12-hours-face.component';
import { NgxMaterialTimepickerMinutesFaceComponent } from './components/timepicker-minutes-face/ngx-material-timepicker-minutes-face.component';
import { NgxMaterialTimepickerFaceComponent } from './components/timepicker-face/ngx-material-timepicker-face.component';
import { NgxMaterialTimepickerButtonComponent } from './components/timepicker-button/ngx-material-timepicker-button.component';
import { NgxMaterialTimepickerDialComponent } from './components/timepicker-dial/ngx-material-timepicker-dial.component';
import { NgxMaterialTimepickerDialControlComponent } from './components/timepicker-dial-control/ngx-material-timepicker-dial-control.component';
import { NgxMaterialTimepickerPeriodComponent } from './components/timepicker-period/ngx-material-timepicker-period.component';
import { StyleSanitizerPipe } from './pipes/style-sanitizer.pipe';
import { TimeFormatterPipe } from './pipes/time-formatter.pipe';
import { OverlayDirective } from './directives/overlay.directive';
import { MinutesFormatterPipe } from './pipes/minutes-formatter.pipe';
import { AutofocusDirective } from './directives/autofocus.directive';
export class NgxMaterialTimepickerModule {
}
NgxMaterialTimepickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule
                ],
                exports: [
                    NgxMaterialTimepickerComponent,
                    NgxMaterialTimepickerToggleComponent,
                    TimepickerDirective,
                    NgxMaterialTimepickerToggleIconDirective,
                    NgxMaterialTimepickerThemeDirective
                ],
                declarations: [
                    NgxMaterialTimepickerComponent,
                    NgxMaterialTimepicker24HoursFaceComponent,
                    NgxMaterialTimepicker12HoursFaceComponent,
                    NgxMaterialTimepickerMinutesFaceComponent,
                    NgxMaterialTimepickerFaceComponent,
                    NgxMaterialTimepickerToggleComponent,
                    NgxMaterialTimepickerButtonComponent,
                    NgxMaterialTimepickerDialComponent,
                    NgxMaterialTimepickerDialControlComponent,
                    NgxMaterialTimepickerPeriodComponent,
                    StyleSanitizerPipe,
                    TimeFormatterPipe,
                    TimepickerDirective,
                    OverlayDirective,
                    NgxMaterialTimepickerToggleIconDirective,
                    AutofocusDirective,
                    MinutesFormatterPipe,
                    NgxMaterialTimepickerThemeDirective
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sZ0ZBQWdGLENBQUM7QUFDdEksT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHdDQUF3QyxFQUFFLE1BQU0sNERBQTRELENBQUM7QUFDdEgsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDM0csT0FBTyxFQUNILHlDQUF5QyxFQUM1QyxNQUFNLHVGQUF1RixDQUFDO0FBQy9GLE9BQU8sRUFDSCx5Q0FBeUMsRUFDNUMsTUFBTSx1RkFBdUYsQ0FBQztBQUMvRixPQUFPLEVBQ0gseUNBQXlDLEVBQzVDLE1BQU0scUZBQXFGLENBQUM7QUFDN0YsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0scUVBQXFFLENBQUM7QUFDekgsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0seUVBQXlFLENBQUM7QUFDL0gsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0scUVBQXFFLENBQUM7QUFDekgsT0FBTyxFQUNILHlDQUF5QyxFQUM1QyxNQUFNLHFGQUFxRixDQUFDO0FBQzdGLE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxNQUFNLHlFQUF5RSxDQUFDO0FBQy9ILE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBb0N0RSxNQUFNLE9BQU8sMkJBQTJCOzs7WUFqQ3ZDLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixXQUFXO2lCQUNkO2dCQUNELE9BQU8sRUFBRTtvQkFDTCw4QkFBOEI7b0JBQzlCLG9DQUFvQztvQkFDcEMsbUJBQW1CO29CQUNuQix3Q0FBd0M7b0JBQ3hDLG1DQUFtQztpQkFDdEM7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLDhCQUE4QjtvQkFDOUIseUNBQXlDO29CQUN6Qyx5Q0FBeUM7b0JBQ3pDLHlDQUF5QztvQkFDekMsa0NBQWtDO29CQUNsQyxvQ0FBb0M7b0JBQ3BDLG9DQUFvQztvQkFDcEMsa0NBQWtDO29CQUNsQyx5Q0FBeUM7b0JBQ3pDLG9DQUFvQztvQkFDcEMsa0JBQWtCO29CQUNsQixpQkFBaUI7b0JBQ2pCLG1CQUFtQjtvQkFDbkIsZ0JBQWdCO29CQUNoQix3Q0FBd0M7b0JBQ3hDLGtCQUFrQjtvQkFDbEIsb0JBQW9CO29CQUNwQixtQ0FBbUM7aUJBQ3RDO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VyVG9nZ2xlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RpbWVwaWNrZXItdG9nZ2xlLWJ1dHRvbi9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci10b2dnbGUuY29tcG9uZW50JztcbmltcG9ydCB7IFRpbWVwaWNrZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmd4LXRpbWVwaWNrZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlclRvZ2dsZUljb25EaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItdG9nZ2xlLWljb24uZGlyZWN0aXZlJztcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlclRoZW1lRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLXRoZW1lLmRpcmVjdGl2ZSc7XG5pbXBvcnQge1xuICAgIE5neE1hdGVyaWFsVGltZXBpY2tlcjI0SG91cnNGYWNlQ29tcG9uZW50XG59IGZyb20gJy4vY29tcG9uZW50cy90aW1lcGlja2VyLTI0LWhvdXJzLWZhY2Uvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItMjQtaG91cnMtZmFjZS5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXIxMkhvdXJzRmFjZUNvbXBvbmVudFxufSBmcm9tICcuL2NvbXBvbmVudHMvdGltZXBpY2tlci0xMi1ob3Vycy1mYWNlL25neC1tYXRlcmlhbC10aW1lcGlja2VyLTEyLWhvdXJzLWZhY2UuY29tcG9uZW50JztcbmltcG9ydCB7XG4gICAgTmd4TWF0ZXJpYWxUaW1lcGlja2VyTWludXRlc0ZhY2VDb21wb25lbnRcbn0gZnJvbSAnLi9jb21wb25lbnRzL3RpbWVwaWNrZXItbWludXRlcy1mYWNlL25neC1tYXRlcmlhbC10aW1lcGlja2VyLW1pbnV0ZXMtZmFjZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VyRmFjZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90aW1lcGlja2VyLWZhY2Uvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZmFjZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VyQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RpbWVwaWNrZXItYnV0dG9uL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWJ1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VyRGlhbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90aW1lcGlja2VyLWRpYWwvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJEaWFsQ29udHJvbENvbXBvbmVudFxufSBmcm9tICcuL2NvbXBvbmVudHMvdGltZXBpY2tlci1kaWFsLWNvbnRyb2wvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC1jb250cm9sLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJQZXJpb2RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGltZXBpY2tlci1wZXJpb2Qvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItcGVyaW9kLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdHlsZVNhbml0aXplclBpcGUgfSBmcm9tICcuL3BpcGVzL3N0eWxlLXNhbml0aXplci5waXBlJztcbmltcG9ydCB7IFRpbWVGb3JtYXR0ZXJQaXBlIH0gZnJvbSAnLi9waXBlcy90aW1lLWZvcm1hdHRlci5waXBlJztcbmltcG9ydCB7IE92ZXJsYXlEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvb3ZlcmxheS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWludXRlc0Zvcm1hdHRlclBpcGUgfSBmcm9tICcuL3BpcGVzL21pbnV0ZXMtZm9ybWF0dGVyLnBpcGUnO1xuaW1wb3J0IHsgQXV0b2ZvY3VzRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2F1dG9mb2N1cy5kaXJlY3RpdmUnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE5neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudCxcbiAgICAgICAgTmd4TWF0ZXJpYWxUaW1lcGlja2VyVG9nZ2xlQ29tcG9uZW50LFxuICAgICAgICBUaW1lcGlja2VyRGlyZWN0aXZlLFxuICAgICAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUb2dnbGVJY29uRGlyZWN0aXZlLFxuICAgICAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZURpcmVjdGl2ZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE5neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudCxcbiAgICAgICAgTmd4TWF0ZXJpYWxUaW1lcGlja2VyMjRIb3Vyc0ZhY2VDb21wb25lbnQsXG4gICAgICAgIE5neE1hdGVyaWFsVGltZXBpY2tlcjEySG91cnNGYWNlQ29tcG9uZW50LFxuICAgICAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJNaW51dGVzRmFjZUNvbXBvbmVudCxcbiAgICAgICAgTmd4TWF0ZXJpYWxUaW1lcGlja2VyRmFjZUNvbXBvbmVudCxcbiAgICAgICAgTmd4TWF0ZXJpYWxUaW1lcGlja2VyVG9nZ2xlQ29tcG9uZW50LFxuICAgICAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJCdXR0b25Db21wb25lbnQsXG4gICAgICAgIE5neE1hdGVyaWFsVGltZXBpY2tlckRpYWxDb21wb25lbnQsXG4gICAgICAgIE5neE1hdGVyaWFsVGltZXBpY2tlckRpYWxDb250cm9sQ29tcG9uZW50LFxuICAgICAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJQZXJpb2RDb21wb25lbnQsXG4gICAgICAgIFN0eWxlU2FuaXRpemVyUGlwZSxcbiAgICAgICAgVGltZUZvcm1hdHRlclBpcGUsXG4gICAgICAgIFRpbWVwaWNrZXJEaXJlY3RpdmUsXG4gICAgICAgIE92ZXJsYXlEaXJlY3RpdmUsXG4gICAgICAgIE5neE1hdGVyaWFsVGltZXBpY2tlclRvZ2dsZUljb25EaXJlY3RpdmUsXG4gICAgICAgIEF1dG9mb2N1c0RpcmVjdGl2ZSxcbiAgICAgICAgTWludXRlc0Zvcm1hdHRlclBpcGUsXG4gICAgICAgIE5neE1hdGVyaWFsVGltZXBpY2tlclRoZW1lRGlyZWN0aXZlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJNb2R1bGUge1xufVxuIl19