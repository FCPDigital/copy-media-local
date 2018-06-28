<?php get_header(); ?>

<main id="homepage">

  <? // CAROUSEL PRINCIPALE ?>
  <section class="container-fluid nopad carousel-container">
    <div id="homeCarousel" class="carousel-SDR carousel" data-interval="10000" data-autoload>

      <? // Récupère les posts ayant la catégories slideHome ?>
      <?php $args = array('category' => get_cat_ID("slidehome")  );
      $sliderPosts = get_posts($args);

      // Parcours les posts et crée un item de carousel à chaque itération
      foreach( $sliderPosts as $post ) {
       setup_postdata($post); ?>
       <?php if ( has_post_thumbnail() && has_category("sliderhome") ) : ?>
         <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
         <div class="item-carousel article"  data-animation="opacity">
           <img src="<?php the_post_thumbnail_url('sliderhome'); ?>" alt="">
           <div class="text">
             <!-- <p class="title"><?php the_content(); ?></p> -->
             <p class="mention"><?php the_title(); ?></p>
           </div>
         </div>
        </a>
      <?php endif; ?>
      <?php } ?>

    </div>
  </section>

  <div class="process-container">
    <div class="process">
      <p class="state">
        1 <span class="mention">Je fais<br> mon devis</span>
      </p>
      <p class="state">
        2 <span class="mention">Je passe<br> commande</span>
      </p>
      <p class="state">
        3 <span class="mention">Je dépose<br> mes fichiers</span>
      </p>
      <p class="state">
        4 <span class="mention">Ja valide<br> mon bon à tirer</span>
      </p>
      <p class="state">
        5 <span class="mention">Je suis<br> livré sous 7 jours</span>
      </p>
    </div>
    <? // Ekomi widget ?>
    <div id="widget-container" class="in_homepage"></div>
  </div>


  <? // Contenu homepage ?>
  <section class="container" id="content-page">
    <h2>Nos méthodologies<br>d'impression</h2>
    <article class="">
      <h3>Copy-média, imprimerie numérique sur Bordeaux</h2>
      <p>Copy-média, entreprise créée en 1995 par Pierre Picard et Elodie Dartois, est devenue en 20 ans une imprimerie numérique de livres d’envergure nationale. Elle est spécialisée dans l’impression de livres, de romans et de brochures. Avec plus de 3,5 millions d’euros de chiffre d’affaires et 25 collaborateurs, Copy-média réalise toutes vos impressions de livres, romans et brochures quel que soit leur degré de complexité technique.</p>
      <p>La société est située à proximité de l’aéroport international de Bordeaux, ce qui nous permet de livrer en France, Belgique, Suisse, Luxembourg et dans plusieurs pays africains francophones.</p>
      <p>Pour satisfaire au maximum la demande de nos clients et accroître notre performance, nous investissons sans cesse dans du nouveau matériel d’impression, de façonnage et de communication.</p>
      <p>Depuis son ouverture en 1995, Copy-Média a dépassé le milliard de pages imprimées en noir et blanc ou couleur en format livres.</p>
      <p>Copy-média, des spécialistes de l’imprimerie du livre sur internet à votre écoute ! Copy-média ce sont de véritables professionnels avec un service adapté aux besoins de chacun (particuliers ou entreprises) et une qualité irréprochable.</p>
    </article>
    <a href="<?php echo get_permalink(get_page_by_title("Demande de devis simple")); ?>" class="btn btn-colored">Demandez un devis</a>
  </section>

</main>

<?php get_footer(); ?>
