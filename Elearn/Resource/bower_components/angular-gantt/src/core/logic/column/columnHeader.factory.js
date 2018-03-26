(function(){
    'use strict';
    angular.module('gantt').factory('GanttColumnHeader', [ 'moment', 'GanttColumn', function(moment, Column) {
        // Used to display the Gantt grid and header.
        // The columns are generated by the column generator.

        var ColumnHeader = function(startDate, endDate, viewScaleUnit, left, width, labelFormat) {
            startDate = moment(startDate);
            endDate = moment(endDate);

            var column = new Column(startDate, endDate, left, width);
            column.unit = viewScaleUnit;
            column.label = angular.isFunction(labelFormat) ? labelFormat(column): startDate.format(labelFormat);

            return column;
        };
        return ColumnHeader;
    }]);
}());

