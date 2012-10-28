<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Donate to Unichef</title>
	<link rel="stylesheet" href="style.css">
	<script src="donorbadge.js"></script>	
</head>
<body>
	<div class="donate-body">
		<div id="logo">UNICHEF</div>
		<nav>
			<ul>
				<li><a href="#">Home</a></li>
				<li><a href="#">About Us</a></li>
				<li><a href="#">UNICHEF's Work</a></li>
				<li><a href="#">People and Partners</a></li>
				<li><a href="#">Campaigns</a></li>
				<li><a href="#">Media Centers</a></li>
			</ul>
		</nav>

		<img src="/kittenbnr.png">

		<form method="post"
		action="donate.php"
		id="ProcessForm"
		name="process">

		<div class="donate-body center-container">
			<input type="submit"
			value="Give"
			name="donate"
			id="pstep_finish" class="donate-button">
		</div>
	</form>

	<?php
		// put your code here
	?>
</div>
</body>
</html>
