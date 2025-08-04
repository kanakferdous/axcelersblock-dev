import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useDevice } from '../../controls/DeviceContext';
import ColorControl from './ColorControl';
import LayerControl from './LayerControl';
import LayerList from './LayerList';
import { background } from '@wordpress/icons';

export default function BackgroundControl({ attributes, setAttributes }) {
  const { activeDevice } = useDevice();
  const [isEditing, setIsEditing] = useState(false); // Track if a layer is being edited
  const [editingIndex, setEditingIndex] = useState(null); // Track the index of the layer being edited

  // Initialize device-specific attributes with defaults
  const backgroundColor = attributes.backgroundColor || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const backgroundLayers = attributes.backgroundLayers || {
    desktop: [],
    tablet: [],
    mobile: [],
  };

  // Helper function to update device-specific attributes
  const updateDeviceAttribute = (attribute, value) => {
    setAttributes({
      [attribute]: {
        ...attributes[attribute],
        [activeDevice]: value,
      },
    });
  };

  // Handle starting edit mode
  const handleEditLayer = (index) => {
    setIsEditing(true);
    setEditingIndex(index);
  };

  // Handle canceling edit mode
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingIndex(null);
  };

  return (
    <PanelBody
      className="background-controls-wrapper"
      title={
        <span className="title">
          {background}
          {__('Background', 'axcelersblocks')}
        </span>
      }
      initialOpen={false}
    >
      <ColorControl
        backgroundColor={backgroundColor}
        updateDeviceAttribute={updateDeviceAttribute}
        activeDevice={activeDevice}
      />
      <LayerList
        layers={backgroundLayers[activeDevice] || []}
        activeDevice={activeDevice}
        onUpdateLayers={(newLayers) => updateDeviceAttribute('backgroundLayers', newLayers)}
        onEditLayer={handleEditLayer}
      />
      <LayerControl
        layers={backgroundLayers[activeDevice] || []}
        activeDevice={activeDevice}
        onUpdateLayers={(newLayers) => updateDeviceAttribute('backgroundLayers', newLayers)}
        onEditLayer={handleEditLayer}
        onCancelEdit={handleCancelEdit}
        isEditing={isEditing}
        editingIndex={editingIndex}
      />
    </PanelBody>
  );
}
