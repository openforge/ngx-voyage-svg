import {
  Directive,
  OnInit,
  OnDestroy,
  Input,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { takeWhile, filter } from 'rxjs/operators';

import { VoyagePathService } from './../services/voyage-path.service';

@Directive({
  selector: '[voyageDestination]',
  exportAs: 'voyageDestination',
})
export class VoyageDestinationDirective implements OnInit, OnDestroy {
  @Input() public point: { x: number; y: number };
  @Input() public requiredProgress: number;

  private positionSubscription: Subscription;

  public get el(): SVGElement {
    return this.elRef.nativeElement;
  }

  public pathLengthAtPoint = 0;
  public isReached = false;

  constructor(
    private elRef: ElementRef,
    private voyagePathService: VoyagePathService,
    private cdRef: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    this.positionSubscription = this.voyagePathService.currentPosition$
      .pipe(
        takeWhile(() => !this.isReached),
        filter(currentPosition => currentPosition.lengthAtPoint >= this.pathLengthAtPoint),
      )
      .subscribe(() => {
        this.isReached = true;
        this.cdRef.detectChanges();
      });
  }

  public ngOnDestroy() {
    this.positionSubscription.unsubscribe();
  }
}
