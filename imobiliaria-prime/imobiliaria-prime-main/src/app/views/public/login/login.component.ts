import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    // Chama o serviço de autenticação
    this.authService.login(this.email, this.senha).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        alert('Bem-vindo!');
        // Redireciona para a página principal ou dashboard
        this.router.navigate(['/dashboard']);
      } else {
        alert('Email ou senha inválidos!');
      }
    });
  }
}