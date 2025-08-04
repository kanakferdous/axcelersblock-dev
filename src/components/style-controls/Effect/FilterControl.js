import { __ } from '@wordpress/i18n';
import { TextControl, PanelBody } from '@wordpress/components';

export default function FilterControl({ effect, updateDeviceEffect }) {
  const filter = effect.filter || { blur: '', brightness: '', contrast: '', grayscale: '', hueRotate: '', invert: '', opacity: '', saturate: '', sepia: '' };

  const updateFilter = (key, value) => {
    updateDeviceEffect('filter', { ...filter, [key]: value });
  };

  return (
    <PanelBody
			className='effect-child-controls'
      title={__('Filter', 'axcelersblocks')}
      initialOpen={false}
    >
			<div className='two-columns'>
				<TextControl
					label={__('Blur', 'axcelersblocks')}
					value={filter.blur || ''}
					onChange={(value) => updateFilter('blur', value)}
					placeholder="e.g., 5px"
				/>
				<TextControl
					label={__('Brightness', 'axcelersblocks')}
					value={filter.brightness || ''}
					onChange={(value) => updateFilter('brightness', value)}
					placeholder="e.g., 100%"
				/>
			</div>
			<div className='two-columns'>
				<TextControl
					label={__('Contrast', 'axcelersblocks')}
					value={filter.contrast || ''}
					onChange={(value) => updateFilter('contrast', value)}
					placeholder="e.g., 100%"
				/>
				<TextControl
					label={__('Grayscale', 'axcelersblocks')}
					value={filter.grayscale || ''}
					onChange={(value) => updateFilter('grayscale', value)}
					placeholder="e.g., 0%"
				/>
			</div>
			<div className='two-columns'>
				<TextControl
					label={__('Hue Rotate', 'axcelersblocks')}
					value={filter.hueRotate || ''}
					onChange={(value) => updateFilter('hueRotate', value)}
					placeholder="e.g., 0deg"
				/>
				<TextControl
					label={__('Invert', 'axcelersblocks')}
					value={filter.invert || ''}
					onChange={(value) => updateFilter('invert', value)}
					placeholder="e.g., 0%"
				/>
			</div>
			<div className='two-columns'>
				<TextControl
					label={__('Opacity', 'axcelersblocks')}
					value={filter.opacity || ''}
					onChange={(value) => updateFilter('opacity', value)}
					placeholder="e.g., 100%"
				/>
				<TextControl
					label={__('Saturate', 'axcelersblocks')}
					value={filter.saturate || ''}
					onChange={(value) => updateFilter('saturate', value)}
					placeholder="e.g., 100%"
				/>
			</div>
			<div className='two-columns'>
				<TextControl
					label={__('Sepia', 'axcelersblocks')}
					value={filter.sepia || ''}
					onChange={(value) => updateFilter('sepia', value)}
					placeholder="e.g., 0%"
				/>
			</div>
    </PanelBody>
  );
}
