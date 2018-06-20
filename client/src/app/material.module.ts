import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatToolbarModule
} from '@angular/material';

const MATERIALS = [
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatMenuModule,
  MatInputModule,
  MatFormFieldModule
];

@NgModule({
  imports: MATERIALS,
  exports: MATERIALS
})
export class MaterialModule {

}
