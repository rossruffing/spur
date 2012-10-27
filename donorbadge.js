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


// Only run this when Facebook is ready
window.fbAsyncInit = function() {
    FB.init({
      appId      : '379998022075309', // App ID from the App Dashboard
      //channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File for x-domain communication
      status     : true, // check the login status upon init?
      cookie     : true, // set sessions cookies to allow your server to access the session?
      xfbml      : true  // parse XFBML tags on this page?
    });

    createBadge();
  };


(function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));

function createBadge()
{
	div = document.getElementById("donorbadge");
	
	donator = "Michael";
	donation = parseFloat(div.dataset.donation);
	donate_url = div.dataset.donate_url;

	div.innerHTML = "<img src='http://placekitten.com/80/80'/><br/>";
	fblink = document.createElement('a');
	fblink.innerHTML = "<img src='http://anitaborg.org/files/facebook_button_eu3g.gif' width='32'/> share on facebook!";

	fblink.onclick = function(){
		var obj = {
			method: 'feed',
			link: donate_url+"?donatorbadge_parent="+donator,
			picture: 'http://placekitten.com/80/80',
			name: "name",
			caption: "caption",
			description: "description"
		};
		FB.ui(obj);
		return false;
	};
	div.appendChild(fblink);
}
window.onload = createBadge;
