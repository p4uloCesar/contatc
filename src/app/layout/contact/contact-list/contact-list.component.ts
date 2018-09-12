import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {ContactService, PhoneService} from '../contact.service';
import {ContactModel} from '../contact-model';
import {Utils} from '../../../util/utils';
import {ContactDialogComponent} from '../contact-dialog/contact-dialog.component';
import {AddressModel} from '../address-model';
import {ToastService} from '../../../service/toast.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, AfterViewInit {
    displayedColumns = ['name', 'number', 'type', 'email', 'settings'];
    dataSource = new MatTableDataSource();
    public contact: ContactModel[];
    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    phoneList = [];
    list_type = [];

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    constructor( private toast: ToastService,
                 public service: ContactService,
                 public servicePhone: PhoneService,
                 public dialog: MatDialog
    ){}

    ngOnInit() {
        this.paginator.pageIndex = 0;
        this.paginator.pageSize = 10;
        this.paginator.pageSizeOptions = [10, 20, 30, 40, 50];
        this.retrieveList();
    }

    ngAfterViewInit(){}

    public addValuesCards() {
        this.list_type[4] = 0;
        this.servicePhone.getTypePhone().subscribe(
            response => {
                this.phoneList = response;
                this.phoneList.forEach(type => {
                    this.list_type[type.type] = type.experiments;
                    this.list_type[4] = this.list_type[4] + this.list_type[type.type];
                });
            },
            ex => {
            }
        );
    }

    public retrieveList(): void {
        this.service.clearParameter();
        this.service.addParameter('limit', String(this.paginator.pageSize));
        this.service.addParameter('offset',
            String(Utils.getOffset(this.paginator.pageIndex, this.paginator.pageSize))
        );
        this.service.getPaginated().subscribe(
            response => {
                this.contact = response.results;
                this.paginator.length = response.count;
                this.dataSource = new MatTableDataSource(this.contact);
                this.addValuesCards();
            },
            ex => {
            }
        );
    }

    public typePhone(element: number) {
        if (element === 1) {
            return 'Celular';
        } else if (element === 2) {
            return 'Fixo';
        } else if (element === 3) {
            return 'Fixo';
        } else {
            return '';
        }
    }

    public delete(element: any){
        this.service.delete(element.id).subscribe(
        (response) => {
            this.toast.success('Sucesso', 'Telefone excluido');
            this.retrieveList();
        },
        ex => {
        });
    }
    public openCreateDialog(contact: ContactModel): void {
        const data = contact ? {id: contact.id, name: contact.name, email: contact.email, address : contact.address_obj, phone: contact.phone_obj} :
                {name: '', email: '', address : new AddressModel(), phone: []};
        this.dialog.open(ContactDialogComponent, {
            width: '800px',
            data: data
        }).afterClosed().subscribe(result => {
                this.retrieveList();
        });
    }

}
