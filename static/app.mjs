/**
 * Make API Request 
 * @param {string} method - Method name
 * @param {string} pathname - Pathname
 * @param {object} data - Payload
 * @return {Promise<XMLHttpRequest | any>}
 */
function makeAPIRequest (method = 'GET', pathname = '/test', data = {}) {
    const BASE_ROUTE = "https://developar-api.herokuapp.com";

    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();

        request.onreadystatechange = function () {
            if (this.readyState == 4) {
                let body;

                try {
                    if (this.responseText.length > 0) {
                        body = JSON.parse(this.responseText);
                    }
                } catch (err) {
                    return reject(err);
                }
                Reflect.set(request, 'body', body);

                return resolve(request);
            }
        }
    
        request.open(method, `${BASE_ROUTE}${pathname}`, true);
    
        request.setRequestHeader('Content-Type', 'application/json');
    
        if (method !== 'GET') {
            request.send(JSON.stringify(data));
        }
        else {
            request.send();
        }    
    })
}

/**
 * Post data object
 * @param {string} pathname - Pathname
 * @param {object} payload - Payload
 * @returns {Promise<string>}
 */
function submitPayload (pathname = '/test', payload = {}) {
    return new Promise(function (resolve, reject) {
        let message;
        let theme = 'primary';

        makeAPIRequest('POST', pathname, payload)
        .then(function (res) {
            message = res.body.message;

            if (res.status == 200 || res.status == 201) {
                theme = 'green';
            } 
            else {
                theme = 'red';
                reject(message);
            }
            return resolve(message);
        })
        .catch(function () {
            theme = 'red';
            message = 'Something went wrong';
            return reject(message);
        })
        .finally(function () {
            new Toast(message, { theme });
        })
    });
}

function toggleHeaderNavigation() {
    const target = document.querySelector('header#topbar');
    const attr = 'area-expanded';

    const isExists = target.hasAttribute(attr);

    if (isExists) {
        document.body.style.overflow = 'auto';
        target.removeAttribute(attr);
    } else {
        document.body.style.overflow = 'hidden';
        target.setAttribute(attr, 'true');
    }
    return !isExists;
}

function reserveHeaderReisedEvent() {
    // Header flag (for parent access)
    let headerRaisedState = false;

    // for caching
    const header = document.querySelector('header#topbar:not(.raised)');

    function effect() {
        const posY = window.scrollY;

        if (!headerRaisedState && posY >= 200) {
            header.classList.add('raised');
            headerRaisedState = true;
        } else if (headerRaisedState && posY <= 200) {
            headerRaisedState = false;
            header.classList.remove('raised');
        }
    }

    if (header) {
        window.addEventListener('scroll', effect);

        // Called once for initial window load
        effect();
    }
}

function autoScrollToInternalHashTarget() {
    const validPath = ['/privacy/', '/terms/'];

    if (validPath.includes(window.location.pathname) && window.location.hash !== '') {
        const targetBlock = document.getElementById(window.location.hash.substr(1));

        if (targetBlock && targetBlock instanceof HTMLElement && targetBlock.classList.contains('relate-hash')) {
            targetBlock.classList.add('scrolled-highlight');
        }
    }
}

function useCollapsibleDropdowns() {
    const nodelist = document.getElementsByClassName('collapsible');

    for (const node of nodelist) {
        const toggler = node.querySelector('.toggler[data-collapse-target]') || null;

        if (toggler) {
            toggler.addEventListener('click', function () {
                node.toggleAttribute('open');
            });
        }
    }
}

/**
 * Toast utility
 * @param {string} message - Message
 * @param {{action?: {label: string, callback: any}, theme?: string}} options - Options
 * @param {number} duration - Duration
 */
function Toast(message, options = {}, duration = 3500) {
    const canvas = document.body;
    const rootElement = document.createElement('div');
    const messageElement = document.createElement('div');

    // With theme class
    rootElement.classList.add('toast', options.theme || 'default');

    messageElement.classList.add('message');
    messageElement.textContent = message;

    // Append messageElement
    rootElement.appendChild(messageElement);

    if (options.hasOwnProperty('action') && typeof options.action == 'object') {
        const action = options.action;
        const actionContainer = document.createElement('div');
        const actionElement = document.createElement('a');

        actionContainer.classList.add('action');

        // Must be white text
        actionElement.classList.add('text-primary-light');

        if (action.label) {
            actionElement.textContent = action.label || '';
        }

        if (action.callback) {
            // Assign click event
            actionElement.addEventListener('click', function(event) {
                rootElement.remove();
                action.callback(event);
            });
        }

        actionContainer.appendChild(actionElement);

        rootElement.appendChild(actionContainer);
    }

    // Mount rootElement
    canvas.appendChild(rootElement);

    // Complete lifecycle
    setTimeout(function () {
        if (rootElement) {
            rootElement.remove();
        }
    }, duration);
}

const progressbar = {
    /** 
     * Container of progress bar
     * @type {HTMLElement} 
     */
    root: null,

    /**
     * Content element
     * @type {HTMLElement}
     */
    get contentElement () {
        return document.querySelector('main') || null;
    },

    /**
     * Mount state
     * @type {boolean}
     */
    get isMounted () {
        return typeof this.root === 'object' && this.root instanceof HTMLElement;
    },

    /**
     * Mount container 
     * @param {boolean} [disableContent] - Disable content
     * @param {string} [color] - Progress bar color
     * @returns {boolean}
     */
    show (disableContent = false, color = 'primary') {
        if (this.isMounted) {
            return false;
        }

        // Progress bar container
        const container = document.createElement('div');
        container.classList.add('progress-bar-container');

        // Progress bar element
        const progressBarElement = document.createElement('div');
        progressBarElement.classList.add('progress-bar', color);

        // Progress indeterminate element
        const progressElement = document.createElement('div');
        progressElement.classList.add('indeterminate');

        // Append progress element
        progressBarElement.appendChild(progressElement);

        // Append progress bar element
        container.appendChild(progressBarElement);

        document.body.insertBefore(container, document.body.firstChild);

        // Assign root
        this.root = container;

        // Insert 'blur' class name
        if (disableContent === true) {
            const contentElement = this.contentElement;

            if (contentElement instanceof HTMLElement) {
                this.contentElement.classList.add('blur');
            }
        }

        return true;
    },

    /**
     * Unmount progress container
     * @returns {boolean}
     */
    hide () {
        if (this.isMounted) {
            this.root.remove();
            this.root = null;

            // Remove blur effect
            const contentElement = this.contentElement;
            if (contentElement && contentElement instanceof HTMLElement && contentElement.classList.contains('blur')) {
                contentElement.classList.remove('blur');
            }

            return true;
        }
        return false;
    }
};

window.onload = function () {

    autoScrollToInternalHashTarget();

    reserveHeaderReisedEvent();

    useCollapsibleDropdowns();

    if (window.hasOwnProperty('AOS')) {
        // @ts-ignore
        AOS.init({
            disable: false,
            startEvent: 'DOMContentLoaded',
            once: true,
            duration: 500,
            delay: 50
        });
    }

    // Load feather icons
    if (window.hasOwnProperty('feather')) {
        // @ts-ignore
        feather.replace();
    }
}