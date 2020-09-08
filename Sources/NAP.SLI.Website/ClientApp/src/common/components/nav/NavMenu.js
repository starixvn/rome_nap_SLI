import React, { useState, useCallback } from 'react';
import { Collapse, Navbar, NavbarToggler, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiArrowCollapseLeft, mdiArrowCollapseRight } from '@mdi/js';
import { NavLink } from 'react-router-dom';
import { actions as authenticationActions } from '../../../features/account/authentication/reducer';
import { actions as changePasswordActions } from '../../../features/account/change-password/reducer';
import { actions as sideBarActions } from '../sidebar/reducer';
import './NavMenu.scss';

const NavMenu = ({ username, logout, toggleChangePassword, toggleSideBar, isOpenSideBar }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen(isOpen => !isOpen);
  }, []);

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light >
        <Button type="button" onClick={toggleSideBar}>
          {isOpenSideBar ? <Icon path={mdiArrowCollapseLeft} size={1} /> : <Icon path={mdiArrowCollapseRight} size={1} />}
        </Button>
        <NavbarToggler onClick={handleToggle} className="mr-2" />
        <Collapse className="d-sm-inline-flex" isOpen={isOpen} navbar>
          <ul className="navbar-nav mr-auto">
            <NavItem>
              <NavLink className="nav-link" activeClassName="active" exact to="/customer">Customer</NavLink>
            </NavItem>
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
            <DropdownToggle caret>
              Welcome {username}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={toggleChangePassword}>Change password</DropdownItem>
              <DropdownItem onClick={logout}>Sign Out</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Collapse>
      </Navbar>
    </header>
  );
}

NavMenu.propTypes = {
  username: PropTypes.string.isRequired,
  isOpenSideBar: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  toggleChangePassword: PropTypes.func.isRequired,
  toggleSideBar: PropTypes.func.isRequired
};

const connectedNavMenu = connect(
  state => Object.assign({}, state.authentication.account, { isOpenSideBar: state.sideBar.isOpen }),
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