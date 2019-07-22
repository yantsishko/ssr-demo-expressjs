import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Link } from 'react-router-dom';

import s from './styles.less';

function Button(props) {
  return (
    <button className={s.button} >
      <Link
        className={s.link}
        to={props.link}
      >{props.text}</Link>
    </button>
  );
}

Button.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default withStyles(s)(Button);
