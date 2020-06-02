const Post = require('./post')
const Page = require('./page')
const Page404 = require('./not-found')

exports.getTemplate = function (type) {
  const templateTypes = {
    post: Post,
    page: Page,
    notFound: Page404,
  }
  return templateTypes[type];
}
