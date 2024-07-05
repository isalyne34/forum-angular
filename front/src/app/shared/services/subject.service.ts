import { Injectable, inject } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from '../../../environments/environment';
import { SubjectModel } from '../../interfaces/subject-model';
@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private pb: PocketBase;

  constructor() {
    this.pb = new PocketBase(environment.baseUrl);
  }

  public async getSubjects(): Promise<SubjectModel[]> {
    return await this.pb.collection('subject').getFullList();
  }

  public async getSubject(id: string): Promise<SubjectModel> {
    return await this.pb.collection('subject').getOne(id);
  }

  public async addSubject(data: any): Promise<SubjectModel> {
    let created_by: string = '';
    if (this.pb.authStore?.model) {
      created_by = this.pb.authStore?.model['id'];
    }
    data.created_by = created_by;
    return await this.pb.collection('subject').create(data);
  }

  public async updateSubject(
    id: string,
    data: Partial<SubjectModel>
  ): Promise<SubjectModel> {
    return await this.pb.collection('subject').update(id, data);
  }

  public async deleteSubject(id: string): Promise<any> {
    return await this.pb.collection('subject').delete(id);
  }

  isCreator(subject: SubjectModel): boolean {
    if (!this.pb.authStore?.model) {
      return false;
    }
    console.log('author', subject.created_by, this.pb.authStore?.model['id']);
    return subject.created_by === this.pb.authStore?.model['id'];
  }

  public async getPostCountForSubject(subjectId: string): Promise<number> {
    const posts = (await this.pb.collection('post').getFullList()).filter(
      (post: any) => post.subject === subjectId
    );
    console.log('posts', posts);
    return posts.length;
  }

  public async getLastPostDateForSubject(
    subjectId: string
  ): Promise<string | null> {
    const posts = (await this.pb.collection('post').getFullList({}))
      .filter((post: any) => post.subject === subjectId)
      .sort((a: any, b: any) => {
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      });

    console.log('posts', posts);
    return posts.length ? posts[0].created : null;
  }
}
