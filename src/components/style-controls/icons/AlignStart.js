import { createElement } from '@wordpress/element';

export default function AlignStart() {
  return createElement('svg', {
    width: '16',
    height: '16',
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 16 16',
    dangerouslySetInnerHTML: {
      __html: '<path fill="currentColor" d="M0 0h16v1H0z"></path><path fill="currentColor" stroke="currentColor" d="M3.5 2.5h3v7h-3zm5 0h3v5h-3z"></path>',
    },
  });
}
