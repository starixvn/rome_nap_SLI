import React from "react";
import { connect } from "react-redux";
import { Container } from 'reactstrap';

const OnlineList = () => {

    return (
        <Container>
            Online List
        </Container>
    );
}

const mapStateToProps = state => ({
    balanceInfo: state.balanceInfo
});

export default connect(mapStateToProps)(OnlineList);