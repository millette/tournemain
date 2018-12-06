// npm
import Link from "next/link"

// self
import { External } from "../components"

export default () => (
  <section className="section">
    <div className="container">
      <h1 className="title">À propos</h1>
      <Link href="/page" as="/">
        <a>Home</a>
      </Link>
      <div className="content">
        <p>
          Le{" "}
          <External href="https://github.com/millette/tournemain">
            code source de Tournemain
          </External>{" "}
          est disponible sur GitHub.
        </p>
        <p>Le projet repose sur plusieurs logiciels libres dont:</p>
        <ul>
          <li>
            Application
            <ul>
              <li>
                <External href="https://www.fastify.io/">fastify</External>
              </li>
              <li>
                <External href="https://nextjs.org/">Next.js</External>
              </li>
              <li>
                <External href="https://bulma.io/">Bulma</External>
              </li>
              <li>
                <External href="https://reactjs.org/">React</External>
              </li>
              <li>
                <External href="https://draftjs.org/">Draft.js</External>
              </li>
            </ul>
          </li>
          <li>
            <i>Build</i>
            <ul>
              <li>
                <External href="https://webpack.js.org/">webpack</External>
              </li>
              <li>
                <External href="https://prettier.io/">Prettier</External>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </section>
)
