import { createElement, createFactory } from 'react'
import { createDevTools } from 'redux-devtools'
import DockMonitor from 'redux-devtools-dock-monitor'
import Inspector from 'redux-devtools-inspector'
import MultipleMonitors from 'redux-devtools-dispatch/lib/MultipleMonitors';
import Dispatch from 'redux-devtools-dispatch'
import LogMonitor from 'redux-devtools-log-monitor';

const enhancer = createDevTools(
    createElement(
        DockMonitor, {
            toggleVisibilityKey: "ctrl-w",
            changePositionKey: "ctrl-h",
            changeMonitorKey: 'ctrl-m',
            defaultIsVisible: true,
            defaultPosition: 'bottom',
            defaultSize: 0.6
        },

        createElement(MultipleMonitors, {},
            createElement(LogMonitor),
            createElement(Dispatch, {})
        ),
        createElement(Inspector, {})
    )
)
const DevTools = createFactory(enhancer)

export { enhancer as default, DevTools }