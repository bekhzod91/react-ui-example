import React from 'react'
import PropTypes from 'prop-types'
import { compose, pure } from 'recompose'
import withStyles from '@material-ui/core/styles/withStyles'
import AppBar from '@material-ui/core/AppBar'
import Slide from '@material-ui/core/Slide'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import CloseCircleIcon from './Icon/CloseCircleIcon'

const styles = {
  buttonGroup: {
    marginTop: 15,
    display: 'flex',
    justifyContent: 'flex-end',
    '& > button': {
      marginLeft: 10
    }
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  body: {
    width: '700px'
  }
}

const enhance = compose(
  withStyles(styles),
  pure
)

const Transition = props => {
  return <Slide direction="down" {...props} />
}

const ActionDialog = ({ classes, title, ...props }) => (
  <Dialog
    open={props.open}
    TransitionComponent={Transition}
    keepMounted={true}
    classes={{ paper: classes.body }}
    aria-labelledby="create-dialog">
    <AppBar
      className={classes.appBar}
      position="static">
      <div>
        <span>{title}</span>
      </div>
      <IconButton
        className={classes.icon}
        onClick={props.onCloseModal}>
        <CloseCircleIcon />
      </IconButton>
    </AppBar>
    {React.cloneElement(props.children, props)}
  </Dialog>
)

ActionDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onSubmitModal: PropTypes.func.isRequired,
}

export default enhance(ActionDialog)
