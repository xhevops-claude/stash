import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs"

mermaid.initialize({ startOnLoad: false })

// DocFX renders ```mermaid fences as <pre><code class="lang-mermaid">.
// Convert those to <pre class="mermaid"> and let mermaid draw them.
// `start` runs on every page load/navigation in the modern template.
export default {
  start: () => {
    const blocks = document.querySelectorAll("code.lang-mermaid")
    blocks.forEach((el) => {
      const pre = document.createElement("pre")
      pre.className = "mermaid"
      pre.textContent = el.textContent
      ;(el.closest("pre") || el).replaceWith(pre)
    })
    if (blocks.length) mermaid.run({ querySelector: "pre.mermaid" })
  },
}
