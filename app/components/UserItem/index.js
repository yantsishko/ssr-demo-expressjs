import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';

import s from './styles.less';

@withStyles(s)
export default class User extends Component {
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  };

  render() {
    const { name, email, phone, avatar } = this.props;

    return (
      <div className={s.block}>
        <div>{name}</div>
        <div>{email}</div>
        <div>{phone}</div>
        <div>
          <img alt="avatar" src={avatar} />
        </div>
      </div>
    );
  }
}
