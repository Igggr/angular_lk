import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BACKEND_URL, CITIES, CURRENT_USER, USER_PATH } from '../../const';
import { UserInfo } from '../../common-types/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  readonly CITIES = CITIES;

  username = '';
  jwt = '';
  name = '';
  surname = '';
  city = '';
  birthDate = new FormControl(new Date());
  tickets = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const val = localStorage.getItem(CURRENT_USER);
    if (val) {
      const user: UserInfo = JSON.parse(val);
      this.setFormValues(user);
    }
  }

  updateUserInfo() {
    this.http.patch<UserInfo>(`${BACKEND_URL}/${USER_PATH}`, {
      jwt: this.jwt,
      name: this.name,
      surname: this.surname,
      city: this.city,
      birthDate: this.birthDate.value,
    }).subscribe((data) => {
      this.setFormValues(data);
      console.log('updated, get', data)
    })
  }

  setFormValues(user: UserInfo) {
    this.username = user.username;
    this.jwt = user.jwt;
    this.name = user.name;
    this.surname = user.surname;
    this.city = user.city;
    this.birthDate.setValue(new Date(user.birthDate));
  }
}
