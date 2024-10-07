import {strict as assert} from 'assert'
import test from 'node:test'
import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import {unified} from 'unified'
import rehypeKatexNoTranslate from '../src/index.js'

const processHtml = async (html: string) => {
  const file = await unified()
    .use(rehypeParse, {fragment: true})
    .use(rehypeKatexNoTranslate)
    .use(rehypeStringify)
    .process(html)
  return String(file)
}

test('should add translate="no" to span with class "katex"', async (t) => {
  const inputHtml = '<span class="katex">E=mc^2</span>'
  const expectedHtml = '<span class="katex" translate="no">E=mc^2</span>'

  const outputHtml = await processHtml(inputHtml)
  assert.equal(outputHtml, expectedHtml)
})

test('should add translate="no" to span with class "katex-display"', async (t) => {
  const inputHtml = '<span class="katex-display">E=mc^2</span>'
  const expectedHtml =
    '<span class="katex-display" translate="no">E=mc^2</span>'

  const outputHtml = await processHtml(inputHtml)
  assert.equal(outputHtml, expectedHtml)
})

test('should not modify span without class "katex" or "katex-display"', async (t) => {
  const inputHtml = '<span class="not-katex">E=mc^2</span>'
  const expectedHtml = '<span class="not-katex">E=mc^2</span>'

  const outputHtml = await processHtml(inputHtml)
  assert.equal(outputHtml, expectedHtml)
})

test('should not modify elements other than span', async (t) => {
  const inputHtml = '<div class="katex">E=mc^2</div>'
  const expectedHtml = '<div class="katex">E=mc^2</div>'

  const outputHtml = await processHtml(inputHtml)
  assert.equal(outputHtml, expectedHtml)
})

test('should add translate="no" to multiple spans with class "katex" and "katex-display"', async (t) => {
  const inputHtml =
    '<span class="katex">E=mc^2</span><span class="katex-display">a^2 + b^2 = c^2</span>'
  const expectedHtml =
    '<span class="katex" translate="no">E=mc^2</span><span class="katex-display" translate="no">a^2 + b^2 = c^2</span>'

  const outputHtml = await processHtml(inputHtml)
  assert.equal(outputHtml, expectedHtml)
})

test('should add translate="no" when span has multiple classes including "katex"', async (t) => {
  const inputHtml = '<span class="foo bar katex">E=mc^2</span>'
  const expectedHtml =
    '<span class="foo bar katex" translate="no">E=mc^2</span>'

  const outputHtml = await processHtml(inputHtml)
  assert.equal(outputHtml, expectedHtml)
})

test('should not modify span with no class attribute', async (t) => {
  const inputHtml = '<span>E=mc^2</span>'
  const expectedHtml = '<span>E=mc^2</span>'

  const outputHtml = await processHtml(inputHtml)
  assert.equal(outputHtml, expectedHtml)
})

test('should not modify non-span elements with katex class', async (t) => {
  const inputHtml = '<div class="katex">E=mc^2</div>'
  const expectedHtml = '<div class="katex">E=mc^2</div>'

  const outputHtml = await processHtml(inputHtml)
  assert.equal(outputHtml, expectedHtml)
})
