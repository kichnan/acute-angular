//import core components
import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';

//import models
import {ValueItem} from './value-item';
import {ValueList} from './value-list';

//import components
import {ListViewComponent} from './list-view.component';

//import services
import {ValueListService} from './value-list.service';


//define base component for your application
@Component({
    selector: 'tmapp',
    template: `
    <div *ngIf="tmDropDownList">
    <h1>
        <img src="{{logo}}" height="24" />
        {{tmDropDownList.name}} Dropdown list editor
    </h1>
    <listview [listItems]="tmDropDownList.items"
        [selectedItem]="selectedListItem"></listview>
    <div *ngIf="selectedListItem">
        <div>
            <label>Value: </label>
            <input type="text" [(ngModel)]="selectedListItem.value" />
        </div>
        <div>
            <label>Display: </label>
            <input type="text" [(ngModel)]="selectedListItem.display" />
        </div>
        <div>
            <input type="submit" value="Save" (click)="onSave()" />
        </div>
    </div>
    </div>
    `,
    directives: [ListViewComponent],
    providers: [ValueListService]
})


//define main Components class, properties and functions
export class AppComponent implements OnInit {
    logo = "https://assets-cdn.github.com/images/modules/logos_page/Octocat.png";
    tmDropDownList: ValueList;
    selectedListItem: ValueItem;
    
    //constructors and implemented functions
    constructor(private valueListSvc: ValueListService) { }
    
    ngOnInit() {
        this.getValueList();
    }
    
    
    //service getters
    getValueList() {
        this.valueListSvc.getValueList().then(myList => this.tmDropDownList = myList);
    }
    
    
    //events
    onSelect(item: ValueItem) {
        this.selectedListItem = item;
    }
    
    onSave(item: ValueItem) {
        console.log(item);
        console.log(this.selectedListItem);
    }
}
