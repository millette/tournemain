// npm
import { Component } from "react"
import Error from "next/error"
import Router from "next/router"
import "isomorphic-unfetch"

// self
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
        ev.target.pathname
      )
    }
  }

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
