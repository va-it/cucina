import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from 'components/recipes/recipes.component';
import { SettingsComponent } from 'components/settings/settings.component';
import { RecipeComponent } from 'components/recipe/recipe.component';

const routes: Routes = [
  {
    path: 'recipes',
    children: [
      {
        path: '',
        component: RecipesComponent
      },
      {
        path: ':id',
        component: RecipeComponent
      }
    ]
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  { path: '**', redirectTo: 'recipes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
