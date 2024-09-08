import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { INavigationItem } from 'interfaces/i-navigation-item';
import { Collapse } from 'bootstrap';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements AfterViewInit{
  public items: INavigationItem[] = [
    { link: 'recipes', name: 'Recipes' },
    { link: 'settings', name: 'Settings' },
  ];
  public collapse: Collapse | undefined;
  @ViewChild('navbarNav') navbarNav: ElementRef | undefined;

  public ngAfterViewInit(): void {
    this.collapse = new Collapse(this.navbarNav?.nativeElement);
  }

  public toggleNavbarNav(): void {
    if (this.collapse) {
      this.collapse.toggle();
    }
  }
}
