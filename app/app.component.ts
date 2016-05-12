import {Component} from 'angular2/core';
import {ValueItem} from './value-item';
import {ValueList} from './value-list';
import {ListViewComponent} from './list-view.component';



@Component({
    selector: 'tmapp',
    template: `
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
    `,
    directives: [ListViewComponent]
})

export class AppComponent {
    logo = "http://www.tailorednews.com/Test/tmailLogo_new_small_0.jpg";
    tmDropDownList = TMDropDownList;
    selectedListItem: ValueItem;
    
    onSelect(item: ValueItem) {
        this.selectedListItem = item;
    }
    onSave(item: ValueItem) {
        console.log(item);
        console.log(this.selectedListItem);
    }
}

var TMDropDownList: ValueList;

(function () {
    var listItems: ValueItem[] = [];
    for (var i: number = 0; i < 10; i++) {
        listItems.push({"value": "val" + i, "display": "disp" + i, "active": 0});
    }
    var ddls: ValueList = {
        name: "Value_list_1",
        filterIdentity: 10,
        items: listItems
    };
    TMDropDownList = ddls;
})();
