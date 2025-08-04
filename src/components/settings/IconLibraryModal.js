import { __ } from '@wordpress/i18n';
import { Button, Modal, Tooltip, TextareaControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { iconLibrary } from '../../icons';

const IconLibraryModal = ({ isOpen, onClose, onSelect, initialValue = {} }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [selectedIcon, setSelectedIcon] = useState(null); // for icon key or 'custom'
  const [selectedType, setSelectedType] = useState('library'); // 'library' or 'custom'
  const [customSVG, setCustomSVG] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    if (initialValue.type === 'library') {
      setActiveTab(initialValue.category || 'general');
      setSelectedType('library');
      setSelectedIcon(initialValue.name || null);
    }

    if (initialValue.type === 'custom') {
      setActiveTab('custom');
      setSelectedType('custom');
      setSelectedIcon('custom');
      setCustomSVG(initialValue.svg || '');
    }
  }, [isOpen, initialValue]);

  const renderIcons = (icons) => (
    <div className="axcelersblocks-icon-grid">
      {Object.entries(icons).map(([key, IconComponent]) => (
        <Tooltip key={key} text={key}>
          <Button
            className={`axcelersblocks-icon-button ${
              selectedIcon === key && selectedType === 'library' ? 'is-selected' : ''
            }`}
            onClick={() => {
              setSelectedIcon(key);
              setSelectedType('library');
            }}
          >
            <IconComponent />
          </Button>
        </Tooltip>
      ))}
    </div>
  );

  const renderCustomSVGInput = () => (
    <div className="axcelersblocks-custom-icon-tab">
      <TextareaControl
        label={__('Paste SVG Code', 'axcelersblocks')}
        help={__('Only the <svg> tag and its contents. Use fill="currentColor" inside the <svg> tag if this is not in your tag.', 'axcelersblocks')}
        value={customSVG}
        onChange={(val) => {
          setCustomSVG(val);
          setSelectedType('custom');
          setSelectedIcon('custom');
        }}
        rows={6}
      />
      {customSVG && (
        <div
          className="axcelersblocks-custom-icon-preview"
          dangerouslySetInnerHTML={{ __html: customSVG }}
        />
      )}
    </div>
  );

  const handleInsert = () => {
    if (selectedType === 'custom' && customSVG.trim()) {
      onSelect({
        type: 'custom',
        svg: customSVG,
      });
    } else if (selectedType === 'library' && selectedIcon) {
      onSelect({
        type: 'library',
        name: selectedIcon,
        category: activeTab,
      });
    }
    onClose();
  };

  const handleClear = () => {
    setSelectedIcon(null);
    setCustomSVG('');
    setSelectedType('library');
    onSelect({
      type: '',
      name: '',
      category: '',
      svg: '',
    }); // Clear icon attributes
  };

  return (
    isOpen && (
      <Modal
        title={__('Icon Library', 'axcelersblocks')}
        onRequestClose={onClose}
        className="axcelersblocks-icon-modal"
      >
        <div className="axcelersblocks-icon-modal__container">
          <div className="axcelersblocks-icon-modal__sidebar">
            {['general', 'social', 'custom'].map((name) => (
              <Button
                key={name}
                isPressed={activeTab === name}
                onClick={() => setActiveTab(name)}
                className="axcelersblocks-icon-tab"
              >
                {__(name.charAt(0).toUpperCase() + name.slice(1), 'axcelersblocks')}
              </Button>
            ))}
          </div>

          <div className="axcelersblocks-icon-modal__content">
            {activeTab === 'custom'
              ? renderCustomSVGInput()
              : renderIcons(iconLibrary[activeTab] || {})}

            <div className="axcelersblocks-icon-modal__footer">
              <Button
                isDestructive
                variant="link"
                onClick={handleClear}
              >
                {__('Clear', 'axcelersblocks')}
              </Button>
              <Button
                variant="primary"
                onClick={handleInsert}
                disabled={
                  (selectedType === 'library' && !selectedIcon) ||
                  (selectedType === 'custom' && !customSVG.trim())
                }
              >
                {__('Insert', 'axcelersblocks')}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    )
  );
};

export default IconLibraryModal;
