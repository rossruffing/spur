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

var parent = getParameterByName("donatorbadge_parent");
if(parent!=null || parent!="" || parent)
	setCookie("donatorbadge_parent",parent);
parent = getCookie("donatorbadge_parent");


// Check if logged in
// Login
// Grab short-term access token
// Pass everything to badge_link_maker.php
//   (This stores stuff in the db, including long-term token)
// Generate link based on id returned

var short_token = "";

// Load Facebook API
(function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));


window.fbAsyncInit = function() {
	console.log("Facebook API is loaded");
    FB.init({
      appId      : '379998022075309', // App ID from the App Dashboard
      //channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File for x-domain communication
      status     : true, // check the login status upon init?
      cookie     : true, // set sessions cookies to allow your server to access the session?
      xfbml      : true  // parse XFBML tags on this page?
    });

    createBadge();
};

function createBadge()
{
	div = document.getElementById("donorbadge");
	if(div == null) return;
	parent_id = getCookie("donatorbadge_parent");
	donation = parseFloat(div.dataset.donation);
	donate_url = div.dataset.donate_url;
	fb_title = div.dataset.donate_url || "";
	fb_caption = div.dataset.fb_caption || "Click to add your own donation!";
	fb_description = div.dataset.fb_description || "Thanks!";
	
	div.innerHTML = "<img src='http://proto.okcollaborative.org/badgesmall.jpg'/><br/>";

	fblink = document.createElement('a');
	fblink.href = "#";
	fblink.innerHTML = "<img src='http://anitaborg.org/files/facebook_button_eu3g.gif' width='32'/> share on facebook!";
	fblink.onclick = function(){
	    FB.getLoginStatus(function(response) {
		    if (response.status === 'connected') {
			    // connected
			    console.log("Logged in already. Ready to go!!!");
			    short_token = response.authResponse.accessToken;
			    recordDonation();
			} else {
			    // not_logged_in or not authorized
			    login();
			}
		});
		return false;
	};
	div.appendChild(fblink);
};

function login() {
    FB.login(function(response) {
        if (response.authResponse) {
            // connected
            short_token = response.authResponse.accessToken;
        }
        recordDonation();
    }, {scope: 'email,publish_actions'});
}

function recordDonation()
{
	var script = document.createElement('script');
	script.src = '//proto.okcollaborative.org/badge_link_maker.php'+
		'?amount='+donation+
		'&charity_id=77'+
		'&parent_id='+parent_id+
		'&short_token='+short_token;
	console.log(script.src);
	document.getElementsByTagName('head')[0].appendChild(script);
	// this calls createLink when it completes	
};

function createLink(id)
{
	parent_id = getCookie("donatorbadge_parent");
	var obj = {
		method: 'feed',
		link: donate_url+"?donatorbadge_parent="+id,
		picture: 'http://proto.okcollaborative.org/badgesmall.jpg',
		name: fb_title,
		caption: fb_caption,
		description: fb_description
	};
	console.log(donate_url+"?donatorbadge_parent="+id);
	FB.ui(obj);
};

