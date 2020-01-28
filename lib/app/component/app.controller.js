/**
 * @type AngularJS.Controller
 * @name AppComponentController
 * @description AppComponentController implements AppComponentComponent features
 * @author FreakyCoder
 */

function AppComponentController(DTOptionsBuilder, DTColumnBuilder) {
  const $ctrl = this;

  $ctrl.$onInit = () => {
    $ctrl.state = {
      dtInstance: null,
      dtOptions: null,
      dtColumns: null,
      ready: false,
      fetching: false
    };

    setConfig();
    setColumns();
    if ($ctrl.initialRender) {
      $ctrl.reRender();
    }
  };
  $ctrl.reRender = () => {
    if (!$ctrl.state.ready) {
      $ctrl.state.ready = true;
      return;
    }
    const action = $ctrl.state.dtInstance.changeData(getData);
    $ctrl.state.dtInstance.reRender();
    return action;
  };

  setConfig = () => {
    // const userLang = $rootScope.user.principal.language || navigator.language;
    $ctrl.state.dtOptions = DTOptionsBuilder.fromFnPromise(getData)
      .withDOM("frtip")
      .withOption("responsive", true)
      .withOption("iDisplayLength", $ctrl.entryLimit ? $ctrl.entryLimit : 10)
      // .withLanguage(DATA_TABLE_CONSTANT.LANGUAGE)
      .withButtons([
        {
          extend: "copy",
          text: "Copy"
        },
        "csv",
        "excel",
        "pdf",
        {
          extend: "colvis",
          text: "Column Visibility"
        }
      ]);
    // TODO: Language options
    // if (userLang === "tr-TR") {
    //   const language = require("../../../assets/translations/locale-tr-TR.json")
    //     .datatable;
    //   $ctrl.state.dtOptions.withLanguage(language);
    // }
  };

  setColumns = () => {
    $ctrl.state.dtColumns = $ctrl.columns.map(column => {
      let col = DTColumnBuilder.newColumn(column.key).withTitle(column.name);
      _.each(column.options, (optKey, optValue) => {
        col.withOption(optKey, optValue);
      });
      if (column.type && column.type === "date") {
        col.withOption("type", "date");
      }
      return col;
    });
  };

  getData = () => {
    $ctrl.state.fetching = true;
    return $ctrl.api().finally(() => {
      $ctrl.state.fetching = false;
    });
  };
}

export default AppComponentController;
