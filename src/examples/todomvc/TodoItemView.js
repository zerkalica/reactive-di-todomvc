// @flow

import {props, theme} from 'reactive-di'
import {action, mem} from 'lom_atom'
import type {ITodo} from './TodoService'
import TodoService from './TodoService'

const ESCAPE_KEY = 27
const ENTER_KEY = 13

interface ITodoProps {
    +todo: ITodo;
}

class TodoItemStore {
    @mem todoBeingEditedId: ?string = null
    @mem editText = ''

    @props props: ITodoProps
    _focused: ?HTMLInputElement = null

    beginEdit = () => {
        const {todo} = this.props
        this.todoBeingEditedId = todo.id
        this.editText = todo.title
        if (this._focused) {
            this._focused.focus()
        }
    }

    @action setText({target}: Event) {
        this.editText = (target: any).value
    }

    setEditInputRef = (el: ?HTMLInputElement) => {
        if (!el) return
        this._focused = el
        el.focus()
    }

    handleSubmit = (event: Event) => {
        const val = this.editText.trim()
        if (val) {
            this.props.todo.title = val
            this.editText = ''
        } else {
            this.handleDestroy()
        }
        this.todoBeingEditedId = null
    }

    handleKeyDown = (event: KeyboardEvent) => {
        switch (event.which) {
            case ESCAPE_KEY:
                this.editText = this.props.todo.title
                this.todoBeingEditedId = null
                break

            case ENTER_KEY:
                this.handleSubmit(event)
                break

            default: break
        }
    }

    toggle = () => {
        this.props.todo.toggle()
        this.todoBeingEditedId = null
    }

    handleDestroy = () => {
        this.props.todo.remove()
        this.todoBeingEditedId = null
    }
}

class TodoItemTheme {
    @theme get css() {
        const itemBase = {
            position: 'relative',
            fontSize: '24px',
            borderBottom: '1px solid #ededed',
            '&:last-child': {
                borderBottom: 'none'
            },
            '&:hover $destroy': {
                display: 'block'
            }
        }

        const viewLabelBase = {
            wordBreak: 'break-all',
            padding: '15px 15px 15px 60px',
            display: 'block',
            lineHeight: '1.2',
            transition: 'color 0.4s'
        }

        return {
            regular: {
                ...itemBase
            },
            completed: {
                ...itemBase
            },

            editing: {
                borderBottom: 'none',
                padding: 0,
                '&:last-child': {
                    marginBottom: '-1px'
                }
            },

            edit: {
                backgroundColor: '#F2FFAB',
                display: 'block',
                border: 0,
                position: 'relative',
                fontSize: '24px',
                fontFamily: 'inherit',
                fontWeight: 'inherit',
                lineHeight: '1.4em',
                width: '406px',
                padding: '12px 16px',
                margin: '0 0 0 43px'
            },

            toggle: {
                textAlign: 'center',
                width: '40px',
                /* auto, since non-WebKit browsers doesn't support input styling */
                height: 'auto',
                position: 'absolute',
                top: 0,
                bottom: 0,
                margin: 'auto 0',
                border: 'none', /* Mobile Safari */
                '-webkit-appearance': 'none',
                appearance: 'none',
                opacity: 0,
                '& + label': {
                    /*
                        Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
                        IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
                    */
                    backgroundImage: `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center left'
                },

                '&:checked + label': {
                    backgroundImage: `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E')`
                }
            },

            viewLabelRegular: {
                ...viewLabelBase
            },

            viewLabelCompleted: {
                ...viewLabelBase,
                color: '#d9d9d9',
                textDecoration: 'line-through'
            },

            destroy: {
                padding: 0,
                border: 0,
                background: 'none',
                verticalAlign: 'baseline',
                display: 'none',
                position: 'absolute',
                right: '10px',
                top: 0,
                bottom: 0,
                width: '40px',
                height: '40px',
                fontSize: '30px',
                margin: 'auto 0',
                color: '#cc9a9a',
                marginBottom: '11px',
                transition: 'color 0.2s ease-out',
                '&:hover': {
                    color: '#af5b5e'
                },

                '&:after': {
                    content: '\'×\''
                }
            }
        }
    }

    label(isCompleted: boolean) {
        const css = this.css
        return isCompleted ? css.viewLabelCompleted : css.viewLabelRegular
    }

    editable(isCompleted: boolean) {
        return isCompleted ? this.css.completed : this.css.regular
    }
}

export default function TodoItemView(
    {todo}: ITodoProps,
    {itemStore, theme, service}: {
        service: TodoService;
        theme: TodoItemTheme;
        itemStore: TodoItemStore;
    }
) {

    const info = service.todoExtInfo(todo.id)
    const css = theme.css
    return itemStore.todoBeingEditedId === todo.id
        ? <li class={css.editing}>
            <input
                ref={itemStore.setEditInputRef}
                class={css.edit}
                value={itemStore.editText}
                onBlur={itemStore.handleSubmit}
                onInput={itemStore.setText}
                onKeyDown={itemStore.handleKeyDown}
            />
        </li>
        : <li class={theme.editable(todo.completed)}>
            <input
                id="toggle"
                class={css.toggle}
                type="checkbox"
                checked={todo.completed}
                onChange={itemStore.toggle}
            />
            <label
                class={theme.label(todo.completed)}
                id="beginEdit"
                title={info.description}
                onDblClick={itemStore.beginEdit}>
                {todo.title}
            </label>
            <button class={css.destroy} id="destroy" onClick={itemStore.handleDestroy} />
        </li>
}
