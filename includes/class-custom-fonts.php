<?php
/**
 * Custom Fonts management for AxcelersBlocks plugin.
 *
 * @package AxcelersBlocks
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * Class AxcelersBlocks_Custom_Fonts
 *
 * Manages custom fonts for the AxcelersBlocks plugin, including uploads, Google Fonts, and Adobe Fonts.
 */
class AxcelersBlocks_Custom_Fonts {
    /**
     * Initialize the class and set its properties.
     *
     * @since 1.0.0
     */
    public function init() {
        // Register settings for custom fonts
        add_action( 'admin_init', [ $this, 'register_settings' ] );

        // Enqueue custom fonts on the frontend and in the block editor
        add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_custom_fonts' ] );
        add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_custom_fonts' ] );
    }

    /**
     * Register settings for custom fonts.
     *
     * @since 1.0.0
     */
    public function register_settings() {
        // Register the setting for custom fonts
        register_setting(
            'axcelersblocks_device_settings_group',
            'axcelersblocks_custom_fonts',
            [
                'sanitize_callback' => [ $this, 'sanitize_custom_fonts' ],
                'show_in_rest'      => false,
                'default'           => [
                    'uploaded' => [],
                    'google'   => [],
                    'adobe'    => [],
                ],
            ]
        );

        // Section: Custom Fonts
        add_settings_section(
            'axcelersblocks_custom_fonts_section',
            __( 'Custom Fonts', 'axcelersblocks' ),
            [ $this, 'custom_fonts_section_callback' ],
            'axcelersblocks-settings'
        );

        add_settings_field(
            'axcelersblocks_custom_font_uploads',
            __( 'Custom Font Uploads', 'axcelersblocks' ),
            [ $this, 'custom_font_uploads_callback' ],
            'axcelersblocks-settings',
            'axcelersblocks_custom_fonts_section'
        );

        // Section: Google Fonts
        add_settings_section(
            'axcelersblocks_google_fonts_section',
            __( 'Google Fonts', 'axcelersblocks' ),
            [ $this, 'google_fonts_section_callback' ],
            'axcelersblocks-settings'
        );

        add_settings_field(
            'axcelersblocks_google_fonts',
            __( 'Google Fonts', 'axcelersblocks' ),
            [ $this, 'google_fonts_callback' ],
            'axcelersblocks-settings',
            'axcelersblocks_google_fonts_section'
        );

        // Section: Adobe Fonts
        add_settings_section(
            'axcelersblocks_adobe_fonts_section',
            __( 'Adobe Fonts', 'axcelersblocks' ),
            [ $this, 'adobe_fonts_section_callback' ],
            'axcelersblocks-settings'
        );

        add_settings_field(
            'axcelersblocks_adobe_fonts',
            __( 'Adobe Fonts', 'axcelersblocks' ),
            [ $this, 'adobe_fonts_callback' ],
            'axcelersblocks-settings',
            'axcelersblocks_adobe_fonts_section'
        );
    }

    /**
     * Callback for the custom fonts section.
     *
     * @since 1.0.0
     */
    public function custom_fonts_section_callback() {
        echo '<p>' . esc_html__( 'Upload custom font files (WOFF and WOFF2 formats only). Hold Ctrl/Cmd to select multiple files.', 'axcelersblocks' ) . '</p>';
    }

    /**
     * Callback for the Google Fonts section.
     *
     * @since 1.0.0
     */
    public function google_fonts_section_callback() {
        echo '<p>' . esc_html__( 'Add Google Fonts URLs to load additional font families.', 'axcelersblocks' ) . '</p>';
    }

    /**
     * Callback for the Adobe Fonts section.
     *
     * @since 1.0.0
     */
    public function adobe_fonts_section_callback() {
        echo '<p>' . esc_html__( 'Add Adobe Fonts URLs to load additional font families.', 'axcelersblocks' ) . '</p>';
    }

    /**
     * Callback to render the custom font uploads field.
     *
     * @since 1.0.0
     */
    public function custom_font_uploads_callback() {
        $settings = get_option( 'axcelersblocks_custom_fonts', [
            'uploaded' => [],
            'google'   => [],
            'adobe'    => [],
        ] );

        // Ensure uploaded is an array
        $uploaded_fonts = isset( $settings['uploaded'] ) && is_array( $settings['uploaded'] ) ? $settings['uploaded'] : [];
        ?>
        <div id="axcelersblocks-custom-fonts">
            <div class="custom-fonts-list">
                <?php if ( ! empty( $uploaded_fonts ) ) : ?>
                    <?php foreach ( $uploaded_fonts as $index => $font ) : ?>
                        <div class="custom-font" style="margin-bottom: 20px; border: 1px solid #ddd; padding: 10px;">
                            <p>
                                <label><?php echo esc_html__( 'Font Name', 'axcelersblocks' ); ?></label><br>
                                <input type="text" name="axcelersblocks_custom_fonts[uploaded][<?php echo esc_attr( $index ); ?>][name]" value="<?php echo esc_attr( $font['name'] ); ?>" required style="width: 300px;" />
                            </p>
                            <p>
                                <label><?php echo esc_html__( 'WOFF2 File', 'axcelersblocks' ); ?></label><br>
                                <span><?php echo ! empty( $font['woff2'] ) ? esc_html( basename( $font['woff2'] ) ) : esc_html__( 'None', 'axcelersblocks' ); ?></span>
                                <input type="hidden" name="axcelersblocks_custom_fonts[uploaded][<?php echo esc_attr( $index ); ?>][woff2]" value="<?php echo esc_attr( $font['woff2'] ); ?>" />
                            </p>
                            <p>
                                <label><?php echo esc_html__( 'WOFF File', 'axcelersblocks' ); ?></label><br>
                                <span><?php echo ! empty( $font['woff'] ) ? esc_html( basename( $font['woff'] ) ) : esc_html__( 'None', 'axcelersblocks' ); ?></span>
                                <input type="hidden" name="axcelersblocks_custom_fonts[uploaded][<?php echo esc_attr( $index ); ?>][woff]" value="<?php echo esc_attr( $font['woff'] ); ?>" />
                            </p>
                            <button type="button" class="button remove-custom-font"><?php echo esc_html__( 'Remove', 'axcelersblocks' ); ?></button>
                        </div>
                    <?php endforeach; ?>
                <?php else : ?>
                    <p><?php echo esc_html__( 'No custom fonts uploaded yet.', 'axcelersblocks' ); ?></p>
                <?php endif; ?>
            </div>
            <button type="button" class="button add-custom-font"><?php echo esc_html__( 'Add Custom Font', 'axcelersblocks' ); ?></button>
        </div>
        <script>
            function addCustomFontField() {
                const container = document.getElementById('axcelersblocks-custom-fonts');
                const list = container.querySelector('.custom-fonts-list');
                const index = list.querySelectorAll('.custom-font').length;
                const newField = document.createElement('div');
                newField.className = 'custom-font';
                newField.style.marginBottom = '20px';
                newField.style.border = '1px solid #ddd';
                newField.style.padding = '10px';
                newField.innerHTML = `
                    <p>
                        <label><?php echo esc_html__( 'Font Name', 'axcelersblocks' ); ?></label><br>
                        <input type="text" name="axcelersblocks_custom_fonts[uploaded][${index}][name]" required style="width: 300px;" />
                    </p>
                    <p>
                        <label><?php echo esc_html__( 'Upload Font Files (WOFF/WOFF2)', 'axcelersblocks' ); ?></label><br>
                        <input type="file" name="axcelersblocks_custom_fonts_files[${index}][]" multiple accept=".woff,.woff2" style="width: 500px;" />
                    </p>
                    <button type="button" class="button remove-custom-font"><?php echo esc_html__( 'Remove', 'axcelersblocks' ); ?></button>
                `;
                list.appendChild(newField);
            }

            document.addEventListener('click', function(e) {
                if (e.target.classList.contains('add-custom-font')) {
                    addCustomFontField();
                } else if (e.target.classList.contains('remove-custom-font')) {
                    e.target.parentElement.remove();
                }
            });
        </script>
        <?php
    }

    /**
     * Callback to render the Google Fonts field.
     *
     * @since 1.0.0
     */
    public function google_fonts_callback() {
        $settings = get_option( 'axcelersblocks_custom_fonts', [
            'uploaded' => [],
            'google'   => [],
            'adobe'    => [],
        ] );

        // Ensure google is an array
        $google_fonts = isset( $settings['google'] ) && is_array( $settings['google'] ) ? $settings['google'] : [];
        ?>
        <div id="axcelersblocks-google-fonts">
            <div class="google-fonts-list">
                <?php if ( ! empty( $google_fonts ) ) : ?>
                    <?php foreach ( $google_fonts as $index => $font ) : ?>
                        <div class="google-font" style="margin-bottom: 20px;">
                            <input type="url" name="axcelersblocks_custom_fonts[google][<?php echo esc_attr( $index ); ?>][url]" value="<?php echo esc_attr( $font['url'] ); ?>" placeholder="<?php echo esc_attr__( 'Font URL (e.g., https://fonts.googleapis.com/css2?family=Roboto)', 'axcelersblocks' ); ?>" style="width: 500px; margin-right: 10px;" />
                            <input type="text" name="axcelersblocks_custom_fonts[google][<?php echo esc_attr( $index ); ?>][font_name]" value="<?php echo esc_attr( $font['font_name'] ); ?>" placeholder="<?php echo esc_attr__( 'Font Name (e.g., Roboto)', 'axcelersblocks' ); ?>" style="width: 200px; margin-right: 10px;" />
                            <button type="button" class="button remove-google-font"><?php echo esc_html__( 'Remove', 'axcelersblocks' ); ?></button>
                        </div>
                    <?php endforeach; ?>
                <?php else : ?>
                    <p><?php echo esc_html__( 'No Google Fonts added yet.', 'axcelersblocks' ); ?></p>
                <?php endif; ?>
            </div>
            <button type="button" class="button add-google-font"><?php echo esc_html__( 'Add Google Font', 'axcelersblocks' ); ?></button>
        </div>
        <script>
            function addGoogleFontField() {
                const container = document.getElementById('axcelersblocks-google-fonts');
                const list = container.querySelector('.google-fonts-list');
                const index = list.querySelectorAll('.google-font').length;
                const newField = document.createElement('div');
                newField.className = 'google-font';
                newField.style.marginBottom = '20px';
                newField.innerHTML = `
                    <input type="url" name="axcelersblocks_custom_fonts[google][${index}][url]" placeholder="<?php echo esc_attr__( 'Font URL (e.g., https://fonts.googleapis.com/css2?family=Roboto)', 'axcelersblocks' ); ?>" style="width: 500px; margin-right: 10px;" />
                    <input type="text" name="axcelersblocks_custom_fonts[google][${index}][font_name]" placeholder="<?php echo esc_attr__( 'Font Name (e.g., Roboto)', 'axcelersblocks' ); ?>" style="width: 200px; margin-right: 10px;" />
                    <button type="button" class="button remove-google-font"><?php echo esc_html__( 'Remove', 'axcelersblocks' ); ?></button>
                `;
                list.appendChild(newField);
            }

            document.addEventListener('click', function(e) {
                if (e.target.classList.contains('add-google-font')) {
                    addGoogleFontField();
                } else if (e.target.classList.contains('remove-google-font')) {
                    e.target.parentElement.remove();
                }
            });
        </script>
        <?php
    }

    /**
     * Callback to render the Adobe Fonts field.
     *
     * @since 1.0.0
     */
    public function adobe_fonts_callback() {
        $settings = get_option( 'axcelersblocks_custom_fonts', [
            'uploaded' => [],
            'google'   => [],
            'adobe'    => [],
        ] );

        // Ensure adobe is an array
        $adobe_fonts = isset( $settings['adobe'] ) && is_array( $settings['adobe'] ) ? $settings['adobe'] : [];
        ?>
        <div id="axcelersblocks-adobe-fonts">
            <div class="adobe-fonts-list">
                <?php if ( ! empty( $adobe_fonts ) ) : ?>
                    <?php foreach ( $adobe_fonts as $index => $font ) : ?>
                        <div class="adobe-font" style="margin-bottom: 20px;">
                            <input type="url" name="axcelersblocks_custom_fonts[adobe][<?php echo esc_attr( $index ); ?>][url]" value="<?php echo esc_attr( $font['url'] ); ?>" placeholder="<?php echo esc_attr__( 'Font URL (e.g., Adobe Fonts project URL)', 'axcelersblocks' ); ?>" style="width: 500px; margin-right: 10px;" />
                            <input type="text" name="axcelersblocks_custom_fonts[adobe][<?php echo esc_attr( $index ); ?>][font_name]" value="<?php echo esc_attr( $font['font_name'] ); ?>" placeholder="<?php echo esc_attr__( 'Font Name (e.g., My Adobe Font)', 'axcelersblocks' ); ?>" style="width: 200px; margin-right: 10px;" />
                            <button type="button" class="button remove-adobe-font"><?php echo esc_html__( 'Remove', 'axcelersblocks' ); ?></button>
                        </div>
                    <?php endforeach; ?>
                <?php else : ?>
                    <p><?php echo esc_html__( 'No Adobe Fonts added yet.', 'axcelersblocks' ); ?></p>
                <?php endif; ?>
            </div>
            <button type="button" class="button add-adobe-font"><?php echo esc_html__( 'Add Adobe Font', 'axcelersblocks' ); ?></button>
        </div>
        <script>
            function addAdobeFontField() {
                const container = document.getElementById('axcelersblocks-adobe-fonts');
                const list = container.querySelector('.adobe-fonts-list');
                const index = list.querySelectorAll('.adobe-font').length;
                const newField = document.createElement('div');
                newField.className = 'adobe-font';
                newField.style.marginBottom = '20px';
                newField.innerHTML = `
                    <input type="url" name="axcelersblocks_custom_fonts[adobe][${index}][url]" placeholder="<?php echo esc_attr__( 'Font URL (e.g., Adobe Fonts project URL)', 'axcelersblocks' ); ?>" style="width: 500px; margin-right: 10px;" />
                    <input type="text" name="axcelersblocks_custom_fonts[adobe][${index}][font_name]" placeholder="<?php echo esc_attr__( 'Font Name (e.g., My Adobe Font)', 'axcelersblocks' ); ?>" style="width: 200px; margin-right: 10px;" />
                    <button type="button" class="button remove-adobe-font"><?php echo esc_html__( 'Remove', 'axcelersblocks' ); ?></button>
                `;
                list.appendChild(newField);
            }

            document.addEventListener('click', function(e) {
                if (e.target.classList.contains('add-adobe-font')) {
                    addAdobeFontField();
                } else if (e.target.classList.contains('remove-adobe-font')) {
                    e.target.parentElement.remove();
                }
            });
        </script>
        <?php
    }

    /**
     * Sanitize the custom fonts settings.
     *
     * @param array $input The input data to sanitize.
     * @return array The sanitized data.
     *
     * @since 1.0.0
     */
    public function sanitize_custom_fonts( $input ) {
        $sanitized = [
            'uploaded' => [],
            'google'   => [],
            'adobe'    => [],
        ];

        // Sanitize uploaded fonts
        if ( isset( $input['uploaded'] ) && is_array( $input['uploaded'] ) ) {
            foreach ( $input['uploaded'] as $index => $font ) {
                if ( ! empty( $font['name'] ) ) {
                    $sanitized['uploaded'][ $index ] = [
                        'name'  => sanitize_text_field( $font['name'] ),
                        'woff2' => ! empty( $font['woff2'] ) ? esc_url_raw( $font['woff2'] ) : '',
                        'woff'  => ! empty( $font['woff'] ) ? esc_url_raw( $font['woff'] ) : '',
                    ];
                }
            }
            $sanitized['uploaded'] = array_values( $sanitized['uploaded'] );
        }

        // Handle custom font file uploads
        if ( ! empty( $_FILES['axcelersblocks_custom_fonts_files'] ) && ! empty( $_FILES['axcelersblocks_custom_fonts_files']['name'] ) ) {
            $files = $_FILES['axcelersblocks_custom_fonts_files'];
            $upload_dir = wp_upload_dir();
            $custom_fonts_dir = $upload_dir['basedir'] . '/axcelersblocks-fonts/';
            $custom_fonts_url = $upload_dir['baseurl'] . '/axcelersblocks-fonts/';

            // Create the directory if it doesn't exist
            if ( ! file_exists( $custom_fonts_dir ) ) {
                wp_mkdir_p( $custom_fonts_dir );
            }

            foreach ( $files['name'] as $index => $file_names ) {
                if ( ! is_array( $file_names ) ) {
                    continue; // Skip if not an array
                }

                $font_name = sanitize_text_field( $input['uploaded'][ $index ]['name'] );
                if ( empty( $font_name ) ) {
                    continue; // Skip if no font name
                }

                $woff2_path = '';
                $woff_path = '';

                foreach ( $file_names as $file_index => $file_name ) {
                    if ( empty( $file_name ) ) {
                        continue;
                    }

                    $file_type = $files['type'][ $index ][ $file_index ];
                    $file_tmp = $files['tmp_name'][ $index ][ $file_index ];
                    $file_error = $files['error'][ $index ][ $file_index ];

                    if ( $file_error !== UPLOAD_ERR_OK ) {
                        continue;
                    }

                    // Validate file type (only WOFF and WOFF2)
                    $ext = strtolower( pathinfo( $file_name, PATHINFO_EXTENSION ) );
                    if ( ! in_array( $ext, [ 'woff', 'woff2' ], true ) ) {
                        continue;
                    }

                    // Generate a unique filename
                    $new_file_name = sanitize_file_name( $font_name . '-' . uniqid() . '.' . $ext );
                    $destination = $custom_fonts_dir . $new_file_name;

                    // Move the uploaded file
                    if ( move_uploaded_file( $file_tmp, $destination ) ) {
                        if ( $ext === 'woff2' ) {
                            $woff2_path = $custom_fonts_url . $new_file_name;
                        } elseif ( $ext === 'woff' ) {
                            $woff_path = $custom_fonts_url . $new_file_name;
                        }
                    }
                }

                // Save the font entry if at least one file was uploaded
                if ( $woff2_path || $woff_path ) {
                    $sanitized['uploaded'][ $index ] = [
                        'name'  => $font_name,
                        'woff2' => $woff2_path,
                        'woff'  => $woff_path,
                    ];
                }
            }
            $sanitized['uploaded'] = array_values( $sanitized['uploaded'] );
        }

        // Sanitize Google Fonts
        if ( isset( $input['google'] ) && is_array( $input['google'] ) ) {
            foreach ( $input['google'] as $index => $font ) {
                if ( ! empty( $font['url'] ) && ! empty( $font['font_name'] ) ) {
                    $sanitized['google'][ $index ] = [
                        'url'       => esc_url_raw( $font['url'] ),
                        'font_name' => sanitize_text_field( $font['font_name'] ),
                    ];
                }
            }
            $sanitized['google'] = array_values( $sanitized['google'] );
        }

        // Sanitize Adobe Fonts
        if ( isset( $input['adobe'] ) && is_array( $input['adobe'] ) ) {
            foreach ( $input['adobe'] as $index => $font ) {
                if ( ! empty( $font['url'] ) && ! empty( $font['font_name'] ) ) {
                    $sanitized['adobe'][ $index ] = [
                        'url'       => esc_url_raw( $font['url'] ),
                        'font_name' => sanitize_text_field( $font['font_name'] ),
                    ];
                }
            }
            $sanitized['adobe'] = array_values( $sanitized['adobe'] );
        }

        return $sanitized;
    }

    /**
     * Enqueue custom fonts on the frontend and editor.
     *
     * @since 1.0.0
     */
    public function enqueue_custom_fonts() {
        // Register the base style handle
        wp_register_style( 'axcelersblocks-style', false );
        wp_enqueue_style( 'axcelersblocks-style' );

        $settings = get_option(
            'axcelersblocks_custom_fonts',
            [
                'uploaded' => [],
                'google'   => [],
                'adobe'    => [],
            ]
        );

        // Ensure all keys exist and are arrays
        $settings['uploaded'] = isset( $settings['uploaded'] ) && is_array( $settings['uploaded'] ) ? $settings['uploaded'] : [];
        $settings['google'] = isset( $settings['google'] ) && is_array( $settings['google'] ) ? $settings['google'] : [];
        $settings['adobe'] = isset( $settings['adobe'] ) && is_array( $settings['adobe'] ) ? $settings['adobe'] : [];

        // Enqueue Google Fonts
        if ( ! empty( $settings['google'] ) ) {
            foreach ( $settings['google'] as $index => $font ) {
                wp_enqueue_style( "axcelersblocks-google-font-{$index}", $font['url'], [], null );
            }
        }

        // Enqueue Adobe Fonts
        if ( ! empty( $settings['adobe'] ) ) {
            foreach ( $settings['adobe'] as $index => $font ) {
                wp_enqueue_style( "axcelersblocks-adobe-font-{$index}", $font['url'], [], null );
            }
        }

        // Generate @font-face for uploaded fonts
        if ( ! empty( $settings['uploaded'] ) ) {
            $css = '';
            foreach ( $settings['uploaded'] as $font ) {
                $font_name = $font['name'];
                $css .= "@font-face { font-family: \"{$font_name}\";";
                $src = [];
                if ( ! empty( $font['woff2'] ) ) {
                    $src[] = "url('{$font['woff2']}') format('woff2')";
                }
                if ( ! empty( $font['woff'] ) ) {
                    $src[] = "url('{$font['woff']}') format('woff')";
                }
                if ( ! empty( $src ) ) {
                    $css .= ' src: ' . implode( ', ', $src ) . ';';
                }
                $css .= ' font-weight: normal; font-style: normal; font-display: swap; }';
            }
            wp_add_inline_style( 'axcelersblocks-style', $css );
        }
    }
}
