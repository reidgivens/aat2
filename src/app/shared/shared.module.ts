import { NgModule } from '@angular/core';
import {FileSizePipe } from "../archive-search/pipes/file-size.pipe";

@NgModule({
  imports: [],
  declarations: [FileSizePipe],
  exports: [FileSizePipe]
})
export class SharedModule { }
