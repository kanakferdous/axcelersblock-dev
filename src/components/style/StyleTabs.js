import { __ } from '@wordpress/i18n';
import { ButtonGroup, Button } from '@wordpress/components';

const styleTabs = [
  { name: 'main', label: __('Main', 'axcelersblocks') },
  { name: 'mainHover', label: __('Main Hover', 'axcelersblocks') },
  { name: 'link', label: __('Link', 'axcelersblocks') },
  { name: 'linkHover', label: __('Link Hover', 'axcelersblocks') },
  { name: 'icon', label: __('Icon', 'axcelersblocks') },
  { name: 'iconHover', label: __('Icon Hover', 'axcelersblocks') },
];

export default function StyleTabs({
  uniqueClass,
  activeTab,
  setActiveTab,
  iconSelector = '.icon',
  renderContent,
}) {
  const getSelectorDisplay = () => {
    switch (activeTab) {
      case 'main':
        return `.${uniqueClass}`;
      case 'mainHover':
        return `.${uniqueClass}:hover`;
      case 'link':
        return `.${uniqueClass} a`;
      case 'linkHover':
        return `.${uniqueClass} a:hover`;
      case 'icon':
        return `.${uniqueClass} ${iconSelector}`;
      case 'iconHover':
        return `.${uniqueClass} ${iconSelector}:hover`;
      default:
        return `.${uniqueClass}`;
    }
  };

  return (
    <div className="axcelersblocks-style-subtabs-wrapper">
      <div className="axcelersblocks-style-uniqueclass-name">
        <code>{getSelectorDisplay()}</code>
      </div>

      <ButtonGroup className="axcelersblocks-style-tab-buttons">
        {styleTabs.map((tab) => (
          <Button
            key={tab.name}
            isPrimary={activeTab === tab.name}
            isSecondary={activeTab !== tab.name}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.label}
          </Button>
        ))}
      </ButtonGroup>

      <div className='blockbase-style-controls'>
        {renderContent && renderContent(activeTab)}
      </div>
    </div>
  );
}
