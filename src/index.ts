import type {Element, Node, Root} from 'hast'
import {selectAll} from 'hast-util-select'
import type {Plugin} from 'unified'

const rehypeKatexNoTranslate: Plugin = () => {
  return (tree: Node) => {
    if ((tree as Root).children) {
      const root = tree as Root
      const katexNodes = selectAll('span.katex', root) as Element[]
      katexNodes.forEach((node: Element) => {
        node.properties.translate = 'no'
      })
    }
  }
}

export default rehypeKatexNoTranslate
