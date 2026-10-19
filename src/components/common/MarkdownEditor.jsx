import MDEditor from '@uiw/react-md-editor/nohighlight'

import MarkdownRenderer from './MarkdownRenderer'

export default function MarkdownEditor({ value, onChange }) {
  return (
    <div data-color-mode="light" className="mb-3">
      <MDEditor
        value={value}
        onChange={val => onChange(val ?? '')}
        components={{
          preview: source => <MarkdownRenderer source={source} />,
        }}
      />
    </div>
  )
}
