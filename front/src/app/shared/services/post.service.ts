import { Injectable, inject } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from '../../../environments/environment';
import { PostModel } from '../../interfaces/post-model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private pb: PocketBase;

  constructor() {
    this.pb = new PocketBase(environment.baseUrl);
  }

  public async getPosts(): Promise<PostModel[]> {
    return await this.pb.collection('post').getFullList();
  }

  public async getPost(id: string): Promise<PostModel> {
    return await this.pb.collection('post').getOne(id);
  }

  public async addPost(data: Partial<PostModel>): Promise<PostModel> {
    if (this.pb.authStore?.model) {
      let created_by = this.pb.authStore?.model['id'];
      this.pb
        .collection('users')
        .getOne(created_by)
        .then((res: any) => {
          data.created_by = res.id;
        });
    }
    data.created = new Date().toISOString();
    try {
      return await this.pb.collection('post').create(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async updatePost(
    id: string,
    data: Partial<PostModel>
  ): Promise<PostModel> {
    data.created = new Date().toISOString();
    return await this.pb.collection('post').update(id, data);
  }

  public async deletePost(id: string): Promise<any> {
    return await this.pb.collection('post').delete(id);
  }

  isCreator(post: PostModel): boolean {
    if (!this.pb.authStore?.model) {
      return false;
    }
    return post.created_by === this.pb.authStore?.model['id'];
  }

  creatorName(id: string): Promise<string> {
    return this.pb
      .collection('users')
      .getOne(id)
      .then((res: any) => {
        return res.username;
      });
  }
}
