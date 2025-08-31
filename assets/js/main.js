

// perloader


$(window).on("load", function () {
  $(".preloader").addClass("active");
  setTimeout(function () {
    $(".preloader").addClass("done");
  }, 1500);
});



// typed


document.addEventListener("DOMContentLoaded", function () {
  var typed = new Typed("#typed", {
    stringsElement: "#typed-strings",
    typeSpeed: 40,
    backSpeed: 20,
    startDelay: 0,
    loop: true,
    loopCount: Infinity,
  });

  document.querySelector(".loop").addEventListener("click", function () {
    toggleLoop(typed);
  });
});




/*=============== SHOW model history ===============*/
const showmodel1 = (openButton, modelContent) => {
  const openBtn = document.getElementById(openButton),
    modelContainer = document.getElementById(modelContent)

  if (openBtn && modelContainer) {
    openBtn.addEventListener('click', () => {
      modelContainer.classList.add('show-model')
    })
    // Add click event listener to modelContainer
    modelContainer.addEventListener('click', closemodel1)
  }
}
  
showmodel1('open-model1', 'model-container')

/*=============== CLOSE model history ===============*/
const closeBtn1 = document.querySelectorAll('.close-model')

function closemodel1() {
  const modelContainer = document.getElementById('model-container')
  modelContainer.classList.remove('show-model')
}
closeBtn1.forEach(c => c.addEventListener('click', closemodel1))







/*=============== SHOW model experience ===============*/
const showmodel2 = (openButton, modelContent) => {
  const openBtn = document.getElementById(openButton),
    modelContainer = document.getElementById(modelContent)

  if (openBtn && modelContainer) {
    openBtn.addEventListener('click', () => {
      modelContainer.classList.add('show-model')
    })
 
    // Add click event listener to modelContainer
    modelContainer.addEventListener('click', closemodel2)
  }
}
showmodel2('open-model2', 'model-container-2')

/*=============== CLOSE model experience ===============*/
const closeBtn2 = document.querySelectorAll('.close-model-2')

function closemodel2() {
  const modelContainer = document.getElementById('model-container-2')
  modelContainer.classList.remove('show-model')
}
closeBtn2.forEach(c => c.addEventListener('click', closemodel2))




/*=============== SHOW model goals ===============*/
const showmodel3 = (openButton, modelContent) => {
  const openBtn = document.getElementById(openButton),
    modelContainer = document.getElementById(modelContent)

  if (openBtn && modelContainer) {
    openBtn.addEventListener('click', () => {
      modelContainer.classList.add('show-model')
    })
 
    // Add click event listener to modelContainer
    modelContainer.addEventListener('click', closemodel3)
  }
}
showmodel3('open-model3', 'model-container-3')

/*=============== CLOSE model goals ===============*/
const closeBtn3 = document.querySelectorAll('.close-model-3')

function closemodel3() {
  const modelContainer = document.getElementById('model-container-3')
  modelContainer.classList.remove('show-model')
}
closeBtn3.forEach(c => c.addEventListener('click', closemodel3))






// Email
function sendMail() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;
  var options = []

  if (document.getElementById("opt-1").checked) {
    options.push("App Development");
  }
  if (document.getElementById("opt-2").checked) {
    options.push("Web Development");
  }
  if (document.getElementById("opt-3").checked) {
    options.push("Graphic Design");
  }
  if (document.getElementById("opt-4").checked) {
    options.push("UI/UX Design");
  }
  if (document.getElementById("opt-5").checked) {
    options.push("Brand Planning");
  }
  if (document.getElementById("opt-6").checked) {
    options.push("Logo Design");
  }

  if (name === "" || email === "") {
    showAlert("Please fill in your name and email.", "error");
    return;
  }

  if (options.length === 0) {
    showAlert("Please select at least one option.", "error");
    return;
  }

  var gmails = {
    name: name,
    email: email,
    message: message,
    options: options.join(", "),
  };

  const serviceID = "service_v3vncii";
  const templateID = "template_pvx1d6l";

  emailjs.send(serviceID, templateID, gmails)
    .then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";

      // Uncheck options
      var checkboxes = document.getElementsByTagName("input");
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type === "checkbox") {
          checkboxes[i].checked = false;
        }
      }

      console.log(res);
      showAlert("Your Message send successfully.", "success");
    })
    .catch((err) => {
      console.log(err);
      showAlert("Error sending message. Please try again later.", "error");
    });
}
// Add a click event to the close button and the background
document.querySelector('.alert-close').addEventListener('click', hideAlert)
document.querySelector('.bg-alert-message').addEventListener('click', hideAlert)

function hideAlert() {
  const alertElement = document.querySelector('.alert-custom')
  const bgElement = document.querySelector('.bg-alert-message')
  alertElement.style.display = 'none'
  bgElement.style.display = 'none'
}

function showAlert(message, type) {
  const alertElement = document.querySelector('.alert-custom')
  const bgElement = document.querySelector('.bg-alert-message')
  alertElement.style.display = 'block'
  bgElement.style.display = 'block'
  document.getElementById("alert-message").innerText = message
  if (type === "error") {
    alertElement.style.backgroundColor = "#353635"
    bgElement.style.backgroundColor = "#000000d6"
  } else {
    alertElement.style.backgroundColor = "#fd5555"
    bgElement.style.backgroundColor = "#000000d6"
  }

  // Hide the alert and background after a few seconds
  setTimeout(() => {
    hideAlert()
  }, 6000)
}

// Add a click event to the close button
document.querySelector('.alert-close').addEventListener('click', () => {
  const alertElement = document.querySelector('.alert-custom');
  alertElement.style.display = 'none';
  bgElement.style.display = 'none';
});











document.addEventListener("DOMContentLoaded", function () {
  const skillTooltip = document.getElementById("skill-tooltip");
  if (!skillTooltip) {
    console.error("Tooltip element with id 'skill-tooltip' not found.");
    return;
  }
  const tooltipSkillName = document.getElementById("tooltip-skill-name");
  const tooltipDescription = document.getElementById("tooltip-description");
  const tooltipExperience = document.getElementById("tooltip-experience");

  // Function to calculate years of experience based on data-start and data-end attributes
  function calculateYears(skillDiv) {
    const startYear = parseInt(skillDiv.getAttribute("data-start"));
    let endYear = skillDiv.getAttribute("data-end");
    if (endYear === "Continued" || endYear === "continued" || !endYear) {
      endYear = new Date().getFullYear();
    } else {
      endYear = parseInt(endYear);
    }
    if (!startYear || !endYear || isNaN(startYear) || isNaN(endYear)) {
      return 0;
    }
    return endYear - startYear;
  }

  function showTooltip(event) {
    const skillDiv = event.currentTarget;
    const description = skillDiv.getAttribute("data-description");
    const skillName = skillDiv.querySelector(".skill-name").textContent;

    const years = calculateYears(skillDiv);

    tooltipSkillName.textContent = skillName;
    tooltipDescription.textContent = description;
    tooltipExperience.textContent = years > 0 ? years + " year" + (years > 1 ? "s" : "") : "N/A";

    // Get the index of the current skill
    const skillIndex = Array.from(skillElements).indexOf(skillDiv);
    const isLastFive = skillIndex >= skillElements.length - 5;

    // Position tooltip upwards for last five skills
    if (isLastFive) {
      skillTooltip.style.top = event.pageY - 180 + "px"; // Adjust upwards
    } else {
      skillTooltip.style.top = event.pageY + 15 + "px";
    }
    skillTooltip.style.left = event.pageX + 15 + "px";
    skillTooltip.classList.add("show");
  }

  function moveTooltip(event) {
    const skillDiv = event.currentTarget;
    const skillIndex = Array.from(skillElements).indexOf(skillDiv);
    const isLastFive = skillIndex >= skillElements.length - 5;

    // Position tooltip upwards for last five skills
    if (isLastFive) {
      skillTooltip.style.top = event.pageY - 180 + "px"; // Adjust upwards
    } else {
      skillTooltip.style.top = event.pageY + 15 + "px";
    }
    skillTooltip.style.left = event.pageX + 15 + "px";
  }

  function hideTooltip() {
    skillTooltip.classList.remove("show");
  }

  const skillElements = document.querySelectorAll(".skill");
  if (!skillElements.length) {
    console.error("No elements with class 'skill' found.");
    return;
  }
  skillElements.forEach((skill) => {
    skill.addEventListener("mouseenter", showTooltip);
    skill.addEventListener("mousemove", moveTooltip);
    skill.addEventListener("mouseleave", hideTooltip);

    // Add click event to open experience modal
    skill.addEventListener("click", () => {
      const experienceModal = document.getElementById("model-container-2");
      if (experienceModal) {
        experienceModal.classList.add("show-model");
      }
    });
  });
});
