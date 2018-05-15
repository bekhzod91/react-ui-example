import classNames from 'classnames'
import { BehaviorSubject } from 'rxjs'
import { DateRangePicker } from 'react-dates'
import { compose, mapPropsStream, createEventHandler } from 'recompose'
import '../../styles/datepicker.css'
import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import DateRangeIcon from 'material-ui-icons/DateRange'
import ArrowForwardIcon from 'material-ui-icons/ArrowForward'
import * as DATE from '../../constants/dateFormat'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    paddingLeft: 5
  },
  range: {
    margin: '10px 0 0 10px',
    width: '100%',
    position: 'relative',
    '&:before' : {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: '2px solid #e3ecf7',
      zIndex: 1
    },
    '&:after' : {
      content: '""',
      position: 'absolute',
      left: '50%',
      right: '50%',
      bottom: 0,
      borderBottom: `2px solid ${theme.palette.primary['700']}`,
      transition: '0.3s',
      zIndex: 2
    }
  },
  rangeHighlight: {
    '&:after' : {
      left: 0,
      right: 0
    }
  },
  iconHighlight: {
    color: theme.palette.primary['400']
  }
})

const DateToDateField = ({ classes, input, meta, ...defaultProps }) => {
  return (
    <div className={classes.root}>
      <span className={classNames('', { [classes.iconHighlight]: meta.active })}>
        <DateRangeIcon />
      </span>

      <div className={classNames(classes.range, { [classes.rangeHighlight]: meta.active })}>
        <DateRangePicker
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          customArrowIcon={<ArrowForwardIcon />}
          showClearDates={true}
          {...defaultProps}
        />
      </div>
    </div>
  )
}

DateToDateField.defaultProps = {
  displayFormat: DATE.DEFAULT_DATE_FORMAT
}

DateToDateField.propTypes = {
  classes: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
}

const enhance = compose(
  mapPropsStream(props$ => {
    const { handler: onFocusChange, stream: onFocusChange$ } = createEventHandler()
    const { handler: onDatesChange, stream: onDatesChange$ } = createEventHandler()
    const initialState = { focusedInput: null, startDate: null, endDate: null }
    const dispatch$ = new BehaviorSubject(initialState)

    props$
      .distinctUntilChanged(null, props => props.input.value)
      .subscribe(props => dispatch$.next({ ...dispatch$.getValue(), ...props.input.value }))

    onFocusChange$
      .withLatestFrom(props$)
      .do(([focusedInput, props]) => focusedInput ? props.input.onFocus() : props.input.onBlur())
      .subscribe(([focusedInput]) => dispatch$.next({ ...dispatch$.getValue(), focusedInput: focusedInput }))

    onDatesChange$
      .withLatestFrom(props$)
      .do(([value, props]) => {
        if (value.startDate || value.endDate) {
          return props.input.onChange(value)
        }

        return props.input.onChange(null)
      })
      .subscribe(([value]) => dispatch$.next({ ...dispatch$.getValue(), ...value }))

    return props$.combineLatest(
      dispatch$.asObservable(),
      (props, state) => ({ ...props, ...state, onFocusChange, onDatesChange })
    )
  }),
  withStyles(styles)
)

export default enhance(DateToDateField)
