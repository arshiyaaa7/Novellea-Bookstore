# 📚 Novellea Bookstore - E-commerce Project

**"Stories wrapped in grace"**

Novellea is a book-selling e-commerce system built using a microservices architecture with Spring Boot. This project is under active development by an undergraduate student with a vision to create an Amazon-style virtual bookstore. The primary focus is on building the backend system using real-world architecture practices with RESTful microservices.

---

## 🧭 Roadmap (Beginner-Friendly Milestones)

### 🔧 Phase 0: Tooling & Setup
- Java 17+, Spring Boot, Maven, Git/GitHub, Docker (for services only)
- Supabase PostgreSQL DB (remote), Postman, IntelliJ
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
- Wishlist management

### 📚 Phase 3: Book Catalog
- Add/search/manage books
- JPA queries, pagination, filtering
- Review system (one-to-many)

### 🛒 Phase 5: Cart & Orders
- Add to cart, checkout, track orders
- Feign client or RestTemplate communication

### 💳 Phase 6: Payment & Review
- Dummy payments, add/view/delete reviews

### 🔐 Phase 7: Security (Planned)
- JWT Auth or Spring Security (Admin/User roles)

### 💻 Phase 8: Frontend Integration (In Progress)
- Frontend built using modern AI-assisted workflows (e.g., Vercel + React + Tailwind CSS)
- All backend connections and API integration handled manually
- Fully custom-designed UI optimized for a bookstore experience

### 🚀 Phase 9: Deployment (To Be Decided)
- Deployment platform and strategy will be finalized after full backend completion.

---

## 🛠️ Current Services
- `users/` → Basic CRUD, authentication, wishlist (in progress)
- `books/` → Catalog management and review support (in progress)

---

## 📂 Project Structure (Monorepo)
Will be updated later.

---

## 📌 Technologies & Tools
- Spring Boot, Spring Cloud, Spring Data JPA
- Supabase PostgreSQL, H2 (for local testing), Lombok, Feign, Docker
- GitHub Actions (planned), Swagger (planned)
- React + Tailwind CSS + Vercel (Frontend with AI-assisted tooling)

---

## 🚧 Status
This project is a work in progress and will be developed incrementally as per the roadmap above. Each microservice is independently deployable and uses Supabase as the shared production-grade database platform. The frontend is custom-built and connected manually by the developer to the backend services.
