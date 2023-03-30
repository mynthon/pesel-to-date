/* global it describe */
import * as assert from 'assert';
import { peselToDate, FORMAT_STRING, FORMAT_INT, FORMAT_DATE, FORMAT_STRING_ARRAY, FORMAT_INT_ARRAY } from '../src/pesel-to-date.js';

describe('Function peselToDate() tests:', function () {
  describe('# Date conversion tests', function () {
    it('should return valid date', function () {
      assert.deepEqual(peselToDate('79881109001'), [1879, 8, 11]);
      assert.equal(peselToDate('79881109001', FORMAT_STRING), '1879-08-11');
      assert.equal(peselToDate('88081109001', FORMAT_STRING), '1988-08-11');
      assert.equal(peselToDate('08281109001', FORMAT_STRING), '2008-08-11');
      assert.equal(peselToDate('08481109001', FORMAT_STRING), '2108-08-11');
      assert.equal(peselToDate('08681109001', FORMAT_STRING), '2208-08-11');
      //
      assert.equal(peselToDate('79921109001', FORMAT_STRING), '1879-12-11');
      assert.equal(peselToDate('79121109001', FORMAT_STRING), '1979-12-11');
      assert.equal(peselToDate('08321109001', FORMAT_STRING), '2008-12-11');
      assert.equal(peselToDate('08521109001', FORMAT_STRING), '2108-12-11');
      assert.equal(peselToDate('08721109001', FORMAT_STRING), '2208-12-11');
    });

    it('should return valid format', function () {
      assert.equal(peselToDate('45050809001', FORMAT_STRING), '1945-05-08');
      assert.equal(peselToDate('45050809001', FORMAT_INT), 19450508);
      assert.equal(peselToDate('45050809001', FORMAT_DATE).getTime(), (new Date('1945-05-08T00:00:01.000Z')).getTime());
      assert.equal(peselToDate('79881109001', FORMAT_DATE).getTime(), (new Date('1879-08-11T00:00:01.000Z')).getTime());
      assert.deepEqual(peselToDate('45050809001', FORMAT_STRING_ARRAY), ['1945', '05', '08']);
      assert.deepEqual(peselToDate('45050809001', FORMAT_INT_ARRAY), [1945, 5, 8]);
    });
  });

  describe('# Simple input check', function () {
    it('should throw error', function () {
      assert.throws(() => peselToDate(45050809001), Error, 'Check if PESEL is not int');
      assert.throws(() => peselToDate('450508090010'), Error, 'Check if PESEL not too long');
      assert.throws(() => peselToDate('4505080900'), Error, 'Check if PESEL is not too short');
      assert.throws(() => peselToDate('4505080900a'), Error, 'Check PESEL for only numeric characters');
    });
  });

  describe('# Test all months', function () {
    it('Should return valid month for century', function () {
      const validMonths = [
        '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', // 1800-1899
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', // 1900-1999
        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', // 2000-2099
        '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', // 2100-2199
        '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72' //  2200-2299
      ];

      let year = 1800;
      let month = 1;

      validMonths.forEach((peselMonth, i) => {
        const pesel = '00' + peselMonth + '0100001';
        const testDate = '' + year + '-' + (month < 10 ? '0' + month : '' + month) + '-01';
        assert.equal(peselToDate(pesel, FORMAT_STRING), testDate);

        if (month % 12 === 0) {
          month = 1;
          year += 100;
        } else {
          month++;
        }
      });
    });
  });
});
