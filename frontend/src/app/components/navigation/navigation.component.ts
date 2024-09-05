import { Component } from '@angular/core';
import { INavigationItem } from 'interfaces/i-navigation-item';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  public items: INavigationItem[] = [
    { link: 'recipes', name: 'Recipes' },
    { link: 'settings', name: 'Settings' },
  ]
}
