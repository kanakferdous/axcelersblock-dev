import { createElement } from '@wordpress/element';

export default function JustifyCenter() {
  return createElement('svg', {
    width: '16',
    height: '16',
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 16 16',
    dangerouslySetInnerHTML: {
      __html: '<path fill="currentColor" stroke="currentColor" d="M2.5 4.5h3v7h-3zm7 0h3v7h-3z"></path><path fill="currentColor" d="M7 0h1v16H7z"></path>',
    },
  });
}
