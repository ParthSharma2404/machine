// content.js - Injected into x.com/intent/tweet

console.log("YieldPulse Extension loaded on Twitter Intent page.");

function attemptToPost() {
  // Twitter's post button usually has data-testid="tweetButton"
  const postButton = document.querySelector('[data-testid="tweetButton"]');
  
  if (postButton) {
    console.log("Found Post Button. Waiting for React state to settle...");
    
    // We wait 1.5 seconds after finding the button to ensure Twitter's 
    // internal React text-box state has registered the injected text from the URL.
    setTimeout(() => {
      console.log("Clicking Post!");
      postButton.click();
      
      // Close the tab 3 seconds after posting to keep things clean
      setTimeout(() => {
        // Note: window.close() sometimes gets blocked by Chrome if the script opened the tab,
        // but since our extension background opened it, it might work. If not, the user just closes it.
        // Or we can send a message to background.js to close the tab.
        chrome.runtime.sendMessage({ action: "closeTab" });
      }, 3000);

    }, 1500);

    return true; // Stop searching
  }
  return false;
}

// Keep checking every 500ms for up to 10 seconds until the page loads
let attempts = 0;
const interval = setInterval(() => {
  attempts++;
  if (attemptToPost() || attempts > 20) {
    clearInterval(interval);
  }
}, 500);
