import { __ } from '@wordpress/i18n';
import { Button, TextControl, Dropdown, ColorPicker, PanelBody } from '@wordpress/components';
import { link, linkOff, rotateRight } from '@wordpress/icons';
import { useDevice } from '../../controls/DeviceContext';
import BorderMain from '../icons/BorderMain';

export default function BorderControl({ attributes, setAttributes }) {
  const { activeDevice } = useDevice();

  // Initialize device-specific attributes with defaults
  const border = attributes.border || {
    desktop: { width: '', style: '', color: '', sides: {}, isLinkActive: true },
    tablet: { width: '', style: '', color: '', sides: {}, isLinkActive: true },
    mobile: { width: '', style: '', color: '', sides: {}, isLinkActive: true },
  };

  const borderRadius = attributes.borderRadius || {
    desktop: { value: '', corners: {}, isLinkActive: true },
    tablet: { value: '', corners: {}, isLinkActive: true },
    mobile: { value: '', corners: {}, isLinkActive: true },
  };

  // Border style options
  const borderStyleOptions = [
    { label: __('None', 'axcelersblocks'), value: '' },
    { label: __('Solid', 'axcelersblocks'), value: 'solid' },
    { label: __('Dashed', 'axcelersblocks'), value: 'dashed' },
    { label: __('Dotted', 'axcelersblocks'), value: 'dotted' },
    { label: __('Double', 'axcelersblocks'), value: 'double' },
  ];

  // Sides and corners for unlinked state
  const sides = ['top', 'right', 'bottom', 'left'];
  const corners = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];

  // Helper function to update device-specific attributes
  const updateDeviceAttribute = (attribute, value) => {
    setAttributes({
      [attribute]: {
        ...attributes[attribute],
        [activeDevice]: value,
      },
    });
  };

  // Reset border values
  const resetBorder = () => {
    const newBorder = {
      width: '',
      style: '',
      color: '',
      sides: {},
      isLinkActive: true,
    };
    updateDeviceAttribute('border', newBorder);
  };

  // Reset border radius values
  const resetBorderRadius = () => {
    const newRadius = {
      value: '',
      corners: {},
      isLinkActive: true,
    };
    updateDeviceAttribute('borderRadius', newRadius);
  };

  // Toggle border link state
  const toggleBorderLink = () => {
    const newBorder = {
      ...border[activeDevice],
      isLinkActive: !border[activeDevice].isLinkActive,
      sides: border[activeDevice].isLinkActive ? {} : border[activeDevice].sides,
    };
    updateDeviceAttribute('border', newBorder);
  };

  // Toggle border radius link state
  const toggleRadiusLink = () => {
    const newRadius = {
      ...borderRadius[activeDevice],
      isLinkActive: !borderRadius[activeDevice].isLinkActive,
      corners: borderRadius[activeDevice].isLinkActive ? {} : borderRadius[activeDevice].corners,
    };
    updateDeviceAttribute('borderRadius', newRadius);
  };

  // Update border width (linked)
  const updateBorderWidth = (value) => {
    const newBorder = { ...border[activeDevice], width: value };
    updateDeviceAttribute('border', newBorder);
  };

  // Update border style (linked)
  const updateBorderStyle = (value) => {
    const newBorder = { ...border[activeDevice], style: value };
    updateDeviceAttribute('border', newBorder);
  };

  // Update border color (linked)
  const updateBorderColor = (value) => {
    const newBorder = { ...border[activeDevice], color: value };
    updateDeviceAttribute('border', newBorder);
  };

  // Update border side (unlinked)
  const updateBorderSide = (side, key, value) => {
    const newSides = { ...border[activeDevice].sides, [side]: { ...border[activeDevice].sides[side], [key]: value } };
    const newBorder = { ...border[activeDevice], sides: newSides };
    updateDeviceAttribute('border', newBorder);
  };

  // Update border radius (linked)
  const updateBorderRadius = (value) => {
    const newRadius = { ...borderRadius[activeDevice], value: value };
    updateDeviceAttribute('borderRadius', newRadius);
  };

  // Update border radius corner (unlinked)
  const updateBorderRadiusCorner = (corner, value) => {
    const newCorners = { ...borderRadius[activeDevice].corners, [corner]: value };
    const newRadius = { ...borderRadius[activeDevice], corners: newCorners };
    updateDeviceAttribute('borderRadius', newRadius);
  };

  // Render border style options as buttons in the popup
  const renderBorderStyleOptions = (onSelect, onClose) => (
    <div className="border-style-options">
      {borderStyleOptions.map((option) => (
        <Button
          key={option.value}
          variant="secondary"
          onClick={() => {
            onSelect(option.value);
            onClose();
          }}
          style={{ textAlign: 'left' }}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );

  return (
    <PanelBody
      className="border-controls-wrapper"
      title={
        <span className="title">
          <BorderMain />
          {__('Borders', 'axcelersblocks')}
        </span>
      }
      initialOpen={false}
    >
      {/* Border Control */}
      <div className="border-control">
        <div className="border-control-header">
          <h3>{__('Border', 'axcelersblocks')}</h3>
          <div>
            <Button
              icon={border[activeDevice].isLinkActive ? link : linkOff}
              onClick={toggleBorderLink}
              label={border[activeDevice].isLinkActive ? __('Unlink Sides', 'axcelersblocks') : __('Link Sides', 'axcelersblocks')}
            />
            <Button
              icon={rotateRight}
              onClick={resetBorder}
              label={__('Reset', 'axcelersblocks')}
              showTooltip={true}
            />
          </div>
        </div>

        {border[activeDevice].isLinkActive ? (
          <div className="border-control-linked">
            <TextControl
              label={__('All Side', 'axcelersblocks')}
              value={border[activeDevice].width || ''}
              onChange={updateBorderWidth}
              placeholder="e.g., 1px"
            />
            <Dropdown
              className='border-style'
              position="bottom right"
              renderToggle={({ isOpen, onToggle }) => (
                <Button
                  variant="secondary"
                  onClick={onToggle}
                  aria-expanded={isOpen}
                >
                  {border[activeDevice].style || __('Select Style', 'axcelersblocks')}
                </Button>
              )}
              renderContent={({ onClose }) => (
                renderBorderStyleOptions(updateBorderStyle, onClose)
              )}
            />
            <Dropdown
              className='border-color'
              position="bottom right"
              renderToggle={({ isOpen, onToggle }) => (
                <Button
                  variant="secondary"
                  onClick={onToggle}
                  aria-expanded={isOpen}
                >
                  <span style={{ backgroundColor: border[activeDevice].color || 'transparent' }}></span>
                </Button>
              )}
              renderContent={() => (
                <ColorPicker
                  color={border[activeDevice].color || '#000000'}
                  onChangeComplete={(color) => updateBorderColor(color.hex)}
                />
              )}
            />
          </div>
        ) : (
          <div className="border-control-unlinked">
            {sides.map((side) => (
              <div key={side} className="border-side-control">
                <TextControl
                  label={__(`${side.charAt(0).toUpperCase() + side.slice(1)}`, 'axcelersblocks')}
                  value={border[activeDevice].sides[side]?.width || ''}
                  onChange={(value) => updateBorderSide(side, 'width', value)}
                  placeholder="e.g., 1px"
                />
                <Dropdown
                  className='border-style'
                  position="bottom right"
                  renderToggle={({ isOpen, onToggle }) => (
                    <Button
                      variant="secondary"
                      onClick={onToggle}
                      aria-expanded={isOpen}
                    >
                      {border[activeDevice].sides[side]?.style || __('Select Style', 'axcelersblocks')}
                    </Button>
                  )}
                  renderContent={({ onClose }) => (
                    renderBorderStyleOptions(
                      (value) => updateBorderSide(side, 'style', value),
                      onClose
                    )
                  )}
                />
                <Dropdown
                  className='border-color'
                  position="bottom right"
                  renderToggle={({ isOpen, onToggle }) => (
                    <Button
                      variant="secondary"
                      onClick={onToggle}
                      aria-expanded={isOpen}
                    >
                      <span style={{ backgroundColor: border[activeDevice].sides[side]?.color || 'transparent' }}></span>
                    </Button>
                  )}
                  renderContent={() => (
                    <ColorPicker
                      color={border[activeDevice].sides[side]?.color || '#000000'}
                      onChangeComplete={(color) => updateBorderSide(side, 'color', color.hex)}
                    />
                  )}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Border Radius Control */}
      <div className="border-radius-control">
        <div className="border-radius-control-header">
          <h3>{__('Border Radius', 'axcelersblocks')}</h3>
          <div>
            <Button
              icon={borderRadius[activeDevice].isLinkActive ? link : linkOff}
              onClick={toggleRadiusLink}
              label={borderRadius[activeDevice].isLinkActive ? __('Unlink Corners', 'axcelersblocks') : __('Link Corners', 'axcelersblocks')}
            />
            <Button
              icon={rotateRight}
              onClick={resetBorderRadius}
              label={__('Reset', 'axcelersblocks')}
              showTooltip={true}
            />
          </div>
        </div>

        {borderRadius[activeDevice].isLinkActive ? (
          <div className="border-radius-control-linked">
            <TextControl
              label={__('All Corners', 'axcelersblocks')}
              value={borderRadius[activeDevice].value || ''}
              onChange={updateBorderRadius}
              placeholder="e.g., 5px"
            />
          </div>
        ) : (
          <div className="border-radius-control-unlinked">
            {corners.map((corner) => (
              <TextControl
                key={corner}
                label={__(`${corner.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}`, 'axcelersblocks')}
                value={borderRadius[activeDevice].corners[corner] || ''}
                onChange={(value) => updateBorderRadiusCorner(corner, value)}
                placeholder="e.g., 5px"
              />
            ))}
          </div>
        )}
      </div>
    </PanelBody>
  );
}
