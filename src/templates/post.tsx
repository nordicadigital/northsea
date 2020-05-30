type PostProps = {
  post: any
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <h1 className="ui-title-1">{ post.title }</h1>
      <p className="ui-paraghaph" style={{ color: 'blue' }}>{ post.content }</p>
    </>
  )
}
