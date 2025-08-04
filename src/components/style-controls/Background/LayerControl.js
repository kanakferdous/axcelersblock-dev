import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { SelectControl, Button } from '@wordpress/components';
import { plus } from '@wordpress/icons';
import ImageLayerControls from './ImageLayerControls';
import GradientLayerControls from './GradientLayerControls';
import OverlayLayerControls from './OverlayLayerControls';

export default function LayerControl({ layers, activeDevice, onUpdateLayers, onEditLayer, onCancelEdit, isEditing, editingIndex }) {
  const [isAddingLayer, setIsAddingLayer] = useState(false);
  const [newLayerType, setNewLayerType] = useState('');
  const [newLayer, setNewLayer] = useState({ type: '' });

  // Handle edit mode when editingIndex changes
  useEffect(() => {
    if (isEditing && editingIndex !== null) {
      const layerToEdit = layers[editingIndex];
      if (layerToEdit) {
        setIsAddingLayer(true);
        setNewLayerType(layerToEdit.type);
        setNewLayer(layerToEdit);
      } else {
        console.warn(`Layer at index ${editingIndex} not found in layers:`, layers);
      }
    }
  }, [isEditing, editingIndex, layers, activeDevice]);

  const typeOptions = [
    { value: '', label: __('Select Background Type', 'axcelersblocks') },
    { value: 'image', label: __('Image', 'axcelersblocks') },
    { value: 'gradient', label: __('Gradient', 'axcelersblocks') },
    { value: 'overlay', label: __('Overlay', 'axcelersblocks') },
    { value: 'none', label: __('None', 'axcelersblocks') },
  ];

  const handleAddLayer = () => {
    if (!newLayer.type && newLayerType !== 'none') return; // Don't add if no type is selected, except for 'none'
    const updatedLayers = [...layers];
    if (isEditing && editingIndex !== null) {
      updatedLayers[editingIndex] = { ...newLayer, type: newLayerType };
      onUpdateLayers(updatedLayers);
      onCancelEdit(); // Notify parent to clear editing state
    } else {
      updatedLayers.push({ ...newLayer, type: newLayerType });
      onUpdateLayers(updatedLayers);
    }
    setIsAddingLayer(false);
    setNewLayerType('');
    setNewLayer({ type: '' });
  };

  const handleCancel = () => {
    setIsAddingLayer(false);
    setNewLayerType('');
    setNewLayer({ type: '' });
    if (isEditing) {
      onCancelEdit(); // Notify parent to clear editing state
    }
  };

  const renderLayerControls = () => {
    switch (newLayerType) {
      case 'image':
        return (
          <ImageLayerControls
            layer={newLayer}
            onUpdate={setNewLayer}
          />
        );
      case 'gradient':
        return (
          <GradientLayerControls
            layer={newLayer}
            onUpdate={setNewLayer}
          />
        );
      case 'overlay':
        return (
          <OverlayLayerControls
            layer={newLayer}
            onUpdate={setNewLayer}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="background-layer-control">
      {!isAddingLayer ? (
        <Button
          variant="secondary"
          onClick={() => setIsAddingLayer(true)}
          icon={plus}
          className="background-control__add-layer"
        >
          {__('Add Background Layer', 'axcelersblocks')}
        </Button>
      ) : (
        <>
          <SelectControl
            label={__('Background Type', 'axcelersblocks')}
            value={newLayerType}
            options={typeOptions}
            onChange={(value) => {
              setNewLayerType(value);
              setNewLayer({ type: value });
            }}
            className="background-control__type-select"
            disabled={isEditing} // Disable type change when editing
          />
          {renderLayerControls()}
          {newLayerType && (
            <div className="background-layer-actions">
              <Button
                variant="primary"
                onClick={handleAddLayer}
                className="background-control__add-button"
              >
                {isEditing ? __('Update', 'axcelersblocks') : __('Add', 'axcelersblocks')}
              </Button>
              <Button
                variant="secondary"
                onClick={handleCancel}
                className="background-control__cancel-button"
              >
                {__('Cancel', 'axcelersblocks')}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
