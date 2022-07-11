const _interopRequireDefault = obj =>
  obj && obj.__esModule ? obj : { default: obj }

const { default: _react } = _interopRequireDefault(require('react'))

const capitalize = str => `${str[0].toUpperCase()}${str.slice(1)}`
const formatFont = font =>
  font
    .split(' ')
    .map(capitalize)
    .join(' ')
const formatFonts = fonts =>
  fonts
    .map(formatFont)
    .join('|')
    .replace(/ /g, '+')

exports.onRenderBody = (
  { setHeadComponents },
  { fonts = [], display, preconnect, attributes = {} }
) => {
  if (
    !Array.isArray(fonts) ||
    !fonts.length ||
    fonts.some(f => typeof f !== 'string')
  ) {
    throw new Error(
      `'fonts' option is a required option and must be an array of strings`
    )
  }

  let href = `https://fonts.googleapis.com/css?family=${formatFonts(fonts)}`
  if (display) href += `&display=${display}`

  const components = [
    _react.createElement('link', {
      key: 'fonts',
      crossOrigin: preconnect ? 'anonymous' : undefined,
      rel: 'stylesheet',
      ...attributes,
      href,
      type: 'text/css',
    }),
  ]
  if (preconnect)
    components.unshift(
      _react.createElement('link', {
        key: 'google-fonts-preconnect',
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com/',
        crossOrigin: 'anonymous',
      })
    )

  setHeadComponents(components)
}
