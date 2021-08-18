import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import TableGroup, { Props } from './TableGroup';

describe('TableGroup', () => {
  const renderComponent = (props: Props): ReactWrapper =>
    mount(<TableGroup {...props} />);

  it('render with data', () => {
    // Arrange
    const props: Props = {
      level: 'Test',
      userName: 'username',
      firstName: 'firstname',
      lastName: 'lastname',
      phone: 'phone',
      mobilePhone: 'mobilephone',
      fax: 'fax',
      disableNumber: true,
      v161MinBet: 100,
      v161MaxBet: 200,
      v161MaxPerMatch: 300,
      v161MaxPerBall: 400,
      v164MinBet: 500,
      v164MaxBet: 600,
      v164MaxPerMatch: 700,
    };

    // Act
    const component = renderComponent(props);

    // Assert
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
