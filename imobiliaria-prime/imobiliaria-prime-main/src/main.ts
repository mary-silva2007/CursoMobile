import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// 👇 ADICIONE ESTAS LINHAS PARA REGISTRAR O LOCALE DO BRASIL
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));