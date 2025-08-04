<?php
	/**
	 * Render callback for the AxcelersBlocks Heading block.
	 *
	 * @package AxcelersBlocks
	 */

	// Extract and sanitize attributes
	$tag_name       = $attributes['tagName'] ?? 'h2';
	$icon_html      = '';
	$icon_loc       = $attributes['iconLocation'] ?? 'before';
	$link_option    = $attributes['linkOption'] ?? 'none';
	$custom_link    = isset( $attributes['customLink'] ) ? esc_url( $attributes['customLink'] ) : '';
	$anchor         = isset( $attributes['anchor'] ) ? sanitize_title( $attributes['anchor'] ) : '';
	$unique_class   = isset( $attributes['uniqueClass'] ) ? sanitize_html_class( $attributes['uniqueClass'] ) : '';

	// Define wrapper attributes with a fallback
	$wrapper_attrs = get_block_wrapper_attributes( [
		'class' => trim( 'axcelersblocks-heading__text ' . $unique_class ),
		'id'    => $anchor ?: null,
	] ) ?: '';

	// Fetch device settings from options (widths are set via the AxcelersBlocks settings page)
	$responsive_settings = get_option( 'axcelersblocks_responsive_settings' );

	// Define devices with media queries
	$devices = [
		'desktop' => ['media' => ''],
		'tablet'  => ['media' => '@media (max-width: ' . esc_attr( $responsive_settings['devices']['tablet']['width'] ?? '1024px' ) . ')'],
		'mobile'  => ['media' => '@media (max-width: ' . esc_attr( $responsive_settings['devices']['mobile']['width'] ?? '768px' ) . ')'],
	];

	// Function to generate CSS styles
	$generate_styles = function ( $unique_class, $devices, $attributes ) {
		$styles_css = [];
		$device_styles = [
			'desktop' => [],
			'tablet'  => [],
			'mobile'  => [],
		];
		$global_styles = [];

		// Helper function to add a style rule to the appropriate device
		$add_style = function ( $device, $property, $value ) use ( &$device_styles ) {
			if ( ! empty( $value ) ) {
				$device_styles[ $device ][] = "$property: " . esc_attr( $value ) . ";";
			}
		};

		// Helper function to convert hex to RGB (for overlay layers)
		$hex_to_rgb = function ($hex) {
			if (empty($hex) || !is_string($hex)) return '0, 0, 0';
			$hex = ltrim($hex, '#');
			$r = hexdec(substr($hex, 0, 2));
			$g = hexdec(substr($hex, 2, 2));
			$b = hexdec(substr($hex, 4, 2));
			return "$r, $g, $b";
		};

		// Generate styles for padding and margin
		$spacing_types = [
			['type' => 'padding', 'values' => $attributes['padding'] ?? ['desktop' => [], 'tablet' => [], 'mobile' => []]],
			['type' => 'margin', 'values' => $attributes['margin'] ?? ['desktop' => [], 'tablet' => [], 'mobile' => []]],
		];

		foreach ( $spacing_types as $spacing ) {
			$type = $spacing['type'];
			$values = $spacing['values'];

			foreach ( $devices as $device => $config ) {
				$device_values = ! empty( $values[ $device ] ) ? $values[ $device ] : [];
				$is_vh_active = ! empty( $device_values['isVHActive'] );
				$is_sides_all_active = ! empty( $device_values['isSidesAllActive'] );
				$all = $device_values['all'] ?? '';
				$vertical = $device_values['vertical'] ?? '';
				$horizontal = $device_values['horizontal'] ?? '';
				$top = $device_values['top'] ?? '';
				$right = $device_values['right'] ?? '';
				$bottom = $device_values['bottom'] ?? '';
				$left = $device_values['left'] ?? '';

				if ( $is_vh_active && ! empty( $all ) ) {
					// All sides linked: apply 'all' to all sides
					$add_style( $device, "$type-top", $all );
					$add_style( $device, "$type-right", $all );
					$add_style( $device, "$type-bottom", $all );
					$add_style( $device, "$type-left", $all );
				} elseif ( $is_sides_all_active && ( ! empty( $vertical ) || ! empty( $horizontal ) ) ) {
					// Vertical/Horizontal mode: apply vertical to top/bottom, horizontal to left/right
					if ( ! empty( $vertical ) ) {
						$add_style( $device, "$type-top", $vertical );
						$add_style( $device, "$type-bottom", $vertical );
					}
					if ( ! empty( $horizontal ) ) {
						$add_style( $device, "$type-right", $horizontal );
						$add_style( $device, "$type-left", $horizontal );
					}
				} else {
					// Individual sides: apply top, right, bottom, left
					$add_style( $device, "$type-top", $top );
					$add_style( $device, "$type-right", $right );
					$add_style( $device, "$type-bottom", $bottom );
					$add_style( $device, "$type-left", $left );
				}
			}
		}

		// Generate styles for display
		foreach ( $devices as $device => $config ) {
			$device_display = ! empty( $attributes['display'][ $device ] ) ? $attributes['display'][ $device ] : '';
			$add_style( $device, 'display', $device_display );
		}

		// Generate styles for layout attributes (alignItems, justifyContent, justifyItems, justifySelf, alignSelf)
		$layout_attributes = [
			['property' => 'align-items', 'value' => $attributes['alignItems'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'justify-content', 'value' => $attributes['justifyContent'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'justify-items', 'value' => $attributes['justifyItems'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'justify-self', 'value' => $attributes['justifySelf'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'align-self', 'value' => $attributes['alignSelf'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
		];

		foreach ( $layout_attributes as $layout ) {
			$property = $layout['property'];
			$values = $layout['value'];

			foreach ( $devices as $device => $config ) {
				$device_value = ! empty( $values[ $device ] ) ? $values[ $device ] : '';
				$add_style( $device, $property, $device_value );
			}
		}

		// Generate styles for grid attributes (gridTemplateColumns, gridTemplateRows, columnGap, rowGap, gridAutoFlow, gridColumn, gridRow, order)
		$grid_attributes = [
			['property' => 'grid-template-columns', 'value' => $attributes['gridTemplateColumns'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'grid-template-rows', 'value' => $attributes['gridTemplateRows'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'column-gap', 'value' => $attributes['columnGap'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'row-gap', 'value' => $attributes['rowGap'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'grid-auto-flow', 'value' => $attributes['gridAutoFlow'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'grid-column', 'value' => $attributes['gridColumn'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'grid-row', 'value' => $attributes['gridRow'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'order', 'value' => $attributes['order'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
		];

		foreach ( $grid_attributes as $grid ) {
			$property = $grid['property'];
			$values = $grid['value'];

			foreach ( $devices as $device => $config ) {
				$device_value = ! empty( $values[ $device ] ) ? $values[ $device ] : '';
				$add_style( $device, $property, $device_value );
			}
		}

		// Generate styles for flex attributes (flexDirection, flexWrap, flexGrow, flexShrink, flexBasis)
		$flex_attributes = [
			['property' => 'flex-direction', 'value' => $attributes['flexDirection'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'flex-wrap', 'value' => $attributes['flexWrap'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'flex-grow', 'value' => $attributes['flexGrow'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'flex-shrink', 'value' => $attributes['flexShrink'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'flex-basis', 'value' => $attributes['flexBasis'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
		];

		foreach ( $flex_attributes as $flex ) {
			$property = $flex['property'];
			$values = $flex['value'];

			foreach ( $devices as $device => $config ) {
				$device_value = ! empty( $values[ $device ] ) ? $values[ $device ] : '';
				$add_style( $device, $property, $device_value );
			}
		}

		// Generate styles for float attributes (float, clear)
		$float_attributes = [
			['property' => 'float', 'value' => $attributes['float'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'clear', 'value' => $attributes['clear'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
		];

		foreach ( $float_attributes as $float ) {
			$property = $float['property'];
			$values = $float['value'];

			foreach ( $devices as $device => $config ) {
				$device_value = ! empty( $values[ $device ] ) ? $values[ $device ] : '';
				$add_style( $device, $property, $device_value );
			}
		}

		// Generate styles for sizing attributes (width, height, minWidth, minHeight, maxWidth, maxHeight, aspectRatio)
		$sizing_attributes = [
			['property' => 'width', 'value' => $attributes['width'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'height', 'value' => $attributes['height'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'min-width', 'value' => $attributes['minWidth'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'min-height', 'value' => $attributes['minHeight'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'max-width', 'value' => $attributes['maxWidth'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'max-height', 'value' => $attributes['maxHeight'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'aspect-ratio', 'value' => $attributes['aspectRatio'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
		];

		foreach ( $sizing_attributes as $sizing ) {
			$property = $sizing['property'];
			$values = $sizing['value'];

			foreach ( $devices as $device => $config ) {
				$device_value = ! empty( $values[ $device ] ) ? $values[ $device ] : '';
				$add_style( $device, $property, $device_value );
			}
		}

		// Generate styles for typography attributes (textColor, fontSize, fontWeight, fontStyle, textAlign, textTransform, textDecoration, lineHeight, letterSpacing, fontFamily)
		$typography_attributes = [
			['property' => 'color', 'value' => $attributes['textColor'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'font-size', 'value' => $attributes['fontSize'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'font-weight', 'value' => $attributes['fontWeight'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'font-style', 'value' => $attributes['fontStyle'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'text-align', 'value' => $attributes['textAlign'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'text-transform', 'value' => $attributes['textTransform'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'text-decoration', 'value' => $attributes['textDecoration'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'line-height', 'value' => $attributes['lineHeight'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'letter-spacing', 'value' => $attributes['letterSpacing'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			['property' => 'font-family', 'value' => $attributes['fontFamily'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
		];

		foreach ( $typography_attributes as $typography ) {
			$property = $typography['property'];
			$values = $typography['value'];

			foreach ( $devices as $device => $config ) {
				$device_value = ! empty( $values[ $device ] ) ? $values[ $device ] : '';
				$add_style( $device, $property, $device_value );
			}
		}

		// Generate styles for background attributes (backgroundColor, backgroundLayers)
		$background_attributes = [
			['property' => 'background-color', 'value' => $attributes['backgroundColor'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => '']],
			[
				'property' => 'background-image',
				'value' => $attributes['backgroundLayers'] ?? ['desktop' => [], 'tablet' => [], 'mobile' => []],
				'transform' => function ($layers) use ($hex_to_rgb) {
					if (!is_array($layers)) return '';
					return array_map(function ($layer) use ($hex_to_rgb) {
						switch ($layer['type'] ?? '') {
							case 'image':
								return !empty($layer['url'])
									? "url(" . esc_url($layer['url']) . ")"
									: '';
							case 'gradient':
								return !empty($layer['gradient'])
									? $layer['gradient']
									: '';
							case 'overlay':
								if (empty($layer['color'])) return '';
								$opacity = $layer['opacity'] ?? 0.5;
								$rgb = $hex_to_rgb($layer['color']);
								return "linear-gradient(to left, rgba($rgb, $opacity) 0%, rgba($rgb, $opacity) 100%)";
							case 'none':
								return 'none';
							default:
								return '';
						}
					}, $layers);
				},
			],
			[
				'property' => 'background-position',
				'value' => $attributes['backgroundLayers'] ?? ['desktop' => [], 'tablet' => [], 'mobile' => []],
				'transform' => function ($layers) {
					if (!is_array($layers)) return '';
					return array_map(function ($layer) {
						switch ($layer['type'] ?? '') {
							case 'image':
								return !empty($layer['position'])
									? $layer['position']
									: 'center center';
							case 'gradient':
							case 'overlay':
							case 'none':
								return '';
							default:
								return '';
						}
					}, $layers);
				},
			],
			[
				'property' => 'background-size',
				'value' => $attributes['backgroundLayers'] ?? ['desktop' => [], 'tablet' => [], 'mobile' => []],
				'transform' => function ($layers) {
					if (!is_array($layers)) return '';
					return array_map(function ($layer) {
						switch ($layer['type'] ?? '') {
							case 'image':
								return !empty($layer['size'])
									? $layer['size']
									: 'cover';
							case 'gradient':
							case 'overlay':
							case 'none':
								return '';
							default:
								return '';
						}
					}, $layers);
				},
			],
			[
				'property' => 'background-repeat',
				'value' => $attributes['backgroundLayers'] ?? ['desktop' => [], 'tablet' => [], 'mobile' => []],
				'transform' => function ($layers) {
					if (!is_array($layers)) return '';
					return array_map(function ($layer) {
						switch ($layer['type'] ?? '') {
							case 'image':
								return !empty($layer['repeat'])
									? $layer['repeat']
									: 'no-repeat';
							case 'gradient':
							case 'overlay':
							case 'none':
								return '';
							default:
								return '';
						}
					}, $layers);
				},
			],
		];

		foreach ($background_attributes as $background) {
			$property = $background['property'];
			$values = $background['value'];
			$transform = $background['transform'] ?? null;

			foreach ($devices as $device => $config) {
				$device_value = !empty($values[$device]) ? $values[$device] : ($property === 'background-image' ? [] : '');
				if ($transform) {
					$transformed_values = $transform($device_value);
					if (is_array($transformed_values)) {
						$device_value = !empty($transformed_values) ? implode(', ', array_filter($transformed_values)) : '';
					} else {
						$device_value = $transformed_values;
					}
				}
				$add_style($device, $property, $device_value);
			}
		}

		// Generate styles for border attributes (border-width, border-style, border-color, border-radius)
		$border_attributes = [
			[
				'property' => 'border-width',
				'value' => $attributes['border'] ?? ['desktop' => ['width' => '', 'style' => '', 'color' => '', 'sides' => [], 'isLinkActive' => true], 'tablet' => ['width' => '', 'style' => '', 'color' => '', 'sides' => [], 'isLinkActive' => true], 'mobile' => ['width' => '', 'style' => '', 'color' => '', 'sides' => [], 'isLinkActive' => true]],
				'transform' => function ($border) {
					if (empty($border)) return null;
					if (!empty($border['isLinkActive'])) {
						return !empty($border['width']) ? $border['width'] : null;
					}
					return null; // Handled by individual side properties
				},
			],
			[
				'property' => 'border-style',
				'value' => $attributes['border'] ?? ['desktop' => ['width' => '', 'style' => '', 'color' => '', 'sides' => [], 'isLinkActive' => true], 'tablet' => ['width' => '', 'style' => '', 'color' => '', 'sides' => [], 'isLinkActive' => true], 'mobile' => ['width' => '', 'style' => '', 'color' => '', 'sides' => [], 'isLinkActive' => true]],
				'transform' => function ($border) {
					if (empty($border)) return null;
					if (!empty($border['isLinkActive'])) {
						return !empty($border['style']) ? $border['style'] : null;
					}
					return null; // Handled by individual side properties
				},
			],
			[
				'property' => 'border-color',
				'value' => $attributes['border'] ?? ['desktop' => ['width' => '', 'style' => '', 'color' => '', 'sides' => [], 'isLinkActive' => true], 'tablet' => ['width' => '', 'style' => '', 'color' => '', 'sides' => [], 'isLinkActive' => true], 'mobile' => ['width' => '', 'style' => '', 'color' => '', 'sides' => [], 'isLinkActive' => true]],
				'transform' => function ($border) {
					if (empty($border)) return null;
					if (!empty($border['isLinkActive'])) {
						return !empty($border['color']) ? $border['color'] : null;
					}
					return null; // Handled by individual side properties
				},
			],
			[
				'property' => 'border-radius',
				'value' => $attributes['borderRadius'] ?? ['desktop' => ['value' => '', 'corners' => [], 'isLinkActive' => true], 'tablet' => ['value' => '', 'corners' => [], 'isLinkActive' => true], 'mobile' => ['value' => '', 'corners' => [], 'isLinkActive' => true]],
				'transform' => function ($borderRadius) {
					if (empty($borderRadius)) return null;
					if (!empty($borderRadius['isLinkActive'])) {
						return !empty($borderRadius['value']) ? $borderRadius['value'] : null;
					}
					return null; // Handled by individual corner properties
				},
			],
		];

		foreach ($border_attributes as $border) {
			$property = $border['property'];
			$values = $border['value'];
			$transform = $border['transform'] ?? null;

			foreach ($devices as $device => $config) {
				$device_value = !empty($values[$device]) ? $values[$device] : [];
				if ($transform) {
					$device_value = $transform($device_value);
				}
				if ($device_value !== null) {
					$add_style($device, $property, $device_value);
				}
			}
		}

		// Generate individual border side properties for unlinked state
		foreach ($devices as $device => $config) {
			$border = !empty($attributes['border'][$device]) ? $attributes['border'][$device] : ['sides' => [], 'isLinkActive' => true];
			if (empty($border['isLinkActive'])) {
				$sides = ['top', 'right', 'bottom', 'left'];
				foreach ($sides as $side) {
					$side_data = !empty($border['sides'][$side]) ? $border['sides'][$side] : [];
					if (!empty($side_data['width'])) {
						$add_style($device, "border-$side-width", $side_data['width']);
					}
					if (!empty($side_data['style'])) {
						$add_style($device, "border-$side-style", $side_data['style']);
					}
					if (!empty($side_data['color'])) {
						$add_style($device, "border-$side-color", $side_data['color']);
					}
				}
			}
		}

		// Generate individual border radius corner properties for unlinked state
		foreach ($devices as $device => $config) {
			$borderRadius = !empty($attributes['borderRadius'][$device]) ? $attributes['borderRadius'][$device] : ['corners' => [], 'isLinkActive' => true];
			if (empty($borderRadius['isLinkActive'])) {
				$corners = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];
				foreach ($corners as $corner) {
					$corner_value = !empty($borderRadius['corners'][$corner]) ? $borderRadius['corners'][$corner] : '';
					if (!empty($corner_value)) {
						$css_corner = str_replace('top-left', 'top-left-radius', str_replace('top-right', 'top-right-radius', str_replace('bottom-right', 'bottom-right-radius', str_replace('bottom-left', 'bottom-left-radius', $corner))));
						$add_style($device, "border-$css_corner", $corner_value);
					}
				}
			}
		}

		// Generate styles for position attributes (position, inset, overflow-x, overflow-y, z-index)
		$position_attributes = [
			[
				'property' => 'position',
				'value' => $attributes['position'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => ''],
				'transform' => function ($position) {
					return !empty($position) ? $position : null;
				},
			],
			[
				'property' => 'top',
				'value' => $attributes['inset'] ?? ['desktop' => ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''], 'tablet' => ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''], 'mobile' => ['top' => '', 'right' => '', 'bottom' => '', 'left' => '']],
				'transform' => function ($inset) {
					return !empty($inset['top']) ? $inset['top'] : null;
				},
			],
			[
				'property' => 'right',
				'value' => $attributes['inset'] ?? ['desktop' => ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''], 'tablet' => ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''], 'mobile' => ['top' => '', 'right' => '', 'bottom' => '', 'left' => '']],
				'transform' => function ($inset) {
					return !empty($inset['right']) ? $inset['right'] : null;
				},
			],
			[
				'property' => 'bottom',
				'value' => $attributes['inset'] ?? ['desktop' => ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''], 'tablet' => ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''], 'mobile' => ['top' => '', 'right' => '', 'bottom' => '', 'left' => '']],
				'transform' => function ($inset) {
					return !empty($inset['bottom']) ? $inset['bottom'] : null;
				},
			],
			[
				'property' => 'left',
				'value' => $attributes['inset'] ?? ['desktop' => ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''], 'tablet' => ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''], 'mobile' => ['top' => '', 'right' => '', 'bottom' => '', 'left' => '']],
				'transform' => function ($inset) {
					return !empty($inset['left']) ? $inset['left'] : null;
				},
			],
			[
				'property' => 'overflow-x',
				'value' => $attributes['overflowX'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => ''],
				'transform' => function ($overflowX) {
					return !empty($overflowX) ? $overflowX : null;
				},
			],
			[
				'property' => 'overflow-y',
				'value' => $attributes['overflowY'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => ''],
				'transform' => function ($overflowY) {
					return !empty($overflowY) ? $overflowY : null;
				},
			],
			[
				'property' => 'z-index',
				'value' => $attributes['zIndex'] ?? ['desktop' => '', 'tablet' => '', 'mobile' => ''],
				'transform' => function ($zIndex) {
					return !empty($zIndex) ? $zIndex : null;
				},
			],
		];

		foreach ($position_attributes as $position) {
			$property = $position['property'];
			$values = $position['value'];
			$transform = $position['transform'] ?? null;

			foreach ($devices as $device => $config) {
				$device_value = !empty($values[$device]) ? $values[$device] : '';
				if ($transform) {
					$device_value = $transform($device_value);
				}
				if ($device_value !== null && !empty($device_value)) {
					$add_style($device, $property, $device_value);
				}
			}
		}

		// Generate styles for effect attributes (box-shadow, transition, filter, text-shadow, transform, opacity, visibility)
		$effect_attributes = [
			[
				'property' => 'box-shadow',
				'value' => $attributes['effect'] ?? ['desktop' => ['boxShadow' => ['xOffset' => '', 'yOffset' => '', 'blurRadius' => '', 'spreadRadius' => '', 'color' => '', 'inset' => false], 'transition' => [], 'filter' => [], 'textShadow' => [], 'transform' => [], 'opacity' => '', 'visibility' => ''], 'tablet' => [], 'mobile' => []],
				'transform' => function ($effect) {
					if (empty($effect) || empty($effect['boxShadow'])) return null;
					$boxShadow = $effect['boxShadow'];
					$xOffset = !empty($boxShadow['xOffset']) ? $boxShadow['xOffset'] : '0px';
					$yOffset = !empty($boxShadow['yOffset']) ? $boxShadow['yOffset'] : '0px';
					$blurRadius = !empty($boxShadow['blurRadius']) ? $boxShadow['blurRadius'] : '0px';
					$spreadRadius = !empty($boxShadow['spreadRadius']) ? $boxShadow['spreadRadius'] : '0px';
					$color = !empty($boxShadow['color']) ? $boxShadow['color'] : 'transparent';
					$inset = !empty($boxShadow['inset']) ? 'inset ' : '';
					if ($xOffset === '0px' && $yOffset === '0px' && $blurRadius === '0px' && $spreadRadius === '0px' && $color === 'transparent' && !$inset) return null;
					return "{$inset}{$xOffset} {$yOffset} {$blurRadius} {$spreadRadius} {$color}";
				},
			],
			[
				'property' => 'transition',
				'value' => $attributes['effect'] ?? ['desktop' => ['boxShadow' => [], 'transition' => ['property' => '', 'duration' => '', 'timingFunction' => '', 'delay' => ''], 'filter' => [], 'textShadow' => [], 'transform' => [], 'opacity' => '', 'visibility' => ''], 'tablet' => [], 'mobile' => []],
				'transform' => function ($effect) {
					if (empty($effect) || empty($effect['transition'])) return null;
					$transition = $effect['transition'];
					$property = !empty($transition['property']) ? $transition['property'] : 'all';
					$duration = !empty($transition['duration']) ? $transition['duration'] : '0s';
					$timingFunction = !empty($transition['timingFunction']) ? $transition['timingFunction'] : 'ease';
					$delay = !empty($transition['delay']) ? $transition['delay'] : '0s';
					if ($property === 'all' && $duration === '0s' && $timingFunction === 'ease' && $delay === '0s') return null;
					return "{$property} {$duration} {$timingFunction} {$delay}";
				},
			],
			[
				'property' => 'filter',
				'value' => $attributes['effect'] ?? ['desktop' => ['boxShadow' => [], 'transition' => [], 'filter' => ['blur' => '', 'brightness' => '', 'contrast' => '', 'grayscale' => '', 'hueRotate' => '', 'invert' => '', 'opacity' => '', 'saturate' => '', 'sepia' => ''], 'textShadow' => [], 'transform' => [], 'opacity' => '', 'visibility' => ''], 'tablet' => [], 'mobile' => []],
				'transform' => function ($effect) {
					if (empty($effect) || empty($effect['filter'])) return null;
					$filter = $effect['filter'];
					$filters = [];
					if (!empty($filter['blur'])) $filters[] = "blur({$filter['blur']})";
					if (!empty($filter['brightness']) && $filter['brightness'] !== '100%') $filters[] = "brightness({$filter['brightness']})";
					if (!empty($filter['contrast']) && $filter['contrast'] !== '100%') $filters[] = "contrast({$filter['contrast']})";
					if (!empty($filter['grayscale']) && $filter['grayscale'] !== '0%') $filters[] = "grayscale({$filter['grayscale']})";
					if (!empty($filter['hueRotate']) && $filter['hueRotate'] !== '0deg') $filters[] = "hue-rotate({$filter['hueRotate']})";
					if (!empty($filter['invert']) && $filter['invert'] !== '0%') $filters[] = "invert({$filter['invert']})";
					if (!empty($filter['opacity']) && $filter['opacity'] !== '100%') $filters[] = "opacity({$filter['opacity']})";
					if (!empty($filter['saturate']) && $filter['saturate'] !== '100%') $filters[] = "saturate({$filter['saturate']})";
					if (!empty($filter['sepia']) && $filter['sepia'] !== '0%') $filters[] = "sepia({$filter['sepia']})";
					return !empty($filters) ? implode(' ', $filters) : null;
				},
			],
			[
				'property' => 'text-shadow',
				'value' => $attributes['effect'] ?? ['desktop' => ['boxShadow' => [], 'transition' => [], 'filter' => [], 'textShadow' => ['xOffset' => '', 'yOffset' => '', 'blurRadius' => '', 'color' => ''], 'transform' => [], 'opacity' => '', 'visibility' => ''], 'tablet' => [], 'mobile' => []],
				'transform' => function ($effect) {
					if (empty($effect) || empty($effect['textShadow'])) return null;
					$textShadow = $effect['textShadow'];
					$xOffset = !empty($textShadow['xOffset']) ? $textShadow['xOffset'] : '0px';
					$yOffset = !empty($textShadow['yOffset']) ? $textShadow['yOffset'] : '0px';
					$blurRadius = !empty($textShadow['blurRadius']) ? $textShadow['blurRadius'] : '0px';
					$color = !empty($textShadow['color']) ? $textShadow['color'] : 'transparent';
					if ($xOffset === '0px' && $yOffset === '0px' && $blurRadius === '0px' && $color === 'transparent') return null;
					return "{$xOffset} {$yOffset} {$blurRadius} {$color}";
				},
			],
			[
				'property' => 'transform',
				'value' => $attributes['effect'] ?? ['desktop' => ['boxShadow' => [], 'transition' => [], 'filter' => [], 'textShadow' => [], 'transform' => ['translateX' => '', 'translateY' => '', 'scaleX' => '', 'scaleY' => '', 'rotate' => '', 'skewX' => '', 'skewY' => ''], 'opacity' => '', 'visibility' => ''], 'tablet' => [], 'mobile' => []],
				'transform' => function ($effect) {
					if (empty($effect) || empty($effect['transform'])) return null;
					$transform = $effect['transform'];
					$transforms = [];
					if (!empty($transform['translateX']) || !empty($transform['translateY'])) {
						$translateX = !empty($transform['translateX']) ? $transform['translateX'] : '0px';
						$translateY = !empty($transform['translateY']) ? $transform['translateY'] : '0px';
						$transforms[] = "translate($translateX, $translateY)";
					}
					if (!empty($transform['scaleX'])) {
						$transforms[] = "scaleX({$transform['scaleX']})";
					}
					if (!empty($transform['scaleY'])) {
						$transforms[] = "scaleY({$transform['scaleY']})";
					}
					if (!empty($transform['rotate'])) {
						$transforms[] = "rotate({$transform['rotate']})";
					}
					if (!empty($transform['skewX'])) {
						$transforms[] = "skewX({$transform['skewX']})";
					}
					if (!empty($transform['skewY'])) {
						$transforms[] = "skewY({$transform['skewY']})";
					}
					return !empty($transforms) ? implode(' ', $transforms) : null;
				},
			],
			[
				'property' => 'opacity',
				'value' => $attributes['effect'] ?? ['desktop' => ['boxShadow' => [], 'transition' => [], 'filter' => [], 'textShadow' => [], 'transform' => [], 'opacity' => '', 'visibility' => ''], 'tablet' => [], 'mobile' => []],
				'transform' => function ($effect) {
					return !empty($effect['opacity']) && $effect['opacity'] !== '1' ? $effect['opacity'] : null;
				},
			],
			[
				'property' => 'visibility',
				'value' => $attributes['effect'] ?? ['desktop' => ['boxShadow' => [], 'transition' => [], 'filter' => [], 'textShadow' => [], 'transform' => [], 'opacity' => '', 'visibility' => ''], 'tablet' => [], 'mobile' => []],
				'transform' => function ($effect) {
					return !empty($effect['visibility']) && $effect['visibility'] !== 'visible' ? $effect['visibility'] : null;
				},
			],
		];

		foreach ($effect_attributes as $effect) {
			$property = $effect['property'];
			$values = $effect['value'];
			$transform = $effect['transform'] ?? null;

			foreach ($devices as $device => $config) {
				$device_value = !empty($values[$device]) ? $values[$device] : [];
				if ($transform) {
					$device_value = $transform($device_value);
				}
				if ($device_value !== null && !empty($device_value)) {
					$add_style($device, $property, $device_value);
				}
			}
		}

		// Generate custom styles (not device-specific)
		if (isset($attributes['customCss']) && !empty($attributes['customCss'])) {
			$styles_css[] = $attributes['customCss'];
		}

		// Generate global styles (not device-specific)
		if ( ! empty( $attributes['iconColor'] ) ) {
			$global_styles[] = sprintf(
				'.%1$s .heading-icon { color: %2$s; }',
				esc_attr( $unique_class ),
				esc_attr( $attributes['iconColor'] )
			);
		}

		// Combine styles for each device
		foreach ( $devices as $device => $config ) {
			$styles = $device_styles[ $device ];
			if ( ! empty( $styles ) ) {
				$selector = "." . $unique_class;
				$css      = implode( ' ', $styles );
				if ( $config['media'] ) {
					$styles_css[] = "{$config['media']} { $selector { $css } }";
				} else {
					$styles_css[] = "$selector { $css }";
				}
			}
		}

		// Add global styles
		if ( ! empty( $global_styles ) ) {
			$styles_css = array_merge( $styles_css, $global_styles );
		}

		return $styles_css;
	};

	// Generate CSS styles
	$styles_css = $generate_styles( $unique_class, $devices, $attributes );

	// Collect styles for global output
	if ( ! empty( $unique_class ) ) {
		global $axcelersblocks_collected_styles;

		if ( ! isset( $axcelersblocks_collected_styles ) ) {
			$axcelersblocks_collected_styles = [];
		}

		// Dynamically get block name as slug (e.g., axcelersblocks-heading-block)
		$block_name = isset( $block->name ) ? str_replace( '/', '-', $block->name ) . '-block' : 'unknown-block';

		if ( ! isset( $axcelersblocks_collected_styles[ $block_name ] ) ) {
			$axcelersblocks_collected_styles[ $block_name ] = [];
		}

		// Add styles to global collection
		if ( ! empty( $styles_css ) ) {
			foreach ( $styles_css as $css_rule ) {
				$axcelersblocks_collected_styles[ $block_name ][] = $css_rule;
			}
		}
	}

	// Prepare icon (if any)
	if ( ! empty( $attributes['iconSvg'] ) ) {
		$icon_html = sprintf(
			'<span class="heading-icon">%s</span>',
			$attributes['iconSvg']
		);
	}

	$final_output = '';

	// Handle dynamic content
	if ( ! empty( $attributes['dynamicTag'] ) && ! empty( $attributes['postId'] ) ) {
		$post_id      = (int) $attributes['postId'];
		$selected_tag = $attributes['selectedTag'] ?? 'post_title';
		$post         = get_post( $post_id );

		if ( $post ) {
			$content = '';
			$link    = '';

			if ( $selected_tag === 'post_title' ) {
				$content = get_the_title( $post );
				if ( $link_option === 'post' ) {
					$link = get_permalink( $post_id );
				}
			} elseif ( $selected_tag === 'post_author' ) {
				$author_id = $post->post_author;
				$author    = get_userdata( $author_id );
				if ( $author ) {
					$content = $author->display_name;
					if ( $link_option === 'author' ) {
						$link = get_author_posts_url( $author_id );
					} elseif ( $link_option === 'post' ) {
						$link = get_permalink( $post_id );
					}
				} else {
					$content = esc_html__( '(Author not found)', 'axcelersblocks' );
				}
			} else {
				$content = esc_html__( '(Unsupported tag)', 'axcelersblocks' );
			}

			$inner = ( $icon_loc === 'before' )
				? $icon_html . esc_html( $content )
				: esc_html( $content ) . $icon_html;

			if ( $link ) {
				$inner = sprintf(
					'<a href="%s" target="_blank" rel="noopener noreferrer">%s</a>',
					esc_url( $link ),
					$inner
				);
			}

			$final_output = $inner;
		} else {
			$final_output = esc_html__( '(Post not found)', 'axcelersblocks' );
		}
	} elseif ( ! empty( $attributes['content'] ) ) {
		// Static content (RichText preserved)
		$content = $attributes['content'];

		$combined = ( $icon_loc === 'before' )
			? $icon_html . $content
			: $content . $icon_html;

		// Wrap with custom link if set
		if ( $custom_link ) {
			$combined = sprintf(
				'<a href="%s" target="_blank" rel="noopener noreferrer">%s</a>',
				esc_url( $custom_link ),
				$combined
			);
		}

		$final_output = $combined;
	} else {
		$final_output = esc_html__( '(No content provided)', 'axcelersblocks' );
	}

	// Output final block
	printf(
		'<%1$s %2$s>%3$s</%1$s>',
		esc_attr( $tag_name ),
		$wrapper_attrs,
		$final_output
	);
?>
