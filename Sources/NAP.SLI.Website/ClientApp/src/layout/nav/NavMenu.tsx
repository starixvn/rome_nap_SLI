import './NavMenu.scss';
import React, { useState, useCallback } from 'react';
import {
  Collapse,
  Navbar,
  Nav,
  NavLink,
  NavbarToggler,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from 'reactstrap';
import { NavLink as RRNavLink, useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiViewDashboard } from '@mdi/js';
import { logout } from 'features/account/authentication/reducer';
import { toggleModal } from 'features/account/change-password/reducer';
import { useAppDispatch } from 'app/store';
import { toggle } from 'layout/sidebar/reducer';
import storage from 'services/storage';

const NavMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, []);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  const account = storage.get();
  if (!account) {
    return <></>;
  }

  const { username, isAdmin } = account;

  return (
    <Navbar className="navbar-expand border-bottom box-shadow">
      <Button
        className="mr-3"
        color="outline-light"
        onClick={() => dispatch(toggle())}
      >
        <Icon path={mdiViewDashboard} />
      </Button>
      <NavbarToggler onClick={handleToggle} className="mr-2" />
      <Collapse className="d-sm-inline-flex" isOpen={isOpen} navbar>
        <Nav className="mr-auto">
          {isAdmin && (
            <NavItem>
              <NavLink
                tag={RRNavLink}
                className="nav-link"
                to="/user-management"
              >
                User Management
              </NavLink>
            </NavItem>
          )}
        </Nav>
        <UncontrolledDropdown>
          <DropdownToggle caret color="outline-light">
            Welcome <span className="font-weight-500">{username}</span>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={() => dispatch(toggleModal())}>
              Change password
            </DropdownItem>
            <DropdownItem onClick={handleLogout}>Sign Out</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Collapse>
    </Navbar>
  );
};

export default NavMenu;
