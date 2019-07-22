import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import withStyles from 'isomorphic-style-loader/withStyles';

import { getUsersAsyncConnect } from 'containers/App/selectors/users';
import { getUsersData } from 'containers/App/actions/app';

import { UsersList, Button } from 'components';

import s from './styles.less';

@asyncConnect([
  {
    key: 'usersFromServerGender',
    promise: async ({ store: { dispatch }, match: { params } }) => {
      await dispatch(getUsersData(params));
    },
  },
])
@connect(state => ({
  usersAsyncConnect: getUsersAsyncConnect(state),
}), null)
@withStyles(s)
export default class UsersGender extends Component {
  static propTypes = {
    usersAsyncConnect: PropTypes.shape().isRequired,
  };

  render() {
    const { usersAsyncConnect } = this.props;

    return (
      <div>
        <Button
          link="/users"
          text="Users"
        />
        <div className={s.wrapperList}>
          <UsersList users={usersAsyncConnect} />
        </div>
      </div>
    );
  }
}
