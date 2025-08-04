import { __ } from '@wordpress/i18n';
import { BaseControl, Notice } from '@wordpress/components';
import { GradientPicker } from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function GradientLayerControls({ layer, onUpdate }) {
  const { gradient = '' } = layer;

  // State to track rendering errors and error messages
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Ensure the gradient value is a string or null
  const currentGradient = typeof gradient === 'string' && gradient.trim() !== '' ? gradient : null;

  // Handle gradient change
  const onGradientChange = (value) => {
    try {
      console.log('Gradient changed to:', value);
      onUpdate({ ...layer, gradient: value || '' });
      setHasError(false);
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating gradient:', error);
      setHasError(true);
      setErrorMessage(error.message || 'Unknown error occurred while updating gradient.');
    }
  };

  return (
    <div className="background-layer-controls">
      {hasError && (
        <Notice status="error" isDismissible={false}>
          {errorMessage || __('An error occurred while rendering the gradient picker. Please try again.', 'axcelersblocks')}
        </Notice>
      )}
      <BaseControl
        label={__('Background Gradient', 'axcelersblocks')}
        className="background-gradient-picker"
      >
        <GradientPicker
          value={currentGradient}
          onChange={onGradientChange}
          clearable={true}
          disableCustomGradients={false}
          enableAlpha={true}
          __nextHasNoMargin
        />
      </BaseControl>
      <p className="gradient-note">
        {__('Note: Gradients may include alpha (opacity) values, which your block must support.', 'axcelersblocks')}
      </p>
    </div>
  );
}
