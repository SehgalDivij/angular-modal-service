### AngularPopupService

A basic Popup Service for common use cases like: Confirm an action, show an alert to a user, show error to user etc.

This example is loosely based around the code present in [this](https://weblogs.asp.net/dwahlin/building-an-angularjs-modal-service) post by Dan Wahlin.

Check out Plunkr for this [here](https://embed.plnkr.co/cIbZCKyIwlIrZhHCoIkb/).

### Dependencies - Angular-ui base dependencies: 

1. [Angular Core](https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.8/angular.min.js)
2. [Angular Touch](https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.8/angular-touch.min.js)
3. [Angular Animate](https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.8/angular-animate.min.js)
4. [Angular Sanitize](https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.8/angular-sanitize.min.js) (Might sometimes be needed.)
5. [ui-bootstrap](https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.min.js)(I used tpls-min, since templates are included within this version)
6. [bootstrap css](https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css)

### Why make a service

Came across a situation where I needed a lot of popups to be delayed for redundant data.
Thus, code for these popups became redundant.

This is how I ended up refactoring modals into a service.

### Usage

Create a Service in your application: `Popup`.
Supply default configuration in the form of two constants: 

1. `$MODAL_CONFIG_DEFAULTS`
2. `$MODAL_DATA_DEFAULTS`

Declare constants on the AngularjS application as follows:

      angular.module('YourApp)
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
            // these fields are used to show data within the popup and decide which modal is to be shown - confirm/error/alert.
            title: 'Alert Title',
            body: 'Alert Message',
            close_label: 'OK',
            cancel_label: 'Cancel',
            is_confirm: false,
            is_error: false,
            is_alert: false
          });

1. `$MODAL_CONFIG_DEFAULTS`:

  The configuration parameters for this is the same as those for ui-bootstrap-modal, but need to be supplied differently. This contains the configuration data for the modal - same as the parameters present on angular-ui's project page.

  These are parameters like: animation, keyboard, template, templateUrl, controller, controllerAs, resolve etc.

2. `$MODAL_DATA_DEFAULTS:`

  These are custom parameters such as title, body, close_label, is_confirm, is_error, is_alert etc.
  
  Their description is as follows:
  
  1. **title**: String. Title for the popup. If no title is to be set, set this property to null. This must be set. `Default: Alert Title`
  2. **body**: String. Message body to be displayed. This must be set. `Default: Alert Body`
  3. **close_label**: String. The label to be shown on the popup positive close. `Default: OK`
  4. **cancel_label**: String. The label to be shown on the popup negative close. `Default: Cancel`
  5. **is_confirm**: boolean. Set this to true, if this is an `action confirmation` popup. Setting this to true overrides `is_error` and `is_alert`. `Default: false`
  6. **is_error**: boolean. Set this to true, if this is an error popup. This is overriden if `is_confirm` is `true`. Setting this to true overrides `is_alert`. `Default: false`
  7. **is_alert**: boolean. Set this to true, if this is a confirmation popup. This is overriden if `is_error` or `is_confirm` is `true`. `Default: false`

Besides these more can be added to this object to pass data to the controller via the `modal_data` attribute. See `source`. Examples below.

### Create Alert

  `is_alert` must be set to `true`.

    Popup.show({}, {
      title: null, // or put a title here.
      body: 'Hi. This is an alert.',
      is_alert: true,
      close_label: 'OK'
    });

### Create Error Message

  `is_error` must be set to `true`.

    Popup.show({}, {
      title: 'Error Title',
      body: 'An error occurred. Please try again later.',
      is_error: true,
      close_label: 'OK'
    });

### Create Confirmation Box

  `is_confirm` must be set to `true`.

      Popup.show({
        // this controller will override the controller default implementation of the controller present in the service.
        controller: ['$scope', '$uibModalInstance', 'modal_data', function($scope, $uibModalInstance, modal_data) {
          var $ctrl = this;
          $ctrl.data = modal_data;
          $ctrl.data.close = function() {
            $uibModalInstance.close('random data');
          };
          $ctrl.data.cancel = function() {
            $uibModalInstance.dismiss('random data');
          };
          // accessing data passed in modal_data object.
          console.log('Accessing Modal Data - Name:' + modal_data.name + ' Age: ' + modal_data.age);
        }]
      }, {
        title: 'Title for confirmation.',
        body: 'Confirm this action?',
        close_label: 'Yes',
        cancel_label: 'No',
        is_confirm: true,
        // passing custom data - following two fields will be passed separately and will be accessible within the `modal_data` object.
        name: 'ABC',
        age: 19
      }).then(function(data) {
          // when modal close() is called.
          console.log('data returned on modal close' + data);
        },
        function(data) {
          // when modal - dismiss() is called.
          console.log('data returned on dismissal' + data);
        }
      );