// @flow
import {BaseModel} from 'reactive-di'
import {source} from 'reactive-di/annotations'
import Todo from 'rdi-todo/todoBundle/common/Todo'

export interface TodoOptionsRec {
    isEditing?: boolean;
    editingItem?: Todo;
}

@source({key: 'TodoOptions'})
export default class TodoOptions extends BaseModel<TodoOptionsRec> {
    isEditing: boolean
    editingItem: Todo
    static defaults: TodoOptionsRec = {
        isEditing: false,
        editingItem: new Todo()
    }
}