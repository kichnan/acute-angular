import { Injectable } from 'angular2/core';
import { valueList } from './mock-value-list';

@Injectable()
export class ValueListService {
    getValueList() {
        return Promise.resolve(valueList);
    }
}