import { LABELS } from '../constants';

export default class OvhManagerNetappVrackConfigurationCtrl {
  /* @ngInject */
  constructor(
    $translate,
    $window,
    Alerter,
    coreConfig,
    NetAppDashboardService,
    NetappVrackConfigurationService,
  ) {
    this.$translate = $translate;
    this.Alerter = Alerter;
    this.NetAppDashboardService = NetAppDashboardService;
    this.NetappVrackConfigurationService = NetappVrackConfigurationService;
    this.LABELS = LABELS;
    this.$window = $window;
    this.user = coreConfig.getUser();
  }

  $onInit() {
    if (!this.availableVracks.length) {
      const noVrack = {
        vrack: {
          internalName: this.$translate.instant(
            'netapp_vrack_configuration_no_vrack_field',
          ),
        },
      };
      this.availableVracks.push(noVrack);
      this.selectedVrack = noVrack;
      this.disableVrackField = true;
    }
  }

  goToVrackOrder(event) {
    event.preventDefault();
    this.trackClick('add-vrack');
    this.$window.open(
      this.NetAppDashboardService.constructor.getVrackOrderUrl(
        this.user.ovhSubsidiary,
      ),
      '_blank',
    );
  }

  linkVrack() {
    this.trackClick('confirm');

    this.NetappVrackConfigurationService.linkVrackToVrackServices(
      this.selectedVrack.vrack.internalName,
      this.networkInformations.vRackServicesId,
    )
      .then(() => {
        this.trackPage('success');
        this.goBack().then(() => {
          this.Alerter.success(
            this.$translate.instant(
              'netapp_vrack_configuration_success_message',
            ),
          );
        });
      })
      .catch((error) => {
        this.trackPage('error');
        this.goBack().then(() => {
          this.Alerter.error(
            `${this.$translate.instant(
              'netapp_vrack_configuration_vrack_association_warning',
            )} <br> ${error?.data?.message ||
              error.message} <br> request_id: ${error.headers(
              'X-Ovh-Queryid',
            )}`,
          );
        });
      });
  }
}
