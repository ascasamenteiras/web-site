const mailTemplate = (
  fullUrl,
  siteUrl,
  logoImage,
  marca,
  floralCima,
  florBaixo,
  floralMeio,
  CTABUTTON
) => `
  <!doctype html>
  <html ⚡4email data-css-strict>
    <head>
      <meta charset="utf-8">
      <style amp4email-boilerplate>body{visibility:hidden}</style>
      <script async src="https://cdn.ampproject.org/v0.js">
      </script>
      <style amp-custom>.es-desk-hidden {	display:none;	float:left;	overflow:hidden;	width:0;	max-height:0;	line-height:0;}body {	width:100%;	font-family:Poppins, sans-serif;}table {	border-collapse:collapse;	border-spacing:0px;}table td, body, .es-wrapper {	padding:0;	Margin:0;}.es-content, .es-header, .es-footer {	table-layout:fixed;	width:100%;}p, hr {	Margin:0;}h1, h2, h3, h4, h5 {	Margin:0;	line-height:120%;	font-family:"Alex Brush", cursive;}.es-left {	float:left;}.es-right {	float:right;}.es-p5 {	padding:5px;}.es-p5t {	padding-top:5px;}.es-p5b {	padding-bottom:5px;}.es-p5l {	padding-left:5px;}.es-p5r {	padding-right:5px;}.es-p10 {	padding:10px;}.es-p10t {	padding-top:10px;}.es-p10b {	padding-bottom:10px;}.es-p10l {	padding-left:10px;}.es-p10r {	padding-right:10px;}.es-p15 {	padding:15px;}.es-p15t {	padding-top:15px;}.es-p15b {	padding-bottom:15px;}.es-p15l {	padding-left:15px;}.es-p15r {	padding-right:15px;}.es-p20 {	padding:20px;}.es-p20t {	padding-top:20px;}.es-p20b {	padding-bottom:20px;}.es-p20l {	padding-left:20px;}.es-p20r {	padding-right:20px;}.es-p25 {	padding:25px;}.es-p25t {	padding-top:25px;}.es-p25b {	padding-bottom:25px;}.es-p25l {	padding-left:25px;}.es-p25r {	padding-right:25px;}.es-p30 {	padding:30px;}.es-p30t {	padding-top:30px;}.es-p30b {	padding-bottom:30px;}.es-p30l {	padding-left:30px;}.es-p30r {	padding-right:30px;}.es-p35 {	padding:35px;}.es-p35t {	padding-top:35px;}.es-p35b {	padding-bottom:35px;}.es-p35l {	padding-left:35px;}.es-p35r {	padding-right:35px;}.es-p40 {	padding:40px;}.es-p40t {	padding-top:40px;}.es-p40b {	padding-bottom:40px;}.es-p40l {	padding-left:40px;}.es-p40r {	padding-right:40px;}.es-menu td {	border:0;}s {	text-decoration:line-through;}p, ul li, ol li {	font-family:Poppins, sans-serif;	line-height:150%;}ul li, ol li {	Margin-bottom:15px;	margin-left:0;}a {	text-decoration:underline;}.es-menu td a {	text-decoration:none;	display:block;	font-family:Poppins, sans-serif;}.es-menu amp-img, .es-button amp-img {	vertical-align:middle;}.es-wrapper {	width:100%;	height:100%;}.es-wrapper-color, .es-wrapper {	background-color:#DCF1FF;}.es-header {	background-color:transparent;}.es-header-body {	background-color:#adc5d3;}.es-header-body p, .es-header-body ul li, .es-header-body ol li {	color:#fff;	font-size:14px;}.es-header-body a {	color:#ebf7fe;	font-size:14px;}.es-content-body {	background-color:#F9F8F7;}.es-content-body p, .es-content-body ul li, .es-content-body ol li {	color:#ebf7fe;	font-size:14px;}.es-content-body a {	color:#ebf7fe;	font-size:14px;}.es-footer {	background-color:transparent;}.es-footer-body {	background-color:#adc5d3;}.es-footer-body p, .es-footer-body ul li, .es-footer-body ol li {	color:#ebf7fe;	font-size:14px;}.es-footer-body a {	color:#ebf7fe;	font-size:14px;}.es-infoblock, .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li {	line-height:120%;	font-size:12px;	color:#CCCCCC;}.es-infoblock a {	font-size:12px;	color:#CCCCCC;}h1 {	font-size:56px;	font-style:normal;	font-weight:normal;	color:#ebf7fe;}h2 {	font-size:36px;	font-style:normal;	font-weight:normal;	color:#ebf7fe;}h3 {	font-size:20px;	font-style:normal;	font-weight:normal;	color:#ebf7fe;}.es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a {	font-size:56px;}.es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a {	font-size:36px;}.es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a {	font-size:20px;}a.es-button, button.es-button {	border-style:solid;	border-color:#ebf7fe;	border-width:15px 40px 15px 40px;	display:inline-block;	background:#ebf7fe;	border-radius:5px;	font-size:18px;	font-family:Poppins, sans-serif;	font-weight:normal;	font-style:normal;	line-height:120%;	color:#FFFFFF;	text-decoration:none;	width:auto;	text-align:center;}.es-button-border {	border-style:solid solid solid solid;	border-color:#2CB543 #2CB543 #2CB543 #2CB543;	background:#ebf7fe;	border-width:0px 0px 0px 0px;	display:inline-block;	border-radius:5px;	width:auto;}body {	font-family:arial, "helvetica neue", helvetica, sans-serif;}.es-p-default {	padding-top:20px;	padding-right:40px;	padding-bottom:0px;	padding-left:40px;}.es-p-all-default {	padding:0px;}@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150% } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:34px; text-align:center } h2 { font-size:24px; text-align:center } h3 { font-size:20px; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:34px; text-align:center } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px; text-align:center } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px; text-align:center } .es-menu td a { font-size:14px } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px } *[class="gmail-fix"] { display:none } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left } .es-m-txt-r amp-img { float:right } .es-m-txt-c amp-img { margin:0 auto } .es-m-txt-l amp-img { float:left } .es-button-border { display:inline-block } a.es-button, button.es-button { font-size:18px; display:inline-block } .es-adaptive table, .es-left, .es-right { width:100% } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%; max-width:600px } .es-adapt-td { display:block; width:100% } .adapt-img { width:100%; height:auto } td.es-m-p0 { padding:0 } td.es-m-p0r { padding-right:0 } td.es-m-p0l { padding-left:0 } td.es-m-p0t { padding-top:0 } td.es-m-p0b { padding-bottom:0 } td.es-m-p20b { padding-bottom:20px } .es-mobile-hidden, .es-hidden { display:none } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto; overflow:visible; float:none; max-height:inherit; line-height:inherit } tr.es-desk-hidden { display:table-row } table.es-desk-hidden { display:table } td.es-desk-menu-hidden { display:table-cell } .es-menu td { width:1% } table.es-table-not-adapt, .esd-block-html table { width:auto } table.es-social { display:inline-block } table.es-social td { display:inline-block } .es-desk-hidden { display:table-row; width:auto; overflow:visible; max-height:inherit } td.es-m-p5 { padding:5px } td.es-m-p5t { padding-top:5px } td.es-m-p5b { padding-bottom:5px } td.es-m-p5r { padding-right:5px } td.es-m-p5l { padding-left:5px } td.es-m-p10 { padding:10px } td.es-m-p10t { padding-top:10px } td.es-m-p10b { padding-bottom:10px } td.es-m-p10r { padding-right:10px } td.es-m-p10l { padding-left:10px } td.es-m-p15 { padding:15px } td.es-m-p15t { padding-top:15px } td.es-m-p15b { padding-bottom:15px } td.es-m-p15r { padding-right:15px } td.es-m-p15l { padding-left:15px } td.es-m-p20 { padding:20px } td.es-m-p20t { padding-top:20px } td.es-m-p20r { padding-right:20px } td.es-m-p20l { padding-left:20px } td.es-m-p25 { padding:25px } td.es-m-p25t { padding-top:25px } td.es-m-p25b { padding-bottom:25px } td.es-m-p25r { padding-right:25px } td.es-m-p25l { padding-left:25px } td.es-m-p30 { padding:30px } td.es-m-p30t { padding-top:30px } td.es-m-p30b { padding-bottom:30px } td.es-m-p30r { padding-right:30px } td.es-m-p30l { padding-left:30px } td.es-m-p35 { padding:35px } td.es-m-p35t { padding-top:35px } td.es-m-p35b { padding-bottom:35px } td.es-m-p35r { padding-right:35px } td.es-m-p35l { padding-left:35px } td.es-m-p40 { padding:40px } td.es-m-p40t { padding-top:40px } td.es-m-p40b { padding-bottom:40px } td.es-m-p40r { padding-right:40px } td.es-m-p40l { padding-left:40px } }</style>
    </head>
  <body> 
    <div class="es-wrapper-color"> <!--[if gte mso 9]>
    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#DCF1FF" origin="0.5, 0" position="0.5, 0">
    </v:fill> </v:background>
    <![endif]-->
    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
    <tr>
    <td valign="top">
    <table cellpadding="0" cellspacing="0" class="es-header" align="center">
    <tr>
    <td align="center">
    <table bgcolor="#0C5789" class="es-header-body" align="center" cellpadding="0" cellspacing="0" width="600" style="min-height: 150px;background-image: url(${floralCima});background-repeat: no-repeat;background-position: right top;background-color: #0c5789">
    <tr>
    <td class="es-p20" align="left">
    <table cellpadding="0" cellspacing="0" width="100%">
    <tr>
    <td width="560" align="left">
    <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
    <tr>
    <td align="center">
    <h2 style="font-family: parisienne, arial, sans-serif;color: #ffffff">Baixe Nosso Catálogo</h2>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    <tr>
    <td class="esdev-adapt-off es-p20t es-p40r es-p40l es-m-p0t" align="left">
    <table cellpadding="0" cellspacing="0" width="100%">
    <tr>
    <td width="520" class="es-m-p0r" align="center">
    <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
    <tr>
    <td align="center" style="font-size: 0px">
    <a target="_blank" href="https://ascasamenteiras.com.br">
    <amp-img class="adapt-img" src="${
      siteUrl + logoImage
    }" alt="Logotipo" style="display: block" width="385" title="Logotipo" height="289" layout="responsive">
  </amp-img>
  </a>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  <table class="es-content" cellspacing="0" cellpadding="0" align="center">
  <tr>
  <td align="center">
  <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ebf7fe" align="center" style="background-image: url(${
    siteUrl + floralMeio
  });background-repeat: no-repeat;background-position: left top;background-color: #ebf7fe">
  <tr>
  <td class="es-p40t es-p40r es-p40l" align="left">
  <table width="100%" cellspacing="0" cellpadding="0">
  <tr>
  <td class="es-m-p0r es-m-p20b" width="520" valign="top" align="center">
  <table width="100%" cellspacing="0" cellpadding="0" role="presentation">
  <tr>
  <td align="center">
  <p style="color: #0c5789">VÁ ATÉ O FIM DO E-MAIL PARA <strong>BAIXAR O CATÁLOGO</strong>.</p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  <tr>
  <td class="es-p10t es-p10b es-p40r es-p40l" align="left">
  <table width="100%" cellspacing="0" cellpadding="0">
  <tr>
  <td class="es-m-p0r es-m-p20b" width="520" valign="top" align="center">
  <table width="100%" cellspacing="0" cellpadding="0" role="presentation">
  <tr>
  <td align="center" class="es-p10b es-m-p20t">
  <h1 style="font-family: arial; font-weight: 900;color: #0f3953">SÓ JANEIRO</h1>
  </td>
  </tr>
  <tr>
  <td align="center" class="es-p20b">
  <p style="color: #0c5789">Desejamos realizar os sonhos de muitos casais em 2023.<br>Monte a sua cesta de serviços com preços de 2022.</p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  <tr>
  <td class="es-p40r es-p40l es-m-p20r es-m-p20l" align="left">
  <table cellpadding="0" cellspacing="0" width="100%">
  <tr>
  <td width="520" align="center" valign="top">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center" class="es-p20t es-p20b" style="font-size:0">
  <table border="0" width="100%" cellpadding="0" cellspacing="0" role="presentation">
  <tr>
  <td style="border-bottom: 1px solid #5db6ee;background: unset;height: 1px;width: 100%;margin: 0px">
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  <tr>
  <td class="esdev-adapt-off es-p40r es-p40l es-m-p20r es-m-p20l" align="left">
  <table width="520" cellpadding="0" cellspacing="0" class="esdev-mso-table">
  <tr>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-left" align="left">
  <tr>
  <td width="160" class="es-m-p0r" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center">
  <p style="color: #0f3953">SERVIÇO</p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  <td width="20">
  </td>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-left" align="left">
  <tr>
  <td width="160" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center">
  <p style="color: #0f3953">PREÇO NOVO</p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  <td width="20">
  </td>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-right" align="right">
  <tr>
  <td width="160" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center">
  <p style="color: #0f3953">C/ DESCONTO</p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  <tr>
  <td class="es-p40r es-p40l es-m-p20r es-m-p20l" align="left">
  <table cellpadding="0" cellspacing="0" width="100%">
  <tr>
  <td width="520" align="center" valign="top">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center" class="es-p20t es-p10b" style="font-size:0">
  <table border="0" width="100%" cellpadding="0" cellspacing="0" role="presentation">
  <tr>
  <td style="border-bottom: 1px dashed #dce4e9;background: unset;height: 1px;width: 100%;margin: 0px">
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  <tr>
  <td class="esdev-adapt-off es-p40r es-p40l es-m-p20r es-m-p20l" align="left">
  <table width="520" cellpadding="0" cellspacing="0" class="esdev-mso-table">
  <tr>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-left" align="left">
  <tr>
  <td width="160" class="es-m-p0r" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="left">
  <p style="color: #0c5789">Cerimonial Completo</p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  <td width="20">
  </td>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-left" align="left">
  <tr>
  <td width="160" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center">
  <p style="color: #990000">R$<s>5.900,00</s>
  </p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  <td width="20">
  </td>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-right" align="right">
  <tr>
  <td width="160" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center">
  <p style="color: #38761d">
  <strong>R$3.600,00</strong>
  </p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  <tr>
  <td class="es-p40r es-p40l es-m-p20r es-m-p20l" align="left">
  <table cellpadding="0" cellspacing="0" width="100%">
  <tr>
  <td width="520" align="center" valign="top">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center" class="es-p10t es-p10b" style="font-size:0">
  <table border="0" width="100%" cellpadding="0" cellspacing="0" role="presentation">
  <tr>
  <td style="border-bottom: 1px dashed #dce4e9;background: unset;height: 1px;width: 100%;margin: 0px">
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  <tr>
  <td class="esdev-adapt-off es-p40r es-p40l es-m-p20r es-m-p20l" align="left">
  <table width="520" cellpadding="0" cellspacing="0" class="esdev-mso-table">
  <tr>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-left" align="left">
  <tr>
  <td width="160" class="es-m-p0r" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="left">
  <p style="color: #0c5789">Gestão 360 (on-line)</p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  <td width="20">
  </td>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-left" align="left">
  <tr>
  <td width="160" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center">
  <p style="color: #990000">R$<s>3.900,00</s>
  </p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  <td width="20">
  </td>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-right" align="right">
  <tr>
  <td width="160" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center">
  <p style="color: #38761d">
  <strong>R$2.300,00</strong>
  </p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  <tr>
  <td class="es-p40r es-p40l es-m-p20r es-m-p20l" align="left">
  <table cellpadding="0" cellspacing="0" width="100%">
  <tr>
  <td width="520" align="center" valign="top">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center" class="es-p10t es-p10b" style="font-size:0">
  <table border="0" width="100%" cellpadding="0" cellspacing="0" role="presentation">
  <tr>
  <td style="border-bottom: 1px dashed #dce4e9;background: unset;height: 1px;width: 100%;margin: 0px">
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  <tr>
  <td class="esdev-adapt-off es-p40r es-p40l es-m-p20r es-m-p20l" align="left">
  <table width="520" cellpadding="0" cellspacing="0" class="esdev-mso-table">
  <tr>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-left" align="left">
  <tr>
  <td width="160" class="es-m-p0r" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="left" class="es-m-txt-l">
  <p style="color: #0c5789">RSVP Moderno</p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  <td width="20">
  </td>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-left" align="left">
  <tr>
  <td width="160" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center">
  <p style="color: #990000">R$<s>600,00</s>
  </p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  <td width="20">
  </td>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-right" align="right">
  <tr>
  <td width="160" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center">
  <p style="color: #38761d">
  <strong>grátis</strong>
  </p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  <tr>
  <td class="es-p40r es-p40l es-m-p20r es-m-p20l" align="left">
  <table cellpadding="0" cellspacing="0" width="100%">
  <tr>
  <td width="520" align="center" valign="top">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center" class="es-p10t es-p10b" style="font-size:0">
  <table border="0" width="100%" cellpadding="0" cellspacing="0" role="presentation">
  <tr>
  <td style="border-bottom: 1px dashed #dce4e9;background: unset;height: 1px;width: 100%;margin: 0px">
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  <tr>
  <td class="esdev-adapt-off es-p40r es-p40l es-m-p20r es-m-p20l" align="left">
  <table width="520" cellpadding="0" cellspacing="0" class="esdev-mso-table">
  <tr>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-left" align="left">
  <tr>
  <td width="160" class="es-m-p0r" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="left">
  <p style="color: #0c5789">Ensaio da cerimônia</p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  <td width="20">
  </td>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-left" align="left">
  <tr>
  <td width="160" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center">
  <p style="color: #990000">R$<s>400,00</s>
  </p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  <td width="20">
  </td>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-right" align="right">
  <tr>
  <td width="160" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center">
  <p style="color: #38761d">
  <strong>grátis</strong>
  </p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  <tr>
  <td class="es-p40r es-p40l es-m-p20r es-m-p20l" align="left">
  <table cellpadding="0" cellspacing="0" width="100%">
  <tr>
  <td width="520" align="center" valign="top">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center" class="es-p10t es-p10b" style="font-size:0">
  <table border="0" width="100%" cellpadding="0" cellspacing="0" role="presentation">
  <tr>
  <td style="border-bottom: 1px dashed #dce4e9;background: unset;height: 1px;width: 100%;margin: 0px">
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  <tr>
  <td class="esdev-adapt-off es-p40r es-p40l es-m-p20r es-m-p20l" align="left">
  <table width="520" cellpadding="0" cellspacing="0" class="esdev-mso-table">
  <tr>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-left" align="left">
  <tr>
  <td width="160" class="es-m-p0r" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="left">
  <p style="color: #0c5789">Supervisão&nbsp;montagem e desmontagem</p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  <td width="20">
  </td>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-left" align="left">
  <tr>
  <td width="160" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center">
  <p style="color: #990000">R$<s>600,00</s>
  </p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  <td width="20">
  </td>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-right" align="right">
  <tr>
  <td width="160" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center">
  <p style="color: #38761d">
  <strong>grátis</strong>
  </p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  <tr>
  <td class="es-p40r es-p40l es-m-p20r es-m-p20l" align="left">
  <table cellpadding="0" cellspacing="0" width="100%">
  <tr>
  <td width="520" align="center" valign="top">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center" class="es-p10t es-p10b" style="font-size:0">
  <table border="0" width="100%" cellpadding="0" cellspacing="0" role="presentation">
  <tr>
  <td style="border-bottom: 1px dashed #dce4e9;background: unset;height: 1px;width: 100%;margin: 0px">
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  <tr>
  <td class="esdev-adapt-off es-p40r es-p40l es-m-p20r es-m-p20l" align="left">
  <table width="520" cellpadding="0" cellspacing="0" class="esdev-mso-table">
  <tr>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-left" align="left">
  <tr>
  <td width="160" class="es-m-p0r" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="left">
  <p style="color: #0c5789">Visita técnica</p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  <td width="20">
  </td>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-left" align="left">
  <tr>
  <td width="160" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center">
  <p style="color: #990000">R$<s>400,00</s>
  </p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  <td width="20">
  </td>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-right" align="right">
  <tr>
  <td width="160" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center">
  <p style="color: #38761d">
  <strong>grátis*</strong>
  </p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  <tr>
  <td class="es-p40r es-p40l es-m-p20r es-m-p20l" align="left">
  <table cellpadding="0" cellspacing="0" width="100%">
  <tr>
  <td width="520" align="center" valign="top">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center" class="es-p10t es-p10b" style="font-size:0">
  <table border="0" width="100%" cellpadding="0" cellspacing="0" role="presentation">
  <tr>
  <td style="border-bottom: 1px dashed #dce4e9;background: unset;height: 1px;width: 100%;margin: 0px">
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  <tr>
  <td class="esdev-adapt-off es-p40r es-p40l es-m-p20r es-m-p20l" align="left">
  <table width="520" cellpadding="0" cellspacing="0" class="esdev-mso-table">
  <tr>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-left" align="left">
  <tr>
  <td width="160" class="es-m-p0r" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="left">
  <p style="color: #0c5789">Site do casal</p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  <td width="20">
  </td>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-left" align="left">
  <tr>
  <td width="160" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center">
  <p style="color: #38761d">
  <strong>grátis</strong>
  </p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  <td width="20">
  </td>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-right" align="right">
  <tr>
  <td width="160" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center">
  <p style="color: #38761d">
  <strong>grátis</strong>
  </p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  <tr>
  <td class="es-p40r es-p40l es-m-p20r es-m-p20l" align="left">
  <table cellpadding="0" cellspacing="0" width="100%">
  <tr>
  <td width="520" align="center" valign="top">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center" class="es-p10t es-p20b" style="font-size:0">
  <table border="0" width="100%" cellpadding="0" cellspacing="0" role="presentation">
  <tr>
  <td style="border-bottom: 1px solid #dce4e9;background: unset;height: 1px;width: 100%;margin: 0px">
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  <tr>
  <td class="esdev-adapt-off es-p40r es-p40l es-m-p20r es-m-p20l" align="left">
  <table width="520" cellpadding="0" cellspacing="0" class="esdev-mso-table">
  <tr>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-left" align="left">
  <tr>
  <td width="160" class="es-m-p0r" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="left">
  <p style="color: #0c5789">
  <strong>TOTAL</strong>
  </p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  <td width="20">
  </td>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-left" align="left">
  <tr>
  <td width="160" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center">
  <p style="color: #990000">R$<s>11.800,00</s>
  </p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  <td width="20">
  </td>
  <td class="esdev-mso-td" valign="top">
  <table cellpadding="0" cellspacing="0" class="es-right" align="right">
  <tr>
  <td width="160" align="center">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center">
  <p style="color: #38761d">
  <strong>R$5.900,00</strong>
  </p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  <tr>
  <td class="es-p20t es-p40b es-p40r es-p40l" align="left">
  <table width="100%" cellspacing="0" cellpadding="0">
  <tr>
  <td class="es-m-p0r es-m-p20b" width="520" valign="top" align="center">
  <table width="100%" cellspacing="0" cellpadding="0" role="presentation">
  <tr>
  <td align="center" class="es-p20t">
  <p style="color: #0c5789">Preços válidos somente até 31/01/2023, aproveite!</p>
  </td>
  </tr>
  <tr>
  <td align="center" class="es-p40t"> <!--[if mso]>
  <a href="https://ascasamenteiras.com.br" target="_blank" hidden> <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://ascasamenteiras.com.br" style="height:51px; v-text-anchor:middle; width:232px" arcsize="10%" stroke="f" fillcolor="#e9790a"> <w:anchorlock>
  </w:anchorlock> <center style='color:#ffffff; font-family:Poppins, sans-serif; font-size:18px; font-weight:400; line-height:18px; mso-text-raise:1px'>${CTABUTTON}</center> </v:roundrect>
  </a>
  <![endif]--> <!--[if !mso]>
  <!-- -->
  <span class="msohide es-button-border" style="background: #e9790a">
  <a href="${fullUrl}" class="es-button" target="_blank" style="background: #e9790a;border-color: #e9790a">Baixar Catálogo</a>
  </span>
  <h3 style="color: #0c5789;margin-top: 20px; padding: 20px 0; text-align:center;font-family: arial; font-weight: 900">
  <span style='font-size:30px; padding: 0 15px;'>&#127915;</span>Você ganhou um <strong>VOUCHER</strong> de <strong>R$500,00</strong>
  <span style='font-size:30px;'>&#127915;</span>
  </h3>
  <span class="msohide es-button-border" style="background: #e9790a; margin-bottom: 30px">
  <a href="${fullUrl}" class="es-button" target="_blank" style="background: #795c05; color: #fff; font-weight: 600; border: 3px solid #5b470b; padding: 10px">RESGATAR VOUCHER</a>
  </span>
  <!--<![endif]-->
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
  <tr>
  <td align="center">
  <table bgcolor="#0c5789" class="es-footer-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #0c5789">
  <tr>
  <td class="es-p20t es-p40b es-p40r es-p40l" align="left" style="background-image: url(${
    siteUrl + florBaixo
  });background-repeat: no-repeat;background-position: right center">
  <table cellpadding="0" cellspacing="0" width="100%">
  <tr>
  <td width="520" align="center" valign="top">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center" class="es-p25t es-p10b">
  <p style="color: #ffffff;font-size: 10px">Para parar de receber e-mais</p>
  <p style="color: #ffffff;font-size: 10px">da <strong>pri@ascasamenteiras.com.br</strong>, click&nbsp;<a href="https://ascasamenteiras.com.br" target="_blank" style="color: #dcf1ff;font-size: 10px">aqui</a>.<br>*Esse desconto de Visitas técnicas e casamentos não incluem preços de traslados,<br>
  </p>
  <p style="color: #ffffff;font-size: 10px">para casamentos que exijam.<br>
  </p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
  <tr>
  <td align="center">
  <table bgcolor="#0c5789" class="es-footer-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #0c5789">
  <tr>
  <td class="es-p20t es-p20b es-p40r es-p40l" align="left">
  <table cellpadding="0" cellspacing="0" width="100%">
  <tr>
  <td width="520" align="center" valign="top">
  <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tr>
  <td align="center" class="es-infoblock made_with" style="font-size: 0px">
  <a target="_blank" href="https://ascasamenteiras.com.br">
  <amp-img src="${
    siteUrl + marca
  }" alt="Logotipo rodapé com a marca." width="125" style="display: block" title="Logotipo rodapé com a marca." height="126">
  </amp-img>
  </a>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </div>
  </body>
</html>`;

export default mailTemplate;
