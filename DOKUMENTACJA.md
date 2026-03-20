# Dokumentacja Projektu Accord Services

**Ostatnia aktualizacja:** 20 marca 2026  
**Wersja:** 1.0

---

## Spis treści

1. [Przegląd Projektu](#przegląd-projektu)
2. [Architektura Systemu](#architektura-systemu)
3. [Backend - Django](#backend---django)
4. [Frontend - Next.js](#frontend---nextjs)
5. [Technologie i Zależności](#technologie-i-zależności)
6. [Konfiguracja i Instalacja](#konfiguracja-i-instalacja)
7. [Przepływy Biznesowe](#przepływy-biznesowe)
8. [Zasoby i Kontakty](#zasoby-i-kontakty)

---

## Przegląd Projektu

### Cel Projektu

Accord Services to nowoczesna aplikacja webowa zainteresowania dla firmy zajmującej się usługami energetyczno-grzewczymi. Projekt wspomaga działalność firmy będącej na rynku od **1984 roku w Opolu** poprzez:

- Prezentację oferty usług online
- Zarządzanie zapytaniami kontaktowymi od klientów
- System rezerwacji i wyceny usług
- Integrację z systemem poczty elektronicznej

### Zakres Usług

Firma Accord Services oferuje cztery główne kategorie usług:

| Usługa | Opis | Korzyści |
|--------|------|---------|
| **Pompy Ciepła** | Ogrzewanie i chłodzenie domów | Oszczędność do 75%, dotacje rządowe |
| **Klimatyzacja** | Systemy split i multi-split | Inwertery, montaż, gwarancja |
| **Rekuperacja** | Wentylacja mechaniczna z odzyskiem | Odzysk ciepła do 95%, czyste powietrze |
| **Fotowoltaika** | Instalacje solarne | Darmowa energia, zwrot inwestycji 6-8 lat |

### Główne Funkcjonalności

- ✅ Responsywna strona internetowa z sekcjami: Hero, O nas, Usługi, Proces, Kontakt
- ✅ Formularze kontaktowe i zapytania o wycenę
- ✅ Galeria zdjęć realizacji
- ✅ Panel administracyjny Django
- ✅ REST API do zarządzania kontaktami
- ✅ System wysyłania e-maili
- ✅ Wsparcie mobilne (mobile-first design)

---

## Architektura Systemu

### Architektura Ogólna

```
┌─────────────────────────────────────────────────────────────────┐
│                      Frontend (Next.js 16)                       │
│  - React Components, TailwindCSS, Shadcn/ui                     │
│  - Pages: Homepage, Service Pages, Contact Forms                │
│  - API Client dla komunikacji z backendem                        │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                    REST API (http://localhost:8000)
                               │
┌──────────────────────────────┴──────────────────────────────────┐
│                      Backend (Django 6.0)                        │
│  - REST Framework                                               │
│  - CORS Headers                                                  │
│  - SQLite Database                                               │
│  - Email Service                                                 │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
            SQLite Database         Email Service
                                   (SMTP)
```

### Stack Techniczny

**Backend:**
- Python 3.13+
- Django 6.0.2
- Django REST Framework
- Django CORS Headers
- Uvicorn (ASGI Server)

**Frontend:**
- Next.js 16.1.6
- React 19.2.3
- TypeScript 5.7.3
- TailwindCSS 3.4.17
- Shadcn/ui (Radix UI)

**Baza Danych:**
- SQLite3 (db.sqlite3)

---

## Backend - Django

### Struktura Katalogów

```
accord/                          # Główna aplikacja Django
├── settings.py                  # Konfiguracja projektu
├── urls.py                      # Routing główny
├── asgi.py                      # ASGI configuration
├── wsgi.py                      # WSGI configuration
│
contact/                         # Aplikacja do zarządzania kontaktami
├── models.py                    # Modele danych
├── admin.py                     # Konfiguracja Django Admin
├── views.py                     # Widoki Django
├── apps.py                      # Konfiguracja aplikacji
├── migrations/                  # Migracje bazy danych
│   ├── 0001_initial.py
│   ├── 0002_contact_createdat.py
│   ├── 0003_alter_contact_options.py
│   ├── 0004_alter_contact_services.py
│   └── 0005_contactstatus_*.py
│
├── api/                         # REST API
│   ├── views.py                 # API Endpoints
│   ├── serializers.py           # Serializery DRF
│   └── urls.py                  # Ścieżki API
│
└── utils/                       # Funkcje pomocnicze
    ├── parse_contact.py         # Parsowanie danych kontaktu
    ├── send_mail.py             # Wysyłanie e-maili
    └── decorators/
        └── login_required_for_methods.py  # Dekorator custom
│
chatai/                          # Aplikacja do AI Chat (przyszłość)
├── models.py
├── views.py
└── apps.py
```

### Modele Danych

#### Model: Contact

Przechowuje informacje o zapytaniach kontaktowych od klientów.

```python
class Contact(models.Model):
    SERVICE_CHOICES = (
        ('pompy', 'Pompy Ciepła'),
        ('klimatyzacja', 'Klimatyzacja'),
        ('rekuperacja', 'Rekuperacja'),
        ('fotowoltaika', 'Fotowoltaika'),
        ('serwis', 'Serwis')
    )
    
    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=25, unique=True)
    email = models.EmailField(unique=True)
    services = models.CharField(
        max_length=50,
        choices=SERVICE_CHOICES,
        default='pompy'
    )
    description = models.TextField(blank=True, null=True)
    status = models.ForeignKey(
        ContactStatus,
        on_delete=models.PROTECT,
        default=get_default_contact_status_id
    )
    createdAt = models.DateTimeField(auto_now_add=True)
```

**Pola:**
- `full_name` - Imię i nazwisko klienta (max 255 znaków)
- `phone_number` - Numer telefonu (format: +99999999, max 25 znaków, unikalny)
- `email` - Adres e-mail (unikalny)
- `services` - Wybrana usługa (jedno z 5 predefiniowanych)
- `description` - Opis zapytania (opcjonalne)
- `status` - Status zapytania (relacja FK do ContactStatus)
- `createdAt` - Data utworzenia (auto-generowana)

#### Model: ContactStatus

Definiuje możliwe statusy zapytań.

```python
class ContactStatus(models.Model):
    name = models.CharField(max_length=50)
```

**Domyślne statusy:**
- `nowy` - Nowe zapytanie (domyślny)
- Mogą być dodawane inne statusy w Django Admin

### REST API

#### Endpoint: GET /api/contacts
**Opis:** Pobiera listę wszystkich zapytań kontaktowych  
**Metoda:** GET  
**Autentykacja:** Wymagana (login)  
**Odpowiedź (Status 200):**
```json
[
  {
    "id": 1,
    "full_name": "Jan Kowalski",
    "phone_number": "+48601475547",
    "email": "jan@example.com",
    "services": "pompy",
    "description": "Zainteresowany pompą ciepła",
    "status": "nowy",
    "createdAt": "2026-02-24T22:15:00Z"
  }
]
```

**Odpowiedź (Status 204):** Brak kontaktów

#### Endpoint: POST /api/contacts
**Opis:** Tworzy nowe zapytanie kontaktowe  
**Metoda:** POST  
**Autentykacja:** Nie wymagana  
**Body:**
```json
{
  "full_name": "Jan Kowalski",
  "phone_number": "+48601475547",
  "email": "jan@example.com",
  "services": "pompy",
  "description": "Zainteresowany pompą ciepła"
}
```

**Odpowiedź (Status 201):**
```json
{
  "id": 1,
  "full_name": "Jan Kowalski",
  "phone_number": "+48601475547",
  "email": "jan@example.com",
  "services": "pompy",
  "description": "Zainteresowany pompą ciepła",
  "status": "nowy",
  "createdAt": "2026-02-24T22:15:00Z"
}
```

**Błędy:**
- 400 Bad Request - Niepoprawne dane (np. e-mail już istnieje, telefon już istnieje)

#### Endpoint: GET /api/contacts/<id>/
**Opis:** Pobiera szczegóły konkretnego zapytania  
**Metoda:** GET  
**Autentykacja:** Wymagana (login)  
**Parametry URL:** `id` - ID zapytania  
**Odpowiedź (Status 200):** Jak wyżej

#### Endpoint: DELETE /api/contacts/<id>/
**Opis:** Usuwa zapytanie kontaktowe  
**Metoda:** DELETE  
**Autentykacja:** Wymagana (login)  
**Parametry URL:** `id` - ID zapytania  
**Odpowiedź (Status 204):** No Content

### Konfiguracja Django

**settings.py - Kluczowe ustawienia:**

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'contact.apps.ContactConfig',
    'chatai.apps.ChataiConfig'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

**Tutoring REST Framework:**
- Domyślna paginacja: wyłączona
- Format odpowiedzi: JSON

### Funkcje Pomocnicze

#### parse_contact.py
Funkcja do parsowania danych z żądania POST:
```python
def parse_contact(request) -> dict:
    if isinstance(request.data, dict):
        return request.data
    return request.data.dict()
```

#### send_mail.py
Funkcja wysyłająca e-mail powiadomienia do administratora:
```python
def send_contact_mail(mail_data: dict):
    send_mail(
        subject=f"{mail_data.get('full_name')} - {mail_data.get('services')}",
        message=f"Imię i nazwisko: {mail_data.get('full_name')}\n..."
        from_email="kontaktovez@gmail.com",
        recipient_list=['oliwerx12@gmail.com'],
    )
```

**Uwagi:**
- Wymaga konfiguracji SMTP w settings.py
- Aktualnie wysyła do: `oliwerx12@gmail.com`

---

## Frontend - Next.js

### Struktura Katalogów

```
frontend/
├── app/                         # App Router (Next.js 13+)
│   ├── layout.tsx              # Layout główny
│   ├── page.tsx                # Strona główna (/)
│   ├── globals.css             # Style globalne
│   │
│   ├── uslugi/                 # Strony usług
│   │   ├── pompy-ciepla/page.tsx
│   │   ├── klimatyzacja/page.tsx
│   │   ├── rekuperacja/page.tsx
│   │   └── fotowoltaika/page.tsx
│   │
│   └── actions/
│       └── contact.ts          # Server Actions - wysyłanie formularza
│
├── components/                  # Komponenty React
│   ├── Header.tsx              # Nagłówek i nawigacja
│   ├── Footer.tsx              # Stopka
│   ├── HeroSection.tsx         # Sekcja hero
│   ├── AboutSection.tsx        # O nas
│   ├── ServicesSection.tsx     # Usługi (karuzela)
│   ├── ProcessSection.tsx      # Proces współpracy
│   ├── ContactSection.tsx      # Sekcja kontaktu
│   ├── ScrollingServices.tsx   # Animowana lista usług
│   │
│   ├── Forms/
│   │   └── ContactForm.tsx     # Formularz kontaktowy
│   │
│   ├── Services/
│   │   ├── ServicePage.tsx     # Template strony usługi
│   │   ├── PhotoGallery.tsx    # Galeria zdjęć
│   │   └── types.ts            # Typy dla serwisów
│   │
│   └── ui/                     # Shadcn/ui komponenty
│       ├── button.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── textarea.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       ├── separator.tsx
│       ├── tooltip.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│
├── lib/
│   ├── navLinks.ts            # Linki nawigacyjne
│   ├── types.ts               # Typy TypeScript
│   ├── utils.ts               # Funkcje pomocnicze
│   └── statsArray.ts          # Dane statystyk
│
├── api/
│   ├── api.ts                 # Funkcje do komunikacji z API
│   └── types.ts               # Typy dla API
│
├── hooks/
│   ├── use-mobile.tsx         # Hook do detekcji urządzenia
│   └── use-toast.ts           # Hook do powiadomień
│
├── public/
│   └── images/
│       ├── logo-transparent.png
│       ├── favicon.png
│       └── services/            # Zdjęcia usług
│           ├── airconditioning/
│           ├── heatpumps/
│           ├── photovoltaics/
│           └── recuperation/
│
├── styles/
│   └── globals.css            # Style dla shadcn/ui
│
├── next.config.ts             # Konfiguracja Next.js
├── tailwind.config.ts         # Konfiguracja Tailwind
├── tsconfig.json              # Konfiguracja TypeScript
├── postcss.config.mjs         # Konfiguracja PostCSS
├── package.json               # Zależności npm
└── eslint.config.mjs          # Konfiguracja ESLint
```

### Strony i Komponenty

#### Strona Główna (/)
**Komponenty:**
1. Header - Nagłówek z logo i nawigacją
2. HeroSection - Banner hero z CTA
3. ScrollingServices - Animowana lista usług
4. ServicesSection - Karuzela usług z opisami
5. AboutSection - Informacje o firmie
6. ProcessSection - Proces współpracy
7. ContactSection - Formularz kontaktowy
8. Footer - Stopka z linkami

#### Strony Usług
- `/uslugi/pompy-ciepla` - Pompy Ciepła
- `/uslugi/klimatyzacja` - Klimatyzacja
- `/uslugi/rekuperacja` - Rekuperacja
- `/uslugi/fotowoltaika` - Fotowoltaika

**Każda strona zawiera:**
- Header z tytułem i opisem
- Galeria zdjęć
- Szczegółowe informacje
- Przyciski CTA

### Komponenty Główne

#### Header.tsx
**Funkcjonalność:**
- Top bar z kontaktem (tel, email, info o firmie)
- Sticky header z logo i nawigacją
- Mobile menu (hamburger menu)
- Call-to-action button "Zadzwoń"

**Props:** Brak (wewnętrzny stan)

```tsx
// Elementy
const navLinks = [
  { label: 'O nas', href: '/#onas' },
  { label: 'Usługi', href: '/#uslugi' },
  { label: 'Proces', href: '/#proces' },
  { label: 'Kontakt', href: '/#kontakt' }
]

// Telefon: 601 47 55 47
// Email: accordservice@interia.pl
```

#### ContactForm.tsx
**Funkcjonalność:**
- Formularz z polami: imię, telefon, email, usługa, opis
- Validacja danych
- Wysyłanie do backendu
- Powiadomienia (toast)

**Server Action:** `sendContactAction`

```tsx
Fields:
- full_name (required)
- phone_number (required, format: +48...)
- email (required)
- services (required, select)
- description (optional, textarea)
```

#### ServicesSection.tsx
**Funkcjonalność:**
- Karuzela czterech usług
- Dynamiczne karty z ikoną, tytułem, opisem
- Galeria zdjęć w aktywnej usłudze
- Lista features

```tsx
Services: [
  { icon: Flame, title: 'Pompy Ciepła', ... },
  { icon: Wind, title: 'Klimatyzacja', ... },
  { icon: Fan, title: 'Rekuperacja', ... },
  { icon: Sun, title: 'Fotowoltaika', ... }
]
```

#### PhotoGallery.tsx
**Funkcjonalność:**
- Galeria zdjęć z lightbox
- Miniaturki do nawigacji
- Responsywna siatka

**Props:**
```tsx
interface PhotoGalleryProps {
  images: Array<{
    original: string
    thumbnail: string
    originalAlt: string
  }>
}
```

### Konfiguracja Stylów

#### TailwindCSS
- **Motyw:** Light/Dark mode
- **Kolory:** Zdefiniowane zmienne CSS (HSL)
- **Czcionki:** Inter (sans), Space Grotesk, Geist Mono
- **Komponenty:** Animacje (accordion, marquee)

#### Shadcn/ui
Użytkowne komponenty z Radix UI:
- Button, Input, Label, Textarea
- Toast, Toaster, Tooltip
- Separator, Sheet, Sidebar
- Skeleton

### Integracja z Backendem

#### API Client (api.ts)
```typescript
postContact({
  full_name: string,
  phone_number: string,
  email: string,
  services: string,
  description: string
}): Promise<any>
```

**Endpoint:** `{BACKEND_URL}/api/contacts`  
**Metoda:** POST  
**Headers:** `Content-Type: application/json`

**Zmienna środowiskowa:**
```
BACKEND_URL=http://localhost:8000
```

### Metadane i SEO

```typescript
export const metadata: Metadata = {
  title: "Accord Service - Pompy Ciepła...",
  description: "Accord Service - od 1984 roku...",
  icons: { icon: 'images/favicon.png' }
}

export const viewport = {
  themeColor: '#0047CC'
}
```

---

## Technologie i Zależności

### Backend

| Pakiet | Wersja | Cel |
|--------|--------|-----|
| Django | >=6.0.2 | Framework webowy |
| Django REST Framework | >=0.1.0 | REST API |
| Django CORS Headers | >=4.9.0 | CORS support |
| Python-dotenv | >=1.2.1 | Zmienne środowiskowe |
| Uvicorn | >=0.41.0 | ASGI server |

### Frontend

| Pakiet | Wersja | Cel |
|--------|--------|-----|
| next | 16.1.6 | React framework |
| react | 19.2.3 | UI library |
| react-dom | 19.2.3 | React DOM |
| typescript | 5.7.3 | Typy |
| tailwindcss | 3.4.17 | CSS framework |
| tailwindcss-animate | 1.0.7 | Animacje |
| lucide-react | 0.544.0 | Ikony |
| @radix-ui/* | ^1.1+ | Komponenty |
| react-image-gallery | 2.1.2 | Galeria |
| next-themes | 0.4.6 | Dark mode |

### Narzędzia

- **Python** 3.13+
- **Node.js** 18+ (rekomendowane: 20+)
- **npm/pnpm** - Package manager
- **Git** - Version control

---

## Konfiguracja i Instalacja

### Wymagania Wstępne

- Python 3.13+
- Node.js 18+ (v20 rekomendowane)
- pip lub uv
- Git

### Instalacja Backend-u

1. **Klonowanie repozytorium**
   ```bash
   git clone https://github.com/ovezthaking/Accord-Services.git
   cd Accord-Services
   ```

2. **Tworzenie wirtualnego środowiska**
   ```bash
   python -m venv .venv
   .\.venv\Scripts\activate  # Windows
   source .venv/bin/activate # Linux/Mac
   ```

3. **Instalacja zależności**
   ```bash
   pip install -r requirements.txt
   ```
   lub
   ```bash
   pip install django django-cors-headers django-rest-framework python-dotenv uvicorn
   ```

4. **Migracje bazy danych**
   ```bash
   python manage.py migrate
   ```

5. **Tworzenie superusera**
   ```bash
   python manage.py createsuperuser
   ```

6. **Uruchomienie serwera**
   ```bash
   python manage.py runserver
   # ORAZ (dla development - alternatywnie)
   uvicorn accord.asgi:application --reload
   ```

   Serwer dostępny: `http://localhost:8000`

### Instalacja Frontend-u

1. **Przejście do katalogu frontend**
   ```bash
   cd frontend
   ```

2. **Instalacja zależności**
   ```bash
   npm install
   # lub
   pnpm install
   ```

3. **Konfiguracja zmiennych środowiskowych**
   ```bash
   # Stwórz plik .env.local
   BACKEND_URL=http://localhost:8000
   ```

4. **Uruchomienie development serwera**
   ```bash
   npm run dev
   # ORAZ
   pnpm dev
   ```

   Aplikacja dostępna: `http://localhost:3000`

### Build dla Produkcji

**Backend:**
```bash
python manage.py collectstatic
gunicorn accord.wsgi:application --bind 0.0.0.0:8000
```

**Frontend:**
```bash
npm run build
npm start
```

---

## Przepływy Biznesowe

### Przepływ 1: Wysyłanie Zapytania Kontaktowego

```
┌──────────────────────────────────────────────────────────────┐
│ 1. Użytkownik wychodzi na stronę www.accord.opole.pl        │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ 2. Przeglądanie sekcji:                                      │
│    - Hero (oferta)                                           │
│    - Usługi (karuzela)                                       │
│    - O nas (info)                                            │
│    - Proces (jak pracujemy)                                  │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ 3. Zainteresowanie konkretną usługą                          │
│    → Klik na usługę → Przejście do strony usługi            │
│    lub przejście do sekcji "Kontakt"                         │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ 4. Wypełnianie formularza:                                   │
│    - Imię i nazwisko                                         │
│    - Telefon (+48...)                                        │
│    - E-mail                                                  │
│    - Wybór usługi                                            │
│    - Opis zapytania                                          │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ 5. Frontend (Next.js):                                       │
│    - Validacja danych client-side                            │
│    - Wysłanie POST /api/contacts                             │
│    - Wyświetlenie powiadomienia (toast)                      │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ 6. Backend (Django):                                         │
│    - Odbór żądania POST                                      │
│    - Validacja danych (email, telefon, unikalność)           │
│    - Zapis do bazy (Contact model)                           │
│    - Wysłanie e-maila do administratora                      │
├─────────────────────────────────────────────────────────────┤
│ Email wysyłany do: accordservice@interia.pl                 │
│ Format: Imię - Usługa [temat]                               │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ 7. Odpowiedź backendowu (JSON):                              │
│    - Status 201 Created                                      │
│    - Zwrócenie komplętnego obiektu Contact                   │
│    - Wyświetlenie "Wysłano!" na frontend                     │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ 8. Administrator recebuje e-mailem i panelu:                 │
│    - Panel admin: /admin/contact/contact/                    │
│    - Status: "nowy"                                          │
│    - Może zmienić status na "w realizacji", "zamknięte"      │
└──────────────────────────────────────────────────────────────┘
```

### Przepływ 2: Przeglądanie Usług

```
Home Page
    ↓
ServicesSection (Karuzela)
    ├→ Klik na usługę → Zmiana content w sekcji
    └→ Przycisk "Więcej" → Przejście do /uslugi/[slug]
    
Service Page (/uslugi/[slug])
    ├→ ServicePage Component
    ├→ Header z tytułem
    ├→ PhotoGallery z zdjęciami
    └→ Przycisk "Umów wycenę" → #kontakt na home
```

### Przepływ 3: Zarządzanie Kontaktami (Admin)

```
Administrator
    ↓
Logowanie: /admin/
    ↓
Django Admin Panel
    ├→ Contact List: /admin/contact/contact/
    │   ├→ Przeglądanie zapytań
    │   ├→ Filtrowanie po statusie, usłudze
    │   └→ Export danych
    │
    └→ ContactStatus: /admin/contact/contactstatus/
        ├→ Edycja statusów
        └→ Dodawanie nowych statusów
```

---

## Zasoby i Kontakty

### Kontakt Firmy

| Informacja | Wartość |
|-----------|---------|
| **Firma** | Accord Services |
| **Lokalizacja** | Opole, Polska |
| **Od** | 1984 r. |
| **Telefon** | +48 601 47 55 47 |
| **Email** | accordservice@interia.pl |
| **Strona** | https://www.accord.opole.pl |

### Linki Ważne

- **Strona główna:** /
- **Panel Admin:** /admin/
- **API Kontakty:** /api/contacts
- **Repo GitHub:** https://github.com/ovezthaking/Accord-Services

### Dokumentacja Technologiczne

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [TypeScript](https://www.typescriptlang.org/)

### Zmienne Środowiskowe

**Backend (.env lub settings.py):**
```
DEBUG=True
SECRET_KEY=django-insecure-...
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=kontaktovez@gmail.com
EMAIL_HOST_PASSWORD=***
```

**Frontend (.env.local):**
```
BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_GA_ID=  # Google Analytics (opcjonalnie)
```

### Proces CI/CD (Rekomendowany)

1. **Testing:** `pytest` dla Pythona
2. **Linting:** `eslint` dla JavaScriptu, `pylint` dla Pythona
3. **Build:** Docker containers
4. **Deploy:** GitHub Actions → Hosting (np. Vercel, Heroku)

---

## Uwagi Znaczące

### TODO i Przyszłe Usprawnienia

Jak wynika z komentarzy w kodzie (`models.py`):
- Przeprojektowanie pola `status` - rozważenie osobnego modelu
- Wydzielenie `services` do oddzielnego modelu
- Integracja ChatAI (aplikacja `chatai` jest przygotowana)

### Bezpieczeństwo

⚠️ **WAŻNE:**
- `DEBUG = True` w settings.py - zmienić na `False` w produkcji
- `SECRET_KEY` trzymać w zmiennych środowiskowych
- Hasła e-maili trzymać w `.env`
- CORS jest włączony - konfigurować dla konkretnych domen
- CSRF token wymagany dla POST requestów

### Performance

- TailwindCSS - purged CSS o ~10% rozmiaru
- Next.js Turbopack dla szybszej kompilacji
- Image optimization (Next.js Image component)
- Lazy loading komponentów

### Responsywność

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Hamburger menu na urządzeniach < lg

---

## Podsumowanie

Projekt Accord Services to nowoczesna, responsywna aplikacja webowa łącząca:
- **Backend:** Django REST API z systemem zarządzania
- **Frontend:** Next.js z pięknym UI (Shadcn/ui + TailwindCSS)
- **Integracja:** Email notifications dla administratora
- **Skalowanie:** Przygotowana infrastruktura do AI (ChatAI)

Dokumentacja ta obejmuje wszystkie aspekty projektu: architekturę, modele, API, komponenty, konfigurację i przepływy biznesowe.

---

**Data aktualizacji:** 20 marca 2026  
**Autor:** Dokumentacja projektu  
**Wersja:** 1.0
