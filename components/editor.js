// npm
import { Component } from 'react'
import { Editor, EditorState, ContentState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

class MyEditor extends Component {
  constructor(props) {
    super(props)
    this.state = { editorState: false, html: false }
    this.onChange = (editorState) => this.setState({ html: false, editorState })

    this.showHTML = () => {
      const html = stateToHTML(this.state.editorState.getCurrentContent())
      console.log('HTML:', html)
      console.log('HTML.length', html.length)
      this.setState({ html })
    }
  }

  componentDidMount() {
    this.setState({
      editorState: EditorState.createWithContent(
        ContentState.createFromText(this.props.initialContent)
      )
    })
  }

  render() {
    return (
    <>
    {this.state.editorState ? (
        <Editor editorKey={this.props.editorKey} editorState={this.state.editorState} onChange={this.onChange} />
    ) : (
      <div dangerouslySetInnerHTML={{ __html: this.props.initialContent }} />
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
