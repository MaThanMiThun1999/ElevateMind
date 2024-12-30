# ElevateMind: Your Personal Mental Wellness Journey

ElevateMind is a web application designed to help you proactively manage and improve your mental well-being. It provides a secure and user-friendly platform to track your mood, stress levels, and personal reflections, empowering you to gain valuable insights and cultivate positive mental health habits.

**Visit the live website:** https://elevatemind.onrender.com/

## Key Features:

*   **Daily Check-ins:** Effortlessly log your daily mood (1-10 rating), stress levels, and personal thoughts using an intuitive interface with autosave, making it simple to maintain a consistent record of your mental state.

*   **Visualized Progress Tracking:** Gain a clear understanding of your mental health trends with interactive charts displaying your mood and stress levels over time. Identify patterns, track your progress, and celebrate your achievements. These visualizations help you clearly follow your mental health journey.

*   **AI-Powered Personalized Insights and Support:** ElevateMind leverages a multilingual Large Language Model (LLM) to provide personalized guidance based on your recorded moods and activities.
    *   **Trend Analysis and Suggestions:** The LLM analyzes your data to identify trends in your mental well-being. You will receive tailored suggestions for actionable steps to improve your mood and manage your stress. This may include recommendations for mindfulness exercises, suggested daily goals, or other helpful resources.
    *   **Real-time Chat Support:** Access real-time support via chat, powered by the LLM. Get immediate guidance and answers to your questions as you navigate your mental wellness journey.

*   **Secure & Private:** Your data is handled with the utmost care and security. We employ robust measures, including JWT authentication, bcrypt password hashing, HTTPS encryption, and input sanitization, to ensure the confidentiality and integrity of your information.

*   **Personalized Profile:** Create a personalized profile with a profile picture (using Cloudinary), manage your notification preferences, and maintain control over your data.

*   **Email Reminders:** Set personalized email reminders to maintain consistency with your mental wellness practices.

*   **Responsive Design:** Access ElevateMind seamlessly from any device – desktop, tablet, or mobile phone – thanks to its fully responsive design. Accessibility best practices are implemented throughout the application.

*   **PWA (Progressive Web App) Capabilities:** Experience ElevateMind like a native app on your mobile device with our PWA implementation.
    *   **Installable:** Add ElevateMind to your home screen for quick access.
    *   **Offline Access:** Access cached content even without an internet connection.
    *   **App-like Experience:** Enjoy a full-screen experience and seamless navigation.
    
    ![PWA](https://mathanmithun.neocities.org/PromptArena/ezgif-7-5ad9394a06.gif)

*   **SEO Optimized:** ElevateMind is optimized for search engines, making it easier for others to discover this valuable resource.

## Technology Stack:

ElevateMind is built using a robust and modern technology stack:

*   **Frontend:** React, Tailwind CSS, Framer Motion, Chart.js
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB, Mongoose
*   **Authentication:** JWTs (JSON Web Tokens), bcrypt
*   **Image Hosting:** Cloudinary
*   **Email Service:** Nodemailer
*   **Deployment:** Render (Frontend & Backend)
*    **Chatbot Server:** Python (Flask), Hugging Face model
*   **Analytics:** Google Analytics

## Getting Started (For Developers):

1.  **Clone the Repository:** `git clone https://github.com/MaThanMiThun1999/ElevateMind`
2.  **Backend Setup:**
    *   Navigate to the backend directory: `cd server`
    *   Install dependencies: `npm install`
    *   Create a `.env` file: Copy the `.env.example` file and populate it with your API keys, database connection string, and other environment variables. **Keep your environment variables secure!**
3.  **Frontend Setup:**
    *   Navigate to the frontend directory: `cd client`
    *   Install dependencies: `npm install`
4. **Chatbot Server Setup:**
    *  Navigate to the chatbot server directory: `cd chatbot_server`
    *  Install dependencies: `pip install -r requirements.txt`
 
5.  **Run the Application:**
    *   Start the backend server: `npm start` (in the `server` directory)
    *    Start the chatbot server: `python chatbot_api.py` (in the `chatbot_server` directory)
    *   Start the frontend development server: `npm run dev` (in the `client` directory)


### Contributors:
* [MaThanMiThun1999](https://github.com/MaThanMiThun1999) - Full Stack Developer
* [krishi18](https://github.com/krishi18) - AI/ML Engineer
* [nidhisahani](https://github.com/nidhisahani-glitch) - AI/ML Engineer

## Security:

Security is a top priority. ElevateMind implements these key security features:

*   **JWT Authentication:** Secure session management.
*   **bcrypt Hashing:** Strong password protection.
*   **HTTPS Encryption:** Secure communication.
*   **Input Sanitization:** Protection against XSS attacks.
*   **Email Verification:** Enhanced account security.
*   **Regular Security Audits:** Proactive vulnerability identification and remediation.

## License:

Copyright (c) 2024 MaThanMiThun1999

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Navigation:

*   [Features](./docs/Features.md): Detailed overview of ElevateMind's features.
*   [API Documentation](./docs/API.md): Comprehensive API reference for developers.
*   [System Architecture](./docs/Architecture.md): Technical overview of the application's architecture.
