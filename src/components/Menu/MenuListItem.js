import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'material-ui-next/styles/withStyles'
import Collapse from 'material-ui-next/transitions/Collapse'
import { ListItem, ListItemText, ListItemIcon } from 'material-ui-next/List'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'

const hisChild = R.curry((parent, item) => {
  const children = R.prop('children', parent)
  if (!children) {
    return Boolean(R.find(R.equals('item'), item))
  }

  return hisChild(children, item)
})

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
    this.state = { open: false }
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
    const { route } = this.props

    if (!children) {
      return null
    }

    return (
      <Collapse in={this.state.open} transitionDuration="auto">
        {R.addIndex(R.map)((item, index) => (
          <MenuListItemEnhance key={index} route={route} item={item} />
        ), children)}
      </Collapse>
    )
  }

  render () {
    const { classes, item, root } = this.props
    const title = R.prop('title', item)
    const icon = R.prop('icon', item)
    const children = R.prop('children', item)

    return (
      <div>
        <ListItem
          button={true}
          onClick={this.onClick}
          className={root ? '' : classes.nested}>
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
  root: false
}

MenuListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  root: PropTypes.bool.isRequired
}

const MenuListItemEnhance = withStyles(styles)(MenuListItem)

export default MenuListItemEnhance
