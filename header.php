<?php
/**
 * The template for displaying the header
 * Displays all of the head element and everything up until the "site-content" div.
 */
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,800" rel="stylesheet"> 
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<header class="header">
	<div class="header__block header__block--left header__brand">
		<?php theme_custom_logo(); ?>
	</div>
	<div class="show-s header__block header__block--right">
		<button class="header__menu header__menu--right" data-toggle-target="#main-menu" data-toggle-modifier="menu--hidden">
			<i class="material-icons">menu</i>
		</button>
	</div>
	<div class="hide-s header__block menu header__block--right">
			<?php 
			wp_nav_menu( array(
				'menu_class'     => 'menu__main',
				'theme_location' => 'primary',
			) );
			?>
	</div>

</header>

<main class="main">
