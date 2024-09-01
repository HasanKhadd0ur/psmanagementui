export interface Attachment {
    id  : number 
    projectId :number 
    attachmentUrl :string 
    attachmentName :string
    attachmentDescription :string
}
export interface AttachmentFile {
    file : File
    attachmentName :string
    attachmentDescription :string
}
