import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from 'components/navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipesComponent } from 'components/recipes/recipes.component';
import { RecipeFormComponent } from 'components/recipe-form/recipe-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from 'components/settings/settings.component';
import { RecipeComponent } from 'components/recipe/recipe.component';
import { ApiResponseComponent } from 'components/api-response/api-response.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RecipesComponent,
    RecipeComponent,
    RecipeFormComponent,
    SettingsComponent,
    ApiResponseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
