<?php
session_start();
////////////////////////////////////////////////////////////////////////////////////////
//
//              FONCTIONS UTILES
//
////////////////////////////////////////////////////////////////////////////////////////

// Récupère les variable d'environnement, les requêtes sql et la connexion à la bdd
require_once "../../../wp-config.php";
require_once "helpers/request.php";


// Test si un élément POST existe et le remplace par la valeur souhaité le cas échéant (ici "")
function if_exist($arg, $default = ""){
  if(isset($_POST[$arg])){
    return htmlspecialchars($_POST[$arg]);
  }
  return $default;
}

////////////////////////////////////////////////////////////////////////////////////////
//
//              Récupération des paramètres
//
////////////////////////////////////////////////////////////////////////////////////////

//Initialisation
$notice = array();
$date_d=date('d m Y H:i'); //date pour l'envoi du formulaire

//Ces valeurs sont spécifié dans le wp-config
$destinataire = DEVIS_DETAIL;
$destinataireSimple = DEVIS_SIMPLE;
$from_cli=  DEVIS_FROM_SIMPLE;
$Cc = DEVIS_COPY;

//Si on est en local on envoi pas les mails
$sendMail = true;
if(DB_NAME == 'copymedia'){
  $sendMail = false;
}

//Inputs Hidden servant à la redirection et à définir la source des requêtes
$callback = if_exist("callback", "http://".$_SERVER['HTTP_HOST']);
$currentUrl = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]".if_exist("current_url");

$contact = if_exist('contact'); //A voir si on supprime

//Paramètre principaux
$nom = if_exist("nom");
$email = if_exist("email");
$tel = if_exist("tel");
$dispo = if_exist("dispo");
$web = if_exist("web");
$soci= if_exist('soci');
$civ= if_exist('civ');
$city = if_exist('city');
$cp = if_exist('cp');
$pays = if_exist('pays');
$delais=if_exist('delais');
$titre=if_exist('titre');
$note=if_exist('com');
$devis_type = if_exist("devis_type");

//Paramètre secondaire (devis détailler)
$type = if_exist("type");  // Devis Simple
$nbr_page = if_exist("nbr_page");
$nbr_ex = if_exist("nbr_ex");
$projet = if_exist("projet");
$mod_imp_feu_coul= if_exist('mod_imp_feu_coul', null);    // Nombre de page couleure si il y a du noir et blanc et du couleur
$mod_imp_feu = if_exist("mod_imp_feu");                   // Type d'impression : couleur / noir et blanc / Les deux
$format_livre= if_exist('format_livre');                  // Format du livre (dimension et reliure)
$mod_couv = if_exist('mod_couv');                         // Type d'impression de couverture
$couv_autre1 = if_exist('couv_autre1');                   //  Autre type de couverture
$papier_couv = if_exist('papier_couv');                   // Papier de couverture
$couv_papier_autre1 = if_exist('couv_papier_autre1');     // Si c'est un autre papier de couverture
$peli = if_exist('peli');                                 // Type de peliculalge : brillant, etc...
$rabat = if_exist('rabat');                               // Il y a un rabat ou non
$reliureRS = if_exist('reliureRS');                       // Type de reliure (Dos carré etc...)
$option_de_couverture = if_exist('Option_de_couverture');
$fe_papier = if_exist('fe_papier');
$papier_autre_feu1 = if_exist('papier_autre_feu1');
$isbn = if_exist('Num_ISBN');


/*
- Num_ISBN
- contact

*/

////////////////////////////////////////////////////////////////////////////////////////
//
//              Gestion des attributs
//
////////////////////////////////////////////////////////////////////////////////////////


// Si le nombre d'exemplaires est inférieur à 25 on lance une notice et on redirige vers la page de devis
// if ($nbr_ex< 25) {
//   $notice["type"] = "error";
//   $notice["value"] = "<p>&nbsp;</p><p>&nbsp;</p><div class=alert>Le nombres d'exemplaires est inférieur à 25, <br> nous ne pouvons pas traiter de votre demande </a></div><p>&nbsp;</p><p>&nbsp;</p>";
//   header("Location: ".$currentUrl);
// }



if($nom == "" || $email == "" || $tel == "" || $dispo == "" || $devis_type == "" || $nbr_ex == "" || $nbr_page == "") {
  header("Location: ".$currentUrl);
  exit;
}


// Si on a définis le mode d'impression
if($mod_imp_feu_coul){
  $text_coul="Dont nombre de pages en couleur : $mod_imp_feu_coul";
} else {
  $text_coul = "";
}

if($devis_type == "detail") {
  $impression_couv="Format du livre ferm&eacute; en cm : ".$format_livre."
  <br><br><font color=#A10D59><b>COUVERTURE</b></font><br><br>
  Mode impression couverture : ".$mod_couv." ".$couv_autre1." <br>
  Papier couverture : ".$papier_couv." ".$couv_papier_autre1."  <br>
  Pelliculage : ".$peli."<br><br>
  Option rabats de couverture : ".$rabat."<br>
  Reliure : ".$reliureRS."<br><br>";
}




if (!isset($impression_couv)) {
  $impression_couv = "";
}



////////////////////////////////////////////////////////////////////////////////////////
//
//              Envoi email
//
////////////////////////////////////////////////////////////////////////////////////////

//On définis les headers des emails
$sujet_cli = "Votre demande de devis d'impression - Copy-Média" ;
$headers = "From:".$from_cli."\n";
$headers .= "Reply-To:".$from_cli."\n";
$headers .= "Content-Type: text/html; charset=\"UTF-8\"";

// Si le devis et détaillé
if($devis_type == "detail"){
  // Si la source n'est pas encore définis
  if(!isset($source)) {  $source = "Devis detail";  }
  require "emails/mail_admin_devis_detail.php";
  require "emails/mail_client_devis_detail.php";

} else {

  // Si la source n'est pas encore définis
  if(!isset($source)){
    switch($devis_type){
      case "simple" : $source = "Devis simple"; break;
      case "B2B" : $source = "B2B"; break;
      case "B2C" : $source = "B2C"; break;
    }
  }
  require "emails/mail_admin_devis_simple.php";
  require "emails/mail_client_devis_simple.php";
}


////////////////////////////////////////////////////////////////////////////////////////
//
//              Envoi requête
//
////////////////////////////////////////////////////////////////////////////////////////


// Ouverture de la requête avec tout ses paramètres
$req = $bdd->prepare('INSERT INTO devis_detail(
 date,devis,commercial,nbdevis,soc,civ,nom,cp,ville,pays,tel,dispo,email,nbr_page,nbr_ex,delais,titre,note,refUrl,campagne_nom,campagn_medium,campagne_content,campagne_term,date_first_visit,date_previous_visit,pages_viewed_current_visit,source)
VALUES( now(),:devis,:commercial,:nbdevis,:soc,:civ,:nom,:cp,:ville,:pays,:tel,:dispo,:email,:nbr_page,:nbr_ex,:delais,:titre,:note,:refUrl,:campagne_nom,:campagn_medium,:campagne_content,:campagne_term,:date_first_visit,:date_previous_visit,:pages_viewed_current_visit,:source)'
);

// Exécution
$req->execute(array(
	'devis' => htmlspecialchars($message),
	'commercial' => "",
	'nbdevis' => 1,
	'soc' => $soci,
	'civ' => $civ,
  'nom' => $nom,
  'cp' => $cp,
  'ville' => $city,
  'pays' => $pays,
  'tel' => $tel,
  'dispo' => $dispo,
  'email' => $email,
  'nbr_page' => $nbr_page,
  'nbr_ex' => $nbr_ex,
  'delais' => $delais,
  'titre' => $titre,
  'note' => $note,
  'refUrl' => $currentUrl,
  'campagne_nom' => "",
  'campagn_medium' => "",
  'campagne_content' => "",
  'campagne_term' => "",
  'date_first_visit' => "",
  'date_previous_visit' => "",
  'pages_viewed_current_visit' => "",
  'source' => $source
	));


  ////////////////////////////////////////////////////////////////////////////////////////
  //
  //              Notice
  //
  ////////////////////////////////////////////////////////////////////////////////////////



$_SESSION["notice"] = array(
  "content" => "<p>
      <strong>Votre demande de devis a bien &eacute;t&eacute; prise en compte et<br>
      sera trait&eacute;e dans les plus brefs d&eacute;lais.<br><br></strong>
      Retrouver un récapitulatif de votre demande sur votre adresse e-mail : <em>".$email."</em>
      <br>
      Attention en raison de la complexité technique des devis, un attaché commercial vous contactera obligatoirement sous 24/48h (jours ouvrés) pour valider les informations contenues dans votre demande. Ce conseiller vous accompagnera et sera votre interlocuteur unique du devis à la livraison de vos ouvrages.
    </p>",
  "type" => "sucess"
);



////////////////////////////////////////////////////////////////////////////////////////
//
//              Conversion Google
//
////////////////////////////////////////////////////////////////////////////////////////



switch($source){

  case "Devis detail" :
    $_SESSION["google_converse"] = array(
      "id" => 1070647185,
      "label" => "T7g6CKnY7wMQkY_D_gM",
      "format" => 2,
      "lang" => "fr" );
    break;

  case "Devis simple" :
    $_SESSION["google_converse"] = array(
      "id" => 1070647185,
      "label" => "T7g6CKnY7wMQkY_D_gM",
      "format" => 2,
      "lang" => "fr" );
    break;

  case "B2C" :
    $_SESSION["google_converse"] = array(
      "id" => 1070647185,
      "label" => "qHdPCMm3iAoQkY_D_gM",
      "format" => 2,
      "lang" => "fr"
    );
    break;

  case "B2B" :
    $_SESSION["google_converse"] = array(
      "id" => 1070647185,
      "label" => "BMdbCLTzlFkQkY_D_gM",
      "format" => 2,
      "lang" => "en"
    );
    break;
}

// var_dump($callback."/?campain=".$_SESSION["google_converse"]["id"]);
// On redirige vers le callback
header("Location: ".$callback."/?campain=".$_SESSION["google_converse"]["label"]);


?>
