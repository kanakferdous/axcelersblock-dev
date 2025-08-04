import { createElement } from '@wordpress/element';

export default function TextOverline() {
  return createElement('svg', {
    width: '24',
    height: '24',
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    dangerouslySetInnerHTML: {
      __html: '<path d="M7 4v1h10V4H7zm5 14c1.5 0 2.6-.4 3.4-1.2.8-.8 1.1-2 1.1-3.5V7H15v5.8c0 1.2-.2 2.1-.6 2.8-.4.7-1.2 1-2.4 1s-2-.3-2.4-1c-.4-.7-.6-1.6-.6-2.8V7H7.5v6.2c0 1.5.4 2.7 1.1 3.5.8.9 1.9 1.3 3.4 1.3z"></path>',
    },
  });
}
