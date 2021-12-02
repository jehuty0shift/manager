export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('netapp.dashboard.volumes.dashboard.snapshots.edit', {
    url: '/:snapshotId/edit',
    views: {
      modal: {
        component: 'ovhManagerNetAppVolumesDashboardSnapshotsEdit',
      },
    },
    layout: 'modal',
    resolve: {
      breadcrumb: /* @ngInject */ () => null,
      snapshotId: /* @ngInject */ ($transition$) =>
        $transition$.params().snapshotId,
      snapshot: /* @ngInject */ (snapshots, snapshotId) =>
        snapshots.find(({ id }) => id === snapshotId),
    },
  });
};
