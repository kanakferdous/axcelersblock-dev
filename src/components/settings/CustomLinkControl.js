import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

export default function CustomLinkControl({ attributes, setAttributes }) {
  const { customLink } = attributes;

  return (
    <div className="axcelersblocks-settings-section">
      <h3 className="axcelersblocks-settings-title">{__('Custom Link', 'axcelersblocks')}</h3>
      <TextControl
        value={customLink || ''}
        onChange={(value) => setAttributes({ customLink: value })}
        placeholder="https://example.com"
      />
    </div>
  );
}
