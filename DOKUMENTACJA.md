# Dokumentacja Projektu Accord Services

**Ostatnia aktualizacja:** czerwiec 2026  
**Wersja:** 1.1

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
- ✅ Galeria zdjęć realizacji z lightboxem
- ✅ Panel administracyjny Django
- ✅ REST API do zarządzania kontaktami
- ✅ System wysyłania e-maili przez Resend API (fallback: SMTP Gmail)
- ✅ Zarządzanie odbiorcami e-mail z panelu admin (model `EmailRecipient`)
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
│  - Pages: /, /uslugi/*, /qr                                     │
│  - Rewrites: /admin/* i /static/* → Backend                     │
└──────────────────────────────┬──────────────────────────────────┘
                               │ REST API / proxy
                    (http://localhost:8000 / Render URL)
                               │
┌──────────────────────────────┴──────────────────────────────────┐
│                      Backend (Django 6.0)                        │
│  - REST Framework, CORS Headers, Whitenoise                     │
│  - Gunicorn (WSGI) — produkcja                                   │
│  - Uvicorn (ASGI) — alternatywa dev                             │
└──────────────┬───────────────────────────────┬──────────────────┘
               │                               │
     PostgreSQL / SQLite               Resend API / SMTP Gmail
     (Neon na produkcji)               (powiadomienia e-mail)
```

### Stack Techniczny

**Backend:**
- Python 3.13+
- Django 6.0.2
- Django REST Framework 3.16
- Django CORS Headers 4.9
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

---

## Backend — Django

### Struktura Katalogów

```
accord/                          # Konfiguracja projektu Django
├── settings.py                  # Ustawienia projektu
├── urls.py                      # Routing główny
├── asgi.py                      # ASGI configuration (Uvicorn)
└── wsgi.py                      # WSGI configuration (Gunicorn)

contact/                         # Aplikacja zarządzania kontaktami
├── models.py                    # Contact, ContactStatus, EmailRecipient
├── admin.py                     # Konfiguracja Django Admin
├── views.py                     # (placeholder)
├── apps.py
├── migrations/
│   ├── 0001_initial.py
│   ├── 0002_contact_createdat.py
│   ├── 0003_alter_contact_options.py
│   ├── 0004_alter_contact_services.py
│   ├── 0005_contactstatus_*.py
│   └── 0006_emailrecipient.py
│
├── api/                         # REST API
│   ├── views.py                 # Endpointy API
│   ├── serializers.py           # Serializery DRF
│   └── urls.py                  # Ścieżki API
│
└── utils/                       # Funkcje pomocnicze
    ├── parse_contact.py         # Parsowanie danych kontaktu
    ├── send_mail.py             # Wysyłanie e-maili (Resend / SMTP)
    └── decorators/
        └── login_required_for_methods.py

chatai/                          # Aplikacja AI (przygotowana, niezaimplementowana)
├── models.py
├── views.py
└── apps.py
```

### Modele Danych

#### Model: ContactStatus

Definiuje możliwe statusy zapytań kontaktowych.

```python
class ContactStatus(models.Model):
    name = models.CharField(max_length=50)
```

Domyślny status tworzony automatycznie: `nowy`.

---

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

    full_name    = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=25, unique=True)  # walidacja regex
    email        = models.EmailField(unique=True)
    services     = models.CharField(max_length=50, choices=SERVICE_CHOICES, default='pompy')
    description  = models.TextField(blank=True, null=True)
    status       = models.ForeignKey(ContactStatus, on_delete=models.PROTECT)
    createdAt    = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-createdAt']
```

**Pola:**
- `full_name` — Imię i nazwisko (max 255 znaków)
- `phone_number` — Numer telefonu (regex: `^\+?[\d\s().-]{5,25}$`, unikalny)
- `email` — Adres e-mail (unikalny)
- `services` — Wybrana usługa (jedno z 5 predefiniowanych)
- `description` — Opis zapytania (opcjonalne)
- `status` — FK do `ContactStatus` (domyślnie: `nowy`)
- `createdAt` — Data utworzenia (auto)

---

#### Model: EmailRecipient

Zarządza listą odbiorców powiadomień e-mail. Pozwala dodawać i wyłączać odbiorców bezpośrednio z panelu Django Admin — bez zmiany kodu.

```python
class EmailRecipient(models.Model):
    email     = models.EmailField(unique=True)
    name      = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Odbiorca e-mail"
        verbose_name_plural = "Odbiorcy e-mail"
```

**Pola:**
- `email` — Adres e-mail odbiorcy (unikalny)
- `name` — Nazwa/opis odbiorcy (opcjonalne)
- `is_active` — Czy odbiorca jest aktywny (domyślnie: `True`)

---

### REST API

Bazowy prefix: `/api/contacts`

#### GET /api/contacts
**Opis:** Pobiera listę wszystkich zapytań kontaktowych  
**Autentykacja:** Wymagana (login)  
**Odpowiedź 200:**
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
**Odpowiedź 204:** Brak kontaktów

---

#### POST /api/contacts
**Opis:** Tworzy nowe zapytanie kontaktowe i wysyła powiadomienie e-mail  
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
**Odpowiedź 201:** Zwraca obiekt `Contact`  
**Błędy:**
- `400 Bad Request` — niepoprawne dane (np. e-mail lub telefon już istnieje)

Po zapisaniu kontaktu e-mail jest wysyłany asynchronicznie w osobnym wątku (przez `threading.Thread`), żeby nie blokować odpowiedzi API.

---

#### GET /api/contacts/\<id\>/
**Autentykacja:** Wymagana  
**Odpowiedź 200:** Szczegóły kontaktu  
**Odpowiedź 404:** Kontakt nie istnieje

---

#### DELETE /api/contacts/\<id\>/
**Autentykacja:** Wymagana  
**Odpowiedź 204:** Usunięto  
**Odpowiedź 404:** Kontakt nie istnieje

---

#### GET /health/
**Opis:** Health check — używany przez Render do monitorowania serwisu  
**Autentykacja:** Nie wymagana  
**Odpowiedź 200:**
```json
{"status": "ok"}
```

---

### System E-mail

Plik: `contact/utils/send_mail.py`

System obsługuje dwa tryby wysyłki — z automatycznym fallbackiem:

**1. Resend API** (produkcja — rekomendowane)  
Aktywny gdy zmienna środowiskowa `RESEND_API_KEY` jest ustawiona.  
Wysyła wiadomość HTML z adresu `kontakt@accord.opole.pl`.  
Ustawia `reply_to` na e-mail nadawcy formularza.

**2. SMTP Gmail** (fallback)  
Używany gdy `RESEND_API_KEY` nie jest ustawiony.  
Konfiguracja w `settings.py`: host `smtp.gmail.com`, port 587, TLS.  
Hasło aplikacji pobierane ze zmiennej `EMAIL_PASSWORD`.

**Odbiorcy** są pobierani dynamicznie z bazy danych:
```python
def get_recipients():
    return list(
        EmailRecipient.objects.filter(is_active=True)
        .values_list('email', flat=True)
    )
```

Zarządzanie odbiorcami odbywa się z poziomu Django Admin → **Odbiorcy e-mail**.

---

### Konfiguracja Django (settings.py — kluczowe elementy)

```python
# Baza danych — auto-wykrywanie PostgreSQL lub SQLite
DATABASES = build_database_config()
# Jeśli DATABASE_URL ustawiony → PostgreSQL (z opcjonalnym sslmode)
# Jeśli nie → SQLite (db.sqlite3)

# Pliki statyczne — Whitenoise (CompressedManifestStaticFilesStorage)
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# CORS — dozwolone originy
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://accordproposition.vercel.app",
    "https://www.accord.opole.pl",
    ...
]

# Bezpieczeństwo (produkcja)
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
USE_X_FORWARDED_HOST = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
```

---

### Dekorator: login_required_for_methods

Własny dekorator pozwalający wymagać autentykacji tylko dla wybranych metod HTTP (np. `GET`), przy jednoczesnym zostawieniu `POST` jako publicznego:

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
├── app/                         # App Router (Next.js 13+)
│   ├── layout.tsx              # Layout główny (Header, Footer, Toaster, GA)
│   ├── page.tsx                # Strona główna (/)
│   ├── globals.css             # Style globalne + Shadcn/ui + galeria
│   │
│   ├── uslugi/
│   │   ├── pompy-ciepla/page.tsx
│   │   ├── klimatyzacja/page.tsx
│   │   ├── rekuperacja/page.tsx
│   │   └── fotowoltaika/page.tsx
│   │
│   ├── qr/
│   │   └── page.tsx            # Strona QR z linkami
│   │
│   └── actions/
│       └── contact.ts          # Server Action — wysyłanie formularza
│
├── components/
│   ├── Header.tsx              # Nagłówek, nawigacja, mobile menu, dropdown tel.
│   ├── Footer.tsx              # Stopka z linkami i danymi kontaktowymi
│   ├── HeroSection.tsx         # Sekcja hero z CTA i statystykami
│   ├── AboutSection.tsx        # O nas — wyróżniki, galeria realizacji
│   ├── ServicesSection.tsx     # Karuzela usług z zakładkami
│   ├── ProcessSection.tsx      # Proces współpracy (4 kroki)
│   ├── ContactSection.tsx      # Kontakt — dane + mapa + formularz
│   ├── ScrollingServices.tsx   # Animowany marquee z nazwami usług
│   │
│   ├── Forms/
│   │   └── ContactForm.tsx     # Formularz kontaktowy (useActionState)
│   │
│   ├── Services/
│   │   ├── ServicePage.tsx     # Template strony usługi
│   │   ├── PhotoGallery.tsx    # Galeria z react-image-gallery + toggle
│   │   └── types.ts
│   │
│   ├── fx/
│   │   └── FadeIn.tsx          # Komponent animacji wejścia/wyjścia
│   │
│   └── ui/                     # Shadcn/ui komponenty
│       ├── button.tsx, input.tsx, label.tsx, textarea.tsx
│       ├── toast.tsx, toaster.tsx, tooltip.tsx
│       ├── separator.tsx, sheet.tsx, sidebar.tsx, skeleton.tsx
│
├── hooks/
│   ├── use-in-view.ts          # Hook IntersectionObserver (dla FadeIn)
│   ├── use-mobile.tsx          # Hook detekcji urządzenia mobilnego
│   └── use-toast.ts            # Hook systemu powiadomień
│
├── lib/
│   ├── navLinks.ts
│   ├── types.ts
│   ├── utils.ts                # cn() (clsx + tailwind-merge)
│   ├── statsArray.ts
│   └── aboutImages.ts          # Złączenie galerii dla sekcji "O nas"
│
├── api/
│   ├── api.ts                  # postContact() — fetch do backendu
│   └── types.ts
│
├── utils/
│   └── findGalleryCandidates.ts  # Odczyt zdjęć z fs przy buildzie
│
└── public/
    └── images/
        ├── logo-transparent.png
        ├── favicon.png
        ├── hero-background.jpg
        ├── service-ac.jpg, service-solar.jpg, service-ventilation.jpg
        └── services/
            ├── airconditioning/gallery/
            ├── heatpumps/
            ├── photovoltaics/gallery/
            └── recuperation/gallery/
```

---

### Strony i Routing

| Ścieżka | Komponent | Opis |
|---------|-----------|------|
| `/` | `app/page.tsx` | Strona główna — wszystkie sekcje |
| `/uslugi/pompy-ciepla` | `app/uslugi/pompy-ciepla/page.tsx` | Szczegóły usługi |
| `/uslugi/klimatyzacja` | `app/uslugi/klimatyzacja/page.tsx` | Szczegóły usługi |
| `/uslugi/rekuperacja` | `app/uslugi/rekuperacja/page.tsx` | Szczegóły usługi |
| `/uslugi/fotowoltaika` | `app/uslugi/fotowoltaika/page.tsx` | Szczegóły usługi |
| `/qr` | `app/qr/page.tsx` | Strona QR — szybki dostęp |
| `/admin/*` | proxy → Django | Panel administracyjny |

---

### Komponenty Kluczowe

#### FadeIn (`components/fx/FadeIn.tsx`)

Komponent opakowujący dzieci w animację wejścia/wyjścia opartą na `IntersectionObserver`. Używany powszechnie na całej stronie.

**Props:**
```tsx
interface FadeInProps {
  direction?: "up" | "down" | "left" | "right" | "none"
  delay?: number       // ms, opóźnienie animacji
  duration?: number    // ms, czas trwania (domyślnie 600)
  threshold?: number   // próg widoczności (domyślnie 0.15)
  exitDelay?: number   // ms, opóźnienie animacji wyjścia
}
```

**Stany widoczności** (hook `use-in-view`):
- `before` — element poniżej viewportu, oczekuje na wejście
- `visible` — element w viewporcie, w pełni widoczny
- `above` — element przewinięty powyżej viewportu (statyczny, bez animacji)
- `exiting` — element opuszcza viewport podczas scrollowania w górę (animacja wyjścia)

---

#### Header (`components/Header.tsx`)

- Top bar z dwoma numerami telefonu i adresem e-mail
- Sticky header z logo i nawigacją desktopową
- Mobile hamburger menu z nawigacją
- Dropdown "Zadzwoń" z wyborem numeru (601 47 55 47 / 783 636 363)
- Zamykanie dropdownu przy kliknięciu poza jego obszar (`useRef` + `useEffect`)

---

#### ContactForm (`components/Forms/ContactForm.tsx`)

Formularz oparty na React `useActionState` z Server Actions Next.js.

**Pola:** imię i nazwisko, telefon, e-mail, usługa (select), wiadomość  
**Przepływ:** submit → Server Action `sendContactAction` → `postContact()` → POST `/api/contacts`  
**Feedback:** toast z wynikiem (sukces lub błąd)  
**Deduplicacja toastów:** `useRef` śledzi ostatnią wiadomość, żeby nie pokazywać duplikatów przy ponownym renderze.

---

#### PhotoGallery (`components/Services/PhotoGallery.tsx`)

Galeria oparta na `react-image-gallery` z przełącznikiem widoczności.

- Domyślnie ukryta — przycisk "Pokaż galerię zdjęć" otwiera z animacją CSS grid
- Na mobile: brak miniaturek, uproszczone strzałki nawigacji
- Obsługuje tryb `embedded` (bez dodatkowych padingów, do użycia w sekcji "O nas")
- Styl dostosowany przez klasy CSS w `globals.css` (prefix `.service-image-gallery`)

---

#### QR Page (`app/qr/page.tsx`)

Uproszczona strona zoptymalizowana pod wyświetlanie po zeskanowaniu kodu QR.

**Linki:**
- Przejdź do strony głównej (`/`)
- Zadzwoń teraz (`tel:601475547`)
- Oceń nas w Google (link zewnętrzny)
- Znajdź nas na mapie (link zewnętrzny — Google Maps)

---

#### findGalleryCandidates (`utils/findGalleryCandidates.ts`)

Funkcja uruchamiana po stronie serwera (w czasie buildu) — odczytuje system plików i zwraca listę zdjęć z galerii dla danej usługi.

Przeszukuje dwie możliwe lokalizacje:
1. `public/images/<serviceFolder>/gallery/`
2. `public/images/services/<serviceFolder>/gallery/`

Zwraca posortowaną tablicę obiektów `GalleryItem` kompatybilnych z `react-image-gallery`.

---

### Integracja z Backendem

#### api/api.ts

```typescript
const baseUrl = process.env.BACKEND_URL || 'http://localhost:8000'

export const postContact = async (data: postContactProps): Promise<any>
```

#### next.config.ts — Rewrites

Next.js przekierowuje wybrane ścieżki do backendu Django, co pozwala serwować panel admina pod tą samą domeną co frontend:

```typescript
async rewrites() {
  return [
    { source: "/admin/:path*",  destination: `${backendUrl}/admin/:path*`  },
    { source: "/static/:path*", destination: `${backendUrl}/static/:path*` },
    { source: "/media/:path*",  destination: `${backendUrl}/media/:path*`  },
  ]
}
```

#### Server Action: sendContactAction (`app/actions/contact.ts`)

```typescript
export async function sendContactAction(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState>
```

Przetwarza `FormData` z formularza, wywołuje `postContact()` i zwraca stan (`ok`, `message`) do komponentu.

---

### Konfiguracja Stylów

#### TailwindCSS (`tailwind.config.ts`)

- Kolory definiowane przez zmienne CSS HSL (light/dark mode)
- Niestandardowe animacje: `marquee` (ScrollingServices), `accordion-down/up`
- Czcionki: Inter (sans), Geist Mono

#### Shadcn/ui

Komponenty z Radix UI zintegrowane przez zmienne CSS:  
Button, Input, Label, Textarea, Toast/Toaster, Tooltip, Separator, Sheet, Sidebar, Skeleton

#### Galeria zdjęć

Style `react-image-gallery` nadpisane w `app/globals.css` pod prefixem `.service-image-gallery` — responsywność, rozmiary miniaturek, kolory przycisków nawigacji.

---

## Technologie i Zależności

### Backend

| Pakiet | Wersja | Cel |
|--------|--------|-----|
| Django | 6.0.2 | Framework webowy |
| djangorestframework | 3.16.1 | REST API |
| django-cors-headers | 4.9.0 | CORS support |
| gunicorn | 26.0.0 | WSGI server (produkcja) |
| uvicorn | 0.41.0 | ASGI server (dev) |
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

### Narzędzia

- **uv** — zarządzanie zależnościami i wirtualnym środowiskiem Pythona
- **Node.js 18+** — środowisko uruchomieniowe frontendu
- **Git** — version control

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
# uv sam tworzy .venv i instaluje z uv.lock — jeden krok
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
npm install        # lub: pnpm install

# Plik zmiennych środowiskowych
echo "BACKEND_URL=http://localhost:8000" > .env.local

npm run dev
```

Aplikacja dostępna: `http://localhost:3000`

---

### Dodanie Odbiorcy E-mail

Po uruchomieniu serwera i stworzeniu superusera, wejdź w panel admina:

`http://localhost:8000/admin/` → **Odbiorcy e-mail** → **Dodaj odbiorcę e-mail**

Wpisz adres e-mail i opcjonalnie nazwę. Zaznacz `is_active` (domyślnie zaznaczone). Od tej chwili wszystkie nowe zapytania z formularza będą trafiać na ten adres.

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
| `DATABASE_URL` | ✅ produkcja | URL PostgreSQL (`postgresql://...`) |
| `DB_SSLMODE` | — | np. `require` dla Neon/Render |
| `RESEND_API_KEY` | ✅ produkcja | Klucz API Resend |
| `EMAIL_PASSWORD` | — | Hasło aplikacji Gmail (fallback SMTP) |
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

Zmienne środowiskowe: `SECRET_KEY`, `DEBUG=False`, `DATABASE_URL`, `DB_SSLMODE`, `RESEND_API_KEY`, `EMAIL_PASSWORD`.

### Deployment — Vercel (Frontend)

Zmienna środowiskowa: `BACKEND_URL` → adres backendu z Rendera.

Rewrite w `next.config.ts` sprawia, że `/admin/*` jest serwowany przez Django pod tą samą domeną co frontend.

---

## Przepływy Biznesowe

### Przepływ 1: Wysyłanie Zapytania Kontaktowego

```
Użytkownik wchodzi na stronę
        ↓
Przeglądanie sekcji (Hero → Usługi → O nas → Proces)
        ↓
Przejście do sekcji Kontakt lub strony usługi
        ↓
Wypełnienie formularza (imię, telefon, e-mail, usługa, opis)
        ↓
Frontend (Next.js):
  - walidacja HTML5 (required, type)
  - submit → Server Action sendContactAction
  - wywołanie POST /api/contacts
        ↓
Backend (Django):
  - walidacja DRF (unikalność e-mail, telefon, regex)
  - zapis do bazy (Contact, status="nowy")
  - uruchomienie wątku e-mail (Thread)
        ↓
E-mail (asynchronicznie):
  - Resend API (jeśli RESEND_API_KEY) → kontakt@accord.opole.pl
  - fallback: SMTP Gmail
  - odbiorcy: aktywni EmailRecipient z bazy
        ↓
Frontend:
  - toast "Dziękujemy, odezwiemy się wkrótce"
  lub toast "Coś poszło nie tak..."
        ↓
Administrator w panelu /admin/contact/contact/:
  - widzi nowe zapytanie ze statusem "nowy"
  - może zmienić status, przeglądać historię
```

---

### Przepływ 2: Przeglądanie Usług

```
Strona główna (/)
    ↓
ServicesSection — karuzela z zakładkami (Pompy / Klimatyzacja / Rekuperacja / Fotowoltaika)
    ├── klik zakładki → zmiana treści i zdjęcia w sekcji
    └── "Dowiedz się więcej" → /uslugi/[slug]

Strona usługi (/uslugi/[slug])
    ├── ServicePage — nagłówek z tytułem, opisem i CTA
    ├── Treść szczegółowa (children — specyficzna dla każdej usługi)
    ├── PhotoGallery — galeria z toggle (domyślnie ukryta)
    └── Przyciski: "Umów bezpłatną wycenę" → /#kontakt
                  "Zobacz wszystkie usługi" → /#uslugi
```

---

### Przepływ 3: Strona QR

```
Zeskanowanie kodu QR (np. z wizytówki lub ulotki)
        ↓
/qr — uproszczona strona z 4 kartami:
  ├── Przejdź do strony → /
  ├── Zadzwoń teraz → tel:601475547
  ├── Oceń nas w Google → g.page/r/...
  └── Znajdź nas na mapie → maps.app.goo.gl/...
```

---

### Przepływ 4: Zarządzanie Kontaktami (Admin)

```
Administrator → /admin/
    ├── contact/contact/ — lista zapytań
    │   ├── filtrowanie po statusie, usłudze, dacie
    │   └── zmiana statusu pojedynczego zapytania
    ├── contact/contactstatus/ — zarządzanie statusami
    └── contact/emailrecipient/ — zarządzanie odbiorcami e-mail
        ├── dodawanie nowych odbiorców
        └── wyłączanie odbiorców (is_active = False)
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
| **Google Maps** | https://share.google/9emUNr7ADPnOUdc4r |

### Linki Projektu

| Zasób | URL |
|-------|-----|
| Strona główna (produkcja) | https://accordproposition.vercel.app/ |
| Panel Admin | /admin/ |
| API Kontakty | /api/contacts |
| Health Check | /health/ |
| Repo GitHub | https://github.com/ovezthaking/Accord-Services |

### Dokumentacja Technologiczna

- [Django](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Next.js](https://nextjs.org/docs)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Resend](https://resend.com/docs)
- [uv](https://docs.astral.sh/uv/)
- [Gunicorn](https://docs.gunicorn.org/)

---

## Uwagi i TODO

### TODO / Przyszłe Usprawnienia

Na podstawie komentarzy w kodzie i planów:

- **ChatAI** — aplikacja `chatai` jest przygotowana w strukturze projektu; brak implementacji
- **Refaktoring modelu `Contact`** — wydzielenie `services` do osobnego modelu, przemyślenie pola `status`
- **Integracja CRM** — zewnętrzny system zarządzania klientami
- **Scheduling** — system rezerwacji terminów online
- **System ocen** — opinie klientów na stronie

### Bezpieczeństwo

⚠️ **Ważne przed deploymentem na produkcję:**

- `DEBUG = False` (zmienna `DEBUG=False` w Render)
- `SECRET_KEY` wyłącznie w zmiennych środowiskowych
- `ALLOWED_HOSTS` zawiera domenę produkcyjną
- CORS skonfigurowany dla właściwych domen (`CORS_ALLOWED_ORIGINS`)
- `RESEND_API_KEY` ustawiony (wysyłka e-maili)
- Baza PostgreSQL z `sslmode=require`
- `SESSION_COOKIE_SECURE = True` i `CSRF_COOKIE_SECURE = True` — już ustawione w `settings.py`

### Performance

- TailwindCSS — purged CSS (tylko użyte klasy)
- Next.js Turbopack — szybsza kompilacja w trybie dev (`next dev --turbo`)
- Whitenoise z `CompressedManifestStaticFilesStorage` — kompresja i cache plików statycznych
- E-mail wysyłany asynchronicznie (osobny wątek) — nie blokuje odpowiedzi API
- `findGalleryCandidates` — wykonuje się raz przy buildzie, nie przy każdym żądaniu

---

**Data aktualizacji:** czerwiec 2026  
**Autor:** Dokumentacja projektu  
**Wersja:** 1.1
