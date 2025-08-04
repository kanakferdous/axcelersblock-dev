import { __ } from '@wordpress/i18n';
import { TextControl, SelectControl, PanelBody } from '@wordpress/components';

export default function TransitionControl({ effect, updateDeviceEffect }) {
  const transition = effect.transition || { property: '', duration: '', timingFunction: '', delay: '' };

  const updateTransition = (key, value) => {
    updateDeviceEffect('transition', { ...transition, [key]: value });
  };

  const timingFunctionOptions = [
    { label: __('Ease', 'axcelersblocks'), value: 'ease' },
    { label: __('Linear', 'axcelersblocks'), value: 'linear' },
    { label: __('Ease-In', 'axcelersblocks'), value: 'ease-in' },
    { label: __('Ease-Out', 'axcelersblocks'), value: 'ease-out' },
    { label: __('Ease-In-Out', 'axcelersblocks'), value: 'ease-in-out' },
  ];

  return (
    <PanelBody
			className='effect-child-controls'
      title={__('Transition', 'axcelersblocks')}
      initialOpen={false}
    >
			<div className='two-columns'>
				<TextControl
					label={__('Property', 'axcelersblocks')}
					value={transition.property || ''}
					onChange={(value) => updateTransition('property', value)}
					placeholder="e.g., all"
				/>
				<TextControl
					label={__('Duration', 'axcelersblocks')}
					value={transition.duration || ''}
					onChange={(value) => updateTransition('duration', value)}
					placeholder="e.g., 0.3s"
				/>
			</div>
			<div className='two-columns'>
				<SelectControl
					label={__('Timing', 'axcelersblocks')}
					value={transition.timingFunction || ''}
					options={timingFunctionOptions}
					onChange={(value) => updateTransition('timingFunction', value)}
				/>
				<TextControl
					label={__('Delay', 'axcelersblocks')}
					value={transition.delay || ''}
					onChange={(value) => updateTransition('delay', value)}
					placeholder="e.g., 0s"
				/>
			</div>
    </PanelBody>
  );
}
