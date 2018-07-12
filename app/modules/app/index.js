import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { Container } from 'semantic-ui-react';
import { createStructuredSelector } from 'reselect';
import Notification from 'containers/Notification';
import { makeSelectCurrentUser } from 'containers/App/redux/selectors';

import reducer from './redux/reducers';
import saga from './redux/saga';
import TopBar from './layout/components/TopBar';
import Dashboard from './dashboard';

import UsersPage from './user/pages/UsersPage';
import UserEditPage from './user/pages/UserEditPage';
import RecordsPage from './record/pages/RecordsPage';
import WeeklyReport from './record/pages/ReportPage';
import RecordEditPage from './record/pages/RecordEditPage';

import './style.scss';

class App extends Component {
  adminRoutes() {
    return (
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/users" component={UsersPage} />
        <Route exact path="/users/:id" component={UserEditPage} />
        <Route exact path="/records" component={RecordsPage} />
        <Route exact path="/report" component={WeeklyReport} />
        <Route exact path="/records/:id" component={RecordEditPage} />

        <Route render={() => <Redirect to="/" />} />
      </Switch>
    );
  }

  userRoutes() {
    return (
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/records" component={RecordsPage} />
        <Route exact path="/report" component={WeeklyReport} />
        <Route exact path="/records/:id" component={RecordEditPage} />

        <Route render={() => <Redirect to="/" />} />
      </Switch>
    );
  }

  managerRoutes() {
    return (
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/users" component={UsersPage} />
        <Route exact path="/users/:id" component={UserEditPage} />

        <Route render={() => <Redirect to="/" />} />
      </Switch>
    );
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div className="main-app">
        <TopBar />
        <Notification />
        <Container className="app-container">
          {this[`${currentUser.get('role')}Routes`]()}
        </Container>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

const withConnect = connect(mapStateToProps);
const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default withRouter(compose(
  withReducer,
  withSaga,
  withConnect,
)(App));
