// Copyright 2021 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview AngularHtmlBind Directive wrapper upgrade.
 * This is specifically for use in TranslationModalComponent. angular-html-bind
 * should not be used in migrated files unless strictly necessary.
 */

angular.module('oppia').directive('angularHtmlBindWrapper', [
  function() {
    return {
      restrict: 'E',
      scope: {},
      bindToController: {
        htmlData: '<',
        classStr: '<'
      },
      template:
        '<angular-html-bind class="<[$ctrl.classStr]>" ' +
        'html-data="$ctrl.htmlData"></angular-html-bind>',
      controllerAs: '$ctrl',
      controller: [
        '$rootScope',
        function($rootScope) {
          var ctrl = this;
          ctrl.$onInit = function() {
            $rootScope.$applyAsync();
          };
        }
      ]
    };
  }
]);

import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
// Allow $scope to be provided to parent Component.
export const ScopeProvider = {
  deps: ['$injector'],
  provide: '$scope',
  useFactory: (injector: Injector): void => injector.get('$rootScope').$new(),
};
@Directive({
  selector: 'angular-html-bind-wrapper',
  providers: [ScopeProvider],
})
export class AngularHtmlBindWrapperDirective extends UpgradeComponent {
  @Input() htmlData: string;
  @Input() classStr = '';
  constructor(elementRef: ElementRef, injector: Injector) {
    super('angularHtmlBindWrapper', elementRef, injector);
  }
}
