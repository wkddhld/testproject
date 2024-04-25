function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  function scrollToBottom() {
    window.addEventListener('scroll', function noScroll() {
      window.removeEventListener('scroll', noScroll); 
    });
  
  
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }
 
  