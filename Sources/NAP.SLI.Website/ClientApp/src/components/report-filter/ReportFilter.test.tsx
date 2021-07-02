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
  render,
  screen,
  waitFor,
} from '@testing-library/react';

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
  // let toDayBtn: HTMLButtonElement;
  // let yesterdayBtn: HTMLButtonElement;
  // let thisWeekBtn: HTMLButtonElement;
  // let lastWeekBtn: HTMLButtonElement;
  // let thisMonthBtn: HTMLButtonElement;
  // let lastMonthBtn: HTMLButtonElement;
  // let sinceLastMonthBtn: HTMLButtonElement;
  // let specificDatesBtn: HTMLButtonElement;
  // let excelBtn: HTMLButtonElement;
  // let submitBtn: HTMLButtonElement;

  beforeEach(() => {
    const { container } = render(<ReportFilter {...props} />);

    const inputs = container.querySelectorAll('input');
    fromDateInput = inputs[0];
    toDateInput = inputs[1];
    dropdownBtn = container.querySelector(
      'button.dropdown-toggle',
    ) as HTMLButtonElement;

    // const buttons = container.querySelectorAll('button.dropdown-item');
    // toDayBtn = buttons[0] as HTMLButtonElement;
    // yesterdayBtn = buttons[1] as HTMLButtonElement;
    // thisWeekBtn = buttons[2] as HTMLButtonElement;
    // lastWeekBtn = buttons[3] as HTMLButtonElement;
    // thisMonthBtn = buttons[4] as HTMLButtonElement;
    // lastMonthBtn = buttons[5] as HTMLButtonElement;
    // sinceLastMonthBtn = buttons[6] as HTMLButtonElement;
    // specificDatesBtn = buttons[7] as HTMLButtonElement;
    // excelBtn = container.querySelector('button.btn-excel') as HTMLButtonElement;
    // submitBtn = container.querySelector(
    //   'button[type="submit"]',
    // ) as HTMLButtonElement;
  });
  afterEach(cleanup);

  it('should update fromDate on change', async () => {
    // Act
    await waitFor(() => {
      fireEvent.change(fromDateInput, {
        target: {
          value: '07/01/2021',
        },
      });
    });

    // Assert
    expect(fromDateInput.value).toBe('07/01/2021');
    expect(dropdownBtn.textContent).toBe('Specific Dates');
  });

  // it('should update toDate on change', async () => {
  //   // Act
  //   await waitFor(() =>
  //     fireEvent.change(toDateInput, {
  //       target: {
  //         value: '07/01/2021',
  //       },
  //     }),
  //   );

  //   // Assert
  //   expect(toDateInput.value).toBe('07/01/2021');
  //   expect(dropdownBtn.textContent).toBe('Specific Dates');
  // });

  // it('should update fromDate equal to toDate when toDate is before fromDate', async () => {
  //   // Act
  //   await waitFor(() =>
  //     fireEvent.change(toDateInput, {
  //       target: {
  //         value: '06/29/2021',
  //       },
  //     }),
  //   );

  //   // Assert
  //   expect(toDateInput.value).toBe('06/29/2021');
  //   expect(fromDateInput.value).toBe('06/29/2021');
  //   expect(dropdownBtn.textContent).toBe('Specific Dates');
  // });

  // it('should update toDate equal to fromDate when fromDate is after toDate', async () => {
  //   // Act
  //   await waitFor(() =>
  //     fireEvent.change(fromDateInput, {
  //       target: {
  //         value: '07/01/2021',
  //       },
  //     }),
  //   );

  //   // Assert
  //   expect(fromDateInput.value).toBe('07/01/2021');
  //   expect(toDateInput.value).toBe('07/01/2021');
  //   expect(dropdownBtn.textContent).toBe('Specific Dates');
  // });

  // it('should update dropdown button when clicked Today button', async () => {
  //   // Arrange
  //   const expectedDate = getToday();

  //   // Act
  //   await waitFor(() => {
  //     userEvent.click(dropdownBtn);
  //     userEvent.click(toDayBtn);
  //   });

  //   // Assert
  //   expect(dropdownBtn.textContent).toBe('Today');
  //   expect(fromDateInput.value).toBe(formatDate(expectedDate));
  //   expect(toDateInput.value).toBe(formatDate(expectedDate));
  //   expect(handleQuery).toBeCalledWith(expectedDate, expectedDate);
  // });

  // it('should update dropdown button when clicked Yesterday button', async () => {
  //   // Arrange
  //   const expectedDate = getYesterday();

  //   // Act
  //   await waitFor(() => {
  //     userEvent.click(dropdownBtn);
  //     userEvent.click(yesterdayBtn);
  //   });

  //   // Assert
  //   expect(dropdownBtn.textContent).toBe('Yesterday');
  //   expect(fromDateInput.value).toBe(formatDate(expectedDate));
  //   expect(toDateInput.value).toBe(formatDate(expectedDate));
  //   expect(handleQuery).toBeCalledWith(expectedDate, expectedDate);
  // });

  // it('should update dropdown button when clicked This Week button', async () => {
  //   // Arrange
  //   const expectedFromDate = getThisWeekRange().from;
  //   const expectedToDate = getThisWeekRange().to;

  //   // Act
  //   await waitFor(() => {
  //     userEvent.click(dropdownBtn);
  //     userEvent.click(thisWeekBtn);
  //   });

  //   // Assert
  //   expect(dropdownBtn.textContent).toBe('This Week');
  //   expect(fromDateInput.value).toBe(formatDate(expectedFromDate));
  //   expect(toDateInput.value).toBe(formatDate(expectedToDate));
  //   expect(handleQuery).toBeCalledWith(expectedFromDate, expectedToDate);
  // });

  // it('should update dropdown button when clicked Last Week button', async () => {
  //   // Arrange
  //   const expectedFromDate = getLastWeekRange().from;
  //   const expectedToDate = getLastWeekRange().to;

  //   // Act
  //   await waitFor(() => {
  //     userEvent.click(dropdownBtn);
  //     userEvent.click(lastWeekBtn);
  //   });

  //   // Assert
  //   expect(dropdownBtn.textContent).toBe('Last Week');
  //   expect(fromDateInput.value).toBe(formatDate(expectedFromDate));
  //   expect(toDateInput.value).toBe(formatDate(expectedToDate));
  //   expect(handleQuery).toBeCalledWith(expectedFromDate, expectedToDate);
  // });

  // it('should update dropdown button when clicked This Month button', async () => {
  //   // Arrange
  //   const expectedFromDate = getThisMonthRange().from;
  //   const expectedToDate = getThisMonthRange().to;

  //   // Act
  //   await waitFor(() => {
  //     userEvent.click(dropdownBtn);
  //     userEvent.click(thisMonthBtn);
  //   });

  //   // Assert
  //   expect(dropdownBtn.textContent).toBe('This Month');
  //   expect(fromDateInput.value).toBe(formatDate(expectedFromDate));
  //   expect(toDateInput.value).toBe(formatDate(expectedToDate));
  //   expect(handleQuery).toBeCalledWith(expectedFromDate, expectedToDate);
  // });

  // it('should update dropdown button when clicked Last Month button', async () => {
  //   // Arrange
  //   const expectedFromDate = getLastMonthRange().from;
  //   const expectedToDate = getLastMonthRange().to;

  //   // Act
  //   await waitFor(() => {
  //     userEvent.click(dropdownBtn);
  //     userEvent.click(lastMonthBtn);
  //   });

  //   // Assert
  //   expect(dropdownBtn.textContent).toBe('Last Month');
  //   expect(fromDateInput.value).toBe(formatDate(expectedFromDate));
  //   expect(toDateInput.value).toBe(formatDate(expectedToDate));
  //   expect(handleQuery).toBeCalledWith(expectedFromDate, expectedToDate);
  // });

  // it('should update dropdown button when clicked Since Last Month button', async () => {
  //   // Arrange
  //   const expectedFromDate = getSinceLastMonthRange().from;
  //   const expectedToDate = getSinceLastMonthRange().to;

  //   // Act
  //   await waitFor(() => {
  //     userEvent.click(dropdownBtn);
  //     userEvent.click(sinceLastMonthBtn);
  //   });

  //   // Assert
  //   expect(dropdownBtn.textContent).toBe('Since Last Month');
  //   expect(fromDateInput.value).toBe(formatDate(expectedFromDate));
  //   expect(toDateInput.value).toBe(formatDate(expectedToDate));
  //   expect(handleQuery).toBeCalledWith(expectedFromDate, expectedToDate);
  // });

  // it('should update dropdown button when clicked Specific Dates button', async () => {
  //   // Act
  //   await waitFor(() => {
  //     userEvent.click(dropdownBtn);
  //     userEvent.click(specificDatesBtn);
  //   });

  //   // Assert
  //   expect(dropdownBtn.textContent).toBe('Specific Dates');
  // });

  // it('should call onExcel props when clicked Excel button', () => {
  //   // Act
  //   userEvent.click(excelBtn);

  //   // Assert
  //   expect(handleExcel).toBeCalledTimes(1);
  // });

  // it('should call onQuery props when clicked Submit button', () => {
  //   // Arrange
  //   const expectedFromDate = stringDateToMoment(fromDateInput.value);
  //   const expectedToDate = stringDateToMoment(toDateInput.value);

  //   // Act
  //   userEvent.click(submitBtn);

  //   // Assert
  //   expect(handleQuery).toBeCalledWith(expectedFromDate, expectedToDate);
  // });
});
