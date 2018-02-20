import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { VoyageNavigationService } from './voyage-navigation.service';
import { VoyageDestinationDirective } from './../directives/voyage-destination.directive';
import { VoyageActivePathDirective } from './../directives/voyage-active-path.directive';

@Injectable()
export class VoyagePathService {
  private currentPosition = new Subject<{point: SVGPoint, lengthAtPoint: number}>();
  public currentPosition$ = this.currentPosition.asObservable();
  public strokeLength = 0;

  private totalLength: number;
  private animationHandle: number;

  constructor(
    private voyageNavigationService: VoyageNavigationService
  ) {}

  public animateLength(activePath: VoyageActivePathDirective, destinations: VoyageDestinationDirective[]) {
    this.totalLength = activePath.el.getTotalLength();

    this.stopAnimation();
    this.startAnimation(activePath, destinations);
  }

  public stopAnimation() {
    cancelAnimationFrame(this.animationHandle);
  }

  public startAnimation(activePath, destinations) {
    const animationFn = () => this.animatePath(activePath, destinations);
    this.animationHandle = this.voyageNavigationService.updateSVG(animationFn);
  }

  private animatePath(activePath: VoyageActivePathDirective, destinations: VoyageDestinationDirective[]) {
    this.strokeLength += 4;

    if (this.strokeLength > this.totalLength) {
      this.strokeLength = this.totalLength;
    }

    activePath.setStrokeDasharray(`${this.strokeLength} ${this.totalLength}`);

    const point = activePath.el.getPointAtLength(this.strokeLength);
    this.voyageNavigationService.centerTo(point.x, point.y);
    this.currentPosition.next({ point, lengthAtPoint: this.strokeLength });

    if (this.strokeLength === this.totalLength) {
      return;
    }

    this.startAnimation(activePath, destinations);
  }
}
