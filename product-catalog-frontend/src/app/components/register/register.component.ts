import { Component } from '@angular/core';
import { AuthService, RegisterUserDto } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData: RegisterUserDto = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private authService: AuthService, private router: Router,private snackBar: MatSnackBar) {}

  onSubmit() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    this.authService.register(this.registerData).subscribe(
      (response) => {
        this.snackBar.open('Registration successful, login now', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed', error);
  
        if (error.status === 409) {
          this.snackBar.open('Username or email already exists!', 'Close', {
            duration: 3000,
          });
        } else {
          this.snackBar.open('An unexpected error occurred during registration, try again', 'Close', {
            duration: 3000,
          });
        }
      }
    );
  }
}
