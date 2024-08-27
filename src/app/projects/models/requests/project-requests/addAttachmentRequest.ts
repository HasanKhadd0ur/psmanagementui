export interface AddAttachmentRequest {
    projectId: number;
    attachmentDescription: string;
    attachmentName: string;
    file: File |null;
}
