import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatioBoxViewerComponent } from './ratio-box-viewer/ratio-box-viewer.component';

@NgModule({
  declarations: [RatioBoxViewerComponent],
  exports: [RatioBoxViewerComponent],
  imports: [CommonModule],
})
export class RatioBoxViewerModule {}
