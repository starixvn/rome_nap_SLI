import React from "react";
import { connect } from "react-redux";
import { Container } from 'reactstrap';

const CustomerSettings = () => {

    return (
        <Container>
            Settings
        </Container>
    );
}

const mapStateToProps = state => ({
    balanceInfo: state.balanceInfo
});

export default connect(mapStateToProps)(CustomerSettings);