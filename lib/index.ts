import {Root} from 'hast'
import {Plugin} from 'unified'
import {visit} from 'unist-util-visit'

const rehypeKatexNoTranslate: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'span') return
      const className = node.properties?.className
      if (!className) return
      if (
        Array.isArray(className) &&
        (className.includes('katex-display') || className.includes('katex'))
      ) {
        node.properties.translate = 'no'
      }
    })
  }
}

export default rehypeKatexNoTranslate
