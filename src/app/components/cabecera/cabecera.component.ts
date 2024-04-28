// cabecera.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html'
})
export class CabeceraComponent implements OnInit {
  showHeader: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.updateHeaderVisibility();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateHeaderVisibility();
      });
  }

  private updateHeaderVisibility(): void {
    this.showHeader = !this.isLoginPage();
  }

  private isLoginPage(): boolean {
    
    return this.router.url === '/login';
  }
}
