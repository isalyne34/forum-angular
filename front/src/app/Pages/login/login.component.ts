import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SubjectListComponent } from '../subject-list/subject-list.component';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SubjectListComponent,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  toastr = inject(ToastrService);

  emailAddress: string = '';
  password: string = '';
  displayError: boolean = false;

  login(): void {
    this.authService
      .login(this.emailAddress, this.password)
      .then((res: boolean) => {
        if (res) {
          this.toastr.success('Login successful');
          this.router.navigateByUrl('/subjectList');
        } else {
          this.toastr.error('Login failed');
          this.displayError = true;
        }
      })
      .catch(() => {
        this.toastr.error('Login failed');
      });
  }
}
