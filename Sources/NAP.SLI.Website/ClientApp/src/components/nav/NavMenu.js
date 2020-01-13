import React, { useState, useCallback } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { authenticationActions } from '../../reducers/Authentication';
import { passwordActions } from '../../reducers/Password';
import './NavMenu.scss';

const NavMenu = ({ username, logout, toggleModal }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen(isOpen => !isOpen);
  }, []);

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light >
        <NavbarBrand tag={Link} to="/">NAP.SLI</NavbarBrand>
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
              <DropdownItem onClick={toggleModal}>Change password</DropdownItem>
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
  logout: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

const connectedNavMenu = connect(
  state => state.authentication.user,
  dispatch => bindActionCreators(Object.assign({}, authenticationActions, passwordActions), dispatch)
)(NavMenu);

export { connectedNavMenu as NavMenu };