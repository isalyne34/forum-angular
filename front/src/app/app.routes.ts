import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { SubjectListComponent } from './Pages/subject-list/subject-list.component';
import { CreateSubjectComponent } from './Pages/create-subject/create-subject.component';
import { PostListComponent } from './Pages/post-list/post-list.component';
import { CreatePostComponent } from './Pages/create-post/create-post.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'subjectList', component: SubjectListComponent },
  { path: 'addSubject/:id', component: CreateSubjectComponent },
  { path: 'addSubject', component: CreateSubjectComponent },
  { path: 'subject/:id/posts', component: PostListComponent },
  { path: 'subject/:id/addPost', component: CreatePostComponent },
  { path: 'subject/:id/addPost/:postId', component: CreatePostComponent },
];
