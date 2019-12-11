import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const socketConfig: SocketIoConfig = {
  url: 'http://localhost:3000', // This can't be hard-coded. FIX.
  options: {},
};

export const CORE_PROVIDERS = [];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule, // We might need it? Jumm... Prolly not but let's keep it.
    SocketIoModule.forRoot(socketConfig)
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
        ngModule: CoreModule,
        providers: [
            ...CORE_PROVIDERS,
        ],
    };
  }
}
