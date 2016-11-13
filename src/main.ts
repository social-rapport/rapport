import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './boot/app.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
