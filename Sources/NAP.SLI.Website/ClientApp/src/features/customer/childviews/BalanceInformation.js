import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from 'reactstrap';

const BalanceInformation = () => {

    return (
        <Container>
            <Row>
                <Col xs="6">Total Cash</Col>
                <Col xs="6" className='text-right'><span className="color-currency">UUS</span> 0.00</Col>
            </Row>
            <Row>
                <Col xs="6">Yesterday Cash</Col>
                <Col xs="6" className='text-right'><span className="color-currency">UUS</span> 0.00</Col>
            </Row>
            <Row>
                <Col xs="6">Total Balance</Col>
                <Col xs="6" className='text-right'><span className="color-currency">UUS</span> 0.00</Col>
            </Row>
            <Row>
                <Col xs="6">Yesterday Balance</Col>
                <Col xs="6" className='text-right'><span className="color-currency">UUS</span> 0.00</Col>
            </Row>
            <Row>
                <Col xs="6">Outstanding</Col>
                <Col xs="6" className='text-right'><span className="color-currency">UUS</span> 0.00</Col>
            </Row>
            <Row>
                <Col xs="6">Given Credit</Col>
                <Col xs="6" className='text-right'><span className="color-currency">UUS</span> 0.00</Col>
            </Row>
            <Row>
                <Col xs="6">Agent Outstanding</Col>
                <Col xs="6" className='text-right'><span className="color-currency">UUS</span> 0.00</Col>
            </Row>
            <Row>
                <Col xs="6">Used Credit</Col>
                <Col xs="6" className='text-right'><span className="color-currency">UUS</span> 0.00</Col>
            </Row>
            <Row>
                <Col xs="6">Agents A/C/S</Col>
                <Col xs="6" className='text-right'><span className="color-currency">UUS</span> 0.00</Col>
            </Row>
            <Row>
                <Col xs="6">Members A/C/S</Col>
                <Col xs="6" className='text-right'><span className="color-currency">UUS</span> 0.00</Col>
            </Row>
        </Container>
    );
}

const mapStateToProps = state => ({
    balanceInfo: state.balanceInfo
});

export default connect(mapStateToProps)(BalanceInformation);