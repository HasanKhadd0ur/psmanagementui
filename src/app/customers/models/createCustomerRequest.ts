export interface  CreateCustomerRequest{
    customerName : string ,
    email : string ,
    address : {
        city : string ,
        streetName : string ,
        streetNumber:number 
    }
}