const renderHtmlTemplate = (metadata, routesHtml) => `
<!doctype html>
<html>
  <head>
    <title>${metadata.name}</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.3.0/milligram.min.css">
    <style>
      body {
        margin: 30px 60px;
      }
      ul {
        list-style-type: none;
      }
      .route-methods {
        font-size: 75%;
      }
    </style>
  </head>
  <body>
    ${metadata.name ? `<h1>${metadata.name}</h1>` : ''}
    ${metadata.description ? `<p>${metadata.description}</p>` : ''}
    <h2>Routes</h2>
    ${routesHtml}
  </body>
</html>
`.trim()

module.exports = renderHtmlTemplate
