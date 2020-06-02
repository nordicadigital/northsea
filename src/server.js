const ReactDOMServer = require('react-dom/server')
const Templates = require('./templates')
const Glacier = require('./core/glacier')

exports.run = async (event) => {
  try {

    if ( ! process.env.GLACIER_JSON_URL) throw "Endereço do Storage de JSON não definido: GLACIER_JSON_URL"

    console.log('REQUEST PATH: ' + event.path)

    /**
     * Monta o PATH para busca o JSON no Storage
     */
    const storageJsonPath = `${process.env.GLACIER_JSON_URL}${event.path}.json`

    /**
     * Busca o JSON no Storage
     */
    const res = await fetch(storageJsonPath)
    const content = await res.json()
    const type = content.type || 'post'

    /**
     * Se encontrar, Pega o template correto indicado no JSON
     * Seta o JSON como props do template
     */
    const template = Templates.getTemplate(type)
    const reactPage = template.render({ post: content })

    /**
     * Renderiza o React para HTML estático
     */
    const bodyHtml = ReactDOMServer.renderToStaticMarkup(reactPage)

    /**
     * Salva o HTML no S3
     */
    Glacier.getGlacier('aws').upload(bodyHtml, event.path)

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
    console.log(error);

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

}
