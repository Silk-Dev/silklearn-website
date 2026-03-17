'use client';

import { useEffect } from 'react';

const intercomAppId = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;

export function IntercomProvider() {
  useEffect(() => {
    if (!intercomAppId || typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    window.intercomSettings = {
      app_id: intercomAppId,
      background_color: '#111111',
    };

    const script = document.createElement('script');
    script.innerHTML = `
      (function(t){var c=t.app_id!=="undefined"?t.app_id:"";if(!c){return}var e=typeof t.background_color!=="undefined"?t.background_color:"#111111";var n=function(e,t=null,n=null){var o=document.createElement("div");Object.keys(e).forEach(function(t){o.style[t]=e[t]});if(t){o.setAttribute("id",t)}o.innerHTML=n;return o};var o=function(t){if(!window.Intercom){var e=window;var n=e.Intercom;if(typeof n==="function"){n("reattach_activator");n("update",window.intercomSettings)}else{var o=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(t){i.q.push(t)};e.Intercom=i;var r=function(){var t=o.createElement("script");t.type="text/javascript";t.async=true;t.src="https://widget.intercom.io/widget/"+c+"/";var e=o.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)};r()}}if(window.Intercom){try{window.Intercom("boot", window.intercomSettings)}catch(e){} if(t){window.Intercom("show")}}var a=0;var l=setInterval(function(){a++;if(window.Intercom&&window.Intercom.booted){var btn=document.querySelector("#intercom-facade-btn");if(btn){btn.remove()}clearInterval(l)}else if(a>10){clearInterval(l)}},1000);return true};var i='<img src="/silklearn/white-on-black-icon.svg" alt="SILKLEARN" style="display:block;width:24px;height:24px;object-fit:contain;" />';var s=n({display:"flex",alignItems:"center",justifyContent:"center",position:"absolute",top:"0px",bottom:"0px",width:"100%",transform:"rotate(0deg) scale(1)",transition:"transform 0.16s linear 0s, opacity 0.08s linear 0s"},null,i);var r='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" fill="white" d="M18.601 8.39897C18.269 8.06702 17.7309 8.06702 17.3989 8.39897L12 13.7979L6.60099 8.39897C6.26904 8.06702 5.73086 8.06702 5.39891 8.39897C5.06696 8.73091 5.06696 9.2691 5.39891 9.60105L11.3989 15.601C11.7309 15.933 12.269 15.933 12.601 15.601L18.601 9.60105C18.9329 9.2691 18.9329 8.73091 18.601 8.39897Z"></path></svg>';var d=n({display:"flex",alignItems:"center",justifyContent:"center",position:"absolute",top:"0px",bottom:"0px",width:"100%",transition:"transform 0.16s linear 0s, opacity 0.08s linear 0s",opacity:"0",transform:"rotate(-30deg)"},null,r);var a=n({position:"absolute",top:"0px",left:"0px",width:"48px",height:"48px",borderRadius:"50%",cursor:"pointer",transformOrigin:"center",overflowX:"hidden",overflowY:"hidden",WebkitBackfaceVisibility:"hidden",WebkitFontSmoothing:"antialiased"});var l=n({fontFamily:"Inter, Helvetica Neue, Helvetica, Arial, sans-serif",fontSize:"100%",fontStyle:"normal",fontWeight:"normal",lineHeight:1});var p=n({zIndex:2147483004,position:"fixed",bottom:"20px",display:"block",right:"20px",width:"48px",height:"48px",borderRadius:"50%",boxShadow:"rgba(0, 0, 0, 0.06) 0px 1px 6px 0px, rgba(0, 0, 0, 0.16) 0px 2px 32px 0px",backgroundColor:e},"intercom-facade-btn");a.append(s);a.append(d);l.append(a);l.addEventListener("click",function(){o(true)});l.addEventListener("mouseenter",function(){o(false)});p.append(l);document.querySelector("body").append(p);})(window.intercomSettings);
    `;

    document.head.appendChild(script);

    return () => {
      const btn = document.querySelector('#intercom-facade-btn');
      if (btn) {
        btn.remove();
      }

      if (window.Intercom) {
        try {
          window.Intercom('shutdown');
        } catch {}
      }

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
}

declare global {
  interface Window {
    intercomSettings?: {
      app_id: string;
      background_color?: string;
      [key: string]: unknown;
    };
    Intercom?: ((action: string, data?: Record<string, unknown>) => void) & {
      booted?: boolean;
    };
  }
}
