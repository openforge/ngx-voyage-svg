import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { VoyagePathService } from './../services/voyage-path.service';

@Directive({ selector: '[voyageVoyager]' })
export class VoyageVoyagerDirective implements OnInit {
  public get el(): SVGGElement {
    return this.elRef.nativeElement;
  }

  private positionSubscription: Subscription;
  private initialX = 0;
  private initialY = 0;

  constructor(private elRef: ElementRef, private renderer: Renderer2, private voyagePathService: VoyagePathService) {}

  public ngOnInit() {
    const { e: x, f: y } = this.el.getCTM();

    this.initialX = x;
    this.initialY = y;

    this.positionSubscription = this.voyagePathService.currentPosition$.subscribe(currentPosition => {
      const { x, y } = currentPosition.point;
      this.setPosition(x, y);
    });
  }

  public ngOnDestroy() {
    this.positionSubscription.unsubscribe();
  }

  public setPosition(x: number, y: number) {
    const transform = `matrix(1 0 0 1 ${x + this.initialX} ${y + this.initialY})`;
    this.renderer.setAttribute(this.el, 'transform', transform);
  }
}
