import React, { Component } from 'react';
import FaRepeat from 'react-icons/lib/fa/repeat'
import FaPause from 'react-icons/lib/fa/pause';
import FaPlay from 'react-icons/lib/fa/play';
import {
  Button,
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
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

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentTime: '24:00',
      breakLength: 5, // in minutes
      sessionLength: 25 // in minutes
    }

    this.handleFiledChange = this.handleFiledChange.bind(this);
  }

  handleFiledChange(event) {
    this.setState({ [event.target.id]: event.target.value})
  }

  render() {
    const {currentTime, breakLength, sessionLength} = this.state;
    return (
      <Grid fluid>
        <Row>
          <Col lg={2} lgPush={4} sm={2} smPush={3}>
            <NumberField labelRef="breakLength"
                         labelName="Break Length"
                         changeFn={this.handleFiledChange}
                         value={breakLength}
            />
          </Col>

          <Col lg={2} lgPush={4} sm={2} smPush={4}>
            <NumberField labelRef="sessionLength"
                         labelName="Session Length"
                         changeFn={this.handleFiledChange}
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
              <ProgressBar now={50}/>
              <Button bsStyle="primary">
                <FaRepeat/> Reset Timer
              </Button> {' '}
              <ToggleButtonGroup type="radio" name="action" defaultValue={2}>
                <ToggleButton value={2}>
                  <FaPause/> Pause
                </ToggleButton>
                <ToggleButton value={3}>
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
