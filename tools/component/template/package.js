export default (params) => `

{
  "name": "${params.name}",
  "version": "0.0.0",
  "private": true,
  "main": "./${params.name}.js"
}

`.trim();