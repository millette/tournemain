import { Component } from 'react'
import { Editor, EditorState, ContentState } from 'draft-js'

class MyEditor extends Component {
  constructor(props) {
    super(props)
    this.state = { editorState: false }
    this.onChange = (editorState) => this.setState({ editorState })
  }

  componentDidMount() {
    this.setState({
      editorState: EditorState.createWithContent(
        ContentState.createFromText(this.props.initialContent)
      )
    })
  }

  render() {
    return this.state.editorState ? (
        <Editor editorKey={this.props.editorKey} editorState={this.state.editorState} onChange={this.onChange} />
    ) : (
      <div dangerouslySetInnerHTML={{ __html: this.props.initialContent }} />
    )
  }
}

export default MyEditor
