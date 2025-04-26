import { Component, EventEmitter, inject, Inject, Input, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { IItem } from '../../../core/interfaces/interface-item';
import { ItemStore } from '../../../core/item.store';

@Component({
  selector: 'app-table',
  imports: [TableModule, Dialog, ButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  constructor(private itemStore: ItemStore) { }

  @Output() selectedItem = new EventEmitter<IItem>();

  @Input() items: IItem[] = [];
  isDialogVisible: boolean = false;
  itemID: number = 0;

  removeItem(id: number) {
    this.itemStore.removeItem(id);
  }

  removeConfirmation(id: number) {
    this.itemID = id;
    this.isDialogVisible = true;
  }

  selectItem(item: IItem) {
    // this.selectedItem = item;
    this.selectedItem.emit(item);
  }
}
