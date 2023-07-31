import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Breadcrumb } from 'src/app/common-types/bread-crumb';
import { BreadcrumbService } from 'src/app/services/bread-crumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss'],
})
export class BreadcrumbComponent {
  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(private readonly breadcrumbService: BreadcrumbService) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
  }
} 