<?php
/**
 * The template for displaying all single posts and attachments
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */

get_header(); ?>


<section class="single">
  
  <?php
  // Start the loop.
  while ( have_posts() ) : the_post();

  ?>
  
  <div class="grid mt-4">
    <div class="wrapper">
      <div class="col-s-1-2 mt-2">
        <h1 class="single__title title-5"><?php echo get_the_title(); ?></h1>
        <img class="single__background" src="<?php echo get_the_post_thumbnail_url(); ?>" alt="<?php echo get_the_title(); ?>">
      </div>
      <div class="col-s-4-10 left-s-1-10 mt-2">
        <h2 class="single__title title-5">Demande de devis</h2>
        <?php echo do_shortcode( "[devis]" ); ?> 
      </div>
    </div>
    <div class="clear"></div>
  </div>
  
  <div class="mt-2 mb-2">
    <article class="text wrapper">
      <?php the_content(); ?>
    </article>
  </div>

  <div class="bg-color-primary pt-3 pb-3">
    <h2 class="title-5 text-center color-white"><?php echo the_field("title_block_2"); ?></h2>
    <div id="product-carousel" class="carousel miniatures wrapper--wide mt-3-i">
      <div class="carousel__container">
         <?php 
        $products = get_field("produits_relation");
        $finitions = get_field("finitions_relation");
        
        if(is_array($products) && is_array($finitions)){
          $items = array_merge($products, $finitions);
          shuffle($items);
        } elseif(is_array($products)){
          $items = $products;
        } elseif(is_array($finitions)){
          $items = $finitions;
        } else {
          $items = [];
        }

        for($i=0; $i<count($items); $i++){ ?>
          <div class="carousel__item miniature miniature--small archive__item" style="background-image: url('<?php echo get_the_post_thumbnail_url($items[$i]); ?>');">
            <div class="miniature-content">
              <p class="miniature-title"><?php echo get_the_title($items[$i]); ?></p>
              <div class="center"><a class="btn btn--light" href="<?php echo get_the_permalink($items[$i]); ?> ">En savoir plus</a></div>
            </div>
          </div>
        <?php } ?>
      </div>
    </div>
  </div>


  <?php 
  // End the loop.
  endwhile;
  ?>

</section>

<?php get_footer(); ?>
