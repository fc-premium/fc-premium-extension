import { Core } from 'fc-premium-core'

chrome.contentSettings.javascript.set({
	primaryPattern: 'https://*.forocoches.com/*',
	setting: 'allow'
});


function handleCorsRequest(details: any /* chrome.webRequest.WebRequestDetails */) {
	if (!details.initiator.includes('forocoches.com'))
		return;
	

	console.log(details);

	const url = new URL(details.url);
	const new_origin = url.origin;
	// Prevent cors from being blocked
	

	let origin_is_set = false;

	for (let header of details.requestHeaders) {
		if (header.name.toLowerCase() === 'origin' || header.name.toLowerCase() === 'referer') {
			header.value = new_origin;
			origin_is_set = true;
		} else if (header.name.toLowerCase().startsWith('access-control')) {
			header.value = '*';
		}
	}

	if (!origin_is_set) {
		details.requestHeaders.push({
			name: 'origin',
			value: new_origin
		});
	}

    return {requestHeaders: details.requestHeaders};
}

chrome.webRequest.onBeforeSendHeaders.addListener(handleCorsRequest,
	{urls: ["<all_urls>"]},
	['blocking', 'requestHeaders', 'extraHeaders']
);


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
