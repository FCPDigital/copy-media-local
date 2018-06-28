<?php

//* Contrôle si Advanced Custom Field est actif sur le site
if ( ! function_exists( 'get_field' ) ) {
	// Variable pour URL de la page Extension
	$no_acf_plugin_url = get_bloginfo('url') . '/wp-admin/plugins.php';
	// Notice dans le back-office au moment de la désactivation
	add_action('admin_notices','gn_warning_admin_missing_acf');
	function gn_warning_admin_missing_acf() {
       global $no_acf_plugin_url;
	   $output = '<div id="my-custom-warning" class="error fade">';
	   $output .= sprintf('<p><strong>Attention</strong>, ce site ne fonctionne pas sans l\'extension <strong>Advanced Custom Fields</strong>. Merci d\'activer cette <a href="%s">extension</a>.</p>', $no_acf_plugin_url);
	   $output .= '</div>';
	   echo $output;
	 }
	 
	// Notice dans le front qui masque tout le contenu et affiche le lien pour ce connecter
	add_action( 'template_redirect', 'gn_template_redirect_warning_missing_acf', 0 );
	function gn_template_redirect_warning_missing_acf() {
		global $no_acf_plugin_url;
		wp_die( sprintf( 'Ce site ne fonctionne pas sans l\'extension <strong>Advanced Custom Fields</strong>. Merci <a href="%s">d\'activer l\'extension</a>.', $no_acf_plugin_url ) );
	}
}

if(!function_exists("theme_custom_logo")){
	function theme_custom_logo() {
		$custom_logo_id = get_theme_mod( 'custom_logo' );
		$image = wp_get_attachment_image_src( $custom_logo_id , 'full' ); 
		if( is_front_page() ){
			echo '<h1><img class="header__brand-img" src="'.$image[0].'" alt="'.get_bloginfo( 'name' ).'"></h1>';
		} else {
			echo '<a href="'.get_site_url().'"><img class="header__brand-img" src="'.$image[0].'" alt="'.get_bloginfo( 'name' ).'"></a>';  
		}
	}
}




if(function_exists("register_field_group"))
{
	register_field_group(array (
		'id' => 'acf_homepage',
		'title' => 'homepage',
		'fields' => array (
			array (
				'key' => 'field_5ae1cb9d68186',
				'label' => 'Sous titre',
				'name' => 'subtitle',
				'type' => 'text',
				'instructions' => 'Titre de la section 2',
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_5ae1cbbf68187',
				'label' => 'Bloc additionnel',
				'name' => 'additionnal_content',
				'type' => 'wysiwyg',
				'instructions' => 'Bloc de couleur dans le quel placé un texte',
				'default_value' => '',
				'toolbar' => 'full',
				'media_upload' => 'yes',
			)
		),
		'location' => array (
			array (
				array (
					'param' => 'page_template',
					'operator' => '==',
					'value' => 'template-home.php',
					'order_no' => 0,
					'group_no' => 0,
				),
			),
		),
		'options' => array (
			'position' => 'normal',
			'layout' => 'no_box',
			'hide_on_screen' => array (
			),
		),
		'menu_order' => 0,
	));
}


add_action( 'widgets_init', 'footer_widgets_init' );
function footer_widgets_init() {
    register_sidebar( array(
        'name' => __( 'Footer 1', 'footer-1' ),
        'id' => 'footer-1',
        'description' => "Colonne de gauche du footer",
        'before_widget' => '<div id="%1$s" class="footer__widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h3 class="title-4 text-center">',
		'after_title'   => '</h3>',
	) );
	
	register_sidebar( array(
        'name' => __( 'Footer 2', 'footer-2' ),
        'id' => 'footer-2',
        'description' => "Colonne de droite du footer",
        'before_widget' => '<div id="%1$s" class="footer__widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h3 class="title-4 text-center">',
		'after_title'   => '</h3>',
    ) );
}

function theme_setup() {

	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size( 825, 510, true );
	// This theme uses wp_nav_menu() in two locations.
	register_nav_menus( array(
		'primary' => __( 'Primary Menu',      'twentyfifteen' ),
		'social'  => __( 'Social Links Menu', 'twentyfifteen' ),
	) );
	add_theme_support( 'post-formats', array(
		'aside', 'image', 'video', 'quote', 'link', 'gallery', 'status', 'audio', 'chat'
	) );



}

add_action( 'after_setup_theme', 'theme_setup' );


function theme_custom_logo_setup() {
  $defaults = array(
      'height'      => 100,
      'width'       => 400,
      'flex-height' => true,
      'flex-width'  => true,
      'header-text' => array( 'site-title', 'site-description' ),
  );
  add_theme_support( 'custom-logo', $defaults );
}
add_action( 'after_setup_theme', 'theme_custom_logo_setup' );


function theme_scripts() {

	// Load our main stylesheet.
	wp_enqueue_style( 'twentyfifteen-style', get_stylesheet_uri() );
	wp_enqueue_script( 'twentyfifteen-script', get_template_directory_uri() . '/js/index.js', array( 'jquery' ), '20150330', true );

}
add_action( 'wp_enqueue_scripts', 'theme_scripts' );


function get_archive_background($term = null){
  if(!$term) $term = get_term_by('id', get_queried_object()->term_id, 'category');
  
  if (function_exists('z_taxonomy_image_url')) {
    return z_taxonomy_image_url($term->term_id);
  }
  return "";
}

function prefix_category_title( $title ) {
    if ( is_category() ) {
        $title = single_cat_title( '', false );
    }
    return $title;
}
add_filter( 'get_the_archive_title', 'prefix_category_title' );

function the_burger() {
	echo '
	<svg id="Layer_1"
	data-name="Layer 1"
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 34.28 23.67"
	class="header__menu-img">
	<title>burger</title>
	<rect class="rect-1" width="29" height="5" rx="2.5" ry="2.5" fill="#293d60"/>
	<rect class="rect-2" y="9.33" width="21" height="5" rx="2.5" ry="2.5" fill="#293d60"/>
	<rect class="rect-3" y="18.67" width="34" height="5" rx="2.5" ry="2.5" fill="#293d60"/>
	</svg>';
}


/******************* SHORTCODE ********************/

function button_shortcode( $atts, $content ){
	$a = shortcode_atts( array(
        'href' => null,
        'class' => '',
        'id' => '',
        'center' => false,
        'content' => "Envoyer"
  ), $atts );

	$content = "";

	if($a['center']){
		$content .="<div class='center-x'>";
	}
	if($a['href']){
		$content .= "<a href='".$a['href']."' class='btn ".$a['class']."' id='".$a["id"]."'>".$a["content"]."</a>";
	} else {
		$content .= "<button class='btn ".$a['class']."' id='".$a["id"]."'>".$a["content"]."</button>";
	}

	if($a['center']){
		$content.= "</div>";
	}

	return $content;
}
add_shortcode( 'button', 'button_shortcode' );


function categories_samples( $atts ){

	$a = shortcode_atts( array(
        'count' => 3,
        'cta' => true,
        'only' => null,
        'exclude' => null,
        'type' => "post" 
  ), $atts );
	if( $a["only"] ) { $only = explode (",", $a["only"]); }
	if( $a["exclude"] ) { $exclude = explode (",", $a["exclude"]); }
	
	$terms = get_terms('category', array( 'taxonomy' => 'category', 'hide_empty' => false));
	$termsSaved = $terms;
	$terms_id = [];

	// Store ids
	for($i=0; $i<count($terms); $i++){
		array_push($terms_id, $terms[$i]->term_id);
	}

	if( isset($only) ){
		$termsSaved = [];
		for($i=0; $i<count($terms); $i++){
			if(array_search( strval($terms[$i]->term_id), $only) >= 0){
				array_push($termsSaved, $terms[$i]);
			}
		}
	}

	if( isset($exclude) ){
		$termsSaved = [];
		for($i=0; $i<count($terms); $i++){
			if(array_search(strval($terms[$i]->term_id), $exclude) == false){
				array_push($termsSaved, $terms[$i]);
			}
		}
	}

  if( count($termsSaved) > $a["count"] ){
    $termsSaved = array_slice($termsSaved, 0, $a["count"]);
  } 

	$content = "<div class='categories-container'><div class='categories'>";
	for($i=0; $i<count($termsSaved); $i++){
		$img = z_taxonomy_image_url($termsSaved[$i]->term_id);
		$content .= '<div id="category-miniature-'.$termsSaved[$i]->term_id.'" class="categories__item" style="background-image: url('.$img.');">
			<div class="categories__item-content">
				<p class="categories__item-title">'.$termsSaved[$i]->name.'</p>
				<div class="center"><a class="btn btn--light" href="'.get_term_link($termsSaved[$i], "category").'">En savoir plus</a></div>
			</div>
		</div>';
	}
	$content .= "</div>"; // End categories
	if( $a["cta"] ){
		$content .= "<div class='categories-container__actions'>
			<a class='btn btn--primary' href='".get_post_type_archive_link($a["type"])."'>Voir plus</a>
		</div>";
	}
	$content .= "</div>"; // End categories-container
	return $content;
}
add_shortcode( 'categories-samples', 'categories_samples' );


function shortcode_text( $atts, $content ){
	$a = shortcode_atts( array(
        'id' => '',
        'class' => ''
  ), $atts );

  return "<div id='".$a["id"]."' class='wrapper text ".$a["class"]."'>".$content."</div>";
}

add_shortcode( 'text', 'shortcode_text' );


function shortcode_contact( $atts, $content ){
	$a = shortcode_atts( array(
        'expanded' => false
  ), $atts );

  return "<div id='".$a["id"]."' class='wrapper text ".$a["class"]."'>".$content."</div>";
}

add_shortcode( 'contact', 'shortcode_contact' );

/******************* POST TYPES ********************/


function wporg_custom_post_type()
{
	register_post_type('product',
		array(
			'labels'      => array(
				'name'          => __('Products'),
				'singular_name' => __('Product'),
			),
			'public'      => true,
			'has_archive' => true,
			'taxonomies'  => array( 'category', 'category-product' ),
			'public' => true,
      'show_ui' => true,
      'show_in_menu' => true,
      'menu_position' => 5,
      'show_in_nav_menus' => true,
      'publicly_queryable' => true,
      'exclude_from_search' => false,
      'has_archive' => true,
      'query_var' => true,
      'can_export' => true,
      'rewrite' => true,
		)
	);
}
add_action('init', 'wporg_custom_post_type');


