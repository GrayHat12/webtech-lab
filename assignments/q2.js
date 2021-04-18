function displayCalendar(year) {
    let today = `Jan 01 ${year}`;
    let date = new Date(today);
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let calendar = {};
    while (date.getFullYear() === year) {
        let month = months[date.getMonth()];
        let _date = date.getDate();
        let _day = days[date.getDay()];
        let _week = calendar[month] || {};
        if (!_week[_day])
            _week[_day] = [];
        _week[_day].push(_date);
        calendar[month] = _week;
        console.log(`${_date} ${_day} ${month} ${date.getFullYear()}`);
        date.setDate(date.getDate() + 1);
    }
    console.log(calendar);
}