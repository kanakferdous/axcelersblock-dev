import { __ } from '@wordpress/i18n';
import { SelectControl, Button } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { image, close } from '@wordpress/icons';

export default function ImageLayerControls({ layer, onUpdate }) {
  const { url, id, position = 'center center', repeat = 'no-repeat', size = 'cover' } = layer;

  const positionOptions = [
    { value: 'top left', label: __('Top Left', 'axcelersblocks') },
    { value: 'top center', label: __('Top Center', 'axcelersblocks') },
    { value: 'top right', label: __('Top Right', 'axcelersblocks') },
    { value: 'center left', label: __('Center Left', 'axcelersblocks') },
    { value: 'center center', label: __('Center Center', 'axcelersblocks') },
    { value: 'center right', label: __('Center Right', 'axcelersblocks') },
    { value: 'bottom left', label: __('Bottom Left', 'axcelersblocks') },
    { value: 'bottom center', label: __('Bottom Center', 'axcelersblocks') },
    { value: 'bottom right', label: __('Bottom Right', 'axcelersblocks') },
  ];

  const repeatOptions = [
    { value: 'no-repeat', label: __('No Repeat', 'axcelersblocks') },
    { value: 'repeat', label: __('Repeat', 'axcelersblocks') },
    { value: 'repeat-x', label: __('Repeat X', 'axcelersblocks') },
    { value: 'repeat-y', label: __('Repeat Y', 'axcelersblocks') },
  ];

  const sizeOptions = [
    { value: 'auto', label: __('Auto', 'axcelersblocks') },
    { value: 'cover', label: __('Cover', 'axcelersblocks') },
    { value: 'contain', label: __('Contain', 'axcelersblocks') },
  ];

  const onSelectImage = (media) => {
    if (media && media.url) {
      onUpdate({ ...layer, url: media.url, id: media.id });
    }
  };

  const onRemoveImage = () => {
    onUpdate({ ...layer, url: '', id: null });
  };

  return (
    <div className="background-layer-controls">
      <MediaUploadCheck>
        <div className="background-control__image">
          <label className="components-base-control__label">{__('Background Image', 'axcelersblocks')}</label>
          <MediaUpload
            onSelect={onSelectImage}
            allowedTypes={['image']}
            value={id}
            render={({ open }) => (
              <div>
                {!url ? (
                  <Button
                    variant="secondary"
                    onClick={open}
                    className="background-control__image-upload"
                    icon={image}
                  >
                    {__('Add Image', 'axcelersblocks')}
                  </Button>
                ) : (
                  <div className="background-control__image-preview">
                    <img
                      src={url}
                      alt={__('Background Image Preview', 'axcelersblocks')}
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    <Button
                      variant="secondary"
                      isDestructive
                      onClick={onRemoveImage}
                      icon={close}
                      className="background-control__image-remove"
                    >
                      {__('Remove Image', 'axcelersblocks')}
                    </Button>
                  </div>
                )}
              </div>
            )}
          />
        </div>
      </MediaUploadCheck>

      {url && (
        <>
          <SelectControl
            label={__('Background Position', 'axcelersblocks')}
            value={position}
            options={positionOptions}
            onChange={(value) => onUpdate({ ...layer, position: value })}
            className="background-control__position"
          />
          <SelectControl
            label={__('Background Repeat', 'axcelersblocks')}
            value={repeat}
            options={repeatOptions}
            onChange={(value) => onUpdate({ ...layer, repeat: value })}
            className="background-control__repeat"
          />
          <SelectControl
            label={__('Background Size', 'axcelersblocks')}
            value={size}
            options={sizeOptions}
            onChange={(value) => onUpdate({ ...layer, size: value })}
            className="background-control__size"
          />
        </>
      )}
    </div>
  );
}
