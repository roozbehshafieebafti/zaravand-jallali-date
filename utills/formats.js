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
    human: "YYYY/MM/DDTHH:MM:SS",
    hRegix: /^[Yy][Yy][Yy][Yy][-_/ \\][Mm][Mm][-_/ \\][Dd][Dd][T-_/ \\][Hh][Hh]:[Mm][Mm]:[Ss][Ss]$/,
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
        } T ${hours[0]}:${hours[1]}:${hours[2]}`;
      if (jy)
        return `${jy}${sep}${jm > 9 ? jm : "0" + jm}${sep}${
          jd > 9 ? jd : "0" + jd
        } T ${hours[0]}:${hours[1]}:${hours[2]}`;
    }
  },

  {
    human: "HH:MM:SS",
    hRegix: /^[Hh][Hh]:[Mm][Mm]:[Ss][Ss]$/,
    dRegix: /^[0-9]?[0-9][:][0-9]?[0-9][:][0-9]?[0-9](\.)([0-9]+)$/,
    date_splicer: function(date) {
      let hour = date.match(/^[0-9]?[0-9]$/);
      let TMiniut = date.match(/^[0-9]?[0-9][:][0-9]?[0-9]/);
      let miniut = TMiniut[0].match(/[0-9]?[0-9]$/);
      let TSec = date.match(/[0-9]?[0-9](\.)([0-9]+)$/);

      return [hour[0], miniut[0], TSec[0]];
    },
    date_merger: function({ hours }, sep, date = "") {
      return `${hours[0] > 9 ? hours[0] : "0" + hours[0]}${sep}${
        hours[1] > 9 ? hours[1] : "0" + hours[1]
      }${sep}${hours[2] > 9 ? hours[2] : "0" + hours[2]}`;
    }
  }
];

module.exports = { format };
