import React, { Component } from 'react';
import { Button, Form, FormField, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    isProccessing: false,
    errorMessage: '',
  }

  onSubmit = async (event) => {
    event.preventDefault();

    if (!this.state.minimumContribution) {
      alert('Please enter a minimum contribution.');
      return;
    }

    try {
      this.setState({ isProccessing: true, errorMessage: '' });

      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0],
        });

      Router.pushRoute('/');
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ isProccessing: false });
  }

  render() {
    return <Layout>
      <h3>Create a Campaign</h3>

      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <FormField>
          <label>Minimin Contribution</label>
          <Input
            label='wei'
            labelPosition='right'
            value={this.state.minimumContribution}
            onChange={event => this.setState({ minimumContribution: event.target.value })} />
        </FormField>
        <Message error header='Oops!' content={this.state.errorMessage} />
        <Button primary
          content='Submit'
          loading={this.state.isProccessing}></Button>
      </Form>
    </Layout>
  }
}

export default CampaignNew;