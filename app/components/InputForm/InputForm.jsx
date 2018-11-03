import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classnames from 'classnames';
import { Button, Well } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form/immutable';
import Promise from 'bluebird';
import { toLower } from 'ramda';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import {
  TextField,
} from 'redux-form-material-ui';

import finalValue from 'Utils/finalValue.js';

import style from './style.scss';

function _onSubmit(values, _, component) {
  const { actions } = component;
  const phrase = values.get('phrase');
  console.log(phrase);
  const result = finalValue(phrase);
  console.log(result);
  actions.setResultsToState(Object.assign({}, result, { phrase }));
}

function Form(props) {
  const {
    handleSubmit,
    reset,
    submitting,
    className,
    actions,
    onSubmit,
  } = props;
  const wrapperClass = classnames({
    [style.wrapper]: true,
    [className]: !!props.className,
  });
  const disabled = submitting;

  return (
    <Well role="formWrapper" className={wrapperClass}>
      <form
        role="phrase-input-form"
        className={style.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <section
          role="inputs"
          className={style.inputWrapper}
        >
          <Field
            className={style.input}
            name="phrase"
            component={TextField}
            floatingLabelText="Phrase"
            parse={toLower}
            required
            disabled={disabled}
          />
        </section>

        <section
          role="button-control"
          className={style.buttonWrapper}
        >
          <Button
            className={style.addBtn}
            type="submit"
            disabled={disabled}
          >Submit</Button>

          <Button
            className={style.resetBtn}
            type="button"
            onClick={reset}
            disabled={disabled}
          >Reset</Button>
        </section>
      </form>
    </Well>
  );
}


Form.propTypes = {
  submitting: PropTypes.bool,  // reduxForm
  pristine: PropTypes.bool,  // reduxForm
  handleSubmit: PropTypes.func,  // reduxForm
  reset: PropTypes.func,  // reduxForm
  initialize: PropTypes.func,  // reduxForm
  initialized: PropTypes.bool,  // reduxForm
  onSubmit: PropTypes.func,  // withProps
  className: PropTypes.string,  // from parent
  actions: PropTypes.object,  // from parent
};

export default compose(
  reduxForm({
    form: 'inputForm',
  }),
  withProps({ onSubmit: _onSubmit }),
)(Form);

