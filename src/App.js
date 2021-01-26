import React, { Component, Fragment }  from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SignUp from './containers/Auth/SignUp';
import SignIn from './containers/Auth/SignIn';
import Logout from './containers/Auth/Logout';
import Dashboard from './containers/Dashboard/Dashboard';
import Ads from './containers/Ads/Ads';
import AddPet from './containers/AddPet/AddPet';
import UpdatePet from './containers/UpdatePet/UpdatePet';

import * as actions from './store/actions/index';
import * as constants from './shared/constants';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path={constants.loginUrl} component={SignIn} />
        <Route path={constants.signupUrl} component={SignUp} />
        <Route path={constants.petsAdsUrl} component={Ads} />
        {/*TODO REMOVE*/}
        <Route path={constants.addPetUrl} component={AddPet} />
        <Route path={constants.updatePetUrl} component={UpdatePet} />
        <Route exact path={constants.homeUrl} component={Dashboard} />
        <Redirect to={constants.defaultUrl} />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path={constants.logoutUrl} component={Logout} />
          <Route path={constants.petsAdsUrl} component={Ads} />
          <Route path={constants.addPetUrl} component={AddPet} />
          <Route path={constants.updatePetUrl} component={UpdatePet} />
          <Route exact path={constants.homeUrl} component={Dashboard} />
          <Redirect to={constants.defaultUrl} />
        </Switch>
      );
    }
    return (
      <Fragment>
        {routes}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

App.propTypes = {
  isAuthenticated: PropTypes.bool,
  onTryAutoSignup: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App) );
