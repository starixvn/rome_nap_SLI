import './Page.scss';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Collapse,
  Nav,
  NavLink,
  NavItem,
} from 'reactstrap';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';
import {
  CustomerLevels,
  getDownlineLevel,
  getLevelName,
  isDownlineLevel,
} from 'utils/CustomerLevelUtils';
import { selectUsername } from '../reducer';
import { useAppDispatch } from 'app/store';

const CustomerPage = () => {
  const dispatch = useAppDispatch();
  const { customer } = useSelector((state: AppState) => state.sidebar);
  const [isOpenCustomerInfo, setIsOpenCustomerInfo] = useState(true);
  const [isOpenReports, setIsOpenReports] = useState(true);

  if (!customer) {
    return <></>;
  }

  const { generalInformation, headline } = customer;
  const {
    custId,
    roleId,
    username,
    firstName,
    lastName,
    username2,
    fax,
    phone,
    mobilePhone,
  } = generalInformation;
  const { superName, masterName, agentName } = headline;

  const handleUsernameClicked = (username: string) => {
    dispatch(selectUsername({ username }));
  };

  const getCustomerSettingLink = () => {
    switch (roleId) {
      case CustomerLevels.Super:
        return '/customer-setting/super';
      case CustomerLevels.Master:
        return '/customer-setting/master';
      case CustomerLevels.Agent:
        return '/customer-setting/agent';
      case CustomerLevels.Member:
        return '/customer-setting/member';
    }
  };

  const reportSearchParams = `custId=${custId}&roleId=${roleId}&username=${username}`;

  return (
    <div className="customer-page">
      <Container className="my-3">
        {isDownlineLevel(roleId, CustomerLevels.Super) && (
          <Row>
            <Col xs="5">Super</Col>
            <Col xs="7">
              <span
                className="text-link"
                onClick={() => handleUsernameClicked(superName)}
              >
                {superName}
              </span>
            </Col>
          </Row>
        )}
        {isDownlineLevel(roleId, CustomerLevels.Master) && (
          <Row>
            <Col xs="5">Master</Col>
            <Col xs="7">
              <span
                className="text-link"
                onClick={() => handleUsernameClicked(masterName)}
              >
                {masterName}
              </span>
            </Col>
          </Row>
        )}
        {isDownlineLevel(roleId, CustomerLevels.Agent) && (
          <Row>
            <Col xs="5">Agent</Col>
            <Col xs="7">
              <span
                className="text-link"
                onClick={() => handleUsernameClicked(agentName)}
              >
                {agentName}
              </span>
            </Col>
          </Row>
        )}
      </Container>
      <div className="mb-3">
        <div className="py-2 font-weight-500 bg-lightgrey text-primary">
          <Container
            onClick={() => setIsOpenCustomerInfo(!isOpenCustomerInfo)}
            className="d-flex"
          >
            <span className="width-inherit">{username}</span>
            <Icon path={isOpenCustomerInfo ? mdiChevronDown : mdiChevronUp} />
          </Container>
        </div>
        <Collapse isOpen={isOpenCustomerInfo}>
          <Container className="pb-2">
            <Row>
              <Col xs="5">Name</Col>
              <Col xs="7">
                {firstName} - {lastName}
              </Col>
            </Row>
            <Row>
              <Col xs="5">Nick Name</Col>
              <Col xs="7">{username2}</Col>
            </Row>
            <Row>
              <Col xs="5">Fax</Col>
              <Col xs="7">{fax}</Col>
            </Row>
            <Row>
              <Col xs="5">Phone</Col>
              <Col xs="7">{phone}</Col>
            </Row>
            <Row>
              <Col xs="5">Mobile</Col>
              <Col xs="7">{mobilePhone}</Col>
            </Row>
          </Container>
        </Collapse>
      </div>
      <div className="mb-3">
        <div className="py-2 font-weight-500 bg-lightgrey text-primary">
          <Container>
            <Link to={`${getCustomerSettingLink()}/${custId}`}>
              VIEW SETTING
            </Link>
          </Container>
        </div>
      </div>
      <div className="mb-3">
        <div className="py-2 font-weight-500 bg-lightgrey text-primary">
          <Container
            onClick={() => setIsOpenReports(!isOpenReports)}
            className="d-flex"
          >
            <span className="width-inherit">REPORTS</span>
            <Icon path={isOpenReports ? mdiChevronDown : mdiChevronUp} />
          </Container>
        </div>
        <Collapse isOpen={isOpenReports}>
          <Container className="pb-2">
            <Nav vertical>
              {roleId !== CustomerLevels.Member && (
                <>
                  <NavItem>
                    <NavLink
                      tag={RRNavLink}
                      to={{
                        pathname: '/report/win-loss-detail',
                        search: reportSearchParams,
                      }}
                    >
                      {`${getLevelName(
                        getDownlineLevel(roleId),
                      )} Win Loss Detail`}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      tag={RRNavLink}
                      to={{
                        pathname: '/report/match-win-loss-detail',
                        search: reportSearchParams,
                      }}
                    >
                      Match Win Loss Detail
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      tag={RRNavLink}
                      to={{
                        pathname: '/report/win-loss-by-bet-type',
                        search: reportSearchParams,
                      }}
                    >
                      Win Loss By Bet Type
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      tag={RRNavLink}
                      to={{
                        pathname: '/report/win-loss-analysis',
                        search: reportSearchParams,
                      }}
                    >
                      Win Loss Analysis
                    </NavLink>
                  </NavItem>
                </>
              )}
              {roleId === CustomerLevels.Member && (
                <>
                  <NavItem>
                    <NavLink
                      tag={RRNavLink}
                      to={{
                        pathname: '/report/bet-list',
                        search: reportSearchParams,
                      }}
                    >
                      Bet List
                    </NavLink>
                  </NavItem>
                </>
              )}
            </Nav>
          </Container>
        </Collapse>
      </div>
      <div className="mb-3">
        <div className="py-2 font-weight-500 bg-lightgrey text-primary">
          <Container>
            <Link
              to={{
                pathname: '/report/results',
                search: reportSearchParams,
              }}
            >
              RESULTS
            </Link>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
