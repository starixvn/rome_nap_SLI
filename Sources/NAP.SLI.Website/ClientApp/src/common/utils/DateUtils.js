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