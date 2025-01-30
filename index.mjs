import { convertMarkdownToHTML } from "./script.mjs";

document.getElementById("markdown").addEventListener("input", function () {
  const markdownText = this.value;
  document.getElementById("output").innerHTML =
    convertMarkdownToHTML(markdownText);
});
