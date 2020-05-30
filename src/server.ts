import ReactDOMServer from 'react-dom/server'
import * as Templates from './templates'
import * as Glacier from "./core/glacier";

export default async function run (event: any) {
  try {

    if ( ! process.env.GLACIER_JSON_URL) throw "Endereço do Storage de JSON não definido: GLACIER_JSON_URL"

    console.log('REQUEST PATH: ' + event.path);

    /**
     * Monta o PATH para busca o JSON no Storage
     */
    const storageJsonPath = `${process.env.GLACIER_JSON_URL}/${event.path}.json`

    /**
     * Busca o JSON no Storage
     */
    const res = await fetch(storageJsonPath)
    const content: any = await res.json()
    const type: string = content.type || 'post'

    /**
     * Se encontrar, Pega o template correto indicado no JSON
     * Seta o JSON como props do template
     */
    const reactPage = Templates.getTemplate(type, content)

    /**
     * Renderiza o React para HTML estático
     */
    const bodyHtml: string = ReactDOMServer.renderToStaticMarkup(reactPage)

    /**
     * Monta o PATH salvar o HTML no Storage
     */
    const storageHtmlPath: string = `${process.env.GLACIER_STATIC_VERSION}/${event.path}`

    /**
     * Salva o HTML no S3
     */
    Glacier.getGlacier('aws').upload(bodyHtml, storageHtmlPath)

    /**
     * Retorna a Response com o HTML estático
     */
    return {
      statusCode: 200,
      headers: {
        "cache-control": `max-age=${process.env.GLACIER_CACHE_SECONDS || 0}`,
        "content-type": "text/html; charset=UTF-8",
      },
      body: bodyHtml
    }

  } catch (error) {

    console.log('APP CATCH');
    // console.log(error);

    /**
     * REDIRECT 301
     * Salva um arquivo com o redirect no S3
     * Retorna o Response com o 301
     */

    /**
     * RESPONSE 404
     * Seta o cache para 1 mês
     * Retorna o Response com o 404
     */

  }

};
