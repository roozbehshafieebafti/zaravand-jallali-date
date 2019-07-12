# zaravand-jallali-date
calculate gregorian date to jallali date and reverse

<p style="text-align: right">
تاریخ جلالی زراوند یک برنامه براساس زبان جاوااسکریپت در محیط اجرایی نود است، که جهت تبدیل تاریخ میلادی به شمسی و بلعکس می‌توان از آن استفاده کرد
</p>

<p style="text-align: right">
    از آنجایی که بیشتر کاربران این برنامه متکلم به زبان فارسی هستند، اسناد این برنامه کاملا به زبان فارسی تهیه شده تا بدون فوت وقت مورد استفاده قرار گیرد
</p>

##فهرست

---

###نصب
<p style="text-align: right">
    برای نصب این برنامه می‌توانید از سیستم مدیرت بسته نود(npm) استفاده کنید
</p>
```
    npm install zaravand-jallali-date
```

<p style="text-align: right">
    درصورتی که برای نصب از (yarn) استفاده می‌کنید:
</p>
```
    yarn add zaravand-jallali-date
```

###استفاده سریع

<p style="text-align: right">
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