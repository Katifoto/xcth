
(function(){
  const forms=document.querySelectorAll('.contact-form');
  forms.forEach(form=>{
    const status=form.querySelector('.form-status');
    const button=form.querySelector('button[type="submit"]');
    const source=form.querySelector('[name="sourcePage"]');
    const consent=form.querySelector('[name="consentTimestamp"]');
    if(source) source.value=location.href;
    form.addEventListener('submit', async (event)=>{
      event.preventDefault();
      status.textContent=''; status.className='form-status';
      const endpoint=form.dataset.endpoint;
      if(!form.checkValidity()){
        status.textContent=status.dataset.error || 'Please check the form.'; status.classList.add('error'); form.reportValidity(); return;
      }
      if(form.website && form.website.value){ status.textContent=''; return; }
      if(consent) consent.value=new Date().toISOString();
      const data=Object.fromEntries(new FormData(form).entries());
      data.timestamp=new Date().toISOString();
      data.userAgent=navigator.userAgent;
      if(!endpoint || endpoint.includes('GOOGLE_SCRIPT_WEBAPP_URL')){
        status.textContent='Form endpoint placeholder is not configured yet.'; status.classList.add('error'); return;
      }
      button.disabled=true; button.setAttribute('aria-busy','true');
      try{
        const res=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(data)});
        if(!res.ok) throw new Error('Network response was not ok');
        status.textContent=status.dataset.success || 'Sent.'; status.classList.add('success'); form.reset();
      }catch(e){
        try{
          await fetch(endpoint,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(data)});
          status.textContent=status.dataset.success || 'Sent.'; status.classList.add('success'); form.reset();
        }catch(err){ status.textContent=status.dataset.error || 'Sending failed.'; status.classList.add('error'); }
      }finally{ button.disabled=false; button.removeAttribute('aria-busy'); }
    });
  });
})();
