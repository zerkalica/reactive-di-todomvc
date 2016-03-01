/* @flow */

import TodoGroupState from 'reactive-di-todomvc/todo/models/TodoGroupState'
import type {
    TodoItem,
    TodoItemsFacet
} from 'reactive-di-todomvc/i/todoInterfaces'
import type {Collection} from 'reactive-di/i/collection'

export default function todoItemsFacet(
    allItems: Collection<TodoItem>,
    groupState: TodoGroupState
): TodoItemsFacet {
    let items: ?Collection<TodoItem>;
    switch (groupState.selectedGroup) {
        case 'all':
            items = allItems
            break
        case 'completed':
            items = allItems.filter((item: TodoItem) => item.isCompleted)
            break
        case 'active':
            items = allItems.filter((item: TodoItem) => !item.isCompleted)
            break
        default:
            break
    }

    if (!items) {
        throw new Error(`Unknown selectedGroup: ${groupState.selectedGroup}`)
    }

    return {
        items,
        hasCompleted: !!items.find((item: TodoItem) => item.isCompleted),
        itemsCount: items.length,
        selectedGroup: groupState.selectedGroup
    }
}