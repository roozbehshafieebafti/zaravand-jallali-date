// https://www.ibm.com/support/knowledgecenter/en/SSLVMB_23.0.0/spss/base/syn_date_and_time_date_time_formats.html
const calculation = require("./calculation");

const format = [
  {
    human: "YYYY/MM/DD",
    hRegix: /^[Yy][Yy][Yy][Yy][-_/ \\][Mm][Mm][-_/ \\][Dd][Dd]$/,
    dRegix: /^[0-9][0-9][0-9][0-9][-_/ \\][0-9]?[0-9][-_/ \\][0-9]?[0-9]$/,
    date_splicer: function(date) {
      let year = date.slice(0, 4);
      let day = date.match(/[0-9]?[0-9]$/);
      let TMonth = date.match(/^[0-9][0-9][0-9][0-9][-_/ \\][0-9]?[0-9]/);
      let month = TMonth[0].match(/[0-9]?[0-9]$/);
      return [year, month[0], day[0]];
    },
    date_merger: function({ gy, gm, gd, jy, jm, jd }, sep) {
      if (gy)
        return `${gy}${sep}${gm > 9 ? gm : "0" + gm}${sep}${
          gd > 9 ? gd : "0" + gd
        }`;
      if (jy)
        return `${jy}${sep}${jm > 9 ? jm : "0" + jm}${sep}${
          jd > 9 ? jd : "0" + jd
        }`;
    }
  },

  {
    human: "DD/MM/YYYY",
    hRegix: /^[Dd][Dd][-_/ \\][Mm][Mm][-_/ \\][Yy][Yy][Yy][Yy]$/,
    dRegix: /^[0-9]?[0-9][-_/ \\][0-9]?[0-9][-_/ \\][0-9][0-9][0-9][0-9]$/,
    date_splicer: function(date) {
      let year = date.match(/[0-9][0-9][0-9][0-9]$/);
      let day = date.match(/^[0-9]?[0-9]/);
      let TMonth = date.match(/^[0-9]?[0-9][-_/ \\][0-9]?[0-9]/);
      let month = TMonth[0].match(/[0-9]?[0-9]$/);
      return [year, month[0], day[0]];
    },
    date_merger: function({ gy, gm, gd, jy, jm, jd }, sep) {
      if (gy)
        return `${gd > 9 ? gd : "0" + gd}${sep}${
          gm > 9 ? gm : "0" + gm
        }${sep}${gy}`;
      if (jy)
        return `${jd > 9 ? jd : "0" + jd}${sep}${
          jm > 9 ? jm : "0" + jm
        }${sep}${jy}`;
    }
  },

  {
    human: "YYYY/MMM/DD",
    hRegix: /^[Yy][Yy][Yy][Yy][-_/ \\][Mm][Mm][Mm][-_/ \\][Dd][Dd]$/,
    dRegix: /^[0-9][0-9][0-9][0-9][-_/ \\]([.a-zA-Z\u0600-\u06FF\s]+)[-_/ \\][0-9]?[0-9]$/,
    date_splicer: function(date) {
      let year = date.slice(0, 4);
      let day = date.match(/[0-9]?[0-9]$/);
      let TMonth = date.match(
        /^[0-9][0-9][0-9][0-9][-_/ \\]([.a-zA-Z\u0600-\u06FF\s]+)/
      );
      let month = TMonth[0].match(/([\.a-zA-Z\u0600-\u06FF\s]+)$/);
      let persianMonth = month[0].match(/([\u0600-\u06FF]+)/);
      let gregorianMonth = month[0].match(/[\.a-zA-Z\s]+/);

      if (persianMonth !== null) {
        return [year, calculation.understand_persian_month(month[0]), day[0]];
      } else if (gregorianMonth !== null) {
        return [year, calculation.understand_gregorian_month(month[0]), day[0]];
      }
    },
    date_merger: function({ gy, gm, gd, jy, jm, jd }, sep) {
      if (gy)
        return `${gy}${sep}${calculation.get_gregorian_month(gm)}${sep}${
          gd > 9 ? gd : "0" + gd
        }`;
      if (jy)
        return `${jy}${sep}${calculation.get_persian_month(jm)}${sep}${
          jd > 9 ? jd : "0" + jd
        }`;
    }
  },

  {
    human: "DD/MMM/YYYY",
    hRegix: /^[Dd][Dd][-_/ \\][Mm][Mm][Mm][-_/ \\][Yy][Yy][Yy][Yy]$/,
    dRegix: /^[0-9]?[0-9][-_/ \\]([.a-zA-Z\u0600-\u06FF\s]+)[-_/ \\][0-9][0-9][0-9][0-9]$/,
    date_splicer: function(date) {
      let year = date.match(/[0-9][0-9][0-9][0-9]$/);
      let day = date.match(/^[0-9]?[0-9]/);
      let TMonth = date.match(
        /^[0-9]?[0-9][-_/ \\]([.a-zA-Z\u0600-\u06FF\s]+)/
      );
      let month = TMonth[0].match(/([\.a-zA-Z\u0600-\u06FF\s]+)$/);
      let persianMonth = month[0].match(/([\u0600-\u06FF]+)/);
      let gregorianMonth = month[0].match(/[\.a-zA-Z\s]+/);

      if (persianMonth !== null) {
        return [year, calculation.understand_persian_month(month[0]), day[0]];
      } else if (gregorianMonth !== null) {
        return [year, calculation.understand_gregorian_month(month[0]), day[0]];
      }
    },
    date_merger: function({ gy, gm, gd, jy, jm, jd }, sep) {
      if (gy)
        return `${
          gd > 9 ? gd : "0" + gd
        }${sep}${calculation.get_gregorian_month(gm)}${sep}${gy}`;
      if (jy)
        return `${jd > 9 ? jd : "0" + jd}${sep}${calculation.get_persian_month(
          jm
        )}${sep}${jy}`;
    }
  },

  {
    human: "MMM/YYYY",
    hRegix: /^[Mm][Mm][Mm][-_/ \\][Yy][Yy][Yy][Yy]$/,
    dRegix: /^([.a-zA-Z\u0600-\u06FF\s]+)[-_/ \\][0-9][0-9][0-9][0-9]$/,
    date_splicer: function(date) {
      let year = date.match(/[0-9][0-9][0-9][0-9]$/);
      let day = 1;
      let TMonth = date.match(/^([.a-zA-Z\u0600-\u06FF\s]+)/);
      let persianMonth = TMonth[0].match(/([\u0600-\u06FF]+)/);
      let gregorianMonth = TMonth[0].match(/[\.a-zA-Z\s]+/);

      if (persianMonth !== null) {
        return [year, calculation.understand_persian_month(TMonth[0]), day];
      } else if (gregorianMonth !== null) {
        return [year, calculation.understand_gregorian_month(TMonth[0]), day];
      }
    },
    date_merger: function({ gy, gm, jy, jm }, sep) {
      if (gy) return `${calculation.get_gregorian_month(gm)}${sep}${gy}`;
      if (jy) return `${calculation.get_persian_month(jm)}${sep}${jy}`;
    }
  },

  {
    human: "YYYY/MMM",
    hRegix: /^[Yy][Yy][Yy][Yy][-_/ \\][Mm][Mm][Mm]$/,
    dRegix: /^[0-9][0-9][0-9][0-9][-_/ \\]([.a-zA-Z\u0600-\u06FF\s]+)$/,
    date_splicer: function(date) {
      let year = date.match(/^[0-9][0-9][0-9][0-9]/);
      let day = 1;
      let TMonth = date.match(/([.a-zA-Z\u0600-\u06FF\s]+)$/);
      let persianMonth = TMonth[0].match(/([\u0600-\u06FF]+)/);
      let gregorianMonth = TMonth[0].match(/[\.a-zA-Z\s]+/);

      if (persianMonth !== null) {
        return [year, calculation.understand_persian_month(TMonth[0]), day];
      } else if (gregorianMonth !== null) {
        return [year, calculation.understand_gregorian_month(TMonth[0]), day];
      }
    },
    date_merger: function({ gy, gm, jy, jm }, sep) {
      if (gy) return `${gy}${sep}${calculation.get_gregorian_month(gm)}`;
      if (jy) return `${jy}${sep}${calculation.get_persian_month(jm)}`;
    }
  },

  {
    human: "YYYY/MM/DD/WW",
    hRegix: /^[Yy][Yy][Yy][Yy][-_/ \\][Mm][Mm][-_/ \\][Dd][Dd][-_/ \\][Ww][Ww]$/,
    dRegix: /^[0-9][0-9][0-9][0-9][-_/ \\][0-9]?[0-9][-_/ \\][0-9]?[0-9][-_/ \\]([.a-zA-Z\u0600-\u06FF\s]+)$/,
    date_splicer: function(date) {
      let year = date.slice(0, 4);
      let Tday = date.match(/[0-9]?[0-9][-_/ \\]([.a-zA-Z\u0600-\u06FF\s]+)$/);
      let day = Tday[0].match(/^[0-9]?[0-9]/);
      let TMonth = date.match(/^[0-9][0-9][0-9][0-9][-_/ \\][0-9]?[0-9]/);
      let month = TMonth[0].match(/[0-9]?[0-9]$/);
      return [year, month[0], day[0]];
    },
    date_merger: function({ gy, gm, gd, jy, jm, jd }, sep, date = "") {
      if (gy)
        return `${gy}${sep}${gm > 9 ? gm : "0" + gm}${sep}${
          gd > 9 ? gd : "0" + gd
        } - ${calculation.gregorian_day_week(gy + "/" + gm + "/" + gd)}`;
      if (jy)
        return `${jy}${sep}${jm > 9 ? jm : "0" + jm}${sep}${
          jd > 9 ? jd : "0" + jd
        } - ${calculation.persian_day_week(date)}`;
    }
  },

  {
    human: "YYYY/MMM/DD/WW",
    hRegix: /^[Yy][Yy][Yy][Yy][-_/ \\][Mm][Mm][Mm][-_/ \\][Dd][Dd][-_/ \\][Ww][Ww]$/,
    dRegix: /^[0-9][0-9][0-9][0-9][-_/ \\]([.a-zA-Z\u0600-\u06FF\s]+)[-_/ \\][0-9]?[0-9][-_/ \\]([.a-zA-Z\u0600-\u06FF\s]+)$/,
    date_splicer: function(date) {
      let year = date.slice(0, 4);
      let Tday = date.match(/[0-9]?[0-9][-_/ \\]([.a-zA-Z\u0600-\u06FF\s]+)$/);
      let day = Tday[0].match(/^[0-9]?[0-9]/);
      let TMonth = date.match(
        /^[0-9][0-9][0-9][0-9][-_/ \\]([.a-zA-Z\u0600-\u06FF\s]+)/
      );
      let month = TMonth[0].match(/([.a-zA-Z\u0600-\u06FF\s]+)$/);

      let persianMonth = month[0].match(/([\u0600-\u06FF]+)/);
      let gregorianMonth = month[0].match(/[\.a-zA-Z\s]+/);

      if (persianMonth !== null) {
        return [year, calculation.understand_persian_month(month[0]), day[0]];
      } else if (gregorianMonth !== null) {
        return [year, calculation.understand_gregorian_month(month[0]), day[0]];
      }
    },
    date_merger: function({ gy, gm, gd, jy, jm, jd }, sep, date = "") {
      if (gy)
        return `${gy}${sep}${calculation.get_gregorian_month(gm)}${sep}${
          gd > 9 ? gd : "0" + gd
        } - ${calculation.gregorian_day_week(gy + "/" + gm + "/" + gd)}`;
      if (jy)
        return `${jy}${sep}${calculation.get_persian_month(jm)}${sep}${
          jd > 9 ? jd : "0" + jd
        } - ${calculation.persian_day_week(date)}`;
    }
  },

  {
    human: "YYYY/MM/DDTHH:MM:SS.S",
    hRegix: /^[Yy][Yy][Yy][Yy][-_/ \\][Mm][Mm][-_/ \\][Dd][Dd][T-_/ \\][Hh][Hh]:[Mm][Mm]:[Ss][Ss](\.)[Ss]$/,
    dRegix: /^[0-9][0-9][0-9][0-9][-_/ \\][0-9]?[0-9][-_/ \\][0-9]?[0-9][T-_/ \\][0-9]?[0-9][:][0-9]?[0-9][:][0-9]?[0-9](\.)([0-9]+)$/,
    date_splicer: function(date) {
      let year = date.slice(0, 4);
      let TMonth = date.match(/^[0-9][0-9][0-9][0-9][-_/ \\][0-9]?[0-9]/);
      let month = TMonth[0].match(/[0-9]?[0-9]$/);
      let Tday = date.match(
        /^[0-9][0-9][0-9][0-9][-_/ \\][0-9]?[0-9][-_/ \\][0-9]?[0-9]/
      );
      let day = Tday[0].match(/[0-9]?[0-9]$/);

      let THour = date.match(
        /[0-9]?[0-9][:][0-9]?[0-9][:][0-9]?[0-9](\.)([0-9]+)$/
      );
      let hour = THour[0].match(/^[0-9]?[0-9]/);
      let TMiniut = date.match(/[0-9]?[0-9][:][0-9]?[0-9](\.)([0-9]+)$/);
      let miniut = TMiniut[0].match(/^[0-9]?[0-9]/);
      let TSec = date.match(/[0-9]?[0-9](\.)([0-9]+)$/);

      return [year, month[0], day[0], [hour[0], miniut[0], TSec[0]]];
    },
    date_merger: function({ gy, gm, gd, jy, jm, jd, hours }, sep, date = "") {
      if (gy)
        return `${gy}${sep}${gm > 9 ? gm : "0" + gm}${sep}${
          gd > 9 ? gd : "0" + gd
        } T ${hours[0].length > 1 ? hours[0] : "0" + hours[0]}:${
          hours[1].length > 1 ? hours[1] : "0" + hours[1]
        }:${hours[2]}`;
      if (jy)
        return `${jy}${sep}${jm > 9 ? jm : "0" + jm}${sep}${
          jd > 9 ? jd : "0" + jd
        } T ${hours[0].length > 1 ? hours[0] : "0" + hours[0]}:${
          hours[1].length > 1 ? hours[1] : "0" + hours[1]
        }:${hours[2]}`;
    }
  },

  {
    human: "DD/MM/YYYYTHH:MM:SS.S",
    hRegix: /^[Dd][Dd][-_/ \\][Mm][Mm][-_/ \\][Yy][Yy][Yy][Yy][T-_/ \\][Hh][Hh]:[Mm][Mm]:[Ss][Ss](\.)[Ss]$/,
    dRegix: /^[0-9]?[0-9][-_/ \\][0-9]?[0-9][-_/ \\][0-9][0-9][0-9][0-9][T-_/ \\][0-9]?[0-9][:][0-9]?[0-9][:][0-9]?[0-9](\.)([0-9]+)$/,
    date_splicer: function(date) {
      let day = date.slice(0, 2);
      let TMonth = date.match(/^[0-9]?[0-9][-_/ \\][0-9]?[0-9]/);
      let month = TMonth[0].match(/[0-9]?[0-9]$/);
      let TYear = date.match(
        /^[0-9]?[0-9][-_/ \\][0-9]?[0-9][-_/ \\][0-9][0-9][0-9][0-9]/
      );
      let year = TYear[0].match(/[0-9][0-9][0-9][0-9]$/);

      let THour = date.match(
        /[0-9]?[0-9][:][0-9]?[0-9][:][0-9]?[0-9](\.)([0-9]+)$/
      );
      let hour = THour[0].match(/^[0-9]?[0-9]/);
      let TMiniut = date.match(/[0-9]?[0-9][:][0-9]?[0-9](\.)([0-9]+)$/);
      let miniut = TMiniut[0].match(/^[0-9]?[0-9]/);
      let TSec = date.match(/[0-9]?[0-9](\.)([0-9]+)$/);

      return [year[0], month[0], day, [hour[0], miniut[0], TSec[0]]];
    },
    date_merger: function({ gy, gm, gd, jy, jm, jd, hours }, sep, date = "") {
      if (gy)
        return `${gd > 9 ? gd : "0" + gd}${sep}${gm > 9 ? gm : "0" + gm}${sep}${gy}T${hours[0].length > 1 ? hours[0] : "0" + hours[0]}:${
          hours[1].length > 1 ? hours[1] : "0" + hours[1]
        }:${hours[2]}`;
      if (jy)
        return `${
          jd > 9 ? jd : "0" + jd
        }${sep}${jm > 9 ? jm : "0" + jm}${sep}${jy}T${hours[0].length > 1 ? hours[0] : "0" + hours[0]}:${
          hours[1].length > 1 ? hours[1] : "0" + hours[1]
        }:${hours[2]}`;
    }
  },

  {
    human: "YYYY/MM/DDTHH:MM:SS",
    hRegix: /^[Yy][Yy][Yy][Yy][-_/ \\][Mm][Mm][-_/ \\][Dd][Dd][T-_/ \\][Hh][Hh]:[Mm][Mm]:[Ss][Ss]$/,
    dRegix: /^[0-9][0-9][0-9][0-9][-_/ \\][0-9]?[0-9][-_/ \\][0-9]?[0-9][T-_/ \\][0-9]?[0-9][:][0-9]?[0-9][:][0-9]?[0-9]$/,
    date_splicer: function(date) {
      let year = date.slice(0, 4);
      let TMonth = date.match(/^[0-9][0-9][0-9][0-9][-_/ \\][0-9]?[0-9]/);
      let month = TMonth[0].match(/[0-9]?[0-9]$/);
      let Tday = date.match(
        /^[0-9][0-9][0-9][0-9][-_/ \\][0-9]?[0-9][-_/ \\][0-9]?[0-9]/
      );
      let day = Tday[0].match(/[0-9]?[0-9]$/);
      let THour = date.match(/[0-9]?[0-9][:][0-9]?[0-9][:][0-9]?[0-9]$/);
      let hour = THour[0].match(/^[0-9]?[0-9]/);
      let TMiniut = date.match(/[0-9]?[0-9][:][0-9]?[0-9]$/);
      let miniut = TMiniut[0].match(/^[0-9]?[0-9]/);
      let TSec = date.match(/[0-9]?[0-9]$/);
      let sec = TSec[0].match(/^[0-9]?[0-9]/);
      return [year, month[0], day[0], [hour[0], miniut[0], sec[0]]];
    },
    date_merger: function({ gy, gm, gd, jy, jm, jd, hours }, sep, date = "") {
      if (gy)
        return `${gy}${sep}${gm > 9 ? gm : "0" + gm}${sep}${
          gd > 9 ? gd : "0" + gd
        } T ${hours[0].length > 1 ? hours[0] : "0" + hours[0]}:${
          hours[1].length > 1 ? hours[1] : "0" + hours[1]
        }:${
          Math.floor(hours[2]) > 9
            ? Math.floor(hours[2])
            : "0" + Math.floor(hours[2])
        }`;
      if (jy)
        return `${jy}${sep}${jm > 9 ? jm : "0" + jm}${sep}${
          jd > 9 ? jd : "0" + jd
        } T ${hours[0].length > 1 ? hours[0] : "0" + hours[0]}:${
          hours[1].length > 1 ? hours[1] : "0" + hours[1]
        }:${
          Math.floor(hours[2]) > 9
            ? Math.floor(hours[2])
            : "0" + Math.floor(hours[2])
        }`;
    }
  },

  {
    human: "HH:MM:SS",
    hRegix: /^[Hh][Hh]:[Mm][Mm]:[Ss][Ss]$/,
    dRegix: false,
    date_splicer: function(date) {
      let hour = date.match(/^[0-9]?[0-9]/);
      let TMiniut = date.match(/^[0-9]?[0-9][:][0-9]?[0-9]/);
      let miniut = TMiniut[0].match(/[0-9]?[0-9]$/);
      let sec = date.match(/[0-9]?[0-9]$/);

      return [hour[0], miniut[0], sec[0]];
    },
    date_merger: function({ hours }, sep, date = "") {
      let sec = String(Math.floor(hours[2]));
      return `${hours[0].length > 1 ? hours[0] : "0" + hours[0]}${sep}${
        hours[1].length > 1 ? hours[1] : "0" + hours[1]
      }${sep}${sec > 9 ? sec : "0" + sec}`;
    }
  },

  {
    human: "HH:MM",
    hRegix: /^[Hh][Hh]:[Mm][Mm]$/,
    dRegix: false,
    date_splicer: function(date) {
      let hour = date.match(/^[0-9]?[0-9]$/);
      let miniut = date.match(/[0-9]?[0-9]$/);
      return [hour[0], miniut[0]];
    },
    date_merger: function({ hours }, sep, date = "") {
      return `${hours[0].length > 1 ? hours[0] : "0" + hours[0]}${sep}${
        hours[1].length > 1 ? hours[1] : "0" + hours[1]
      }`;
    }
  },

  {
    human: "RAW",
    hRegix: /^[Rr][Aa][Ww]$/,
    dRegix: false,
    date_merger: function({ gy, gm, gd, jy, jm, jd, hours }, sep, date = "") {
      if (gy)
        return {
          year: gy,
          month: gm,
          Month: calculation.get_gregorian_month(gm),
          day: gd,
          dweek: calculation.gregorian_day_week(gy + "/" + gm + "/" + gd),
          hour: Number(hours[0]),
          minute: Number(hours[1]),
          second: Number(hours[2]),
          numeric: new Date(
            gy +
              "-" +
              (gm>9?gm:"0"+gm) +
              "-" +
              (gd>9?gd:"0"+gd) +
              "T" +
              (hours[0] > 9 ? hours[0] : "0" + hours[0]) +
              ":" +
              (hours[1] > 9 ? hours[1] : "0" + hours[1]) +
              ":" +
              (hours[2] > 9 ? hours[2] : "0" + hours[2])
          ).getTime()
        };
      if (jy)
        return {
          year: jy,
          month: jm,
          Month: calculation.get_persian_month(jm),
          day: jd,
          dweek: calculation.persian_day_week(date),
          hour: Number(hours[0]),
          minute: Number(hours[1]),
          second: Number(hours[2]),
          numeric: new Date(
            date +
              "T" +
              (hours[0] > 9 ? hours[0] : "0" + hours[0]) +
              ":" +
              (hours[1] > 9 ? hours[1] : "0" + hours[1]) +
              ":" +
              (hours[2] > 9 ? hours[2] : "0" + hours[2])
          ).getTime()
        };
    }
  },

  {
    human: "DATE",
    hRegix: false,
    dRegix: /^[a-zA-Z]+[ ][a-zA-Z]+[ ][0-9]?[0-9][ ][0-9][0-9][0-9][0-9][ ][0-9]?[0-9][:][0-9]?[0-9][:][0-9]?[0-9]/,
    date_splicer: function(date) {
      let year = date.match(/[0-9][0-9][0-9][0-9]/);
      let TMonth = date.match(/^[a-zA-Z]+[ ][a-zA-Z]+/);
      let month = TMonth[0].match(/[a-zA-Z]+$/);
      let Tday = date.match(/^[a-zA-Z]+[ ][a-zA-Z]+[ ][0-9]?[0-9]/);
      let day = Tday[0].match(/[0-9]?[0-9]$/);
      let THour = date.match(/[0-9]?[0-9][:][0-9]?[0-9][:][0-9]?[0-9]/);
      let hour = THour[0].match(/^[0-9]?[0-9]/);
      let TMiniut = THour[0].match(/^[0-9]?[0-9][:][0-9]?[0-9]/);
      let miniut = TMiniut[0].match(/[0-9]?[0-9]$/);
      let sec = THour[0].match(/[0-9]?[0-9]$/);
      return [
        year[0],
        calculation.understand_gregorian_month(month[0]),
        day[0],
        [hour[0], miniut[0], sec[0]]
      ];
    },
    date_merger: function({ gy, gm, gd, jy, jm, jd, hours }, sep, date = "") {}
  },

  { // need to repaire
    human: "YYYY/MM/DDTHH:MM:SS.S AM",
    hRegix:false,
    dRegix: /^[0-9][0-9][0-9][0-9][-_/ \\][0-9]?[0-9][-_/ \\][0-9]?[0-9][T-_/ \\][0-9]?[0-9][:][0-9]?[0-9][:][0-9]?[0-9](\.)([0-9]+)[T-_/ \\][a-zA-Z]+$/,
    date_splicer: function(date) {
      let year = date.slice(0, 4);
      let TMonth = date.match(/^[0-9][0-9][0-9][0-9][-_/ \\][0-9]?[0-9]/);
      let month = TMonth[0].match(/[0-9]?[0-9]$/);
      let Tday = date.match(
        /^[0-9][0-9][0-9][0-9][-_/ \\][0-9]?[0-9][-_/ \\][0-9]?[0-9]/
      );
      let day = Tday[0].match(/[0-9]?[0-9]$/);
      let THour = date.match(/[0-9]?[0-9][:][0-9]?[0-9][:][0-9]?[0-9](\.)([0-9]+)[T-_/ \\][a-zA-Z]+$/);
      let hour = THour[0].match(/^[0-9]?[0-9]/);
      let TMiniut = date.match(/[0-9]?[0-9][:][0-9]?[0-9](\.)([0-9]+)[T-_/ \\][a-zA-Z]+$/);
      let miniut = TMiniut[0].match(/^[0-9]?[0-9]/);
      let TSec = date.match(/[0-9]?[0-9](\.)([0-9]+)[T-_/ \\][a-zA-Z]+$/);
      let sec = TSec[0].match(/^[0-9]?[0-9](\.)([0-9]+)/);
      return [year, month[0], day[0], [hour[0], miniut[0], sec[0]]];
    },
    date_merger: function({ gy, gm, gd, jy, jm, jd, hours }, sep, date = "") {}
  },

  { // need to repaire
    human: "YYYY/MM/DDTHH:MM:SS AM",
    hRegix:false,
    dRegix: /^[0-9][0-9][0-9][0-9][-_/ \\][0-9]?[0-9][-_/ \\][0-9]?[0-9][T-_/ \\][0-9]?[0-9][:][0-9]?[0-9][:][0-9]?[0-9][T-_/ \\][a-zA-Z]+$/,
    date_splicer: function(date) {
      let year = date.slice(0, 4);
      let TMonth = date.match(/^[0-9][0-9][0-9][0-9][-_/ \\][0-9]?[0-9]/);
      let month = TMonth[0].match(/[0-9]?[0-9]$/);
      let Tday = date.match(
        /^[0-9][0-9][0-9][0-9][-_/ \\][0-9]?[0-9][-_/ \\][0-9]?[0-9]/
      );
      let day = Tday[0].match(/[0-9]?[0-9]$/);
      let THour = date.match(/[0-9]?[0-9][:][0-9]?[0-9][:][0-9]?[0-9][T-_/ \\][a-zA-Z]+$/);
      let hour = THour[0].match(/^[0-9]?[0-9]/);
      let TMiniut = date.match(/[0-9]?[0-9][:][0-9]?[0-9][T-_/ \\][a-zA-Z]+$/);
      let miniut = TMiniut[0].match(/^[0-9]?[0-9]/);
      let TSec = date.match(/[0-9]?[0-9][T-_/ \\][a-zA-Z]+$/);
      let sec = TSec[0].match(/^[0-9]?[0-9]/);
      return [year, month[0], day[0], [hour[0], miniut[0], sec[0]]];
    },
    date_merger: function({ gy, gm, gd, jy, jm, jd, hours }, sep, date = "") {}
  },
];

module.exports = { format };
