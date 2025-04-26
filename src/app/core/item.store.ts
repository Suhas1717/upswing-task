import { computed, Injectable, signal } from "@angular/core";
import { IItem } from "./interfaces/interface-item";


@Injectable({
  providedIn: 'root'
})

export class ItemStore {
  item$ = signal<IItem[]>([]);

  readonly items = computed(() => this.item$());

  get itemsList() {
    return this.items();
  }

  addItem(item: IItem) {
    this.item$.update((items) => [...items, item]);
  }

  removeItem(id: number) {
    this.item$.update((items) => items.filter(item => item.id !== id));
  }


}
