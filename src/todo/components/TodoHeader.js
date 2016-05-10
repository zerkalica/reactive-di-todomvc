/* @flow */

import type {
    Tr,
    EventHelper,
    ErrorableElement as IErrorableElement
} from 'reactive-di-todomvc/i/commonInterfaces'

import type {Element} from 'reactive-di-react/i/interfaces'
import type {
    CancelAdding,
    CommitAdding,
    ChangeAdding
} from 'reactive-di-todomvc/i/todoInterfaces'

import TodoItemAdding from 'reactive-di-todomvc/todo/models/TodoItemAdding'
import {
    KEY_ENTER,
    KEY_ESC
} from 'reactive-di-todomvc/common/helpers/keyCodes'

type TodoHeaderProps = {
    tr: Tr,
    addingItem: TodoItemAdding;
    helper: EventHelper;
    ErrorableElement: IErrorableElement,
    cancelAdding: CancelAdding;
    commitAdding: CommitAdding;
    changeAdding: ChangeAdding;
};

export default function TodoHeader({
    tr,
    addingItem,
    ErrorableElement,
    changeAdding,
    commitAdding,
    cancelAdding,
    helper
}: TodoHeaderProps): Element {
    return (
        <header className="header">
            <h1>{tr('todos')}</h1>
            <ErrorableElement error={addingItem.errors.title}>
                <input
                    className="new-todo"
                    type="text"
                    placeholder={tr('What needs to be done?')}
                    autoFocus
                    value={addingItem.item.title}
                    onBlur={helper.click(cancelAdding)}
                    onChange={helper.change((title) => changeAdding({title}))}
                    onKeyPress={helper.keyMap([
                        [KEY_ENTER, commitAdding, addingItem.item],
                        [KEY_ESC, cancelAdding]
                    ])}
                />
            </ErrorableElement>
        </header>
    )
}
