import {ValueItem} from './value-item';

export class ValueList {
    name: string;
    items: ValueItem[];
    filterIdentity: number;
    
    constructor(parameters) {
        this.name = parameters.name;
        this.items = parameters.items || [];
        this.filterIdentity = this.items.length;
    }
}
