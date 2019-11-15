 function logEvent(name, params) {
  if (!name) return;

  if (window.AnalyticsWebInterface) {
    // console.log('In AnalyticsHelper.js Android: name = ' + name + ' & params = ', params);
    window.AnalyticsWebInterface.logEvent(name, JSON.stringify(params));

  } else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.firebase) {
    // console.log('In AnalyticsHelper.js ios: name = ' + name + ' & params = ', params);
    var message = {
      command: 'logEvent',
      name: name,
      parameters: params
    };
    
    window.webkit.messageHandlers.firebase.postMessage(message);

  } else {

    // console.log("No native APIs found.");

  }  

}

export default { logEvent }

/*
 Android
 function logEvent(name, params) {
   if (!name) {
     return;
   }

   if (window.AnalyticsWebInterface) {
     // Call Android interface
     window.AnalyticsWebInterface.logEvent(name, JSON.stringify(params));
   } else if (window.webkit
     && window.webkit.messageHandlers
     && window.webkit.messageHandlers.firebase) {
     // Call iOS interface
     var message = {
       command: 'logEvent',
       name: name,
       parameters: params
     };
     window.webkit.messageHandlers.firebase.postMessage(message);
   } else {
     // No Android or iOS interface found
     console.log("No native APIs found.");
   }
 }
 */

/*
 iOS
 function logEvent(name, params) {
   if (!name) {
     return;
   }

   if (window.AnalyticsWebInterface) {
     // Call Android interface
     window.AnalyticsWebInterface.logEvent(name, JSON.stringify(params));
   } else if (window.webkit
     && window.webkit.messageHandlers
     && window.webkit.messageHandlers.firebase) {
     // Call iOS interface
     var message = {
       command: 'logEvent',
       name: name,
       parameters: params
     };
     window.webkit.messageHandlers.firebase.postMessage(message);
   } else {
     // No Android or iOS interface found
     console.log("No native APIs found.");
   }
 }
 */
