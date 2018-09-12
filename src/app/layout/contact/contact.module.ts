import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule,
    MatPaginatorModule, MatSelectModule,
    MatTableModule
} from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { StatModule } from '../../shared/modules/stat/stat.module';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactListComponent } from '../contact/contact-list/contact-list.component';
import {AddressService, ContactService, PhoneService} from './contact.service';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    entryComponents: [ContactDialogComponent],
    imports: [
        CommonModule,
        FormsModule,
        ContactRoutingModule,
        MatGridListModule,
        StatModule,
        MatCardModule,
        FlexLayoutModule,
        MatDialogModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatChipsModule,
        MatSelectModule,
        MatMenuModule
    ],
    declarations: [
        ContactListComponent, ContactDialogComponent],
    providers: [ContactService, PhoneService, AddressService]
})
export class ContactModule {}
