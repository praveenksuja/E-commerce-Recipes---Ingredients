import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  onLoaded = 'recipe';

  onNavigate(featured: string) {
    this.onLoaded = featured;
  }

}
