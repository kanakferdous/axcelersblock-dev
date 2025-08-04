import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

export default function Display({ activeDevice, display, updateDeviceAttribute }) {
  const handleDisplayChange = (value) => {
    updateDeviceAttribute('display', value);
  };

  return (
    <SelectControl
			className='display-control'
      label={__('Display', 'axcelersblocks')}
      value={display[activeDevice] || ''}
      options={[
        { value: '', label: __('Default', 'axcelersblocks') },
        { value: 'block', label: __('Block', 'axcelersblocks') },
        { value: 'flex', label: __('Flex', 'axcelersblocks') },
        { value: 'grid', label: __('Grid', 'axcelersblocks') },
        { value: 'inline', label: __('Inline', 'axcelersblocks') },
        { value: 'inline-block', label: __('Inline Block', 'axcelersblocks') },
        { value: 'inline-flex', label: __('Inline Flex', 'axcelersblocks') },
        { value: 'inline-grid', label: __('Inline Grid', 'axcelersblocks') },
        { value: 'list-item', label: __('List Item', 'axcelersblocks') },
        { value: 'none', label: __('None', 'axcelersblocks') },
      ]}
      onChange={handleDisplayChange}
    />
  );
}
