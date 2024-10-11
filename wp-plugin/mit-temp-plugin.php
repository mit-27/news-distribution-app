<?php
/*
 * Plugin Name:       My Basics Plugin
 * Plugin URI:        https://example.com/plugins/the-basics/
 * Description:       Handle the basics with this plugin.
 * Version:           1.10.3
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Mit Suthar
 * Author URI:        https://author.example.com/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI:        https://example.com/my-plugin/
 * Text Domain:       my-basics-plugin
 * Domain Path:       /languages
 */

// Exit if direct access

if (!defined('ABSPATH')) {
    exit;
}



// Include all necessary files

include(plugin_dir_path(__FILE__) . 'includes/fetch-api-data-plugin-display.php');
include(plugin_dir_path(__FILE__) . 'includes/fetch-api-data-plugin-settings.php');


function wsp_enqueue_assets()
{

    wp_enqueue_style('wsp-styles', plugin_dir_url(__FILE__) . 'css/styles.css');
    wp_enqueue_script('wsp-scripts', plugin_dir_url(__FILE__) . 'js/script.js', array('jquery'), null, true);

}



add_action("wp_enqueue_scripts", "wsp_enqueue_assets");



function wsp_enqueue_admin_assets($hook)
{

    // Check if we are on the plugin's settings page to avoid loading scripts unnecessarily
    if ($hook !== 'settings_page_wsp-plugin-settings') {
        return;
    }

    wp_enqueue_style('wsp-styles', plugin_dir_url(__FILE__) . 'css/admin-styles.css');
    wp_enqueue_script('wsp-scripts', plugin_dir_url(__FILE__) . 'js/admin-script.js', array('jquery'), null, true);

}



add_action("admin_enqueue_scripts", "wsp_enqueue_admin_assets");