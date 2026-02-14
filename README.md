$#$#$# Secure Role-Based REST API System

Backend Developer Internship Assignment
Designed a secure, scalable backend system with authentication, role-based access, and frontend integration.

📌 Project Overview

This project is a secure and scalable REST API system that supports:

User Registration & Login

JWT-based Authentication

Role-Based Access Control (USER / ADMIN)

CRUD Operations on Secondary Entity (Tasks/Notes)

API Versioning

Validation & Global Error Handling

Swagger API Documentation

PostgreSQL Database Integration

Basic React Frontend UI

Dockerized Deployment

🏗️ High-Level Architecture
                ┌──────────────────────┐
                │      React UI        │
                │ (Login / Dashboard)  │
                └──────────┬───────────┘
                           │ HTTP (JWT)
                           ▼
                ┌──────────────────────┐
                │   Spring Security    │
                │   JWT Filter Layer   │
                └──────────┬───────────┘
                           ▼
                ┌──────────────────────┐
                │    Controller Layer  │
                └──────────┬───────────┘
                           ▼
                ┌──────────────────────┐
                │     Service Layer    │
                │  (Business Logic)    │
                └──────────┬───────────┘
                           ▼
                ┌──────────────────────┐
                │   Repository Layer   │
                │ (JPA / Hibernate)    │
                └──────────┬───────────┘
                           ▼
                ┌──────────────────────┐
                │   PostgreSQL DB      │
                └──────────────────────┘

🔐 Authentication Flow
1. User registers → Password hashed (BCrypt)
2. User logs in → JWT token generated
3. Token returned to frontend
4. Frontend sends token in Authorization header
5. JWT filter validates token
6. Access granted to protected endpoints

👥 Role-Based Access

Roles implemented:

USER → Can manage own records

ADMIN → Can manage all users & records

Example:

@PreAuthorize("hasRole('ADMIN')")


Ensures endpoint-level authorization.

🗄️ Database Schema
User Table
id (PK)
name
email (unique)
password (hashed)
role
created_at

Task / Entity Table
id (PK)
title
description
status
user_id (FK)
created_at


Relationship:

User (1) ─────── (Many) Task

🧱 Backend Features

RESTful API design

Proper HTTP status codes

DTO-based validation (@NotBlank, @Email, @Size)

Global exception handling

API versioning (/api/v1/)

Clean layered architecture

Secure JWT token validation

Password hashing (BCrypt)

Modular scalable structure

🌐 Frontend Features

Register/Login UI

Protected Dashboard

CRUD interface

API error/success message display

JWT token storage & header attachment


Scalability readiness

📊 Scalability Notes

Future Improvements:

Redis caching for faster reads

Load balancing (NGINX)

Microservices architecture

CI/CD pipeline

Horizontal scaling via containers

Centralized logging (ELK stack)

📘 API Documentation

Swagger UI available at:

/swagger-ui.html


Postman collection included

🎯 Evaluation Alignment

✔ REST principles
✔ Secure authentication
✔ Role-based access control
✔ Clean database schema
✔ Modular scalable structure
✔ Frontend integration
✔ Docker deployment readiness

💼 What This Demonstrates

This project showcases:

Secure backend engineering

Production-level authentication design

Database modeling

Scalable architecture thinking

Frontend-backend integration

Deployment readiness
