import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl, SelectControl, ButtonGroup, Button } from '@wordpress/components';
import { typography, notAllowed, formatCapitalize, formatItalic, alignLeft, alignCenter, alignRight, alignJustify, formatLowercase, formatUppercase, formatUnderline, formatStrikethrough, reset } from '@wordpress/icons'; // Added reset icon
import TextOverline from '../icons/TextOverline';
import { PanelColorSettings } from '@wordpress/block-editor';
import { useDevice } from '../../controls/DeviceContext';
import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';

export default function TypographyControl({ attributes, setAttributes }) {
  const { activeDevice } = useDevice();

  // Initialize device-specific attributes with defaults
  const textColor = attributes.textColor || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const fontSize = attributes.fontSize || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const fontWeight = attributes.fontWeight || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const fontStyle = attributes.fontStyle || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const textAlign = attributes.textAlign || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const textTransform = attributes.textTransform || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const textDecoration = attributes.textDecoration || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const lineHeight = attributes.lineHeight || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const letterSpacing = attributes.letterSpacing || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const fontFamily = attributes.fontFamily || {
    desktop: '',
    tablet: '',
    mobile: '',
  };

  // State to store fetched custom fonts
  const [customFonts, setCustomFonts] = useState([]);

  // Fetch custom fonts on component mount
  useEffect(() => {
    apiFetch({ path: '/axcelersblocks/v1/custom-fonts' })
      .then((data) => {
        const fonts = Array.isArray(data.fonts) ? data.fonts : data;
        setCustomFonts(fonts);
      })
      .catch((error) => {
        console.error('Error fetching custom fonts:', error);
        setCustomFonts([]);
      });
  }, []);

  // Helper function to update device-specific attributes
  const updateDeviceAttribute = (attribute, value) => {
    setAttributes({
      [attribute]: {
        ...attributes[attribute],
        [activeDevice]: value,
      },
    });
  };

  // Reset all typography attributes for the active device
  const resetTypography = () => {
    setAttributes({
      textColor: {
        ...attributes.textColor,
        [activeDevice]: '',
      },
      fontSize: {
        ...attributes.fontSize,
        [activeDevice]: '',
      },
      fontWeight: {
        ...attributes.fontWeight,
        [activeDevice]: '',
      },
      fontStyle: {
        ...attributes.fontStyle,
        [activeDevice]: '',
      },
      textAlign: {
        ...attributes.textAlign,
        [activeDevice]: '',
      },
      textTransform: {
        ...attributes.textTransform,
        [activeDevice]: '',
      },
      textDecoration: {
        ...attributes.textDecoration,
        [activeDevice]: '',
      },
      lineHeight: {
        ...attributes.lineHeight,
        [activeDevice]: '',
      },
      letterSpacing: {
        ...attributes.letterSpacing,
        [activeDevice]: '',
      },
      fontFamily: {
        ...attributes.fontFamily,
        [activeDevice]: '',
      },
    });
  };

  // Font Weight options
  const fontWeightOptions = [
    { value: '', label: __('Default', 'axcelersblocks') },
    { value: 'normal', label: __('Normal', 'axcelersblocks') },
    { value: 'bold', label: __('Bold', 'axcelersblocks') },
    { value: '100', label: '100' },
    { value: '200', label: '200' },
    { value: '300', label: '300' },
    { value: '400', label: '400' },
    { value: '500', label: '500' },
    { value: '600', label: '600' },
    { value: '700', label: '700' },
    { value: '800', label: '800' },
    { value: '900', label: '900' },
  ];

  // Font Style options for ButtonGroup
  const fontStyleOptions = [
    { value: 'none', label: __('None', 'axcelersblocks'), icon: notAllowed },
    { value: 'normal', label: __('Normal', 'axcelersblocks'), icon: formatCapitalize },
    { value: 'italic', label: __('Italic', 'axcelersblocks'), icon: formatItalic },
  ];

  // Text Alignment options for ButtonGroup
  const textAlignOptions = [
    { value: 'left', label: __('Left', 'axcelersblocks'), icon: alignLeft },
    { value: 'center', label: __('Center', 'axcelersblocks'), icon: alignCenter },
    { value: 'right', label: __('Right', 'axcelersblocks'), icon: alignRight },
    { value: 'justify', label: __('Justify', 'axcelersblocks'), icon: alignJustify },
  ];

  // Text Transform options for ButtonGroup
  const textTransformOptions = [
    { value: 'none', label: __('None', 'axcelersblocks'), icon: notAllowed },
    { value: 'uppercase', label: __('Uppercase', 'axcelersblocks'), icon: formatUppercase },
    { value: 'lowercase', label: __('Lowercase', 'axcelersblocks'), icon: formatLowercase },
    { value: 'capitalize', label: __('Capitalize', 'axcelersblocks'), icon: formatCapitalize },
  ];

  // Text Decoration options for ButtonGroup
  const textDecorationOptions = [
    { value: 'none', label: __('None', 'axcelersblocks'), icon: notAllowed },
    { value: 'underline', label: __('Underline', 'axcelersblocks'), icon: formatUnderline },
    { value: 'overline', label: __('Overline', 'axcelersblocks'), icon: <TextOverline /> },
    { value: 'line-through', label: __('Line Through', 'axcelersblocks'), icon: formatStrikethrough },
  ];

  // Default Font Family options
  const defaultFontFamilyOptions = [
    { value: '', label: __('Default', 'axcelersblocks') },
    { value: 'inherit', label: __('Inherit', 'axcelersblocks') },
    { value: 'Arial', label: 'Arial' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Georgia', label: 'Georgia' },
  ];

  // Combine default fonts with custom fonts, adding a disabled separator
  const customFontOptions = customFonts.map((font) => ({
    value: font.font_name,
    label: font.font_name,
  }));

  const fontFamilyOptions = [
    ...defaultFontFamilyOptions,
    ...(customFonts.length > 0
      ? [
          { value: '', label: __('Custom Fonts', 'axcelersblocks'), disabled: true },
          ...customFontOptions,
        ]
      : []),
  ];

  return (
    <PanelBody
      className="typography-controls-wrapper"
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="title">
            {typography}
            {__('Typography', 'axcelersblocks')}
          </span>
        </div>
      }
      initialOpen={false}
    >
      {/* Text Color */}
      <PanelColorSettings
        className="typography-color-picker"
        title={__('Text Color', 'axcelersblocks')}
        initialOpen={false}
        colorSettings={[
          {
            value: textColor[activeDevice] || '',
            onChange: (value) => updateDeviceAttribute('textColor', value),
            label: __('Text Color', 'axcelersblocks'),
          },
        ]}
      />

      {/* Font Size */}
      <TextControl
        label={__('Font Size', 'axcelersblocks')}
        value={fontSize[activeDevice] || ''}
        onChange={(value) => updateDeviceAttribute('fontSize', value)}
        placeholder="e.g., 16px, 1rem"
        className="typography-control__font-size"
      />

      {/* Font Weight */}
      <SelectControl
        label={__('Font Weight', 'axcelersblocks')}
        value={fontWeight[activeDevice] || ''}
        options={fontWeightOptions}
        onChange={(value) => updateDeviceAttribute('fontWeight', value)}
        className="typography-control__font-weight"
      />

      {/* Font Style */}
      <div className="typography-control__font-style">
        <label className="components-base-control__label">{__('Font Style', 'axcelersblocks')}</label>
        <ButtonGroup className="typography-font-style-options">
          {fontStyleOptions.map((option) => (
            <Button
              key={option.value}
              icon={option.icon}
              isPressed={fontStyle[activeDevice] === option.value}
              onClick={() => updateDeviceAttribute('fontStyle', fontStyle[activeDevice] === option.value ? '' : option.value)}
              aria-label={option.label}
              variant={fontStyle[activeDevice] === option.value ? 'primary' : 'secondary'}
            />
          ))}
        </ButtonGroup>
      </div>

      {/* Text Alignment */}
      <div className="typography-control__text-align">
        <label className="components-base-control__label">{__('Text Alignment', 'axcelersblocks')}</label>
        <ButtonGroup className="typography-text-align-options">
          {textAlignOptions.map((option) => (
            <Button
              key={option.value}
              icon={option.icon}
              isPressed={textAlign[activeDevice] === option.value}
              onClick={() => updateDeviceAttribute('textAlign', textAlign[activeDevice] === option.value ? '' : option.value)}
              aria-label={option.label}
              variant={textAlign[activeDevice] === option.value ? 'primary' : 'secondary'}
            />
          ))}
        </ButtonGroup>
      </div>

      {/* Text Transform */}
      <div className="typography-control__text-transform">
        <label className="components-base-control__label">{__('Text Transform', 'axcelersblocks')}</label>
        <ButtonGroup className="typography-text-transform-options">
          {textTransformOptions.map((option) => (
            <Button
              key={option.value}
              icon={option.icon}
              isPressed={textTransform[activeDevice] === option.value}
              onClick={() => updateDeviceAttribute('textTransform', textTransform[activeDevice] === option.value ? '' : option.value)}
              aria-label={option.label}
              variant={textTransform[activeDevice] === option.value ? 'primary' : 'secondary'}
            />
          ))}
        </ButtonGroup>
      </div>

      {/* Text Decoration */}
      <div className="typography-control__text-decoration">
        <label className="components-base-control__label">{__('Text Decoration', 'axcelersblocks')}</label>
        <ButtonGroup className="typography-text-decoration-options">
          {textDecorationOptions.map((option) => (
            <Button
              key={option.value}
              icon={option.icon}
              isPressed={textDecoration[activeDevice] === option.value}
              onClick={() => updateDeviceAttribute('textDecoration', textDecoration[activeDevice] === option.value ? '' : option.value)}
              aria-label={option.label}
              variant={textDecoration[activeDevice] === option.value ? 'primary' : 'secondary'}
            />
          ))}
        </ButtonGroup>
      </div>

      {/* Line Height */}
      <TextControl
        label={__('Line Height', 'axcelersblocks')}
        value={lineHeight[activeDevice] || ''}
        onChange={(value) => updateDeviceAttribute('lineHeight', value)}
        placeholder="e.g., 1.5, 24px"
        className="typography-control__line-height"
      />

      {/* Letter Spacing */}
      <TextControl
        label={__('Letter Spacing', 'axcelersblocks')}
        value={letterSpacing[activeDevice] || ''}
        onChange={(value) => updateDeviceAttribute('letterSpacing', value)}
        placeholder="e.g., 2px, 0.1em"
        className="typography-control__letter-spacing"
      />

      {/* Font Family */}
      <SelectControl
        label={__('Font Family', 'axcelersblocks')}
        value={fontFamily[activeDevice] || ''}
        options={fontFamilyOptions}
        onChange={(value) => updateDeviceAttribute('fontFamily', value)}
        className="typography-control__font-family"
      />
			<Button
        className='reset-btn'
				onClick={resetTypography}
				label={__('Reset', 'axcelersblocks')}
				showTooltip={true}
      >
        {__('Reset', 'axcelersblocks')}
      </Button>
    </PanelBody>
  );
}
