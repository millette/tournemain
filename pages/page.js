// npm
import { Component } from "react"
import Error from "next/error"
import Router, { withRouter } from "next/router"
import fetch from "isomorphic-unfetch"

import "medium-draft/dist/basic.css"
import "medium-draft/dist/medium-draft.css"

// self
import { MyEditor, Nav } from "../components"
import { baseUrl } from "../utils"

class Page extends Component {
  constructor(props) {
    super(props)
    this.state = { undo: false, edit: false, path: false }

    this.edit = () => {
      const page = this.props.router.query.page || ""
      // console.log('EDIT this.props.router', page)
      Router.push(`/page?page=${page}&edit=true`, `/edit/${page}`, {
        shallow: true,
      })
    }

    // this.edit = () => this.setState({ edit: true })

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
          // console.log('SAVED this.props.router', this.props.router)
          const page = this.props.router.query.page || ""
          this.props.json.content = html
          if (!this.props.json.title) this.props.json.title = "Titre à venir"
          Router.push(`/page?page=${page}`, `/${page}`, { shallow: true })
          /*
          this.props.json.content = html
          this.props.json.title = "Titre à venir"
          delete this.props.json.statusCode
          this.setState({ edit: false })
          */
        })
        .catch(console.error)
    }

    this.cancelEdit = (ev) => {
      let { undo, path } = ev
      // console.log('CANCEL this.props.router', path)
      if (path !== undefined) {
        // console.log('WITH EV')
        this.setState({ edit: false })
      } else {
        // console.log('NO EV')
        const page = this.props.router.query.page || ""
        Router.push(`/page?page=${page}`, `/${page}`, { shallow: true })
      }
      /*
      if (undo === "" || typeof undo !== "string") {
        undo = false
        path = false
      }
      this.setState({ undo, path, edit: false })
      */
    }
  }

  static async getInitialProps(o) {
    const path = o.asPath.slice(1)
    return fetch(baseUrl(o.req, `api/page/${path}`))
      .then((res) => res.json())
      .then((json) => ({ json, path }))
  }

  componentDidUpdate(prevProps) {
    const { pathname, query } = this.props.router
    // console.log('prevProps:', prevProps)
    // console.log('this.props.router:', this.props.router)
    // verify props have changed to avoid an infinite loop
    const page = this.props.router.query.page || ""
    // console.log('DidUpdate this.props.router', page)

    if (
      prevProps.router.query.page === query.page &&
      prevProps.router.query.edit !== query.edit
    ) {
      // console.log('CHANGE', query.edit)
      this.setState({ edit: query.edit })
    }

    /*
    if (query.id !== prevProps.router.query.id) {
      // fetch data based on the new query
    }
    */
  }

  render() {
    const { json, path } = this.props

    if (json.statusCode === 404)
      return (
        <>
          <Nav />
          <section className="section">
            <div className="container">
              <h1 className="title">
                Titre à venir{" "}
                {this.state.edit ? null : (
                  <button className="button is-small" onClick={this.edit}>
                    edit
                  </button>
                )}
              </h1>
              <MyEditor
                saveHTML={this.saveHTML}
                cancelEdit={this.cancelEdit}
                edit={true}
                initialContent={""}
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

export default withRouter(Page)
