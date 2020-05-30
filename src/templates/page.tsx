type PageProps = {
  post: any
}

export default function Page({ post }: PageProps) {
  return (
    <>
      <h1 className="ui-title-1">{ post.title }</h1>
      <p className="ui-paraghaph" style={{ color: 'blue' }}>{ post.content }</p>
    </>
  )
}
