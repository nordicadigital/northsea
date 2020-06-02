const Post = require('./post')
const Page = require('./page')

exports.getTemplate = function (type) {
  const templateTypes = {
    post: Post,
    page: Page,
  }
  return templateTypes[type];
}
