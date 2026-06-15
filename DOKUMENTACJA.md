# Dokumentacja Projektu Accord Services

**Ostatnia aktualizacja:** czerwiec 2026  
**Wersja:** 1.2

---

## Spis treści

1. [Przegląd Projektu](#przegląd-projektu)
2. [Architektura Systemu](#architektura-systemu)
3. [Backend — Django](#backend--django)
4. [Frontend — Next.js](#frontend--nextjs)
5. [Technologie i Zależności](#technologie-i-zależności)
6. [Konfiguracja i Instalacja](#konfiguracja-i-instalacja)
7. [Przepływy Biznesowe](#przepływy-biznesowe)
8. [Zasoby i Kontakty](#zasoby-i-kontakty)

---

## Przegląd Projektu

### Cel Projektu

Accord Services to nowoczesna aplikacja webowa dla firmy zajmującej się usługami energetyczno-grzewczymi, działającej na rynku od **1984 roku w Opolu**. Projekt wspomaga działalność firmy poprzez:

- Prezentację oferty usług online
- Zarządzanie zapytaniami kontaktowymi od klientów
- System rezerwacji i wyceny usług
- Integrację z systemem poczty elektronicznej (Resend API)
- Dynamiczne strony lokalne dla SEO (`/uslugi/[service]/[city]`)
- Zarządzanie galerią zdjęć i realizacjami z panelu admin (Cloudinary)
- Szybki dostęp do danych kontaktowych przez stronę QR

### Zakres Usług

Firma Accord Services oferuje cztery główne kategorie usług:

| Usługa | Opis | Korzyści |
|--------|------|---------|
| **Pompy Ciepła** | Ogrzewanie i chłodzenie domów | Oszczędność do 70%, dotacje rządowe |
| **Klimatyzacja** | Systemy split i multi-split | Inwertery, montaż, gwarancja |
| **Rekuperacja** | Wentylacja mechaniczna z odzyskiem | Odzysk ciepła do 95%, czyste powietrze |
| **Fotowoltaika** | Instalacje solarne | Darmowa energia, zwrot inwestycji |

### Główne Funkcjonalności

- ✅ Responsywna strona internetowa z sekcjami: Hero, O nas, Usługi, Proces, Kontakt
- ✅ Formularze kontaktowe i zapytania o wycenę
- ✅ Galeria zdjęć realizacji z lightboxem (react-image-gallery + Cloudinary)
- ✅ Karuzela realizacji na stronie głównej i stronach lokalnych
- ✅ Panel administracyjny Django
- ✅ REST API do zarządzania kontaktami, galerią i realizacjami
- ✅ System wysyłania e-maili przez Resend API (fallback: SMTP Gmail)
- ✅ Zarządzanie odbiorcami e-mail z panelu admin (model `EmailRecipient`)
- ✅ Dynamiczne strony lokalne (`/uslugi/[service]/[city]`) z ISR (revalidate: 24h)
- ✅ Dynamiczny sitemap z uwzględnieniem stron lokalnych z API
- ✅ SEO: Schema.org (HVACBusiness, Service, BreadcrumbList, WebSite)
- ✅ Google Analytics (GA4)
- ✅ Strona QR z linkami do kontaktu, mapy i Google Reviews
- ✅ Animacje wejścia/wyjścia elementów przy scrollowaniu (`FadeIn`)
- ✅ Wsparcie mobilne (mobile-first design)

---

## Architektura Systemu

### Architektura Ogólna

```
┌─────────────────────────────────────────────────────────────────┐
│                      Frontend (Next.js 16)                       │
│  - React 19, TypeScript, TailwindCSS, Shadcn/ui                 │
│  - Pages: /, /uslugi/*, /uslugi/[service]/[city], /qr           │
│  - Rewrites: /admin/* /static/* /media/*                        │
│             /api/gallery/* /api/realizations/* → Backend         │
└──────────────────────────────┬──────────────────────────────────┘
                               │ REST API / proxy
                    (http://localhost:8000 / Render URL)
                               │
┌──────────────────────────────┴──────────────────────────────────┐
│                      Backend (Django 6.0)                        │
│  - REST Framework, CORS Headers, Whitenoise                     │
│  - Gunicorn (WSGI) — produkcja                                   │
│  - Uvicorn (ASGI) — alternatywa dev                             │
└──────────────┬──────────────────────────────┬───────────────────┘
               │                              │
     PostgreSQL / SQLite              Resend API / SMTP Gmail
     (Neon na produkcji)              (powiadomienia e-mail)
               │
        Cloudinary
  (galeria zdjęć, realizacje)
```

### Stack Techniczny

**Backend:**
- Python 3.13+
- Django 6.0.2
- Django REST Framework 3.16
- Django CORS Headers 4.9
- Cloudinary 1.44 + django-cloudinary-storage 0.3
- Gunicorn 26 (produkcja)
- Uvicorn 0.41 (dev/ASGI)
- Whitenoise 6.12 (pliki statyczne)
- Resend 2.30 (e-mail)
- psycopg 3 (PostgreSQL)
- uv (zarządzanie środowiskiem i zależnościami)

**Frontend:**
- Next.js 16.1.6
- React 19.2.3
- TypeScript 5.7.3
- TailwindCSS 3.4.17
- Shadcn/ui (Radix UI)
- react-image-gallery 2.1.2

**Bazy Danych:**
- PostgreSQL (Neon) — produkcja
- SQLite3 — lokalne środowisko deweloperskie (fallback)

**Storage:**
- Cloudinary — zdjęcia galerii i realizacji (zarządzane z Django Admin)

---

## Backend — Django

### Struktura Katalogów

```
accord/                          # Konfiguracja projektu Django
├── settings.py                  # Ustawienia projektu
├── urls.py                      # Routing główny
├── asgi.py
└── wsgi.py

contact/                         # Aplikacja zarządzania kontaktami
├── models.py                    # Contact, ContactStatus, EmailRecipient
├── admin.py
├── api/
│   ├── views.py
│   ├── serializers.py
│   └── urls.py
└── utils/
    ├── parse_contact.py
    ├── send_mail.py
    └── decorators/
        └── login_required_for_methods.py

gallery/                         # Aplikacja galerii zdjęć (Cloudinary)
├── models.py                    # GalleryImage
├── admin.py
└── api/
    ├── views.py
    ├── serializers.py
    └── urls.py

realization/                     # Aplikacja realizacji
├── models.py                    # Realization
├── admin.py
└── api/
    ├── views.py
    ├── serializers.py
    └── urls.py

chatai/                          # Aplikacja AI (przygotowana, niezaimplementowana)
```

### Modele Danych

#### Model: ContactStatus

```python
class ContactStatus(models.Model):
    name = models.CharField(max_length=50)
```

Domyślny status tworzony automatycznie: `nowy`.

---

#### Model: Contact

```python
class Contact(models.Model):
    SERVICE_CHOICES = (
        ('pompy', 'Pompy Ciepła'),
        ('klimatyzacja', 'Klimatyzacja'),
        ('rekuperacja', 'Rekuperacja'),
        ('fotowoltaika', 'Fotowoltaika'),
        ('serwis', 'Serwis')
    )

    full_name    = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=25, unique=True)  # regex
    email        = models.EmailField(unique=True)
    services     = models.CharField(max_length=50, choices=SERVICE_CHOICES, default='pompy')
    description  = models.TextField(blank=True, null=True)
    status       = models.ForeignKey(ContactStatus, on_delete=models.PROTECT)
    createdAt    = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-createdAt']
```

---

#### Model: EmailRecipient

```python
class EmailRecipient(models.Model):
    email     = models.EmailField(unique=True)
    name      = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Odbiorca e-mail"
        verbose_name_plural = "Odbiorcy e-mail"
```

Zarządzanie odbiorcami odbywa się z Django Admin → **Odbiorcy e-mail**.

---

#### Model: GalleryImage

```python
class GalleryImage(models.Model):
    image      = CloudinaryField('image')
    service    = models.CharField(max_length=50, choices=GalleryService.choices)
    order      = models.PositiveIntegerField(default=0)
    is_active  = models.BooleanField(default=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['service', 'order']
```

**Dostępne wartości `service`:** `pompy`, `klimatyzacja`, `rekuperacja`, `fotowoltaika`, `o-nas`

Zarządzanie w panelu admin: edycja `order` i `is_active` inline (list_editable).

---

#### Model: Realization

```python
class Realization(models.Model):
    title        = models.CharField(max_length=255)
    city         = models.CharField(max_length=100)
    city_slug    = models.SlugField(max_length=100)
    service      = models.CharField(max_length=50, choices=SERVICE_CHOICES)
    description  = models.TextField()
    device_model = models.CharField(max_length=255, blank=True)
    area_m2      = models.IntegerField(blank=True, null=True)
    cover_image  = CloudinaryField('image')
    is_published = models.BooleanField(default=True)
    created_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
```

`city_slug` jest auto-wypełniany z pola `city` w panelu admin (`prepopulated_fields`).

---

### REST API

#### Kontakty — `GET /api/contacts`
**Autentykacja:** Wymagana (login)  
**Odpowiedź 200:** Lista obiektów Contact  
**Odpowiedź 204:** Brak kontaktów

#### Kontakty — `POST /api/contacts`
**Autentykacja:** Nie wymagana  
**Body:** `full_name`, `phone_number`, `email`, `services`, `description`  
**Odpowiedź 201:** Utworzony obiekt Contact  
**Odpowiedź 400:** Błąd walidacji (duplikat e-mail lub telefon)

Po zapisaniu e-mail wysyłany jest asynchronicznie w osobnym wątku (`threading.Thread`).

#### Kontakty — `GET /api/contacts/<id>/`
**Autentykacja:** Wymagana

#### Kontakty — `DELETE /api/contacts/<id>/`
**Autentykacja:** Wymagana

---

#### Galeria — `GET /api/gallery`
**Autentykacja:** Nie wymagana  
**Parametry:** `?service=pompy|klimatyzacja|rekuperacja|fotowoltaika|o-nas`  
**Odpowiedź 200:**
```json
[
  { "id": 1, "image_url": "https://res.cloudinary.com/...", "service": "pompy", "order": 0 }
]
```

---

#### Realizacje — `GET /api/realizations`
**Autentykacja:** Nie wymagana  
**Parametry:** `?service=...&city_slug=...&limit=...`  
**Odpowiedź 200:**
```json
[
  {
    "id": 1,
    "title": "Pompa ciepła Opole",
    "city": "Opole",
    "city_slug": "opole",
    "service": "pompy",
    "description": "...",
    "device_model": "Daikin 9kW",
    "area_m2": 120,
    "cover_image_url": "https://res.cloudinary.com/...",
    "created_at": "2026-06-10T22:49:00Z"
  }
]
```

---

#### Health Check — `GET /health/`
**Odpowiedź 200:** `{"status": "ok"}`

---

### System E-mail

Plik: `contact/utils/send_mail.py`

**1. Resend API** (produkcja)  
Aktywny gdy `RESEND_API_KEY` jest ustawiony. Wysyła HTML z `kontakt@accord.opole.pl` z `reply_to` ustawionym na e-mail nadawcy formularza.

**2. SMTP Gmail** (fallback)  
Używany gdy brak `RESEND_API_KEY`. Host: `smtp.gmail.com`, port: 587, TLS.

**Odbiorcy** pobierani dynamicznie z bazy:
```python
def get_recipients():
    return list(
        EmailRecipient.objects.filter(is_active=True)
        .values_list('email', flat=True)
    )
```

---

### Konfiguracja Django — kluczowe elementy

```python
# Baza danych
DATABASES = build_database_config()
# DATABASE_URL ustawiony → PostgreSQL (z opcjonalnym sslmode)
# Brak → SQLite (db.sqlite3)

# Cloudinary
CLOUDINARY_STORAGE = {
    'CLOUD_NAME': os.getenv('CLOUDINARY_CLOUD_NAME'),
    'API_KEY': os.getenv('CLOUDINARY_API_KEY'),
    'API_SECRET': os.getenv('CLOUDINARY_API_SECRET')
}
DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

# Pliki statyczne
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STORAGES = {
    'staticfiles': {'BACKEND': 'whitenoise.storage.CompressedManifestStaticFilesStorage'},
}

# CORS
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://www.accord.opole.pl",
    ...
]
```

---

### Dekorator: login_required_for_methods

Pozwala wymagać autentykacji tylko dla wybranych metod HTTP:

```python
@login_required_for_methods(['GET'])
@api_view(['GET', 'POST'])
def contacts_view(request):
    ...
```

Nieautentykowane żądania `GET` są przekierowywane do `/admin/`.

---

## Frontend — Next.js

### Struktura Katalogów

```
frontend/
├── app/
│   ├── layout.tsx              # Layout (Header, Footer, Toaster, GA)
│   ├── page.tsx                # Strona główna
│   ├── globals.css
│   ├── sitemap.ts              # Dynamiczny sitemap XML
│   ├── robots.ts               # robots.txt
│   │
│   ├── uslugi/
│   │   ├── [service]/[city]/
│   │   │   ├── page.tsx        # Dynamiczne strony lokalne (ISR)
│   │   │   └── loading.tsx     # Skeleton loader
│   │   ├── pompy-ciepla/page.tsx
│   │   ├── klimatyzacja/page.tsx
│   │   ├── rekuperacja/page.tsx
│   │   └── fotowoltaika/page.tsx
│   │
│   ├── qr/page.tsx
│   └── actions/contact.ts      # Server Action
│
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx        # Zawiera RealizationsGrid
│   ├── ServicesSection.tsx
│   ├── ProcessSection.tsx
│   ├── ContactSection.tsx
│   ├── ScrollingServices.tsx
│   ├── Forms/ContactForm.tsx
│   ├── Services/
│   │   ├── ServicePage.tsx
│   │   ├── LocalServicePage.tsx
│   │   ├── PhotoGallery.tsx    # react-image-gallery + Cloudinary
│   │   └── types.ts
│   ├── Realizations/
│   │   ├── RealizationsCarousel.tsx  # Karuzela z fetch /api/realizations
│   │   └── type.ts
│   ├── fx/FadeIn.tsx
│   └── ui/                     # Shadcn/ui komponenty
│
├── hooks/
│   ├── use-in-view.ts
│   ├── use-mobile.tsx
│   ├── use-toast.ts
│   └── use-gallery.ts          # Hook fetchujący /api/gallery
│
├── lib/
│   ├── navLinks.ts
│   ├── types.ts
│   ├── utils.ts
│   ├── statsArray.ts
│   ├── aboutImages.ts
│   └── localPages.ts           # CITIES, SERVICES, SERVICE_MAP, LABELS
│
├── api/
│   ├── api.ts                  # postContact()
│   └── types.ts
│
└── utils/
    └── findGalleryCandidates.ts  # Lokalne zdjęcia (build-time)
```

---

### Strony i Routing

| Ścieżka | Opis |
|---------|-------|
| `/` | Strona główna — wszystkie sekcje + karuzela realizacji |
| `/uslugi/pompy-ciepla` | Szczegóły usługi |
| `/uslugi/klimatyzacja` | Szczegóły usługi |
| `/uslugi/rekuperacja` | Szczegóły usługi |
| `/uslugi/fotowoltaika` | Szczegóły usługi |
| `/uslugi/[service]/[city]` | Dynamiczne strony lokalne (ISR 24h) |
| `/qr` | Strona QR — szybki dostęp |
| `/sitemap.xml` | Generowany dynamicznie |
| `/admin/*` | Proxy → Django admin |

---

### Dynamiczne Strony Lokalne (`/uslugi/[service]/[city]`)

Plik: `frontend/app/uslugi/[service]/[city]/page.tsx`

- `dynamicParams = true` — obsługa slugów spoza `generateStaticParams`
- `revalidate = 86400` — ISR, odświeżanie raz na dobę
- Przy buildzie generowane są strony dla kombinacji `SERVICES × CITIES` z `lib/localPages.ts`
- Dla nieznanych miast (`dynamicParams`) pobierana jest nazwa miasta z API (`/api/realizations/?city_slug=...&limit=1`)
- Strona wyświetla `LocalServicePage` z `RealizationsGrid` filtrowanym po mieście i usłudze

**Konfiguracja miast (hardcoded):**
```typescript
// lib/localPages.ts
export const CITIES = [
    { name: 'Opole', slug: 'opole' },
    { name: 'Ozimek', slug: 'ozimek' },
    // ... 10 miast województwa opolskiego
]
```

---

### Dynamiczny Sitemap

Plik: `frontend/app/sitemap.ts`

Łączy trzy źródła:
1. Strony statyczne (główna, 4 strony usług)
2. Hardcoded strony lokalne (`SERVICES × CITIES`)
3. Dynamiczne strony lokalne pobrane z `/api/realizations/` — nowe miasta z realizacji, których nie ma w hardcoded liście

---

### Karuzela Realizacji (`RealizationsCarousel`)

Plik: `frontend/components/Realizations/RealizationsCarousel.tsx`

- Pobiera dane z `/api/realizations/` (parametry: `citySlug`, `service`, `limit`)
- Używana w `AboutSection` (na stronie głównej) i `LocalServicePage`
- Karuzela z poziomym scrollem, przyciski nawigacji (desktop), snap scrolling
- Każda karta linkuje do `/uslugi/[service]/[city_slug]`

---

### Hook: useGallery

Plik: `frontend/hooks/use-gallery.ts`

```typescript
export default function useGallery(service?: string) {
    // fetchuje GET /api/gallery?service=...
    return { images, loading }
}
```

Używany w `PhotoGallery.tsx` gdy `service` jest podany (galeria z Cloudinary zamiast lokalnych plików).

---

### Komponenty Kluczowe

#### FadeIn (`components/fx/FadeIn.tsx`)

Animacja wejścia/wyjścia oparta na `IntersectionObserver`. Stany: `before`, `visible`, `above`, `exiting`.

#### PhotoGallery (`components/Services/PhotoGallery.tsx`)

- Jeśli podano `service` → galeria z Cloudinary (przez `useGallery`)
- Jeśli podano `images` (statyczne) → lokalne pliki z `public/`
- Domyślnie galeria jest **widoczna** (przycisk „Ukryj galerię")

#### LocalServicePage (`components/Services/LocalServicePage.tsx`)

Template dla stron lokalnych. Zawiera nagłówek z miastem i usługą, `RealizationsGrid` oraz Schema.org (`Service`, `BreadcrumbList`).

---

### SEO

**Schema.org w `layout.tsx`:** `HVACBusiness` z pełnymi danymi firmy.

**Schema.org na stronach usług:** `Service` z `areaServed` i `BreadcrumbList`.

**Schema.org na stronach lokalnych:** `Service` z `areaServed: City` i `BreadcrumbList` z 3 poziomami.

**Sitemap:** `sitemap.ts` generuje wpisy dla stron statycznych (priority 0.9–1.0), hardcoded lokalnych (0.7) i dynamicznych z API (0.6).

**robots.ts:** Blokuje `/qr`, `/admin/`, `/static/`, `/media/`, `/api/`.

---

### Rewrites w next.config.ts

```typescript
async rewrites() {
  return [
    { source: "/api/realizations/:path*", destination: `${backendUrl}/api/realizations/:path*` },
    { source: "/api/gallery/:path*",      destination: `${backendUrl}/api/gallery/:path*` },
    { source: "/admin/:path*",            destination: `${backendUrl}/admin/:path*` },
    { source: "/static/:path*",           destination: `${backendUrl}/static/:path*` },
    { source: "/media/:path*",            destination: `${backendUrl}/media/:path*` },
  ]
}
```

---

## Technologie i Zależności

### Backend

| Pakiet | Wersja | Cel |
|--------|--------|-----|
| Django | 6.0.2 | Framework webowy |
| djangorestframework | 3.16.1 | REST API |
| django-cors-headers | 4.9.0 | CORS support |
| cloudinary | 1.44.2 | SDK Cloudinary |
| django-cloudinary-storage | 0.3.0 | Storage backend |
| gunicorn | 26.0.0 | WSGI server |
| uvicorn | 0.41.0 | ASGI server |
| whitenoise | 6.12.0 | Pliki statyczne |
| resend | 2.30.1 | Wysyłanie e-maili |
| psycopg[binary] | 3.3.4 | Klient PostgreSQL |
| python-dotenv | 1.2.1 | Zmienne środowiskowe |

### Frontend

| Pakiet | Wersja | Cel |
|--------|--------|-----|
| next | 16.1.6 | React framework |
| react | 19.2.3 | UI library |
| typescript | 5.7.3 | Typy |
| tailwindcss | 3.4.17 | CSS framework |
| lucide-react | 0.544.0 | Ikony |
| react-image-gallery | 2.1.2 | Galeria zdjęć |
| @radix-ui/* | ^1.1+ | Komponenty UI |
| next-themes | 0.4.6 | Dark mode |
| @next/third-parties | ^16.2.7 | Google Analytics |

---

## Konfiguracja i Instalacja

### Wymagania Wstępne

- Python 3.13+
- Node.js 18+ (v20 rekomendowane)
- uv (`pip install uv` lub https://docs.astral.sh/uv/)
- Git

---

### Instalacja Backend-u

```bash
git clone https://github.com/ovezthaking/Accord-Services.git
cd Accord-Services
```

#### Przez uv (rekomendowane)

```bash
uv run python manage.py migrate
uv run python manage.py createsuperuser
uv run python manage.py runserver
```

#### Przez pip + venv

```bash
python -m venv .venv
source .venv/bin/activate    # Linux/Mac
.\.venv\Scripts\activate     # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Serwer dostępny: `http://localhost:8000`  
Admin: `http://localhost:8000/admin/`

---

### Instalacja Frontend-u

```bash
cd frontend
npm install
echo "BACKEND_URL=http://localhost:8000" > .env.local
npm run dev
```

Aplikacja dostępna: `http://localhost:3000`

---

### Dodanie Odbiorcy E-mail

`http://localhost:8000/admin/` → **Odbiorcy e-mail** → **Dodaj odbiorcę e-mail**

---

### Dodanie Zdjęć do Galerii

`http://localhost:8000/admin/` → **Zdjęcia galerii** → **Dodaj zdjęcie galerii**

Wymagane: plik zdjęcia (upload do Cloudinary), wybór usługi, numer kolejności.

---

### Dodanie Realizacji

`http://localhost:8000/admin/` → **Realizacje** → **Dodaj realizację**

Wymagane: tytuł, miasto (slug auto-wypełniany), usługa, opis, zdjęcie główne.

---

### Build dla Produkcji

**Backend:**
```bash
uv run python manage.py collectstatic --noinput
uv run gunicorn accord.wsgi:application --bind 0.0.0.0:8000
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

---

### Zmienne Środowiskowe

**Backend (`.env`):**

| Zmienna | Wymagana | Opis |
|---------|----------|------|
| `SECRET_KEY` | ✅ produkcja | Tajny klucz Django |
| `DEBUG` | — | `True` (dev) / `False` (produkcja) |
| `DATABASE_URL` | ✅ produkcja | URL PostgreSQL |
| `DB_SSLMODE` | — | np. `require` dla Neon/Render |
| `RESEND_API_KEY` | ✅ produkcja | Klucz API Resend |
| `EMAIL_PASSWORD` | — | Hasło aplikacji Gmail (fallback SMTP) |
| `CLOUDINARY_CLOUD_NAME` | ✅ | Nazwa konta Cloudinary |
| `CLOUDINARY_API_KEY` | ✅ | Klucz API Cloudinary |
| `CLOUDINARY_API_SECRET` | ✅ | Secret Cloudinary |
| `RENDER_EXTERNAL_HOSTNAME` | — | Ustawiane automatycznie przez Render |

**Frontend (`.env.local`):**

| Zmienna | Opis |
|---------|------|
| `BACKEND_URL` | URL backendu Django (domyślnie `http://localhost:8000`) |

---

### Deployment — Render (Backend)

| Pole | Wartość |
|------|---------|
| **Build Command** | `pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput` |
| **Start Command** | `gunicorn accord.wsgi:application` |

Zmienne środowiskowe: wszystkie z tabeli powyżej.

### Deployment — Vercel (Frontend)

Zmienna środowiskowa: `BACKEND_URL` → adres backendu z Rendera.

---

## Przepływy Biznesowe

### Przepływ 1: Wysyłanie Zapytania Kontaktowego

```
Użytkownik wypełnia formularz kontaktowy
        ↓
Frontend (Next.js):
  - submit → Server Action sendContactAction
  - POST /api/contacts
        ↓
Backend (Django):
  - walidacja DRF (unikalność e-mail, telefon, regex)
  - zapis do bazy (Contact, status="nowy")
  - uruchomienie wątku e-mail (Thread)
        ↓
E-mail (asynchronicznie):
  - Resend API lub SMTP Gmail
  - odbiorcy: aktywni EmailRecipient z bazy
        ↓
Frontend:
  - toast "Dziękujemy, odezwiemy się wkrótce"
```

---

### Przepływ 2: Wyświetlanie Galerii na Stronie Usługi

```
/uslugi/[service]
        ↓
ServicePage renderuje PhotoGallery z prop `service`
        ↓
useGallery hook:
  - fetch GET /api/gallery?service=[service]
  - Next.js rewrite → backend Django
        ↓
Backend zwraca JSON z URL Cloudinary
        ↓
PhotoGallery wyświetla react-image-gallery
```

---

### Przepływ 3: Wyświetlanie Realizacji

```
Strona główna / strona lokalna
        ↓
RealizationsCarousel:
  - fetch GET /api/realizations?[filters]
  - Next.js rewrite → backend Django
        ↓
Backend zwraca JSON z cover_image_url (Cloudinary)
        ↓
Karuzela z linkami do /uslugi/[service]/[city_slug]
```

---

### Przepływ 4: Strona Lokalna (SEO)

```
/uslugi/pompy-ciepla/opole
        ↓
Next.js ISR (revalidate: 86400):
  1. Sprawdza CITIES — jeśli znane miasto, używa nazwy
  2. Jeśli nieznane → getCityFromAPI() → /api/realizations/?city_slug=...
  3. Jeśli miasto nie istnieje → notFound()
        ↓
LocalServicePage:
  - nagłówek: "[Usługa] [Miasto]"
  - RealizationsGrid z filtrami
  - Schema.org: Service + BreadcrumbList
```

---

### Przepływ 5: Sitemap

```
GET /sitemap.xml
        ↓
sitemap.ts (Next.js):
  1. Statyczne strony (/, /uslugi/*)
  2. SERVICES × CITIES (hardcoded)
  3. getDynamicLocalPages():
     - fetch /api/realizations/ z backendu
     - filtruje miasta spoza hardcoded listy
     - zwraca unikalne pary [service, city_slug]
        ↓
Łączny sitemap z priorytetami i changeFrequency
```

---

### Przepływ 6: Zarządzanie Treścią (Admin)

```
Administrator → /admin/
    ├── contact/contact/           # Zapytania klientów
    ├── contact/contactstatus/     # Statusy zapytań
    ├── contact/emailrecipient/    # Odbiorcy e-mail
    ├── gallery/galleryimage/      # Zdjęcia galerii (Cloudinary)
    └── realization/realization/   # Realizacje (Cloudinary)
```

---

## Zasoby i Kontakty

### Kontakt Firmy

| Informacja | Wartość |
|-----------|---------|
| **Firma** | F.U.H. Accord Service |
| **Lokalizacja** | ul. Opolska 27, 46-024 Masów, woj. opolskie |
| **Założona** | 1984 r. |
| **Telefon** | +48 601 47 55 47 |
| **Telefon 2** | +48 783 636 363 |
| **Email** | accordservice@interia.pl |
| **Strona** | https://www.accord.opole.pl |

### Linki Projektu

| Zasób | URL |
|-------|-----|
| Strona główna (produkcja) | https://www.accord.opole.pl |
| Panel Admin | /admin/ |
| API Kontakty | /api/contacts |
| API Galeria | /api/gallery |
| API Realizacje | /api/realizations |
| Health Check | /health/ |
| Repo GitHub | https://github.com/ovezthaking/Accord-Services |

### Dokumentacja Technologiczna

- [Django](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Next.js](https://nextjs.org/docs)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Resend](https://resend.com/docs)
- [Cloudinary Python SDK](https://cloudinary.com/documentation/django_integration)
- [uv](https://docs.astral.sh/uv/)
- [Gunicorn](https://docs.gunicorn.org/)

---

## Uwagi i TODO

### TODO / Przyszłe Usprawnienia

- **ChatAI** — aplikacja `chatai` jest przygotowana w strukturze projektu; brak implementacji
- **Refaktoring modelu `Contact`** — wydzielenie `services` do osobnego modelu
- **Integracja CRM** — zewnętrzny system zarządzania klientami
- **Scheduling** — system rezerwacji terminów online
- **System ocen** — opinie klientów na stronie

### Bezpieczeństwo

⚠️ **Ważne przed deploymentem na produkcję:**

- `DEBUG = False`
- `SECRET_KEY` wyłącznie w zmiennych środowiskowych
- `ALLOWED_HOSTS` zawiera domenę produkcyjną
- CORS skonfigurowany dla właściwych domen
- `RESEND_API_KEY` ustawiony
- Cloudinary skonfigurowane (`CLOUD_NAME`, `API_KEY`, `API_SECRET`)
- Baza PostgreSQL z `sslmode=require`
- `SESSION_COOKIE_SECURE = True` i `CSRF_COOKIE_SECURE = True` (już ustawione)

### Performance

- TailwindCSS — purged CSS
- Next.js Turbopack — szybsza kompilacja w trybie dev
- Whitenoise z `CompressedManifestStaticFilesStorage`
- E-mail wysyłany asynchronicznie (osobny wątek)
- ISR na stronach lokalnych (revalidate: 24h)
- Sitemap z dynamicznym generowaniem stron z API
- `findGalleryCandidates` — wykonuje się raz przy buildzie (lokalne zdjęcia fallback)

---

**Data aktualizacji:** czerwiec 2026  
**Wersja:** 1.2
