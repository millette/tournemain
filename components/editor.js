// npm
import { Component } from "react"
import {
  createEditorState,
  Editor,
  EditorState,
  ContentState,
} from "medium-draft/dist/medium-draft"
import mediumDraftExporter from "medium-draft/dist/medium-draft-exporter"
import mediumDraftImporter from "medium-draft/dist/medium-draft-importer"
import { convertToRaw } from "draft-js"

import "medium-draft/dist/medium-draft.css"

class MyEditor extends Component {
  constructor(props) {
    super(props)

    this.state = { editorState: false, html: false }
    this.onChange = (editorState) => this.setState({ html: false, editorState })

    this.showHTML = () => {
      const html = mediumDraftExporter(
        this.state.editorState.getCurrentContent(),
      )
      this.setState({ html })
    }
  }

  componentDidMount() {
    const editorState = createEditorState(
      convertToRaw(mediumDraftImporter(this.props.initialContent)),
    )
    this.setState({ editorState })
  }

  render() {
    const style = { whiteSpace: "pre-wrap" }

    return (
      <>
        {this.props.edit && this.state.editorState ? (
          <>
            <Editor
              editorKey={this.props.editorKey}
              editorState={this.state.editorState}
              onChange={this.onChange}
            />

            <div class="field is-grouped">
              <p class="control">
                <button className="button" onClick={this.showHTML}>
                  Show updated html output
                </button>
              </p>
              <p class="control">
                <button
                  className="button is-warning"
                  onClick={this.props.cancelEdit}
                >
                  Cancel
                </button>
              </p>
            </div>
          </>
        ) : (
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: this.props.initialContent }}
          />
        )}

        {this.state.html ? (
          <pre style={style}>
            <code>{this.state.html}</code>
          </pre>
        ) : null}
      </>
    )
  }
}

export default MyEditor
