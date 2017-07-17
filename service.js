// service code
angular.module('PopupServiceExample')
  .service('Popup', ['$MODAL_CONFIG_DEFAULTS', '$MODAL_DATA_DEFAULTS', '$uibModal',
    function($MODAL_CONFIG_DEFAULTS, $MODAL_DATA_DEFAULTS, $uibModal) {
      // this will be updated later when the service is invoked with settings for the modal.
      var config_defaults = $MODAL_CONFIG_DEFAULTS;
      // hold data to be shown within modal.
      var data_defaults = $MODAL_DATA_DEFAULTS;
      this.show = function(modal_config, modal_data) {
        if (modal_data.is_confirm) {
          modal_data.is_error = false;
          modal_data.is_alert = false;
        } else {
          if (modal_data.is_error) {
            modal_data.is_alert = false;
          }
        }
        modal_data = angular.extend({}, data_defaults, modal_data);
        modal_config = angular.extend({}, config_defaults, modal_config);
        if (!modal_config.resolve) {
          modal_config.resolve = {};
        }
        modal_config.resolve.modal_data = modal_data;
        if (!modal_config.controller) {
          modal_config.controller = ['$scope', '$uibModalInstance', 'modal_data', function($scope, $uibModalInstance, modal_data) {
            var $ctrl = this;
            $ctrl.data = modal_data;
            $ctrl.data.close = function() {
              $uibModalInstance.close();
            };
            $ctrl.data.cancel = function() {
              $uibModalInstance.dismiss();
            };
          }];
        }
        return $uibModal.open(modal_config).result;
      };
    }
  ]);