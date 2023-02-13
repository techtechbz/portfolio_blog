import { PostDataValidator } from "@/lib/posts/dataHandler/postDataValidator"


const postDataValidator = new PostDataValidator()

describe('Post Data Validator test', () => {
  it.each([
    {id: 'math/ai-formula', expected: true},
    {id: 'stat/fundamental', expected: true},
    {id: 'fixed/site-introduction', expected: true},
    {id: 'mat/ai-formula', expected: false},
    {id: 'math/ai-formul', expected: false},
    {id: '/math/ai-formula', expected: false},
    {id: 'math/ai-formula.', expected: false},
    {id: 'test/ai-formula', expected: false},
    {id: undefined, expected: false},
  ])('Post id validator test ($id)', ({id, expected}) => {
    const validator = () => postDataValidator.postIdValidator(id)
    if (expected) {
      expect(validator).not.toThrow()
    } else {
      expect(validator).toThrow()
    }
  })

  it.each([
    {text: 'テスト', expected: true},
    {text: 1, expected: false},
    {text: undefined, expected: false},
  ])('String type validator test ($text)', ({text, expected}) => {
    const validator = () => postDataValidator.stringTypeValidator("test", text)
    if (expected) {
      expect(validator).not.toThrow()
    } else {
      expect(validator).toThrow()
    }
  })

  it.each([
    {date: '2023-1-2', expected: true},
    {date: '2023-01-02', expected: true},
    {date: '"2023-01-02"', expected: true},
    {date: '2021-12-31', expected: false},
    {date: '2022-01-01', expected: true},
    {date: '2099-12-31', expected: true},
    {date: '2100-01-01', expected: false},
    {date: '2023-13-01', expected: false},
    {date: '2023-2-29', expected: false},
    {date: '2024-2-29', expected: true},
    {date: 20230102, expected: false},
    {date: undefined, expected: false},
  ])('Post date validator test ($date)', ({date, expected}) => {
    const validator = () => {
      postDataValidator.postDateValidator(date)
    }
    if (expected) {
      expect(validator).not.toThrow()
    } else {
      expect(validator).toThrow()
    }
  })

  it.each([
    {file: 'equation.jpg', expected: true},
    {file: 'equation.png', expected: false},
    {file: 'equatio.jpg', expected: false},
    {file: 'profile.svg', expected: false},
  ])('Post eyecatch file validator test ($file)', ({file, expected}) => {
    const validator = () => postDataValidator.eyecatchFileValidator(file)
    if (expected) {
      expect(validator).not.toThrow()
    } else {
      expect(validator).toThrow()
    }
  })
  
  it.each([
    {idList: ["math/ai-formula", "stat/fundamental"], expected: true},
    {idList: [], expected: true},
    {idList: ["math/ai-formula", "stat/fundamenta"], expected: false},
    {idList: "math/ai-formula", expected: false},
    {idList: undefined, expected: false},
  ])('Post id list validator test ($idList)', ({idList, expected}) => {
    const validator = () => postDataValidator.postsIdsListValidator(idList)
    if (expected) {
      expect(validator).not.toThrow()
    } else {
      expect(validator).toThrow()
    }
  })

  it.each([
    {overviews: {id: "math/ai-formula", title: "テスト", description: "テスト", date: "2022-1-3", eyecatchFile: 'blackboard.jpg', relatedPostsIds: []},
     expected: true},
    {overviews: {title: "テスト", description: "テスト", date: "2022-1-3", eyecatchFile: 'blackboard.jpg', relatedPostsIds: []},
     expected: false},
    {overviews: {id: "math/ai-formula", description: "テスト", date: "2022-1-3", eyecatchFile: 'blackboard.jpg', relatedPostsIds: []},
     expected: false},
    {overviews: {id: "math/ai-formula", title: "テスト", date: "2022-1-3", eyecatchFile: 'blackboard.jpg', relatedPostsIds: []},
     expected: false},
    {overviews: {id: "math/ai-formula", title: "テスト", description: "テスト", date: "2022-1-3", relatedPostsIds: []},
     expected: false},
    {overviews: {id: "math/ai-formula", title: "テスト", description: "テスト", date: "2022-1-3", eyecatchFile: 'blackboard.jpg'},
     expected: false},
    {overviews: {id: "math/ai-formula", title: "テスト", description: "テスト", date: "2022-1-3", eyecatchFile: 'blackboard.jpg', relatedPostsIds: ["math/ai-formul"]},
     expected: false},
  ])('Post matter result overviews validator test ($overviews)', ({overviews, expected}) => {
    const validator = () => postDataValidator.postMatterResultOverviewsValidator(overviews)
    if (expected) {
      expect(validator).not.toThrow()
    } else {
      expect(validator).toThrow()
    }
  })
  
  it.each([
    {data: {id: "math/ai-formula", title: "テスト", description: "テスト", date: "2022-1-3", eyecatchFile: 'blackboard.jpg', relatedPostsIds: [], contentHtml: "<div>テスト</div>"},
     expected: true},
    {data: {id: "math/ai-formula", title: "テスト", description: "テスト", date: "2022-1-3", eyecatchFile: 'blackboard.jpg', relatedPostsIds: []},
     expected: false},
    {data: {id: "math/ai-formula", title: "テスト", description: "テスト", date: "2022-1-3", relatedPostsIds: [], contentHtml: "<div>テスト</div>"},
     expected: false},
    {data: {id: "math/ai-formula", title: "テスト", description: "テスト", date: "2022-1-3", eyecatchFile: 'blackboard.jpg', relatedPostsIds: ["math/ai-formul"], contentHtml: "<div>テスト</div>"},
     expected: false},
  ])('Post page data validator test ($data)', ({data, expected}) => {
    const validator = () => postDataValidator.postPageDataValidator(data)
    if (expected) {
      expect(validator).not.toThrow()
    } else {
      expect(validator).toThrow()
    }
  })

  it.each([
    {data: {createDate: "2023-1-1"},
     expected: true},
     {data: {createDate: "2023-1-1", updateDate: "2023-3-3"},
     expected: true},
     {data: {},
     expected: true},
     {data: {createDate: "2021-12-31"},
      expected: false},
    {data: {updateDate: "2023-1-1"},
     expected: false},
    {data: {createDate: "2023-1-2", updateDate: "2023-1-1"},
     expected: false},
  ])('Fixed page matter result overviews validator test ($data)', ({data, expected}) => {
    const validator = () => postDataValidator.fixedPageMatterResultOverviewsValidator(data)
    if (expected) {
      expect(validator).not.toThrow()
    } else {
      expect(validator).toThrow()
    }
  })

  it.each([
    {data: {contentHtml: "<div>テスト</div>"},
     expected: true},
    {data: {createDate: "2023-1-1", contentHtml: "<div>テスト</div>"},
     expected: true},
    {data: {},
     expected: false},
  ])('Fixed page data validator test ($data)', ({data, expected}) => {
    const validator = () => postDataValidator.fixedPageDataValidator(data)
    if (expected) {
      expect(validator).not.toThrow()
    } else {
      expect(validator).toThrow()
    }
  })
})