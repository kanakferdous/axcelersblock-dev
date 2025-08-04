import { __ } from '@wordpress/i18n';
import { PanelBody, ButtonGroup, Button, TextControl } from '@wordpress/components';
import { link, linkOff, sidesAxial, rotateRight } from '@wordpress/icons';
import { useDevice } from '../../controls/DeviceContext';

export default function SpacingControls({ attributes, setAttributes }) {
  const { activeDevice } = useDevice();

  // Extract attributes with defaults
  const padding = attributes.padding || {
    desktop: { top: '', right: '', bottom: '', left: '', isVHActive: false, isSidesAllActive: false },
    tablet: { top: '', right: '', bottom: '', left: '', isVHActive: false, isSidesAllActive: false },
    mobile: { top: '', right: '', bottom: '', left: '', isVHActive: false, isSidesAllActive: false },
  };
  const margin = attributes.margin || {
    desktop: { top: '', right: '', bottom: '', left: '', isVHActive: false, isSidesAllActive: false },
    tablet: { top: '', right: '', bottom: '', left: '', isVHActive: false, isSidesAllActive: false },
    mobile: { top: '', right: '', bottom: '', left: '', isVHActive: false, isSidesAllActive: false },
  };

  // Reset padding for the active device
  const resetPadding = () => {
    setAttributes({
      padding: {
        ...padding,
        [activeDevice]: { top: '', right: '', bottom: '', left: '', all: '', vertical: '', horizontal: '', isVHActive: false, isSidesAllActive: false },
      },
    });
  };

  // Reset margin for the active device
  const resetMargin = () => {
    setAttributes({
      margin: {
        ...margin,
        [activeDevice]: { top: '', right: '', bottom: '', left: '', all: '', vertical: '', horizontal: '', isVHActive: false, isSidesAllActive: false },
      },
    });
  };

  // Handle button clicks for toggling isVHActive and isSidesAllActive
  const handleButtonClick = (section, buttonType) => {
    const isPadding = section === 'padding';
    const attribute = isPadding ? padding : margin;
    const attributeName = isPadding ? 'padding' : 'margin';

    const currentState = attribute[activeDevice] || { top: '', right: '', bottom: '', left: '', all: '', vertical: '', horizontal: '', isVHActive: false, isSidesAllActive: false };

    if (buttonType === 'link') {
      setAttributes({
        [attributeName]: {
          ...attribute,
          [activeDevice]: {
            ...currentState,
            isVHActive: !currentState.isVHActive,
            isSidesAllActive: false,
          },
        },
      });
    } else if (buttonType === 'sidesAll') {
      setAttributes({
        [attributeName]: {
          ...attribute,
          [activeDevice]: {
            ...currentState,
            isVHActive: false,
            isSidesAllActive: !currentState.isSidesAllActive,
          },
        },
      });
    }
  };

  // Handle input changes, preserving UI states
  const handleChange = (type, newValues) => {
    const attribute = type === 'padding' ? padding : margin;
    setAttributes({
      [type]: {
        ...attribute,
        [activeDevice]: {
          ...attribute[activeDevice],
          ...newValues,
          isVHActive: attribute[activeDevice].isVHActive || false,
          isSidesAllActive: attribute[activeDevice].isSidesAllActive || false,
        },
      },
    });
  };

  // Render inputs based on UI state
  const renderInputs = (type) => {
    const isPadding = type === 'padding';
    const values = isPadding ? padding : margin;
    const deviceValues = values[activeDevice] || { top: '', right: '', bottom: '', left: '', all: '', vertical: '', horizontal: '', isVHActive: false, isSidesAllActive: false };
    const { isVHActive, isSidesAllActive } = deviceValues;

    if (isVHActive) {
      return (
        <TextControl
          label="All Sides"
          value={deviceValues.all || deviceValues.top || ''}
          onChange={(value) =>
            handleChange(type, { top: value, right: value, bottom: value, left: value, all: value, vertical: '', horizontal: '' })
          }
        />
      );
    }

    if (isSidesAllActive) {
      return (
        <>
          <TextControl
            label="Vertical"
            value={deviceValues.vertical || deviceValues.top || ''}
            onChange={(value) =>
              handleChange(type, { top: value, bottom: value, vertical: value, all: '' })
            }
          />
          <TextControl
            label="Horizontal"
            value={deviceValues.horizontal || deviceValues.right || ''}
            onChange={(value) =>
              handleChange(type, { left: value, right: value, horizontal: value, all: '' })
            }
          />
        </>
      );
    }

    // Default: 4 individual sides
    return (
      <>
        <TextControl
          label="Top"
          value={deviceValues.top || ''}
          onChange={(value) => handleChange(type, { top: value })}
        />
        <TextControl
          label="Right"
          value={deviceValues.right || ''}
          onChange={(value) => handleChange(type, { right: value })}
        />
        <TextControl
          label="Bottom"
          value={deviceValues.bottom || ''}
          onChange={(value) => handleChange(type, { bottom: value })}
        />
        <TextControl
          label="Left"
          value={deviceValues.left || ''}
          onChange={(value) => handleChange(type, { left: value })}
        />
      </>
    );
  };

  // Dynamically add classes based on state for Padding
  const paddingContainerClasses = [
    'axcelersblocks-spacing-fields--default',
    padding[activeDevice].isVHActive ? 'axcelersblocks-spacing-fields--linked' : '',
    padding[activeDevice].isSidesAllActive ? 'axcelersblocks-spacing-fields--all-sides' : '',
  ].filter(Boolean).join(' ');

  // Dynamically add classes based on state for Margin
  const marginContainerClasses = [
    'axcelersblocks-spacing-fields--default',
    margin[activeDevice].isVHActive ? 'axcelersblocks-spacing-fields--linked' : '',
    margin[activeDevice].isSidesAllActive ? 'axcelersblocks-spacing-fields--all-sides' : '',
  ].filter(Boolean).join(' ');

  return (
    <PanelBody
      className="spacing-controls-wrapper"
      title={
        <span className="title">
          {sidesAxial}
          {__('Spacing', 'axcelersblocks')}
        </span>
      }
      initialOpen={false}
    >
      <div className="axcelersblocks-spacing-header">
        <strong>Padding</strong>
        <ButtonGroup>
          <Button
            icon={padding[activeDevice].isVHActive ? linkOff : link}
            isPressed={padding[activeDevice].isVHActive || false}
            onClick={() => handleButtonClick('padding', 'link')}
            label={padding[activeDevice].isVHActive ? 'Unlink sides' : 'Link sides'}
          />
          <Button
            icon={sidesAxial}
            isPressed={padding[activeDevice].isSidesAllActive || false}
            onClick={() => handleButtonClick('padding', 'sidesAll')}
            label="Vertical / Horizontal"
          />
          <Button
            icon={rotateRight}
            onClick={resetPadding}
            label={__('Reset', 'axcelersblocks')}
            showTooltip={true}
          />
        </ButtonGroup>
      </div>
      <div className={paddingContainerClasses}>{renderInputs('padding')}</div>

      <div className="axcelersblocks-spacing-header">
        <strong>Margin</strong>
        <ButtonGroup>
          <Button
            icon={margin[activeDevice].isVHActive ? linkOff : link}
            isPressed={margin[activeDevice].isVHActive || false}
            onClick={() => handleButtonClick('margin', 'link')}
            label={margin[activeDevice].isVHActive ? 'Unlink sides' : 'Link sides'}
          />
          <Button
            icon={sidesAxial}
            isPressed={margin[activeDevice].isSidesAllActive || false}
            onClick={() => handleButtonClick('margin', 'sidesAll')}
            label="Vertical / Horizontal"
          />
          <Button
            icon={rotateRight}
            onClick={resetMargin}
            label={__('Reset', 'axcelersblocks')}
            showTooltip={true}
          />
        </ButtonGroup>
      </div>
      <div className={marginContainerClasses}>{renderInputs('margin')}</div>
    </PanelBody>
  );
}
