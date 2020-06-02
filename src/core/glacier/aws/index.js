const aws = require('aws-sdk');

const GLACIER_HTML_BUCKET = process.env.GLACIER_HTML_BUCKET || 'static-html';
const GLACIER_HTML_VERSION = process.env.GLACIER_HTML_VERSION || 'v1';
const GLACIER_CACHE_SECONDS = process.env.GLACIER_CACHE_SECONDS || 0;

exports.upload = async (body, filePathName, args) => {
  try {
    const s3 = new aws.S3({region: process.env.GLACIER_AWS_REGION || 'us-east-1'});

    if ( ! GLACIER_HTML_BUCKET) throw "Nenhum bucket foi definido";

    const params = {
      ACL: "public-read",
      Bucket: GLACIER_HTML_BUCKET,
      ContentType: "text/html; charset=utf-8",
      Key: `${GLACIER_HTML_VERSION}${filePathName || 'home'}`,
      Body: body,
      ...args
    };

    if (GLACIER_CACHE_SECONDS) {
      params.CacheControl = `max-age=${GLACIER_CACHE_SECONDS}`;
    }

    // console.log(params);
    await s3.putObject(params).promise();

  } catch (error) {
    console.log('GLACIER: AWS S3 CATCH');
    console.log(error);
  }
}
