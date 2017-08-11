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

class App extends Component {
  render() {
    const currentTime = "24:00";
    return (
      <Grid fluid>
        <Row>
          <Col lg={2} lgPush={4} sm={2} smPush={3}>
            <FormGroup>
              <ControlLabel htmlFor="breakLength">Break Length</ControlLabel>
              <FormControl type="number" id="breakLength" min="1"/>
            </FormGroup>
          </Col>

          <Col lg={2} lgPush={4} sm={2} smPush={4}>
            <FormGroup>
              <ControlLabel htmlFor="sessionLength">Session Length</ControlLabel>
              <FormControl id="sessionLength" type="number" min="1"/>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col lg={4} lgPush={4} sm={5} smPush={3}>
            <Well>
              <div className="text-center timer">
                {currentTime}
              </div>
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
