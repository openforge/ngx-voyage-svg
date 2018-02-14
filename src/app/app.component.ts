import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, merge, delay } from 'rxjs/operators';

import { linearInterpolation } from './shared/utils';

@Component({
  selector: 'voyage-root',
  template: `
    <ng-container *ngIf="voyageData$ | async as data">
      <voyage-viewport>
        <svg:svg width="100%" height="100%">
          <svg:g voyageWrapper>
            <svg:image voyageBackground [attr.xlink:href]="image">
            </svg:image>

            <ng-container *ngFor="let stop of data.stops">
              <svg:circle voyageDestination [point]="{x: stop.x, y: stop.y}" [attr.cx]="stop.x" [attr.cy]="stop.y" r="12.5"
                (click)="handleStopClick(stop)">
              </svg:circle>

              <ng-container *ngFor="let subStop of stop.subStops">
                <svg:circle voyageDestination [point]="{x: subStop.x, y: subStop.y}" [attr.cx]="subStop.x" [attr.cy]="subStop.y" r="7" fill="#FFFFFF"
                  (click)="handleSubStopClick(stop, subStop)">
                </svg:circle>
              </ng-container>
            </ng-container>
          </svg:g>
        </svg:svg>
      </voyage-viewport>
    </ng-container>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  image = '/assets/usa-map.jpg';
  voyageData$: any;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    const oneData$ = this.httpClient.get('/assets/test-data.json');
    const twoData$ = this.httpClient.get('/assets/test-data-1.json');

    this.voyageData$ = oneData$
    .pipe(
      // merge(twoData$.pipe(delay(1000))),
      // merge(oneData$.pipe(delay(2000))),
      // merge(twoData$.pipe(delay(3000))),
      // merge(oneData$.pipe(delay(4000))),
      // merge(twoData$.pipe(delay(5000))),
      // merge(oneData$.pipe(delay(6000))),
      // merge(twoData$.pipe(delay(7000))),
      // merge(oneData$.pipe(delay(8000))),
      // merge(twoData$.pipe(delay(9000))),
      // merge(oneData$.pipe(delay(10000))),
      map((data: any) => {
        data.stops = data.stops.map((stop, stopIdx) => {
          return {
            ...stop,
            x: usaMapStops[stopIdx].x,
            y: usaMapStops[stopIdx].y,
            subStops: stop.subStops.map((subStop, subStopIdx) => {
              const pt = linearInterpolation(
                {x: usaMapStops[stopIdx].x, y: usaMapStops[stopIdx].y},
                {x: usaMapStops[stopIdx + 1].x, y: usaMapStops[stopIdx + 1].y},
                (subStopIdx + 1) / (stop.subStops.length + 1)
              );

              return {
                ...subStop,
                x: pt.x,
                y: pt.y,
              };
            })
          };
        });
        return data;
      }),
      tap((data) => console.log(data))
    );
  }

  handleStopClick(...args) {
    console.log('stop clicked', args);
  }

  handleSubStopClick(...args) {
    console.log('substop clicked', args);
  }
}

const usaMapStops = [
  { x: 1628, y: 163 }, // 1
  { x: 1628, y: 217 }, // 2
  { x: 1508, y: 304 }, // 3
  { x: 1434, y: 667 }, // 4
  { x: 1248, y: 562 }, // 5
  { x: 1140, y: 793 }, // 6
  { x: 880, y: 763 }, // 7
  { x: 950, y: 243 }, // 8
  { x: 450, y: 263 }, // 9
  { x: 595, y: 383 }, // 10
  { x: 314, y: 537 }, // 11
  { x: 92, y: 429 }, // 12
  { x: 165, y: 139 }, // 13
];

