import { Injectable } from 'angular2/core';
import { valueList } from './mock-value-list';

@Injectable()
export class ValueListService {
    getValueList() {
        return Promise.resolve(valueList);
    }
    
    getValueListDelayed() {
        return new Promise<typeof valueList>(resolve =>
            setTimeout(() => resolve(valueList), 2800)
        );
        /**
         * <syntax-helper>
         * With `resolve =>`, it means a function started with resolve as one of its arguments
         * Things that follow after `=>` is the actual body of this function. 
         * </syntax-helper>
         */ 
    }
}