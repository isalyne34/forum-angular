import { Component, inject } from '@angular/core';
import { PostService } from '../../shared/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { SubjectModel } from '../../interfaces/subject-model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { SubjectService } from '../../shared/services/subject.service';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { PostModel } from '../../interfaces/post-model';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatSort,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatAccordion,
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent {
  postService: PostService = inject(PostService);
  subjectService = inject(SubjectService);
  router: Router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  toastr = inject(ToastrService);

  posts: PostModel[] = [];
  allposts: PostModel[] = [];
  usernameMapping: Map<string, string> = new Map();

  subjectId: string = '';
  subject: SubjectModel = { title: '', id: '', created_by: '' };
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.subjectId = params.get('id') ?? '';
    });
    this.subjectService
      .getSubject(this.subjectId)
      .then((subject: SubjectModel) => {
        this.subject = subject;
      });

    this.postService.getPosts().then((res: any) => {
      this.allposts = res;
      for (let post of this.allposts) {
        if (post.subject === this.subjectId) {
          this.posts.push(post);
        }
      }
      this.getUsernameMapping();
    });
  }

  getUsernameMapping() {
    this.posts.forEach((post) => {
      this.getUserName(post.created_by).then((username) => {
        this.usernameMapping.set(post.created_by, username);
      });
    });
  }

  getUserName(userId: string): Promise<string> {
    return this.postService.creatorName(userId);
  }

  deletePost(postId: string): void {
    this.postService
      .deletePost(postId)
      .then(() => {
        this.posts = this.posts.filter((post) => post.id !== postId);
        this.toastr.success('Post deleted successfully');
      })
      .catch(() => {
        this.toastr.error('Failed to delete post');
      });
  }
  addPost(): void {
    this.router.navigateByUrl(`/subject/${this.subjectId}/addPost`);
  }
  updatePost(postId: string): void {
    this.router.navigateByUrl(`/subject/${this.subjectId}/addPost/${postId}`);
  }
  isAdmin(post: PostModel): boolean {
    return this.postService.isCreator(post);
  }
  back(): void {
    this.router.navigateByUrl('/subjectList');
  }
}
