# Translation Update - Backend Multilingual Support

## Overview
Updated the application to use backend-provided translations instead of frontend i18n translation files. The backend now provides language-specific fields for each entity (hotels, destinations, articles, packages).

## Changes Made

### 1. API Types (`src/lib/api.ts`)

#### Added Translation Fields to Interfaces:
- **Hotel** interface: Added `name_en`, `name_ar`, `name_cn`, `name_fr`, `name_es`, `description_en`, `description_ar`, `description_cn`, `description_fr`, `description_es`
- **Destination** interface: Added same translation fields for name and description
- **Article** interface: Added `title_*` and `content_*` translation fields
- **Package** interface: Added `name_*` and `description_*` translation fields

#### Translation Helper Functions:
```typescript
// General function to get translated field
getTranslatedField(item, fieldName, language): string

// Entity-specific helper functions
getHotelTranslation(hotel, language)
getDestinationTranslation(destination, language)
getArticleTranslation(article, language)
getPackageTranslation(pkg, language)
```

#### Language Mapping:
- `en` → `_en` suffix
- `id` → no suffix (default/base field)
- `ar` → `_ar` suffix
- `zh` → `_cn` suffix (Chinese)
- `fr` → `_fr` suffix
- `es` → `_es` suffix

### 2. Hotel Components Updated

#### `src/components/home/HotelSection.tsx`
- Added `useTranslation` hook to get current language
- Import `getHotelTranslation` helper
- Get translated name for each hotel in map function:
  ```typescript
  const translation = getHotelTranslation(hotel, i18n.language);
  // Use: translation.name, translation.description
  ```

#### `src/app/hotels/page.tsx`
- Same approach as HotelSection
- Hotel cards display translated names

#### `src/components/hotel/Content.tsx`
- Hotel detail page content
- Shows translated description
- Uses `getHotelTranslation` for current language

### 3. Next Steps for Complete Implementation

#### Remaining Components to Update:

**Destinations:**
- `src/components/home/DiscoverSection.tsx`
- `src/app/place/page.tsx`
- `src/components/place/Content.tsx`
- `src/components/place/Carousel.tsx`

**Articles:**
- `src/components/home/NewsSection.tsx`
- `src/app/articles/page.tsx`
- `src/components/article/Content.tsx`

**Packages:**
- `src/components/home/PackageSection.tsx`
- `src/app/packages/page.tsx`
- `src/components/package/Content.tsx`

#### Pattern to Follow:
```typescript
import { useTranslation } from 'react-i18next';
import { get[Entity]Translation } from '@/lib/api';

// In component:
const { i18n } = useTranslation();
const translation = get[Entity]Translation(item, i18n.language);

// Use translation.name or translation.description or translation.title
```

## Backend Response Example

```json
{
  "hotel_id": 18,
  "name": "Labuannnn",
  "description": "hotel labuan",
  "name_en": "Labuannnn",
  "name_ar": "لا يوجد ترجمة ضرورية، النص الأصلي هو: Labuannnn",
  "name_cn": "Labuannnn",
  "name_fr": "Labuannnn",
  "name_es": "Labuannnn",
  "description_en": "Labuan Hotel",
  "description_ar": "فندق لابوان",
  "description_cn": "拉布安酒店",
  "description_fr": "hôtel Labuan",
  "description_es": "hotel de Labuan"
}
```

## Benefits
1. **Centralized translations**: All translations managed in backend
2. **Consistent updates**: Change once in backend, reflects everywhere
3. **Better SEO**: Can serve language-specific content from server
4. **Reduced frontend bundle**: No large translation JSON files
5. **Dynamic content**: Translations for dynamic content (user-generated, admin-managed)

## Testing
1. Switch language using the language selector
2. Verify hotel names and descriptions change accordingly
3. Check fallback to Indonesian (base fields) works
4. Verify all supported languages: EN, ID, AR, ZH, FR, ES
