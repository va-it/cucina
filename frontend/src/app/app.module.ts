import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from 'components/navigation/navigation.component';
import { RecipesService } from 'services/recipes/recipes.service';
import { HttpClientModule } from '@angular/common/http';
import { RecipesComponent } from 'components/recipes/recipes.component';
import { AddRecipeFormComponent } from 'components/add-recipe-form/add-recipe-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from 'components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RecipesComponent,
    AddRecipeFormComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    RecipesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
