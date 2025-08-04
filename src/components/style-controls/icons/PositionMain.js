import { createElement } from '@wordpress/element';

export default function PositionMain() {
  return createElement('svg', {
    width: '24',
    height: '24',
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    dangerouslySetInnerHTML: {
      __html: '<path d="m14.879 16.293 1.414 1.415L12 22l-4.293-4.292 1.415-1.415L12 19.172l2.879-2.879ZM6.293 7.708l1.414 1.414L4.829 12l2.878 2.879-1.414 1.414L2 12l4.293-4.292ZM22 12l-4.293 4.293-1.414-1.414L19.172 12l-2.879-2.878 1.414-1.414L22 12Zm-5.707-5.707-1.414 1.415L12 4.829 9.122 7.708 7.707 6.293 12 2l4.293 4.293ZM14.879 12.05l-2.829 2.829-2.928-2.928 2.829-2.829 2.928 2.928Zm-2.929-.099.099.099-.099-.099Z"></path>',
    },
  });
}
