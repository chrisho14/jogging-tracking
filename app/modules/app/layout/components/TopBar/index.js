import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Container } from 'semantic-ui-react';
import { makeSelectCurrentUser } from 'containers/App/redux/selectors';
import { logout } from 'modules/auth/redux/actions';

import './style.scss';

class TopBar extends Component {
  render() {
    const { currentUser, logout: logoutAction } = this.props;
    return (
      <Menu fixed="top" color="brown" inverted>
        <Container>
          <Menu.Item as={Link} header to="/">
            Jogging Tracking
          </Menu.Item>
          {(currentUser.get('role') === 'admin' || currentUser.get('role') === 'manager') && <Dropdown item simple text="Users">
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/users/new">Add New User</Dropdown.Item>
              <Dropdown.Item as={Link} to="/users">User List</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>}
          {(currentUser.get('role') === 'admin' || currentUser.get('role') === 'user') && <Dropdown item simple text="Records">
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/records/new">Add New Record</Dropdown.Item>
              <Dropdown.Item as={Link} to="/report">Weekly Report</Dropdown.Item>
              <Dropdown.Item as={Link} to="/records">Record List</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>}
          <Menu.Menu position="right">
            <Dropdown item simple text={currentUser.get('userName')}>
              <Dropdown.Menu>
                <Dropdown.Item onClick={logoutAction}>Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

const mapDispatchToProps = {
  logout,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(TopBar);
