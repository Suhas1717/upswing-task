import { Component } from '@angular/core';
import { ItemsComponent } from "./features/items/items.component";

@Component({
  selector: 'app-root',
  imports: [ItemsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'upswing-task';
}
