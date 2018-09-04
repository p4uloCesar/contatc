import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';

import { StatModule } from '../../shared/modules/stat/stat.module';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactListComponent } from '../contact/contact-list/contact-list.component';

@NgModule({
    imports: [
        CommonModule,
        ContactRoutingModule,
        MatGridListModule,
        StatModule,
        MatCardModule,
        FlexLayoutModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule
    ],
    declarations: [ContactListComponent]
})
export class ContactModule {}
