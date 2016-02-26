import { createFactory as fact, createElement as el, cloneElement } from 'react'

/**
 * Components
 */

export * from './DevTools'

/**
 * HTML pieces
 */
export const div = fact('div')
export const h1 = fact('h1')
export const p = fact('p')
export const a = fact('a')
export const img = fact('img')
export const form = fact('form')
export const text = fact('text')
export const span = fact('span')
export const input = fact('input')
export const textarea = fact('textarea')
export const button = fact('button')
export const br = fact('br')

/**
 * Wrappers
 */
export const clone = (component, props, ...children) => {
    return component ? cloneElement(component, props, ...children) : null
}

export const transition = (opts, ...children) => {
    return el(require('react/lib/ReactCSSTransitionGroup'), {
        ...{
            transitionAppearTimeout: 0,
            transitionEnterTimeout: 0,
            transitionLeaveTimeout: 0
        },
        ...opts
    }, ...children);
}

/**
 * Aliases
 */
export { fact, el }