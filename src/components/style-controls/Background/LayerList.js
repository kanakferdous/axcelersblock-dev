import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { chevronUp, chevronDown, trash, edit } from '@wordpress/icons';

export default function LayerList({ layers, activeDevice, onUpdateLayers, onEditLayer }) {
  // Move a layer up in the list
  const moveLayerUp = (index) => {
    if (index === 0) return; // Already at the top
    const newLayers = [...layers];
    const temp = newLayers[index];
    newLayers[index] = newLayers[index - 1];
    newLayers[index - 1] = temp;
    console.log(`Moving layer up from index ${index} to ${index - 1} on device: ${activeDevice}`);
    onUpdateLayers(newLayers);
  };

  // Move a layer down in the list
  const moveLayerDown = (index) => {
    if (index === layers.length - 1) return; // Already at the bottom
    const newLayers = [...layers];
    const temp = newLayers[index];
    newLayers[index] = newLayers[index + 1];
    newLayers[index + 1] = temp;
    console.log(`Moving layer down from index ${index} to ${index + 1} on device: ${activeDevice}`);
    onUpdateLayers(newLayers);
  };

  // Remove a layer from the list
  const removeLayer = (index) => {
    const newLayers = layers.filter((_, i) => i !== index);
    console.log(`Removing layer at index ${index} on device: ${activeDevice}`);
    onUpdateLayers(newLayers);
  };

  // Handle edit button click
  const handleEdit = (index) => {
    console.log(`Editing layer at index ${index} on device: ${activeDevice}`);
    onEditLayer(index);
  };

	// Generate a display name for the layer
	const getLayerName = (layer) => {
		switch (layer.type) {
			case 'image':
				return `${__('Background: Image', 'axcelersblocks')}${layer.url ? ` (${layer.url.split('/').pop()})` : ''}`;
			case 'gradient':
				return `${__('Background: Gradient', 'axcelersblocks')}${layer.gradient ? ` (${layer.gradient.slice(0, 20)}...)` : ''}`;
			case 'overlay':
				return `${__('Background: Overlay', 'axcelersblocks')}${layer.color ? ` (${layer.color})` : ''}`;
			case 'none':
				return __('Background: None', 'axcelersblocks');
			default:
				return __('Background: Unknown', 'axcelersblocks');
		}
	};

  return (
    <div className="background-layer-list">
      {layers.length > 0 ? (
        layers.map((layer, index) => (
          <div key={index} className="background-layer-item">
            <span>{getLayerName(layer)}</span>
            <div className="background-layer-actions">
              <Button
                icon={chevronUp}
                onClick={() => moveLayerUp(index)}
                disabled={index === 0}
                label={__('Move Up', 'axcelersblocks')}
              />
              <Button
                icon={chevronDown}
                onClick={() => moveLayerDown(index)}
                disabled={index === layers.length - 1}
                label={__('Move Down', 'axcelersblocks')}
              />
              <Button
                icon={edit}
                onClick={() => handleEdit(index)}
                label={__('Edit', 'axcelersblocks')}
              />
              <Button
                icon={trash}
                onClick={() => removeLayer(index)}
                label={__('Remove', 'axcelersblocks')}
                isDestructive
              />
            </div>
          </div>
        ))
      ) : (
        <p>{__('No background layers added.', 'axcelersblocks')}</p>
      )}
    </div>
  );
}
