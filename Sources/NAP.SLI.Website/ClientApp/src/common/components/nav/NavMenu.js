import React, { useState, useCallback } from 'react';
import { Collapse, Navbar, NavbarToggler, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiViewDashboard } from '@mdi/js';
import { NavLink } from 'react-router-dom';
import { actions as authenticationActions } from '../../../features/account/authentication/reducer';
import { actions as changePasswordActions } from '../../../features/account/change-password/reducer';
import { actions as sideBarActions } from '../sidebar/reducer';
import './NavMenu.scss';

const NavMenu = ({ username, logout, toggleChangePassword, toggleSideBar }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen(isOpen => !isOpen);
  }, []);

  return (
    <Navbar className="navbar-expand border-bottom box-shadow">
      <Button className="mr-3" color="outline-light" onClick={toggleSideBar}>
        <Icon path={mdiViewDashboard} />
      </Button>
      <NavbarToggler onClick={handleToggle} className="mr-2" />
      <Collapse className="d-sm-inline-flex" isOpen={isOpen} navbar>
        <ul className="navbar-nav mr-auto">
          <NavItem>
            <NavLink className="nav-link" activeClassName="active" to="/reports">Reports</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" activeClassName="active" to="/result">Result</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" activeClassName="active" to="/administration">Administration</NavLink>
          </NavItem>
        </ul>
        <UncontrolledDropdown>
          <DropdownToggle caret color="outline-light">
            Welcome <span className="font-weight-500">{username}</span>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={toggleChangePassword}>Change password</DropdownItem>
            <DropdownItem onClick={logout}>Sign Out</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Collapse>
    </Navbar>
  );
}

NavMenu.propTypes = {
  username: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  toggleChangePassword: PropTypes.func.isRequired,
  toggleSideBar: PropTypes.func.isRequired
};

const connectedNavMenu = connect(
  state => Object.assign({}, state.authentication.account),
  dispatch => bindActionCreators(Object.assign(
    {},
    {
      logout: authenticationActions.logout
    },
    {
      toggleChangePassword: changePasswordActions.toggle
    },
    {
      toggleSideBar: sideBarActions.toggle
    }
  ), dispatch)
)(NavMenu);

export { connectedNavMenu as NavMenu };