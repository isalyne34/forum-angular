import { Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SubjectService } from '../../shared/services/subject.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubjectModel } from '../../interfaces/subject-model';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [
    MatPaginator,
    MatButtonModule,
    MatFormFieldModule,
    CommonModule,
    MatIcon,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.scss',
})
export class SubjectListComponent {
  subjectService: SubjectService = inject(SubjectService);
  router: Router = inject(Router);
  toastr = inject(ToastrService);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  subjects: any[] = [];
  length = 0;
  displayedColumns: string[] = [
    'title',
    'postCount',
    'lastPostDate',
    'actions',
  ];
  dataSource = new MatTableDataSource(this.subjects);

  ngOnInit(): void {
    this.loadSubjects();
  }

  async loadSubjects() {
    const subjects = await this.subjectService.getSubjects();
    for (const subject of subjects) {
      if (subject) {
        if (subject.id) {
          subject.postCount = await this.subjectService.getPostCountForSubject(
            subject.id
          );
          subject.lastPostDate =
            await this.subjectService.getLastPostDateForSubject(subject.id);
        }
      }
    }
    this.subjects = subjects;
    this.dataSource = new MatTableDataSource(this.subjects);
    this.length = this.subjects.length;
    this.dataSource.paginator = this.paginator;
  }

  addSubject(): void {
    this.router.navigateByUrl('/addSubject');
  }

  editSubject(id: string): void {
    this.router.navigateByUrl(`/addSubject/${id}`);
  }

  deleteSubject(id: string): void {
    this.subjectService
      .deleteSubject(id)
      .then(() => {
        this.subjectService.getSubjects().then((res: any) => {
          this.subjects = res;
          this.dataSource = new MatTableDataSource(this.subjects);
          this.length = this.subjects.length;
        });
        this.toastr.success('Subject deleted successfully');
      })
      .catch(() => {
        this.toastr.error('Failed to delete subject');
      });
  }

  viewSubject(id: string): void {
    this.router.navigateByUrl(`/subject/${id}/posts`);
  }

  isAdmin(subject: SubjectModel): boolean {
    return this.subjectService.isCreator(subject);
  }
}
