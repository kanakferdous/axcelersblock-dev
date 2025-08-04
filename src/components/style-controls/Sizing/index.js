import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl, Button } from '@wordpress/components';
import AspectRatio from '../icons/AspectRatio';
import { useDevice } from '../../controls/DeviceContext';

export default function SizingControl({ attributes, setAttributes }) {
  const { activeDevice } = useDevice();

  const width = attributes.width || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const height = attributes.height || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const minWidth = attributes.minWidth || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const minHeight = attributes.minHeight || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const maxWidth = attributes.maxWidth || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const maxHeight = attributes.maxHeight || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const aspectRatio = attributes.aspectRatio || {
    desktop: '',
    tablet: '',
    mobile: '',
  };

  // Helper function to update device-specific attributes
  const updateDeviceAttribute = (attribute, value) => {
    setAttributes({
      [attribute]: {
        ...attributes[attribute],
        [activeDevice]: value,
      },
    });
  };

  // Reset all sizing attributes for the active device
  const resetSizing = () => {
    setAttributes({
      width: {
        ...attributes.width,
        [activeDevice]: '',
      },
      height: {
        ...attributes.height,
        [activeDevice]: '',
      },
      minWidth: {
        ...attributes.minWidth,
        [activeDevice]: '',
      },
      minHeight: {
        ...attributes.minHeight,
        [activeDevice]: '',
      },
      maxWidth: {
        ...attributes.maxWidth,
        [activeDevice]: '',
      },
      maxHeight: {
        ...attributes.maxHeight,
        [activeDevice]: '',
      },
      aspectRatio: {
        ...attributes.aspectRatio,
        [activeDevice]: '',
      },
    });
  };

  return (
    <PanelBody
      className="sizing-controls-wrapper"
      title={
        <span className='title'>
          {<AspectRatio />}
          {__('Sizing', 'axcelersblocks')}
        </span>
      }
      initialOpen={false}
    >
      <div className='two-columns-layout'>
        {/* Width */}
        <TextControl
          label={__('Width', 'axcelersblocks')}
          value={width[activeDevice] || ''}
          onChange={(value) => updateDeviceAttribute('width', value)}
          placeholder="e.g., 100px, 50%, auto"
          className="sizing-control__width"
        />

        {/* Height */}
        <TextControl
          label={__('Height', 'axcelersblocks')}
          value={height[activeDevice] || ''}
          onChange={(value) => updateDeviceAttribute('height', value)}
          placeholder="e.g., 100px, 50%, auto"
          className="sizing-control__height"
        />
      </div>

      <div className='two-columns-layout'>
        {/* Min Width */}
        <TextControl
          label={__('Min Width', 'axcelersblocks')}
          value={minWidth[activeDevice] || ''}
          onChange={(value) => updateDeviceAttribute('minWidth', value)}
          placeholder="e.g., 200px, 20%"
          className="sizing-control__min-width"
        />

        {/* Min Height */}
        <TextControl
          label={__('Min Height', 'axcelersblocks')}
          value={minHeight[activeDevice] || ''}
          onChange={(value) => updateDeviceAttribute('minHeight', value)}
          placeholder="e.g., 200px, 20%"
          className="sizing-control__min-height"
        />
      </div>

      <div className='two-columns-layout'>
        {/* Max Width */}
        <TextControl
          label={__('Max Width', 'axcelersblocks')}
          value={maxWidth[activeDevice] || ''}
          onChange={(value) => updateDeviceAttribute('maxWidth', value)}
          placeholder="e.g., 500px, 100%"
          className="sizing-control__max-width"
        />

        {/* Max Height */}
        <TextControl
          label={__('Max Height', 'axcelersblocks')}
          value={maxHeight[activeDevice] || ''}
          onChange={(value) => updateDeviceAttribute('maxHeight', value)}
          placeholder="e.g., 500px, 100%"
          className="sizing-control__max-height"
        />
      </div>

      {/* Aspect Ratio */}
      <TextControl
        label={__('Aspect Ratio', 'axcelersblocks')}
        value={aspectRatio[activeDevice] || ''}
        onChange={(value) => updateDeviceAttribute('aspectRatio', value)}
        placeholder="e.g., 16/9, 1/1"
        className="sizing-control__aspect-ratio"
      />

      <Button
        className='reset-btn'
        onClick={resetSizing}
        label={__('Reset', 'axcelersblocks')}
        showTooltip={true}
      >
        {__('Reset', 'axcelersblocks')}
      </Button>
    </PanelBody>
  );
}
