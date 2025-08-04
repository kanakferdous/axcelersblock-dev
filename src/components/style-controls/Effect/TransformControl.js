import { __ } from '@wordpress/i18n';
import { TextControl, PanelBody } from '@wordpress/components';

export default function TransformControl({ effect, updateDeviceEffect }) {
  const transform = effect.transform || { translateX: '', translateY: '', scaleX: '', scaleY: '', rotate: '', skewX: '', skewY: '' };

  const updateTransform = (key, value) => {
    updateDeviceEffect('transform', { ...transform, [key]: value });
  };

  return (
    <PanelBody
			className='effect-child-controls'
      title={__('Transform', 'axcelersblocks')}
      initialOpen={false}
    >
			<div className='two-columns'>
				<TextControl
					label={__('Translate X', 'axcelersblocks')}
					value={transform.translateX || ''}
					onChange={(value) => updateTransform('translateX', value)}
					placeholder="e.g., 10px"
				/>
				<TextControl
					label={__('Translate Y', 'axcelersblocks')}
					value={transform.translateY || ''}
					onChange={(value) => updateTransform('translateY', value)}
					placeholder="e.g., 10px"
				/>
			</div>
			<div className='two-columns'>
				<TextControl
					label={__('Scale X', 'axcelersblocks')}
					value={transform.scaleX || ''}
					onChange={(value) => updateTransform('scaleX', value)}
					placeholder="e.g., 1"
				/>
				<TextControl
					label={__('Scale Y', 'axcelersblocks')}
					value={transform.scaleY || ''}
					onChange={(value) => updateTransform('scaleY', value)}
					placeholder="e.g., 1"
				/>
			</div>
			<div className='two-columns'>
				<TextControl
					label={__('Rotate', 'axcelersblocks')}
					value={transform.rotate || ''}
					onChange={(value) => updateTransform('rotate', value)}
					placeholder="e.g., 45deg"
				/>
			</div>
			<div className='two-columns'>
				<TextControl
					label={__('Skew X', 'axcelersblocks')}
					value={transform.skewX || ''}
					onChange={(value) => updateTransform('skewX', value)}
					placeholder="e.g., 10deg"
				/>
				<TextControl
					label={__('Skew Y', 'axcelersblocks')}
					value={transform.skewY || ''}
					onChange={(value) => updateTransform('skewY', value)}
					placeholder="e.g., 10deg"
				/>
			</div>
    </PanelBody>
  );
}
