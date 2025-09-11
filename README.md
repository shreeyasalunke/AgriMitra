
![AgriMitra Screenshot](https://github.com/user-attachments/assets/8fd7e5ef-0cae-49fb-98e4-ed090233b37e)


# AgriMitra
AgriMitra is a web-based platform designed to simplify agricultural tool rentals. It connects tool owners and farmers, enabling cost-effective access to modern equipment.


This dual-role system ensures flexibility — any user can act as both a farmer (tool renter) and an owner (tool provider).

🔹 Key Highlights

  🔹 Role-based authentication (Owner / User).

  🔹 Owners (farmers) can list multiple tools.

  🔹 Farmers can rent tools directly from owners or other farmers.

  🔹 Tool availability management .

  🔹 Scalable design for future cooperative farming models.

  🖥️ Frontend

      Framework: React.js (Vite setup)

      UI Library: Material-UI (MUI)

      State Management: Redux

      Styling: CSS / Tailwind 

  🔹 Features:

     Responsive design

     Role-based login ( Owner, Farmer(User))

     Tool listings & availability toggle

     Event & discount management   


 ⚙️ Backend

     Framework: Spring Boot (Java)

     Database: MySQL

     ORM: Hibernate / JPA

     Authentication: JWT-based auth

     APIs: RESTful APIs for managing tools, owners, farmers, and rentals

     Payment: Stripe API integration


     🚀 Tech Stack
🖥️ Frontend
<p align="left"> <img src="https://skillicons.dev/icons?i=react,vite,redux,materialui,tailwind,js,html,css" /> </p>
⚙️ Backend
<p align="left"> <img src="https://skillicons.dev/icons?i=java,spring,mysql,hibernate" /> </p>
🔧 Tools & Others
<p align="left"> <img src="https://skillicons.dev/icons?i=git,github,postman,vscode,eclipse" /> </p>


⚡ How to Run
1️⃣ Clone the Repository
git clone https://github.com/shreeyasalunke/AgriMitra.git
cd AgriMitra

2️⃣ Backend (Spring Boot) Setup
cd backend
Update your database credentials inside application.properties
Run the Spring Boot app: ./mvnw spring-boot:run
(or directly run the main class in Eclipse
Backend will start on 👉 http://localhost:9090

3️⃣ Frontend (React vite) Setup
cd frontend
npm install
npm run dev
Frontend will start on 👉 http://localhost:5173



# AgriMitra
Developed a web-based platform that enables companies (admins) to list agricultural tools and allows farmers to rent them as per their needs. Implemented a one-to-many relationship where a single admin can manage multiple tools. Features include role-based login, tool listings with availability, secure booking system.
