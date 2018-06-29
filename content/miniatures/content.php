<div class="miniature archive__item" style="background-image: url('<?php echo get_the_post_thumbnail_url(); ?>');">

  <div id="miniature-body-<?php the_ID(); ?>" class="miniature-content <?php post_class(); ?>">
    <p class="miniature-title"><?php echo get_the_title(); ?></p>
    <div class="center"><a class="btn btn--light" href="<?php echo get_the_permalink(); ?> ">En savoir plus</a></div>
  </div>

</div>
