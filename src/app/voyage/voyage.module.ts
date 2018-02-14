import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoyageViewportComponent } from './components/voyage-viewport.component';
import { VoyageWrapperDirective } from './directives/voyage-wrapper.directive';
import { VoyageBackgroundDirective } from './directives/voyage-background.directive';
import { VoyageNavigationService } from './services/voyage-navigation.service';
import { VoyageDestinationDirective } from './directives/voyage-destination.directive';

import 'hammerjs';

@NgModule({
  imports: [CommonModule],
  declarations: [
    VoyageViewportComponent,
    VoyageWrapperDirective,
    VoyageBackgroundDirective,
    VoyageDestinationDirective,
  ],
  exports: [
    VoyageViewportComponent,
    VoyageWrapperDirective,
    VoyageBackgroundDirective,
    VoyageDestinationDirective,
  ],
  providers: [VoyageNavigationService]
})
export class VoyageModule {}
