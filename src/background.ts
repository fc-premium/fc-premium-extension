import { Core } from 'fc-premium-core'

chrome.contentSettings.javascript.set({
	primaryPattern: 'https://*.forocoches.com/*',
	setting: 'allow'
});

// let matches = (<any>chrome).runtime.getManifest().content_scripts[0].matches[0];
// if (matches !== undefined) {
//
// 	const regexp = new RegExp(matches);
//
// 	chrome.webRequest.onBeforeSendHeaders.addListener(
// 		function(details: any) {
// 			console.log(details)
// 			return {
// 				cancel: details.type === 'script'
// 			};
// 		}, {
// 			urls: ['https://*.forocoches.com/*'],
// 			types: ['script']
// 		}, ['blocking', 'requestHeaders']
// 	);
// }
