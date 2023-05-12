// a function to create a regex from the template provided in the first line of the txt file
function createRegexFromTemplate(template) {
  const regexString = "^" + template.replace(/{{(\d+)}}/g, "(.*)") + "$";
  return new RegExp(regexString);
}

// a function to convert the template to an array using the regex created from the template
function convertTemplateToArray(templateToConvert, pattern) {
  const result = pattern.exec(templateToConvert)
  if (result) {
    return result.slice(1)
  }

  return result
}

function readLines() {
  document.getElementById("output").innerHTML = "";
  const fileInput = document.getElementById("file");
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const text = event.target.result;
    const lines = text.trim().split("\n");
    // pass the relevant lines to the functions
    const template = createRegexFromTemplate(lines[0].trim())
    const templateArray = convertTemplateToArray(lines[1].trim(), template)
    let outputString = ""
    if (templateArray) {
      for (let i = 0; i < templateArray.length; i++) {
        outputString += `${i + 1}. ${templateArray[i]} <br>`
      }
    }
    else {
      outputString = "Error: template does not match input"
    }

    // display the output
    document.getElementById("output").innerHTML += outputString;
    
  };
  reader.readAsText(file);
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("read-file-btn").addEventListener("click", readLines);
});