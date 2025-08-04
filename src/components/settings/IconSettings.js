import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { Button, Flex, FlexItem, SelectControl } from '@wordpress/components';
import { PanelColorSettings } from '@wordpress/block-editor';
import IconLibraryModal from './IconLibraryModal';
import { iconLibrary } from '../../icons';
import ReactDOMServer from 'react-dom/server'; // NEW: To convert React icon to static SVG
import '../style.scss';

const IconSettings = ({ attributes, setAttributes }) => {
  const { iconType, iconName, iconCategory, customIcon, iconColor, iconLocation, iconSvg } = attributes;

  const [isModalOpen, setModalOpen] = useState(false);

  const hasValidIcon =
    (iconType === 'library' && iconCategory && iconName && iconLibrary[iconCategory]?.[iconName]) ||
    (iconType === 'custom' && customIcon && customIcon.includes('<svg'));

  // Reset all icon-related attributes
  const resetIconSettings = () => {
    setAttributes({
      iconType: '',
      iconName: '',
      iconCategory: '',
      customIcon: '',
      iconSvg: '',
      iconColor: '',
      iconLocation: 'before', // Default position as per SelectControl options
    });
  };

  const getIconPreview = () => {
    if (iconType === 'library' && iconCategory && iconName) {
      const IconComponent = iconLibrary[iconCategory]?.[iconName];
      return IconComponent ? (
        <span style={{ color: iconColor }}>
          <IconComponent />
        </span>
      ) : null;
    }
    if (iconType === 'custom' && customIcon && customIcon.includes('<svg')) {
      return (
        <span
          className="axcelersblocks-custom-icon-preview inline"
          style={{ color: iconColor }}
          dangerouslySetInnerHTML={{ __html: customIcon }}
        />
      );
    }
    return null;
  };

  return (
    <>
      <Flex align="center" justify="space-between" className="icon-library-select">
        <FlexItem>
          <Button variant="secondary" onClick={() => setModalOpen(true)}>
            {getIconPreview()}
            {' '}{__('Open Library', 'axcelersblocks')}
          </Button>
        </FlexItem>
      </Flex>

      <IconLibraryModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={(data) => {
          if (data.type === 'custom') {
            // For custom icon, store both raw input and svg string
            setAttributes({
              iconType: 'custom',
              customIcon: data.svg,
              iconSvg: data.svg, // Save SVG string
              iconName: '',
              iconCategory: '',
            });
          } else if (data.type === 'library' && data.name && data.category) {
            const IconComponent = iconLibrary[data.category]?.[data.name];
            const svgString = IconComponent
              ? ReactDOMServer.renderToStaticMarkup(<IconComponent />)
              : '';

            setAttributes({
              iconType: 'library',
              iconName: data.name,
              iconCategory: data.category,
              customIcon: '',
              iconSvg: svgString, // Save SVG string
            });
          } else {
            // Clear
            setAttributes({
              iconType: '',
              iconName: '',
              iconCategory: '',
              customIcon: '',
              iconSvg: '',
            });
          }
        }}
        initialValue={{
          type: iconType,
          name: iconName,
          category: iconCategory,
          svg: customIcon,
        }}
      />

      {hasValidIcon && (
        <>
          <PanelColorSettings
            title={__('Icon Color', 'axcelersblocks')}
            initialOpen={false}
            className="icon-color-picker"
            colorSettings={[
              {
                value: iconColor,
                onChange: (color) => setAttributes({ iconColor: color }),
                label: __('Color', 'axcelersblocks'),
              },
            ]}
          />

          <SelectControl
            label={__('Icon Position', 'axcelersblocks')}
            value={iconLocation}
            options={[
              { label: __('Before', 'axcelersblocks'), value: 'before' },
              { label: __('After', 'axcelersblocks'), value: 'after' },
            ]}
            onChange={(value) => setAttributes({ iconLocation: value })}
          />
        </>
      )}
			<Button
				className='reset-btn'
				onClick={resetIconSettings}
				label={__('Reset', 'axcelersblocks')}
				showTooltip={true}
			>
				{__('Reset', 'axcelersblocks')}
			</Button>
    </>
  );
};

export default IconSettings;
