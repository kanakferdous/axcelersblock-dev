import { __ } from '@wordpress/i18n';
import { PanelBody, Button } from '@wordpress/components';
import { useDevice } from '../../controls/DeviceContext';
import BoxShadowControl from './BoxShadowControl';
import TransitionControl from './TransitionControl';
import FilterControl from './FilterControl';
import TextShadowControl from './TextShadowControl';
import TransformControl from './TransformControl';
import EffectsMain from '../icons/EffectsMain';
import { TextControl, SelectControl } from '@wordpress/components';

export default function EffectControl({ attributes, setAttributes }) {
  const { activeDevice } = useDevice();

  // Initialize device-specific attributes with defaults
  const effect = attributes.effect || {
    desktop: {
      boxShadow: { xOffset: '', yOffset: '', blurRadius: '', spreadRadius: '', color: '', inset: false },
      transition: { property: '', duration: '', timingFunction: '', delay: '' },
      filter: { blur: '', brightness: '', contrast: '', grayscale: '', hueRotate: '', invert: '', opacity: '', saturate: '', sepia: '' },
      textShadow: { xOffset: '', yOffset: '', blurRadius: '', color: '' },
      transform: { translateX: '', translateY: '', scaleX: '', scaleY: '', rotate: '', skewX: '', skewY: '' },
      opacity: '',
      visibility: '',
    },
    tablet: {
      boxShadow: { xOffset: '', yOffset: '', blurRadius: '', spreadRadius: '', color: '', inset: false },
      transition: { property: '', duration: '', timingFunction: '', delay: '' },
      filter: { blur: '', brightness: '', contrast: '', grayscale: '', hueRotate: '', invert: '', opacity: '', saturate: '', sepia: '' },
      textShadow: { xOffset: '', yOffset: '', blurRadius: '', color: '' },
      transform: { translateX: '', translateY: '', scaleX: '', scaleY: '', rotate: '', skewX: '', skewY: '' },
      opacity: '',
      visibility: '',
    },
    mobile: {
      boxShadow: { xOffset: '', yOffset: '', blurRadius: '', spreadRadius: '', color: '', inset: false },
      transition: { property: '', duration: '', timingFunction: '', delay: '' },
      filter: { blur: '', brightness: '', contrast: '', grayscale: '', hueRotate: '', invert: '', opacity: '', saturate: '', sepia: '' },
      textShadow: { xOffset: '', yOffset: '', blurRadius: '', color: '' },
      transform: { translateX: '', translateY: '', scaleX: '', scaleY: '', rotate: '', skewX: '', skewY: '' },
      opacity: '',
      visibility: '',
    },
  };

  // Helper function to update device-specific attributes
  const updateDeviceEffect = (key, value) => {
    const newEffect = {
      ...effect[activeDevice],
      [key]: value,
    };
    setAttributes({
      effect: {
        ...effect,
        [activeDevice]: newEffect,
      },
    });
  };

	// Reset function to restore default values for the current device
	const resetEffect = () => {
		const defaultEffect = {
			boxShadow: { xOffset: '', yOffset: '', blurRadius: '', spreadRadius: '', color: '', inset: false },
			transition: { property: '', duration: '', timingFunction: '', delay: '' },
			filter: { blur: '', brightness: '', contrast: '', grayscale: '', hueRotate: '', invert: '', opacity: '', saturate: '', sepia: '' },
			textShadow: { xOffset: '', yOffset: '', blurRadius: '', color: '' },
			transform: { translateX: '', translateY: '', scaleX: '', scaleY: '', rotate: '', skewX: '', skewY: '' },
			opacity: '',
			visibility: '',
		};
		setAttributes({
			effect: {
				...effect,
				[activeDevice]: defaultEffect,
			},
		});
	};

  // Visibility options
  const visibilityOptions = [
    { label: __('Visible', 'axcelersblocks'), value: 'visible' },
    { label: __('Hidden', 'axcelersblocks'), value: 'hidden' },
    { label: __('Collapse', 'axcelersblocks'), value: 'collapse' },
  ];

  return (
    <PanelBody
      className="effect-controls-wrapper"
			title={
				<span className="title">
					<EffectsMain />
					{__('Effects', 'axcelersblocks')}
				</span>
			}
      initialOpen={false}
    >
      <BoxShadowControl
        effect={effect[activeDevice]}
        updateDeviceEffect={updateDeviceEffect}
      />
      <TransitionControl
        effect={effect[activeDevice]}
        updateDeviceEffect={updateDeviceEffect}
      />
      <FilterControl
        effect={effect[activeDevice]}
        updateDeviceEffect={updateDeviceEffect}
      />
      <TextShadowControl
        effect={effect[activeDevice]}
        updateDeviceEffect={updateDeviceEffect}
      />
      <TransformControl
        effect={effect[activeDevice]}
        updateDeviceEffect={updateDeviceEffect}
      />

      {/* Opacity */}
      <TextControl
				className='effect-opacity-control'
        label={__('Opacity', 'axcelersblocks')}
        value={effect[activeDevice].opacity || ''}
        onChange={(value) => updateDeviceEffect('opacity', value)}
        placeholder="e.g., 0.5"
      />

      {/* Visibility */}
      <SelectControl
				className='effect-visibility-control'
        label={__('Visibility', 'axcelersblocks')}
        value={effect[activeDevice].visibility || ''}
        options={visibilityOptions}
        onChange={(value) => updateDeviceEffect('visibility', value)}
      />

			{/* Reset Button */}
			<Button
				className='reset-btn'
        onClick={resetEffect}
				showTooltip={true}
				label={__('Reset', 'axcelersblocks')}
      >
        {__('Reset', 'axcelersblocks')}
      </Button>
    </PanelBody>
  );
}
