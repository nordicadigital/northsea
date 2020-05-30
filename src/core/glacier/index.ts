import AwsS3 from "./aws"
import IGlacier from './IGlacier'

interface IGlacierTypes {
  aws: IGlacier,
}

export function getGlacier (name: string): IGlacier {
  const glacierTypes: IGlacierTypes = {
    aws: new AwsS3,
    // 'gcp': require('./gcp'),
    // 'azure': require('./azure'),
    // 'digitalocean': require('./digitalocen'),
  }
  return glacierTypes[name as keyof IGlacierTypes];
}
