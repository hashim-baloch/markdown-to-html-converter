import { convertMarkdownToHTML } from "./script.mjs";

function runTests() {
  let passed = 0;
  let failed = 0;

  function test(input, expectedOutput, description) {
    const result = convertMarkdownToHTML(input);
    if (result.trim() === expectedOutput.trim()) {
      console.log(`✅ PASS: ${description}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${description}`);
      console.error(`   Expected: ${expectedOutput}`);
      console.error(`   Got:      ${result}`);
      failed++;
    }
  }

  console.log("🔍 Running Markdown to HTML Tests...\n");

  // Test Headers
  test("# Heading 1", "<h1>Heading 1</h1>", "Converts # to <h1>");
  test("## Heading 2", "<h2>Heading 2</h2>", "Converts ## to <h2>");
  test("### Heading 3", "<h3>Heading 3</h3>", "Converts ### to <h3>");

  // Test Bold & Italic
  test("**bold**", "<strong>bold</strong>", "Converts **bold** to <strong>");
  test("*italic*", "<em>italic</em>", "Converts *italic* to <em>");
  test(
    "~~strikethrough~~",
    "<del>strikethrough</del>",
    "Converts ~~text~~ to <del>"
  );

  // Test Links
  test(
    "[OpenAI](https://openai.com)",
    '<a href="https://openai.com" target="_blank">OpenAI</a>',
    "Converts [text](url) to <a>"
  );

  // Test Images
  test(
    "![Alt Text](image.jpg)",
    '<img src="image.jpg" alt="Alt Text" style="max-width:100%;">',
    "Converts ![alt](url) to <img>"
  );

  // Test Videos
  test(
    "![video](video.mp4)",
    '<video controls width="100%"><source src="video.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    "Converts ![video](url) to <video>"
  );

  // Test Lists
  test(
    "- Item 1\n- Item 2",
    "<ul><li>Item 1</li><li>Item 2</li></ul>",
    "Converts - items to <ul>"
  );
  test(
    "1. First\n2. Second",
    "<ol><li>First</li><li>Second</li></ol>",
    "Converts numbered list to <ol>"
  );

  // Test Blockquotes
  test(
    "> This is a quote",
    "<blockquote>This is a quote</blockquote>",
    "Converts > to <blockquote>"
  );

  // Test Code Blocks
  test(
    "`inline code`",
    "<code>inline code</code>",
    "Converts `inline code` to <code>"
  );
  test(
    "```\ncode block\n```",
    "<pre><code>code block</code></pre>",
    "Converts triple backticks to <pre><code>"
  );

  // Test Horizontal Rules
  test("---", "<hr>", "Converts --- to <hr>");
  test("***", "<hr>", "Converts *** to <hr>");

  // Test Tables
  test(
    "| Name | Age |\n|------|-----|\n| Alice | 25 |\n| Bob | 30 |",
    "<table><tr><th>Name</th><th>Age</th></tr><tr><td>Alice</td><td>25</td></tr><tr><td>Bob</td><td>30</td></tr></table>",
    "Converts Markdown tables to HTML tables"
  );

  test(
    "`![video](url)`",
    "<code>![video](url)</code>",
    "Ensures `![video](url)` is treated as code"
  );

  // Test Video Conversion
  test(
    "![video](video.mp4)",
    '<video controls width="100%"><source src="video.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    "Converts ![video](url) to <video>"
  );
  //some missing tests
  // Test Headers (4 to 6)
  test("#### Heading 4", "<h4>Heading 4</h4>", "Converts #### to <h4>");
  test("##### Heading 5", "<h5>Heading 5</h5>", "Converts ##### to <h5>");
  test("###### Heading 6", "<h6>Heading 6</h6>", "Converts ###### to <h6>");

  // Test Nested Lists
  test(
    "- Item 1\n  - Subitem 1",
    "<ul><li>Item 1<ul><li>Subitem 1</li></ul></li></ul>",
    "Handles nested lists"
  );

  // Test Line Breaks
  test(
    "Line 1  \nLine 2",
    "Line 1<br>Line 2",
    "Handles double-space line breaks"
  );
  test("Line 1\\\nLine 2", "Line 1<br>Line 2", "Handles backslash line breaks");

  // Test Inline HTML
  test(
    "<span>Inline HTML</span>",
    "<span>Inline HTML</span>",
    "Preserves inline HTML"
  );

  // Test Escaping Special Characters
  test("*Not Bold*", "*Not Bold*", "Handles escaped asterisks");
  test("\\# Not a Header", "# Not a Header", "Handles escaped hash");

  // Test Task Lists
  test(
    "- [ ] Task 1\n- [x] Task 2",
    "<ul><li><input type='checkbox'> Task 1</li><li><input type='checkbox' checked> Task 2</li></ul>",
    "Converts task lists"
  );

  // Test Definition Lists (if supported)
  test(
    "Term\n: Definition",
    "<dl><dt>Term</dt><dd>Definition</dd></dl>",
    "Converts definition lists"
  );

  // Test Footnotes
  test(
    "Text with footnote[^1]\n\n[^1]: Footnote content",
    "Text with footnote<sup id='fnref:1'><a href='#fn:1'>1</a></sup><br><br><div id='fn:1'><sup>1</sup> Footnote content</div>",
    "Handles footnotes"
  );

  // Test Abbreviations
  test(
    "*[HTML]: HyperText Markup Language\nHTML is cool",
    "<abbr title='HyperText Markup Language'>HTML</abbr> is cool",
    "Handles abbreviations"
  );

  // Test Table with Alignment
  test(
    "| Name | Age |\n|:----:|----:|\n| Alice | 25 |\n| Bob | 30 |",
    "<table><tr><th style='text-align:center;'>Name</th><th style='text-align:right;'>Age</th></tr><tr><td style='text-align:center;'>Alice</td><td style='text-align:right;'>25</td></tr><tr><td style='text-align:center;'>Bob</td><td style='text-align:right;'>30</td></tr></table>",
    "Handles table column alignment"
  );

  console.log(`\n✅ ${passed} Passed, ❌ ${failed} Failed.`);
}

// Run the tests
runTests();
