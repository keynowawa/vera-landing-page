/**
 * VERA Vault Landing Page - Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  // --- Scroll Animations (Intersection Observer) ---
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    const visibleEntries = entries.filter(e => e.isIntersecting);
    
    visibleEntries.forEach((entry, index) => {
      // Stagger the animations for elements entering at the same time
      setTimeout(() => {
        entry.target.classList.add('is-visible');
        
        // If it's the timeline, trigger the first step animation automatically
        if (entry.target.classList.contains('timeline-grid')) {
          activateTimelineStep('step-1');
        }
      }, index * 150);
      
      observer.unobserve(entry.target);
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.classList.add('fade-up-init'); // Ensure initial state via JS if needed, though CSS handles it
    observer.observe(el);
  });

  // --- Interactive Timeline Logic ---
  const timelineSteps = document.querySelectorAll('.timeline-step');
  const visContents = document.querySelectorAll('.vis-content');

  function activateTimelineStep(stepId) {
    // Deactivate all
    timelineSteps.forEach(step => step.classList.remove('active'));
    visContents.forEach(content => {
      content.classList.remove('active');
      content.style.display = 'none'; // Force reflow for animation
    });

    // Activate target
    const targetStep = document.querySelector(`.timeline-step[data-target="${stepId}"]`);
    const targetContent = document.getElementById(`content-${stepId}`);

    if (targetStep && targetContent) {
      targetStep.classList.add('active');
      targetContent.style.display = 'block';
      // tiny delay to allow display block to apply before adding class for opacity transition
      setTimeout(() => {
        targetContent.classList.add('active');
      }, 10);
    }
  }

  timelineSteps.forEach(step => {
    step.addEventListener('click', () => {
      const targetId = step.getAttribute('data-target');
      activateTimelineStep(targetId);
    });
  });

  // --- Data Flow Visualizer Logic ---
  const dataPills = document.querySelectorAll('.data-pill');
  const dataZones = document.querySelectorAll('.data-zone');

  dataPills.forEach(pill => {
    // Hover effects
    pill.addEventListener('mouseenter', () => {
      const targetZoneId = `zone-${pill.getAttribute('data-zone')}`;
      pill.classList.add('active');
      const targetZone = document.getElementById(targetZoneId);
      if (targetZone) {
        targetZone.classList.add('highlight');
      }
    });

    pill.addEventListener('mouseleave', () => {
      const targetZoneId = `zone-${pill.getAttribute('data-zone')}`;
      pill.classList.remove('active');
      const targetZone = document.getElementById(targetZoneId);
      if (targetZone) {
        targetZone.classList.remove('highlight');
      }
    });

    // Click effects (for mobile touch)
    pill.addEventListener('click', () => {
      // Remove all highlights first
      dataPills.forEach(p => p.classList.remove('active'));
      dataZones.forEach(z => z.classList.remove('highlight'));
      
      const targetZoneId = `zone-${pill.getAttribute('data-zone')}`;
      pill.classList.add('active');
      const targetZone = document.getElementById(targetZoneId);
      if (targetZone) {
        targetZone.classList.add('highlight');
      }

      // Auto-remove after 2 seconds on mobile
      setTimeout(() => {
        pill.classList.remove('active');
        if (targetZone) targetZone.classList.remove('highlight');
      }, 2000);
    });
  });

  // --- FAQ Accordion Logic ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other accordions
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('open');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        otherAnswer.style.maxHeight = null;
      });

      if (!isOpen) {
        // Open this one
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // --- Mobile Menu Toggle ---
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      const isActive = navLinks.classList.contains('is-active');
      
      if (isActive) {
        navLinks.classList.remove('is-active');
        mobileBtn.innerHTML = '<i data-lucide="menu"></i>';
      } else {
        navLinks.classList.add('is-active');
        mobileBtn.innerHTML = '<i data-lucide="x"></i>';
      }
      lucide.createIcons();
    });

    // Close menu when a link is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-active');
        mobileBtn.innerHTML = '<i data-lucide="menu"></i>';
        lucide.createIcons();
      });
    });
  }

});
