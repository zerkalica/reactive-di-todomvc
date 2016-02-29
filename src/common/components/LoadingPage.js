/* @flow */
import React from 'react'
import type {Element} from 'reactive-di-todomvc/i/commonInterfaces'

export default function LoadingPage(): Element {
    return (
        <div className="page-loading">
            <h1>Loading...</h1>
        </div>
    )
}
