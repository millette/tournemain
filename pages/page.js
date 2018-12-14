// npm
import { Component } from "react"
import Error from "next/error"
import Router from "next/router"
import fetch from "isomorphic-unfetch"

// import "medium-draft/dist/basic.css"
// import "medium-draft/dist/medium-draft.css"

// self
// import { MyEditor, Nav } from "../components"
import { Nav } from "../components"
import { baseUrl } from "../utils"

export default class Page extends Component {
  constructor(props) {
    super(props)

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

  /*
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
          this.props.json.title = "Titre à venir"
          delete this.props.json.statusCode
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
  */

  static async getInitialProps(o) {
    return fetch(baseUrl(o.req, `api/page/${o.asPath.slice(1)}`))
      .then((res) => {
        if (res.ok) return res.json()
        const error = new Error(res.statusText)
        error.statusCode = res.status
        throw error
      })
      .catch((error) => ({ statusCode: error.statusCode || 503, error }))
  }

  render() {
    const { title, content, statusCode } = this.props
    if (statusCode) return <Error statusCode={statusCode} />
    return (
      <>
        <Nav />
        <section className="section">
          <div className="container">
            <h1 className="title">{title}</h1>
            <div
              className="content"
              onClick={this.htmlClick}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </section>
      </>
    )
  }
}
