const React = require('react')

exports.render = function ({ post }) {
  console.log(post);
  return (
    <>
      <h1 className="ui-title-1">{ post.title.rendered }</h1>
      <div className="ui-paraghaph" style={{ color: 'blue' }} dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </>
  )
}
