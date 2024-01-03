import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { UserService } from './services/users.service';
import { User } from './models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'crud-with-json-server';
  // users: User[] = [];
  users$ = new Observable<User[]>();

  //form
  id = '';
  name = '';
  email = '';
  company = '';

  constructor(private userService: UserService) {
    this.getUser();
  }

  getUser() {
    // this.userService.obterUsers().subscribe((users) => {
    //   this.users = users;
    // });
    this.users$ = this.userService.obterUsers();
  }
  registerOrUpdateUser() {
    if (!this.name || !this.email || !this.company) {
      alert('Preencha todos os campos');
      return;
    }
    console.log('id => ', this.id);
    if (this.id) {
      this.updateUser();
      return;
    }
    const user: User = {
      name: this.name,
      email: this.email,
      company: this.company,
    };
    this.id = '';
    this.name = '';
    this.email = '';
    this.company = '';
    this.userService.cadastrarUser(user).subscribe((_) => this.getUser());
  }

  updateUser() {
    this.userService
      .editarUser({
        id: Number(this.id),
        name: this.name,
        email: this.email,
        company: this.company,
      })
      .subscribe((_) => this.getUser());
    this.id = '';
    this.name = '';
    this.email = '';
    this.company = '';
  }

  preencherCampos(user: User) {
    this.id = user.id!.toString();
    this.name = user.name;
    this.email = user.email;
    this.company = user.company;
  }

  deleteUser(id: number) {
    this.userService.removerUser(Number(id)).subscribe((_) => this.getUser());
  }

  resetFormFields() {
    // Defina as propriedades como strings vazias após a criação ou atualização do usuário
    this.name = '';
    this.email = '';
    this.company = '';
  }
}
