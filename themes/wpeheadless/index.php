<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage WPE_Headless
 * @since WPE Headless 0.1
 */
header('Content-Type: application/json');

$json = (object)array(
    'is_archive' => is_archive(),
    'post_type' => get_post_type(),
    'is_404' => is_404(),
    'is_single' => is_single(),
    'is_page' => is_page(),
    'is_home' => is_home(),
    'is_category' => is_category(),
    'is_author' => is_author(),
    'is_search' => is_search(),
    'post_id' => get_the_id(),
    'have_posts' => have_posts(),
    'is_tag' => is_tag()
);

echo json_encode($json)
?>
