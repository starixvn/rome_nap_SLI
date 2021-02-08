import React from 'react';
import SentryFallback from 'components/error/SentryFallback';
import { mount, shallow } from 'enzyme';

jest.mock('app/store');

describe('SentryFallback', () => {

  it('render SetryFallBack', () => {

    const component = mount(
      <SentryFallback />,
    );

    expect(component).toMatchSnapshot();

    component.unmount();
  });
});
