import React from 'react'
import ReactDOM from 'react-dom'
import ownerDocument from 'dom-helpers/ownerDocument'
import contains from 'dom-helpers/query/contains'
import activeElement from 'dom-helpers/activeElement'
import PropTypes from 'prop-types'
import { compose, pure } from 'recompose'
import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import addEventListener from '../../helpers/addEventListener'
import Slide from '../Transitions/Slide'
import Fade from '../Transitions/Fade'

const styles = theme => ({
  root: {
    '&:focus': {
      backgroundColor: 'red'
    },
    position: 'absolute',
    zIndex: '999',
    top: 100,
    left: '50%',
    marginLeft: -200,
  },

  background: {
    position: 'absolute',
    zIndex: '998',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  modal: {
    position: 'fixed',
    background: '#fff',
    width: 400,
    boxShadow: theme.shadows[9],
    '& > div:first-child': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.palette.primary['400'],
      lineHeight: '55px',
      color: theme.table.headerTextColor,
      boxShadow: theme.shadows[1],
      fontSize: '18px',
      paddingLeft: '10px',
      '& svg': {
        color: `${theme.table.headerIconColor} !important`
      }
    },
    '& > div:last-child': {
      padding: '0 10px 10px 10px'
    }
  }
})

class TableDialog extends React.Component {
  modal = null;
  onFocusListener = null;

  componentWillReceiveProps ({ open }) {
    if (open && !this.onFocusListener) {
      const doc = ownerDocument(ReactDOM.findDOMNode(this))
      this.onFocusListener = addEventListener(doc, 'focus', this.handleFocusListener, true)
    }

    if (!open && this.onFocusListener) {
      this.onFocusListener.remove()
      this.onFocusListener = null
    }
  }

  componentWillUnmount () {
    if (this.onFocusListener) {
      this.onFocusListener.remove()
      this.onFocusListener = null
    }
  }

  handleFocusListener = () => {
    const doc = ownerDocument(ReactDOM.findDOMNode(this))
    const currentFocus = activeElement(doc)
    const modalContent = this.modal && this.modal.lastChild

    if (modalContent && modalContent !== currentFocus && !contains(modalContent, currentFocus)) {
      modalContent.focus()
    }
  }

  render () {
    const { classes, children, title, open, onClose } = this.props

    return (
      <div>
        <div className={classes.root} ref={ref => { this.modal = ref }}>
          <div tabIndex="-1">
            <Slide open={open}>
              <div className={classes.modal}>
                <div>
                  {title}
                  <IconButton onClick={onClose}>
                    <CloseIcon />
                  </IconButton>
                </div>
                <div>
                  {children}
                </div>
              </div>
            </Slide>
          </div>
        </div>
        <Fade open={open}>
          <div className={classes.background} onClick={onClose}>{''}</div>
        </Fade>
      </div>
    )
  }
}

TableDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default compose(
  withStyles(styles),
  pure
)(TableDialog)
