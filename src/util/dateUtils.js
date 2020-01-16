import moment from 'moment';

export default function getFormattedDate(dateTimeString) {
  return moment(dateTimeString).format('LLL');
}
