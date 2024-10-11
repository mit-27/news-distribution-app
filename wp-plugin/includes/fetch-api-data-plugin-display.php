<?php

function fetch_api_data()
{
    $response = wp_remote_get('http://localhost:3000/api/news');

    if (is_wp_error($response)) {
        return 'Error fetching data';
    }

    $data = json_decode(wp_remote_retrieve_body($response), true);
    return $data;
}

function display_api_data()
{
    $data = fetch_api_data();
    ob_start();

    if (is_array($data)) {
        echo '<ul>';
        foreach ($data as $item) {
            echo '<li>' . esc_html($item['title']) . '</li>'; // Adjust according to your data structure
        }
        echo '</ul>';
    } else {
        echo '<p>' . esc_html($data) . '</p>'; // Display error message if applicable
    }

    return ob_get_clean();
}

add_shortcode('api_data', 'display_api_data');