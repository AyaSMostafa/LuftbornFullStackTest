import { Component } from '@angular/core';
import { AuthService, LoginUserDto } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData: LoginUserDto = {
    userName: '',
    password: ''
  };

  errorMessage: string = ''; 

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.loginData).subscribe(
      () => {
        this.router.navigate(['/products']);
      },
      (error) => {    
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
}
