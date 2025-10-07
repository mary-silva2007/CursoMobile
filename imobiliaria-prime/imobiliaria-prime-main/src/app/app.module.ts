import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/public/home/home.component';
import { LoginComponent } from './views/public/login/login.component';
import { NavbarComponent } from './templates/components/navbar/navbar.component';
import { CardImovelComponent } from './templates/components/card-imovel/card-imovel.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './templates/components/footer/footer.component';
import { MeusInteressesComponent } from './views/cliente/meus-interesses/meus-interesses.component';
import { DetalhesImovelComponent } from './views/cliente/detalhes-imovel/detalhes-imovel.component';
import { FormImovelComponent } from './views/corretor/form-imovel/form-imovel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardImoveisComponent } from './views/corretor/dashboard-imoveis/dashboard-imoveis.component'; // 👈 Importe o componente

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    CardImovelComponent,
    FooterComponent,
    MeusInteressesComponent,
    DetalhesImovelComponent,
    FormImovelComponent,
    DashboardImoveisComponent // 👈 Adicione aqui
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }