# Skip Hire

## Project Overview

This app provides a complete skip hire selection experience with interactive and comparison viewing modes, real-time data fetching, and comprehensive error handling. The interface adapts across mobile, tablet, and desktop devices while maintaining performance and accessibility standards.

## Architecture Approach

### Component Structure

The app follows a modular architecture pattern with clear separation of concerns:

**Core Components:**

- `SkipSelector.tsx` - Main orchestrator component managing state and data flow
- `InteractiveView.tsx` - Handles mobile, tablet, and desktop interactive selection layouts
- `ComparisonView.tsx` - Manages mobile card layout and desktop table comparison view
- `SelectedSkipPanel.tsx` - Reusable component for displaying skip details and continue actions

**Supporting Components:**

- `ErrorState.tsx` - Centralized error handling with retry functionality
- `SuccessModal.tsx` - Animated confirmation modal with backdrop
- `FloatingContinue.tsx` - Smart floating action button with scroll detection

### State Management

The application uses Zustand for lightweight, type-safe state management with the following store structure:

```typescript
interface SkipStore {
  selectedSkip: Skip | null;
  setSelectedSkip: (skip: Skip) => void;
  clearSelection: () => void;
}
```

### Data Fetching Strategy

React Query implementation provides:

- Automatic caching with 5-minute stale time
- Background refetching capabilities
- Built-in retry logic (3 attempts)
- Loading and error state management
- Optimistic updates

### Responsive Design Philosophy

**Mobile-First Approach:**

- Vertical stack layout for optimal touch interaction
- Large touch targets with clear visual feedback
- Simplified navigation and reduced cognitive load

**Progressive Enhancement:**

- Tablet: Grid layout with improved visual hierarchy
- Desktop: Interactive scale visualization with hover effects
- Consistent functionality across all breakpoints

## Technical Implementation

### TypeScript Integration

Comprehensive type safety throughout the application:

```typescript
interface Skip {
  id: string;
  size: number;
  price_before_vat: number;
  vat: number;
  hire_period_days: number;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}
```

### Performance Optimizations

- Component memoization for expensive operations
- Efficient re-rendering through proper state management
- Optimized bundle size through modular architecture
- Smart loading states to maintain perceived performance

### Accessibility Features

- Semantic HTML structure with proper ARIA labels
- Keyboard navigation support
- Focus management for modal interactions
- High contrast color scheme support

## User Experience Features

### Interactive Selection Mode

- **Mobile**: Vertical card layout with clear pricing and feature display
- **Tablet**: 2x2 grid with scalable selection indicators
- **Desktop**: Visual scale representation with proportional sizing

### Comparison Mode

- **Mobile**: Detailed cards with feature comparison grid
- **Tablet**: Enhanced card layout with better spacing
- **Desktop**: Comprehensive table with sortable columns

### Smart Features

- **Toggle Selection**: Click same skip to deselect, different skip to select
- **Floating Continue**: Button follows scroll position when original is off-screen
- **Error Recovery**: Intelligent retry mechanisms with user feedback
- **Success Confirmation**: Animated modal with clear next steps

## Configuration

### Environment Variables

```bash
VITE_API_BASE_URL=https://app.wewantwaste.co.uk/api
NODE_ENV=development
```

### API Configuration

The application uses environment-aware API configuration with fallback:

```typescript
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://app.wewantwaste.co.uk/api";
```

## Installation and Setup

### Prerequisites

- Node.js 16 or higher
- npm or yarn package manager

### Installation Steps

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   ```bash
   cp .env.example .env
   ```

4. Start development server:

   ```bash
   npm run dev
   ```

### Build for Production

```bash
npm run build
```

## Development Guidelines

### Code Standards

- ESLint configuration for consistent code style
- Prettier for automated formatting
- TypeScript strict mode enabled
