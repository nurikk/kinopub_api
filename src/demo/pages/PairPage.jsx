import React, { Component } from 'react';
class PairPage extends Component {
  render(){
    const {userCode, verificationUrl} = this.props;
    return <div>Pair {verificationUrl} {userCode}</div>;
  }
}
export default PairPage;