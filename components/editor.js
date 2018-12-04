// npm
import { Component } from 'react'
// import { convertFromHTML, Editor, EditorState, ContentState } from 'draft-js'
// import { convertFromHTML, Editor, EditorState, ContentState } from 'medium-draft/dist/medium-draft'
import { createEditorState, Editor, EditorState, ContentState } from 'medium-draft/dist/medium-draft'
import mediumDraftExporter from 'medium-draft/dist/medium-draft-exporter'
import mediumDraftImporter from 'medium-draft/dist/medium-draft-importer'
import { convertToRaw } from 'draft-js'

import 'medium-draft/dist/medium-draft.css'

// TODO: evaluate https://github.com/HubSpot/draft-convert instead of draft-js-export-html
// import { stateToHTML } from 'draft-js-export-html'

// import mediumDraftExporter from 'medium-draft/lib/exporter'

class MyEditor extends Component {
  constructor(props) {
    super(props)

    // const editorState = createEditorState(convertToRaw(mediumDraftImporter(props.initialContent)))

    this.state = { editorState: false, html: false }
    this.onChange = (editorState) => this.setState({ html: false, editorState })

    /*
    const editorState = // your draft editorState
    const renderedHTML = mediumDraftExporter(editorState.getCurrentContent())
    // Use renderedHTML
    */

    this.showHTML = () => {
      // const html = stateToHTML(this.state.editorState.getCurrentContent())
      const html = mediumDraftExporter(this.state.editorState.getCurrentContent())
      console.log('HTML:', html)
      console.log('HTML.length', html.length)
      this.setState({ html })
    }
  }

  componentDidMount() {
    // const it = ContentState.createFromText(this.props.initialContent)

    const editorState = createEditorState(convertToRaw(mediumDraftImporter(this.props.initialContent)))
    this.setState({ editorState })

    /*
    const blocksFromHTML = convertFromHTML(this.props.initialContent)
    const it = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    )

    this.setState({
      editorState: EditorState.createWithContent(it)
    })
    */
  }

  /*

      <div className='md-RichEditor-root'>
        <div className='public-DraftEditor-content' dangerouslySetInnerHTML={{ __html: this.props.initialContent }} />
      </div>


  */

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
