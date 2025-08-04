import { createElement } from '@wordpress/element';

export default function EffectsMain() {
	return createElement('svg', {
		width: '24',
		height: '24',
		xmlns: 'http://www.w3.org/2000/svg',
		viewBox: '0 0 24 24',
		fill: 'currentColor',
		dangerouslySetInnerHTML: {
			__html: '<path d="M14.694 9.306 21.976 12l-7.282 2.694L12 21.976l-2.694-7.282L2.024 12l7.282-2.694L12 2.024l2.694 7.282Zm-3.832 1.556L7.787 12l3.075 1.138L12 16.213l1.138-3.075L16.213 12l-3.075-1.138L12 7.787l-1.138 3.075Z"></path><path d="m18.746 3.024.81 2.19 2.19.81-2.19.81-.81 2.19-.81-2.19-2.19-.81 2.19-.81.81-2.19ZM18.746 14.976l.81 2.19 2.19.81-2.19.81-.81 2.19-.81-2.19-2.19-.81 2.19-.81.81-2.19Z"></path>',
		},
	});
}
