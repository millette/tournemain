// npm
import test from "ava"

// self
import withPage from "./helpers/with-page"
import srv from ".."

// FIXME: we can only have one test
//        since nextjs builds throws everything in .next
test("el test#1", withPage, async (t, page) => {
  const pages = {
    "": {
      title: "Tournemain",
      content: '<p>bla bla <a href="/p2">Page 2</a></p>',
    },
    p2: {
      title: "Tournemain - Page 2",
      content: '<h2>boop</h2><p>bla bla <a href="/">Home</a></p>',
    },
  }

  const addr = await srv(pages)
  await page.goto(`${addr}/other`)

  const abc = await page.$("section.section666")
  t.falsy(abc)

  const abc2 = await page.$("section.section")
  t.truthy(abc2)

  await Promise.all([page.waitForNavigation(), page.click("a")])

  const abc3 = await page.$("section.section")
  t.truthy(abc3)

  await Promise.all([
    page.waitForNavigation(),
    page.click('.content a[href="/p2"]'),
  ])

  const fff = await page.$("h2")
  t.truthy(fff)

  const fff2 = await page.$("h3")
  t.falsy(fff2)
})
