var Holidays = require('date-holidays');
var hday = new Holidays('US');

// Return filtered list of holidays with dates
var holidayDates = function(year){
  var allHolidays = hday.getHolidays(year);
  var filterHolidays = ['New Year\'s Day', 'Independence Day', 'Labour Day', 'Veterans Day', 'Thanksgiving Day'];

  var matchHolidays = allHolidays.filter(function(holiday){
     var match = false;
     filterHolidays.forEach(function(selected){
      if(holiday.name === selected){
        match = true;
      }
     });
     return match;
  });
  return matchHolidays;
};

// daily check for holiday
var isHoliday = function(){
  return hday.isHoliday(new Date());
};

module.exports = {
  holidayDates: holidayDates,
  isHoliday: isHoliday
}

//unit test
// console.log('today', new Date());
// console.log('holidays', module.exports.holidayDates(2017));
// console.log('istoday', module.exports.isHoliday());