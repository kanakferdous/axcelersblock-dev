import { __ } from '@wordpress/i18n';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { desktop, tablet, mobile } from '@wordpress/icons';
import { useEffect, useState } from '@wordpress/element';
import { useDevice } from '../DeviceContext';
import apiFetch from '@wordpress/api-fetch';

export default function ResponsiveControl({ renderControl }) {
  const { activeDevice, setActiveDevice } = useDevice();
  const [devices, setDevices] = useState({
    desktop: { name: 'Desktop', width: '100%' },
    tablet: { name: 'Tablet', width: '1024px' },
    mobile: { name: 'Mobile', width: '768px' },
  });

	// Fetch device settings on mount
	useEffect(() => {
		const loadDeviceSettings = async () => {
			try {
				const settings = await apiFetch({ path: '/axcelersblocks/v1/device-settings' });
				setDevices({
					desktop: {
						name: 'Desktop',
						width: '100%',
					},
					tablet: {
						name: settings.devices.tablet.name || 'Tablet',
						width: settings.devices.tablet.width || '1024px',
					},
					mobile: {
						name: settings.devices.mobile.name || 'Mobile',
						width: settings.devices.mobile.width || '768px',
					},
				});
			} catch (error) {
				console.error('Error fetching device settings:', error);
				// Fallback to default values
				setDevices({
					desktop: { name: 'Desktop', width: '100%' },
					tablet: { name: 'Tablet', width: '1024px' },
					mobile: { name: 'Mobile', width: '768px' },
				});
			}
		};
		loadDeviceSettings();
	}, []);

  // Adjust editor canvas width on device change
  useEffect(() => {
    const applyCanvasWidth = () => {
      const editorIframe = document.querySelector('iframe[name="editor-canvas"]');
      const width = devices[activeDevice]?.width || '100%';

      if (editorIframe) {
        const originalWidth = editorIframe.style.width || 'auto';
        editorIframe.style.width = width;
        editorIframe.style.marginLeft = 'auto';
        editorIframe.style.marginRight = 'auto';

        return () => {
          editorIframe.style.width = originalWidth;
          editorIframe.style.marginLeft = '';
          editorIframe.style.marginRight = '';
        };
      } else {
        const contentArea = document.querySelector('.interface-interface-skeleton__content');
        if (contentArea) {
          const originalWidth = contentArea.style.maxWidth || 'auto';
          contentArea.style.maxWidth = width;
          contentArea.style.marginLeft = 'auto';
          contentArea.style.marginRight = 'auto';

          return () => {
            contentArea.style.maxWidth = originalWidth;
            contentArea.style.marginLeft = '';
            contentArea.style.marginRight = '';
          };
        }
      }
    };

    const timeoutId = setTimeout(() => {
      const cleanup = applyCanvasWidth();
      return cleanup;
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [activeDevice, devices]);

  const handleDeviceChange = (newDevice) => {
    setActiveDevice(newDevice);
  };

  const numberOfDevices = Object.keys(devices).length;
  const buttonWidth = numberOfDevices > 0 ? `${100 / numberOfDevices}%` : '100%';

  return (
    <div className="axcelersblocks-responsive-control">
      <div className="axcelersblocks-responsive-header">
        <ToolbarGroup className="axcelersblocks-device-switcher">
          {Object.keys(devices).map((deviceKey) => (
            <div key={deviceKey} style={{ width: buttonWidth }}>
              <ToolbarButton
                icon={
                  deviceKey === 'desktop'
                    ? desktop
                    : deviceKey === 'tablet'
                    ? tablet
                    : mobile
                }
                isPressed={activeDevice === deviceKey}
                onClick={() => handleDeviceChange(deviceKey)}
              />
            </div>
          ))}
        </ToolbarGroup>
      </div>

      <div className="axcelersblocks-responsive-content">
        {renderControl && renderControl()}
      </div>
    </div>
  );
}
