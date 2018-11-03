import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classnames from 'classnames';
import { Button, Well } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form/immutable';
import Promise from 'bluebird';
import { toUpper } from 'ramda';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';

import setupFetchSourceData from 'Utils/setupFetchSourceData.js';

import {
  TextField,
} from 'redux-form-material-ui';

import style from './style.scss';

function _onSubmit(values, _, component) {
  const { actions } = component;
  // format ticker to uppercase
  const ticker = toUpper(values.get('ticker'));
  const dataObj = setupFetchSourceData(ticker);
  return new Promise((resolve, reject) => {
    // set ticker symbol, formatted in middleware
    return actions.getSourceData(dataObj)
      .then(resolve)
      .catch(reject);
  });
}

function Form(props) {
  const {
    handleSubmit,
    reset,
    submitting,
    className,
    actions,
    environment,
    onSubmit,
  } = props;
  const wrapperClass = classnames({
    [style.wrapper]: true,
    [className]: !!props.className,
  });
  const processing = environment.get('processing');
  const disabled = submitting || processing;

  return (
    <Well role="formWrapper" className={wrapperClass}>
      <form
        role="security-add-form"
        className={style.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <section
          role="inputs"
          className={style.inputWrapper}
        >
          <Field
            className={style.input}
            name="ticker"
            component={TextField}
            floatingLabelText="Add Security"
            parse={toUpper}
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
          >Add</Button>

          <Button
            className={style.launchBtn}
            type="button"
            onClick={actions.launchActionPlanAll}
            disabled={disabled}
          >Launch!</Button>

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
  securities: ImmutablePropTypes.map,  // from parent
  actions: PropTypes.object,  // from parent
  environment: ImmutablePropTypes.map,  // from parent
};

export default compose(
  reduxForm({
    form: 'addForm',
  }),
  withProps({ onSubmit: _onSubmit }),
)(Form);

