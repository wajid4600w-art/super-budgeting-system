# Super Budgeting System
## Complete Software Engineering Project Proposal and Requirements Specification

---

### Project Metadata & Cover Details

| Field | Details |
| :--- | :--- |
| **Course** | Software Engineering / Capstone Project |
| **Project Name** | Super Budgeting System (SBS) |
| **Project Type** | Web-Based Personal Financial Management System |
| **Instructor / Lecturer** | ____________________ |
| **Team Members** | ____________________ |
| **Student IDs** | ____________________ |
| **Section / Group** | ____________________ |
| **Submission Date** | 17 September 2027 |

---

## 1. Project Introduction

Super Budgeting is a web-based personal financial management system designed to help users manage, understand, and organize their personal finances in one place.

The main idea of the project is to create a system that works like a digital financial secretary. Instead of requiring the user to manually calculate everything, remember recurring expenses, prepare reports, and analyze spending, the system organizes financial information and presents it in a simple and professional way.

The system will allow users to record their income and expenses, create budgets, manage savings goals, monitor recurring transactions, receive notifications, and generate financial reports.

A major feature of Super Budgeting is that the user will have multiple ways to enter financial information:
1. Manually enter a transaction.
2. Upload a receipt and allow Optical Character Recognition (OCR) to extract information.
3. Use voice input to describe a transaction.

AI can be used to interpret the extracted information and convert it into structured financial data. For example, a user could say, *"I spent 75 SAR on groceries today."* The system could identify the amount, category, date, and description, and show the user the result before saving it. The user can then correct anything that was misunderstood.

The system will also provide an optional AI financial analysis feature. Users who enable this feature can receive analysis of their spending, budget progress, repeated overspending, and other financial patterns.

The system will not connect directly to users' bank accounts in the initial version. Users remain responsible for entering and confirming their financial information.

The overall purpose is to make personal financial management easier, faster, more visual, and more understandable.

---

## 2. Project Vision

The vision of Super Budgeting is to create a personal financial management system that reduces unnecessary manual work while helping users clearly understand their financial situation.

The system answers four fundamental questions:
1. **How much money do I have?**
2. **Where is my money going?**
3. **Am I following my budget?**
4. **What financial information requires my attention?**

The application answers these questions through a professional dashboard, detailed financial pages, reports, notifications, and optional AI assistance.

The system follows three core pillars:
- **Automation:** Reduce repetitive manual work through OCR and speech recognition.
- **Visualization:** Make financial data easy to understand through intuitive charts and indicators.
- **User Control:** Never remove the user's ability to review, edit, or override automated information.

---

## 3. Problem Statement

Managing personal finances can require users to repeatedly record income and expenses, organize transactions into categories, calculate remaining budgets, monitor recurring payments, track savings, compare spending between months, and prepare reports.

For users who have many transactions, manual financial tracking can become time-consuming and inconvenient. Even when users successfully record their financial information, a plain list of transactions does not make it easy to understand spending patterns or determine whether the user is following their budget.

Users may also forget recurring expenses, fail to notice that a category is approaching its budget limit, or find it difficult to compare their financial situation across different months.

Another major problem is that traditional manual tracking requires the user to enter every transaction themselves. Super Budgeting addresses this by providing alternative input methods such as receipt OCR and voice input.

However, automated systems can make mistakes. A receipt may be blurrily scanned or a voice command misunderstood. Therefore, Super Budgeting will not blindly save automated information. The user will always review and edit the extracted data before confirming it.

The project therefore aims to solve the problem of complicated and repetitive personal financial management by combining transaction tracking, budgeting, visualization, automation, reporting, and optional AI assistance in one unified system.

---

## 4. Importance of the Problem

Personal financial management affects everyday decisions such as spending, saving, budgeting, and planning for future purchases. A budgeting system helps users understand where their money is going and compare actual spending against planned limits.

- **Consumer Financial Protection Bureau (CFPB):** Research demonstrates that consumers face persistent difficulties with spending tracking and budgeting. The CFPB identifies day-to-day financial control and progress toward financial goals as cornerstones of overall financial well-being.
- **OECD / INFE International Financial Literacy Research:** Emphasizes that sound money management, disciplined budgeting, and automated tracking are critical to building long-term savings and resilience against debt traps.
- **Societal Value:** Poor financial visibility causes stress, missed bill payments, and financial distress. Providing accessible software with low data-entry friction directly improves financial discipline.

---

## 5. Proposed Software Solution

The proposed solution is a web application named **Super Budgeting**.

The system provides one central location where users manage their financial information:
- A professional, customizable dashboard providing high-level summaries.
- Dedicated modules for transactions, budgets, savings goals, recurring transactions, notifications, reports, and optional AI analysis.
- Multi-channel data entry: manual input, receipt OCR image extraction, and speech-to-text voice input.
- Strict human-in-the-loop review: all automatically extracted data must be confirmed or edited by the user prior to database persistence.

---

## 6. Intended Users

Super Budgeting is designed for general personal-finance users, including:
- **University and College Students:** Managing monthly allowances, student loans, part-time earnings, and academic expenses.
- **Salaried Employees:** Tracking living costs, utility bills, savings allocations, and monthly recurring commitments.
- **Freelancers and Gig Workers:** Managing irregular income streams and variable business expenses.
- **Goal-Oriented Savers:** Individuals saving for major milestones (e.g., vehicle, tuition, electronics, emergency fund).
- **General Public:** Anyone seeking an intuitive, ad-free financial overview without needing an accounting background.

---

## 7. Project Objectives

1. To provide a centralized personal financial management system.
2. To make financial information easier to understand through visual analytics.
3. To reduce repetitive manual financial data entry via OCR and voice input.
4. To allow users to record income and expenses accurately.
5. To allow users to create and monitor overall and category budgets.
6. To allow users to create and track progress toward savings goals.
7. To automate the scheduling of recurring income and expenses.
8. To provide a professional and customizable dashboard.
9. To generate monthly and custom-period financial reports.
10. To allow financial reports to be exported and printed (PDF/CSV).
11. To provide receipt OCR for automated transaction population.
12. To provide voice-based transaction description and interpretation.
13. To provide optional, non-intrusive AI financial spending analysis.
14. To notify users about impending budget thresholds and overspending.
15. To support multiple currencies (e.g., SAR, USD, EUR).
16. To securely store and protect user financial information.
17. To keep users in full control over automated and AI-generated data.

---

## 8. Project Scope

### 8.1 Features Included in the Project
- User accounts and authentication (sign up, log in, password hashing, session tokens).
- Customizable financial dashboard with real-time summary cards and charts.
- Income and expense management with category tagging and notes.
- Multi-modal transaction logging: manual, receipt OCR, and voice input.
- Budgeting engine (monthly global budgets and individual category ceilings).
- Threshold alert system (approaching limit warnings and exceeded budget alerts).
- Savings goal tracker with percentage completion bars.
- Recurring transaction automation engine (daily, weekly, monthly, yearly).
- Reporting engine (monthly reports, custom date ranges, PDF export, print views).
- Multi-currency support.
- Optional AI financial pattern insights.
- Security and data privacy protections.

### 8.2 Features Not Included
- Direct connections to banking APIs or open banking integrations.
- Automated retrieval of live bank balances.
- Electronic fund transfers, bill payments, or monetary transactions.
- Investment portfolio execution, stock trading, or crypto assets.
- Regulated credit scoring or fiduciary advisory services.

---

## 9. Main System Features

1. User account management and authentication.
2. Professional financial dashboard.
3. Customizable dashboard widgets.
4. Income management with source categorization.
5. Expense management with merchant tagging.
6. Manual transaction entry.
7. Receipt OCR processing.
8. Voice-assisted transaction input.
9. AI-assisted transaction interpretation.
10. Custom categories management.
11. Transaction notes.
12. Recurring income scheduler.
13. Recurring expense scheduler.
14. Monthly budget enforcement.
15. Category-specific budgets.
16. Budget notifications and warnings.
17. Savings goals tracker.
18. Multi-currency management.
19. Optional AI financial analysis.
20. Monthly financial reports.
21. Custom date-range reports.
22. Report customization (show/hide sections).
23. Report export (PDF/CSV).
24. Report printing styles.
25. Security, authentication, and privacy controls.

---

## 10. Functional Requirements

| Requirement ID | Name | Description |
| :--- | :--- | :--- |
| **FR-01** | User Registration | The system shall allow new users to create an account with email and password. |
| **FR-02** | User Login | The system shall allow registered users to securely log into their account. |
| **FR-03** | User Logout | The system shall allow users to securely terminate their session. |
| **FR-04** | User Profile | The system shall allow users to manage their personal and financial preferences. |
| **FR-05** | Preferred Currency | The system shall allow users to select a default preferred currency. |
| **FR-06** | Dashboard | The system shall provide a dashboard showing an overview of financial health. |
| **FR-07** | Dashboard Customization | The system shall allow users to customize and reorder dashboard components. |
| **FR-08** | Add Income | The system shall allow users to manually add income records. |
| **FR-09** | Multiple Income Sources | The system shall allow recording income from salary, freelance, investments, etc. |
| **FR-10** | Recurring Income | The system shall allow users to configure recurring income schedules. |
| **FR-11** | Edit Income | The system shall allow users to modify existing income records. |
| **FR-12** | Delete Income | The system shall allow users to delete income records after confirmation. |
| **FR-13** | Add Expense | The system shall allow users to manually add expense records. |
| **FR-14** | Expense Categories | The system shall allow users to assign categories to expenses. |
| **FR-15** | Custom Categories | The system shall allow users to create and manage custom categories. |
| **FR-16** | Transaction Notes | The system shall allow users to attach explanatory notes to transactions. |
| **FR-17** | Edit Transactions | The system shall allow users to edit any transaction field. |
| **FR-18** | Delete Transactions | The system shall allow users to delete transactions with calculation updates. |
| **FR-19** | Receipt Upload | The system shall allow users to upload or capture receipt images. |
| **FR-20** | OCR Processing | The system shall process uploaded receipt images using OCR technology. |
| **FR-21** | OCR Extraction | The system shall attempt to extract merchant, date, amount, and currency. |
| **FR-22** | OCR Review | The system shall display extracted OCR data for user verification before saving. |
| **FR-23** | OCR Editing | The system shall allow users to edit extracted OCR data. |
| **FR-24** | Voice Input | The system shall allow users to dictate transactions via speech input. |
| **FR-25** | Voice Interpretation | The system shall process audio and parse amount, category, date, and description. |
| **FR-26** | Voice Review | The system shall display interpreted voice data to the user before saving. |
| **FR-27** | Voice Editing | The system shall allow users to correct any misidentified voice fields. |
| **FR-28** | Manual Override | The system shall guarantee users can override any automated data field. |
| **FR-29** | Recurring Expenses | The system shall allow users to schedule repeating expenses. |
| **FR-30** | Recurring Management | The system shall allow editing, pausing, resuming, and deleting recurring rules. |
| **FR-31** | Monthly Budget | The system shall allow users to establish an overall monthly spending limit. |
| **FR-32** | Category Budget | The system shall allow users to establish spending ceilings for categories. |
| **FR-33** | Budget Monitoring | The system shall compute used amount, remaining balance, and percentage used. |
| **FR-34** | Budget Warning | The system shall notify users when spending reaches a configured threshold (e.g., 80%). |
| **FR-35** | Budget Exceeded Alert | The system shall alert users immediately when a budget ceiling is exceeded. |
| **FR-36** | Savings Goals | The system shall allow users to create target-based savings goals. |
| **FR-37** | Savings Progress | The system shall compute and display percentage progress toward savings goals. |
| **FR-38** | Multiple Goals | The system shall support tracking multiple independent savings goals. |
| **FR-39** | AI Toggle | The system shall allow users to enable or disable optional AI financial analysis. |
| **FR-40** | AI Spending Analysis | When enabled, the system shall analyze spending trends and highlight anomalies. |
| **FR-41** | AI Budget Analysis | The system shall identify repeated budget overruns across cycles. |
| **FR-42** | AI Period Comparison | The system shall compare current month expenditures with previous cycles. |
| **FR-43** | AI Suggestions | The system may provide non-binding spending adjustment recommendations. |
| **FR-44** | AI User Control | The system shall never alter budgets or data automatically based on AI suggestions. |
| **FR-45** | Monthly Reports | The system shall generate comprehensive monthly financial statements. |
| **FR-46** | Custom Date Reports | The system shall generate reports for any user-defined start and end dates. |
| **FR-47** | Historical Reports | The system shall retain and display historical financial reports. |
| **FR-48** | Report Customization | The system shall allow users to toggle inclusion of charts, notes, or categories. |
| **FR-49** | Report Export | The system shall export reports to standard formats (PDF and CSV). |
| **FR-50** | Report Printing | The system shall provide clean, print-optimized stylesheet views. |
| **FR-51** | Notifications | The system shall deliver configurable in-app alerts and notifications. |
| **FR-52** | Multiple Currencies | The system shall support transactions across different world currencies. |
| **FR-53** | Data Validation | The system shall validate transaction amounts, dates, and formats strictly. |
| **FR-54** | Data Storage | The system shall securely persist financial records in a relational database. |

---

## 11. Non-Functional Requirements

- **NFR-01 Usability:** The user interface must be intuitive, requiring no specialized accounting or financial background.
- **NFR-02 Learnability:** A first-time user must be able to log a transaction and inspect their dashboard within 3 minutes of initial login.
- **NFR-03 Performance:** Standard page requests, dashboard views, and transaction queries must complete within 500 milliseconds under expected workloads.
- **NFR-04 Reliability:** The database must enforce ACID properties to guarantee no financial records are lost or corrupted during concurrent operations.
- **NFR-05 Security:** Passwords must be hashed using strong one-way hashing algorithms (e.g., Bcrypt). All client-server communication must use HTTPS.
- **NFR-06 Privacy:** Strict tenant isolation; a user must never be able to view, query, or mutate another user's financial records.
- **NFR-07 Maintainability:** The software must follow a clean, modular architecture separating presentation, business logic, and persistence.
- **NFR-08 Scalability:** Database schema and API endpoints must support progressive expansion and high data volume per user account.
- **NFR-09 Compatibility:** The web application must be fully functional across major modern browsers (Google Chrome, Mozilla Firefox, Microsoft Edge, Apple Safari).
- **NFR-10 Accessibility:** The UI must adhere to WCAG standards with high-contrast text, clear labels, keyboard navigation, and responsive typography.
- **NFR-11 Accuracy:** OCR and voice modules must achieve acceptable recognition rates while explicitly enforcing manual confirmation prior to saving.
- **NFR-12 Availability:** The system should target 99.5% uptime during standard operating periods.

---

## 12. User Roles

### Normal User
- Manages personal profile and default currency preferences.
- Manages income and expense records (create, read, update, delete).
- Uploads receipts for OCR extraction and reviews results.
- Uses voice commands to record transactions and reviews results.
- Creates and monitors monthly and category-specific budgets.
- Configures budget alert thresholds.
- Establishes savings goals and updates saved amounts.
- Manages recurring schedules (pause, resume, edit, cancel).
- Generates, customizes, exports, and prints financial reports.
- Enables or disables optional AI financial analysis features.

### Administrator (System Level)
- Monitors system health, error logs, and database connectivity.
- Manages standard global categories and supported currency lists.
- Enforces user account security and handles password resets where required.
- Governed strictly by the principle of least privilege (no visibility into private user transactions).

---

## 13. Dashboard Requirements

The dashboard serves as the central command center of Super Budgeting. It provides an immediate overview of financial health and answers key questions at a single glance.

### Key Metrics Displayed:
- **Total Income:** Aggregated income for the current calendar month.
- **Total Expenses:** Aggregated expenditures for the current calendar month.
- **Net Available Balance:** Real-time cash balance (Income minus Expenses).
- **Global Monthly Budget Progress:** Visual progress gauge showing spent vs. remaining allowance.
- **Category Spending Breakdown:** Interactive donut/pie chart depicting percentage expenditure per category.
- **Savings Goals Progress:** Compact progress meters showing percentage completion of active targets.
- **Recent Transactions Feed:** Chronological list of recent entries with category icons and timestamps.
- **Upcoming Recurring Bills:** Preview of scheduled expenses due within the next 7 days.
- **Active Notifications:** High-priority alerts for categories exceeding threshold levels.
- **AI Insights Widget (Optional):** Contextual advice displayed only when enabled by user.

### Visual Status Conventions:
- **Green:** Healthy status (spending well below budget thresholds, on-track savings).
- **Yellow / Amber:** Warning status (spending has reached warning threshold, e.g., 80% of limit).
- **Red:** Critical status (budget exceeded, overdrawn category, or missed payment).

The dashboard must be modular, allowing users to toggle and rearrange widgets to suit their personal focus.

---

## 14. Income Management

Users can record and categorize all incoming revenue streams.

### Data Attributes for Income:
- **Amount:** Positive numerical value.
- **Currency:** Selected transaction currency (e.g., SAR, USD).
- **Date & Time:** Date when income was received.
- **Income Source:** Tag identifying the source (e.g., Salary, Freelance, Monthly Allowance, Investment, Gift).
- **Category:** Classification type.
- **Notes:** Optional descriptive remarks.
- **Recurring Flag:** Indicates if this income repeats automatically on a set schedule.

The system supports full CRUD operations (Create, Read, Update, Delete) with confirmation prompts on deletion to prevent accidental data loss.

---

## 15. Expense Management

Users can record and track all financial outflows.

### Data Attributes for Expenses:
- **Amount:** Numerical expenditure value.
- **Currency:** Transaction currency.
- **Date & Time:** Timestamp of purchase.
- **Merchant / Payee:** Vendor name (e.g., Panda Supermarket, Jarir Bookstore, Uber).
- **Category:** Assigned expense classification.
- **Description:** Summary of purchase.
- **Notes:** Detailed supplementary notes.
- **Input Method Tag:** Metadata indicating whether the entry was logged manually, via OCR, or via Voice.
- **Recurring Flag:** Indicates if the expense is part of a recurring schedule.

Expenses can be filtered by date ranges, categories, merchants, or payment methods.

---

## 16. Receipt OCR Workflow

Optical Character Recognition (OCR) reduces friction by automating receipt data extraction.

```
[User Uploads Receipt Image]
             |
             v
[Server Processes Image via OCR Engine]
             |
             v
[AI Extracts: Merchant, Date, Total Amount, Currency]
             |
             v
[Verification Screen Displayed to User]
             |
             +---> [User Edits / Corrects Extracted Fields]
             |
             v
[User Confirms & Clicks 'Save Transaction']
             |
             v
[Transaction Stored in Database & Dashboard Updated]
```

### Key Principles:
- System never commits OCR-scanned receipts directly to the database without explicit user confirmation.
- The interface highlights uncertain fields for user attention.
- Supported image formats include JPEG, PNG, and PDF.

---

## 17. Voice Input Workflow

Voice input enables hands-free, rapid expense recording.

### Example Scenario:
1. User clicks the microphone icon and speaks: *"I spent 80 SAR on dinner yesterday."*
2. Speech-to-text converts audio into natural language text.
3. Natural Language Processing (NLP) parses the sentence into structured components:
   - **Amount:** `80.00`
   - **Currency:** `SAR`
   - **Category:** `Food & Dining`
   - **Date:** Yesterday's calendar date
   - **Description:** `Dinner`
4. The system populates the transaction modal with these values.
5. The user reviews, makes any required adjustments, and confirms.

---

## 18. AI Integration

Artificial Intelligence within Super Budgeting serves two distinct purposes:

### 1. Data Entry Assistance (OCR & Voice Parsing)
- Uses language models and pattern extractors to convert unstructured receipt text and speech into structured JSON payloads.

### 2. Optional Financial Analysis & Insights
- Users can toggle this feature on or off at any time.
- When enabled, AI analyzes transaction history to detect:
  - Anomalous spikes in specific spending categories.
  - Consistent end-of-month budget exhaustion.
  - Month-over-month expenditure variances.
- **Strict Rule:** The AI serves purely an advisory role. It is never permitted to mutate, delete, or override user budgets or transactions autonomously.

---

## 19. Budget Management

Users can establish structured spending limits across multiple scopes:
- **Global Monthly Budget:** Overall expenditure cap across all categories.
- **Category-Specific Budgets:** Targeted limits per category (e.g., Food: 1,000 SAR, Transportation: 700 SAR, Entertainment: 300 SAR).

### System Calculations:
$$\text{Spent Amount} = \sum \text{Transactions in Category within Cycle}$$
$$\text{Remaining Amount} = \text{Budget Amount} - \text{Spent Amount}$$
$$\text{Percentage Consumed} = \left( \frac{\text{Spent Amount}}{\text{Budget Amount}} \right) \times 100\%$$

Progress meters dynamically reflect status as green, yellow, or red based on user-defined warning thresholds.

---

## 20. Budget Alerts

The system proactively alerts users before budget overruns occur.

- **Warning Threshold (Default: 80%):** Generates an in-app banner:  
  *"Your Food budget has reached 85% of its limit. You have 150 SAR remaining for this period."*
- **Exceeded Threshold (100%+):** Generates a high-priority warning:  
  *"Your Entertainment budget has exceeded its limit by 120 SAR."*

Users can configure custom threshold percentages per category.

---

## 21. Savings Goals

Users can define and track targeted savings funds.

### Goal Attributes:
- **Goal Name:** Title of target (e.g., Emergency Fund, New Laptop, Vacation).
- **Target Amount:** Desired savings ceiling (e.g., 4,000 SAR).
- **Current Saved Amount:** Current accumulated balance (e.g., 2,500 SAR).
- **Currency:** Associated currency.
- **Target Completion Date:** Desired deadline.
- **Notes:** Purpose and motivation remarks.

Progress calculation:
$$\text{Progress} = \left( \frac{\text{Current Saved}}{\text{Target Amount}} \right) \times 100\% = 62.5\%$$

---

## 22. Recurring Transactions

Automates regular, predictable cash movements.

### Common Examples:
- **Income:** Monthly Salary, Student Stipend, Rental Income.
- **Expenses:** Apartment Rent, Electricity Bill, Wi-Fi Subscription, Gym Membership.

### Configuration Options:
- Frequency: Daily, Weekly, Bi-Weekly, Monthly, Annually.
- Start Date and optional End Date.
- Action on generation: Auto-record or prompt for confirmation.
- State controls: Active, Paused, Terminated.

---

## 23. Categories Management

The system comes pre-loaded with standard categories and supports full user customization:

### Pre-loaded Categories:
- Food & Groceries
- Transportation & Fuel
- Housing & Rent
- Utilities (Electricity, Water, Internet)
- Education & Tuition
- Healthcare & Pharmacy
- Entertainment & Leisure
- Shopping & Clothing
- Travel & Vacations
- Personal Savings & Investments
- Miscellaneous / Other

Users can add custom categories with custom icons and color badges.

---

## 24. Transaction Notes

Users can append notes to any financial record to preserve context. Notes allow users to recall the exact circumstance of a purchase (e.g., *"Bought textbooks for CS301 at discount"*), which is preserved in monthly audit logs and searchable via dashboard filters.

---

## 25. Notifications System

Centralized notification drawer containing:
- Budget threshold warnings (80%, 90%, 100%).
- Reminders for upcoming recurring payments.
- Milestone achievements on savings goals (e.g., 50%, 100% achieved).
- AI financial insights (when enabled).

Users can toggle notification preferences per category and channel.

---

## 26. Financial Reports

Super Budgeting provides comprehensive financial reporting:
- Comprehensive Income vs. Expense totals.
- Net surplus or deficit for the period.
- Category breakdown with visual charts.
- Budget vs. Actual expenditure variance analysis.
- Savings contributions logged during the period.
- Audit trail of recurring transactions processed.

---

## 27. Custom Date Range Reports

In addition to calendar-month reports, users can define arbitrary date boundaries:
- Example: **1 September 2026 to 17 September 2026**
- Enables tracking during academic terms, vacation trips, or between paychecks rather than strictly calendar boundaries.

---

## 28. Report Customization

Users have granular control over report contents prior to generation:
- Toggle Income summary on/off.
- Toggle Category charts on/off.
- Toggle Notes and itemized logs on/off.
- Select sorting order (by date, by amount, by merchant).

---

## 29. Report Export and Printing

- **PDF Export:** Generates clean, publication-quality printable reports formatted with page-breaks, headers, and footers.
- **CSV Export:** Allows users to export raw transaction datasets into spreadsheet tools (Excel, Google Sheets) for custom mathematical modeling.
- **Print View:** Dedicated CSS media query (`@media print`) ensures clutter-free printing without website navigation bars.

---

## 30. Multiple Currency Support

- Supports major global and regional currencies (SAR, USD, EUR, GBP, AED, etc.).
- Each transaction stores its native currency.
- Dashboard converts display values into the user's selected primary currency using configured or fetched conversion rates.

---

## 31. AI Financial Analysis (Optional Feature)

- Completely opt-in; disabled by default to respect privacy.
- Analyzes spending trends and generates constructive observations:
  - *"Dining expenses increased by 32% compared to last month."*
  - *"You have reached your shopping budget limit in 3 consecutive cycles."*
  - *"At current savings velocity, you will reach your New Laptop goal by November."*
- Serves solely as an informative advisor; never modifies user budgets automatically.

---

## 32. Security Requirements

1. **Authentication:** Salted password hashing using Bcrypt (minimum 10 salt rounds).
2. **Session Security:** JSON Web Tokens (JWT) stored in secure, HTTP-only, SameSite cookies.
3. **Authorization:** Role-based access control (RBAC) ensuring users only query their own data.
4. **Input Validation:** Strict server-side validation on all incoming payload bodies to prevent injection attacks (SQL injection, XSS).
5. **Data Protection:** All network transmission enforced via TLS/HTTPS encryption.
6. **File Security:** Uploaded receipt images scanned for malicious signatures and stored in secure object storage with private access URLs.

---

## 33. Privacy Requirements

- Financial data is classified as confidential personal data.
- System operates on data minimization: only information strictly required for budgeting is captured.
- No direct connection to user bank accounts, preventing access to account numbers or credentials.
- Clear disclosure when third-party AI or OCR APIs process receipt images or voice recordings.
- Users have the right to export or delete their entire account and financial records at any time.

---

## 34. Data Requirements

The application persists:
- User accounts and credentials.
- Financial transactions (income and expense).
- Categories (standard and custom).
- Budgets and threshold limits.
- Savings goals and historical progress logs.
- Recurring transaction schedules and execution logs.
- In-app notifications and read statuses.
- Export preferences and currency settings.

All tables enforce timestamps (`created_at`, `updated_at`) and foreign key constraints to ensure referential integrity.

---

## 35. Proposed Database Structure

```
+-------------------+        +----------------------+
|       USER        | 1    * |     TRANSACTION      |
+-------------------+--------+----------------------+
| id (PK)           |        | id (PK)              |
| name              |        | user_id (FK)         |
| email             |        | category_id (FK)     |
| password_hash     |        | type (income/expense)|
| pref_currency     |        | amount               |
| created_at        |        | currency             |
+-------------------+        | date                 |
        | 1                  | merchant             |
        |                    | notes                |
        | *                  | input_method         |
+-------------------+        | recurring_id (FK)    |
|      BUDGET       |        | created_at           |
+-------------------+        +----------------------+
| id (PK)           |                   | *
| user_id (FK)      |                   |
| category_id (FK)  |                   | 1
| amount            |        +----------------------+
| period_start      |        |       CATEGORY       |
| period_end        |        +----------------------+
| warning_threshold |        | id (PK)              |
+-------------------+        | user_id (FK)         |
                             | name                 |
                             | type                 |
                             | is_default           |
                             +----------------------+
```

### Key Entities:
1. **User:** `id`, `name`, `email`, `password_hash`, `pref_currency`, `created_at`.
2. **Transaction:** `id`, `user_id`, `type`, `amount`, `currency`, `category_id`, `date`, `merchant`, `description`, `notes`, `input_method`, `recurring_id`, `created_at`.
3. **Category:** `id`, `user_id`, `name`, `type`, `is_default`, `color_code`, `icon`.
4. **Budget:** `id`, `user_id`, `category_id`, `amount`, `currency`, `start_date`, `end_date`, `warning_threshold`.
5. **SavingsGoal:** `id`, `user_id`, `name`, `target_amount`, `current_amount`, `currency`, `target_date`, `notes`.
6. **RecurringTransaction:** `id`, `user_id`, `type`, `amount`, `currency`, `category_id`, `frequency`, `start_date`, `end_date`, `is_active`.
7. **Notification:** `id`, `user_id`, `type`, `message`, `is_read`, `created_at`.

---

## 36. System Workflows

### Manual Transaction Workflow
$$\text{User} \rightarrow \text{Add Entry} \rightarrow \text{Form Validation} \rightarrow \text{Database Persistence} \rightarrow \text{Dashboard Recalculation}$$

### OCR Workflow
$$\text{Upload Image} \rightarrow \text{OCR Extraction} \rightarrow \text{User Review/Edit} \rightarrow \text{User Confirmation} \rightarrow \text{Persistence}$$

### Voice Input Workflow
$$\text{Audio Input} \rightarrow \text{Speech-to-Text} \rightarrow \text{NLP Entity Parsing} \rightarrow \text{User Review/Edit} \rightarrow \text{Persistence}$$

### AI Analysis Workflow
$$\text{Enable Feature} \rightarrow \text{Query Transaction Data} \rightarrow \text{Pattern Analysis} \rightarrow \text{Display Insights} \rightarrow \text{User Action}$$

---

## 37. Use Cases

- **UC-01 Register Account:** User registers with email and password; receives validation confirmation.
- **UC-02 User Login:** User submits credentials and receives an authenticated session.
- **UC-03 Log Expense Manually:** User fills amount, category, date, and confirms save.
- **UC-04 Scan Receipt via OCR:** User uploads image; verifies extracted fields; confirms save.
- **UC-05 Enter Expense via Voice:** User speaks transaction sentence; reviews parsed output; confirms save.
- **UC-06 Set Category Budget:** User defines 1,000 SAR limit on Groceries with 80% warning threshold.
- **UC-07 Track Savings Goal:** User creates a 5,000 SAR Laptop goal and logs incremental deposits.
- **UC-08 Create Recurring Payment:** User configures 150 SAR monthly Wi-Fi bill starting on 1st of month.
- **UC-09 Generate Custom Report:** User selects custom date range and exports summary to PDF.
- **UC-10 View AI Insights:** User navigates to AI advisory card to view category trend anomalies.

---

## 38. User Stories

### Dashboard
- *As a user*, I want an overview dashboard so that I can immediately see my total income, expenses, and available cash.
- *As a user*, I want to customize widget layouts so that I can prioritize the information most important to me.

### Transactions
- *As a user*, I want to record income and expenses quickly so that my financial records stay up to date.
- *As a user*, I want to upload receipt pictures so that I do not have to type in every receipt item manually.
- *As a user*, I want to use voice dictation so that I can log expenses on the go.
- *As a user*, I want to review automated OCR and voice entries before saving so that errors can be corrected immediately.

### Budgets & Alerts
- *As a user*, I want to set spending limits per category so that I do not overspend on non-essentials.
- *As a user*, I want to receive early warnings when my spending nears 80% so that I can adjust my habits before the limit is breached.

### Savings & Reports
- *As a user*, I want to track savings progress with visual bars so that I stay motivated to reach my goals.
- *As a user*, I want to export monthly financial statements to PDF so that I can archive my records.

---

## 39. Business Rules

1. Every transaction must be linked to a single verified user account.
2. A user can never read, modify, or delete another user's financial records.
3. Transaction amounts must be strictly positive non-zero numbers.
4. Every transaction must have a valid calendar date.
5. Deleting or editing a past transaction must immediately trigger a recalculation of all relevant budgets and dashboard metrics.
6. OCR and voice-parsed transactions must never be automatically committed without user confirmation.
7. AI suggestions must remain purely advisory and can never alter user settings or budgets autonomously.
8. Recurring transactions are triggered according to system clock checks and user preferences.
9. Custom reports must restrict analysis strictly to transactions falling within the specified date boundaries.

---

## 40. Validation Requirements

- **Email Format:** Standard RFC 5322 regex validation.
- **Password Strength:** Minimum 8 characters including uppercase, lowercase, number, and special character.
- **Monetary Amounts:** Standard 2-decimal point precision numeric formatting (`0.00`).
- **Dates:** Valid ISO 8601 calendar date (`YYYY-MM-DD`); future dates blocked for standard expense logging unless flagged as scheduled.
- **File Uploads:** Allowed mime types: `image/jpeg`, `image/png`, `application/pdf`; max size 5 MB.
- **User-Friendly Error Messages:** Clear explanations (e.g., *"Please enter an amount greater than 0"*) rather than internal system stack traces.

---

## 41. Error Handling

- **OCR Extraction Failure:** When a blurry or unreadable receipt is submitted, the system flags the issue and offers a pre-populated manual form.
- **Voice Recognition Ambiguity:** If speech audio cannot identify the amount or category, the user is prompted to clarify or enter values manually.
- **Network Interruptions:** Client-side caching and graceful error toasts notify users if connectivity drops during a save operation.
- **Report Generation Errors:** If data is missing or query times out, a friendly retry message is displayed.

---

## 42. Usability Requirements

- **Mobile-Responsive Design:** Fully fluid layouts functional across smartphones, tablets, laptops, and desktop monitors.
- **Minimal Cognitive Overhead:** Essential actions (add expense, view budget) accessible in 2 clicks or fewer.
- **Consistent Visual Language:** Unified color coding, typography, button styles, and iconography across all modules.
- **Dark / Light Mode:** Support for user-selectable themes for comfortable viewing in varied lighting conditions.

---

## 43. Performance Requirements

- **Dashboard Load Time:** Sub-500ms initial render for standard cached views.
- **Transaction Submission:** Instant optimistic UI updates with backend database confirmation within 200ms.
- **OCR Processing Time:** Under 3.5 seconds from receipt upload to extracted verification modal.
- **Voice Interpretation Time:** Under 2 seconds from speech completion to field extraction.
- **Report Generation:** Under 1.5 seconds for typical 12-month query datasets.

---

## 44. Testing Strategy

```
+-------------------------------------------------------------+
|                 USER ACCEPTANCE TESTING (UAT)               |
|            Realistic student & employee test cohorts        |
+-------------------------------------------------------------+
                              ^
+-------------------------------------------------------------+
|                    SYSTEM INTEGRATION TESTS                 |
|       End-to-End API routes, Database transactions, Auth    |
+-------------------------------------------------------------+
                              ^
+-------------------------------------------------------------+
|                       UNIT TESTING                          |
|    Calculations, Date parsers, Validation, Budget engines   |
+-------------------------------------------------------------+
```

- **Unit Testing:** Validating individual pure functions (budget percentage formula, currency conversions, date boundary filters).
- **Integration Testing:** Testing end-to-end flows: `User Login -> Add Expense -> Update Budget -> Check Alert Status`.
- **OCR / Voice Accuracy Testing:** Testing against standard clean receipts, skewed receipt photos, crumpled receipts, and various vocal accents.
- **User Acceptance Testing (UAT):** Cohort of 10 student and employee testers validating real-world everyday usability.

---

## 45. Proposed Development Methodology

The project adheres to the **Agile Software Development Methodology** utilizing 2-week sprint iterations:
- Facilitates rapid incremental deliveries and functional prototypes.
- Allows team to refine OCR and AI workflows based on early user feedback.
- Promotes transparency through regular backlog grooming, sprint reviews, and retrospective adjustments.

---

## 46. Proposed Development Stages

1. **Stage 1: Requirements Gathering & User Research:** Survey execution, stakeholder interviews, formulating functional and non-functional requirements.
2. **Stage 2: Analysis & Scope Definition:** Prioritization of core modules, boundary definition, and risk identification.
3. **Stage 3: System Architecture & UI/UX Design:** Wireframing in Figma, database schema modeling (ERD), API route design, and architecture diagrams.
4. **Stage 4: Core Implementation:** Development of authentication, transaction CRUD, and database persistence.
5. **Stage 5: Automation & Advanced Features:** Implementation of OCR receipt extraction, speech recognition parsing, and budget alert logic.
6. **Stage 6: Testing & Quality Assurance:** Comprehensive unit, integration, usability, and security verification.
7. **Stage 7: Final Integration & Cloud Deployment:** Production deployment on cloud hosting, final documentation, and user guide preparation.
8. **Stage 8: Project Demonstration & Viva:** Formal demonstration and final project handover.

---

## 47. Proposed Agile Sprints

| Sprint | Focus Area | Key Deliverables |
| :---: | :--- | :--- |
| **Sprint 1** | Requirements & Specification | Problem formulation, survey analysis, SRS documentation, use case catalog. |
| **Sprint 2** | UI/UX & Database Architecture | Figma prototypes, Entity-Relationship Diagram (ERD), API schema design. |
| **Sprint 3** | Core Backend & Authentication | User auth (JWT/Bcrypt), database setup, basic income/expense CRUD endpoints. |
| **Sprint 4** | Budgeting Engine & Alerts | Monthly budgets, category caps, recurring transaction scheduler, alerts. |
| **Sprint 5** | Dashboard & Savings Goals | Summary cards, interactive visual charts, savings goal tracker. |
| **Sprint 6** | Automation: OCR & Voice | Receipt upload pipeline, OCR parsing, voice dictation parsing, review UI. |
| **Sprint 7** | Reporting Engine & Export | Monthly reports, custom date queries, PDF export, CSV download, print view. |
| **Sprint 8** | AI Insights & Final Polish | Optional AI spending insights, end-to-end testing, bug fixes, deployment. |

---

## 48. Supporting Evidence

The need for a system like Super Budgeting is supported by both empirical academic literature and primary research:
- **CFPB Studies:** Document that cognitive friction in logging daily transactions is the primary reason why individuals abandon budgeting systems.
- **Academic Research:** Confirms that financial illiteracy combined with frictionless digital payments (contactless cards, delivery apps) leads to chronic overspending among students and young professionals.
- **Market Gap:** Existing solutions either lock essential features behind expensive monthly subscriptions (e.g., YNAB at \$14.99/mo) or bombard users with invasive financial ads. Super Budgeting bridges this gap as a clean, accessible, multi-modal alternative.

---

## 49. Survey Questionnaire

To gather primary evidence, the following 14-question survey was designed for potential users:

1. Do you currently track your income and expenses? *(Yes / No / Sometimes)*
2. How do you currently track your expenses? *(Memory / Notes / Spreadsheet / Budgeting app / Bank app / Other)*
3. How difficult is it to keep track of your expenses? *(Very easy / Easy / Neutral / Difficult / Very difficult)*
4. Do you currently use a monthly budget? *(Yes / No / Sometimes)*
5. Have you ever exceeded a budget because you did not realize how much you had spent? *(Yes / No / Not sure)*
6. Would receipt scanning make recording expenses easier? *(Yes / No / Maybe)*
7. Would voice input make recording expenses easier? *(Yes / No / Maybe)*
8. Would a professional visual dashboard be useful? *(Yes / No / Maybe)*
9. Would budget-limit notifications be useful? *(Yes / No / Maybe)*
10. Would savings goals be useful? *(Yes / No / Maybe)*
11. Would monthly financial reports be useful? *(Yes / No / Maybe)*
12. Would report export and printing be useful? *(Yes / No / Maybe)*
13. Would optional AI analysis of your spending be useful? *(Yes / No / Maybe)*
14. Which feature would be most useful to you? *(Dashboard / Manual tracking / Receipt scanning / Voice input / Budgeting / Savings goals / Notifications / Reports / AI analysis)*

---

## 50. Existing Systems Benchmark

| System | Primary Strengths | Limitations | SBS Competitive Advantage |
| :--- | :--- | :--- | :--- |
| **YNAB (You Need A Budget)** | Comprehensive envelope budgeting methodology | Expensive subscription fee (\$14.99/mo); steep learning curve | Free, student-friendly, multi-modal input |
| **Splitwise** | Excellent shared ledger for roommates | Cluttered with aggressive ads; no personal envelope budgeting | Clean, ad-free, balances individual budgets |
| **Microsoft Excel / Sheets** | Highly customizable; zero subscription cost | High manual overhead; no automated alerts; poor mobile UX | Automated OCR/Voice logging, visual dashboard, alerts |
| **Commercial Bank Apps** | Automatic transaction tracking | Shows raw transactions without forward-looking budgets; vendor locked | Cross-institution, proactive alerts, flexible categories |

---

## 51. Project Risks and Mitigation

| Risk ID | Description | Likelihood | Impact | Mitigation Strategy |
| :---: | :--- | :---: | :---: | :--- |
| **R-01** | **OCR Accuracy Flaws:** Blurry or folded receipts fail to parse correctly. | High | Medium | Enforce mandatory user review screen before saving; allow instant manual field edits. |
| **R-02** | **Voice Recognition Errors:** Accents or background noise cause misinterpretations. | Medium | Medium | Display parsed transcript for confirmation prior to saving; provide fallback to manual form. |
| **R-03** | **AI Scope Complexity:** Advanced predictive models may take excessive time to train. | Medium | Low | Treat AI analysis as an optional, secondary module after core features are verified. |
| **R-04** | **Feature Creep:** Excessive requirements overwhelm the team schedule. | High | High | Enforce strict sprint backlog prioritization; lock core MVP first. |
| **R-05** | **Security & Privacy:** Sensitive financial records exposed. | Low | High | Use Bcrypt hashing, JWT sessions, strict tenant isolation, and sanitized SQL inputs. |
| **R-06** | **UI Usability Clutter:** Too many features overwhelm non-technical users. | Medium | Medium | Keep the main dashboard clean; tuck advanced configurations into dedicated secondary tabs. |
| **R-07** | **System Integration Issues:** Disconnects between OCR, Voice, and Database layers. | Medium | Medium | Implement thorough integration tests and build modular RESTful API endpoints. |

---

## 52. Project Constraints

- **Timeline Constraints:** Strict semester academic schedule (3-week proposal deadline, 15-week total lifecycle).
- **Team Size & Resources:** Small undergraduate student engineering team.
- **Budget Limitations:** Use of open-source libraries, free-tier cloud hosting, and free OCR/speech APIs.
- **Device Dependencies:** Varied microphone and camera quality across client devices.
- **Security Boundaries:** No access to proprietary banking networks.

---

## 53. Future Enhancements

- Direct Open Banking API integration for automatic transaction syncing.
- Native mobile applications for iOS and Android.
- Collaborative shared family and roommate group wallets.
- Predictive financial forecasting using time-series machine learning models.
- Automated subscription detection and recurring charge reminders.
- Calendar integration for upcoming bill due dates.

---

## 54. Success Criteria

The project will be deemed successful when:
1. Users can register, log in securely, and manage their preferences.
2. Users can log income and expenses manually, via receipt OCR, and via voice dictation.
3. Users can review, edit, and confirm automated data before saving.
4. Users can define monthly and category budgets and receive timely alert notifications.
5. Users can establish and monitor savings goals with real-time percentage indicators.
6. The dashboard displays accurate, visual financial analytics without latency.
7. Users can generate, customize, export (PDF/CSV), and print monthly and custom date-range reports.
8. Users can enable or disable optional AI financial analysis at their discretion.
9. All user data is securely isolated, encrypted, and protected against unauthorized access.

---

## 55. Requirement Priority (MoSCoW Framework)

### High Priority (Must-Have Core MVP)
- User Authentication & Profile Security
- Financial Dashboard & Analytics Cards
- Manual Income & Expense Logging
- Custom Categories Management
- Monthly & Category Budgets
- Recurring Transaction Scheduler
- Savings Goal Progress Tracker
- Monthly Financial Reports & PDF Export

### Medium Priority (Should-Have Enhancements)
- Receipt OCR Upload and Extraction Pipeline
- Voice-Assisted Transaction Input
- In-App Budget Threshold Notifications
- Custom Date-Range Reporting
- Dashboard Widget Customization
- Multi-Currency Support

### Advanced / Optional (Could-Have Innovations)
- AI Financial Spending Pattern Analysis
- Spending Anomaly Detection
- Predictive Budget Recommendations

---

## 56. Requirement-to-Problem Mapping

| Identified Problem | Proposed System Solution |
| :--- | :--- |
| Manual transaction entry is tedious and error-prone | Receipt OCR and Voice Input processing |
| Raw transaction lists are difficult to understand | Visual Dashboard with dynamic charts and indicators |
| Users lose track of daily spending velocity | Real-time balance calculations and category summaries |
| Users unintentionally exceed budget limits | Automated budget threshold warnings and alerts |
| Recurring expenses and bills are easily forgotten | Automated recurring transaction scheduler |
| Tracking long-term savings is disorganized | Visual savings goal progress tracker |
| Historical spending is difficult to evaluate | Automated monthly and custom date-range reports |
| Users need printable records for audits or grants | Built-in PDF export and print formatting |
| Automated recognition can make mistakes | Strict user review, validation, and manual override screen |
| Users seek deeper insights into spending habits | Optional, non-intrusive AI spending analysis |
| Financial data is private and sensitive | Strong password hashing, JWT sessions, and tenant isolation |

---

## 57. High-Level System Architecture

```
+-------------------------------------------------------------------------+
|                                USER                                     |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                        PRESENTATION LAYER (UI)                          |
|  - Financial Dashboard           - Manual Expense / Income Forms        |
|  - Budget & Savings Views        - Receipt Camera / Upload Component    |
|  - Report Generator View         - Voice Dictation Microphone Interface |
+-------------------------------------------------------------------------+
                                    | HTTPS / REST API
                                    v
+-------------------------------------------------------------------------+
|                       APPLICATION SERVICES LAYER                        |
|  - Authentication Service (JWT / Bcrypt)                                |
|  - Transaction Management Service                                       |
|  - Budget & Alert Engine                                                |
|  - Recurring Scheduler Service                                          |
|  - Report Generation & PDF Export Engine                                |
+-------------------------------------------------------------------------+
               |                                            |
               v                                            v
+-----------------------------+              +----------------------------+
|    AI & AUTOMATION CORE     |              |     PERSISTENCE LAYER      |
|  - OCR Engine (Receipts)    |              |  - PostgreSQL Database     |
|  - Speech-to-Text & NLP     |              |  - Relational Schema       |
|  - Optional AI Insights     |              |  - ACID Compliant          |
+-----------------------------+              +----------------------------+
```

---

## 58. Example Complete User Scenario

1. **Recurring Income:** On the 1st of the month, the recurring scheduler records the user's monthly salary of 6,000 SAR. The dashboard updates total cash available.
2. **Shopping & Receipt Logging:** The user shops at a supermarket and spends 145 SAR. Rather than typing in each detail, the user opens Super Budgeting on their mobile browser and uploads a photo of the receipt.
3. **OCR Processing & Review:** The OCR engine extracts the merchant (*"Panda Supermarket"*), amount (*145 SAR*), and date. The interface displays this in an edit modal.
4. **User Correction & Confirmation:** The user notices the category was suggested as *"General Shopping"*. The user changes it to *"Groceries"* and clicks **Confirm**.
5. **Budget Impact:** The transaction is saved. The Groceries budget instantly updates from 650 SAR to 795 SAR spent out of an 800 SAR monthly limit.
6. **Threshold Warning Triggered:** Because spending has reached 99.4% of the category limit, the system immediately displays an amber warning badge on the dashboard: *"Groceries budget is at 99%. Only 5 SAR remaining."*
7. **Reporting & Archiving:** At the end of the month, the user generates a monthly financial report, reviews the charts and savings goal progress, and exports a PDF for their personal records.

---

## 59. Core Design Principle

> **"Automate the work, visualize the information, and keep the user in control."**
> 
> Automation reduces human effort. Visualization eliminates financial confusion. AI provides helpful suggestions. But the user always remains the final authority over their personal financial records and decisions.

---

## 60. One-Paragraph Project Summary

Super Budgeting is a web-based personal financial management system designed to help users manage and understand their finances through a professional customizable dashboard, transaction management, budgeting, savings goals, recurring transactions, notifications, reporting, and optional AI assistance. The system allows users to manually enter transactions or use receipt OCR and voice input to reduce repetitive data entry. Automatically extracted information is shown to the user for review and editing before it is saved. Users can create monthly and category budgets, monitor spending, set savings goals, receive notifications, and generate monthly or custom-period reports that can be exported and printed. Optional AI analysis identifies financial patterns and provides insights when enabled by the user. The system will not connect directly to bank accounts in the initial version, and users retain full control over their financial information and decisions.

---

## 61. Short Presentation Description

Super Budgeting is a web-based personal financial management system that works like a digital financial secretary. It helps users record income and expenses, manage budgets and savings goals, track recurring transactions, and understand their finances through a professional dashboard. Users can enter transactions manually, scan receipts using OCR, or use voice input. Optional AI can analyze spending and provide insights. The system also generates monthly and custom financial reports that users can export or print. The main idea is to reduce repetitive work, make financial information easier to understand, and keep the user in control.

---

## 62. References

1. **Consumer Financial Protection Bureau.** *Consumer Insights on Managing Spending.*  
   Available at: [https://www.consumerfinance.gov/data-research/research-reports/consumer-insights-managing-spending/](https://www.consumerfinance.gov/data-research/research-reports/consumer-insights-managing-spending/)
2. **Consumer Financial Protection Bureau.** *Why Financial Well-Being?*  
   Available at: [https://www.consumerfinance.gov/consumer-tools/financial-well-being/about/](https://www.consumerfinance.gov/consumer-tools/financial-well-being/about/)
3. **Consumer Financial Protection Bureau.** *Financial Well-Being Scale.*  
   Available at: [https://www.consumerfinance.gov/data-research/research-reports/financial-well-being-scale/](https://www.consumerfinance.gov/data-research/research-reports/financial-well-being-scale/)
4. **OECD.** *OECD/INFE 2023 International Survey of Adult Financial Literacy.*  
   Available at: [https://www.oecd.org/en/publications/oecd-infe-2023-international-survey-of-adult-financial-literacy_56003a32-en.html](https://www.oecd.org/en/publications/oecd-infe-2023-international-survey-of-adult-financial-literacy_56003a32-en.html)
5. **Agile Manifesto.** *Manifesto for Agile Software Development.*  
   Available at: [https://agilemanifesto.org/](https://agilemanifesto.org/)
6. **Agile Manifesto.** *Principles behind the Agile Manifesto.*  
   Available at: [https://agilemanifesto.org/principles.html](https://agilemanifesto.org/principles.html)
7. **Atlassian.** *Agile Software Development Guide.*  
   Available at: [https://www.atlassian.com/agile/software-development/](https://www.atlassian.com/agile/software-development/)

---

## 63. Final Project Definition Summary

- **Project Name:** Super Budgeting System (SBS)
- **Platform:** Modern Web Application (Responsive across Mobile, Tablet, Desktop)
- **Primary Purpose:** Personal financial management and budgeting
- **Target User:** Individual consumers, students, freelancers, and salaried employees
- **Core Problem Addressed:** Repetitive manual data-entry friction and lack of visual clarity in personal money management
- **Core Solution:** Centralized dashboard, multi-modal logging (manual, OCR, voice), automated budgeting, recurring scheduler, savings tracker, and reports
- **Primary Automations:** Optical Character Recognition (OCR) for receipts and Speech-to-Text Natural Language Processing
- **AI Utilization:** Structured data extraction and optional spending trend analytics
- **Banking Integration:** Excluded from initial version for privacy and security
- **User Control Mandate:** Strict human-in-the-loop review and editing prior to data persistence
- **Reporting Capabilities:** Monthly and custom date ranges with PDF/CSV export and printer stylesheets
- **Currency Handling:** Native multi-currency support
- **Development Methodology:** Agile (2-week sprint cycles)
- **Key Development Stages:** Requirements, Analysis, Design, Implementation, Testing, Evaluation, Integration, and Demonstration
- **Core Design Maxim:** *"Automate repetitive work, visualize financial information, and keep the user in control."*
