import { not, path, addIndex, map, equals } from 'ramda'
import classNames from 'classnames'
import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { compose, pure } from 'recompose'
import withStyles from '@material-ui/core/styles/withStyles'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
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
    const { history } = this.props
    const url = path(['item', 'url'], this.props)

    history.push(url)
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
    const { activeMenuName, className } = this.props
    const children = path(['item', 'children'], this.props)

    if (!children) {
      return null
    }

    return (
      <Collapse in={this.state.open}>
        {addIndex(map)((item, index) => (
          <MenuListItemEnhance
            key={index}
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
          component="div"
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
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  isRoot: PropTypes.bool.isRequired,
  className: PropTypes.string,
  activeMenuName: PropTypes.string.isRequired
}

const MenuListItemEnhance = compose(withRouter, withStyles(styles), pure)(MenuListItem)

export default MenuListItemEnhance
