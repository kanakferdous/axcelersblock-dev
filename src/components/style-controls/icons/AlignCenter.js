import { createElement } from '@wordpress/element';

export default function AlignCenter() {
  return createElement('svg', {
    width: '16',
    height: '16',
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 16 16',
    dangerouslySetInnerHTML: {
      __html: '<path fill="currentColor" stroke="currentColor" d="M3.5 3.5h3v8h-3zm5 1h3v6h-3z"></path><path fill="currentColor" d="M0 7h16v1H0z"></path>',
    },
  });
}
