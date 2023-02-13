import { UnexpectedBehaviorError } from "@/lib/error/unexpectedBehaviorError"
import { PageContent } from "@/lib/posts/valueObjects/postContents/pageContent"


describe('Page content class test', () => {
  it.each([
    {testTag: 'planeMd', state: 'planeMd', content: "# title", isError: false},
    {testTag: 'html', state: 'html', content: "<h1>title</h1>", isError: false},
    {testTag: 'invalid state', state: 'htm', content: "<h1>title</h1>", isError: true},
    {testTag: 'empty', state: 'empty', content: "<h1>title</h1>", isError: true},
  ])('Construct page content class test ($testTag)', ({testTag, state, content, isError}) => {
    const defineMdFileClass = () => new PageContent(state, content)
    if (isError) {
      expect(defineMdFileClass).toThrowError(UnexpectedBehaviorError)
    } else {
      expect(defineMdFileClass).not.toThrow()
    }
  })
  
  it.each([
    {state: 'planeMd', content: "# title", converted: false},
    {state: 'html', content: "<h1>title</h1>", converted: true},
  ])('Handle page content test ($state)', ({state, content, converted}) => {
    const pageContent = new PageContent(state, content)
    const fetchPlainMdContent = () => pageContent.plainMdContent
    const fetchHtmlContent = () => pageContent.htmlContent
    expect(pageContent.isConvertedHtml).toBe(converted)
    if (converted) {
      expect(fetchPlainMdContent).toThrowError(UnexpectedBehaviorError)
      expect(fetchHtmlContent).not.toThrowError(UnexpectedBehaviorError)
    } else {
      expect(fetchPlainMdContent).not.toThrowError(UnexpectedBehaviorError)
      expect(fetchHtmlContent).toThrowError(UnexpectedBehaviorError)
    }
  })

  
})