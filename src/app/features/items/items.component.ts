import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { TableComponent } from "../shared/table/table.component";
import { ItemStore } from '../../core/item.store';
import { IItem } from '../../core/interfaces/interface-item';
import { GraphComponent } from "../shared/graph/graph.component";

@Component({
  selector: 'app-items',
  imports: [
    CommonModule, ReactiveFormsModule, InputTextModule, InputNumberModule,
    TextareaModule, ButtonModule, TableComponent,
    GraphComponent
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit {

  isDialogVisible: boolean = false;
  itemsForm: FormGroup = new FormGroup({});
  itemID: number = 0;

  constructor(public itemStore: ItemStore, private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
    this.formInit();
  }

  formInit() {
    this.itemsForm = this.formBuilder.group({
      id: [new Date().getTime()],
      itemName: ['', Validators.required],
      itemDescription: ['', Validators.required],
      itemPrice: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+$/)]],
      stock: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+$/)]],
      sold: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+$/)]],
      createdAt: ['']
    })
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  addNewItem() {
    if (this.itemsForm.valid) {
      this.itemsForm.patchValue({
        createdAt: new Date().toISOString(),
      });
      this.itemStore.addItem(this.itemsForm.value);
      this.formInit()
    }
  }

  removeItem(id: number) {
    this.itemStore.removeItem(id);
  }

  removeConfirmation(id: number) {
    this.itemID = id;
    this.isDialogVisible = true;
  }

  editItem(item: IItem) {
    this.itemsForm.patchValue({
      id: item.id,
      itemName: item.itemName,
      itemDescription: item.itemDescription,
      itemPrice: item.itemPrice,
      stock: item.stock,
      sold: item.sold,
      createdAt: item.createdAt
    });
    this.removeItem(item.id);
  }
}
