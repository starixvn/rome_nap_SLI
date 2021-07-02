import React from 'react';
import {
  formatDate,
  getLastMonthRange,
  getLastWeekRange,
  getSinceLastMonthRange,
  getThisMonthRange,
  getThisWeekRange,
  getToday,
  getYesterday,
  maxDate,
  minDate,
  stringDateToMoment,
} from 'utils/DateUtils';
import ReportFilter from './ReportFilter';
import {
  act,
  cleanup,
  fireEvent,
  screen,
  render,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Moment } from 'moment';

describe('ReportFilter', () => {
  const handleExcel = jest.fn();
  const handleQuery = jest.fn();

  const props = {
    minDate,
    maxDate,
    fromDate: stringDateToMoment('06/30/2021'),
    toDate: stringDateToMoment('06/30/2021'),
    onQuery: handleQuery,
    onExcel: handleExcel,
  };

  let fromDateInput: HTMLInputElement;
  let toDateInput: HTMLInputElement;
  let dropdownBtn: HTMLButtonElement;
  let toDayBtn: HTMLButtonElement;
  let yesterdayBtn: HTMLButtonElement;
  let thisWeekBtn: HTMLButtonElement;
  let lastWeekBtn: HTMLButtonElement;
  let thisMonthBtn: HTMLButtonElement;
  let lastMonthBtn: HTMLButtonElement;
  let sinceLastMonthBtn: HTMLButtonElement;
  let specificDatesBtn: HTMLButtonElement;
  let excelBtn: HTMLButtonElement;
  let submitBtn: HTMLButtonElement;

  beforeEach(async () => {
    await act(async () => {
      const { container } = render(<ReportFilter {...props} />);

      const inputs = container.querySelectorAll('input');
      fromDateInput = inputs[0];
      toDateInput = inputs[1];
      dropdownBtn = container.querySelector(
        'button.dropdown-toggle',
      ) as HTMLButtonElement;

      const buttons = container.querySelectorAll('button.dropdown-item');
      toDayBtn = buttons[0] as HTMLButtonElement;
      yesterdayBtn = buttons[1] as HTMLButtonElement;
      thisWeekBtn = buttons[2] as HTMLButtonElement;
      lastWeekBtn = buttons[3] as HTMLButtonElement;
      thisMonthBtn = buttons[4] as HTMLButtonElement;
      lastMonthBtn = buttons[5] as HTMLButtonElement;
      sinceLastMonthBtn = buttons[6] as HTMLButtonElement;
      specificDatesBtn = buttons[7] as HTMLButtonElement;

      excelBtn = container.querySelector(
        'button.btn-excel',
      ) as HTMLButtonElement;
      submitBtn = container.querySelector(
        'button[type="submit"]',
      ) as HTMLButtonElement;
    });
  });
  afterEach(cleanup);

  const expectDropdownWorkingWithExpectedDate = (
    expectedFromDate: Moment,
    expecteToDate: Moment,
  ) => {
    const fromDateVal = fromDateInput.value;
    const toDateVal = toDateInput.value;

    expect(fromDateVal).toBe(formatDate(expectedFromDate));
    expect(toDateVal).toBe(formatDate(expecteToDate));
    expect(handleQuery).toBeCalledWith(
      stringDateToMoment(fromDateVal),
      stringDateToMoment(toDateVal),
    );
  };

  it('should update fromDate on change', () => {
    // Arange
    const expectedValue = '07/01/2021';

    // Act
    fireEvent.change(fromDateInput, {
      target: {
        value: expectedValue,
      },
    });

    // Assert
    expect(fromDateInput.value).toBe(expectedValue);
    expect(dropdownBtn.textContent).toBe('Specific Dates');
  });

  it('should update toDate on change', () => {
    // Arange
    const expectedValue = '07/01/2021';

    // Act
    fireEvent.change(toDateInput, {
      target: {
        value: expectedValue,
      },
    });

    // Assert
    expect(toDateInput.value).toBe(expectedValue);
    expect(dropdownBtn.textContent).toBe('Specific Dates');
  });

  it('should update fromDate equal to toDate when toDate is before fromDate', () => {
    // Arange
    const expectedValue = '06/29/2021';

    // Act
    fireEvent.change(toDateInput, {
      target: {
        value: expectedValue,
      },
    });

    // Assert
    expect(toDateInput.value).toBe(expectedValue);
    expect(fromDateInput.value).toBe(expectedValue);
    expect(dropdownBtn.textContent).toBe('Specific Dates');
  });

  it('should update toDate equal to fromDate when fromDate is after toDate', () => {
    // Arange
    const expectedValue = '07/01/2021';

    // Act
    fireEvent.change(fromDateInput, {
      target: {
        value: expectedValue,
      },
    }),
      // Assert
      expect(fromDateInput.value).toBe(expectedValue);
    expect(toDateInput.value).toBe(expectedValue);
    expect(dropdownBtn.textContent).toBe('Specific Dates');
  });

  it('should update dropdown button when clicked Today button', async () => {
    // Act
    await waitFor(() => {
      userEvent.click(dropdownBtn);
      userEvent.click(toDayBtn);
    });

    // Assert
    const expectedDate = getToday();
    expect(dropdownBtn.textContent).toBe('Today');
    expectDropdownWorkingWithExpectedDate(expectedDate, expectedDate);
  });

  it('should update dropdown button when clicked Yesterday button', async () => {
    // Act
    await waitFor(() => {
      userEvent.click(dropdownBtn);
      userEvent.click(yesterdayBtn);
    });

    // Assert
    const expectedDate = getYesterday();
    expect(dropdownBtn.textContent).toBe('Yesterday');
    expectDropdownWorkingWithExpectedDate(expectedDate, expectedDate);
  });

  it('should update dropdown button when clicked This Week button', async () => {
    // Act
    await waitFor(() => {
      userEvent.click(dropdownBtn);
      userEvent.click(thisWeekBtn);
    });

    // Assert
    const { from: expectedFromDate, to: expectedToDate } = getThisWeekRange();
    expect(dropdownBtn.textContent).toBe('This Week');
    expectDropdownWorkingWithExpectedDate(expectedFromDate, expectedToDate);
  });

  it('should update dropdown button when clicked Last Week button', async () => {
    // Act
    await waitFor(() => {
      userEvent.click(dropdownBtn);
      userEvent.click(lastWeekBtn);
    });

    // Assert
    const { from: expectedFromDate, to: expectedToDate } = getLastWeekRange();
    expect(dropdownBtn.textContent).toBe('Last Week');
    expectDropdownWorkingWithExpectedDate(expectedFromDate, expectedToDate);
  });

  it('should update dropdown button when clicked This Month button', async () => {
    // Act
    await waitFor(() => {
      userEvent.click(dropdownBtn);
      userEvent.click(thisMonthBtn);
    });

    // Assert
    const { from: expectedFromDate, to: expectedToDate } = getThisMonthRange();
    expect(dropdownBtn.textContent).toBe('This Month');
    expectDropdownWorkingWithExpectedDate(expectedFromDate, expectedToDate);
  });

  it('should update dropdown button when clicked Last Month button', async () => {
    // Act
    await waitFor(() => {
      userEvent.click(dropdownBtn);
      userEvent.click(lastMonthBtn);
    });

    // Assert
    const { from: expectedFromDate, to: expectedToDate } = getLastMonthRange();
    expect(dropdownBtn.textContent).toBe('Last Month');
    expectDropdownWorkingWithExpectedDate(expectedFromDate, expectedToDate);
  });

  it('should update dropdown button when clicked Since Last Month button', async () => {
    // Act
    await waitFor(() => {
      userEvent.click(dropdownBtn);
      userEvent.click(sinceLastMonthBtn);
    });

    // Assert
    const {
      from: expectedFromDate,
      to: expectedToDate,
    } = getSinceLastMonthRange();
    expect(dropdownBtn.textContent).toBe('Since Last Month');
    expectDropdownWorkingWithExpectedDate(expectedFromDate, expectedToDate);
  });

  it('should update dropdown button when clicked Specific Dates button', async () => {
    // Act
    await waitFor(() => {
      userEvent.click(dropdownBtn);
      userEvent.click(specificDatesBtn);
    });

    // Assert
    expect(dropdownBtn.textContent).toBe('Specific Dates');
  });

  it('should call onExcel props when clicked Excel button', () => {
    // Act
    userEvent.click(excelBtn);

    // Assert
    expect(handleExcel).toBeCalledTimes(1);
  });

  it('should call onQuery props when clicked Submit button', async () => {
    // Arrange
    const expectedFromDate = stringDateToMoment(fromDateInput.value);
    const expectedToDate = stringDateToMoment(toDateInput.value);

    await waitFor(async () => {
      // Act
      userEvent.click(submitBtn);

      // Assert
      expect(screen.queryByTestId('loading')).toBeInTheDocument();
    });
    expect(screen.queryByTestId('loading')).toBeNull();
    expect(handleQuery).toBeCalledWith(expectedFromDate, expectedToDate);
  });
});
