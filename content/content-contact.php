<section class="container contact" id="contact">
  
    <div class="wrapper">
        <div class="title__container">
            <h2 class="title--crossed title--2">Contact</h2>
        </div>

        <div class="line mb-5">
            <div class="col-s-1-2 p-1 text-center">
                <h3 class="title-3">
                    Vous souhaitez nous rencontrer ?
                    <br>Prenez un rendez-vous
                </h3>
                <form action="send-devis.php" method="post" class="form text-center">
                    <input type="hidden" value="PDV" name="commerciale">
                    <input type="hidden" value="PDV-mail" name="devis_type">
                    <input type="hidden" name="current_url" value="<?php echo $_SERVER['REQUEST_URI']; ?>">

                    <div class="form__group">
                        <input type="text" class="form__input" name="nom" placeholder="Votre nom, prénom" required="required">
                    </div>
                    <div class="form__group">
                        <input type="text" class="form__input" name="tel" placeholder="Votre téléphone" required="required">
                    </div>
                    <div class="form__group">
                        <input type="text" class="form__input" name="email" placeholder="Votre email" required="required">
                    </div>
                    <div class="form__group">
                        <input type="text" class="form__input" name="com" placeholder="Date souhaitée (jour/mois/année)" required="required">
                    </div>
                    <div class="text-center mt-2 full-w">
                        <input type="submit" class="btn btn--main form__submit" value="Validez">
                    </div>
                </form>
            </div>

            <div class="col-s-1-2 p-1 text-center contact__info">
                <h3 class="title-4 mt-1">COPY-MEDIA</h3>
                <p class="text--line-md">
                    Parc d'activités du Courneau<br>
                    1bis, Avenue de Guitayne<br>
                    33610 CANEJAN<br>
                    Sortie 25 de l'autoroute A63 direction Arcachon
                </p>
                <p class="text--line-md mt-1">
                    <?php
                    $i = floor(rand(0, 1));
                    $tels = array("+33 (0)5 24 73 15 93", "+33 (0)5 24 72 85 97");
                    ?>

                    <a href="#" class="no-link"><?php echo $tels[$i]; ?></a>
                </p>
                <p class="text--line-md margin-top-small">
                    Horaires: 9h-18h du lundi au vendredi
                </p>
                <h3 class="title-4 mt-2">SUIVEZ-NOUS !</h3>
                <div class="socials">
                    <a href="https://www.facebook.com/copymedia/" class="socials__item">
                        <img src="<?php echo get_template_directory_uri(); ?>/src/img/social/picto-fb.png" alt="">
                    </a>
                    <a href="https://plus.google.com/+COPYMEDIAMerignac/about" class="socials__item">
                        <img src="<?php echo get_template_directory_uri(); ?>/src/img/social/picto-google.png" alt="">
                    </a>
                    <a href="https://www.linkedin.com/company/copy-media/" class="socials__item">
                        <img src="<?php echo get_template_directory_uri(); ?>/src/img/social/picto-linkedin.png" alt="">
                    </a>
                    <a href="http://www.pinterest.com/copymedia/" class="socials__item">
                        <img src="<?php echo get_template_directory_uri(); ?>/src/img/social/picto-pinterest.png" alt="">
                    </a>
                    <a href="https://twitter.com/@CopyMediaPrint" class="socials__item">
                        <img src="<?php echo get_template_directory_uri(); ?>/src/img/social/picto-twitter.png" alt="">
                    </a>
                    <a href="https://www.youtube.com/user/imprimeriecopymedia" class="socials__item">
                        <img src="<?php echo get_template_directory_uri(); ?>/src/img/social/picto-youtube.png" alt="">
                    </a>
                </div>
            </div>
            <div class="clear"></div>
        </div>
    </div>
    

    <div class="map margin-top-medium">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2832.8893755259883!2d-0.67282204938877!3d44.76267078789653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd54d86e9d72f74b%3A0xa05832d903d4f376!2sCOPY-MEDIA+Imprimer+son+livre+ou+roman+simplement!5e0!3m2!1sfr!2sfr!4v1516630326559" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
    </div>
</section>