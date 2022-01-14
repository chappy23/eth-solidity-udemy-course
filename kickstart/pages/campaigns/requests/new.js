import React, { Component } from 'react';
import { Form, FormField, Input, Button, Message } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';

class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recipient: '',
    isProccessing: false,
    errorMessage: '',
  };

  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const { description, value, recipient } = this.state;

    try {
      this.setState({ isProccessing: true, errorMessage: '' });

      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(this.props.address);

      await campaign.methods
        .createRequest(
          description,
          web3.utils.toWei(value, 'ether'),
          recipient
        )
        .send({
          from: accounts[0],
        });

      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ isProccessing: false, amount: '' });
  }

  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>Back</a>
        </Link>
        <h3>Create Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <FormField>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={event => this.setState({ description: event.target.value })}
            ></Input>
          </FormField>
          <FormField>
            <label>Value in Ether</label>
            <Input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            ></Input>
          </FormField>
          <FormField>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={event => this.setState({ recipient: event.target.value })}
            ></Input>
          </FormField>
          <Message error header='Oops!' content={this.state.errorMessage} />
          <Button primary
            content='Submit'
            loading={this.state.isProccessing}></Button>
        </Form>
      </Layout>
    )
  }
}

export default RequestNew;