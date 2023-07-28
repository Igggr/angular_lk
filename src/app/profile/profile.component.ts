import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CITIES, CURRENT_USER } from '../const';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  readonly CITIES = CITIES;

  city: string = '';
  birthDate = new FormControl(new Date());

  ngOnInit() {
    const user = localStorage.getItem(CURRENT_USER);
    console.log('current user')
    console.log(user);
  }
}
