import ReactDOMServer from "react-dom/server";
import SimpleMDE from "react-simplemde-editor";
import MarkdownRenderer from "./MarkdownRenderer";
import "easymde/dist/easymde.min.css";

const options = {
    spellChecker: false,
    autoDownloadFontAwesome: false,
    previewRender(text) {
        return ReactDOMServer.renderToString(
            <MarkdownRenderer source={text}/>
        );
    }
}

export default function MarkdownEditor({value, onChange}) {
    return (
        <SimpleMDE
            onChange={onChange}
            value={value}
            options={options}
        />
    )
};