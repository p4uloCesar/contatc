import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: string;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Paulo', weight: '3333-3333', symbol: 'Fixo' },
    { position: 2, name: 'Paulo', weight: '3333-3333', symbol: 'Celular' },
    { position: 3, name: 'Paulo', weight: '3333-3333', symbol: 'Fixo' },
    { position: 4, name: 'Paulo', weight: '3333-3333', symbol: 'Celular' },
    { position: 5, name: 'Paulo', weight: '3333-3333', symbol: 'Fixo' },
    { position: 6, name: 'Paulo', weight: '3333-3333', symbol: 'Celular' },
    { position: 7, name: 'Paulo', weight: '3333-3333', symbol: 'Fixo' }
];

@Component({
    selector: 'app-contact',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
    displayedColumns = ['position', 'name', 'weight', 'symbol'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    places: Array<any> = [];

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    constructor() {
        this.places = [
            {
                imgSrc: 'assets/images/card-1.jpg',
                place: 'Cozy 5 Stars Apartment',
                description:
                    'The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona.',
                charge: '$899/night',
                location: 'Barcelona, Spain'
            },
            {
                imgSrc: 'assets/images/card-2.jpg',
                place: 'Office Studio',
                description:
                    'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.',
                charge: '$1,119/night',
                location: 'London, UK'
            },
            {
                imgSrc: 'assets/images/card-3.jpg',
                place: 'Beautiful Castle',
                description:
                    'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Milan.',
                charge: '$459/night',
                location: 'Milan, Italy'
            }
        ];
    }

    ngOnInit() {}
}
