import controller from './controller';
import template from './template.html';

export default {
  bindings: {
    domains: '<',
    goBack: '<',
    title: '<',
  },
  controller,
  template,
};
