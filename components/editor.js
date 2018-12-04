// npm
import { Component } from 'react'
// import { convertFromHTML, Editor, EditorState, ContentState } from 'draft-js'
// import { convertFromHTML, Editor, EditorState, ContentState } from 'medium-draft/dist/medium-draft'
import { createEditorState, Editor, EditorState, ContentState } from 'medium-draft/dist/medium-draft'
import mediumDraftExporter from 'medium-draft/dist/medium-draft-exporter'
import mediumDraftImporter from 'medium-draft/dist/medium-draft-importer'
import { convertToRaw } from 'draft-js'

import 'medium-draft/dist/medium-draft.css'


class MyEditor extends Component {
  constructor(props) {
    super(props)


    this.state = { editorState: false, html: false }
    this.onChange = (editorState) => this.setState({ html: false, editorState })


    this.showHTML = () => {
      const html = mediumDraftExporter(this.state.editorState.getCurrentContent())
      console.log('HTML:', html)
      console.log('HTML.length', html.length)
      this.setState({ html })
    }
  }

  componentDidMount() {
    const editorState = createEditorState(convertToRaw(mediumDraftImporter(this.props.initialContent)))
    this.setState({ editorState })
  }


  render() {
    return (
    <>
    {this.state.editorState ? (
        <Editor editorKey={this.props.editorKey} editorState={this.state.editorState} onChange={this.onChange} />
    ) : (
      <div className='content' dangerouslySetInnerHTML={{ __html: this.props.initialContent }} />
    )}
    <button onClick={this.showHTML}>
      Show updated html output
    </button>

    <div>
    {this.state.html}
    </div>
        </>
  )
  }
}

export default MyEditor
