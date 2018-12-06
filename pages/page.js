// npm
import { Component } from "react"
import Error from "next/error"
import fetch from "isomorphic-unfetch"

import "medium-draft/dist/basic.css"
import "medium-draft/dist/medium-draft.css"

// self
import { MyEditor, Nav } from "../components"
import { baseUrl } from "../utils"

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = { undo: false, edit: false, path: false }

    this.edit = () => this.setState({ edit: true })

    this.saveHTML = ({ html, path }) => {
      fetch(`/api/page/${path}`, {
        method: "PUT",
        body: JSON.stringify({ html }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          this.props.json.content = html
          this.setState({ edit: false })
        })
        .catch(console.error)
    }

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
    return fetch(baseUrl(o.req, `api/page/${path}`))
      .then((res) => res.json())
      .then((json) => ({ json, path }))
  }

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
              saveHTML={this.saveHTML}
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
