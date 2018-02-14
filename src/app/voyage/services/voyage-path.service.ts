import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { VoyageNavigationService } from './voyage-navigation.service';
import { VoyageDestinationDirective } from './../directives/voyage-destination.directive';
import { VoyageActivePathDirective } from './../directives/voyage-active-path.directive';

@Injectable()
export class VoyagePathService {
  private currentPoint = new Subject<SVGPoint>();
  public currentPoint$ = this.currentPoint.asObservable();

  private totalLength: number;
  private strokeLength = 0;
  private animationHandle: number;

  constructor() {}

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
    this.currentPoint.next(center);

    this.toggleReachedDestinations(destinations);

    if (this.strokeLength === this.totalLength) {
      return;
    }

    this.animationHandle = requestAnimationFrame(() => this.animate(activePath, destinations));
  }

  private toggleReachedDestinations(destinations: VoyageDestinationDirective[]) {
    destinations
      .filter(destination => destination.pathLengthAtPoint <= this.strokeLength && !destination.isReached)
      .forEach(destination => (destination.isReached = true));
  }
}
