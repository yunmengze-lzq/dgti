# OPC Backend Contract Draft

## Auth

- `POST /api/auth/sms/send`
  - Body: `{ "phone": "13800000000" }`
  - Returns: `{ "requestId": "sms_..." }`
- `POST /api/auth/sms/verify`
  - Body: `{ "phone": "...", "code": "123456", "requestId": "sms_..." }`
  - Returns: `{ "token": "...", "profile": { "id": "...", "role": "participant" } }`

## Applications

- `GET /api/applications/me`
  - Returns the participant's draft or submitted application.
- `POST /api/applications`
  - Creates a draft and returns an application id.
- `PATCH /api/applications/:id`
  - Updates account, entity, project, track, or contact fields.
- `POST /api/applications/:id/submit`
  - Locks the current version and generates the registration number.
- `GET /api/admin/applications`
  - Query: `status`, `track`, `keyword`, `page`, `pageSize`.
- `PATCH /api/admin/applications/:id/review`
  - Body: `{ "action": "approve" | "return", "comment": "..." }`

## Materials

- `POST /api/materials/upload-token`
  - Body: `{ "applicationId": "...", "materialType": "project_plan", "filename": "plan.pdf" }`
  - Returns OSS upload policy and final object key.
- `POST /api/materials/complete`
  - Marks an uploaded object as attached to an application.
- `DELETE /api/materials/:id`
  - Removes a draft material before final submission.

## Notifications

- `POST /api/notifications/application-submitted`
  - Internal endpoint for SMS/email confirmation.
- `POST /api/notifications/review-result`
  - Internal endpoint for approve/return notifications.

## Audit

- `GET /api/admin/audit-logs`
  - Query: `operator`, `applicationId`, `dateRange`.
- Every admin review action should write: operator id, action, before status, after status, comment, timestamp, and IP.
