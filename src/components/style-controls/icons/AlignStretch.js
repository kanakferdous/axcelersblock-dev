import { createElement } from '@wordpress/element';

export default function AlignStretch() {
  return createElement('svg', {
    width: '16',
    height: '16',
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 16 16',
    fill: 'currentColor',
    dangerouslySetInnerHTML: {
      __html: '<path fill="currentColor" d="M0 0h16v1H0zm0 15h16v1H0z"></path><path fill="currentColor" stroke="currentColor" d="M3.5 2.5h3v11h-3zm5 0h3v11h-3z"></path>',
    },
  });
}
