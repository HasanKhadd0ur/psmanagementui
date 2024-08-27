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
export class   AddContactInfoRequest{
    customerId :number
    contactType :string 
    contactValue :string 
}

export class RemoveContactInfoRequest{
    id :number 
    customerId :number  
}