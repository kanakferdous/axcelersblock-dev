import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl, ColorPicker, ToggleControl, Dropdown, Button } from '@wordpress/components';

export default function BoxShadowControl({ effect, updateDeviceEffect }) {
  const boxShadow = effect.boxShadow || { xOffset: '', yOffset: '', blurRadius: '', spreadRadius: '', color: '', inset: false };

  const updateBoxShadow = (key, value) => {
    updateDeviceEffect('boxShadow', { ...boxShadow, [key]: value });
  };

  return (
    <PanelBody
			className='effect-child-controls'
      title={__('Box Shadow', 'axcelersblocks')}
      initialOpen={false}
    >
			<div className='two-columns'>
				<TextControl
					label={__('X Offset', 'axcelersblocks')}
					value={boxShadow.xOffset || ''}
					onChange={(value) => updateBoxShadow('xOffset', value)}
					placeholder="e.g., 2px"
				/>
				<TextControl
					label={__('Y Offset', 'axcelersblocks')}
					value={boxShadow.yOffset || ''}
					onChange={(value) => updateBoxShadow('yOffset', value)}
					placeholder="e.g., 2px"
				/>
			</div>
			<div className='two-columns'>
				<TextControl
					label={__('Blur Radius', 'axcelersblocks')}
					value={boxShadow.blurRadius || ''}
					onChange={(value) => updateBoxShadow('blurRadius', value)}
					placeholder="e.g., 4px"
				/>
				<TextControl
					label={__('Spread Radius', 'axcelersblocks')}
					value={boxShadow.spreadRadius || ''}
					onChange={(value) => updateBoxShadow('spreadRadius', value)}
					placeholder="e.g., 0px"
				/>
			</div>
			<div className='two-columns'>
				<Dropdown
					className="box-shadow-color"
					position="bottom right"
					renderToggle={({ isOpen, onToggle }) => (
						<Button
							variant="secondary"
							onClick={onToggle}
							aria-expanded={isOpen}
						>
							<span style={{ background: boxShadow.color || 'transparent' }}></span>
						</Button>
					)}
					renderContent={() => (
						<ColorPicker
							color={boxShadow.color || '#000000'}
							onChangeComplete={(color) => updateBoxShadow('color', color.hex)}
						/>
					)}
				/>
				<ToggleControl
					label={__('Inset', 'axcelersblocks')}
					checked={boxShadow.inset || false}
					onChange={(value) => updateBoxShadow('inset', value)}
				/>
			</div>
    </PanelBody>
  );
}
