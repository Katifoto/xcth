
(function(){
  // By default this static site does not load analytics, marketing pixels or external embeds.
  // If analytics is added later, set window.BK_ENABLE_ANALYTICS = true before this script and load tags only after active consent.
  if(!window.BK_ENABLE_ANALYTICS) return;
  const key='bk_cookie_consent_v1';
  const existing=localStorage.getItem(key);
  function loadAnalytics(){
    // Insert GA4 / Consent Mode tags here only after consent.
    window.BK_ANALYTICS_ALLOWED=true;
  }
  if(existing==='accepted') loadAnalytics();
  if(existing) return;
  const banner=document.createElement('div');
  banner.className='cookie-banner';
  banner.innerHTML='<p>We use only necessary cookies by default. Analytics loads only with your consent.</p><button data-cookie="reject">Reject</button><button data-cookie="accept">Accept</button>';
  document.body.appendChild(banner);
  banner.addEventListener('click',e=>{
    const v=e.target && e.target.dataset.cookie;
    if(!v) return;
    localStorage.setItem(key, v==='accept'?'accepted':'rejected');
    if(v==='accept') loadAnalytics();
    banner.remove();
  });
})();
