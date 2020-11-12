import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CasePipe } from './pipes/case.pipe';

@NgModule({
  declarations: [
    CasePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CasePipe
  ]
})
export class BaseModule {}
