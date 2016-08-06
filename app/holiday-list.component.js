angular.
  module('holidayApp').
  component('holidayList', {
    template:
        '<ul>' +
          '<li ng-repeat="holiday in $ctrl.holidays">' +
            '<span>{{holiday.name}}</span>' +
            '<p>{{holiday.snippet}}</p>' +
          '</li>' +
        '</ul>',
    controller: function HolidayListController() {
      this.holidays = [
        {
          name: 'Nexus S',
          snippet: 'Fast just got faster with Nexus S.'
        }, {
          name: 'Motorola XOOM™ with Wi-Fi',
          snippet: 'The Next, Next Generation tablet.'
        }, {
          name: 'MOTOROLA XOOM™',
          snippet: 'The Next, Next Generation tablet.'
        }
      ];
    }
  });
