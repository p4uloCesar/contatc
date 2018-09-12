import {ModelBase} from '../../model-base';
import {PhoneModel} from './phone-model';
import {AddressModel} from './address-model';



export class ContactModel extends ModelBase {
  public name: string;
  public address: AddressModel = new AddressModel();
  public email: any;
  public phone: PhoneModel[] = [];
  public phone_obj: PhoneModel[];
  public address_obj: AddressModel[];
}
