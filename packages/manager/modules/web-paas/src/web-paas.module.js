import angular from 'angular';
import '@uirouter/angularjs';
import 'angular-translate';
import '@ovh-ux/ng-translate-async-loader';
import '@ovh-ux/ng-ovh-cloud-universe-components';
import '@ovh-ux/ui-kit';

import add from './add';
import component from './web-paas.component';
import details from './details';
import onboarding from './onboarding';
import routing from './web-paas.routing';
import service from './web-paas.service';
import terminateProject from './terminate';
import projectStatus from './components/project-status';

const moduleName = 'ovhManagerWebPaas';

angular
  .module(moduleName, [
    onboarding,
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
    'ngOvhCloudUniverseComponents',
    'oui',
    'ui.router',
    details,
    terminateProject,
    add,
    projectStatus,
  ])
  .config(routing)
  .component('webPaas', component)
  .service('WebPaas', service)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
