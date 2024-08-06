export interface Result <T>{
    isSuccess :boolean
    isFailed :boolean
    value :any
    errors : string[]
    reasons: string[]
    valueOrDefault:any
    successes: any[]
    
}