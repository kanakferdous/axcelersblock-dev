import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl } from '@wordpress/components';

export default function Floats({ activeDevice, float, clear, updateDeviceAttribute }) {
  // Float options
  const floatOptions = [
    { value: '', label: __('Default', 'axcelersblocks') },
    { value: 'none', label: __('None', 'axcelersblocks') },
    { value: 'left', label: __('Left', 'axcelersblocks') },
    { value: 'right', label: __('Right', 'axcelersblocks') },
    { value: 'inline-start', label: __('Inline Start', 'axcelersblocks') },
    { value: 'inline-end', label: __('Inline End', 'axcelersblocks') },
  ];

  // Clear options
  const clearOptions = [
    { value: '', label: __('Default', 'axcelersblocks') },
    { value: 'none', label: __('None', 'axcelersblocks') },
    { value: 'left', label: __('Left', 'axcelersblocks') },
    { value: 'right', label: __('Right', 'axcelersblocks') },
    { value: 'both', label: __('Both', 'axcelersblocks') },
  ];

  return (
		<PanelBody
			className="floats-controls"
			title={__('Floats', 'axcelersblocks')}
			initialOpen={false}
		>
      {/* Float Selection */}
      <SelectControl
        label={__('Float', 'axcelersblocks')}
        value={float[activeDevice] || ''}
        options={floatOptions}
        onChange={(value) => updateDeviceAttribute('float', value)}
        className="float-control"
      />

      {/* Clear Selection */}
      <SelectControl
        label={__('Clear', 'axcelersblocks')}
        value={clear[activeDevice] || ''}
        options={clearOptions}
        onChange={(value) => updateDeviceAttribute('clear', value)}
        className="clear-control"
      />
		</PanelBody>
  );
}
