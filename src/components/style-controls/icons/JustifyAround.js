import { createElement } from '@wordpress/element';

export default function JustifyAround() {
  return createElement('svg', {
    width: '16',
    height: '16',
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 16 16',
    dangerouslySetInnerHTML: {
      __html: '<path fill="currentColor" d="M15 0h1v16h-1zM0 0h1v16H0z"></path><path fill="currentColor" stroke="currentColor" d="M9.5 4.5h3v7h-3zm-6 0h3v7h-3z"></path>',
    },
  });
}
