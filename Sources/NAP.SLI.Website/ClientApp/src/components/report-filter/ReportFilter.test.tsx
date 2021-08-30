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
import { Provider } from 'react-redux';
import { Action, DeepPartial, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

describe('ReportFilter', () => {
  const handleExcel = jest.fn();
  const handleQuery = jest.fn();

  const props = {
    maxDate,
    fromDate: stringDateToMoment('06/30/2021'),
    toDate: stringDateToMoment('06/30/2021'),
    onQuery: handleQuery,
    onExcel: handleExcel,
  };

  const mockStore = configureStore<
    DeepPartial<AppState>,
    ThunkDispatch<DeepPartial<AppState>, unknown, Action<string>>
  >([thunk]);

  const defaultStore = mockStore({
    reportFilter: {
      minDate: '2021-01-01T00:00:00',
    },
  });

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderComponent = async (store: any) => {
    await act(async () => {
      const { container } = render(
        <Provider store={store}>
          <ReportFilter {...props} />
        </Provider>,
      );

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
  };

  afterEach(cleanup);

  const expectDropdownWorkingWithExpectedDate = (
    expectedFromDate: Moment,
    expecteToDate: Moment,
  ) => {
    const fromDateVal = fromDateInput.value;
    const toDateVal = toDateInput.value;

    expect(fromDateVal).toBe(formatDate(expectedFromDate));
    expect(toDateVal).toBe(formatDate(expecteToDate));
  };

  it('should update fromDate on change', async () => {
    // Arrange
    await renderComponent(defaultStore);
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

  it('should update toDate on change', async () => {
    // Arrange
    await renderComponent(defaultStore);
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

  it('should update fromDate equal to toDate when toDate is before fromDate', async () => {
    // Arrange
    await renderComponent(defaultStore);
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

  it('should update toDate equal to fromDate when fromDate is after toDate', async () => {
    // Arrange
    await renderComponent(defaultStore);
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
    // Arrange
    await renderComponent(defaultStore);

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
    // Arrange
    await renderComponent(defaultStore);

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
    // Arrange
    await renderComponent(defaultStore);

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
    // Arrange
    await renderComponent(defaultStore);

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
    // Arrange
    await renderComponent(defaultStore);

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
    // Arrange
    await renderComponent(defaultStore);

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
    // Arrange
    await renderComponent(defaultStore);

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
    // Arrange
    await renderComponent(defaultStore);

    // Act
    await waitFor(() => {
      userEvent.click(dropdownBtn);
      userEvent.click(specificDatesBtn);
    });

    // Assert
    expect(dropdownBtn.textContent).toBe('Specific Dates');
  });

  it('should call onExcel props when clicked Excel button', async () => {
    // Arrange
    await renderComponent(defaultStore);

    await waitFor(() => {
      // Act
      userEvent.click(excelBtn);

      // Assert
      expect(screen.queryByTestId('excel-loading')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('excel-loading')).toBeNull();
    expect(handleExcel).toBeCalled();
  });

  it('should call onQuery props when clicked Submit button', async () => {
    // Arrange
    await renderComponent(defaultStore);
    const expectedFromDate = stringDateToMoment(fromDateInput.value);
    const expectedToDate = stringDateToMoment(toDateInput.value);

    await waitFor(() => {
      // Act
      userEvent.click(submitBtn);

      // Assert
      expect(screen.queryByTestId('loading')).toBeInTheDocument();
    });
    expect(screen.queryByTestId('loading')).toBeNull();
    expect(handleQuery).toBeCalledWith(expectedFromDate, expectedToDate);
  });

  it('should disable last month and since last month button when its fromdate are before mindate', async () => {
    // Arrange, Act
    const store = mockStore({
      reportFilter: {
        minDate: getToday()
          .subtract(1, 'months')
          .startOf('month')
          .add(1, 'days')
          .toISOString(),
      },
    });
    await renderComponent(store);

    // Assert
    expect(screen.queryByText('Last Month')).toBeNull();
    expect(screen.queryByText('Since Last Month')).toBeNull();
  });

  it('should disable last week, last month and since last month button when its fromdate are before mindate', async () => {
    // Arrange, Act
    const store = mockStore({
      reportFilter: {
        minDate: getToday()
          .subtract(1, 'weeks')
          .startOf('isoWeek')
          .add(1, 'days')
          .toISOString(),
      },
    });
    await renderComponent(store);

    // Assert
    expect(screen.queryByText('Last Week')).toBeNull();
    expect(screen.queryByText('Last Month')).toBeNull();
    expect(screen.queryByText('Since Last Month')).toBeNull();
  });

  it('should disable this week, last week, last month and since last month button when its fromdate are before mindate', async () => {
    // Arrange, Act
    const store = mockStore({
      reportFilter: {
        minDate: getToday().startOf('isoWeek').add(1, 'days').toISOString(),
      },
    });
    await renderComponent(store);

    // Assert
    expect(screen.queryByText('This Week')).toBeNull();
    expect(screen.queryByText('Last Week')).toBeNull();
    expect(screen.queryByText('Last Month')).toBeNull();
    expect(screen.queryByText('Since Last Month')).toBeNull();
  });
});
