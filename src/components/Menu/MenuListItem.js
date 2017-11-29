import { not, path, addIndex, map, equals } from 'ramda'
import classNames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, pure } from 'recompose'
import withStyles from 'material-ui/styles/withStyles'
import Collapse from 'material-ui/transitions/Collapse'
import IconButton from 'material-ui/IconButton'
import { ListItem, ListItemText, ListItemSecondaryAction, ListItemIcon } from 'material-ui/List'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import { checkMenuNameInsideMenu } from '../../helpers/menu'

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  active: {
    background: 'rgb(234, 243, 248)',
    borderLeft: `3px solid ${theme.palette.secondary['500']}`
  }
})

class MenuListItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = { open: this.getMenuStatus() }
  }

  componentWillReceiveProps () {
    this.setState({ open: this.getMenuStatus() })
  }

  getMenuStatus = () => {
    const { activeMenuName, item } = this.props

    return checkMenuNameInsideMenu(activeMenuName, item)
  }

  onClickCollapseButton = () => {
    this.setState({ open: not(this.state.open) })
  }

  onClickList = () => {
    const url = path(['item', 'url'], this.props)
    const push = path(['route', 'push'], this.props)

    push(url)
  }

  renderButton = () => {
    const children = path(['item', 'children'], this.props)

    if (!children) {
      return null
    }

    return (
      <ListItemSecondaryAction>
        <IconButton onClick={this.onClickCollapseButton}>
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </ListItemSecondaryAction>
    )
  }

  renderCollapse = () => {
    const { route, activeMenuName, className } = this.props
    const children = path(['item', 'children'], this.props)

    if (!children) {
      return null
    }

    return (
      <Collapse in={this.state.open} transitionDuration="auto">
        {addIndex(map)((item, index) => (
          <MenuListItemEnhance
            key={index}
            route={route}
            item={item}
            className={className}
            activeMenuName={activeMenuName} />
        ), children)}
      </Collapse>
    )
  }

  render () {
    const { classes, item, isRoot, className, activeMenuName } = this.props
    const { name, title, icon } = item

    return (
      <div>
        <ListItem
          button={true}
          className={classNames(className, {
            [classes.nested]: not(isRoot),
            [classes.active]: equals(activeMenuName, name)
          })}
          onClick={this.onClickList}>
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          <ListItemText inset={true} primary={title} />
          {this.renderButton()}
        </ListItem>
        {this.renderCollapse()}
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
  className: PropTypes.string,
  activeMenuName: PropTypes.string.isRequired
}

const MenuListItemEnhance = compose(withStyles(styles), pure)(MenuListItem)

export default MenuListItemEnhance
