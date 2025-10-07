// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/public/home/home.component';
import { LoginComponent } from './views/public/login/login.component';
import { MeusInteressesComponent } from './views/cliente/meus-interesses/meus-interesses.component';
import { DashboardImoveisComponent } from './views/corretor/dashboard-imoveis/dashboard-imoveis.component';
import { DetalhesImovelComponent } from './views/cliente/detalhes-imovel/detalhes-imovel.component';
import { authGuard } from './core/guards/auth.guard';
import { corretorGuard } from './core/guards/corretor.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  // Rota pública: detalhes de imóvel (acessível por todos)
  { path: 'imovel/:id', component: DetalhesImovelComponent },

  // Rotas protegidas do cliente
  {
    path: 'cliente/meus-interesses',
    component: MeusInteressesComponent,
    canActivate: [authGuard],
  },

  // Rotas protegidas do corretor
  {
    path: 'corretor/dashboard',
    component: DashboardImoveisComponent,
    canActivate: [authGuard, corretorGuard],
  },

  // Rota fallback (deve ser a última)
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}