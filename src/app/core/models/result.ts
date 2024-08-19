export interface Result <T>{
    isSuccess :boolean
    isFailed :boolean
    value :T
    errors : string[]
    validationErrors :{
            identifier: any,
            errorMessage: string,
            errorCode: string,
            severity:number
    }[]
    
}