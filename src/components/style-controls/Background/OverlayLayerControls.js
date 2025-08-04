import { __ } from '@wordpress/i18n';
import { RangeControl } from '@wordpress/components';
import { PanelColorSettings } from '@wordpress/block-editor';

export default function OverlayLayerControls({ layer, onUpdate, onCancel }) {
  const { color = '', opacity = 0.5 } = layer;

  return (
    <div className="background-layer-controls">
      <PanelColorSettings
        className="background-overlay-color-picker"
        title={__('Overlay Color', 'axcelersblocks')}
        initialOpen={false}
        colorSettings={[
          {
            value: color,
            onChange: (value) => onUpdate({ ...layer, color: value || '' }),
            label: __('Overlay Color', 'axcelersblocks'),
          },
        ]}
      />
      <RangeControl
        label={__('Overlay Opacity', 'axcelersblocks')}
        value={opacity}
        onChange={(value) => onUpdate({ ...layer, opacity: value })}
        min={0}
        max={1}
        step={0.1}
        className="background-control__opacity"
      />
    </div>
  );
}
