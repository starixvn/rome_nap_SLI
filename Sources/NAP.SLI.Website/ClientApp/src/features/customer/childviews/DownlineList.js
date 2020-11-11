import React from "react";
import { connect } from "react-redux";
import { Container } from 'reactstrap';

const DownlineList = () => {

    return (
        <Container>
            Downline List
        </Container>
    );
}

const mapStateToProps = state => ({
    balanceInfo: state.balanceInfo
});

export default connect(mapStateToProps)(DownlineList);