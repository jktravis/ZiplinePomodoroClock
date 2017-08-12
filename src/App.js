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
import { convertMinToMilli, formatTime, getProgressBarValue } from './utilities';
import Timer from './timer';

const defaultState = {
  currentTimeDisplay: '01:00',
  currentTimeValue: convertMinToMilli(1),
  breakLength: 1, // in minutes
  onBreak: false,
  sessionLength: 1, // in minutes
  progressPercent: 0,
  isRunning: 0,
  tickStep: 60
};

class App extends Component {
  constructor() {
    super();

    this.handleSessionChange = this.handleSessionChange.bind(this);
    this.handleBreakChange = this.handleBreakChange.bind(this);
    this.handlePausePlay = this.handlePausePlay.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.tick = this.tick.bind(this);

    this.state = {
      ...defaultState,
      timer: new Timer(this.tick, defaultState.tickStep, false)
    };

  }

  handleSessionChange(event) {
    const value = parseInt(event.target.value, 10) || 0;
    const targetBaseName = event.target.id;
    const currentTimeValue = convertMinToMilli(value);
    this.setState({
      [targetBaseName]: value,
      currentTimeDisplay: formatTime(currentTimeValue),
      currentTimeValue
    });
  }

  handleBreakChange(event) {
    const value = parseInt(event.target.value, 10) || 0;
    const targetBaseName = event.target.id;
    this.setState({
      [targetBaseName]: value
    });
  }

  handleReset() {
    this.setState(state => {
      const {timer} = this.state;
      timer.stop();
      return defaultState;
    });
  }

  handlePausePlay(value) {
    this.setState(state => {
      const {timer} = this.state;
      switch (value) {
        case 0:
          // pause the clock
          console.log('Stop the clock!');
          timer.pause();
          break;
        case 1:
          // start the clock
          console.log('Start the clock!');
          timer.play();
          break;
        default:
        // ignore it
      }
      return {isRunning: value};
    });
  }

  tick() {
    this.setState(state => {
      let {currentTimeValue, currentTimeDisplay, progressPercent} = state;
      const {tickStep, sessionLength, breakLength, onBreak} = state;
      const nextState = {};
      if (currentTimeValue < 60) {
        nextState.onBreak = !onBreak;
        currentTimeValue = convertMinToMilli(breakLength);
        progressPercent = 100;
        // play sound or do otherwise something
      } else {
        currentTimeValue = currentTimeValue - tickStep;
        progressPercent = getProgressBarValue(currentTimeValue, convertMinToMilli(sessionLength));
      }
      currentTimeDisplay = formatTime(currentTimeValue);

      nextState.currentTimeValue = currentTimeValue;
      nextState.currentTimeDisplay = currentTimeDisplay;
      nextState.progressPercent = progressPercent;

      return nextState;
    });
  }

  render() {
    const {currentTimeDisplay, breakLength, sessionLength, progressPercent, isRunning, onBreak} = this.state;
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
                {currentTimeDisplay}
              </TimeDisplay>
            </Well>
          </Col>
        </Row>

        <Row>
          <Col lg={4} lgPush={4} sm={5} smPush={3}>
            <div className="text-center">
              <ProgressBar now={progressPercent}
                           label={`${progressPercent}%`}
                           bsStyle={onBreak ? 'warning' : null}
              />
              <Button bsStyle="primary" onClick={this.handleReset}>
                <FaRepeat/> Reset Timer
              </Button> {' '}
              <ToggleButtonGroup type="radio"
                                 name="action"
                                 defaultValue={isRunning}
                                 value={isRunning}
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
