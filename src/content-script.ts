const ELEMENT_HEIGHT = 30 // 要素の高さ
const ELEMENT_MARGIN = 10 // 主要素と他の要素の間の間隔
const POPUP_TIME = 3000 // ポップアップの表示時間

let markdownElement: HTMLElement
let blobElement: HTMLElement
let elementsVisible = false

// 最終的にコピーするURLとテキスト
let url = window.location.href
let copyContentText = ''

function showPopup(message: string) {
  const popup = document.createElement('div')
  popup.innerText = message
  popup.style.position = 'fixed'
  popup.style.bottom = '20px'
  popup.style.right = 'auto'
  popup.style.left = '20px'
  popup.style.padding = '10px'
  popup.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
  popup.style.color = 'white'
  popup.style.borderRadius = '5px'
  popup.style.zIndex = '1006'

  document.body.appendChild(popup)
  setTimeout(() => {
    popup.remove()
  }, POPUP_TIME)
}

function prepareContents() {
  // MRタイトルの取得
  const mrSubject: HTMLCollectionOf<Element> = document.getElementsByClassName('gl-heading-1')

  if (!mrSubject[0].textContent) {
    copyContentText = 'MRタイトルが不明です'
    return
  }

  if (mrSubject.length > 0) {
    for (let i = 0; i < mrSubject.length; i++) {
      copyContentText += mrSubject[0].textContent.trim()
    }
    copyContentText = 'GitLab | ' + copyContentText
  }
}

function createClickableElement(text: string, func: () => void, bottom: number) {
  const element = document.createElement('div')
  element.innerText = text
  element.style.position = 'fixed'
  element.style.right = '20px'
  element.style.bottom = `${bottom}px`
  element.style.width = '65px'
  element.style.height = `${ELEMENT_HEIGHT}px`
  element.style.lineHeight = `${ELEMENT_HEIGHT}px`
  element.style.cursor = 'pointer'
  element.style.transition = 'all 0.3s ease'
  element.style.fontSize = '10px'
  element.style.textAlign = 'center'
  element.style.borderBottom = '1px solid #2980b9'
  element.style.boxSizing = 'border-box'
  element.style.zIndex = '1006'
  element.style.userSelect = 'none'

  element.addEventListener('click', func, false)

  return element
}

const copyMarkdownUrl = () => {
  const markdown = `[${copyContentText}](${url})`
  navigator.clipboard
    .writeText(markdown)
    .then(() => showPopup('Markdown link copied to clipboard:\n' + markdown))
    .catch(() => showPopup('copy failed...'))
}

const copyBlobUrl = () => {
  const blobObj = {
    'text/html': new Blob([`<a href="${url}">${copyContentText}</a>`], {
      type: 'text/html',
    }),
  }

  navigator.clipboard
    .write([new ClipboardItem(blobObj)])
    .then(() => showPopup('copy success!'))
    .catch(() => showPopup('failed...'))
}

const toggleElements = () => {
  if (!markdownElement) {
    markdownElement = createClickableElement(
      'as Markdown',
      copyMarkdownUrl,
      ELEMENT_HEIGHT * 2 + ELEMENT_MARGIN,
    )
  }

  if (!blobElement) {
    blobElement = createClickableElement('as Blob', copyBlobUrl, ELEMENT_HEIGHT + ELEMENT_MARGIN)
  }

  if (elementsVisible) {
    document.body.removeChild(markdownElement)
    document.body.removeChild(blobElement)
    elementsVisible = false
  } else {
    document.body.appendChild(markdownElement)
    document.body.appendChild(blobElement)
    elementsVisible = true
  }
}

// main
prepareContents()
const mainElement = createClickableElement('Copy URL', toggleElements, ELEMENT_MARGIN)
document.body.appendChild(mainElement)
