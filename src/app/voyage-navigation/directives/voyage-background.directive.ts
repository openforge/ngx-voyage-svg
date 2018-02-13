import { Directive, AfterViewInit, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { VoyageViewportComponent } from './../components/voyage-viewport.component';

@Directive({
  selector: '[voyageBackground]'
})
export class VoyageBackgroundDirective implements AfterViewInit {
  public get clientRect$(): Observable<ClientRect> {
    return this.clientRect.asObservable();
  }

  private clientRect: Subject<ClientRect> = new Subject();

  constructor(private elRef: ElementRef) {}

  public ngAfterViewInit() {
    // Hack: because Safari doesn't fire load event
    // on svg:image elements apparently
    // Optimally, we'd decorate onLoad with @HostListener('load')
    // which works just fine on Chrome ¯\_(ツ)_/¯
    const img = new Image();
    img.onload = this.onLoad.bind(this);
    img.src = this.elRef.nativeElement.getAttribute('xlink:href');
  }

  // @HostListener('load')
  private onLoad() {
    this.clientRect.next(this.elRef.nativeElement.getBoundingClientRect());
  }
}
