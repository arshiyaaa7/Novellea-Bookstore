# 📚 Novellea Bookstore — E-commerce Platform  

**_"Stories wrapped in grace."_**  

Novellea is a **full-stack microservices-based bookstore system** built with **Spring Boot (Java)** and **React**.  
It provides a complete e-commerce experience for book lovers — enabling users to browse, purchase, and review both **real books** and **eBooks** within a single application.  

---

## ✨ Unique Concept  

While reading an eBook on Kindle, you often have to switch to another platform (like Amazon) to buy a physical copy.  
**Novellea eliminates that friction.**  

With a **single toggle switch**, users can seamlessly switch between:  
- **📘 Real Books Mode** – browse and buy physical books  
- **📗 eBooks Mode** – browse and buy digital books  

This feature bridges the gap between **digital and physical reading experiences**, creating a unified and fluid shopping experience.  

In addition, the platform integrates **Stripe API (Test Mode)** to simulate a **real-world checkout flow** with secure and realistic payment handling.  

---

## 🧭 Roadmap  

### 🔧 Phase 0: Setup & Tooling  
- Java 17+, Spring Boot, Maven, Git, Docker (for containerization)  
- Supabase PostgreSQL (remote database)  
- Postman for API testing, IntelliJ IDEA for development  
- Understanding monolith vs. microservices  

---

### 🏗️ Phase 1: Architecture Design  
Built using **microservices architecture**, ensuring scalability, modularity, and maintainability.  

#### 🧩 Current Microservices  
| Service | Responsibility |
|----------|----------------|
| **users-service** | Manages user registration, authentication (BCrypt), profile, and wishlist |
| **catalog-service** | Manages book catalog, search, filtering, pagination, and metadata |
| **inventory-service** | Tracks stock availability for real books and eBooks |
| **order-service** | Handles order creation, tracking, and history |
| **checkout-service** | Manages checkout process and order validation |
| **payment-service** | Integrates with Stripe (test mode) for secure and realistic payments |

All services communicate via **REST APIs** using **Spring Cloud OpenFeign** or **RestTemplate** where appropriate.  

---

### 👤 Phase 2: User Microservice  
- User registration/login (BCrypt password encryption)  
- Wishlist management  
- CRUD operations, DTOs, and JPA repositories  

---

### 📚 Phase 3: Catalog & Inventory  
- Book listing, search, filtering, pagination  
- Separate handling for **eBooks** and **physical books**  
- Inventory synchronization between real and eBook modes  

---

### 🛒 Phase 4: Orders & Checkout  
- Add to cart and checkout flow  
- Real-time stock validation  
- Order creation and tracking  
- Integration with checkout and payment microservices  

---

### 💳 Phase 5: Payment Gateway (Stripe Integration)  
- Stripe API (Test Mode) integration for realistic payment workflow  
- Handles order validation, transaction response, and failure handling  

---

### 💻 Phase 6: Frontend Integration (Completed)  
- Built using **React + Tailwind CSS**, hosted via **Vercel**  
- Connected to backend REST APIs  
- Includes **toggle switch** between Real Books and eBooks mode  
- Fully responsive and user-friendly bookstore UI  

---

## 🛠️ Tech Stack  

**Backend (Microservices)**  
- Spring Boot  
- Spring Cloud (Feign, Config, Discovery)  
- Spring Data JPA  
- Lombok, Docker  
- PostgreSQL (Supabase)

**Frontend**  
- React (Vite)  
- Tailwind CSS  

**Integrations**  
- Stripe API (Test Mode)  
- Swagger/OpenAPI (planned)  
- GitHub Actions (CI/CD planned)  

---

## 📂 Project Structure

```bash
novellea/
├── users-service/
├── catalog-service/
├── inventory-service/
├── order-service/
├── checkout-service/
├── payment-service/
├── api-gateway/
└── frontend/ (React + Tailwind)
```

All services route externally through **API Gateway** for consistent access control and API routing.  

---

## 🌟 Key Features  

✅ Dual-mode Bookstore (Real Books / eBooks toggle)  
✅ Real-world microservice architecture  
✅ Stripe payment integration (Test Mode)  
✅ Secure password encryption (BCrypt)  
✅ Wishlist and user profile management  
✅ Modular, container-ready microservices  
✅ Responsive frontend built from scratch  
✅ Clear separation between backend and frontend layers  

---

## 🎯 Vision  

Novellea started as a learning-driven project by an undergraduate student to **understand real-world system design**, **microservice communication**, and **scalable backend development** — while delivering a **practical, production-style project** inspired by Amazon’s bookstore experience.  

---

## Images 
![Novellea](https://github.com/user-attachments/assets/43b000ba-5f5a-45d7-8e21-962ed632c1d8)
![catalog](https://github.com/user-attachments/assets/417141ed-75c9-4cb8-865c-4d39f3d16d45)

---
## 💬 Author  

👩‍💻 **Developed by:** Arshiya Shaikh  
🎓 **Role:** Undergraduate | Full Stack Developer | System Design Enthusiast  
🚀 **Goal:** Build real-world, production-grade systems while learning scalable architecture patterns  

> _“Stories wrapped in grace — where code meets creativity.”_  
