import React, { Component } from 'react';
import { Button, Form, FormField, Input, Message } from 'semantic-ui-react';
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from '../routes';

class ContributeForm extends Component {
  state = {
    amount: '',
    isProccessing: false,
    errorMessage: '',
  }

  onSubmit = async (event) => {
    event.preventDefault();

    try {
      this.setState({ isProccessing: true, errorMessage: '' });

      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(this.props.address);

      await campaign.methods
        .contribute()
        .send({
          from: accounts[0],
          value: web3.utils.toWei(this.state.amount, 'ether'),
        });

      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ isProccessing: false, amount: '' });
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <FormField>
          <label>Amount to Contribute</label>
          <Input
            label='ether'
            labelPosition='right'
            value={this.state.amount}
            onChange={event => this.setState({ amount: event.target.value })} />
        </FormField>
        <Message error header='Oops!' content={this.state.errorMessage} />
        <Button primary
          content='Submit'
          loading={this.state.isProccessing}></Button>
      </Form>
    )
  }
}

export default ContributeForm;