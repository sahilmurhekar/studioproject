
function myFunction(event) {
    // Trying to stop the player if it goes above 10 second
    
    if (event.currentTime > 10) {
      event.pause;
      event.currentTime = 0;
    }
}
