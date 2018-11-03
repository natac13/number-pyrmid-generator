import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Button } from 'react-bootstrap';
import classnames from 'classnames';

import Header from '../Header/';
import InputForm from '../InputForm/';

import style from './style.scss';

function Main(props) {
  const {
    appName,
    actions,
    numberPyramid,
  } = props;

  const wrapperClass = classnames({
    [style.wrapper]: true,
  });
  console.log(props);
  return (
    <div className={wrapperClass}>
      <Header title={appName} />
      <InputForm
        className={style.form}
        actions={actions}
      />
      <h3>Results for: {numberPyramid.get('phrase')} </h3>
      <h4>{numberPyramid.get('number')}</h4>
    </div>
  );
}

Main.propTypes = {
  appName: PropTypes.string,
  actions: PropTypes.object,
  numberPyramid: ImmutablePropTypes.map,
};

export default Main;
