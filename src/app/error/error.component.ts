import { Component } from '@angular/core';;
import { Router } from '@angular/router';


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  constructor(
    private readonly router: Router,
  ) { }

  get url() {
    return this.router.routerState.snapshot.url;
  }

}
