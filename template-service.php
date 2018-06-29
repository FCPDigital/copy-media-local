<?php 
/* 
Template Name: Nos services
*/ 
get_header(); 

?>


<section class="single mt-5">
  
  <h1 class="title-5 text-center pt-2">Nos services</h1>
  
  <div class="wrapper--big flex flex--center mt-2-i">
    
    <div class="service">
      <div class="service__header">
        <p class="service__title">Équipe commerciale<br>expérimentée</p>
      </div>
      <div class="service__body">
        <img class="service__img" src="<?php echo get_template_directory_uri(); ?>/src/img/services/picto_expert.png" alt="">
        <p class="service__description">Technico-commerciaux formés aux dernières technique</p>
      </div>
    </div>

    <div class="service">
      <div class="service__header">
        <p class="service__title">Assistante commerciale<br>dédiée</p>
      </div>
      <div class="service__body">
        <img class="service__img" src="<?php echo get_template_directory_uri(); ?>/src/img/services/picto_zoom.png" alt="">
        <p class="service__description">Accueil, suivi personnalisé à tout moment</p>
      </div>
    </div>

    <div class="service">
      <div class="service__header">
        <p class="service__title">Réactivité pour nos clients</p>
      </div>
      <div class="service__body">
        <img class="service__img" src="<?php echo get_template_directory_uri(); ?>/src/img/services/picto_timer.png" alt="">
        <p class="service__description">Technico-commerciaux formés aux dernières technique</p>
      </div>
    </div>

    <div class="service">
      <div class="service__header">
        <p class="service__title">Parc machine à la pointe</p>
      </div>
      <div class="service__body">
        <img class="service__img" src="<?php echo get_template_directory_uri(); ?>/src/img/services/picto_machine.png" alt="">
        <p class="service__description">Renouvellement régulier pour répondre à vos besoins</p>
      </div>
    </div>

    <div class="service">
      <div class="service__header">
        <p class="service__title">Service livraison</p>
      </div>
      <div class="service__body">
        <img class="service__img" src="<?php echo get_template_directory_uri(); ?>/src/img/services/picto_livraison.png" alt="">
        <p class="service__description">Gagnez du temps, nous livrons vos commandes</p>
      </div>
    </div>

    <div class="service">
      <div class="service__header">
        <p class="service__title">Proximité de Bordeaux</p>
      </div>
      <div class="service__body">
        <img class="service__img" src="<?php echo get_template_directory_uri(); ?>/src/img/services/picto_map.png" alt="">
        <p class="service__description">Atelier basé aux portes de Bordeaux</p>
      </div>
    </div>

  </div>

  <?php get_template_part("content/content", "needhelp"); ?>
  <?php get_template_part("content/content", "contact"); ?>

</section>


<?php get_footer(); ?>