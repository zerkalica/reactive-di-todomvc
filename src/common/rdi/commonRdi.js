/* @flow */
import type {
    ILoadingPage,
    IErrorPage,
    IErrorableElement,
    ICommonLayout,
    AnonymFetch,
    EventHelper
} from 'reactive-di-todomvc/common/i'

import type {Tr} from 'any-translate'

import _ from 'babel-plugin-transform-metadata/_'

import type {ConfigItem} from 'reactive-di'

import BaseEnv from 'reactive-di-todomvc/common/models/BaseEnv'
import FetcherConfig from 'reactive-di-todomvc/common/models/FetcherConfig'
import DebugConfig from 'reactive-di-todomvc/common/models/DebugConfig'

import EventHelperImpl from 'reactive-di-todomvc/common/helpers/EventHelper'

import LoadingPage from 'reactive-di-todomvc/common/components/LoadingPage'
import ErrorPage from 'reactive-di-todomvc/common/components/ErrorPage'
import ErrorableElement from 'reactive-di-todomvc/common/components/ErrorableElement'
import CommonLayout from 'reactive-di-todomvc/common/components/CommonLayout'

import Translations from 'reactive-di-todomvc/common/models/Translations'
import tr from 'reactive-di-todomvc/common/services/tr'

import anonymFetch from 'reactive-di-todomvc/common/services/anonymFetch'

const deps: Array<ConfigItem> = [
    [(_: Tr), tr],
    [(_: AnonymFetch), anonymFetch],
    Translations,
    FetcherConfig,
    DebugConfig,
    BaseEnv,
    [(_: EventHelper), EventHelperImpl],
    [(_: ICommonLayout), CommonLayout],
    [(_: IErrorableElement), ErrorableElement],
    [(_: ILoadingPage), LoadingPage],
    [(_: IErrorPage), ErrorPage]
];

export default deps
