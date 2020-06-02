exports.getGlacier = function (name) {
  const glacierTypes = {
    aws: require('./aws'),
    // 'gcp': require('./gcp'),
    // 'azure': require('./azure'),
    // 'digitalocean': require('./digitalocen'),
  }
  return glacierTypes[name];
}
