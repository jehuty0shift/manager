export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('web-paas.details.service.edit-name', {
    url: '/edit-name',
    views: {
      modal: {
        component: 'webPaasDetailsServiceEditName',
      },
    },
    layout: 'modal',
    resolve: {
      goBack: /* @ngInject */ (goToProjectDetails) => goToProjectDetails,
      breadcrumb: () => null,
    },
  });
};
