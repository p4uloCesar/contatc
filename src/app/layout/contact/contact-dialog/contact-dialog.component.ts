import {Component, Inject, OnInit} from '@angular/core';
import {ContactModel} from '../contact-model';
import {PhoneModel} from '../phone-model';
import {ToastService} from '../../../service/toast.service';
import {AddressService, ContactService, PhoneService} from '../contact.service';
import {AddressModel} from '../address-model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss']
})
export class ContactDialogComponent implements OnInit {
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    numberVal: string;
    typeVal: number;

    typePhone = [
        {value: '1', viewValue: 'Celular'},
        {value: '2', viewValue: 'Fixo'},
        {value: '3', viewValue: 'Outro'}
    ];

  constructor(
      public dialogRef: MatDialogRef<ContactDialogComponent>,
      @Inject(MAT_DIALOG_DATA)public contact: ContactModel,
      private toast: ToastService,
      public service: ContactService,
      public servicePhone: PhoneService,
      public serviceAddress: AddressService,
  ) { }

  ngOnInit() {}


   public remove(phone: PhoneModel) {
      if (phone.id) {
              this.servicePhone.delete(phone.id).subscribe(
                  (response) => {
                      this.toast.success('Sucesso', 'Telefone excluido');
                  },
                  ex => {
                  });
      }
      const index = this.contact.phone.indexOf(phone);
        if (index >= 0) {
            this.contact.phone.splice(index, 1);
        }
    }

    add(): void {
        let phone = new PhoneModel();
        let exist = false;
        phone.number = this.numberVal;
        phone.type = this.typeVal;
        console.log(this.contact);
        if(this.contact.phone.length > 0 ){
            this.contact.phone.forEach(function(item) {
                if (item.number === phone.number) {
                    exist = true;
                }
            });
        }
        if (exist) {
            this.toast.error('Erro', 'Telefone já adicionado');
        } else if (phone.number && phone.type) {
                this.contact.phone.push(phone);
        }
    }

    public saveContact(id_address, id_phone): void {
        this.contact.address = id_address;
        this.contact.phone = id_phone;
        if (!this.contact.id) {
            this.saveNewContact();
        } else {
            this.updateContact();
        }
    }

    private saveNewContact() {
        this.service.save(this.contact).subscribe(
            (response) => {
                this.toast.success('Sucesso', 'Contato salvo com sucesso');
                this.closeDialog();
            },
            ex => {
            });
    }

    private updateContact() {
        this.service.update(this.contact.id, this.contact).subscribe(
            (response) => {
                this.toast.success('Sucesso', 'Contato salvo com sucesso');
                this.closeDialog();
            },
            ex => {
            });
    }

    public savePhone(): any {
        const id_phone = [];
        this.servicePhone.saveAll(this.contact.phone).subscribe(
            (response) => {
                response.forEach(function (phone) {
                    id_phone.push(phone.id);
                });
            },
            ex => {
            });
        return id_phone;
    }
    public saveAddress(id_phone: any[]) {
        this.serviceAddress.save(this.contact.address).subscribe(
            (response) => {
                this.saveContact(response.id, id_phone);
            },
            ex => {
            });
    }

    public save(): void {
      if(this.contact.phone.length > 0) {
          if (!this.contact.id) {
              this.saveAddress(this.savePhone());
          } else {
              this.updateAddress(this.savePhone());
          }
      } else {
          this.toast.error('Erro', 'Informe pelo menos um telefone');
      }
    }

    private updateAddress(id_phone: any[]) {
        this.serviceAddress.update(this.contact.address.id, this.contact.address).subscribe(
            (response) => {
                this.saveContact(response.id, id_phone);
            },
            ex => {
            });
    }

    public closeDialog(): void {
        this.dialogRef.close(false);
    }
}
