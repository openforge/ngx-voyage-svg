import { Injectable } from '@angular/core';

import { VoyageNavigationService } from './voyage-navigation.service';
import { VoyageDestinationDirective } from '../directives/voyage-destination.directive';
import { VoyageActivePathDirective } from '../directives/voyage-active-path.directive';

@Injectable()
export class VoyagePathService {
  totalLength: number;
  strokeLength = 0;
  animationHandle: number;

  constructor(
    private voyageNavigationService: VoyageNavigationService
  ) {}

  public animateLength(activePath: VoyageActivePathDirective, destinations: VoyageDestinationDirective[]) {
    this.totalLength = activePath.el.getTotalLength();

    this.toggleReachedDestinations(destinations);

    this.animationHandle = requestAnimationFrame(() => this.animate(activePath, destinations));
  }

  public stopAnimation() {
    cancelAnimationFrame(this.animationHandle);
  }

  private animate(activePath: VoyageActivePathDirective, destinations: VoyageDestinationDirective[]) {
    this.strokeLength += 4;

    if (this.strokeLength > this.totalLength) {
      this.strokeLength = this.totalLength;
    }

    activePath.setStrokeDasharray(`${this.strokeLength} ${this.totalLength}`);
    const center = activePath.el.getPointAtLength(this.strokeLength);
    this.voyageNavigationService.centerTo(center.x, center.y);

    this.toggleReachedDestinations(destinations);

    if (this.strokeLength === this.totalLength) {
      return;
    }

    requestAnimationFrame(() => this.animate(activePath, destinations));
  }

  private toggleReachedDestinations(destinations: VoyageDestinationDirective[]) {
    destinations
      .filter(destination => destination.pathLengthAtPoint <= this.strokeLength && !destination.isReached)
      .forEach(destination => (destination.isReached = true));
  }
}
