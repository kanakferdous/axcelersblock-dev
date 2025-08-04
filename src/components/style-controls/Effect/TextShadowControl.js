import { __ } from '@wordpress/i18n';
import { TextControl, Dropdown, Button, ColorPicker, PanelBody } from '@wordpress/components';

export default function TextShadowControl({ effect, updateDeviceEffect }) {
  const textShadow = effect.textShadow || { xOffset: '', yOffset: '', blurRadius: '', color: '' };

  const updateTextShadow = (key, value) => {
    updateDeviceEffect('textShadow', { ...textShadow, [key]: value });
  };

  return (
    <PanelBody
			className='effect-child-controls'
      title={__('Text Shadow', 'axcelersblocks')}
      initialOpen={false}
    >
			<div className='two-columns'>
				<TextControl
					label={__('X Offset', 'axcelersblocks')}
					value={textShadow.xOffset || ''}
					onChange={(value) => updateTextShadow('xOffset', value)}
					placeholder="e.g., 1px"
				/>
				<TextControl
					label={__('Y Offset', 'axcelersblocks')}
					value={textShadow.yOffset || ''}
					onChange={(value) => updateTextShadow('yOffset', value)}
					placeholder="e.g., 1px"
				/>
			</div>
			<div className='two-columns'>
				<TextControl
					label={__('Blur Radius', 'axcelersblocks')}
					value={textShadow.blurRadius || ''}
					onChange={(value) => updateTextShadow('blurRadius', value)}
					placeholder="e.g., 2px"
				/>
			</div>
			<div className='two-columns'>
				<Dropdown
					className="text-shadow-color"
					position="bottom right"
					renderToggle={({ isOpen, onToggle }) => (
						<Button
							variant="secondary"
							onClick={onToggle}
							aria-expanded={isOpen}
						>
							<span style={{ background: textShadow.color || 'transparent' }}></span>
						</Button>
					)}
					renderContent={() => (
						<ColorPicker
							color={textShadow.color || '#000000'}
							onChangeComplete={(color) => updateTextShadow('color', color.hex)}
						/>
					)}
				/>
			</div>
    </PanelBody>
  );
}
