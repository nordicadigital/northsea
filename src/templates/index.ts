import Post from './post'
import Page from './page'

interface ITemplateTypes {
  post: JSX.Element,
  page: JSX.Element,
}

function getTemplate(type: string, props: any): JSX.Element {
  const templateTypes: ITemplateTypes = {
    post: Post(props),
    page: Page(props),
  }
  return templateTypes[type as keyof ITemplateTypes];
}

export {
  getTemplate,
  Post,
  Page,
}
