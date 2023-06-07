import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { FormsModule } from '@angular/forms';
import { SlideTypeTitlePipe } from './pipes/slide-type-title.pipe';

@NgModule({
  declarations: [PageNotFoundComponent, SlideTypeTitlePipe],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [TranslateModule, FormsModule, SlideTypeTitlePipe],
})
export class SharedModule {}
