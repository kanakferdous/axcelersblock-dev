<?php
/**
 * REST API endpoints for AxcelersBlocks plugin.
 *
 * @package AxcelersBlocks
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * Class AxcelersBlocks_Rest_API
 *
 * Manages REST API endpoints for the AxcelersBlocks plugin.
 */
class AxcelersBlocks_Rest_API {
    /**
     * Instance of AxcelersBlocks_Custom_Fonts to access its methods.
     *
     * @var AxcelersBlocks_Custom_Fonts
     */
    private $custom_fonts;

    /**
     * Initialize the class and set its properties.
     *
     * @param AxcelersBlocks_Custom_Fonts $custom_fonts Instance of the custom fonts class.
     * @since 1.0.0
     */
    public function __construct( AxcelersBlocks_Custom_Fonts $custom_fonts ) {
        $this->custom_fonts = $custom_fonts;
    }

    /**
     * Initialize the class and set its properties.
     *
     * @since 1.0.0
     */
    public function init() {
        // Register REST API endpoints
        add_action( 'rest_api_init', [ $this, 'register_endpoints' ] );
    }

    /**
     * Register REST API endpoints.
     *
     * @since 1.0.0
     */
    public function register_endpoints() {
        // Endpoint for device settings
        register_rest_route(
            'axcelersblocks/v1',
            '/device-settings',
            [
                'methods' => 'GET',
                'callback' => [ $this, 'get_device_settings' ],
                'permission_callback' => function () {
                    return current_user_can( 'edit_posts' );
                },
            ]
        );

        // Endpoint for custom fonts
        register_rest_route(
            'axcelersblocks/v1',
            '/custom-fonts',
            [
                'methods' => 'GET',
                'callback' => [ $this, 'get_custom_fonts' ],
                'permission_callback' => function () {
                    return current_user_can( 'edit_posts' );
                },
            ]
        );
    }

    /**
     * Callback to return device settings via REST API.
     *
     * @param WP_REST_Request $request The REST request.
     * @return array Device settings.
     *
     * @since 1.0.0
     */
    public function get_device_settings( WP_REST_Request $request ) {
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

        return new WP_REST_Response( $responsive_settings, 200 );
    }

    /**
     * Callback to return custom fonts via REST API.
     *
     * @param WP_REST_Request $request The REST request.
     * @return array Custom fonts.
     *
     * @since 1.0.0
     */
    public function get_custom_fonts( WP_REST_Request $request ) {
        $settings = get_option(
            'axcelersblocks_custom_fonts',
            [
                'uploaded' => [],
                'google'   => [],
                'adobe'    => [],
            ]
        );

        // Ensure all font types are arrays
        if ( ! isset( $settings['uploaded'] ) || ! is_array( $settings['uploaded'] ) ) {
            $settings['uploaded'] = [];
        }
        if ( ! isset( $settings['google'] ) || ! is_array( $settings['google'] ) ) {
            $settings['google'] = [];
        }
        if ( ! isset( $settings['adobe'] ) || ! is_array( $settings['adobe'] ) ) {
            $settings['adobe'] = [];
        }

        $fonts = [];

        // Add uploaded fonts
        foreach ( $settings['uploaded'] as $font ) {
            $fonts[] = [
                'font_name' => $font['name'],
                'type'      => 'uploaded',
            ];
        }

        // Add Google Fonts
        foreach ( $settings['google'] as $font ) {
            $fonts[] = [
                'font_name' => $font['font_name'],
                'type'      => 'google',
                'url'       => $font['url'],
            ];
        }

        // Add Adobe Fonts
        foreach ( $settings['adobe'] as $font ) {
            $fonts[] = [
                'font_name' => $font['font_name'],
                'type'      => 'adobe',
                'url'       => $font['url'],
            ];
        }

        return $fonts;
    }
}
