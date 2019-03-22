const renderHtmlTemplate = require('./html-template')

function render (metadata, routingStack, options) {
  return renderHtmlTemplate(metadata, renderRoutes(routingStack, options))
}

function renderRoutes (routingStack, options) {
  const content = routingStack
    .map(stackItem => createRouteDescription(stackItem))
    .reduce((allDescriptions, description) => mergeIntoDescriptions(description, allDescriptions), [])
    .map(description => `<li>${renderRouteDescription(description, options)}</li>`)
    .join('')

  return `
    <ul>
      ${content}
    </ul>
  `.trim()
}

function createRouteDescription (layer) {
  // TODO: Support sub-routers

  const { methods, path } = layer

  return {
    methods,
    path
  }
}

function mergeIntoDescriptions (description, allDescriptions) {
  const prevDescription = allDescriptions.find(desc => desc.path === description.path)

  if (prevDescription) {
    Object.assign(prevDescription, {
      methods: prevDescription.methods.concat(description.methods)
    })
    return allDescriptions
  } else {
    return allDescriptions.concat([ description ])
  }
}

function renderRouteDescription (description, options) {
  const { methods, path } = description
  const { excludeMethods = [] } = options
  const methodsToBeDisplayed = methods.filter(exclude(excludeMethods))
  return `
    <div class="route-methods">${methodsToBeDisplayed.join('&nbsp;|&nbsp;')}</div>
    <div><a href="${path}">${path}</a></div>
  `
}

function exclude (itemsNotToMatch) {
  return item => itemsNotToMatch.indexOf(item) === -1
}

module.exports = render
