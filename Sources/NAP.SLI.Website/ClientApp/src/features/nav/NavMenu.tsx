import './NavMenu.scss';
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { NavLink as RRNavLink } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiViewDashboard } from '@mdi/js';
import { logout } from '../account/authentication/reducer';
import { toggleModal } from '../account/change-password/reducer';
import { toggle } from '../sidebar/reducer';
import { RouteLinks } from '../../common/utils/RouteUtils';
import { UserGroup } from '../../common/utils/UserGroupUtils';

const NavMenu = () => {
  const dispatch = useDispatch();
  const { account } = useSelector((state: AppState) => state.authentication);
  const [isOpen, setIsOpen] = useState(false);

  if (!account) {
    return <></>;
  }

  const { username, groupId } = account;
  const handleToggle = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, []);

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
          {groupId === UserGroup.Admin && (
            <NavItem>
              <NavLink
                tag={RRNavLink}
                className="nav-link"
                to={RouteLinks.USER_MANAGEMENT}
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
            <DropdownItem onClick={() => dispatch(logout())}>
              Sign Out
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Collapse>
    </Navbar>
  );
};

export default NavMenu;
