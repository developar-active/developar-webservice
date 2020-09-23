function toggleHeaderNavigation() {
   const target = document.querySelector('header#topbar');
   const attr = 'area-expanded';

   const isExists = target.hasAttribute(attr);

   if (isExists) {
       target.removeAttribute(attr);
   } else {
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

function useCollapsibleDropdowns () {
    const nodelist = document.getElementsByClassName('collapsible');

    for (const node of nodelist) {
        const toggler = node.querySelector('.toggler[data-collapse-target]') || null;

        if (toggler) {
            toggler.addEventListener('click', () => {
                node.toggleAttribute('open');
            });
        }
    }
}

window.onload = () => {

   autoScrollToInternalHashTarget();

   reserveHeaderReisedEvent();

   useCollapsibleDropdowns();

   if ('AOS' in window) {
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
   if ('feather' in window) {
       // @ts-ignore
       feather.replace();
   }
}