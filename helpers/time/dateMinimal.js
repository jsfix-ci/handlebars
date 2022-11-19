'use strict';
const formatDistanceStrict = require('date-fns/formatDistanceStrict');
const parse = require('date-fns/parse'), isValid = require('date-fns/isValid'), differenceInMinutes = require('date-fns/differenceInMinutes'), subDays = require('date-fns/subDays'), isSameDay = require('date-fns/isSameDay'), format = require('date-fns/format');

/**
 * generate display date (without time), based on a relative format
 * @param  {Date|string} datetime for `date-fns` to parse
 * @return {string}
 */
module.exports = function (datetime) {
  var date = parse(datetime),
    now = new Date(),
    yesterday = subDays(new Date(), 1),
    // we want an abbreviated version of 'minute' and 'minutes'
    tokens = {
      lessThanXSeconds: {
        one: 'less than a second',
        other: 'less than {{count}} seconds'
      },
      xSeconds: {
        one: '1 second',
        other: '{{count}} seconds'
      },
      xMinutes: {
        one: '1 min',
        other: '{{count}} mins'
      }
    },
    locale = {
      distanceInWords: {
        localize: function (token, count) {
          let result;

          if (count === 1) {
            result = tokens[token].one;
          } else {
            result = tokens[token].other.replace('{{count}}', count);
          }

          return `${result} ago`;
        }
      }
    };

  if (isValid(date)) {
    // articles < 30 min old should display 'x seconds ago / x minutes ago'
    if (differenceInMinutes(now, date) < 1) {
      return formatDistanceStrict(date, now, { unit: 's', addSuffix: true, locale: locale });
    } else if (differenceInMinutes(now, date) < 30) {
      return formatDistanceStrict(date, now, { unit: 'm', addSuffix: true, locale: locale });
    } else if (isSameDay(now, date)) {
      return format(date, 'h:mm aa');
    } else if (isSameDay(yesterday, date)) {
      return 'Yesterday';
    } else {
      return format(date, 'M/D/YYYY');
    }
  } else {
    return '';
  }
};

module.exports.example = {
  code: '{{ dateMinimal "Fri, 13 Jan 2017 18:22:16 GMT" }}',
  result: '"Yesterday"'
};
