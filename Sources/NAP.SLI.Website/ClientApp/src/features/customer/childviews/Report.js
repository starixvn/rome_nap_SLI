import React from "react";
import { connect } from "react-redux";
import { Container } from 'reactstrap';

const Report = () => {

    return (
        <Container>
            Report
        </Container>
    );
}

const mapStateToProps = state => ({
    balanceInfo: state.balanceInfo
});

export default connect(mapStateToProps)(Report);