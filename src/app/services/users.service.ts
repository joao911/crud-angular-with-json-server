import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
@Injectable({ providedIn: 'root' })
export class UserService {
  private url = environment.api + '/users';
  constructor(private httpClient: HttpClient) {}
  obterUsers() {
    return this.httpClient.get<User[]>(this.url);
  }
  cadastrarUser(user: User) {
    return this.httpClient.post<User>(this.url, user);
  }

  editarUser(user: User) {
    return this.httpClient.put<User>(`${this.url}/${user.id}`, user);
  }

  removerUser(id: number) {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }
}
