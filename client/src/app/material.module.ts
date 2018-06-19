import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatToolbarModule } from '@angular/material';

const MATERIALS = [
  MatButtonModule,
  MatToolbarModule,
  MatCardModule
];

@NgModule({
  imports: MATERIALS,
  exports: MATERIALS
})
export class MaterialModule {

}
