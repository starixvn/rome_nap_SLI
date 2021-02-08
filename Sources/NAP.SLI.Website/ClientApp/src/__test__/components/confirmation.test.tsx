import React from 'react';
import Confirmation from 'components/confirmation/Confirmation';
import { mount, shallow } from 'enzyme';

jest.mock('app/store');

describe('Modal', () => {

  it('render title and message', () => {

    const component = mount(
      <Confirmation title='title' message='message' />,
    );

    expect(component).toMatchSnapshot();

    component.unmount();
  });

  it('call onCancel', () => {

    const onCancel = jest.fn();

    const component = mount(
      <Confirmation title='title' message='message' onCancel={onCancel} />,
    );
    component.find('[color="secondary"]').simulate('click');

    expect(onCancel).toHaveBeenCalled();
  });

  it('call onConfirm', () => {

    const onConfirm = jest.fn();

    const component = mount(
      <Confirmation title='title' message='message' onConfirm={onConfirm} />,
    );

    component.find('[color="primary"]').simulate('click');

    expect(onConfirm).toHaveBeenCalled();
  });
});
