import React from "react";
import { connect } from "react-redux";
import { Container } from 'reactstrap';

const LoginInformation = () => {

    return (
        <Container>
            Login
        </Container>
    );
}

const mapStateToProps = state => ({
    balanceInfo: state.balanceInfo
});

export default connect(mapStateToProps)(LoginInformation);