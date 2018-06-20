import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule, MatIconModule,
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
  MatIconModule,
  MatFormFieldModule
];

@NgModule({
  imports: MATERIALS,
  exports: MATERIALS
})
export class MaterialModule {

}
