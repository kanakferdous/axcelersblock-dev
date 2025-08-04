import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

const HeadingTag = ({ value, onChange }) => {
	return (
		<SelectControl
			value={value}
			options={[
				{ label: 'H1', value: 'h1' },
				{ label: 'H2', value: 'h2' },
				{ label: 'H3', value: 'h3' },
				{ label: 'H4', value: 'h4' },
				{ label: 'H5', value: 'h5' },
				{ label: 'H6', value: 'h6' },
			]}
			onChange={onChange}
		/>
	);
};

export default HeadingTag;
