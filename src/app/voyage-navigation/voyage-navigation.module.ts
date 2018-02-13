import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoyageViewportComponent } from './components/voyage-viewport.component';
import { VoyageWrapperDirective } from './directives/voyage-wrapper.directive';
import { VoyageBackgroundDirective } from './directives/voyage-background.directive';
import { VoyageNavigationService } from './services/voyage-navigation.service';

import 'hammerjs';

@NgModule({
  imports: [CommonModule],
  declarations: [
    VoyageViewportComponent,
    VoyageWrapperDirective,
    VoyageBackgroundDirective
  ],
  exports: [
    VoyageViewportComponent,
    VoyageWrapperDirective,
    VoyageBackgroundDirective
  ],
  providers: [VoyageNavigationService]
})
export class VoyageNavigationModule {}
