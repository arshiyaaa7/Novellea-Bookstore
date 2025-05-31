# 📚 Novellea Bookstore - E-commerce Project

**"Stories wrapped in grace"**

Novellea is a book-selling e-commerce system built using a microservices architecture with Spring Boot. This project is under active development by an undergraduate student with a vision to create an Amazon-style virtual bookstore. The primary focus is on building the backend system using real-world architecture practices with RESTful microservices.

---

## 🧭 Roadmap (Beginner-Friendly Milestones)

### 🔧 Phase 0: Tooling & Setup
- Java 17+, Spring Boot, Maven, Git/GitHub, Docker
- PostgreSQL/MySQL, Postman, IntelliJ
- Understand monolith vs. microservices

### 🏗️ Phase 1: Architecture & Project Skeleton
- Setup services:
  - `discovery-server` (Eureka)
  - `config-server` (Spring Cloud Config)
  - `api-gateway`
  - `user-service`
  - `book-service`
  - `cart-service`
  - `order-service`
  - `payment-service`
  - `review-service`

### 👤 Phase 2: User Microservice (WIP)
- User registration/login (with BCrypt)
- CRUD, DTOs, Controllers, JPA

### 📚 Phase 3: Book Catalog
- Add/search/manage books
- JPA queries, pagination, filtering

### 🛒 Phase 5: Cart & Orders
- Add to cart, checkout, track orders
- Feign client or RestTemplate communication

### 💳 Phase 6: Payment & Review
- Dummy payments, add/view/delete reviews

### 🔐 Phase 7: Security (Planned)
- JWT Auth or Spring Security (Admin/User roles)

### 💻 Phase 8: Simple Frontend (Planned)
- Basic React or HTML/CSS for testing APIs

### 🚀 Phase 9: Deployment
- Dockerize services
- Docker Compose setup
- Optional cloud deployment (Render/Railway/EC2)

---

## 🛠️ Current Services
- `users/` → Basic CRUD and authentication (in progress)

---
## 📂 Project Structure (Monorepo)
will be updated later.
---

## 📌 Technologies & Tools
- Spring Boot, Spring Cloud, Spring Data JPA
- PostgreSQL, H2 (dev), Lombok, Feign, Docker
- GitHub Actions (planned), Swagger (planned)

---

## 🚧 Status
This project is a work in progress and will be developed incrementally as per the roadmap above. Each microservice will be independently deployable and dockerized.

---

## 🙋‍♀️ About
This repository is maintained by an undergraduate student building their first scalable, production-ready full stack system focused on backend.


