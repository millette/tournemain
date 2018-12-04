// npm
import { Component } from "react"
// import Link from "next/link"
import Error from "next/error"

import "medium-draft/dist/basic.css"
import "medium-draft/dist/medium-draft.css"

// self
import MyEditor from "../components/editor"
import Nav from "../components/nav"

// const Index = ({ json, path }) => {
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = { edit: false }
    this.edit = () => this.setState({ edit: true })
    this.cancelEdit = () => this.setState({ edit: false })
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
          </div>
        </section>
      </>
    )
  }
}

/*
Index.getInitialProps = async (o) => {
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
*/

// export default Index
