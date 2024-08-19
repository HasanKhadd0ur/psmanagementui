export interface Customer{
    id : number,
    customerName : string ,
    email : string ,
    address :{
        city : string ,
        streetNumber : number ,
        streetName : string 
    } 
    contactInfo :{
        contactValue :string,
        contactType :string
    }[]
}