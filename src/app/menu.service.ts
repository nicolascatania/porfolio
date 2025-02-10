import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private isMenuOpen = new BehaviorSubject<boolean>(false);
  menuState$ = this.isMenuOpen.asObservable();

  toggleMenu(): void {
    this.isMenuOpen.next(!this.isMenuOpen.value);
  }

  closeMenu(): void {
    this.isMenuOpen.next(false);
  }
}