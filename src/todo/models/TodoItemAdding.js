/* @flow */
import {TodoItemImpl} from 'reactive-di-todomvc/todo/models/TodoItemCollection'
import type {TodoItem} from 'reactive-di-todomvc/i/todoInterfaces'
import {assignModel, assignBoolean} from 'reactive-di-todomvc/common/helpers'

export default class TodoItemAdding {
    isAdding: boolean;
    item: TodoItem;

    constructor(rec: {
        isAdding?: boolean,
        item?: TodoItem
    } = {}) {
        this.item = assignModel(rec.item, TodoItemImpl)
        this.isAdding = assignBoolean(rec.isAdding)
    }
}
