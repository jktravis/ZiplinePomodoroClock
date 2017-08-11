import React from 'react';
import PropTypes from 'prop-types';
import {
  ControlLabel,
  FormControl,
  FormGroup,
} from 'react-bootstrap';

const propTypes = {
  labelRef: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  changeFn: PropTypes.func
};

const defaultProps = {
  value: 1,
  changeFn: () => {}
};

function NumberField({labelRef, labelName, value, changeFn}) {
  return (
    <FormGroup>
      <ControlLabel htmlFor={labelRef}>{labelName}</ControlLabel>
      <FormControl type="number"
                   id={labelRef}
                   min="1"
                   value={value}
                   onChange={changeFn}
      />
    </FormGroup>
  );
}

NumberField.propTypes = propTypes;
NumberField.defaultProps = defaultProps;

export default NumberField;
