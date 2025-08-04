import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';

// Hook to fetch device settings (client-side)
export function useDeviceSettings() {
  const [devices, setDevices] = useState({
    desktop: { media: '' },
    tablet: { media: '@media (max-width: 1024px)' },
    mobile: { media: '@media (max-width: 768px)' },
  });

  useEffect(() => {
    const loadDeviceSettings = async () => {
      try {
        const settings = await apiFetch({ path: '/axcelersblocks/v1/device-settings' });
        setDevices({
          desktop: { media: '' },
          tablet: { media: `@media (max-width: ${settings.devices.tablet.width || '1024px'})` },
          mobile: { media: `@media (max-width: ${settings.devices.mobile.width || '768px'})` },
        });
      } catch (error) {
        console.error('Error fetching device settings:', error);
        setDevices({
          desktop: { media: '' },
          tablet: { media: '@media (max-width: 1024px)' },
          mobile: { media: '@media (max-width: 768px)' },
        });
      }
    };
    loadDeviceSettings();
  }, []);

  return devices;
}

// Function to generate CSS rules (client-side)
export function generateBlockStyles(uniqueClass, devices, attributes) {
  const stylesCSS = [];
  const deviceStyles = {
    desktop: [],
    tablet: [],
    mobile: [],
  };
  const globalStyles = [];

  // Helper function to add a style rule to the appropriate device
  const addStyle = (device, property, value) => {
    if (value) {
      deviceStyles[device].push(`${property}: ${value};`);
    }
  };

	// Helper function to convert hex to RGB (for overlay layers)
	const hexToRgb = (hex) => {
		if (!hex || typeof hex !== 'string') return '0, 0, 0';
		const r = parseInt(hex.slice(1, 3), 16);
		const g = parseInt(hex.slice(3, 5), 16);
		const b = parseInt(hex.slice(5, 7), 16);
		return `${r}, ${g}, ${b}`;
	};

  // Generate styles for padding and margin
  const spacingTypes = [
    { type: 'padding', values: attributes.padding },
    { type: 'margin', values: attributes.margin },
  ];

  spacingTypes.forEach(({ type, values }) => {
    Object.keys(devices).forEach((device) => {
      const deviceValues = values?.[device] || {};
      const { isVHActive, isSidesAllActive, all, vertical, horizontal, top, right, bottom, left } = deviceValues;

      if (isVHActive && all) {
        // All sides linked: apply 'all' to all sides
        addStyle(device, `${type}-top`, all);
        addStyle(device, `${type}-right`, all);
        addStyle(device, `${type}-bottom`, all);
        addStyle(device, `${type}-left`, all);
      } else if (isSidesAllActive && (vertical || horizontal)) {
        // Vertical/Horizontal mode: apply vertical to top/bottom, horizontal to left/right
        if (vertical) {
          addStyle(device, `${type}-top`, vertical);
          addStyle(device, `${type}-bottom`, vertical);
        }
        if (horizontal) {
          addStyle(device, `${type}-right`, horizontal);
          addStyle(device, `${type}-left`, horizontal);
        }
      } else {
        // Individual sides: apply top, right, bottom, left
        addStyle(device, `${type}-top`, top);
        addStyle(device, `${type}-right`, right);
        addStyle(device, `${type}-bottom`, bottom);
        addStyle(device, `${type}-left`, left);
      }
    });
  });

  // Generate styles for display
  Object.keys(devices).forEach((device) => {
    const deviceDisplay = attributes.display?.[device];
    addStyle(device, 'display', deviceDisplay);
  });

	// Generate styles for layout attributes (alignItems, justifyContent, justifyItems, justifySelf, alignSelf)
	const layoutAttributes = [
		{ property: 'align-items', value: attributes.alignItems },
		{ property: 'justify-content', value: attributes.justifyContent },
		{ property: 'justify-items', value: attributes.justifyItems },
		{ property: 'justify-self', value: attributes.justifySelf },
		{ property: 'align-self', value: attributes.alignSelf },
	];

	layoutAttributes.forEach(({ property, value }) => {
		Object.keys(devices).forEach((device) => {
			const deviceValue = value?.[device];
			addStyle(device, property, deviceValue);
		});
	});

	// Generate styles for grid attributes (gridTemplateColumns, gridTemplateRows, columnGap, rowGap, gridAutoFlow, gridColumn, gridRow, order)
	const gridAttributes = [
		{ property: 'grid-template-columns', value: attributes.gridTemplateColumns },
		{ property: 'grid-template-rows', value: attributes.gridTemplateRows },
		{ property: 'column-gap', value: attributes.columnGap },
		{ property: 'row-gap', value: attributes.rowGap },
		{ property: 'grid-auto-flow', value: attributes.gridAutoFlow },
		{ property: 'grid-column', value: attributes.gridColumn },
		{ property: 'grid-row', value: attributes.gridRow },
		{ property: 'order', value: attributes.order },
	];

	gridAttributes.forEach(({ property, value }) => {
		Object.keys(devices).forEach((device) => {
			const deviceValue = value?.[device];
			addStyle(device, property, deviceValue);
		});
	});

	// Generate styles for flex attributes (flexDirection, flexWrap, flexGrow, flexShrink, flexBasis)
	const flexAttributes = [
		{ property: 'flex-direction', value: attributes.flexDirection },
		{ property: 'flex-wrap', value: attributes.flexWrap },
		{ property: 'flex-grow', value: attributes.flexGrow },
		{ property: 'flex-shrink', value: attributes.flexShrink },
		{ property: 'flex-basis', value: attributes.flexBasis },
	];

	flexAttributes.forEach(({ property, value }) => {
		Object.keys(devices).forEach((device) => {
			const deviceValue = value?.[device];
			addStyle(device, property, deviceValue);
		});
	});

	// Generate styles for float attributes (float, clear) - Corrected JavaScript syntax
	const floatAttributes = [
		{ property: 'float', value: attributes.float },
		{ property: 'clear', value: attributes.clear },
	];

	floatAttributes.forEach(({ property, value }) => {
		Object.keys(devices).forEach((device) => {
			const deviceValue = value?.[device] || '';
			addStyle(device, property, deviceValue);
		});
	});

	// Generate styles for sizing attributes (width, height, minWidth, minHeight, maxWidth, maxHeight, aspectRatio)
	const sizingAttributes = [
		{ property: 'width', value: attributes.width },
		{ property: 'height', value: attributes.height },
		{ property: 'min-width', value: attributes.minWidth },
		{ property: 'min-height', value: attributes.minHeight },
		{ property: 'max-width', value: attributes.maxWidth },
		{ property: 'max-height', value: attributes.maxHeight },
		{ property: 'aspect-ratio', value: attributes.aspectRatio },
	];

	sizingAttributes.forEach(({ property, value }) => {
		Object.keys(devices).forEach((device) => {
			const deviceValue = value?.[device] || '';
			addStyle(device, property, deviceValue);
		});
	});

	// Generate styles for typography attributes (textColor, fontSize, fontWeight, fontStyle, textAlign, textTransform, textDecoration, lineHeight, letterSpacing, fontFamily)
	const typographyAttributes = [
		{ property: 'color', value: attributes.textColor },
		{ property: 'font-size', value: attributes.fontSize },
		{ property: 'font-weight', value: attributes.fontWeight },
		{ property: 'font-style', value: attributes.fontStyle },
		{ property: 'text-align', value: attributes.textAlign },
		{ property: 'text-transform', value: attributes.textTransform },
		{ property: 'text-decoration', value: attributes.textDecoration },
		{ property: 'line-height', value: attributes.lineHeight },
		{ property: 'letter-spacing', value: attributes.letterSpacing },
		{ property: 'font-family', value: attributes.fontFamily },
	];

	typographyAttributes.forEach(({ property, value }) => {
		Object.keys(devices).forEach((device) => {
			const deviceValue = value?.[device] || '';
			addStyle(device, property, deviceValue);
		});
	});

	// Generate styles for background attributes (backgroundColor, backgroundLayers)
	const backgroundAttributes = [
		{ property: 'background-color', value: attributes.backgroundColor },
		{
			property: 'background-image',
			value: attributes.backgroundLayers,
			transform: (layers) => {
				if (!Array.isArray(layers)) return '';
				return layers
					.map((layer) => {
						switch (layer?.type) {
							case 'image':
								return layer.url
									? `url(${layer.url})`
									: '';
							case 'gradient':
								return layer.gradient || '';
							case 'overlay':
								return layer.color
									? `linear-gradient(to left, rgba(${hexToRgb(layer.color)}, ${layer.opacity || 0.5}) 0%, rgba(${hexToRgb(layer.color)}, ${layer.opacity || 0.5}) 100%)`
									: '';
							case 'none':
								return 'none';
							default:
								return '';
						}
					})
					.filter(Boolean)
					.join(', ') || '';
			},
		},
		{
			property: 'background-position',
			value: attributes.backgroundLayers,
			transform: (layers) => {
				if (!Array.isArray(layers)) return '';
				return layers
					.map((layer) => {
						switch (layer?.type) {
							case 'image':
								return layer.position || 'center center';
							case 'gradient':
							case 'overlay':
							case 'none':
								return '';
							default:
								return '';
						}
					})
					.filter(Boolean)
					.join(', ') || '';
			},
		},
		{
			property: 'background-size',
			value: attributes.backgroundLayers,
			transform: (layers) => {
				if (!Array.isArray(layers)) return '';
				return layers
					.map((layer) => {
						switch (layer?.type) {
							case 'image':
								return layer.size || 'cover';
							case 'gradient':
							case 'overlay':
							case 'none':
								return '';
							default:
								return '';
						}
					})
					.filter(Boolean)
					.join(', ') || '';
			},
		},
		{
			property: 'background-repeat',
			value: attributes.backgroundLayers,
			transform: (layers) => {
				if (!Array.isArray(layers)) return '';
				return layers
					.map((layer) => {
						switch (layer?.type) {
							case 'image':
								return layer.repeat || 'no-repeat';
							case 'gradient':
							case 'overlay':
							case 'none':
								return '';
							default:
								return '';
						}
					})
					.filter(Boolean)
					.join(', ') || '';
			},
		},
	];

	backgroundAttributes.forEach(({ property, value, transform }) => {
		Object.keys(devices).forEach((device) => {
			let deviceValue = value?.[device];
			if (transform) {
				deviceValue = transform(deviceValue);
			} else {
				deviceValue = deviceValue || '';
			}
			addStyle(device, property, deviceValue);
		});
	});

  // Generate styles for border attributes
  const borderAttributes = [
    {
      property: 'border-width',
      value: attributes.border,
      transform: (border) => {
        if (!border) return null;
        if (border.isLinkActive) {
          return border.width || null;
        }
        return null; // Handled by individual side properties
      },
    },
    {
      property: 'border-style',
      value: attributes.border,
      transform: (border) => {
        if (!border) return null;
        if (border.isLinkActive) {
          return border.style || null;
        }
        return null; // Handled by individual side properties
      },
    },
    {
      property: 'border-color',
      value: attributes.border,
      transform: (border) => {
        if (!border) return null;
        if (border.isLinkActive) {
          return border.color || null;
        }
        return null; // Handled by individual side properties
      },
    },
    {
      property: 'border-radius',
      value: attributes.borderRadius,
      transform: (borderRadius) => {
        if (!borderRadius) return null;
        if (borderRadius.isLinkActive) {
          return borderRadius.value || null;
        }
        return null; // Handled by individual corner properties
      },
    },
  ];

  borderAttributes.forEach(({ property, value, transform }) => {
    Object.keys(devices).forEach((device) => {
      let deviceValue = value?.[device];
      if (transform) {
        deviceValue = transform(deviceValue);
      } else {
        deviceValue = deviceValue || '';
      }
      if (deviceValue !== null) {
        addStyle(device, property, deviceValue);
      }
    });
  });

  // Generate individual border side properties for unlinked state
  Object.keys(devices).forEach((device) => {
    const border = attributes.border?.[device] || { sides: {}, isLinkActive: true };
    if (!border.isLinkActive) {
      const sides = ['top', 'right', 'bottom', 'left'];
      sides.forEach((side) => {
        const sideData = border.sides?.[side] || {};
        if (sideData.width) {
          addStyle(device, `border-${side}-width`, sideData.width);
        }
        if (sideData.style) {
          addStyle(device, `border-${side}-style`, sideData.style);
        }
        if (sideData.color) {
          addStyle(device, `border-${side}-color`, sideData.color);
        }
      });
    }
  });

  // Generate individual border radius corner properties for unlinked state
  Object.keys(devices).forEach((device) => {
    const borderRadius = attributes.borderRadius?.[device] || { corners: {}, isLinkActive: true };
    if (!borderRadius.isLinkActive) {
      const corners = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];
      corners.forEach((corner) => {
        const cornerValue = borderRadius.corners?.[corner];
        if (cornerValue) {
          const cssCorner = corner.replace('top-left', 'top-left-radius').replace('top-right', 'top-right-radius').replace('bottom-right', 'bottom-right-radius').replace('bottom-left', 'bottom-left-radius');
          addStyle(device, `border-${cssCorner}`, cornerValue);
        }
      });
    }
  });

  // Generate styles for position attributes (position, inset, overflow-x, overflow-y, z-index)
  const positionAttributes = [
    {
      property: 'position',
      value: attributes.position,
      transform: (position) => position || null,
    },
    {
      property: 'top',
      value: attributes.inset,
      transform: (inset) => inset?.top || null,
    },
    {
      property: 'right',
      value: attributes.inset,
      transform: (inset) => inset?.right || null,
    },
    {
      property: 'bottom',
      value: attributes.inset,
      transform: (inset) => inset?.bottom || null,
    },
    {
      property: 'left',
      value: attributes.inset,
      transform: (inset) => inset?.left || null,
    },
    {
      property: 'overflow-x',
      value: attributes.overflowX,
      transform: (overflowX) => overflowX || null,
    },
    {
      property: 'overflow-y',
      value: attributes.overflowY,
      transform: (overflowY) => overflowY || null,
    },
    {
      property: 'z-index',
      value: attributes.zIndex,
      transform: (zIndex) => zIndex || null,
    },
  ];

  positionAttributes.forEach(({ property, value, transform }) => {
    Object.keys(devices).forEach((device) => {
      let deviceValue = value?.[device];
      if (transform) {
        deviceValue = transform(deviceValue);
      }
      if (deviceValue !== null && deviceValue !== '') {
        addStyle(device, property, deviceValue);
      }
    });
  });

  // Generate styles for effect attributes (box-shadow, transition, filter, text-shadow, transform, opacity, visibility)
  const effectAttributes = [
    {
      property: 'box-shadow',
      value: attributes.effect,
      transform: (effect) => {
        if (!effect || !effect.boxShadow) return null;
        const { xOffset, yOffset, blurRadius, spreadRadius, color, inset } = effect.boxShadow;
        const x = xOffset || '0px';
        const y = yOffset || '0px';
        const blur = blurRadius || '0px';
        const spread = spreadRadius || '0px';
        const col = color || 'transparent';
        const ins = inset ? 'inset ' : '';
        if (x === '0px' && y === '0px' && blur === '0px' && spread === '0px' && col === 'transparent' && !ins) return null;
        return `${ins}${x} ${y} ${blur} ${spread} ${col}`;
      },
    },
    {
      property: 'transition',
      value: attributes.effect,
      transform: (effect) => {
        if (!effect || !effect.transition) return null;
        const { property, duration, timingFunction, delay } = effect.transition;
        const prop = property || 'all';
        const dur = duration || '0s';
        const timing = timingFunction || 'ease';
        const del = delay || '0s';
        if (prop === 'all' && dur === '0s' && timing === 'ease' && del === '0s') return null;
        return `${prop} ${dur} ${timing} ${del}`;
      },
    },
    {
      property: 'filter',
      value: attributes.effect,
      transform: (effect) => {
        if (!effect || !effect.filter) return null;
        const { blur, brightness, contrast, grayscale, hueRotate, invert, opacity, saturate, sepia } = effect.filter;
        const filters = [];
        if (blur) filters.push(`blur(${blur})`);
        if (brightness && brightness !== '100%') filters.push(`brightness(${brightness})`);
        if (contrast && contrast !== '100%') filters.push(`contrast(${contrast})`);
        if (grayscale && grayscale !== '0%') filters.push(`grayscale(${grayscale})`);
        if (hueRotate && hueRotate !== '0deg') filters.push(`hue-rotate(${hueRotate})`);
        if (invert && invert !== '0%') filters.push(`invert(${invert})`);
        if (opacity && opacity !== '100%') filters.push(`opacity(${opacity})`);
        if (saturate && saturate !== '100%') filters.push(`saturate(${saturate})`);
        if (sepia && sepia !== '0%') filters.push(`sepia(${sepia})`);
        return filters.length > 0 ? filters.join(' ') : null;
      },
    },
    {
      property: 'text-shadow',
      value: attributes.effect,
      transform: (effect) => {
        if (!effect || !effect.textShadow) return null;
        const { xOffset, yOffset, blurRadius, color } = effect.textShadow;
        const x = xOffset || '0px';
        const y = yOffset || '0px';
        const blur = blurRadius || '0px';
        const col = color || 'transparent';
        if (x === '0px' && y === '0px' && blur === '0px' && col === 'transparent') return null;
        return `${x} ${y} ${blur} ${col}`;
      },
    },
    {
      property: 'transform',
      value: attributes.effect,
      transform: (effect) => {
        if (!effect || !effect.transform) return null;
        const { translateX, translateY, scaleX, scaleY, rotate, skewX, skewY } = effect.transform;
        const transforms = [];
        if (translateX || translateY) transforms.push(`translate(${translateX || '0px'}, ${translateY || '0px'})`);
        if (scaleX) transforms.push(`scaleX(${scaleX})`);
        if (scaleY) transforms.push(`scaleY(${scaleY})`);
        if (rotate) transforms.push(`rotate(${rotate})`);
        if (skewX) transforms.push(`skewX(${skewX})`);
        if (skewY) transforms.push(`skewY(${skewY})`);
        return transforms.length > 0 ? transforms.join(' ') : null;
      },
    },
    {
      property: 'opacity',
      value: attributes.effect,
      transform: (effect) => effect?.opacity && effect.opacity !== '1' ? effect.opacity : null,
    },
    {
      property: 'visibility',
      value: attributes.effect,
      transform: (effect) => effect?.visibility && effect.visibility !== 'visible' ? effect.visibility : null,
    },
  ];

  effectAttributes.forEach(({ property, value, transform }) => {
    Object.keys(devices).forEach((device) => {
      let deviceValue = value?.[device];
      if (transform) {
        deviceValue = transform(deviceValue);
      }
      if (deviceValue !== null && deviceValue !== '') {
        addStyle(device, property, deviceValue);
      }
    });
  });

  // Generate global styles (not device-specific)
  if (attributes.iconColor) {
    globalStyles.push(`.${uniqueClass} .heading-icon { color: ${attributes.iconColor}; }`);
  }

	// Add custom CSS as a raw string without uniqueClass scoping
	if (attributes.customCss && attributes.customCss.trim()) {
		stylesCSS.push(attributes.customCss);
	}

  // Combine styles for each device
  Object.keys(devices).forEach((device) => {
    const styles = deviceStyles[device];
    if (styles.length > 0) {
      const selector = `.${uniqueClass}`;
      const css = styles.join(' ');
      if (devices[device].media) {
        stylesCSS.push(`${devices[device].media} { ${selector} { ${css} } }`);
      } else {
        stylesCSS.push(`${selector} { ${css} }`);
      }
    }
  });

  // Add global styles
  if (globalStyles.length > 0) {
    stylesCSS.push(...globalStyles);
  }

  return stylesCSS.join('\n');
}
