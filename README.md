# zaravand-jallali-date
calculate gregorian date to jallali date and reverse

<p dir="rtl">
تاریخ جلالی زراوند یک برنامه براساس زبان جاوااسکریپت در محیط اجرایی نود است، که جهت تبدیل تاریخ میلادی به شمسی و بلعکس می‌توان از آن استفاده کرد
</p>

<div dir="rtl">
    از آنجایی که بیشتر کاربران این برنامه متکلم به زبان فارسی هستند، تا حد امکان سعی شده اسناد این برنامه به زبان فارسی تهیه شود
</div>

## فهرست


### نصب
<p dir="rtl">
    برای نصب این برنامه می‌توانید از سیستم مدیرت بسته نود استفاده کنید
</p>

```javascript
    npm install zaravand-jallali-date
```

<p dir="rtl">
    درصورتی که از  یارن برای نصب استفاده می‌کنید:
</p>

```javascript
    yarn add zaravand-jallali-date
```

### استفاده سریع

<p dir="rtl">
    جهت استفاده سریع از این برنامه و تبدیل تاریخ مورد نظر خود، کافی‌ست دستورالعمل زیر را به کار بگیرید
</p>

```javascript
    const Zaravand = require("zaravand-jallali-date");
    // [or] import Zaravand from "zaravand-jallali-date";

    const _date = new Zaravand();

    //to jallali
    let result =  _date.convert("2019/7/12", "fa");  // 1398/04/21   

    // to gregorian
    let result =  _date.convert("2019/7/12", "fa");  // 2019/07/12 

```