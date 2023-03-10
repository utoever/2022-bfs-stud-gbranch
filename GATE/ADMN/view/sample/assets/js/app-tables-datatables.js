/*!
 * Amaretti v2.0.1-prerelease
 * https://foxythemes.net
 *
 * Copyright (c) 2019 Foxy Themes
 */

var App = (function () {
  'use strict';

  App.dataTables = function( ){

    //We use this to apply style to certain elements
    $.extend( true, $.fn.dataTable.defaults, {
      dom:
        "<'row am-datatable-header'<'col-sm-6'l><'col-sm-6'f>>" +
        "<'row am-datatable-body'<'col-sm-12'tr>>" +
        "<'row am-datatable-footer'<'col-sm-5'i><'col-sm-7'p>>"
    } );

    $.extend( $.fn.dataTable.ext.classes, {
      sFilterInput:  "form-control form-control-sm",
      sLengthSelect: "form-control form-control-sm",
    } );

    $("#table1").dataTable();

    //Remove search & paging dropdown
    $("#table2").dataTable({
      pageLength: 6,
      dom:  "<'row am-datatable-body'<'col-sm-12'tr>>" +
            "<'row am-datatable-footer'<'col-sm-5'i><'col-sm-7'p>>"
    });

    //Enable toolbar button functions
    $("#table3").dataTable({
      buttons: [
        {extend: 'copy', className: 'btn-secondary'},
        {extend: 'excel', className: 'btn-secondary'},
        {extend: 'pdf', className: 'btn-secondary'},
        {extend: 'print', className: 'btn-secondary'}
      ],
      "lengthMenu": [[6, 10, 25, 50, -1], [6, 10, 25, 50, "All"]],
      dom:  "<'row am-datatable-header'<'col-sm-6'l><'col-sm-6 text-right'B>>" +
            "<'row am-datatable-body'<'col-sm-12'tr>>" +
            "<'row am-datatable-footer'<'col-sm-5'i><'col-sm-7'p>>"
    });

  };

  return App;
})(App || {});
