export interface Customer{
    id : number,
    customerName : string ,
    email : string ,
    address :{
        city : string ,
        streetNumber : number ,
        streetName : string 
    } 
    contactInfo :ContactInfo[]
}
export class ContactInfo {
    id :number 
    contactValue :string 
    contactType :string   

}