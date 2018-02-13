import { Component } from '@angular/core';

@Component({
  selector: 'voyage-root',
  template: `
    <voyage-viewport>
      <svg:svg width="100%" height="100%">
        <svg:g voyageWrapper>
          <svg:image voyageBackground [attr.xlink:href]="image">
          </svg:image>
        </svg:g>
      </svg:svg>
    </voyage-viewport>
  `,
  styles: []
})
export class AppComponent {
  image = 'https://upload.wikimedia.org/wikipedia/en/d/d3/USA-states.PNG';
}
