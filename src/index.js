require("./boverlay.scss");

/**
 * @author Ulrik Hovstad <ulrik@automagisk.net>
 * @description A way to toggle css classes to make an overlay menu.
 * @param {String} triggerClass Set a different class for selecting triggers
 *
 * @see https://tympanus.net/codrops/2014/02/06/fullscreen-overlay-effects/ for the original.
 */
export default class Boverlay {
  constructor(triggerClass = "trigger-overlay") {
    const triggers = document.getElementsByClassName(triggerClass);
    Array.from(triggers).forEach(trigger => {
      trigger.addEventListener("click", event => {
          const element = this.checkTargetTag(event);
          this.toggleOverlay(element.dataset.name);
        }, false);
    });
  }

  /**
   * Toggles an overlay with the given data attribute.
   * It needs a matching overlay container with the id of data-name.
   *
   * @param {String} overlayName event.target.dataset.name
   */
  toggleOverlay(overlayName) {
    const overlay = document.getElementById(overlayName);
    if (overlay.classList.contains("open")) {
      this.closeOverlay(overlay);
    } else {
      this.openOverlay(overlay);
    }
  }
  /**
   * Check if what we clicked was the anchor.
   * We want to avoid hitting the underlying svg or path.
   *
   * @param {Event} event
   * @returns {HTMLElement} event.target
   */
  checkTargetTag(event) {
    if (event.target.tagName === "path") {
      return event.target.parentElement.parentElement;
    } else if (event.target.tagName === "svg") {
      return event.target.parentElement;
    } else {
      return event.target;
    }
  }

  /**
   * Opens the overlay by adding css classes.
   *
   * @param {HTMLElement} overlay
   */
  openOverlay(overlay) {
    // Close already opened overlays.
    var open = document.getElementsByClassName("open");
    var openCount = open.length;
    for (var i = 0; i < openCount; i++) {
      open[i].classList.remove("open");
    }
    overlay.classList.add("open");
    document.body.classList.add("overlay-open");
  }

  /**
   * @param {HTMLElement} overlay
   */
  closeOverlay(overlay) {
    overlay.classList.remove("open");
    overlay.classList.remove("close");
    document.body.classList.remove("overlay-open");
  }
}
