import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '../../directives/directives.module';
import { SmallCardModule } from './small-card/small-card.module';
import { LargeCardModule } from './large-card/large-card.module';

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    SmallCardModule,
    LargeCardModule,
  ],
  declarations: [
  ],
  exports: [
    SmallCardModule,
    LargeCardModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CardItemModule { }
