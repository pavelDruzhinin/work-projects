var MonthCalendar = (function () {
    var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    var prevMonth = '&nbsp;&#9668;&nbsp;';
    var nextMonth = '&nbsp;&#9658;&nbsp;';

    function calendar(options) {
        var self = this;

        self.div = document.getElementById(options.elementId);
        self.months = !options.months ? months : options.months;

        var dateNow = new Date();

        self.monthNow = dateNow.getMonth() + 1;
        self.yearNow = dateNow.getFullYear();
        self.monthName = self.months[dateNow.getMonth()];
        self.textNow = self.monthName + " " + self.yearNow;

        addSpans.call(self, !options ? undefined : options.action);
    }

    calendar.prototype.getDateNow = function () {
        var month = this.monthNow;

        if (month < 10) {
            month = '0' + month;
        }

        return "01." + month + "." + this.yearNow;
    };

    function addSpans(action) {

        var self = this;

        var spans = [
            createSpan('prevMonth', prevMonth),
            createSpan('date', self.textNow),
            createSpan('nextMonth', nextMonth)
        ];

        for (var i = 0; i < spans.length; i++) {

            var span = spans[i];

            if (span.id != 'date') {
                span.onclick = function () {
                    var step = this.id == 'prevMonth' ? -1 : 1;
                    changeDate.call(self, step);
                    if (isFunction(action))
                        action.call(self);
                };
            }

            self.div.appendChild(spans[i]);
        }
    }

    function isFunction(func) {
        return {}.toString.call(func).indexOf('Function') != -1;
    }

    function changeDate(step) {
        var date = document.getElementById("date");
        var self = this;

        var month = self.monthNow + step - 1;
        self.monthNow += step;

        if (month < 0) {
            month = 11;
            self.monthNow = 12;
            self.yearNow -= 1;
        }

        if (month > 11) {
            month = 0;
            self.monthNow = 1;
            self.yearNow += 1;
        }

        date.innerHTML = self.months[month] + " " + self.yearNow;
    }

    function createSpan(id, text, onclick) {
        var span = document.createElement('span');

        span.id = id;
        span.innerHTML = text;
        span.onclick = onclick;
        span.style.margin = '10px';

        if (id != 'date')
            span.style.cursor = 'pointer';

        return span;
    }

    return calendar;
})();