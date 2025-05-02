export const formatSvgToJsx = (svg) => {
  return svg
    .replace(/class=/g, 'className=')
    .replace(/([a-zA-Z-]+)=/g, (match, attr) => {
      const camelAttr = attr.replace(/-([a-z])/g, (_, letter) =>
        letter.toUpperCase(),
      );
      return `${camelAttr}=`;
    })
    .replace(/<([a-z]+)([^>]*?)\/?>/g, (match, tagName, attrs) => {
      const isSelfClosing =
        /\/>$/.test(match) ||
        [
          'path',
          'circle',
          'rect',
          'line',
          'polyline',
          'polygon',
          'stop',
          'use',
        ].includes(tagName);
      return `<${tagName}${attrs}${isSelfClosing ? ' /' : ''}>`;
    });
};
