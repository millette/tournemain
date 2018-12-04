// npm
import { Component } from "react"
import Error from "next/error"

import "medium-draft/dist/basic.css"
import "medium-draft/dist/medium-draft.css"

// self
import MyEditor from "../components/editor"
import Nav from "../components/nav"

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = { undo: false, edit: false, path: false }
    this.edit = () => this.setState({ edit: true })
    this.cancelEdit = (ev) => {
      let { undo, path } = ev
      if (undo === "" || typeof undo !== "string") {
        undo = false
        path = false
      }
      this.setState({ undo, path, edit: false })
    }
  }

  static async getInitialProps(o) {
    const path = o.asPath.slice(1)
    if (o.req) {
      const data = require("../pages.json")
      const json = data[path]
      return { json, path }
    }

    return fetch(`/api/page/${path}`)
      .then((res) => res.json())
      .then((json) => ({ json, path }))
  }

  /*
  componentWillUnmount() {
    console.log('componentWillUnmount (page)')
  }

  componentDidMount() {
    console.log('componentDidMount: page')
  }
  */

  render() {
    const { json, path } = this.props
    // FIXME: should offer to create page
    if (json.statusCode) return <Error statusCode={json.statusCode} />

    return (
      <>
        <Nav />
        <section className="section">
          <div className="container">
            <h1 className="title">
              {json.title}{" "}
              {this.state.edit ? null : (
                <button className="button is-small" onClick={this.edit}>
                  edit
                </button>
              )}
            </h1>
            <MyEditor
              cancelEdit={this.cancelEdit}
              edit={this.state.edit}
              initialContent={json.content}
              key={path}
              editorKey={path}
            />
            {this.state.undo ? (
              <div className="box">
                <h2 className="title">
                  {this.state.path} <small>Undoable</small>
                </h2>
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: this.state.undo }}
                />
              </div>
            ) : null}
          </div>
        </section>
      </>
    )
  }
}
