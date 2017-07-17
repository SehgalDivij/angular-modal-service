// controller code.
angular.module('PopupServiceExample')
  .controller('AppController', ['$scope', 'Popup', function($scope, Popup) {
    $scope.show_alert = function() {
      Popup.show({}, {
        title: null, // or put a title here.
        body: 'Hi. This is an alert.',
        is_alert: true,
        close_label: 'OK'
      });
    };

    $scope.show_error = function() {
      Popup.show({}, {
        title: 'Error Title',
        body: 'An error occurred. Please try again later.',
        is_error: true,
        close_label: 'OK'
      });
    };

    $scope.show_confirm = function() {
      Popup.show({
        controller: ['$scope', '$uibModalInstance', 'modal_data', function($scope, $uibModalInstance, modal_data) {
          var $ctrl = this;
          $ctrl.data = modal_data;
          $ctrl.data.close = function() {
            $uibModalInstance.close('random data');
          };
          $ctrl.data.cancel = function() {
            $uibModalInstance.dismiss('random data');
          };
          console.log('Accessing Modal Data - Name:' + modal_data.name + ' Age: ' + modal_data.age);
        }]
      }, {
        title: 'Title for confirmation.',
        body: 'Confirm this action?',
        close_label: 'Yes',
        cancel_label: 'No',
        is_confirm: true,
        // following two fields will be passed separately and accessible within the modal_data object.
        name: 'ABC',
        age: 19
      }).then(function(data) {
          console.log('data returned on modal close' + data);
        },
        function(data) {
          console.log('data returned on dismissal' + data);
        }
      );
    };
  }]);