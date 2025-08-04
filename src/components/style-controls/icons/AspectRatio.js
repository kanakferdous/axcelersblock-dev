import { createElement } from '@wordpress/element';

export default function AspectRatio() {
	return createElement('svg', {
		width: '24',
		height: '24',
		xmlns: 'http://www.w3.org/2000/svg',
		viewBox: '0 0 24 24',
		fill: 'currentColor',
		dangerouslySetInnerHTML: {
			__html: '<path d="M7.95 22v-6.95H2v-2.1h5.95V5H6l3-3 3 3h-1.95v7.95H19V11l3 3-3 3v-1.95h-8.95V22h-2.1Z"></path>',
		},
	});
}
