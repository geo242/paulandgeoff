import { NgModule } from '@angular/core';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule, MatChipsModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule,
  MatMenuModule, MatProgressSpinnerModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';

const MATERIALS = [
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatMenuModule,
  MatInputModule,
  MatIconModule,
  MatFormFieldModule,
  MatChipsModule,
  MatListModule,
  MatBadgeModule,
  MatTooltipModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: MATERIALS,
  exports: MATERIALS
})
export class MaterialModule {

}
