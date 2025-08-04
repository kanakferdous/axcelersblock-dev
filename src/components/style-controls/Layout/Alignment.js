import { __ } from '@wordpress/i18n';
import { PanelBody, ButtonGroup, Button } from '@wordpress/components';
import AlignStart from '../icons/AlignStart';
import AlignCenter from '../icons/AlignCenter';
import AlignBottom from '../icons/AlignBottom';
import AlignStretch from '../icons/AlignStretch';
import AlignBaseline from '../icons/AlignBaseline';
import JustifyStart from '../icons/JustifyStart';
import JustifyCenter from '../icons/JustifyCenter';
import JustifyEnd from '../icons/JustifyEnd';
import JustifyBetween from '../icons/JustifyBetween';
import JustifyAround from '../icons/JustifyAround';

export default function Alignment({ activeDevice, alignItems, justifyContent, justifyItems, justifySelf, alignSelf, updateDeviceAttribute, }) {
  const handleAlignItemsChange = (value) => {
    updateDeviceAttribute('alignItems', value);
  };

  const handleJustifyContentChange = (value) => {
    updateDeviceAttribute('justifyContent', value);
  };

  const handleJustifyItemsChange = (value) => {
    updateDeviceAttribute('justifyItems', value);
  };

  const handleJustifySelfChange = (value) => {
    updateDeviceAttribute('justifySelf', value);
  };

  const handleAlignSelfChange = (value) => {
    updateDeviceAttribute('alignSelf', value);
  };

  return (
    <PanelBody
			className='alignment-control'
      title={__('Alignment', 'axcelersblocks')}
      initialOpen={false}
    >
      <div className="axcelersblocks-alignment-control align-items">
        <label>{__('Align Items', 'axcelersblocks')}</label>
        <ButtonGroup>
          <Button
						icon={<AlignStart />}
            isPressed={alignItems[activeDevice] === 'start'}
            onClick={() => handleAlignItemsChange('start')}
            label={__('Start', 'axcelersblocks')}
          />
          <Button
						icon={<AlignCenter />}
            isPressed={alignItems[activeDevice] === 'center'}
            onClick={() => handleAlignItemsChange('center')}
            label={__('Center', 'axcelersblocks')}
          />
          <Button
						icon={<AlignBottom />}
            isPressed={alignItems[activeDevice] === 'end'}
            onClick={() => handleAlignItemsChange('end')}
            label={__('End', 'axcelersblocks')}
          />
          <Button
						icon={<AlignStretch />}
            isPressed={alignItems[activeDevice] === 'stretch'}
            onClick={() => handleAlignItemsChange('stretch')}
            label={__('Strech', 'axcelersblocks')}
          />
					<Button
						icon={<AlignBaseline />}
            isPressed={alignItems[activeDevice] === 'baseline'}
            onClick={() => handleAlignItemsChange('baseline')}
            label={__('Baseline', 'axcelersblocks')}
          />
          <Button
						className='reset-btn'
            isPressed={alignItems[activeDevice] === ''}
            onClick={() => handleAlignItemsChange('')}
            label={__('Reset', 'axcelersblocks')}
          >
            {__('Reset', 'axcelersblocks')}
          </Button>
        </ButtonGroup>
      </div>

      <div className="axcelersblocks-alignment-control justify-content">
        <label>{__('Justify Content', 'axcelersblocks')}</label>
        <ButtonGroup>
          <Button
						icon={<JustifyStart />}
            isPressed={justifyContent[activeDevice] === 'start'}
            onClick={() => handleJustifyContentChange('start')}
            label={__('Start', 'axcelersblocks')}
          />
          <Button
						icon={<JustifyCenter />}
            isPressed={justifyContent[activeDevice] === 'center'}
            onClick={() => handleJustifyContentChange('center')}
            label={__('Center', 'axcelersblocks')}
          />
          <Button
						icon={<JustifyEnd />}
            isPressed={justifyContent[activeDevice] === 'end'}
            onClick={() => handleJustifyContentChange('end')}
            label={__('End', 'axcelersblocks')}
          />
          <Button
						icon={<JustifyBetween />}
            isPressed={justifyContent[activeDevice] === 'space-between'}
            onClick={() => handleJustifyContentChange('space-between')}
            label={__('Space Between', 'axcelersblocks')}
          />
          <Button
						icon={<JustifyAround />}
            isPressed={justifyContent[activeDevice] === 'space-around'}
            onClick={() => handleJustifyContentChange('space-around')}
            label={__('Space Around', 'axcelersblocks')}
          />
          <Button
						className='reset-btn'
            isPressed={justifyContent[activeDevice] === ''}
            onClick={() => handleJustifyContentChange('')}
            label={__('Reset', 'axcelersblocks')}
          >
            {__('Reset', 'axcelersblocks')}
          </Button>
        </ButtonGroup>
      </div>

      <div className="axcelersblocks-alignment-control justify-items">
        <label>{__('Justify Items', 'axcelersblocks')}</label>
        <ButtonGroup>
          <Button
            isPressed={justifyItems[activeDevice] === 'start'}
            onClick={() => handleJustifyItemsChange('start')}
            label={__('Start', 'axcelersblocks')}
          >
						{__('Start', 'axcelersblocks')}
          </Button>
          <Button
            isPressed={justifyItems[activeDevice] === 'center'}
            onClick={() => handleJustifyItemsChange('center')}
            label={__('Center', 'axcelersblocks')}
          >
						{__('Center', 'axcelersblocks')}
          </Button>
          <Button
            isPressed={justifyItems[activeDevice] === 'end'}
            onClick={() => handleJustifyItemsChange('end')}
            label={__('End', 'axcelersblocks')}
          >
						{__('End', 'axcelersblocks')}
					</Button>
          <Button
            isPressed={justifyItems[activeDevice] === 'stretch'}
            onClick={() => handleJustifyItemsChange('stretch')}
            label={__('Stretch', 'axcelersblocks')}
          >
						{__('Stretch', 'axcelersblocks')}
					</Button>
          <Button
						className='reset-btn'
            isPressed={justifyItems[activeDevice] === ''}
            onClick={() => handleJustifyItemsChange('')}
            label={__('Reset', 'axcelersblocks')}
          >
            {__('Reset', 'axcelersblocks')}
          </Button>
        </ButtonGroup>
      </div>

      <div className="axcelersblocks-alignment-control justify-self">
        <label>{__('Justify Self', 'axcelersblocks')}</label>
        <ButtonGroup>
          <Button
            isPressed={justifySelf[activeDevice] === 'start'}
            onClick={() => handleJustifySelfChange('start')}
            label={__('Start', 'axcelersblocks')}
          >
            {__('Start', 'axcelersblocks')}
					</Button>
          <Button
            isPressed={justifySelf[activeDevice] === 'center'}
            onClick={() => handleJustifySelfChange('center')}
            label={__('Center', 'axcelersblocks')}
          >
						{__('Center', 'axcelersblocks')}
					</Button>
          <Button
            isPressed={justifySelf[activeDevice] === 'end'}
            onClick={() => handleJustifySelfChange('end')}
            label={__('End', 'axcelersblocks')}
          >
						{__('End', 'axcelersblocks')}
					</Button>
          <Button
            isPressed={justifySelf[activeDevice] === 'stretch'}
            onClick={() => handleJustifySelfChange('stretch')}
            label={__('Stretch', 'axcelersblocks')}
          >
						{__('Stretch', 'axcelersblocks')}
					</Button>
          <Button
						className='reset-btn'
            isPressed={justifySelf[activeDevice] === ''}
            onClick={() => handleJustifySelfChange('')}
            label={__('Reset', 'axcelersblocks')}
          >
            {__('Reset', 'axcelersblocks')}
          </Button>
        </ButtonGroup>
      </div>

      <div className="axcelersblocks-alignment-control align-self">
        <label>{__('Align Self', 'axcelersblocks')}</label>
        <ButtonGroup>
          <Button
            isPressed={alignSelf[activeDevice] === 'start'}
            onClick={() => handleAlignSelfChange('start')}
            label={__('Start', 'axcelersblocks')}
          >
            {__('Start', 'axcelersblocks')}
					</Button>
          <Button
            isPressed={alignSelf[activeDevice] === 'center'}
            onClick={() => handleAlignSelfChange('center')}
            label={__('Center', 'axcelersblocks')}
          >
						{__('Center', 'axcelersblocks')}
					</Button>
          <Button
            isPressed={alignSelf[activeDevice] === 'end'}
            onClick={() => handleAlignSelfChange('end')}
            label={__('End', 'axcelersblocks')}
          >
						{__('End', 'axcelersblocks')}
					</Button>
          <Button
            isPressed={alignSelf[activeDevice] === 'stretch'}
            onClick={() => handleAlignSelfChange('stretch')}
            label={__('Stretch', 'axcelersblocks')}
          >
						{__('Stretch', 'axcelersblocks')}
					</Button>
          <Button
						className='reset-btn'
            isPressed={alignSelf[activeDevice] === ''}
            onClick={() => handleAlignSelfChange('')}
            label={__('Reset', 'axcelersblocks')}
          >
            {__('Reset', 'axcelersblocks')}
          </Button>
        </ButtonGroup>
      </div>
    </PanelBody>
  );
}
