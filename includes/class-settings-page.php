<?php
/**
 * Settings page rendering for AxcelersBlocks plugin.
 *
 * @package AxcelersBlocks
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}

/**
 * Class AxcelersBlocks_Settings_Page
 *
 * Handles the rendering of the settings page for the AxcelersBlocks plugin.
 */
class AxcelersBlocks_Settings_Page {
  /**
   * Initialize the class and set its properties.
   *
   * @since 1.0.0
   */
  public function init() {
    // Register the settings page
    add_action('admin_menu', [$this, 'register_settings_page']);
  }

  /**
   * Register the settings page.
   *
   * @since 1.0.0
   */
  public function register_settings_page() {
    add_menu_page(
      __('AxcelersBlocks Settings', 'AxcelersBlocks'), // Page title
      __('AxcelersBlocks', 'AxcelersBlocks'),         // Menu title
      'manage_options',                       // Capability
      'AxcelersBlocks-settings',                  // Menu slug
      [$this, 'render_settings_page'],        // Callback function
      'dashicons-admin-settings',             // Icon
      80                                      // Position
    );
  }

  /**
   * Render the settings page.
   *
   * @since 1.0.0
   */
  public function render_settings_page() {
    ?>
    <div class="wrap">
      <h1><?php echo esc_html__('AxcelersBlocks Settings', 'axcelersblocks'); ?></h1>
      <form method="post" action="options.php" enctype="multipart/form-data">
        <?php
        settings_fields('axcelersblocks_device_settings_group');
        do_settings_sections('axcelersblocks-settings');
        submit_button();
        ?>
      </form>
    </div>
    <?php
  }
}
