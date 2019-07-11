function toJalaali(gy, gm, gd) {
  if (Object.prototype.toString.call(gy) === "[object Date]") {
    gd = gy.getDate();
    gm = gy.getMonth() + 1;
    gy = gy.getFullYear();
  }
  return d2j(g2d(gy, gm, gd));
}

/*
  Converts a Jalaali date to Gregorian.
*/
function toGregorian(jy, jm, jd) {
  if (isValidJalaaliDate(jy, jm, jd)) return d2g(j2d(jy, jm, jd));
  else console.log("Zaravand Message :", "تاریخ شمسی معتبر نمی‌باشد");
  return null;
}

/*
  Checks whether a Jalaali date is valid or not.
*/
function isValidJalaaliDate(jy, jm, jd) {
  return (
    jy >= -61 &&
    jy <= 3177 &&
    jm >= 1 &&
    jm <= 12 &&
    jd >= 1 &&
    jd <= jalaaliMonthLength(jy, jm)
  );
}

/*
  Is this a leap year or not?
*/
function isLeapJalaaliYear(jy) {
  return jalCal(jy).leap === 0;
}

/*
  Number of days in a given month in a Jalaali year.
*/
function jalaaliMonthLength(jy, jm) {
  if (jm <= 6) return 31;
  if (jm <= 11) return 30;
  if (isLeapJalaaliYear(jy)) return 30;
  return 29;
}

/*
  This function determines if the Jalaali (Persian) year is
  leap (366-day long) or is the common year (365 days), and
  finds the day in March (Gregorian calendar) of the first
  day of the Jalaali year (jy).

  @param jy Jalaali calendar year (-61 to 3177)
  @return
    leap: number of years since the last leap year (0 to 4)
    gy: Gregorian year of the beginning of Jalaali year
    march: the March day of Farvardin the 1st (1st day of jy)
  @see: http://www.astro.uni.torun.pl/~kb/Papers/EMP/PersianC-EMP.htm
  @see: http://www.fourmilab.ch/documents/calendar/
*/
function jalCal(jy) {
  // Jalaali years starting the 33-year rule.
  var breaks = [
      -61,
      9,
      38,
      199,
      426,
      686,
      756,
      818,
      1111,
      1181,
      1210,
      1635,
      2060,
      2097,
      2192,
      2262,
      2324,
      2394,
      2456,
      3178
    ],
    bl = breaks.length,
    gy = jy + 621,
    leapJ = -14,
    jp = breaks[0],
    jm,
    jump,
    leap,
    leapG,
    march,
    n,
    i;

  if (jy < jp || jy >= breaks[bl - 1])
    throw new Error("Invalid Jalaali year " + jy);

  // Find the limiting years for the Jalaali year jy.
  for (i = 1; i < bl; i += 1) {
    jm = breaks[i];
    jump = jm - jp;
    if (jy < jm) break;
    leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
    jp = jm;
  }
  n = jy - jp;

  // Find the number of leap years from AD 621 to the beginning
  // of the current Jalaali year in the Persian calendar.
  leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
  if (mod(jump, 33) === 4 && jump - n === 4) leapJ += 1;

  // And the same in the Gregorian calendar (until the year gy).
  leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;

  // Determine the Gregorian date of Farvardin the 1st.
  march = 20 + leapJ - leapG;

  // Find how many years have passed since the last leap year.
  if (jump - n < 6) n = n - jump + div(jump + 4, 33) * 33;
  leap = mod(mod(n + 1, 33) - 1, 4);
  if (leap === -1) {
    leap = 4;
  }

  return { leap: leap, gy: gy, march: march };
}

/*
  Converts a date of the Jalaali calendar to the Julian Day number.

  @param jy Jalaali year (1 to 3100)
  @param jm Jalaali month (1 to 12)
  @param jd Jalaali day (1 to 29/31)
  @return Julian Day number
*/
function j2d(jy, jm, jd) {
  var r = jalCal(jy);
  return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
}

/*
  Converts the Julian Day number to a date in the Jalaali calendar.

  @param jdn Julian Day number
  @return
    jy: Jalaali year (1 to 3100)
    jm: Jalaali month (1 to 12)
    jd: Jalaali day (1 to 29/31)
*/
function d2j(jdn) {
  var gy = d2g(jdn).gy, // Calculate Gregorian year (gy).
    jy = gy - 621,
    r = jalCal(jy),
    jdn1f = g2d(gy, 3, r.march),
    jd,
    jm,
    k;

  // Find number of days that passed since 1 Farvardin.
  k = jdn - jdn1f;
  if (k >= 0) {
    if (k <= 185) {
      // The first 6 months.
      jm = 1 + div(k, 31);
      jd = mod(k, 31) + 1;
      return { jy: jy, jm: jm, jd: jd };
    } else {
      // The remaining months.
      k -= 186;
    }
  } else {
    // Previous Jalaali year.
    jy -= 1;
    k += 179;
    if (r.leap === 1) k += 1;
  }
  jm = 7 + div(k, 30);
  jd = mod(k, 30) + 1;
  return { jy: jy, jm: jm, jd: jd };
}

/*
  Calculates the Julian Day number from Gregorian or Julian
  calendar dates. This integer number corresponds to the noon of
  the date (i.e. 12 hours of Universal Time).
  The procedure was tested to be good since 1 March, -100100 (of both
  calendars) up to a few million years into the future.

  @param gy Calendar year (years BC numbered 0, -1, -2, ...)
  @param gm Calendar month (1 to 12)
  @param gd Calendar day of the month (1 to 28/29/30/31)
  @return Julian Day number
*/
function g2d(gy, gm, gd) {
  var d =
    div((gy + div(gm - 8, 6) + 100100) * 1461, 4) +
    div(153 * mod(gm + 9, 12) + 2, 5) +
    gd -
    34840408;
  d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
  return d;
}

/*
  Calculates Gregorian and Julian calendar dates from the Julian Day number
  (jdn) for the period since jdn=-34839655 (i.e. the year -100100 of both
  calendars) to some millions years ahead of the present.

  @param jdn Julian Day number
  @return
    gy: Calendar year (years BC numbered 0, -1, -2, ...)
    gm: Calendar month (1 to 12)
    gd: Calendar day of the month M (1 to 28/29/30/31)
*/
function d2g(jdn) {
  var j, i, gd, gm, gy;
  j = 4 * jdn + 139361631;
  j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
  i = div(mod(j, 1461), 4) * 5 + 308;
  gd = div(mod(i, 153), 5) + 1;
  gm = mod(div(i, 153), 12) + 1;
  gy = div(j, 1461) - 100100 + div(8 - gm, 6);
  return { gy: gy, gm: gm, gd: gd };
}

/*
  Utility helper functions.
*/

function div(a, b) {
  return ~~(a / b);
}

function mod(a, b) {
  return a - ~~(a / b) * b;
}

function understand_persian_month(month) {
  switch (month.trim()) {
    case "فروردین":
      return 1;
    case "حمل":
      return 1;
    case "اردیبهشت":
      return 2;
    case "اُردیبهشت":
      return 2;
    case "ثور":
      return 2;
    case "خرداد":
      return 3;
    case "جوزا":
      return 3;
    case "تیر":
      return 4;
    case "سرطان":
      return 4;
    case "مرداد":
      return 5;
    case "امرداد":
      return 5;
    case "اسد":
      return 5;
    case "شهریور":
      return 6;
    case "سنبله":
      return 6;
    case "مهر":
      return 7;
    case "میزان":
      return 7;
    case "آبان":
      return 8;
    case "عقرب":
      return 8;
    case "آذر":
      return 9;
    case "قوس":
      return 9;
    case "دی":
      return 10;
    case "جدی":
      return 10;
    case "بهمن":
      return 11;
    case "دلو":
      return 11;
    case "اسفند":
      return 12;
    case "اسپند":
      return 12;
    case "حوت":
      return 12;
  }
}

function understand_gregorian_month(month) {
  let m = month.trim();
  let Pattern = {
    January: /([Jj][Aa][Nn][Uu][Aa][Rr][Yy])|([Jj][Aa][Nn])|([Jj][Aa][Nn]\.)/,
    February: /([Ff][Ee][Bb][Rr][Uu][Aa][Rr][Yy])|([Ff][Ee][Bb])|([Ff][Ee][Bb]\.)/,
    March: /([Mm][Aa][Rr][Cc][Hh])|([Mm][Aa][Rr])|([Mm][Aa][Rr]\.)/,
    April: /([Aa][Pp][Rr][Ii][Ll])|([Aa][Pp][Rr])|([Aa][Pp][Rr]\.)/,
    May: /([Mm][Aa][Yy])|([Mm][Aa][Yy]\.)/,
    June: /([Jj][Uu][Nn][Ee])|([Jj][Uu][Nn][Ee]\.)|([Jj][Uu][Nn])|([Jj][Uu][Nn]\.)/,
    July: /([Jj][Uu][Ll][Yy])|([Jj][Uu][Ll][Yy]\.)|([Jj][Uu][Ll])|([Jj][Uu][Ll]\.)/,
    August: /([Aa][Uu][Gg][Uu][Ss][Tt])|([Aa][Uu][Gg])|([Aa][Uu][Gg]\.)/,
    September: /([Ss][Ee][Pp][Tt][Ee][Mm][Bb][Ee][Rr])|([Ss][Ee][Pp][Tt])|([Ss][Ee][Pp][Tt]\.)/,
    October: /([Oo][Cc][Tt][Oo][Bb][Ee][Rr])|([Oo][Cc][Tt])|([Oo][Cc][Tt]\.)/,
    November: /([Nn][Oo][Vv][Ee][Mm][Bb][Ee][Rr])|([Nn][Oo][Vv])|([Nn][Oo][Vv]\.)/,
    December: /([Dd][Ee][Cc][Ee][Mm][Bb][Ee][Rr])|([Dd][Ee][Cc])|([Dd][Ee][Cc]\.) /
  };
  if (Pattern.January.test(m)) {
    return 1;
  } else if (Pattern.February.test(m)) {
    return 2;
  } else if (Pattern.March.test(m)) {
    return 3;
  } else if (Pattern.April.test(m)) {
    return 4;
  } else if (Pattern.May.test(m)) {
    return 5;
  } else if (Pattern.June.test(m)) {
    return 6;
  } else if (Pattern.July.test(m)) {
    return 7;
  } else if (Pattern.August.test(m)) {
    return 8;
  } else if (Pattern.September.test(m)) {
    return 9;
  } else if (Pattern.October.test(m)) {
    return 10;
  } else if (Pattern.November.test(m)) {
    return 11;
  } else if (Pattern.December.test(m)) {
    return 12;
  }
}


function get_persian_month(month) {
  switch (month) {
    case 1:
      return "فروردین";
    case 2:
      return "اردیبهشت";
    case 3:
      return "خرداد";
    case 4:
      return "تیر";
    case 5:
      return "مرداد";
    case 6:
      return "شهریور";
    case 7:
      return "مهر";
    case 8:
      return "آبان";
    case 9:
      return "آذر";
    case 10:
      return "دی";
    case 11:
      return "بهمن";
    case 12:
      return "اسفند";
  }
}

function get_gregorian_month(month) {
  switch (month) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
  }
}

function find_seperator (output) {
  let seprator = output.match(/[-_/ :\\\.]/);
  return (seprator===null ? null : seprator[0] );
}

function persian_day_week(Day) {
  let date = new Date(Day);
  let day = date.getDay();
  switch (day) {
    case 0:
      return "یکشنبه";
    case 1:
      return "دوشنبه";
    case 2:
      return "سه‌شنبه";
    case 3:
      return "چهارشنبه";
    case 4:
      return "پنج‌شنبه";
    case 5:
      return "جمعه";
    case 6:
      return "شنبه";
  }
}


function gregorian_day_week(Day) {
  let date = new Date(Day);
  let day = date.getDay();
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
}

module.exports = {
  toJalaali,
  toGregorian,
  understand_persian_month,
  understand_gregorian_month,
  get_persian_month,
  get_gregorian_month,
  find_seperator,
  persian_day_week,
  gregorian_day_week
};


