import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import './CustomerPage.scss';

const CustomerPage = () => {
  const [username, setUsername] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <Form inline className="form-customer" onSubmit={handleSubmit}>
      <FormGroup className="mr-5">
        <Label for="username" className="mr-2">Username</Label>
        <Input type="text" id="username" value={username} onChange={event => setUsername(event.target.value)} />
      </FormGroup>
      <Button type="submit">Search</Button>
    </Form>
  );
};

const connectedCustomerPage = connect()(CustomerPage);
export { connectedCustomerPage as CustomerPage };
