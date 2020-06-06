import React from 'react'
import moment from 'moment'

const generateGreeting = (hour): string => {
  if (hour < '12') {
    return (
      'Good Morning'
    )
  }
  else if (hour >= '19') {
    return (
      'Good Evening'
    )
  }
  else if (hour <='19') {
    return (
      'Good Afternoon'
    )
  }
}

export default class Clock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      time: moment().format('HH:mm:ss'),
      day: moment().format('dddd'),
      date: moment().format('Do'),
      month: moment().format('MMMM'),
      year: moment().format('YYYY'),
      hour: moment().format('HH')
    }
  }

  componentDidMount () {
    this.intervalID = setInterval(
      () => this.tick(),
      1000,

      () => this.checkHour(),
      1000,
    )
  }

  componentWillUnmount () {
    clearInterval(this.intervalID)
  }

  tick () {
    this.setState({
      time: moment().format('HH:mm:ss')
    })
  }

  checkHour () {
    this.setState({
      hour: moment().format('HH')
    })
  }

  render () {
    return (
      <div className='current-time'>
        <p className='current-time__greeting'>
          {`${generateGreeting(this.state.hour)} James, it's ${this.state.day} ${this.state.date} ${this.state.month} ${this.state.year}`}
        </p>
        <p className='current-time__clock'>
          {`${this.state.time}`}
          <span>{moment().format('a')}</span>
        </p>
      </div>
    )
  }
}

export { generateGreeting }
