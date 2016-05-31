/* @flow */

import type {
    Element,
    IErrorPage,
    ILoadingPage
} from 'reactive-di-todomvc/common/i'

import type {
    AuthAreaProps,
    ILoginPage,
    ILogoutPage,
    Login,
    Logout
} from 'reactive-di-todomvc/auth/i'

import Session, {LoadableSession} from 'reactive-di-todomvc/auth/models/Session'
import {component} from 'reactive-di-react/annotations'
import LoginPageImpl from 'reactive-di-todomvc/auth/components/LoginPage'
import LogoutPageImpl from 'reactive-di-todomvc/auth/components/LogoutPage'

import login from 'reactive-di-todomvc/auth/actions/login'
import logout from 'reactive-di-todomvc/auth/actions/logout'

import {
    meta
} from 'reactive-di-observable/annotations'

import _ from 'babel-plugin-transform-metadata/_'

@meta(
    LoadableSession,
    (_: Login),
    (_: Logout)
)
class AuthMeta {
    pending: boolean;
    success: boolean;
    error: ?Error;
}

type AuthAreaDeps = AuthAreaProps & {
    session: Session;
    LoginPage: ILoginPage;
    LogoutPage: ILogoutPage;
    LoadingPage: ILoadingPage;
    authMeta: AuthMeta;
    ErrorPage: IErrorPage;
}

export default function AuthArea({
    session,
    authMeta,
    ErrorPage,
    LoginPage,
    LogoutPage,
    LoadingPage,
    children
}: AuthAreaDeps): Element {
    if (authMeta.error) {
        return <ErrorPage error={authMeta.error}/>
    }
    if (!children) {
        return <ErrorPage error={new Error('Children is not passed to AuthArea')}/>
    }
    if (authMeta.pending) {
        return <LoadingPage />
    }

    if (!session.isAuthorized) {
        return <LoginPage/>
    }

    return <div>{children} <LogoutPage/></div>
}
component([
    AuthMeta,
    [(_: ILogoutPage), LogoutPageImpl],
    [(_: Login), login],
    [(_: Logout), logout],
    [(_: ILoginPage), LoginPageImpl]
])(AuthArea)
