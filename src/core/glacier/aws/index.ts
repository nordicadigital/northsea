import IGlacier from '../IGlacier'
const aws = require('aws-sdk');

const GLACIER_BUCKET = process.env.GLACIER_BUCKET || 'static-html';
const GLACIER_CACHE_SECONDS = process.env.GLACIER_CACHE_SECONDS || 0;
const GLACIER_STATIC_VERSION = process.env.GLACIER_STATIC_VERSION || 'v1';

export default class AwsS3 implements IGlacier {

  async upload(body: string, filePathName: string, args?: any) {
    try {
      const s3 = new aws.S3({region: process.env.GLACIER_AWS_REGION || 'us-east-1'});

      if ( ! GLACIER_BUCKET) throw "Nenhum bucket foi definido";

      const params = {
        ACL: "public-read",
        Bucket: GLACIER_BUCKET,
        ContentType: "text/html; charset=utf-8",
        Key: `${GLACIER_STATIC_VERSION}/${filePathName || 'home'}`,
        Body: body,
        ...args
      };

      if (GLACIER_CACHE_SECONDS) {
        params.CacheControl = "max-age="+GLACIER_CACHE_SECONDS;
      }

      // console.log(params);
      await s3.putObject(params).promise();

    } catch (error) {
      console.log('GLACIER: AWS S3 CATCH');
      console.log(error);
    }
  }

}
