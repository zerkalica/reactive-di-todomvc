/* @flow */
import {observable} from 'reactive-di-observable/annotations'

@observable({key: 'BaseEnv'})
export default class BaseEnv {
    referrer: string;
    userAgent: string;
    language: string;

    constructor(rec: {
        referrer: string;
        userAgent: string;
        language: string;
    }) {
        this.referrer = rec.referrer
        this.userAgent = rec.userAgent
        this.language = rec.language
    }
}
