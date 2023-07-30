import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BACKEND_URL, CITIES, CURRENT_USER, USER_PATH } from '../const';
import { User } from '../common-types/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  readonly CITIES = CITIES;

  username: string = '';
  jwt: string = '';
  name: string = '';
  surname: string = '';
  city: string = '';
  birthDate = new FormControl(new Date());
  tickets = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const val = localStorage.getItem(CURRENT_USER);
    if (val) {
      const user: Omit<User, 'password'> = JSON.parse(val);
      this.setFormValues(user);
    }
  }

  updateUserInfo() {
    this.http.patch(`${BACKEND_URL}/${USER_PATH}`, {
      jwt: this.jwt,
      name: this.name,
      surname: this.surname,
      city: this.city,
      birthDate: this.birthDate.value,
    }).subscribe((data) => {
      this.setFormValues(data as Omit<User, 'password'>);
      console.log('updated, get', data)
    })
  }

  setFormValues(user: Omit<User, 'password'>) {
    this.username = user.username;
    this.jwt = user.jwt;
    this.name = user.name;
    this.surname = user.surname;
    this.city = user.city;
    this.birthDate.setValue(new Date(user.birthDate));
  }
}
