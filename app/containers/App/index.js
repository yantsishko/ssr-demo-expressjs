import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { renderRoutes } from 'react-router-config';

import { getRouterLocation } from './selectors/router';


@connect(state => ({
  location: getRouterLocation(state),
}), null)
export default class App extends Component {
  static propTypes = {
    location: PropTypes.shape().isRequired,
    route: PropTypes.shape().isRequired,
  };

  renderSiteMeta() {
    const canonical = this.props.location.toJS().pathname.toLowerCase();
    return (<Helmet
      link={[{
        href: canonical,
        rel: 'canonical',
      }]}
      meta={[{
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      }]}
    />
    );
  }

  render() {
    const { route } = this.props;

    return (
      <div>
        {this.renderSiteMeta()}
        {renderRoutes(route.routes)}
      </div>
    );
  }
}
