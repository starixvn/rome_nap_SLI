import moment from 'moment';

export const FormatStrings = {
  Date: 'MM/DD/YYYY'
}

export const formatDate = (moment) => {
  return moment.format(FormatStrings.Date);
}

export const minDate = moment('01/01/1970', FormatStrings.Date);
export const maxDate = moment('12/31/2999', FormatStrings.Date);

export const getToday = () => {
  return new moment();
}

export const getYesterday = () => {
  return new moment().subtract(1, 'days');
}

export const getTodayRange = () => {
  return {
    from: getToday(),
    to: getToday()
  };
}

export const getYesterdayRange = () => {
  return {
    from: getYesterday(),
    to: getYesterday()
  };
}

export const getThisWeekRange = () => {
  const date = getToday();
  return {
    from: moment(date).startOf('isoWeek'),
    to: moment(date)
  };
}

export const getLastWeekRange = () => {
  const date = getToday().subtract(1, 'weeks');
  return {
    from: moment(date).startOf('isoWeek'),
    to: moment(date).endOf('isoWeek')
  };
}

export const getThisMonthRange = () => {
  const date = getToday();
  return {
    from: moment(date).startOf('month'),
    to: moment(date).endOf('month')
  };
}

export const getLastMonthRange = () => {
  const date = getToday().subtract(1, 'months');
  return {
    from: moment(date).startOf('month'),
    to: moment(date).endOf('month')
  };
}

export const getSinceLastMonthRange = () => {
  return {
    from: getToday().subtract(1, 'months').startOf('month'),
    to: getToday()
  };
}

export const ReportDateRanges = [{
  label: 'Today',
  getRange: getTodayRange
}, {
  label: 'Yesterday',
  getRange: getYesterdayRange
}, {
  label: 'This Week',
  getRange: getThisWeekRange
}, {
  label: 'Last Week',
  getRange: getLastWeekRange
}, {
  label: 'This Month',
  getRange: getThisMonthRange
}, {
  label: 'Last Month',
  getRange: getLastMonthRange
}, {
  label: 'Since Last Month',
  getRange: getSinceLastMonthRange
}, {
  label: 'Specific Dates',
  getRange: () => {
    return undefined;
  }
}];