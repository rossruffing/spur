// LETS DO THIS
function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}
function getCookie(c_name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name)
		{
			return unescape(y);
		}
	}
}
function getParameterByName(name)
{
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.search);
	if(results == null)
		return "";
	else
		return decodeURIComponent(results[1].replace(/\+/g, " "));
}

// This runs every time this file is loaded!
// Checks the link for a donatorbadge_parent and moves it into a cookie.
var parent = getCookie("donatorbadge_parent");
if (parent==null && parent=="")
{
	console.log("DonatorBadge: no existing cookie.");
	parent = getParameterByName("donatorbadge_parent");
	setCookie("donatorbadge_parent",parent);
}


function createBadge(amount)
{
	div = document.getElementById("donorbadge");
	donation = parseFloat(div.dataset.donation);
	div.innerHTML = "<img src='http://placekitten.com/80/80'/><br/><a href='facebook.com'><img src='http://anitaborg.org/files/facebook_button_eu3g.gif' width='32'/> click to share!</a>";
}
window.onload = createBadge;
