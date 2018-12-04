import { Component } from 'react'
import { Editor, EditorState, ContentState } from 'draft-js'

class MyEditor extends Component {
  constructor(props) {
    super(props)
    // console.log('CHILDREN:', props.children)
    this.state = { editorState: false }
    this.onChange = (editorState) => {
      console.log('change editorState:', editorState)
      this.setState({ editorState })
    }
  }

  componentDidMount() {
    // this.setState({ editorState: EditorState.createEmpty() })
    this.setState({
      editorState: EditorState.createWithContent(
        ContentState.createFromText(this.props.initialContent)
      )
    })
  }

  render() {
    return this.state.editorState ? (
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
    ) : null
  }
}

export default MyEditor
