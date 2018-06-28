<?php
/*
Template Name: Demande de devis

Ce template correspond à la demande de devis simple.
Il est composé d'un formulaire ayant pour action le script send-devis.php
Le formulaire est vérifié par un objet javascript FormChecker situés dans js/functions.js

- callback
- current_url
- devis_type
- nom
- email
- tel
- dispo
- type
- nbr_page
- nbr_ex
- com
- web

*/

get_header();

?>
<main id="page" class="calcul-dos-container">
  <div class="container">
    <form class="form control" action="<?php bloginfo('template_url'); ?>/send-devis.php" method="post" novalidate>
      <h1 class="title">Devis d'impression gratuit</h1>
      <a href="<?php echo get_permalink(get_page_by_title("Demande de devis detailé")); ?>">Cliquez ici pour un devis plus détaillé</a>
      <fieldset>
        <legend>Coordonnées personnelles &#38; disponibilités</legend>
        <input type="hidden" name="callback" value="<?php echo get_home_url(); ?>">
        <input type="hidden" name="current_url" value="<?php echo $_SERVER['REQUEST_URI']; ?>">
        
        <input type="hidden" name="devis_type" value="simple">

        <input type="text" name="nom" value="" required="required" class="form-control" placeholder="Votre nom*">
        <i class="mention">Vous devez rentrez un nom valide</i>
        
        <input type="email" name="email" value="" required="required" class="form-control" placeholder="Votre email *" pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$">
        <i class="mention">Vous devez rentrez un e-mail valide</i>
        
        <input type="tel" name="tel" value="" required="required" class="form-control" placeholder="Votre téléphone *" pattern="^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$">
        <i class="mention">Vous devez rentrez un numéro de téléphone valide</i>
        
        <select name="dispo" class="form-control" style="width: 339px;">
          <option value="" selected="">Disponibilités téléphonique</option>
          <option value="Le matin">Le matin</option>
          <option value="après midi">L'après midi</option>
          <option value="fin de journée">En fin de journée</option>
        </select>
      
      </fieldset>
      <fieldset>
        <legend>Votre projet</legend>



        <textarea name="com" rows="8" cols="80" class="form-control" placeholder="Détaillez-nous votre projet !"></textarea>

    </form>

    <div style="font-size: .8em; line-height:1.3em;" class="margin-top-big">
      Les informations recueillies font l’objet d’un traitement informatique destiné à notre service commercial.
      <br>
      Vous êtes susceptibles de recevoir des offres commerciales de notre société uniquement pour des produits et services analogues. Les destinataires des données sont les attachés commerciaux réalisant vos devis.
      <br>
      Conformément à la loi « informatique et libertés » du 6 janvier 1978 modifiée en 2004, vous bénéficiez d’un droit d’accès et de rectification aux informations qui vous concernent, que vous pouvez exercer en vous adressant à serviceclient@copy-media.com ou COPY-MEDIA, Service Client,  Parc d'activité du Courneau 33610 Canéjan.
      <br>
      Vous pouvez également, pour des motifs légitimes, vous opposer au traitement des données vous concernant.
      <br>
      Site déclaré à la CNIL sous l'identifiant : 1590411
    </span>

  </div>
  </div>
</main>

<?php get_footer(); ?>
