import React, { useState } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import './SideBar.scss';

const SideBar = () => {

  const [username, setUsername] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <Form inline className="form-search" onSubmit={handleSubmit}>
      <FormGroup className="mr-2">
        <Input className="username" type="text" placeholder="Input username" value={username} onChange={event => setUsername(event.target.value)} />
      </FormGroup>
      <Button type="submit">Search</Button>
    </Form>
  );
}


export { SideBar };