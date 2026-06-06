(function () {
  "use strict";

  function loadImage(img) {
    if (!img.dataset.src || img.dataset.loaded) return;
    img.src = img.dataset.src;
    img.dataset.loaded = "true";
    img.removeAttribute("data-src");
  }

  function loadBackground(el) {
    if (!el.dataset.bg || el.dataset.bgLoaded) return;
    el.style.backgroundImage = 'url("' + el.dataset.bg + '")';
    el.dataset.bgLoaded = "true";
  }

  function loadVideo(video) {
    if (video.dataset.loaded) return;
    var source = video.querySelector("source[data-src]");
    if (!source) return;
    source.src = source.dataset.src;
    source.removeAttribute("data-src");
    video.load();
    video.dataset.loaded = "true";
    video.play().catch(function () {});
  }

  function loadSectionAssets(section) {
    section.querySelectorAll("img[data-src]").forEach(loadImage);
    section.querySelectorAll("[data-bg]").forEach(loadBackground);
  }

  function prefetchAdjacent(activeSection) {
    var sections = Array.prototype.slice.call(
      document.querySelectorAll(".main-content > .section")
    );
    var idx = sections.indexOf(activeSection);
    [sections[idx - 1], sections[idx + 1]]
      .filter(Boolean)
      .forEach(function (section) {
        setTimeout(function () {
          loadSectionAssets(section);
        }, 400);
      });
  }

  function initSectionLazyLoad() {
    var mainContent = document.querySelector(".main-content");
    if (!mainContent) return;

    var sections = mainContent.querySelectorAll(".section");
    var active = mainContent.querySelector(".section--is-active");
    if (active) loadSectionAssets(active);

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class" &&
          mutation.target.classList.contains("section--is-active")
        ) {
          loadSectionAssets(mutation.target);
          prefetchAdjacent(mutation.target);
        }
      });
    });

    sections.forEach(function (section) {
      observer.observe(section, {
        attributes: true,
        attributeFilter: ["class"],
      });
    });
  }

  function initLazyImages() {
    var lazyImages = document.querySelectorAll("img[data-src]");
    if (!lazyImages.length) return;

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              loadImage(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "300px" }
      );
      lazyImages.forEach(function (img) {
        observer.observe(img);
      });
      return;
    }

    lazyImages.forEach(loadImage);
  }

  function initLazyVideos() {
    var videos = document.querySelectorAll("video.lazy-video");
    if (!videos.length) return;

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              loadVideo(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "200px", threshold: 0.1 }
      );
      videos.forEach(function (video) {
        observer.observe(video);
      });
      return;
    }

    videos.forEach(loadVideo);
  }

  var emailJsPromise = null;

  window.initEmailJS = function () {
    if (window.emailjsInitialized) {
      return Promise.resolve();
    }
    if (emailJsPromise) return emailJsPromise;

    emailJsPromise = new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
      script.onload = function () {
        emailjs.init("areCz8LCU42MrSRX8");
        window.emailjsInitialized = true;
        resolve();
      };
      script.onerror = reject;
      document.body.appendChild(script);
    });

    return emailJsPromise;
  };

  function initEmailLazyLoad() {
    var hireSection = document.querySelector(".main-content > .section:last-child");
    if (!hireSection) return;

    var preloadEmail = function () {
      window.initEmailJS();
    };

    hireSection.querySelectorAll("input, textarea, button").forEach(function (el) {
      el.addEventListener("focus", preloadEmail, { once: true });
    });

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class" &&
          mutation.target.classList.contains("section--is-active")
        ) {
          preloadEmail();
        }
      });
    });

    observer.observe(hireSection, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("img[data-src]:not([src])").forEach(function (img) {
      img.src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    });
    initLazyImages();
    initSectionLazyLoad();
    initEmailLazyLoad();
    initLazyVideos();
  });
})();
