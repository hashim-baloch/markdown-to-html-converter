# Markdown to HTML Converter ✨

## The Raw-Dogged, No-Dependency Markdown Magic 🪄

Welcome to the **Markdown to HTML Converter**—a majestic piece of engineering that takes your glorious Markdown and spits out HTML like it’s going out of style. I did this **with absolutely zero dependencies**—that’s right, no bloated libraries, no unnecessary frameworks, just pure, unfiltered, hand-rolled JavaScript.

Oh, and let’s get one thing straight: This wouldn’t be half as functional without my **god-tier regex skills** and the **grueling** test cases I wrote. That’s right—no AI-generated regex nonsense, just pure human suffering and pattern-matching sorcery. You’re welcome.

---

## Features (or Lack Thereof)

✅ Converts Markdown to HTML… mostly.  
✅ Minimalistic and lightweight—because bloat is a crime.  
✅ A **Download HTML** button that may or may not work as intended.  
✅ No dependencies—did I mention that already?  
✅ Runs purely in the browser, because who needs backend logic anyway?  
✅ **Hand-crafted regex patterns**—the real backbone of this project.

🚧 **Planned Improvements:** More accurate Markdown parsing (because sometimes, even regex has trust issues).

---

## How to Use This Absolute Masterpiece 🏆

1. Open `index.html` in your favorite browser (or the worst one, I don’t judge).
2. Type Markdown into the fancy textarea.
3. Watch in awe as it **magically** transforms into HTML in real-time.
4. Click the **Download HTML** button, because who doesn’t love downloading files?

---

## Installation & Setup (Just Kidding, There's Nothing to Install) 🚀

Since I’m proudly running this operation **dependency-free**, there’s no need for npm installs, build steps, or fancy CLI tools. Just open the HTML file and you’re good to go.

---

## Testing Results 📊

<summary>
At the moment, I proudly pass **23 out of 33** tests. That’s a solid **C-grade effort**, and I am fully embracing it. Improvements? Yeah, sure, maybe later. But for now, let’s call it **"feature-rich" in a fun and quirky way.**
</summary>

  <details>


```
PS D:\Serious Code\idk> node .\test.mjs
🔍 Running Markdown to HTML Tests...

✅ PASS: Converts # to <h1>
✅ PASS: Converts ## to <h2>
✅ PASS: Converts ### to <h3>
✅ PASS: Converts **bold** to <strong>
✅ PASS: Converts _italic_ to <em>
✅ PASS: Converts ~~text~~ to <del>
✅ PASS: Converts [text](url) to <a>
✅ PASS: Converts ![alt](url) to <img>
✅ PASS: Converts ![video](url) to <video>
✅ PASS: Converts - items to <ul>
✅ PASS: Converts numbered list to <ol>
✅ PASS: Converts > to <blockquote>
✅ PASS: Converts `inline code` to <code>
✅ PASS: Converts triple backticks to <pre><code>
✅ PASS: Converts --- to <hr>
✅ PASS: Converts *\*\* to <hr>
✅ PASS: Converts Markdown tables to HTML tables
✅ PASS: Ensures `![video](url)` is treated as code
✅ PASS: Converts ![video](url) to <video>
✅ PASS: Converts #### to <h4>
✅ PASS: Converts ##### to <h5>
✅ PASS: Converts ###### to <h6>
❌ FAIL: Handles nested lists
Expected: <ul><li>Item 1<ul><li>Subitem 1</li></ul></li></ul>
Got: <ul><li>Item 1</li></ul><br> - Subitem 1
❌ FAIL: Handles double-space line breaks
Expected: Line 1<br>Line 2
Got: Line 1 <br>Line 2
❌ FAIL: Handles backslash line breaks
Expected: Line 1<br>Line 2
Got: Line 1\<br>Line 2
✅ PASS: Preserves inline HTML
❌ FAIL: Handles escaped asterisks
Expected: *Not Bold\*
Got: <em>Not Bold</em>
❌ FAIL: Handles escaped hash
Expected: # Not a Header
Got: \# Not a Header
❌ FAIL: Converts task lists
Expected: <ul><li><input type='checkbox'> Task 1</li><li><input type='checkbox' checked> Task 2</li></ul>
Got: <ul><li>[ ] Task 1</li><li>[x] Task 2</li></ul>
❌ FAIL: Converts definition lists
Expected: <dl><dt>Term</dt><dd>Definition</dd></dl>
Got: Term<br>: Definition
❌ FAIL: Handles footnotes
Expected: Text with footnote<sup id='fnref:1'><a href='#fn:1'>1</a></sup><br><br><div id='fn:1'><sup>1</sup> Footnote content</div>
cool
❌ FAIL: Handles table column alignment
Expected: <table><tr><th style='text-align:center;'>Name</th><th style='text-align:right;'>Age</th></tr><tr><t Got: <table><tr><th>Name</th><th>Age</th></tr><tr><td>Alice</td><td>25</td></tr><tr><td>Bob</td><td>30</td></tr></table>

✅ 23 Passed, ❌ 10 Failed.

```

And by the way, those tests? Yeah, I wrote them too. Painstakingly. Every single one. If this thing works, it’s **entirely because of my suffering.**

  </details>
  
---

## Contributing 🤷

You’re more than welcome to fork this project, but honestly, I love it in its pure, slightly broken form. If you must contribute, try not to ruin the minimalist charm.

---

## License 📜

No clue. Just don’t blame me if this thing breaks your computer or steals your lunch.

```

```
