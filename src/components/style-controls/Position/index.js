import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl, SelectControl, Button } from '@wordpress/components';
import PositionMain from '../icons/PositionMain';
import { useDevice } from '../../controls/DeviceContext';

export default function PositionControl({ attributes, setAttributes }) {
  const { activeDevice } = useDevice();

  // Initialize device-specific attributes with defaults
  const position = attributes.position || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const inset = attributes.inset || {
    desktop: { top: '', right: '', bottom: '', left: '' },
    tablet: { top: '', right: '', bottom: '', left: '' },
    mobile: { top: '', right: '', bottom: '', left: '' },
  };
  const overflowX = attributes.overflowX || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const overflowY = attributes.overflowY || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const zIndex = attributes.zIndex || {
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

  // Reset all position-related attributes for the active device
  const resetPosition = () => {
    setAttributes({
      position: {
        ...attributes.position,
        [activeDevice]: '',
      },
      inset: {
        ...attributes.inset,
        [activeDevice]: { top: '', right: '', bottom: '', left: '' },
      },
      overflowX: {
        ...attributes.overflowX,
        [activeDevice]: '',
      },
      overflowY: {
        ...attributes.overflowY,
        [activeDevice]: '',
      },
      zIndex: {
        ...attributes.zIndex,
        [activeDevice]: '',
      },
    });
  };

  // Update inset values (top, right, bottom, left)
  const updateInset = (side, value) => {
    const newInset = {
      ...inset[activeDevice],
      [side]: value,
    };
    updateDeviceAttribute('inset', newInset);
  };

  // Position options
  const positionOptions = [
    { label: __('Default', 'axcelersblocks'), value: '' },
    { label: __('Static', 'axcelersblocks'), value: 'static' },
    { label: __('Relative', 'axcelersblocks'), value: 'relative' },
    { label: __('Absolute', 'axcelersblocks'), value: 'absolute' },
    { label: __('Fixed', 'axcelersblocks'), value: 'fixed' },
    { label: __('Sticky', 'axcelersblocks'), value: 'sticky' },
  ];

  // Overflow options for both X and Y
  const overflowOptions = [
    { label: __('Default', 'axcelersblocks'), value: '' },
    { label: __('Visible', 'axcelersblocks'), value: 'visible' },
    { label: __('Hidden', 'axcelersblocks'), value: 'hidden' },
    { label: __('Scroll', 'axcelersblocks'), value: 'scroll' },
    { label: __('Auto', 'axcelersblocks'), value: 'auto' },
    { label: __('Clip', 'axcelersblocks'), value: 'clip' },
  ];

  return (
    <PanelBody
      className="position-controls-wrapper"
      title={
				<span className="title">
					<PositionMain />
					{__('Position', 'axcelersblocks')}
				</span>
      }
      initialOpen={false}
    >
      {/* Position Select */}
      <SelectControl
        label={__('Position', 'axcelersblocks')}
        value={position[activeDevice] || ''}
        options={positionOptions}
        onChange={(value) => updateDeviceAttribute('position', value)}
      />

      {/* Inset (Top, Right, Bottom, Left) */}
      <div className="position-control__inset">
        <strong>{__('Inset', 'axcelersblocks')}</strong>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '8px', marginTop: '8px' }}>
          <TextControl
            label={__('Top', 'axcelersblocks')}
            value={inset[activeDevice].top || ''}
            onChange={(value) => updateInset('top', value)}
            placeholder="e.g., 10px, 5%, auto"
          />
          <TextControl
            label={__('Right', 'axcelersblocks')}
            value={inset[activeDevice].right || ''}
            onChange={(value) => updateInset('right', value)}
            placeholder="e.g., 10px, 5%, auto"
          />
          <TextControl
            label={__('Bottom', 'axcelersblocks')}
            value={inset[activeDevice].bottom || ''}
            onChange={(value) => updateInset('bottom', value)}
            placeholder="e.g., 10px, 5%, auto"
          />
          <TextControl
            label={__('Left', 'axcelersblocks')}
            value={inset[activeDevice].left || ''}
            onChange={(value) => updateInset('left', value)}
            placeholder="e.g., 10px, 5%, auto"
          />
        </div>
      </div>

      {/* Overflow-X */}
      <SelectControl
        label={__('Overflow-X', 'axcelersblocks')}
        value={overflowX[activeDevice] || ''}
        options={overflowOptions}
        onChange={(value) => updateDeviceAttribute('overflowX', value)}
      />

      {/* Overflow-Y */}
      <SelectControl
        label={__('Overflow-Y', 'axcelersblocks')}
        value={overflowY[activeDevice] || ''}
        options={overflowOptions}
        onChange={(value) => updateDeviceAttribute('overflowY', value)}
      />

      {/* Z-Index */}
      <TextControl
        label={__('Z-Index', 'axcelersblocks')}
        value={zIndex[activeDevice] || ''}
        onChange={(value) => updateDeviceAttribute('zIndex', value)}
        placeholder="e.g., 10, -1"
      />
			<Button
        className='reset-btn'
				onClick={resetPosition}
				label={__('Reset', 'axcelersblocks')}
				showTooltip={true}
			>
        {__('Reset', 'axcelersblocks')}
			</Button>
    </PanelBody>
  );
}
