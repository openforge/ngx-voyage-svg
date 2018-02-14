import { Directive, OnInit, Input, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators';

import { VoyagePathService } from './../services/voyage-path.service';

@Directive({
  selector: '[voyageDestination]',
  exportAs: 'voyageDestination',
})
export class VoyageDestinationDirective implements OnInit {
  @Input() public point: {x: number, y: number};
  @Input() public requiredProgress: number;

  private positionSubscription: Subscription;

  public get el(): SVGElement {
    return this.elRef.nativeElement;
  }

  public pathLengthAtPoint = 0;
  public isReached = false;

  constructor(
    private elRef: ElementRef,
    private voyagePathService: VoyagePathService
  ) {}

  public ngOnInit() {
    this.positionSubscription = this.voyagePathService.currentPosition$
      .pipe(filter(() => !this.isReached))
      .subscribe(currentPosition => {
        this.isReached = currentPosition.lengthAtPoint >= this.pathLengthAtPoint;
      });
  }
}
