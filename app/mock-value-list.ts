import { ValueList } from './value-list';
import { ValueItem } from './value-item';

export var valueList : ValueList = new ValueList({
    name: "Value list 1",
    items: (function () {
        var listItems: ValueItem[] = [];
        for (var i: number = 0; i < 10; i++) {
            listItems.push({"value": "val" + i, "display": "disp" + i, "active": 0});
        }
        return listItems;
    })()
});