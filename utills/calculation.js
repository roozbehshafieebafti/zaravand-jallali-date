function toJalaali(gy, gm, gd) {
  if (Object.prototype.toString.call(gy) === "[object Date]") {
    gd = gy.getDate();
    gm = gy.getMonth() + 1;
    gy = gy.getFullYear();
  }
  return d2j(g2d(gy, gm, gd));
}

function toGregorian(jy, jm, jd) {
  if (isValidJalaaliDate(jy, jm, jd)) return d2g(j2d(jy, jm, jd));
  else console.log("Zaravand Message :", "تاریخ شمسی معتبر نمی‌باشد");
  return null;
}


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


function isLeapJalaaliYear(jy) {
  return jalCal(jy).leap === 0;
}


function jalaaliMonthLength(jy, jm) {
  if (jm <= 6) return 31;
  if (jm <= 11) return 30;
  if (isLeapJalaaliYear(jy)) return 30;
  return 29;
}

function jalCal(jy) {
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


  for (i = 1; i < bl; i += 1) {
    jm = breaks[i];
    jump = jm - jp;
    if (jy < jm) break;
    leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
    jp = jm;
  }
  n = jy - jp;

  leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
  if (mod(jump, 33) === 4 && jump - n === 4) leapJ += 1;

  
  leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;

  
  march = 20 + leapJ - leapG;

  
  if (jump - n < 6) n = n - jump + div(jump + 4, 33) * 33;
  leap = mod(mod(n + 1, 33) - 1, 4);
  if (leap === -1) {
    leap = 4;
  }

  return { leap: leap, gy: gy, march: march };
}


function j2d(jy, jm, jd) {
  var r = jalCal(jy);
  return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
}

function d2j(jdn) {
  var gy = d2g(jdn).gy, 
    jy = gy - 621,
    r = jalCal(jy),
    jdn1f = g2d(gy, 3, r.march),
    jd,
    jm,
    k;

  
  k = jdn - jdn1f;
  if (k >= 0) {
    if (k <= 185) {

      jm = 1 + div(k, 31);
      jd = mod(k, 31) + 1;
      return { jy: jy, jm: jm, jd: jd };
    } else {

      k -= 186;
    }
  } else {

    jy -= 1;
    k += 179;
    if (r.leap === 1) k += 1;
  }
  jm = 7 + div(k, 30);
  jd = mod(k, 30) + 1;
  return { jy: jy, jm: jm, jd: jd };
}


function g2d(gy, gm, gd) {
  var d =
    div((gy + div(gm - 8, 6) + 100100) * 1461, 4) +
    div(153 * mod(gm + 9, 12) + 2, 5) +
    gd -
    34840408;
  d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
  return d;
}


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


