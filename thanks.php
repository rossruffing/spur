<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Thank You</title>
	<link rel="stylesheet" href="style.css">
	<script src="donorbadge.js"></script>
</head>
<body>
	<div class="donate-body center-container">
		<img src="thanks.jpg" width="60%" height="60%"><br /><br />
		<div id="donorbadge" 
		data-donation="<?php echo $_REQUEST['donate_amt'] ?>"
		data-donate_url="http://proto.okcollaborative.org"
		data-fb_title="I Gave to Unichef!"
 		data-fb_caption="At Heartland Cats, we know that cats deserve loving homes too. We provide a safe, loving sanctuary for cats regardless of age, illness, or disability. Our “no kill” shelter will work with the community to prevent needless euthanasia by offering shelter, adoption, foster, hospice, spay/neuter and veterinary services, and educational programs."
		data-fb_description="Donated $<?php echo $_REQUEST['donate_amt'] ?>"
		>
		Thanks for your donation!
	</div>
</div>
</body>
</html>
