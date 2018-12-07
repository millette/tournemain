// npm
import { Component } from "react"
import {
  createEditorState,
  Editor,
  findLinkEntities,
} from "medium-draft/dist/medium-draft"

import {
  setRenderOptions,
  styleToHTML,
  blockToHTML,
} from "medium-draft/dist/medium-draft-exporter"

import {
  setImportOptions,
  htmlToStyle,
  htmlToBlock,
} from "medium-draft/dist/medium-draft-importer"

import {
  CompositeDecorator,
  RichUtils,
  EditorState,
  convertToRaw,
} from "draft-js"

import Router from "next/router"

import "medium-draft/dist/medium-draft.css"

const htmlToEntity = (nodeName, node, createEntity) => {
  if (nodeName === "a") {
    return createEntity("LINK", "MUTABLE", { url: node.pathname })
  }
  // return undefined
}

const PageLink = ({ href, children }) => (
  <a className="md-inline-link" href={href} data-type="page">
    {children}
  </a>
)

const entityToHTML = (entity, originalText) => {
  if (entity.type === "LINK") {
    return <PageLink href={entity.data.url}>{originalText}</PageLink>
    /*
    return (
      <a className="md-inline-link" href={entity.data.url} data-type="page">
        {originalText}
      </a>
    )
    */
  }
  return originalText
}

const elOptsExport = {
  styleToHTML,
  blockToHTML,
  entityToHTML,
}

const elOptsImport = {
  htmlToStyle,
  htmlToEntity,
  htmlToBlock,
}

const mediumDraftExporter = setRenderOptions(elOptsExport)
const mediumDraftImporter = setImportOptions(elOptsImport)

const Link = (props) => {
  const { contentState, entityKey } = props
  const { url } = contentState.getEntity(entityKey).getData()
  return <PageLink href={url}>{props.children}</PageLink>
  /*
  return (
    <a className="md-link" data-type="page" href={url}>
      {props.children}
    </a>
  )
  */
}

class MyMed extends Editor {
  setLink(url) {
    let { editorState } = this.props
    const selection = editorState.getSelection()
    const content = editorState.getCurrentContent()
    let entityKey = null
    let newUrl = url

    if (this.props.processURL) {
      newUrl = this.props.processURL(url)
    } else if (url.indexOf("/")) {
      newUrl = `/${newUrl}`
    }

    if (newUrl) {
      const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
        url: newUrl,
      })
      editorState = EditorState.push(
        editorState,
        contentWithEntity,
        "create-entity",
      )
      entityKey = contentWithEntity.getLastCreatedEntityKey()
    }
    this.onChange(
      RichUtils.toggleLink(editorState, selection, entityKey),
      this.focus,
    )
  }
}

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

    this.htmlClick = (ev) => {
      if (
        !ev.target.href ||
        !ev.target.dataset ||
        ev.target.dataset.type !== "page"
      )
        return
      ev.preventDefault()
      Router.push(
        `/page?page=${ev.target.pathname.slice(1)}`,
        ev.target.pathname,
      )
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
    const defaultDecorators = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link,
      },
    ])

    const editorState = createEditorState(
      convertToRaw(mediumDraftImporter(this.props.initialContent)),
      defaultDecorators,
    )
    this.setState({ editorState })
  }

  render() {
    const style = { whiteSpace: "pre-wrap" }

    return (
      <>
        {this.props.edit && this.state.editorState ? (
          <>
            <MyMed
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
            onClick={this.htmlClick}
            dangerouslySetInnerHTML={{ __html: this.props.initialContent }}
          />
        )}
      </>
    )
  }
}

export default MyEditor
