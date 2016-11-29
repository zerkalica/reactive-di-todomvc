// @flow

import {BaseModel} from 'reactive-di'
import {source} from 'reactive-di/annotations'

export interface TodoGroupStateRec {
    isAllCompleted?: boolean;
}

@source({key: 'TodoGroupState'})
export default class TodoGroupState extends BaseModel<TodoGroupStateRec> {
    isAllCompleted: boolean
    static defaults: TodoGroupStateRec = {
        isAllCompleted: false
    }
}