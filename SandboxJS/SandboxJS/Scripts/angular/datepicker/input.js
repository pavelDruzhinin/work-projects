'use strict';


(function () {

    var PRISTINE_CLASS = 'ng-pristine',
        DIRTY_CLASS = 'ng-dirty';

    var Module = angular.module('datePicker');

    Module.constant('dateTimeConfig', {
        template: function (attrs) {
            return '' +
                '<div ' +
                'date-picker="' + attrs.ngModel + '" ' +
                (attrs.view ? 'view="' + attrs.view + '" ' : '') +
                (attrs.maxView ? 'max-view="' + attrs.maxView + '" ' : '') +
                (attrs.template ? 'template="' + attrs.template + '" ' : '') +
                (attrs.minView ? 'min-view="' + attrs.minView + '" ' : '') +
                (attrs.partial ? 'partial="' + attrs.partial + '" ' : '') +
                'class="dropdown-menu"></div>';
        },
        format: 'yyyy-MM-dd HH:mm',
        views: ['date', 'year', 'month', 'hours', 'minutes'],
        dismiss: false,
        position: 'relative'
    });

    Module.directive('dateTimeAppend', function () {
        return {
            link: function (scope, element) {
                element.bind('click', function () {
                    element.find('input')[0].focus();
                });
            }
        };
    });

    Module.directive('dateTime', ['$compile', '$document', '$filter', 'dateTimeConfig', '$parse', function ($compile, $document, $filter, dateTimeConfig, $parse) {
        var body = $document.find('body');
        var dateFilter = $filter('date');

        return {
            require: 'ngModel',
            scope: true,
            link: function (scope, element, attrs, ngModel) {
                var format = attrs.format || dateTimeConfig.format;
                var parentForm = element.inheritedData('$formController');
                var views = $parse(attrs.views)(scope) || dateTimeConfig.views.concat();
                var view = attrs.view || views[0];
                var index = views.indexOf(view);
                var dismiss = attrs.dismiss ? $parse(attrs.dismiss)(scope) : dateTimeConfig.dismiss;
                var picker = null;
                var position = attrs.position || dateTimeConfig.position;
                var container = null;

                if (index === -1) {
                    views.splice(index, 1);
                }

                views.unshift(view);


                function formatter(value) {
                    return dateFilter(value, format);
                }

                function parser() {
                    return ngModel.$modelValue;
                }

                ngModel.$formatters.push(formatter);
                ngModel.$parsers.unshift(parser);


                var template = dateTimeConfig.template(attrs);

                function updateInput(event) {
                    event.stopPropagation();
                    if (ngModel.$pristine) {
                        ngModel.$dirty = true;
                        ngModel.$pristine = false;
                        element.removeClass(PRISTINE_CLASS).addClass(DIRTY_CLASS);
                        if (parentForm) {
                            parentForm.$setDirty();
                        }
                        ngModel.$render();
                    }
                }

                function clear() {
                    if (picker) {
                        picker.remove();
                        picker = null;
                    }
                    if (container) {
                        container.remove();
                        container = null;
                    }
                }

                function showPicker() {
                    if (picker) {
                        return;
                    }
                    // create picker element
                    picker = $compile(template)(scope);
                    scope.$digest();

                    scope.$on('setDate', function (event, date, view) {
                        updateInput(event);
                        if (dismiss && views[views.length - 1] === view) {
                            clear();
                        }
                    });

                    scope.$on('$destroy', clear);

                    // move picker below input element

                    if (position === 'absolute') {
                        var pos = angular.extend(element.offset(), { height: element[0].offsetHeight });
                        picker.css({ top: pos.top + pos.height, left: pos.left, display: 'block', position: position });
                        body.append(picker);
                    } else {
                        // relative
                        container = angular.element('<div date-picker-wrapper></div>');
                        element[0].parentElement.insertBefore(container[0], element[0]);
                        container.append(picker);
                        //          this approach doesn't work
                        //          element.before(picker);
                        picker.css({ top: element[0].offsetHeight + 'px', display: 'block' });
                    }

                    picker.bind('mousedown', function (evt) {
                        evt.preventDefault();
                    });
                }

                element.bind('focus', showPicker);
                element.bind('blur', clear);
            }
        };
    }]);

    angular.module("datePicker").run(["$templateCache", function ($templateCache) {

        $templateCache.put("templates/datepicker.html",
          "<div ng-switch=\"view\">\r" +
          "\n" +
          "  <div ng-switch-when=\"date\">\r" +
          "\n" +
          "    <table>\r" +
          "\n" +
          "      <thead>\r" +
          "\n" +
          "      <tr>\r" +
          "\n" +
          "        <th ng-click=\"prev()\">‹</th>\r" +
          "\n" +
          "        <th colspan=\"5\" class=\"switch\" ng-click=\"setView('month')\">{{date|date:\"yyyy MMMM\"}}</th>\r" +
          "\n" +
          "        <th ng-click=\"next()\">›</i></th>\r" +
          "\n" +
          "      </tr>\r" +
          "\n" +
          "      <tr>\r" +
          "\n" +
          "        <th ng-repeat=\"day in weekdays\" style=\"overflow: hidden\">{{ day|date:\"EEE\" }}</th>\r" +
          "\n" +
          "      </tr>\r" +
          "\n" +
          "      </thead>\r" +
          "\n" +
          "      <tbody>\r" +
          "\n" +
          "      <tr ng-repeat=\"week in weeks\">\r" +
          "\n" +
          "        <td ng-repeat=\"day in week\">\r" +
          "\n" +
          "          <span\r" +
          "\n" +
          "            ng-class=\"{'now':isNow(day),'active':isSameDay(day),'disabled':(day.getMonth()!=date.getMonth()),'after':isAfter(day),'before':isBefore(day)}\"\r" +
          "\n" +
          "            ng-click=\"setDate(day)\" ng-bind=\"day.getDate()\"></span>\r" +
          "\n" +
          "        </td>\r" +
          "\n" +
          "      </tr>\r" +
          "\n" +
          "      </tbody>\r" +
          "\n" +
          "    </table>\r" +
          "\n" +
          "  </div>\r" +
          "\n" +
          "  <div ng-switch-when=\"year\">\r" +
          "\n" +
          "    <table>\r" +
          "\n" +
          "      <thead>\r" +
          "\n" +
          "      <tr>\r" +
          "\n" +
          "        <th ng-click=\"prev(10)\">‹</th>\r" +
          "\n" +
          "        <th colspan=\"5\" class=\"switch\">{{years[0].getFullYear()}}-{{years[years.length-1].getFullYear()}}</th>\r" +
          "\n" +
          "        <th ng-click=\"next(10)\">›</i></th>\r" +
          "\n" +
          "      </tr>\r" +
          "\n" +
          "      </thead>\r" +
          "\n" +
          "      <tbody>\r" +
          "\n" +
          "      <tr>\r" +
          "\n" +
          "        <td colspan=\"7\">\r" +
          "\n" +
          "          <span ng-class=\"{'active':isSameYear(year),'now':isNow(year)}\"\r" +
          "\n" +
          "                ng-repeat=\"year in years\"\r" +
          "\n" +
          "                ng-click=\"setDate(year)\" ng-bind=\"year.getFullYear()\"></span>\r" +
          "\n" +
          "        </td>\r" +
          "\n" +
          "      </tr>\r" +
          "\n" +
          "      </tbody>\r" +
          "\n" +
          "    </table>\r" +
          "\n" +
          "  </div>\r" +
          "\n" +
          "  <div ng-switch-when=\"month\">\r" +
          "\n" +
          "    <table>\r" +
          "\n" +
          "      <thead>\r" +
          "\n" +
          "      <tr>\r" +
          "\n" +
          "        <th ng-click=\"prev()\">‹</th>\r" +
          "\n" +
          "        <th colspan=\"5\" class=\"switch\" ng-click=\"setView('year')\">{{ date|date:\"yyyy\" }}</th>\r" +
          "\n" +
          "        <th ng-click=\"next()\">›</i></th>\r" +
          "\n" +
          "      </tr>\r" +
          "\n" +
          "      </thead>\r" +
          "\n" +
          "      <tbody>\r" +
          "\n" +
          "      <tr>\r" +
          "\n" +
          "        <td colspan=\"7\">\r" +
          "\n" +
          "          <span ng-repeat=\"month in months\"\r" +
          "\n" +
          "                ng-class=\"{'active':isSameMonth(month),'after':isAfter(month),'before':isBefore(month),'now':isNow(month)}\"\r" +
          "\n" +
          "                ng-click=\"setDate(month)\"\r" +
          "\n" +
          "                ng-bind=\"month|date:'MMM'\"></span>\r" +
          "\n" +
          "        </td>\r" +
          "\n" +
          "      </tr>\r" +
          "\n" +
          "      </tbody>\r" +
          "\n" +
          "    </table>\r" +
          "\n" +
          "  </div>\r" +
          "\n" +
          "  <div ng-switch-when=\"hours\">\r" +
          "\n" +
          "    <table>\r" +
          "\n" +
          "      <thead>\r" +
          "\n" +
          "      <tr>\r" +
          "\n" +
          "        <th ng-click=\"prev(24)\">‹</th>\r" +
          "\n" +
          "        <th colspan=\"5\" class=\"switch\" ng-click=\"setView('date')\">{{ date|date:\"dd MMMM yyyy\" }}</th>\r" +
          "\n" +
          "        <th ng-click=\"next(24)\">›</i></th>\r" +
          "\n" +
          "      </tr>\r" +
          "\n" +
          "      </thead>\r" +
          "\n" +
          "      <tbody>\r" +
          "\n" +
          "      <tr>\r" +
          "\n" +
          "        <td colspan=\"7\">\r" +
          "\n" +
          "          <span ng-repeat=\"hour in hours\"\r" +
          "\n" +
          "                ng-class=\"{'now':isNow(hour),'active':isSameHour(hour)}\"\r" +
          "\n" +
          "                ng-click=\"setDate(hour)\" ng-bind=\"hour|time\"></span>\r" +
          "\n" +
          "        </td>\r" +
          "\n" +
          "      </tr>\r" +
          "\n" +
          "      </tbody>\r" +
          "\n" +
          "    </table>\r" +
          "\n" +
          "  </div>\r" +
          "\n" +
          "  <div ng-switch-when=\"minutes\">\r" +
          "\n" +
          "    <table>\r" +
          "\n" +
          "      <thead>\r" +
          "\n" +
          "      <tr>\r" +
          "\n" +
          "        <th ng-click=\"prev()\">‹</th>\r" +
          "\n" +
          "        <th colspan=\"5\" class=\"switch\" ng-click=\"setView('hours')\">{{ date|date:\"dd MMMM yyyy\" }}\r" +
          "\n" +
          "        </th>\r" +
          "\n" +
          "        <th ng-click=\"next()\">›</i></th>\r" +
          "\n" +
          "      </tr>\r" +
          "\n" +
          "      </thead>\r" +
          "\n" +
          "      <tbody>\r" +
          "\n" +
          "      <tr>\r" +
          "\n" +
          "        <td colspan=\"7\">\r" +
          "\n" +
          "          <span ng-repeat=\"minute in minutes\"\r" +
          "\n" +
          "                ng-class=\"{active:isSameMinutes(minute),'now':isNow(minute)}\"\r" +
          "\n" +
          "                ng-click=\"setDate(minute)\"\r" +
          "\n" +
          "                ng-bind=\"minute|time\"></span>\r" +
          "\n" +
          "        </td>\r" +
          "\n" +
          "      </tr>\r" +
          "\n" +
          "      </tbody>\r" +
          "\n" +
          "    </table>\r" +
          "\n" +
          "  </div>\r" +
          "\n" +
          "</div>\r" +
          "\n"
        );

        $templateCache.put("templates/daterange.html",
          "<div>\r" +
          "\n" +
          "    <table>\r" +
          "\n" +
          "        <tr>\r" +
          "\n" +
          "            <td valign=\"top\">\r" +
          "\n" +
          "                <div date-picker=\"start\" ng-disabled=\"disableDatePickers\"  class=\"date-picker\" date after=\"start\" before=\"end\" min-view=\"date\" max-view=\"date\"></div>\r" +
          "\n" +
          "            </td>\r" +
          "\n" +
          "            <td valign=\"top\">\r" +
          "\n" +
          "                <div date-picker=\"end\" ng-disabled=\"disableDatePickers\"  class=\"date-picker\" date after=\"start\" before=\"end\"  min-view=\"date\" max-view=\"date\"></div>\r" +
          "\n" +
          "            </td>\r" +
          "\n" +
          "        </tr>\r" +
          "\n" +
          "    </table>\r" +
          "\n" +
          "</div>\r" +
          "\n"
        );

    }]);

})();