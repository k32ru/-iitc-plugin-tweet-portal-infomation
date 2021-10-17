// ==UserScript==
// @name           IITC plugin: Tweet Portal Infomation
// @category       Tweaks
// @version        0.1.1.20200103.222024
// @namespace      iitc-plugin-tweet-portal-infomation
// @description    [iitc-test-2020-01-03-222024] Show all portals as neutral, as if uncaptured. Great for creating plans.
// @include        https://*.ingress.com/intel*
// @include        http://*.ingress.com/intel*
// @match          https://*.ingress.com/intel*
// @match          http://*.ingress.com/intel*
// @include        https://*.ingress.com/mission/*
// @include        http://*.ingress.com/mission/*
// @match          https://*.ingress.com/mission/*
// @match          http://*.ingress.com/mission/*
// @repuire        https://platfom.twitter.com/widget.js
// @grant          none
// ==/UserScript==


function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};



// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.tweetPortalInfomation =  function() {};
var self = window.plugin.tweetPortalInfomation;

self.addTweetButton = function(data) {
    console.debug(data);
    //var lat = data.portal._latlng.lat.toFixed(6);
    //var lat = data.portal._latlng.lat.toFixed(6);
    //var Ing = data.portal._latlng.Ing.toFixed(6);
    var lat = data.portalData.latE6/1E6;
    var lng = data.portalData.lngE6/1E6;
    var title = data.portalDetails.title;
    var permalinkUrl = 'https://intel.ingress.com/intel?i='+lat+','+lng+'&z=17&pll='+lat+','+lng;
    $('.linkdetails').append('<aside><a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(permalinkUrl) + '">Tweet</a></aside>');


}
var setup =  function() {
  addHook('portalDetailsUpdated',self.addTweetButton);
}

// PLUGIN END //////////////////////////////////////////////////////////


setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);