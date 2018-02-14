import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[voyageDestination]'
})
export class VoyageDestinationDirective {
  @Input() public point: {x: number, y: number};

  public get el(): SVGElement {
    return this.elRef.nativeElement;
  }

  constructor(
    private elRef: ElementRef,
  ) {}

}
