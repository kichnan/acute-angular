import {Component, Input} from 'angular2/core';

@Component({
    selector: 'listview',
    template: `
    <ul class="ddl">
        <li *ngFor="#item of listItems" (click)="onSelect(item)"
             [class.selected]="item === selectedItem">
            {{item.value}} - {{item.display}}
        </li>
    </ul>
    `,
    styles: [`
    ul.ddl {
        list-style: none;
        width: 200px;
    }
    ul.ddl > li {
        padding: 5px 10px 10px;
        background-color: #f0f0f0;
    }
    ul.ddl > li.selected {background-color: #ccc;}
    `]
})

/**
 * ListViewComponent
 */
export class ListViewComponent {
    @Input()
    listItems;
    
    @Input()
    selectedItem;
    
    onSelect(item) {
        this.selectedItem = item;
    }

    // @Output()
    // itemSelected = new EventEmitter();
}