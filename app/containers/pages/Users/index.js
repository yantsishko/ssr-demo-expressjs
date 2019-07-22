import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import withStyles from 'isomorphic-style-loader/withStyles';

import { getUsersSaga, getUsersAsyncConnect } from 'containers/App/selectors/users';
import { getUsersData } from 'containers/App/actions/app';

import { UsersList, Button } from 'components';

import s from './styles.less';

@asyncConnect([
  {
    key: 'usersFromServer',
    promise: async ({ store: { dispatch } }) => {
      await dispatch(getUsersData());

      return Promise.resolve();
    },
  },
])
@connect(state => ({
  usersSaga: getUsersSaga(state),
  usersAsyncConnect: getUsersAsyncConnect(state),
}), null)
@withStyles(s)
export default class Users extends Component {
  static propTypes = {
    usersAsyncConnect: PropTypes.shape().isRequired,
    usersSaga: PropTypes.shape().isRequired,
  };

  render() {
    const { usersSaga, usersAsyncConnect } = this.props;

    return (
      <div>
        <Button
          link="/users-gender/male"
          text="Male"
        />
        <Button
          link="/users-gender/female"
          text="Female"
        />
        <div className={s.title}>Users from Saga</div>
        <UsersList users={usersSaga} />
        <div className={s.title}>Users from Async Connect</div>
        <UsersList users={usersAsyncConnect} />
      </div>
    );
  }
}
