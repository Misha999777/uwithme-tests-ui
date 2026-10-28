import ReactMarkdown from 'react-markdown'
import RemarkGfmPlugin from 'remark-gfm'
import RemarkMathPlugin from 'remark-math'
import RehypeKatexPlugin from 'rehype-katex'
import RehypeHighlightPlugin from 'rehype-highlight'

import '@uiw/react-markdown-preview/markdown.css'
import 'highlight.js/styles/github.min.css'

export default function MarkdownRenderer({ source }) {
  return (
    <div className="wmde-markdown" data-color-mode="light">
      <ReactMarkdown
        skipHtml
        remarkPlugins={[RemarkGfmPlugin, RemarkMathPlugin]}
        rehypePlugins={[[RehypeKatexPlugin, { output: 'mathml' }], RehypeHighlightPlugin]}
      >
        {source}
      </ReactMarkdown>
    </div>
  )
}
