import { createElement } from '@wordpress/element';

export default function BorderMain() {
  return createElement('svg', {
    width: '24',
    height: '24',
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    dangerouslySetInnerHTML: {
      __html: '<path d="M2 6.036v-4.03c4.298 0 8.596-.026 12.893.001 3.746.071 7.083 3.41 7.107 7.199v12.8h-4.03v-2H20c0-3.645.067-7.29-.002-10.935-.084-2.665-2.439-5.013-5.13-5.064-3.618-.023-7.235-.001-10.852-.001H4v2.03H2Z"></path><path d="M4 10.036v-2H2v2h2ZM4 14.036v-2H2v2h2ZM4 18.031v-2H2v2h2ZM4 22.006v-2H2v2h2Z"></path><path d="M2 20.006h2v2H2zM6 20.006h2v2H6zM10 20.006h2v2h-2zM13.996 20.006h2v2h-2z"></path>',
    },
  });
}
