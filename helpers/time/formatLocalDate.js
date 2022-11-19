'use strict';
var dateFormat = require('date-fns/format'),
  defaultFormat = 'M/D/YYYY [at] h:mm a';

/**
 * Formats a date with date-fns
 *
 * @param  {*} date
 * @param {string} [format]
 * @return {string}
 */
module.exports = function (date, format) {
  format = format || defaultFormat;
  date = date === 'now' ? new Date() : date;

  return (
    /* TODO: JSFIX could not patch the breaking change:
    now functions don't accept string arguments, but only numbers or dates.  
    Suggested fix: The input string should now be parsed beforehand. Use parse or parseISO (if you’re using ISO 8601) to parse your strings. */
    dateFormat(date, format)
  );
};
