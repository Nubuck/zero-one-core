import React from 'react'
import z from '@z1/lib-feature-box'
import {
  Row,
  Col,
  HStack,
  When,
  Button,
  Avatar,
  MapIndexed,
} from '@z1/lib-ui-box-elements'
import { isRenderProp } from './common'
import { IconLabel } from './IconLabel'

// elements
const ColSelect = ({ children, ...props }) => {
  return (
    <Col x="center" y="center" {...props}>
      {children}
    </Col>
  )
}
ColSelect.displayName = 'ColSelect'
const ColGeneral = ({ children, ...props }) => {
  return (
    <Col x="center" justifyContent="between" {...props}>
      {children}
    </Col>
  )
}
ColGeneral.displayName = 'ColGeneral'
const avatarProps = {
  key: 'avatar',
  size: 'xl',
}
const renderAvatar = z.fn(t => (props, baseProps = {}) => {
  const defaultProps = t.mergeDeepRight(avatarProps, baseProps)
  if (isRenderProp(props)) {
    return props(defaultProps)
  }
  // if (t.isType(props, 'string')) {
  //   return <Avatar {...defaultProps} name={props} />
  // }
  return <Avatar {...defaultProps} {...props} />
})
const selectorProps = {
  key: 'selector',
  size: 'sm',
  selected: false,
}
const renderSelector = z.fn(t => (props, baseProps = {}) => {
  const defaultProps = t.mergeDeepRight(selectorProps, baseProps)
  if (isRenderProp(props)) {
    return props(defaultProps)
  }
  // if (t.isType(props, 'string')) {
  //   return <Button {...defaultProps} name={props} />
  // }
  return <Button {...defaultProps} {...props} />
})

// main
const renderListItem = z.fn(t => props => {
  // mode:
  const selectable = t.pathOr(false, ['selectable'], props)
  // status:
  const loading = t.pathOr(false, ['loading'], props)
  const disabled = t.pathOr(false, ['disabled'], props)
  const selected = t.pathOr(false, ['selected'], props)
  // actions:
  const onSelect = t.pathOr(() => null, ['onSelect'], props)
  // layout:
  const cols = t.pathOr({}, ['cols'], props)
  const colSelect = t.pathOr(null, ['select'], cols)
  const colAvatar = t.pathOr(null, ['avatar'], cols)
  const colTitle = t.pathOr(null, ['title'], cols)
  const colContent = t.pathOr(null, ['content'], cols)
  const colLast = t.pathOr(null, ['last'], cols)
  const colNested = t.pathOr(null, ['nested'], cols)
  const hasColSelect = t.notNil(colSelect)
  const hasColAvatar = t.notNil(colAvatar)
  const hasColTitle = t.notNil(colTitle)
  const hasColContent = t.notNil(colContent)
  const hasColLast = t.notNil(colLast)
  const hasColNested = t.notNil(colNested)
  // select col:
  const select = t.pathOr(null, ['select'], props)
  const hasSelect = t.notNil(select)
  // avatar col:
  const avatar = t.pathOr(null, ['avatar'], props)
  const caption = t.pathOr(null, ['caption'], props)
  const hasAvatar = t.notNil(avatar)
  const hasCaption = t.notNil(caption)
  // title col:
  const title = t.pathOr(null, ['title'], props)
  const subtitle = t.pathOr(null, ['subtitle'], props)
  const hasTitle = t.notNil(title)
  const hasSubtitle = t.notNil(subtitle)
  // content col:
  const content = t.pathOr(null, ['content'], props)
  const hasContent = t.notNil(content)
  // last col:
  const stamp = t.pathOr(null, ['stamp'], props)
  const buttons = t.pathOr([], ['buttons'], props)
  const hasStamp = t.notNil(stamp)
  const hasButtons = t.notZeroLen(buttons)
  // nested
  const nested = t.pathOr(null, ['nested'], props)
  const children = t.pathOr(null, ['children'], props)
  const hasNested = t.notNil(nested)
  // colors: on / off / selected
  const colors = t.pathOr(null, ['colors'], props)
  const color = t.pathOr(null, ['color'], props)
  const nextProps = t.omit(
    [
      'selectable',
      'loading',
      'disabled',
      'selected',
      'onSelect',
      'cols',
      'select',
      'avatar',
      'caption',
      'title',
      'subtitle',
      'content',
      'stamp',
      'buttons',
      'nested',
      'children',
      'colors',
      'color',
    ],
    props
  )
  return (
    <Col {...nextProps}>
      <Row key="row-main">
        <When
          is={t.anyOf([hasColSelect, selectable])}
          render={() => {
            const nextChildren = (
              <When
                is={selectable}
                render={() =>
                  renderSelector(selector, { loading, disabled, selected })
                }
              />
            )
            if (isRenderProp(colSelect)) {
              return colSelect({ children: nextChildren })
            }
            return <ColSelect key="col-select">{nextChildren}</ColSelect>
          }}
        />
        <When
          is={t.anyOf([hasColAvatar, hasAvatar, hasCaption])}
          render={() => {
            const nextChildren = (
              <React.Fragment>
                <When
                  is={hasAvatar}
                  render={() => (
                    <Row x="center" y="center" key="row-avatar">
                      {renderAvatar(avatar, { loading, disabled, selected })}
                    </Row>
                  )}
                />
                <When
                  is={hasCaption}
                  render={() => <IconLabel key="caption" />}
                />
              </React.Fragment>
            )
            if (isRenderProp(colAvatar)) {
              return colAvatar({ children: nextChildren })
            }
            return <ColGeneral key="col-avatar">{nextChildren}</ColGeneral>
          }}
        />
        <When
          is={t.anyOf([hasTitleCol, hasTitle, hasSubtitle])}
          render={() => {
            const nextChildren = (
              <React.Fragment>
                <When is={hasTitle} render={() => <IconLabel key="title" />} />
                <When
                  is={hasSubtitle}
                  render={() => <IconLabel key="subtitle" />}
                />
              </React.Fragment>
            )
            if (isRenderProp(colTitle)) {
              return colTitle({ children: nextChildren })
            }
            return <ColGeneral key="col-title">{nextChildren}</ColGeneral>
          }}
        />
        <When
          is={t.anyOf([hasColContent, hasContent])}
          render={() => {
            const nextChildren = (
              <When
                is={hasContent}
                render={() => <HStack key="content">{content}</HStack>}
              />
            )
            if (isRenderProp(colContent)) {
              return colContent({ children: nextChildren })
            }
            return <Col key="col-content">{nextChildren}</Col>
          }}
        />
        <When
          is={t.anyOf([hasColLast, hasStamp, hasButtons])}
          render={() => {
            const nextChildren = (
              <React.Fragment>
                <When is={hasStamp} render={() => <IconLabel key="stamp" />} />
                <When
                  is={hasButtons}
                  render={() => (
                    <Row key="buttons">
                      <MapIndexed
                        items={[]}
                        render={(button, index) => (
                          <Button key={`li-btn-${index}`} {...button} />
                        )}
                      />
                    </Row>
                  )}
                />
              </React.Fragment>
            )
            if (isRenderProp(colLast)) {
              return colLast({ children: nextChildren })
            }
            return <ColGeneral key="col-last">{nextChildren}</ColGeneral>
          }}
        />
      </Row>
      <When
        is={t.anyOf([
          hasColNested,
          hasNested,
          t.isNil(children) ? false : t.gt(React.Children.count(children), 0),
        ])}
        render={() => {
          const nextChildren = <React.Fragment></React.Fragment>
          if (isRenderProp(colNested)) {
            return colNested({ children: nextChildren })
          }
          return (
            <Row key="row-nested">
              <Col key="col-nested">{nextChildren}</Col>
            </Row>
          )
        }}
      />
    </Col>
  )
})

export class ListItem extends React.Component {
  render() {
    return renderListItem(this.props)
  }
}
ListItem.displayName = 'ListItem'
