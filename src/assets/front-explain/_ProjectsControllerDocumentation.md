# ProjectsController Documentation

## Overview

`ProjectsController` is an API controller in the `PSManagement.Presentation.Controllers.Projects` namespace. This controller is responsible for managing and interacting with project-related functionalities through various endpoints. It leverages the MediatR library for handling commands and queries and uses AutoMapper for object mapping. The controller also integrates with the `ICurrentUserProvider` to access user-specific information for certain operations.

## Routes and Methods

### Queries

1. **Get All Projects**
   - **Endpoint:** `GET /api/projects`
   - **Description:** Retrieves a list of all projects based on provided filters.
   - **Parameters:** 
     - `ListAllProjectsRequest` - Query parameters to filter the list of projects.
   - **Returns:** `IActionResult` - A list of `ProjectDetailsResponse` objects.

2. **Get Project By ID**
   - **Endpoint:** `GET /api/projects/{id}`
   - **Description:** Retrieves details of a specific project by its ID.
   - **Parameters:**
     - `id` - The unique identifier of the project.
   - **Returns:** `IActionResult` - `ProjectResponse` object.

3. **Get Project Completion**
   - **Endpoint:** `GET /api/projects/Completion/{id}`
   - **Description:** Retrieves the completion status of a project by its ID.
   - **Parameters:**
     - `id` - The unique identifier of the project.
   - **Returns:** `IActionResult` - `ProjectCompletionResponse` object.

4. **Get Participation Change History**
   - **Endpoint:** `GET /api/projects/ParticipationChangeHistory/{id}`
   - **Description:** Retrieves the history of participation changes for a project.
   - **Parameters:**
     - `id` - The unique identifier of the project.
   - **Returns:** `IActionResult` - A list of `ParticipationChange` objects.

5. **Get Projects By Filter**
   - **Endpoint:** `GET /api/projects/ByFilter`
   - **Description:** Retrieves projects based on specified filters.
   - **Parameters:**
     - `GetProjectsByFilterRequest` - Query parameters for filtering projects.
   - **Returns:** `IActionResult` - A list of `ProjectDetailsResponse` objects.

6. **Get Projects By Project Manager**
   - **Endpoint:** `GET /api/projects/ByProjectManager`
   - **Description:** Retrieves projects managed by a specific project manager.
   - **Parameters:**
     - `GetProjectsByProjectManagerRequest` - Query parameters for filtering projects by project manager.
   - **Returns:** `IActionResult` - A list of `ProjectDetailsResponse` objects.

### Project Management

1. **Change Team Leader**
   - **Endpoint:** `PUT /api/projects/ChangeTeamLeader`
   - **Description:** Updates the team leader for a specific project.
   - **Parameters:**
     - `ChangeProjectTeamLeaderRequest` - Request body containing the new team leader details.
   - **Returns:** `IActionResult` - Result of the operation.

2. **Change Project Manager**
   - **Endpoint:** `PUT /api/projects/ChangeProjectManager`
   - **Description:** Updates the project manager for a specific project.
   - **Parameters:**
     - `ChangeProjectManagerRequest` - Request body containing the new project manager details.
   - **Returns:** `IActionResult` - Result of the operation.

### Step Management

1. **Add Project Step**
   - **Endpoint:** `POST /api/projects/AddProjectStep`
   - **Description:** Adds a new step to a project.
   - **Parameters:**
     - `AddProjectStepRequest` - Request body containing the step details.
   - **Returns:** `IActionResult` - Result of the operation.

### Project State Operations

1. **Approve Project**
   - **Endpoint:** `POST /api/projects/ApproveProject`
   - **Description:** Approves a project.
   - **Parameters:**
     - `ApproveProjectRequest` - Request body containing the project approval details.
   - **Returns:** `IActionResult` - Result of the operation.

2. **Cancel Project**
   - **Endpoint:** `POST /api/projects/CancelProject/{id}`
   - **Description:** Cancels a project by its ID.
   - **Parameters:**
     - `id` - The unique identifier of the project.
   - **Returns:** `IActionResult` - Result of the operation.

3. **Complete Project**
   - **Endpoint:** `POST /api/projects/CompleteProject`
   - **Description:** Marks a project as complete.
   - **Parameters:**
     - `CompleteProjectRequest` - Request body containing the project completion details.
   - **Returns:** `IActionResult` - Result of the operation.

### Participation Management

1. **Get Completion Contributions**
   - **Endpoint:** `GET /api/projects/CompletionContributions/{id}`
   - **Description:** Retrieves the contribution of employees towards the completion of a project.
   - **Parameters:**
     - `id` - The unique identifier of the project.
   - **Returns:** `IActionResult` - A list of `EmployeeContributionResponse` objects.

2. **Get Participants**
   - **Endpoint:** `GET /api/projects/GetParticipants/{id}`
   - **Description:** Retrieves the list of participants in a project.
   - **Parameters:**
     - `id` - The unique identifier of the project.
   - **Returns:** `IActionResult` - A list of `EmployeeParticipateResponse` objects.

3. **Add Participant**
   - **Endpoint:** `POST /api/projects/AddParticipant`
   - **Description:** Adds a participant to a project.
   - **Parameters:**
     - `AddParticipantRequest` - Request body containing the participant details.
   - **Returns:** `IActionResult` - Result of the operation.

4. **Remove Participant**
   - **Endpoint:** `POST /api/projects/RemoveParticipant`
   - **Description:** Removes a participant from a project.
   - **Parameters:**
     - `RemoveParticipantRequest` - Request body containing the participant details.
   - **Returns:** `IActionResult` - Result of the operation.

5. **Change Participation**
   - **Endpoint:** `POST /api/projects/ChangeParticipation`
   - **Description:** Changes the participation details of an employee in a project.
   - **Parameters:**
     - `ChangeEmployeeParticipationRequest` - Request body containing the updated participation details.
   - **Returns:** `IActionResult` - Result of the operation.

### Propose

1. **Create Project**
   - **Endpoint:** `POST /api/projects`
   - **Description:** Proposes and creates a new project.
   - **Parameters:**
     - `CreateProjectRequest` - Request body containing the project details.
   - **Returns:** `IActionResult` - The created `ProjectDetailsResponse` object if successful.

### Attachments Management

1. **Add Attachment**
   - **Endpoint:** `POST /api/projects/AddAttachment`
   - **Description:** Adds an attachment to a project.
   - **Parameters:**
     - `AddAttachmentRequest` - Request body containing the attachment details.
   - **Returns:** `IActionResult` - Result of the operation.

2. **Remove Attachment**
   - **Endpoint:** `POST /api/projects/RemoveAttachment`
   - **Description:** Removes an attachment from a project.
   - **Parameters:**
     - `RemoveAttachmentRequest` - Request body containing the attachment details.
   - **Returns:** `IActionResult` - Result of the operation.

3. **Get Attachments**
   - **Endpoint:** `GET /api/projects/Attachments`
   - **Description:** Retrieves a list of attachments for a project.
   - **Parameters:**
     - `GetProjectAttachmentsRequest` - Query parameters to filter attachments.
   - **Returns:** `IActionResult` - A list of `AttachmentResponse` objects.

4. **Get File By URL**
   - **Endpoint:** `GET /api/projects/Attachment`
   - **Description:** Retrieves a specific attachment by its URL.
   - **Parameters:**
     - `GetFileByUrlRequest` - Query parameters containing the URL of the file.
   - **Returns:** `IActionResult` - `FileAttachmentResponse` object.

## Dependencies

- **IMediator**: For sending commands and queries.
- **IMapper**: For mapping between request/response DTOs and domain models.
- **ICurrentUserProvider**: For accessing the current user's information.

## Authorization

Some endpoints are restricted to users with specific roles, such as `RolesNames.SCIENTIFIC_DEPUTY`. Ensure proper authorization is implemented to restrict access as needed.

## Error Handling

The controller uses a `HandleResult` method to standardize error handling and result processing, ensuring consistent response formatting across the API.