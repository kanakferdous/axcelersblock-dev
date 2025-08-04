<?php
/**
 * Plugin Name:       AxcelersBlocks
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       axcelersblocks
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
/**
 * Registers the block using a `blocks-manifest.php` file, which improves the performance of block type registration.
 * Behind the scenes, it also registers all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function axcelersblocks_block_init() {
	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
	 * based on the registered block metadata.
	 * Added in WordPress 6.8 to simplify the block metadata registration process added in WordPress 6.7.
	 *
	 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
	 */
	if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
		wp_register_block_types_from_metadata_collection( __DIR__ . '/build/blocks/', __DIR__ . '/build/blocks-manifest.php' );
		return;
	}

	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` file.
	 * Added to WordPress 6.7 to improve the performance of block type registration.
	 *
	 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
	 */
	if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
		wp_register_block_metadata_collection( __DIR__ . '/build/blocks/', __DIR__ . '/build/blocks-manifest.php' );
	}
	/**
	 * Registers the block type(s) in the `blocks-manifest.php` file.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
	foreach ( array_keys( $manifest_data ) as $block_type ) {
		register_block_type( __DIR__ . "/build/blocks/{$block_type}" );
	}
}
add_action( 'init', 'axcelersblocks_block_init' );

/**
 * Register custom block category for AxcelersBlocks plugin.
 *
 * @param array $categories Existing block categories.
 * @return array Updated block categories.
 */
function axcelersblocks_register_block_category( $categories ) {

	$custom_category = array(
		'slug'  => 'axcelersblocks-blocks',
		'title' => __( 'AxcelersBlocks Blocks', 'axcelersblocks' ),
		'icon'  => null, // You can optionally specify a Dashicon slug
	);

	// Add the custom category to the beginning of the list.
	array_unshift( $categories, $custom_category );

	return $categories;
}
add_filter( 'block_categories_all', 'axcelersblocks_register_block_category' );

add_action( 'wp_head', function() {
	global $axcelersblocks_collected_styles;

	if ( ! empty( $axcelersblocks_collected_styles ) ) {
		foreach ( $axcelersblocks_collected_styles as $block_name => $styles ) {
			echo '<style id="' . esc_attr( $block_name ) . '-styles">' . PHP_EOL;
			foreach ( array_unique( $styles ) as $style_rule ) {
				echo $style_rule . PHP_EOL;
			}
			echo '</style>' . PHP_EOL;
		}
	}
}, 99 );

// Include the settings-related classes
require_once plugin_dir_path( __FILE__ ) . 'includes/class-settings-page.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/class-responsive-settings.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/class-rest-api.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/class-custom-fonts.php';

// Initialize the settings classes
$settings_page = new AxcelersBlocks_Settings_Page();
$settings_page->init();

$responsive_settings = new AxcelersBlocks_Responsive_Settings();
$responsive_settings->init();

$custom_fonts = new AxcelersBlocks_Custom_Fonts();
$custom_fonts->init();

$rest_api = new AxcelersBlocks_Rest_API( $custom_fonts );
$rest_api->init();
