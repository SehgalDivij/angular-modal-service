// declaration of angular module
angular.module('PopupServiceExample', ['ui.bootstrap', 'ngSanitize']);

// add in necessary constants.
angular.module('PopupServiceExample')
  // these will be put into config section
  .constant('$MODAL_CONFIG_DEFAULTS', {
    // ui-bootstrap-modal - standard config info.
    // a resolve section may be added to this section to resolve data from network resources 
    // and passed to a custom controller such as one defined down below.
    animation: true,
    ariaLabelledBy: 'modal-title',
    ariaDescribedBy: 'modal-body',
    keyboard: false,
    controllerAs: '$ctrl',
    backdrop: 'static',
    templateUrl: 'popup.htm'
  })
  .constant('$MODAL_DATA_DEFAULTS', {
    title: 'Alert Title',
    body: 'Alert Message',
    close_label: 'OK',
    cancel_label: 'Cancel',
    is_confirm: false,
    is_error: false,
    is_alert: false
  });