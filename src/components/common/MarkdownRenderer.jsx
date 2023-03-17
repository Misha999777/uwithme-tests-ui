import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from "remark-math";
import RehypeKatexPlugin from "rehype-katex";
import RehypePrismPlugin from "@mapbox/rehype-prism";
import "katex/dist/katex.min.css";
import "prismjs/themes/prism.min.css";

export default function MarkdownRenderer({source}) {
    return (
        <ReactMarkdown
            children={source}
            remarkPlugins={[RemarkMathPlugin]}
            rehypePlugins={[RehypeKatexPlugin, [RehypePrismPlugin, {ignoreMissing: true}]]}
        />
    )
};