import React, { Component } from 'react';
import { Button, TableCell, TableRow } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

class RequestRow extends Component {
  onApprove = async (event) => {
    event.preventDefault();

    try {
      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .approveRequest(this.props.id)
        .send({
          from: accounts[0],
        });
    } catch (error) {
      console.error(error);
    }
  }

  onFinalize = async (event) => {
    event.preventDefault();

    try {
      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .finalizeRequest(this.props.id)
        .send({
          from: accounts[0],
        });
    } catch (error) {
      console.error(error);
    }
  }


  render() {
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount / 2;

    return (
      <TableRow
        disabled={request.complete}
        positive={readyToFinalize && !request.complete}>
        <TableCell>{id}</TableCell>
        <TableCell>{request.description}</TableCell>
        <TableCell>{web3.utils.fromWei(request.value, 'ether')}</TableCell>
        <TableCell>{request.recipient}</TableCell>
        <TableCell>{request.approvalCount}/{approversCount}</TableCell>
        <TableCell>
          {
            request.complete
              ? null
              : (<Button
                color='green'
                basic
                content='Approve'
                onClick={this.onApprove}></Button>)
          }
        </TableCell>
        <TableCell>
          {
            request.complete
              ? null
              : (<Button
                color='teal'
                basic
                content='Finalize'
                onClick={this.onFinalize}></Button>)
          }
        </TableCell>
      </TableRow>
    )
  }
}

export default RequestRow