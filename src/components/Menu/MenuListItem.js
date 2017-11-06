import * as R from 'ramda'
import classNames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, pure } from 'recompose'
import withStyles from 'material-ui-next/styles/withStyles'
import Collapse from 'material-ui-next/transitions/Collapse'
import { ListItem, ListItemText, ListItemIcon } from 'material-ui-next/List'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'

const menuIsActive = R.curry((activeMenuName, menu) =>
  R.compose(
    R.equals(activeMenuName),
    R.prop('name'),
  )(menu)
)

const menuIsOpen = R.curry((activeMenuName, menu) => R.ifElse(
    R.has('children'),
    R.compose(
      R.head,
      R.filter(Boolean),
      R.map(menuIsOpen(activeMenuName)),
      R.prop('children')
    ),
    menuIsActive(activeMenuName)
  )(menu)
)

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  active: {
    background: 'rgb(234, 243, 248)',
    borderLeft: `3px solid ${theme.palette.primary['500']}`
  }
})

class MenuListItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = { open: Boolean(menuIsOpen(props.activeMenuName, props.item)) }
  }

  onClick = () => {
    const { route, item } = this.props
    const { push } = route
    const url = R.prop('url', item)
    const children = R.prop('children', item)

    if (children) {
      this.setState({ open: !this.state.open })
    } else {
      push(url)
    }
  }

  renderButton = (children) => {
    if (!children) {
      return null
    }

    return this.state.open ? <ExpandLess /> : <ExpandMore />
  }

  renderCollapse = (children) => {
    const { route, activeMenuName } = this.props

    if (!children) {
      return null
    }

    return (
      <Collapse in={this.state.open} transitionDuration="auto">
        {R.addIndex(R.map)((item, index) => (
          <MenuListItemEnhance
            key={index}
            route={route}
            item={item}
            activeMenuName={activeMenuName} />
        ), children)}
      </Collapse>
    )
  }

  render () {
    const { classes, item, isRoot, activeMenuName } = this.props
    const title = R.prop('title', item)
    const icon = R.prop('icon', item)
    const children = R.prop('children', item)
    const className = classNames('', {
      [classes.nested]: R.not(isRoot),
      [classes.active]: menuIsActive(activeMenuName, item)
    })

    return (
      <div>
        <ListItem
          button={true}
          onClick={this.onClick}
          className={className}>
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          <ListItemText inset={true} primary={title} />
          {this.renderButton(children)}
        </ListItem>
        {this.renderCollapse(children)}
      </div>
    )
  }
}

MenuListItem.defaultProps = {
  isRoot: false
}

MenuListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  isRoot: PropTypes.bool.isRequired,
  activeMenuName: PropTypes.string.isRequired
}

const MenuListItemEnhance = compose(withStyles(styles), pure)(MenuListItem)

export default MenuListItemEnhance
