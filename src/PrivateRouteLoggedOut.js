import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded
const PrivateRouteLoggedOut = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !!auth.uid ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth
});

export default connect(mapStateToProps)(PrivateRouteLoggedOut);
