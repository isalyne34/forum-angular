import { Component, inject } from '@angular/core';
import { SubjectService } from '../../shared/services/subject.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { SubjectModel } from '../../interfaces/subject-model';
import { AuthService } from '../../shared/services/auth.service';
import { PostModel } from '../../interfaces/post-model';
import { PostService } from '../../shared/services/post.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent {
  postService = inject(PostService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  authService = inject(AuthService);
  subjectService = inject(SubjectService);
  toastr = inject(ToastrService);

  isEdit: boolean = false;
  postId: string = '';
  subjectId: string = '';
  subject: SubjectModel = { title: '', id: '', created_by: '' };
  post: Partial<PostModel> = {
    title: '',
    description: '',
    subject: '',
    created_by: '',
    created: '',
  };

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.subjectId = params.get('id') ?? '';
      this.postId = params.get('postId') ?? '';
      if (this.postId) {
        this.isEdit = true;
        this.loadPost();
      }
    });
  }

  loadPost(): void {
    this.postService.getPost(this.postId).then((post: PostModel) => {
      this.post = post;
    });
  }

  addPost(): void {
    const title = this.post.title;
    const description = this.post.description;
    const subject = this.subjectId;

    if (this.isEdit) {
      const updatedPost = { title, description, subject };
      this.postService
        .updatePost(this.postId, updatedPost)
        .then(() => {
          this.toastr.success('Post updated successfully');
          this.router.navigateByUrl(`/subject/${this.subjectId}/posts`);
        })
        .catch(() => {
          this.toastr.error('Failed to update post');
        });
    } else {
      const newPost: Partial<PostModel> = { title, description, subject };
      this.postService
        .addPost(newPost)
        .then(() => {
          this.toastr.success('Post created successfully');
          this.router.navigateByUrl(`/subject/${this.subjectId}/posts`);
        })
        .catch(() => {
          this.toastr.error('Failed to create post');
        });
    }
  }
  back(): void {
    this.router.navigateByUrl('/subject/${this.subjectId}/posts');
  }
}
