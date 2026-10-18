# Dapper Draper 👔

**Dapper Draper** is a premium, full-featured e-commerce platform designed for luxury fabric purveyors. It offers a sophisticated shopping experience for menswear enthusiasts and a robust administrative suite for store management.

---

## 🚀 Tech Stack

- **Core**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling and [Framer Motion](https://www.framer.com/motion/) for premium animations.
- **UI Components**: [Radix UI](https://www.radix-ui.com/) (via [Shadcn UI](https://ui.shadcn.com/)) for accessible, high-quality components.
- **Data Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest) for efficient data fetching and caching.
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for type-safe validation.
- **Charts**: [Recharts](https://recharts.org/) for administrative data visualization.
- **Icons**: [Lucide React](https://lucide.dev/) for consistent, modern iconography.

---

## 🏗️ Architecture & Persistence

Dapper Draper is currently built as a **Serverless/Client-side** application. It uses a sophisticated local data management system to provide full functionality without a complex backend setup.

- **Data Layer**: Centralized in `src/lib/adminData.ts`, acting as a local CMS.
- **Persistence**: Utilizes **Browser LocalStorage** to store and retrieve data. Any changes made in the Admin Dashboard (adding products, updating orders, etc.) are saved locally to your browser.
- **State Management**: Uses **TanStack Query** for asynchronous data flow and **React Context** for global state like the shopping cart.

> [!NOTE]
> This architecture is ideal for prototyping and small-scale use. For production scaling, the `adminData.ts` functions can be easily adapted to interface with a REST or GraphQL API.


---

## 📂 Project Structure

### Frontend Pages
- **Home**: Featured collections, new arrivals, and brand story.
- **Shop**: Full catalog with filtering and sorting capabilities.
- **Product Detail**: Multi-image galleries, detailed specifications (composition, weight, origin), and related items.
- **Collections**: Organized fabric categories (Suiting, Shirting, Casual).
- **Cart**: Real-time shopping bag management with persistency.
- **About & Contact**: Brand information and lead generation forms.
- **Dynamic Pages**: CMS-driven pages for Shipping, Returns, and Policies.

### Admin Dashboard (`/admin`)
- **Overview**: Real-time sales metrics and order summaries.
- **Product CMS**: Create, edit, and archive products with inventory tracking.
- **Collection Management**: Organize store hierarchy and metadata.
- **Order Tracking**: Manage fulfillment status (Pending, Processing, Shipped, Delivered).
- **Customer CRM**: Database of customer history and lifetime value.
- **Content Editor**: Full Markdown/Rich Text editor for managing static site content.

---

## 📊 Data Schemas

The application uses a unified data layer (see `src/lib/adminData.ts`) for consistent state across the UI:

| Entity | Key Attributes |
| :--- | :--- |
| **Product** | `id`, `name`, `price`, `collection`, `status`, `inventory`, `images`, `composition`, `origin` |
| **Collection** | `id`, `slug`, `name`, `description`, `productCount`, `image`, `status` |
| **Order** | `id`, `customer`, `email`, `total`, `status`, `items`, `createdAt` |
| **Customer** | `id`, `name`, `email`, `orders`, `totalSpent`, `createdAt` |
| **ContentPage** | `id`, `title`, `slug`, `status`, `content`, `lastModified` |

---

## 🔄 User Flows

### Customer Journey
1. **Discovery**: Customer arrives on Home or Shop and uses filters to find specific fabrics.
2. **Selection**: Customer reviews detailed specifications and adds items to the Cart.
3. **Management**: Customer adjusts quantities or removes items in the persistent Cart.
4. **Engagement**: Customer contacts the brand or reads policies via dynamic content pages.

### Admin Workflow
1. **Inventory**: Admin logs in to update stock levels or add new seasonal collections.
2. **Operations**: Admin monitors incoming orders and updates fulfillment status.
3. **Analytics**: Admin reviews dashboard charts to identify top-performing products.
4. **Maintenance**: Admin updates shipping policies or "About Us" content via the CMS.

---

## 🛠️ How to Run

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    # or
    bun install
    ```
3.  **Start the development server**:
    ```bash
    npm run dev
    # or
    bun dev
    ```
4.  **Build for production**:
    ```bash
    npm run build
    ```

---

## 🎨 Design Philosophy

Dapper Draper focuses on **Luxury & Precision**. The UI utilizes a minimalist "Editorial" aesthetic:
- High-contrast typography (Inter/Sans-serif stack).
- Subtle micro-interactions and page transitions via Framer Motion.
- Responsive design optimized for both desktop browsers and high-end mobile devices.
- Focus on high-resolution imagery and technical fabric details.
