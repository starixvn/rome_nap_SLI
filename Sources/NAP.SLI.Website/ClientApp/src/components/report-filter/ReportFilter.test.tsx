import React from 'react';
import { getToday, maxDate, minDate } from 'utils/DateUtils';
import { mount, shallow } from 'enzyme';
import ReportFilter from './ReportFilter';
import { act } from 'react-dom/test-utils';

describe('ReportFilter', () => {
  const handleExcel = jest.fn();
  const handleQuery = jest.fn();

  const props = {
    minDate,
    maxDate,
    fromDate: getToday(),
    toDate: getToday(),
    onQuery: handleQuery,
    onExcel: handleExcel,
  };

  it('should update fromdate on change', async () => {
    // Arrange
    const wrapper = mount(<ReportFilter {...props} />);
    const fromDateInput = wrapper.find('input').at(0);
    // Act
    fromDateInput.simulate('change', { target: { value: '01/01/2025' } });
    // await new Promise((resolve) => {
    //   setTimeout(resolve);
    // });

    // Assert
    expect(fromDateInput).toBe('01/01/2025');
  });
});
