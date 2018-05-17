import { prop, addIndex, map } from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers } from 'recompose'
import classNames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import SortByAlpha from '@material-ui/icons/SortByAlpha'
import PersonAdd from '@material-ui/icons/PersonAdd'
import Close from '@material-ui/icons/Close'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fade from '@material-ui/core/Fade'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ContactForm from './ContactForm'

const styles = theme => ({
  card: {
  },
  cardHeader: {
    background: theme.palette.primary[400],
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    color: theme.contacts.textColor,
    fontSize: 14
  },
  icon: {
    width: 30
  },
  searchIcon: {
    color: `${theme.contacts.textColor} !important`,
  },
  sortByAlpha: {
    color: `${theme.contacts.textColor} !important`,
  },
  cardActions: {
    borderTop: '1px solid rgba(215,225,237,.6)',
    justifyContent: 'center',
    position: 'relative',
    '& button': {
      color: '#688696'
    }
  },
  addPerson: {
    position: 'absolute',
    right: 15,
    top: -18,
    backgroundColor: theme.palette.secondary[400],
    '&:hover': {
      backgroundColor: theme.palette.secondary[500],
    },
    '& svg': {
      color: `${theme.contacts.textColor} !important`
    }
  },
  loadingCover: {
    display: 'flex',
    justifyContent: 'center',
    padding: '24px 0'
  },
  loading: {
    color: theme.palette.secondary[400]
  },
  search: {
    height: 56,
    '& input': {
      border: 'none',
      textIndent: 45,
      paddingRight: 50,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      outline: 'none',
      width: '100%',
      background: theme.palette.primary[50],
      color: '#75849b',
      transition: '0.5s',
      boxSizing: 'border-box',
      '&::placeholder': {
        color: '#75849b'
      },
      '&:focus': {
        background: theme.palette.primary[100],
      }
    },
    '& button': {
      position: 'absolute',
      top: '50%',
      marginTop: -24,
      right: 5
    }
  },
  hide: {
    height: 0,
    visibility: 'hidden'
  }
})

const Contacts = ({ classes, alt, list, loading, ...defaultProps }) => {
  const mapWithIndex = addIndex(map)
  const { state, onChange, openSearch, closeSearch, openDialog, closeDialog } = defaultProps

  return (
    <div className={classes.card}>
      <Card>
        <div style={{ position: 'relative' }}>
          <Fade
            in={state.search}
            timeout={500}
            className={classNames(classes.search, { [classes.hide]: !state.search })}>
            <div>
              <input placeholder="Search and press enter..." onChange={onChange} />
              <IconButton onClick={closeSearch}>
                <Close />
              </IconButton>
            </div>
          </Fade>
          <Fade
            in={!state.search}
            timeout={500}
            className={classNames(classes.cardHeader, { [classes.hide]: state.search })}>
            <div>
              <CardHeader
                title="Contacts"
                classes={{ title: classes.title }}
              />
              <CardActions>
                <IconButton onClick={openSearch} className={classes.icon}>
                  <SearchIcon className={classes.searchIcon} />
                </IconButton>
                <IconButton className={classes.icon}>
                  <SortByAlpha className={classes.sortByAlpha} />
                </IconButton>
              </CardActions>
            </div>
          </Fade>
        </div>
        <div>
          {loading ? (
            <div className={classes.loadingCover}>
              <CircularProgress size={50} className={classes.loading} />
            </div>
          ) : (
            <List>
              {mapWithIndex((item, index) => (
                <ListItem key={index} button={true}>
                  <ListItemAvatar>
                    <Avatar
                      alt={alt}
                      className={classes.avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={prop('name', item)}
                    secondary={prop('email', item)}
                  />
                </ListItem>
              ), list)}
            </List>
          )}
        </div>
        <CardActions className={classes.cardActions}>
          <Button>view more</Button>
          <Button fab={true} className={classes.addPerson} onClick={openDialog}>
            <PersonAdd />
          </Button>
        </CardActions>
      </Card>
      <ContactForm open={state.dialog} close={closeDialog} />
    </div>
  )
}

Contacts.propTypes = {
  classes: PropTypes.object.isRequired,
  alt: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}

export default compose(
  withState('state', 'setState', {
    search: false,
    value: '',
    dialog: false
  }),
  withHandlers({
    onChange: ({ state, setState }) => (event) => {
      setState({ ...state, value: event.target.value })
    },
    openSearch: ({ state, setState }) => () => {
      setState({ ...state, search: true })
    },
    closeSearch: ({ state, setState }) => () => {
      setState({ ...state, search: false })
    },
    openDialog: ({ state, setState }) => () => {
      setState({ ...state, dialog: true })
    },
    closeDialog: ({ state, setState }) => () => {
      setState({ ...state, dialog: false })
    }
  }),
  withStyles(styles)
)(Contacts)
