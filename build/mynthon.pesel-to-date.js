var net_mynthon_peselToDate=(function(exports){'use strict';var FORMAT_STRING = 'string';
var FORMAT_INT = 'int';
var FORMAT_DATE = 'date';
var FORMAT_STRING_ARRAY = 'string-array';
var FORMAT_INT_ARRAY = 'int-array';
var validMonths = ['81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92',
// 1800-1899
'01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
// 1900-1999
'21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32',
// 2000-2099
'41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52',
// 2100-2199
'61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72' //  2200-2299
];

function peselToDate(pesel, format) {
  if (typeof pesel !== 'string' || !pesel.match(/^[0-9]{11}$/)) {
    throw new Error('Ivalid PESEL format');
  }
  var year = pesel.substr(0, 2);
  var month = pesel.substr(2, 2);
  var day = pesel.substr(4, 2);
  var century = 1800 + Math.floor(validMonths.indexOf(month) / 12) * 100;
  var fullYear = century + parseInt(year);
  var realMonth = validMonths.indexOf(month) % 12 + 1;
  var realMonthString = realMonth < 10 ? '0' + realMonth : '' + realMonth;
  switch (format) {
    case FORMAT_STRING:
      return fullYear + '-' + realMonthString + '-' + day;
    case FORMAT_INT:
      return fullYear * 10000 + realMonth * 100 + parseInt(day);
    case FORMAT_DATE:
      return new Date(fullYear + '-' + realMonthString + '-' + day + 'T00:00:01Z');
    case FORMAT_STRING_ARRAY:
      return ['' + fullYear, realMonthString, day];
    case FORMAT_INT_ARRAY:
      return [parseInt(fullYear), parseInt(realMonthString), parseInt(day)];
    default:
      return [fullYear, realMonth, parseInt(day)];
  }
}exports.FORMAT_DATE=FORMAT_DATE;exports.FORMAT_INT=FORMAT_INT;exports.FORMAT_INT_ARRAY=FORMAT_INT_ARRAY;exports.FORMAT_STRING=FORMAT_STRING;exports.FORMAT_STRING_ARRAY=FORMAT_STRING_ARRAY;exports.peselToDate=peselToDate;return exports;})({});