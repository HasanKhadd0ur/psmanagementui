# TracksController API Documentation

## Overview

The `TracksController` is responsible for managing and interacting with track entities within the system. It leverages the CQRS (Command Query Responsibility Segregation) pattern and MediatR to handle commands and queries related to track operations. The controller is designed to handle CRUD operations, including track creation, updates, completions, and removals, as well as managing steps and employees associated with tracks.

## Routes

### Base Route

All endpoints are prefixed with `/api/tracks`.

## Queries

### Get Track by ID

**`GET /api/tracks/{id}`**

Retrieves a track by its unique identifier.

**Parameters:**

- `id` (int): The unique identifier of the track.

**Responses:**

- `200 OK`: Returns a `TrackResponse` object if the track is found.
- `404 Not Found`: If the track with the specified ID does not exist.

---

### Get Steps of a Track

**`GET /api/tracks/GetStepsTrack/{id}`**

Fetches all steps associated with a specific track.

**Parameters:**

- `id` (int): The unique identifier of the track.

**Responses:**

- `200 OK`: Returns an array of `StepTrackResponse` objects.
- `404 Not Found`: If no steps are found for the specified track ID.

---

### Get Tracks by Filter

**`GET /api/tracks/ByFilter`**

Retrieves tracks that match specified filter criteria.

**Parameters:**

- Query parameters as defined in `GetTracksByFilterRequest`.

**Responses:**

- `200 OK`: Returns an array of `TrackResponse` objects.

---

### Get Uncompleted Tracks

**`GET /api/tracks/UnCompleted`**

Fetches all tracks that are not yet completed.

**Responses:**

- `200 OK`: Returns an array of `TrackResponse` objects.

---

### Get Employees Track

**`GET /api/tracks/GetEmployeesTrack/{id}`**

Retrieves all employees associated with a specific track.

**Parameters:**

- `id` (int): The unique identifier of the track.

**Responses:**

- `200 OK`: Returns an array of `EmployeeTrackResponse` objects.

---

### Get Tracks by Project

**`GET /api/tracks/GetTracksByProject`**

Retrieves tracks associated with a specific project.

**Parameters:**

- Query parameters as defined in `GetTracksByProjectRequest`.

**Responses:**

- `200 OK`: Returns an array of `TrackResponse` objects.

## Commands

### Add Step to Track

**`POST /api/tracks/AddStepTrack`**

Adds a new step to an existing track.

**Request Body:**

- `AddStepTrackRequest` object.

**Responses:**

- `200 OK`: Returns the ID of the newly added step.
- `400 Bad Request`: If the request is invalid.

---

### Update Step Track

**`PUT /api/tracks/UpdateStepTrack`**

Updates details of an existing step in a track.

**Request Body:**

- `UpdateStepTrackRequest` object.

**Responses:**

- `200 OK`: If the update is successful.
- `404 Not Found`: If the step to update does not exist.

---

### Add Employee to Track

**`POST /api/tracks/AddEmployeeTrack`**

Assigns a new employee to a track.

**Request Body:**

- `AddEmployeeTrackRequest` object.

**Responses:**

- `200 OK`: Returns the ID of the newly added employee track.
- `400 Bad Request`: If the request is invalid.

---

### Update Employee Work Track

**`PUT /api/tracks/UpdateEmployeeWorkTrack`**

Updates the work track details for an employee.

**Request Body:**

- `UpdateEmployeeWorkTrackRequest` object.

**Responses:**

- `200 OK`: If the update is successful.
- `404 Not Found`: If the employee track to update does not exist.

---

### Complete Track

**`POST /api/tracks/CompleteTrack`**

Marks a track as completed.

**Request Body:**

- `CompleteTrackRequest` object.

**Responses:**

- `200 OK`: If the track is successfully marked as completed.
- `404 Not Found`: If the track to complete does not exist.

---

### Remove Track

**`POST /api/tracks/RemoveTrack`**

Removes a track from the system.

**Request Body:**

- `RemoveTrackRequest` object.

**Responses:**

- `200 OK`: If the track is successfully removed.
- `404 Not Found`: If the track to remove does not exist.

---

### Create Track

**`POST /api/tracks`**

Creates a new track.

**Request Body:**

- `CreateTrackRequest` object.

**Responses:**

- `201 Created`: Returns the details of the newly created track.
- `400 Bad Request`: If the request is invalid.

---

## Summary

The `TracksController` provides a comprehensive API for managing tracks and their associated steps and employees. The use of MediatR facilitates command and query separation, ensuring a clean and maintainable architecture. The controller responds with appropriate HTTP status codes and leverages AutoMapper for efficient mapping between request/response models and domain models.

