---
inclusion: always
---

# UI/UX Design System — DLL Alumni Platform

## Brand Identity

The DLL Alumni platform serves an academic institution. The design should feel **modern, professional, trustworthy, and community-oriented** — not like a generic SaaS admin template.

## Color Palette

Matching the existing DLL Alumni color scheme:

### Primary Colors

| Name | Value | Usage |
|------|-------|-------|
| Primary | `#3C50E0` | Interactive elements, links, selected states, primary buttons |
| Secondary | `#80CAEE` | Secondary accents, hover states, info badges |
| Accent / CTA | `#FFC700` | Call-to-action buttons, gold highlights, brand emphasis |

### Dark Theme (Public-facing pages)

| Name | Value | Usage |
|------|-------|-------|
| Dark BG Start | `#1E293B` (slate-800) | Gradient start (navbar, hero) |
| Dark BG Mid | `#0F172A` (slate-900) | Gradient middle |
| Dark BG End | `#020617` (slate-950) | Gradient end |

### Light Theme (Dashboard & Admin)

| Name | Value | Usage |
|------|-------|-------|
| Background | `#F1F5F9` (whiten) | Main content background |
| Surface | `#FFFFFF` | Cards, panels, modals |
| Border | `#E2E8F0` (stroke) | Dividers, card borders |

### Text Colors

| Name | Value | Usage |
|------|-------|-------|
| Heading | `#1C2434` (black) | Page titles, headings |
| Body | `#64748B` | Default body text |
| Muted | `#8A99AF` (bodydark2) | Secondary text, labels |
| Light (on dark) | `#DEE4EE` (bodydark1) | Text on dark backgrounds |
| Placeholder | `#AEB7C0` (bodydark) | Input placeholders |

### Status Colors

| Name | Value | Usage |
|------|-------|-------|
| Success | `#219653` | Success messages, approved badges |
| Danger | `#D34053` | Errors, delete actions, rejected badges |
| Warning | `#FFA70B` | Warnings, pending badges |
| Info | `#259AE6` (meta-5) | Information notices |

### Admin Dark Mode

| Name | Value | Usage |
|------|-------|-------|
| Dark Surface | `#24303F` (boxdark) | Cards in dark mode |
| Dark Background | `#1A222C` (boxdark-2) | Page background dark mode |
| Dark Border | `#2E3A47` (strokedark) | Borders in dark mode |
| Dark Input | `#1d2a39` (form-input) | Form inputs dark mode |

## Typography

### Font Family
- **Primary**: Satoshi (sans-serif) — loaded via `next/font/local`
- **Fallback**: Inter (Google Fonts via `next/font/google`)

### Type Scale

| Name | Size / Line Height | Usage |
|------|-------------------|-------|
| Display | 44px / 55px | Hero headlines |
| H1 | 36px / 45px | Page titles |
| H2 | 28px / 35px | Section headings |
| H3 | 24px / 30px | Card titles, subsections |
| H4 | 20px / 26px | Widget titles |
| Body | 16px / 24px | Default text |
| Small | 14px / 20px | Captions, metadata |
| XS | 12px / 16px | Badges, timestamps |

### Font Weights
- Regular (400): body text
- Medium (500): labels, navigation
- Semibold (600): subheadings, card titles
- Bold (700): page titles, hero text

## Component System (shadcn/ui)

### Configuration
shadcn/ui configured with custom CSS variables mapped to the brand palette. Using the "default" style with custom color overrides.

### Core Components Used

| Component | Usage |
|-----------|-------|
| Button | Primary, secondary, outline, ghost, destructive variants |
| Input | Text inputs, email, password, search |
| Textarea | Long text fields (descriptions, content) |
| Select | Dropdowns (course, category, status) |
| Dialog | Confirm actions, create/edit modals |
| Sheet | Mobile navigation drawer |
| Popover | Notification dropdown, filter panels |
| Dropdown Menu | User menu, action menus |
| Tabs | Job moderation tabs, settings sections |
| Table | Data tables (alumni, jobs, users, audit log) |
| Card | Content cards (jobs, events, announcements) |
| Badge | Status indicators (approved, pending, rejected) |
| Avatar | User avatars in header, directory, profiles |
| Skeleton | Loading placeholders |
| Toast | Success/error feedback messages |
| Form | React Hook Form integration |
| Separator | Visual dividers |
| Pagination | Table and list pagination |
| Command | Search/command palette |
| Calendar | Date picker for forms |
| Checkbox | Multi-select options |
| Switch | Toggle preferences |
| Progress | Upload progress |
| Accordion | FAQ, collapsible sections |

### Custom Shared Components

| Component | Description |
|-----------|-------------|
| PageHeader | Title + description + optional actions (breadcrumbs) |
| EmptyState | Icon + message + optional CTA for empty lists |
| LoadingState | Skeleton layout matching content structure |
| ErrorState | Error icon + message + retry action |
| ConfirmDialog | Destructive action confirmation with customizable text |
| DataTable | Sortable, filterable, paginated table wrapper |
| ImageUpload | Drag-and-drop image upload with preview |
| MetricCard | Dashboard stat card with value, label, trend indicator |
| ChartCard | Wrapper for Recharts charts with title and optional filters |
| NotificationBell | Bell icon + unread badge + dropdown |

## Layout Patterns

### Public Layout (Landing, News, Events)
```
┌──────────────────────────────────────┐
│  Dark Gradient Navbar (sticky)       │
│  [Logo] [Nav Links]     [Login/Reg]  │
├──────────────────────────────────────┤
│                                      │
│         Page Content                 │
│                                      │
├──────────────────────────────────────┤
│  Footer                              │
└──────────────────────────────────────┘
```

### Alumni Layout (Dashboard, Jobs, Profile)
```
┌──────────────────────────────────────┐
│  Header (sticky)                     │
│  [Logo] [Nav] [Bell] [Avatar Menu]   │
├──────────────────────────────────────┤
│                                      │
│   Content (max-width, centered)      │
│   bg: #F1F5F9                        │
│                                      │
├──────────────────────────────────────┤
│  Footer                              │
└──────────────────────────────────────┘
```

### Admin Layout
```
┌────────────┬─────────────────────────┐
│            │  Header                  │
│  Sidebar   │  [Search] [Dark] [Bell] │
│  (250px)   ├─────────────────────────┤
│  collaps-  │                         │
│  ible      │  Content Area           │
│            │  bg: #F1F5F9            │
│  [Menu     │                         │
│   Items]   │                         │
│            │                         │
└────────────┴─────────────────────────┘
```

## Responsive Breakpoints

| Breakpoint | Width | Behavior |
|-----------|-------|----------|
| Mobile | < 768px | Single column, hamburger menu, stacked cards, sheet navigation |
| Tablet | 768px - 1024px | Two columns where appropriate, condensed sidebar |
| Desktop | > 1024px | Full layout with sidebar, multi-column grids |

### Mobile Adaptations
- Navbar collapses to hamburger → Sheet (slide-out drawer)
- Admin sidebar collapses to icon-only or hamburger
- Data tables become scrollable horizontally or switch to card layout
- Multi-column grids become single column
- Dialog widths become full-screen on small screens
- Touch targets minimum 44px × 44px

## Interaction Patterns

### Loading States
- **Page load**: Skeleton loaders matching content structure
- **Action load**: Button shows spinner, disabled state
- **Data fetch**: Skeleton rows in tables, skeleton cards in grids
- **Image load**: Blur placeholder → loaded image (next/image)

### Empty States
- Centered illustration/icon
- Clear description of what would appear here
- CTA button if user can take action (e.g., "Post a Job", "Create Event")

### Error States
- Error icon + descriptive message
- "Try Again" button where retryable
- Inline form errors below the field (red text + border)

### Feedback
- Toast notifications for action results (success/error)
- Optimistic UI for toggles (save job, mark notification read)
- Form submission shows loading state on button

### Navigation
- Active nav item highlighted (primary color or bold weight)
- Breadcrumbs on nested pages (admin especially)
- Back buttons where context is deep

## Accessibility Standards

### Target: WCAG 2.1 Level AA

| Requirement | Implementation |
|-------------|---------------|
| Color Contrast | Text: ≥ 4.5:1 ratio, Large text: ≥ 3:1 |
| Keyboard Navigation | All interactive elements focusable and operable |
| Focus Indicators | Visible focus ring (primary color outline) on all focusable elements |
| ARIA Labels | All icon buttons, status indicators, and non-text elements labeled |
| Focus Trapping | Modals/dialogs trap focus within when open |
| Skip Navigation | "Skip to main content" link (visually hidden until focused) |
| Heading Hierarchy | Proper h1 → h2 → h3 nesting per page |
| Form Labels | Every input has an associated label (visible or sr-only) |
| Error Announcements | Form errors announced to screen readers (aria-live) |
| Alt Text | All meaningful images have descriptive alt text |
| Reduced Motion | Respect `prefers-reduced-motion` for animations |

### Focus Management
- On modal open: focus moves to first focusable element in modal
- On modal close: focus returns to trigger element
- On page navigation: focus moves to main content area
- Tab order follows visual order (no manual tabindex manipulation)

## Page-Specific Design Notes

### Landing Page
- Full dark gradient background for hero
- Yellow/gold decorative elements (geometric blocks)
- Large headline in yellow-500 + white tagline
- Gold CTA button
- Subsequent sections can alternate white/light gray backgrounds

### Admin Dashboard
- 4 metric cards at top (full-width row)
- Charts in 2-column grid below
- Cards have subtle shadows, rounded corners
- Dark mode support throughout

### Job Cards
- Company name, title, location, type, salary
- Category badges (pill-shaped)
- "Apply" / "Save" actions
- Posted date, applicant count

### Event Cards
- Poster image (16:9 aspect ratio)
- Title, dates, location
- Participant count badge
- "Join" / "Leave" action button

### Forms
- Multi-step forms show progress indicator (steps with labels)
- Clear section groupings with headings
- Inline validation messages
- Required field indicators (asterisk)
