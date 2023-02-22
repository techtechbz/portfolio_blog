export class MessageSummary {
  private readonly messageSummary: {[key: string]: string} = {
    "defect": "誤記・不具合の報告",
    "scout": "お仕事のご依頼",
    "other": "その他"
  }

  get messageSummaryKeys() {
    return Object.keys(this.messageSummary)
  }
  
  get messageSummaryList() {
    return Object.entries(this.messageSummary)
  }
}