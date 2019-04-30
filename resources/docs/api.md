# Api description

- [Api description](#api-description)
  - [Auth](#auth)
      - [**POST** /verification-code](#post-verification-code)
      - [**POST** /verification-code/notify](#post-verification-codenotify)
      - [**POST** /verification-code/verify](#post-verification-codeverify)

The service was created in base an HTTP Api Rest, but in this case I had to format the service as verbs because isn't fit as CRUD resource.

## Auth

I manage the service as micro service, that depends of an singed user. Commonly this kind of services accept a x-auth header (Or a bearer for OAuth2). 

In this case, this system is simulated and you must to add a header "x-auth" with any string to be "logged" as user with that **userId**, this helps to simulate different users.

#### **POST** /verification-code

Creates a verification code for the current user

| Name        | Required | Description                   | Place | example      |
| ----------- | -------- | ----------------------------- | ----- | ------------ |
| phoneNumber | Yes      | Real or possible phone number | body  | "3314291803" |

**Responses**
**201**: verificationCode created\
**401**: x-auth header is not set\
**400**: phoneNumber is invalid

#### **POST** /verification-code/notify

Resend the verification code for the current user

> Params no required

**Responses**
**200**: verificationCode created correctly and sended\
**401**: x-auth header is not set\
**400**: verificationCode is invalid\
**404**: The user actually doesn't have a verificationCode

#### **POST** /verification-code/verify

Resend the verification code for the current user

| Name             | Required | Description                | Place | example |
| ---------------- | -------- | -------------------------- | ----- | ------- |
| verificationCode | Yes      | 4 digits verification code | body  | 1234    |

**Responses**\
**200**: verificationCode is valid for the current user and exist\
**401**: x-auth header is not set\
**400**: verificationCode is invalid\
**404**: The verification code doesn't exist