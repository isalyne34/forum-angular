import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SubjectListComponent } from './Pages/subject-list/subject-list.component';
import { HeaderComponent } from './Pages/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SubjectListComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'forumAngular';
}
