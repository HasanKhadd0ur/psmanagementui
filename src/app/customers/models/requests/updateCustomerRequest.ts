export class UpdateCustomerRequest{
    customerId: number 
    customerName : string 
    address : {
        city : string ,
        streetNumber : number ,
        streetName : string 
    }
    email :string 
}