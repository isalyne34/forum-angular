import { Component, inject } from '@angular/core';
import { SubjectService } from '../../shared/services/subject.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { SubjectModel } from '../../interfaces/subject-model';
import { AuthService } from '../../shared/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-subject',
  standalone: true,
  imports: [MatFormField, FormsModule, MatButtonModule],
  templateUrl: './create-subject.component.html',
  styleUrl: './create-subject.component.scss',
})
export class CreateSubjectComponent {
  subjectService = inject(SubjectService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  authService = inject(AuthService);
  toastr = inject(ToastrService);


  isEdit: boolean = false;
  originalName: string = '';
  title: string = '';
  subjectId: string = '';

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.subjectId = params.get('id') ?? '';
      if (this.subjectId) {
        this.isEdit = true;
        this.loadSubject();
      }
    });
  }

  loadSubject(): void {
    this.subjectService.getSubject(this.subjectId).then((subject) => {
      this.originalName = subject.title;
      this.title = subject.title;
    });
  }

  addSubject(): void {
    const title = this.title;
    if (this.isEdit) {
      const updatedSubject = { title };
      this.subjectService
        .updateSubject(this.subjectId, updatedSubject)
        .then(() => {
          this.toastr.success('Subject updated successfully');
          this.router.navigateByUrl('/subjectList');
        }).catch(() => {
          this.toastr.error('Error updating subject');
        });
    } else {
      const newSubject: SubjectModel = { title };
      this.subjectService.addSubject(newSubject).then(() => {
        this.toastr.success('Subject created successfully');
        this.router.navigateByUrl('/subjectList');
      }).catch(() => {
        this.toastr.error('Error creating subject');

    });
  }
}
  back(): void{
    this.router.navigateByUrl('/subjectList')
  }
}
