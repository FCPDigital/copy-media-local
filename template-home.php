<?php 
/* 
Template Name: Page d'accueil 
*/ 
get_header(); 
$base_post = get_post();
?>

<section class="home wrapper--big">
    <?php if(has_post_thumbnail()) { ?>
        <div id="anchor-1" class="home__landing section center-y">
            <img src="<?php echo get_the_post_thumbnail_url(); ?>" alt="<?php echo get_the_title(); ?>">
        </div>
    <?php } elseif( get_field("carousel") ) {
        echo do_shortcode(get_field("carousel"));
    } ?>
    

    <?php while ( have_posts() ) : the_post(); ?>
    

    <div id="anchor-2" class="section section--top-bg">
        
        <div class="">
            <div class="home__title-container">
                
                <h1 class="title-1 title"><?php echo get_the_title(); ?></h1>
                <h2 class="home__subtitle title-2 mb-5 ml-2 mr-2"><?php echo get_field("subtitle"); ?></h2>
            </div>
            <div class="">
                <?php the_content(); ?>
            </div>
            
            <!-- Contact -->
            <?php get_template_part( 'content/content', 'contact' ); ?>
        </div>
    </div>


    <?php endwhile; ?>
</section>


<?php 
get_footer(); 
?>