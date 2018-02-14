import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[voyageDestination]'
})
export class VoyageDestinationDirective {
  @Input() public point: {x: number, y: number};
  @Input() public requiredProgress: number;

  public get el(): SVGElement {
    return this.elRef.nativeElement;
  }

  public pathLengthAtPoint = 0;

  constructor(
    private elRef: ElementRef,
  ) {}

}
