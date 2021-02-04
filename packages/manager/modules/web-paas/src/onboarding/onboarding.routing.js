export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('web-paas.onboarding', {
    url: '/onboarding',
    component: 'webPaasOnboarding',
    // redirectTo: (transition) =>
    //   transition
    //     .injector()
    //     .getAsync('projects')
    //     .then((projects) =>
    //       projects.length > 0
    //         ? { state: 'web-paas' }
    //         : false,
    //     ),
    resolve: {
      breadcrumb: () => null, // Hide breadcrumb
    },
  });
};
