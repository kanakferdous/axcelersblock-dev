import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl, Button, ButtonGroup } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

export default function FlexLayout({ activeDevice, flexDirection, flexWrap, columnGap, rowGap, flexGrow, flexShrink, flexBasis, order, updateDeviceAttribute }) {
  // State to track the selected button for Flex Direction (single selection)
  const [selectedFlexDirection, setSelectedFlexDirection] = useState(
    flexDirection[activeDevice] || ''
  );

  // State to track the selected button for Flex Wrap (single selection)
  const [selectedFlexWrap, setSelectedFlexWrap] = useState(
    flexWrap[activeDevice] || ''
  );

  // Sync local state with props when flexDirection or flexWrap changes
  useEffect(() => {
    setSelectedFlexDirection(flexDirection[activeDevice] || '');
    setSelectedFlexWrap(flexWrap[activeDevice] || '');
  }, [flexDirection, flexWrap, activeDevice]);

  // Flex Direction options
  const flexDirectionOptions = [
    { value: 'row', label: __('Row', 'axcelersblocks') },
    { value: 'column', label: __('Column', 'axcelersblocks') },
    { value: 'row-reverse', label: __('Row Reverse', 'axcelersblocks') },
    { value: 'column-reverse', label: __('Column Reverse', 'axcelersblocks') },
  ];

  // Flex Wrap options
  const flexWrapOptions = [
    { value: 'nowrap', label: __('No Wrap', 'axcelersblocks') },
    { value: 'wrap', label: __('Wrap', 'axcelersblocks') },
    { value: 'wrap-reverse', label: __('Wrap Reverse', 'axcelersblocks') },
  ];

  // Toggle function for Flex Direction (single selection)
  const toggleFlexDirection = (value) => {
    const newValue = selectedFlexDirection === value ? '' : value;
    setSelectedFlexDirection(newValue);
    updateDeviceAttribute('flexDirection', newValue);
  };

  // Toggle function for Flex Wrap (single selection)
  const toggleFlexWrap = (value) => {
    const newValue = selectedFlexWrap === value ? '' : value;
    setSelectedFlexWrap(newValue);
    updateDeviceAttribute('flexWrap', newValue);
  };

  return (
    <PanelBody
      className="flex-layout-controls"
      title={__('Flex Layout', 'axcelersblocks')}
      initialOpen={false}
    >
      {/* Flex Direction */}
      <div className="flex-direction-control">
        <label className="components-base-control__label">{__('Flex Direction', 'axcelersblocks')}</label>
        <ButtonGroup className="flex-direction-options">
          {flexDirectionOptions.map((option) => (
            <Button
              key={option.value}
              isPressed={selectedFlexDirection === option.value}
              onClick={() => toggleFlexDirection(option.value)}
              aria-label={option.label}
              variant={selectedFlexDirection === option.value ? 'primary' : 'secondary'}
            >
              {option.label}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      {/* Flex Wrap */}
      <div className="flex-wrap-control">
        <label className="components-base-control__label">{__('Flex Wrap', 'axcelersblocks')}</label>
        <ButtonGroup className="flex-wrap-options">
          {flexWrapOptions.map((option) => (
            <Button
              key={option.value}
              isPressed={selectedFlexWrap === option.value}
              onClick={() => toggleFlexWrap(option.value)}
              aria-label={option.label}
              variant={selectedFlexWrap === option.value ? 'primary' : 'secondary'}
            >
              {option.label}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      {/* Column Gap and Row Gap */}
      <div className="gap-controls">
        {/* Column Gap */}
        <TextControl
          label={__('Column Gap', 'axcelersblocks')}
          value={columnGap[activeDevice] || ''}
          onChange={(value) => updateDeviceAttribute('columnGap', value)}
          placeholder="e.g., 0.5em"
        />

        {/* Row Gap */}
        <TextControl
          label={__('Row Gap', 'axcelersblocks')}
          value={rowGap[activeDevice] || ''}
          onChange={(value) => updateDeviceAttribute('rowGap', value)}
          placeholder="e.g., 0.5em"
        />
      </div>

      <div className="grow-shrink-controls">
        {/* Flex Grow */}
        <TextControl
          label={__('Flex Grow', 'axcelersblocks')}
          value={flexGrow[activeDevice] || ''}
          onChange={(value) => updateDeviceAttribute('flexGrow', value)}
          placeholder="e.g., 1"
        />

        {/* Flex Shrink */}
        <TextControl
          label={__('Flex Shrink', 'axcelersblocks')}
          value={flexShrink[activeDevice] || ''}
          onChange={(value) => updateDeviceAttribute('flexShrink', value)}
          placeholder="e.g., 1"
        />
      </div>

      {/* Flex Basis */}
      <TextControl
        label={__('Flex Basis', 'axcelersblocks')}
        value={flexBasis[activeDevice] || ''}
        onChange={(value) => updateDeviceAttribute('flexBasis', value)}
        placeholder="e.g., auto, 100px"
      />

      {/* Order */}
      <TextControl
        label={__('Order', 'axcelersblocks')}
        value={order[activeDevice] || ''}
        onChange={(value) => updateDeviceAttribute('order', value)}
        placeholder="e.g., 0, 1, -1"
      />
    </PanelBody>
  );
}
