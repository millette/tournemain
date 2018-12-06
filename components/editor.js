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

    this.state = { editorState: false, dirty: false }
    this.onChange = (editorState) => this.setState({ editorState, dirty: true })

    this.saveHTML = () => {
      const html = mediumDraftExporter(
        this.state.editorState.getCurrentContent(),
      )
      if (html === this.props.initialContent) {
        // FIXME: tell user
        console.log("Content hasn't changed.")
        return
      }
      this.props.saveHTML({ html, path: this.props.editorKey })
    }
  }

  componentWillUnmount() {
    const undo2 =
      this.state.dirty &&
      mediumDraftExporter(this.state.editorState.getCurrentContent())
    const undo = this.props.initialContent !== undo2 && undo2
    // FIXME: temporarely save in localstorage
    this.props.cancelEdit({ undo, path: this.props.editorKey })
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

            <div className="field is-grouped">
              <p className="control">
                <button
                  disabled={!this.state.dirty}
                  className="button is-primary"
                  onClick={this.saveHTML}
                >
                  Save
                </button>
              </p>
              <p className="control">
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
      </>
    )
  }
}

export default MyEditor
