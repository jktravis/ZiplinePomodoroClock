import React, { Component } from 'react';
import FaRepeat from 'react-icons/lib/fa/repeat'
import FaPause from 'react-icons/lib/fa/pause';
import FaPlay from 'react-icons/lib/fa/play';
import {
  Button,
  Col,
  Grid,
  ProgressBar,
  Row,
  ToggleButton,
  ToggleButtonGroup,
  Well,
} from 'react-bootstrap';

import './App.css';
import TimeDisplay from './TimeDisplay';
import NumberField from './NumberField';
import { convertMinToMilli, formatTime } from './utilities';

const defaultState = {
  currentTime: '25:00',
  breakLength: 5, // in minutes
  sessionLength: 25, // in minutes
  progressPercent: 0,
  isRunning: 0
};

class App extends Component {
  constructor() {
    super();
    this.state = defaultState;

    this.handleSessionChange = this.handleSessionChange.bind(this);
    this.handleBreakChange = this.handleBreakChange.bind(this);
    this.handlePausePlay = this.handlePausePlay.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSessionChange(event) {
    const value = parseInt(event.target.value, 10);
    const targetBaseName = event.target.id;
    this.setState({
      [targetBaseName]: value,
      currentTime: formatTime(convertMinToMilli(value))
    });
  }

  handleBreakChange(event) {
    const value = parseInt(event.target.value, 10);
    const targetBaseName = event.target.id;
    this.setState({
      [targetBaseName]: value
    });
  }

  handleReset() {
    this.setState(defaultState);
  }

  handlePausePlay(value) {
    this.setState({isRunning: value});
    switch (value) {
      case 0:
        // stop the clock
        console.log('Stop the clock!');
        break;
      case 1:
        // start the clock
        console.log('Start the clock!');
        break;
      default:
        // do nothing
    }
  }

  render() {
    const {currentTime, breakLength, sessionLength, progressPercent, isRunning} = this.state;
    return (
      <Grid fluid>
        <Row>
          <Col lg={2} lgPush={4} sm={2} smPush={3}>
            <NumberField labelRef="breakLength"
                         labelName="Break Length"
                         changeFn={this.handleBreakChange}
                         value={breakLength}
            />
          </Col>

          <Col lg={2} lgPush={4} sm={2} smPush={4}>
            <NumberField labelRef="sessionLength"
                         labelName="Session Length"
                         changeFn={this.handleSessionChange}
                         value={sessionLength}
            />
          </Col>
        </Row>

        <Row>
          <Col lg={4} lgPush={4} sm={5} smPush={3}>
            <Well>
              <TimeDisplay>
                {currentTime}
              </TimeDisplay>
            </Well>
          </Col>
        </Row>

        <Row>
          <Col lg={4} lgPush={4} sm={5} smPush={3}>
            <div className="text-center">
              <ProgressBar now={progressPercent}/>
              <Button bsStyle="primary" onClick={this.handleReset}>
                <FaRepeat/> Reset Timer
              </Button> {' '}
              <ToggleButtonGroup type="radio"
                                 name="action"
                                 defaultValue={isRunning}
                                 onChange={this.handlePausePlay}
              >
                <ToggleButton value={0}>
                  <FaPause/> Pause
                </ToggleButton>
                <ToggleButton value={1}>
                  <FaPlay/> Play/Resume
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
