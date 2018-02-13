import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VoyageNavigationModule } from './voyage-navigation/voyage-navigation.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, VoyageNavigationModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
