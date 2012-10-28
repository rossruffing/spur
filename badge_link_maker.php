<?php
	header("Content-Type: application/javascript");

	require_once('facebook.php');

  $config = array(
    'appId' => '379998022075309',
    'secret' => 'ffe3e1034654dd7f496c3892a0ef89a1',
  );

  $facebook = new Facebook($config);
  $user_id = $facebook->getUser();

//	$con = mysql_connect("spur-db.cpl6vcqdbapr.us-east-1.rds.amazonaws.com","spur","spurspur","spur");
	$con = mysql_connect("web308.webfaction.com","ohtli_spur","ohhudo","ohtli_spur");
	if (!$con) {
	  die('Could not connect: ' . mysql_error());
	}

//	mysql_select_db("spur", $con);
	mysql_select_db("ohtli_spur", $con);

	$amount = $_GET["amount"];
	$parent_id = (empty($_GET["parent_id"])) ? 0 : $_GET["parent_id"];
	$charity_id = $_GET["charity_id"];
	$fb_short_token = $_GET["short_token"];

	$sql = "INSERT INTO donation (`amount`,`charity_id`,`parent_id`,`fb_short_token`) VALUES ("
					.$amount
					.",".$charity_id
					.",".$parent_id
					.",'".$fb_short_token."'"
					.");";

	echo $sql;

	mysql_query($sql);
	$id = mysql_insert_id();
//	echo $sql;
//	echo mysql_error();

	echo 'createLink('.$id.')';

	insert_parent_credit($parent_id, $amount, $con);
//	echo mysql_error();

	mysql_close($con);

	function insert_parent_credit($parent_id, $amount, $con) {
		if ($parent_id!=0) {
			$sql = "SELECT * FROM donation WHERE _id=".$parent_id;

			$result = mysql_query($sql);
			if ($result) {
				while($row = mysql_fetch_array($result)) {
	//				echo $row['donor_id'] . "   *   " . $row['amount']. "   *   " ;
					$sql = "INSERT INTO donation_account (`amount`,`donation_id`) VALUES ("
									.$amount
									.",".$parent_id
									.");";
					$sql = "SELECT * FROM donation WHERE _id=".$parent_id;
					mysql_query($sql);

					insert_parent_credit($row['parent_id'], $row['amount'], $con);
//	echo mysql_error();


				}
			}
		}

	}
?>