<?php ?>

</main><!-- .site-content -->

<footer class="footer">
	<div class="grid wrapper">
		<div class="text-center">
			<img class="footer__signature" src="<?php echo get_template_directory_uri(); ?>/src/img/imprimvert.png" alt="Imprim vert Imprimer">
			<img class="footer__signature" src="<?php echo get_template_directory_uri(); ?>/src/img/imprimfrance.png" alt="Imprim france Imprimer">
		</div>
		<div class="col-1">
			<p class="footer__legal text-center">Les informations recueillies font l’objet d’un traitement informatique destiné à notre service commercial.
			Vous êtes susceptibles de recevoir des offres commerciales de notre société uniquement pour des produits et services analogues. Les destinataires des données sont les attachés commerciaux réalisant vos devis.
			Conformément à la loi « informatique et libertés » du 6 janvier 1978 modifiée en 2004, vous bénéficiez d’un droit d’accès et de rectification aux informations qui vous concernent, que vous pouvez exercer en vous adressant à serviceclient@copy-media.com ou COPY-MEDIA, Service Client, Parc d'activité du Courneau 33610 Canéjan.
			Vous pouvez également, pour des motifs légitimes, vous opposer au traitement des données vous concernant.
			Site déclaré à la CNIL sous l'identifiant : 1590411</p>
		</div>
		<div class="col-s-1-2">
			<?php 
			dynamic_sidebar( "footer-1" ); 
			?>
		</div>
		<div class="col-s-1-2">
			<?php 
			dynamic_sidebar( "footer-2" ); 
			?>
		</div>
	</div>
	<div class="mt-1">
		<p class="text-center">2018 © Copyright Copy-media, Tout droits Réservés.</p>
	</div>
</footer>



<?php wp_footer(); ?>

</body>
</html>
