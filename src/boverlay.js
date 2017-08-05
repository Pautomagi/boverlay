/**
 * @author Ulrik Hovstad <ulrik@automagisk.net>
 * @description A way to toggle css classes to make an overlay menu.
 *
 * @see https://tympanus.net/codrops/2014/02/06/fullscreen-overlay-effects/ for the original.
 */
function boverlay() {
    var support            = { transitions : Modernizr.csstransitions },
        trigger            = document.getElementsByClassName('trigger-overlay'),
        transEndEventNames = {
            'WebkitTransition'  : 'webkitTransitionEnd',
            'MozTransition'     : 'transitionend',
            'OTransition'       : 'oTransitionEnd',
            'msTransition'      : 'MSTransitionEnd',
            'transition'        : 'transitionend'
        },
        transEndEventName   = transEndEventNames[ Modernizr.prefixed('transition') ];

    /**
     * Add event listeners for all the triggers available.
     */
    this.init = function() {
        var triggers = trigger.length;
        for (var i = 0; i < triggers; i++) {
            trigger[i].addEventListener('click', function (event) {
                var el = _checkTargetTag(event);
                toggleOverlay(el.dataset.name);
            }, false);
        }
    };

    /**
     * Toggles an overlay with the given data attribute.
     * It needs a matching overlay container with the id of data-name.
     *
     * @param {Object} overlayName event.target.dataset.name
     */
    function toggleOverlay(overlayName) {
        var overlay = document.getElementById(overlayName);

        if(overlay.classList.contains('open')) {
            closeOverlay(overlay);
        } else {
            openOverlay(overlay);
        }
    }

    /**
     * Check if what we clicked was the anchor.
     * We want to avoid hitting the underlying svg or path.
     *
     * @param {event} event
     * @returns event.target
     */
    function _checkTargetTag(event) {
        if (event.target.tagName === "path") {
            return event.target.parentElement.parentElement;
        } else if (event.target.tagName === "svg") {
            return event.target.parentElement;
        } else {
            return event.target;
        }
    }

    /**
     * @param {any} overlay
     */
    function openOverlay(overlay) {

        // Close already opened overlays.
        var open = document.getElementsByClassName('open');
        var openCount = open.length;
        for (var i = 0;  i < openCount; i++) {
            open[i].classList.remove('open');
        }

        // Open the triggered overlay.
        overlay.classList.add('open');
        // Add class to handle overflow scroll on the container.
        document.body.classList.add('overlay-open');
    }

    /**
     * @param {any} overlay
     */
    function closeOverlay(overlay){
        overlay.classList.remove('open');
        overlay.classList.add('close');
        document.body.classList.remove('overlay-open');
        var onEndTransitionFn = function (ev) {
            if (support.transitions) {
                if (ev.propertyName !== 'visibility') return;
                this.removeEventListener(transEndEventName, onEndTransitionFn);
            }

            overlay.classList.remove('close');
        };

        support.transitions = (support.transitions === true) ? overlay.addEventListener(transEndEventName, onEndTransitionFn) : onEndTransitionFn();
    }
};
