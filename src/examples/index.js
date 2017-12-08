// @flow
import './setupReact'
import {mem} from 'lom_atom'

import {render} from 'preact'

import {CounterView} from './counter'
import {HelloView} from './hello'
import {TodoAppView, todoMocks} from './todomvc'
import {AutocompleteView, autocompleteMocks} from './autocomplete'

import {ItemView, Locale, mockFetch} from './common'
import {AbstractLocationStore} from './common-todomvc'
import {CssChangeView} from './cssChange'

mockFetch(localStorage, 500, 30, [
    todoMocks,
    autocompleteMocks
])

class Store {
    static deps = [AbstractLocationStore]
    _locationStore: AbstractLocationStore

    constructor(locationStore: AbstractLocationStore) {
        this._locationStore = locationStore
    }

    pages = ['hello', 'counter', 'error', 'todomvc', 'autocomplete', 'css-change']

    get page(): string {
        return this._locationStore.location('page') || this.pages[0]
    }

    set page(page: string) {
        return this._locationStore.location('page', page)
    }

    @mem name = 'John'
}

function AppView(
    {lang}: {
        lang: string;
    },
    {store}: {
        store: Store;
    }
) {
    let page
    switch (store.page) {
        case 'hello':
            page = <HelloView id="hello_app" name={store.name} />
            break

        case 'counter':
            page = <CounterView id="counter_app" />
            break

        case 'autocomplete':
            page = <AutocompleteView id="autocomplete_app" initialValue={store.name} />
            break

        case 'todomvc':
            page = <TodoAppView id="todo_app" />
            break

        case 'css-change':
            page = <CssChangeView id="css_change_app" />
            break

        default:
            page = <div id="unknown">Unknown page</div>
    }

    return <div style={{dislay: 'flex', justifyContent: 'center'}}>
        <div id="menu" style={{padding: '1em'}}>
            {store.pages.map((link: string) =>
                <button
                    key={link}
                    style={{margin: '0.3em'}}
                    id={`button(${link})`}
                    onClick={() => store.page = link }
                >{link}</button>
            )}
        </div>
        <div id="layout" style={{border: '1px solid gray', padding: '1em', margin: '0 1em'}}>
            <h1 id="title">{store.page}</h1>
            {page}
        </div>

        <ItemView id="inital">
            <ItemView.Key id="key">Some initial value:</ItemView.Key>
            <ItemView.Value id="value">
                <input
                    id="value-input"
                    value={store.name}
                    onInput={({target}: Event) => { store.name = (target: any).value }}
                />
            </ItemView.Value>
        </ItemView>
        <div id="emulate-message">
            Type <strong id="code-1">rdi_fetch_error_rate = 0</strong> in console
            for disabling server error emulation. <strong id="code-2">rdi_fetch_error_rate = 100</strong> for 100% errors.
        </div>
    </div>
}
const el = document.getElementById('app')
if (!el) throw new Error('Document has no #app container')

render(<AppView id="demos" lang="ru" />, el)
