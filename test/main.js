// npm
import test from "ava"

// self
import withPage from "./helpers/_with-page"
import srv from ".."

// FIXME: we can only have one test
//        since nextjs builds throws everything in .next
test("el test#1", withPage, async (t, page) => {
  const docs = {
    db: [
      [
        "",
        {
          _id: "",
          title: "Tournemain",
          content: '<p>bla bla <a data-type="page" href="/p2">Page 2</a></p>',
          _rev: "0-dSf4VkAST4suKo6B0emBsg",
          _created: 1545177746441,
          _updated: 1545177746441,
        },
      ],
      [
        "p2",
        {
          _id: "p2",
          title: "Tournemain - Page 2",
          content:
            '<h2>boop</h2><p>bla bla <a data-type="page" href="/">Home</a></p>',
          _rev: "0-abc4VkAST4suKo6B0emBsg",
          _created: 1545177646441,
          _updated: 1545177646441,
        },
      ],
    ],
    history: [["", []], ["p2", []]],
  }

  const addr = await srv({ docs })
  await page.goto(`${addr}/other`)

  const abc = await page.$("section.section666")
  t.falsy(abc)

  const abc2 = await page.$("section.section")
  t.truthy(abc2)

  const abc2href = await page.$$("a")
  t.truthy(abc2href)
  t.is(abc2href.length, 1)

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
