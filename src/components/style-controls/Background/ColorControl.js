import { __ } from '@wordpress/i18n';
import { PanelColorSettings } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { rotateRight } from '@wordpress/icons';

export default function ColorControl({ backgroundColor, updateDeviceAttribute, activeDevice }) {
  const resetBackgroundColor = () => {
    updateDeviceAttribute('backgroundColor', '');
  };

  return (
    <PanelColorSettings
      className="background-color-picker"
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{__('Background Color', 'axcelersblocks')}</span>
          <Button
            icon={rotateRight}
            onClick={resetBackgroundColor}
            label={__('Reset', 'axcelersblocks')}
            showTooltip={true}
          />
        </div>
      }
      initialOpen={true}
      colorSettings={[
        {
          value: backgroundColor[activeDevice] || '',
          onChange: (value) => updateDeviceAttribute('backgroundColor', value),
          label: __('Background Color', 'axcelersblocks'),
        },
      ]}
    />
  );
}
