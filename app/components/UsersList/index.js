import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';

import User from '../UserItem';
import s from './styles.less';

@withStyles(s)
export default class UsersList extends Component {
  static propTypes = {
    users: PropTypes.shape().isRequired,
  };

  render() {
    const { users } = this.props;

    return (
      <div>
        {
          users.map(user => (
            <User
              key={user.getIn(['login', 'uuid'])}
              avatar={user.getIn(['picture', 'medium'])}
              email={user.get('email')}
              name={user.getIn(['name', 'first'])}
              phone={user.get('phone')}
            />))
        }
      </div>
    );
  }
}
