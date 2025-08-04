<?php
/**
 * Responsive settings management for AxcelersBlocks plugin.
 *
 * @package AxcelersBlocks
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}

/**
 * Class AxcelersBlocks_Responsive_Settings
 *
 * Handles the responsive settings (canvas widths for devices) for the AxcelersBlocks plugin.
 */
class AxcelersBlocks_Responsive_Settings {
  /**
   * Initialize the class and set its properties.
   *
   * @since 1.0.0
   */
  public function init() {
    // Register settings and fields
    add_action('admin_init', [$this, 'register_settings']);
  }

  /**
   * Register settings, sections, and fields for responsive settings.
   *
   * @since 1.0.0
   */
  public function register_settings() {
    // Register the responsive settings option
    register_setting(
      'axcelersblocks_device_settings_group',
      'axcelersblocks_responsive_settings',
      [
        'sanitize_callback' => [$this, 'sanitize_responsive_settings'],
        'default' => [
          'devices' => [
            'tablet' => [
              'name' => 'Tablet',
              'width' => '1024px',
              'is_default' => true,
            ],
            'mobile' => [
              'name' => 'Mobile',
              'width' => '768px',
              'is_default' => true,
            ],
          ],
        ],
      ]
    );

    // Section: Device Settings
    add_settings_section(
      'axcelersblocks_device_settings_section',
      __('Device Configuration', 'axcelersblocks'),
      [$this, 'device_settings_section_callback'],
      'axcelersblocks-settings'
    );

    add_settings_field(
      'axcelersblocks_responsive_settings',
      __('Canvas Widths', 'axcelersblocks'),
      [$this, 'responsive_settings_field_callback'],
      'axcelersblocks-settings',
      'axcelersblocks_device_settings_section'
    );
  }

  /**
   * Sanitize the responsive settings.
   *
   * @param array $input The input data.
   * @return array Sanitized data.
   *
   * @since 1.0.0
   */
  public function sanitize_responsive_settings($input) {
    $sanitized = [
      'devices' => [
        'tablet' => [
          'name' => 'Tablet',
          'width' => '1024px',
          'is_default' => true,
        ],
        'mobile' => [
          'name' => 'Mobile',
          'width' => '768px',
          'is_default' => true,
        ],
      ],
    ];

    // Sanitize tablet and mobile widths
    if (isset($input['devices']['tablet']['width'])) {
      $sanitized['devices']['tablet']['width'] = sanitize_text_field($input['devices']['tablet']['width']);
    }
    if (isset($input['devices']['mobile']['width'])) {
      $sanitized['devices']['mobile']['width'] = sanitize_text_field($input['devices']['mobile']['width']);
    }

    return $sanitized;
  }

  /**
   * Device settings section callback.
   *
   * Displays the description for the device settings section.
   *
   * @since 1.0.0
   */
  public function device_settings_section_callback() {
    echo '<p>' . esc_html__('Configure the device canvas widths for responsive behavior. Unit should be PX (e.g., 1024px).', 'axcelersblocks') . '</p>';
  }

  /**
   * Device settings field callback.
   *
   * Renders the fields for managing device settings.
   *
   * @since 1.0.0
   */
  public function responsive_settings_field_callback() {
    $responsive_settings = get_option(
      'axcelersblocks_responsive_settings',
      [
        'devices' => [
          'tablet' => [
            'name' => 'Tablet',
            'width' => '1024px',
            'is_default' => true,
          ],
          'mobile' => [
            'name' => 'Mobile',
            'width' => '768px',
            'is_default' => true,
          ],
        ],
      ]
    );
    ?>
    <div id="axcelersblocks-responsive-settings">
      <div class="responsive-devices-list">
        <?php foreach ($responsive_settings['devices'] as $key => $device): ?>
          <div class="responsive-device" style="margin-bottom: 20px;">
            <label><?php echo esc_html__('Device Name', 'axcelersblocks'); ?></label>
            <input type="text" value="<?php echo esc_attr($device['name']); ?>" style="width: 150px; margin-right: 10px;" readonly />
            <label><?php echo esc_html__('Canvas Width', 'axcelersblocks'); ?></label>
            <input type="text" name="axcelersblocks_responsive_settings[devices][<?php echo esc_attr($key); ?>][width]" value="<?php echo esc_attr($device['width']); ?>" style="width: 100px; margin-right: 10px;" required /> px
          </div>
        <?php endforeach; ?>
      </div>
    </div>
    <?php
  }
}
