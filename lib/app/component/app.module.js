import AppComponent from "./app.component";
import "jquery"; //jQuery has to be load before AngularJS
import angular from "angular";
import jsZip from "jszip";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
window.JSZip = jsZip;
import "datatables.net"; // Core
import "datatables.net-dt"; // Styling
import("datatables.net-buttons");
import("datatables.net-buttons-dt");
import "datatables.net-buttons/js/buttons.colVis";
import "datatables.net-buttons/js/buttons.flash";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import "angular-datatables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "angular-datatables/dist/css/angular-datatables.min.css";
import "angular-datatables/dist/plugins/buttons/angular-datatables.buttons";

jQuery.extend(jQuery.fn.dataTableExt.oSort, {
  "date-eu-pre": function(date) {
    date = date.replace(" ", "");

    if (!date) {
      return 0;
    }

    var year;
    var eu_date = date.split(/[\.\-\/]/);

    /*year (optional)*/
    if (eu_date[2]) {
      year = eu_date[2];
    } else {
      year = 0;
    }

    /*month*/
    var month = eu_date[1];
    if (month.length == 1) {
      month = 0 + month;
    }

    /*day*/
    var day = eu_date[0];
    if (day.length == 1) {
      day = 0 + day;
    }

    return (year + month + day) * 1;
  },

  "date-eu-asc": function(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  },

  "date-eu-desc": function(a, b) {
    return a < b ? 1 : a > b ? -1 : 0;
  }
});

/**
 * @type AngularJS.Module
 * @name AppComponentModule
 * @description AppComponent module where all its dependencies load and export
 * @author Paraboly
 */
let AppComponentModule = angular
  .module("paraboly.datatable", ["datatables", "datatables.buttons"])
  .component("parabolyDt", AppComponent).name;

export default AppComponentModule;
