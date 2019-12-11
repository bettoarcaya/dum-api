import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const BASE_MODULES = [
  CommonModule,
  NgxChartsModule,
];

const SHARED_PROVIDERS = [
];

@NgModule({
  declarations: [],
  imports: [
    ...BASE_MODULES,
  ],
  exports: [
    ...BASE_MODULES,
  ],
})
export class SharedModule { 
  public static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: SharedModule,
      providers: [...SHARED_PROVIDERS],
    };
  }
}
