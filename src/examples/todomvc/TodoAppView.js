// @flow

import {mem} from 'lom_atom'
import {theme} from 'reactive-di'

import {SpinnerView, ItemView} from '../common'

import TodoService from './TodoService'
import TodoFilterService from './TodoFilterService'

import TodoHeaderView from './TodoHeaderView'
import TodoMainView from './TodoMainView'
import TodoFooterView from './TodoFooterView'

class TodoAppTheme {
    @mem @theme get css() {
        return {
            todoapp: {
                background: '#fff',
                position: 'relative',
                border: '1px solid #ededed',
                boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)'
            },

            '@global': {
                ':focus': {
                    outline: 0
                },
                html: {
                    margin: 0,
                    padding: 0
                },
                body: {
                    font: '14px "Helvetica Neue", Helvetica, Arial, sans-serif',
                    lineHeight: '1.4em',
                    background: '#f5f5f5',
                    color: '#4d4d4d',
                    minWidth: '230px',
                    maxWidth: '550px',
                    margin: '0 auto',
                    padding: 0,
                    '-webkit-font-smoothing': 'antialiased',
                    '-moz-osx-font-smoothing': 'grayscale',
                    fontWeight: '300'
                }
            }
        }
    }
}

export default function TodoAppView(
    {id}: {id: string},
    {
        todoService: {isOperationRunning},
        theme: {css}
    }: {
        todoService: TodoService;
        theme: TodoAppTheme;
    }
) {
    return <div id={id}>
        {/* Loading fix: access data in TodoApp first to throw exception, if no todos loaded */}
        {/* {activeTodoCount > 0 ? null : null} */}
        <div id="layout" class={css.todoapp}>
            {isOperationRunning ? <SpinnerView id="status" /> : null}
            <TodoHeaderView id="header" />
            <TodoMainView id="main" />
            <TodoFooterView id="footer" />
        </div>
    </div>
}
