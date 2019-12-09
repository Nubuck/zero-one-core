import React from 'react'
import { task } from '@z1/preset-task'

// elements
import { Box } from './Box'

// main
const Stack = task(t => direction => props => {
    const stackProps = {
      flexDirection: t.eq(direction, 'vertical') ? 'col' : 'row',
    }
    const alignX = t.pathOr(null, ['x'], props)
    const alignY = t.pathOr(null, ['y'], props)
    const alignProps = t.isNil(alignX)
      ? {}
      : t.eq(direction, 'vertical')
      ? {
          flex: 'auto',
          alignItems: t.getMatch(alignX)({
            left: 'start',
            center: 'center',
            right: 'end',
          }),
        }
      : {
          justifyContent: t.getMatch(alignX)({
            left: 'start',
            center: 'center',
            right: 'end',
          }),
        }
    const justifyProps = t.isNil(alignY)
      ? {}
      : t.eq(direction, 'vertical')
      ? {
          justifyContent: t.getMatch(alignY)({
            top: 'start',
            center: 'center',
            bottom: 'end',
          }),
        }
      : {
          alignItems: t.getMatch(alignY)({
            top: 'start',
            center: 'center',
            bottom: 'end',
          }),
        }
    const stretch = t.pathOr(null, ['stretch'], props)
    const stretchProps = t.isNil(stretch)
      ? {}
      : t.eq(direction, 'vertical')
      ? {
          height: 'full',
        }
      : {}
  
    return React.createElement(
      Box,
      t.merge(t.omit(['box', 'x', 'y'], props), {
        box: t.mergeAll([
          {
            display: 'flex',
            alignSelf: 'stretch',
          },
          stackProps,
          alignProps,
          justifyProps,
          stretchProps,
          t.pathOr({}, ['box'], props),
        ]),
      })
    )
  })
  
  export const VStack = Stack('vertical')
  export const HStack = Stack('horizontal')