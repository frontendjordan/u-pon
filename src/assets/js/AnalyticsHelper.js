 function logEvent(name, params) {
  if (!name) return;

  if (window.AnalyticsWebInterface) {

    window.AnalyticsWebInterface.logEvent(name, JSON.stringify(params));

  } else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.firebase) {

    var message = {
      command: 'logEvent',
      name: name,
      parameters: params
    };
    
    window.webkit.messageHandlers.firebase.postMessage(message);

  } else {

    console.log("No native APIs found.");
    console.log('Could not send event: ', name, params)

  }  

}

export default { logEvent }
