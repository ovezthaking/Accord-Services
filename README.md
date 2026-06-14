# Accord Services

Nowoczesna aplikacja webowa dla firmy Accord Services - dostarczającej profesjonalne rozwiązania w zakresie pomp ciepła, klimatyzacji, rekuperacji i fotowoltaiki w Opolu od 1984 roku.

## 🌐 Live Demo

- **Strona www:** [accord.opole.pl](https://www.accord.opole.pl)
- **Telefon:** +48 601 47 55 47 / +48 783 636 363
- **Email:** accordservice@interia.pl

---

## 🎯 O Projekcie

Aplikacja łączy nowoczesny **frontend (Next.js)** z potężnym **backendem (Django REST API)**:

- ✅ Responsywna strona internetowa z sekcjami: Hero, O nas, Usługi, Proces, Kontakt
- ✅ 4 strony detailowe usług z galeriami zdjęć
- ✅ Dynamiczne strony lokalne (`/uslugi/[service]/[city]`) z obsługą ISR
- ✅ Formularz kontaktowy z walidacją i wysyłaniem e-maili (Resend API)
- ✅ Panel administracyjny Django do zarządzania kontaktami
- ✅ Zarządzanie odbiorcami e-mail z poziomu panelu admina (`EmailRecipient`)
- ✅ Galeria zdjęć zarządzana z Django Admin (Cloudinary) — `gallery`
- ✅ Moduł realizacji z karuzela na stronie głównej — `realization`
- ✅ REST API do integracji z systemami zewnętrznymi
- ✅ Mobile-first design z pełną responsywnością
- ✅ Strona QR (`/qr`) z linkami do kontaktu, mapy i Google Reviews
- ✅ Animacje wejścia/wyjścia elementów (`FadeIn`)
- ✅ Sitemap i robots.txt z dynamicznym generowaniem stron lokalnych
- ✅ SEO: Schema.org (LocalBusiness, Service, BreadcrumbList, WebSite)
- ✅ Google Analytics

---

## 🚀 Quick Start

### Wymagania

- Python 3.13+
- Node.js 18+ (v20 rekomendowane)
- Git
- [uv](https://docs.astral.sh/uv/) (rekomendowany) lub pip

### Backend (Django)

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
source .venv/bin/activate   # Linux/Mac
.\.venv\Scripts\activate    # Windows

pip install -r requirements.txt

python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Serwer developerski: **http://localhost:8000**  
Admin: **http://localhost:8000/admin/**

### Frontend (Next.js)

```bash
cd frontend
npm install

echo "BACKEND_URL=http://localhost:8000" > .env.local

npm run dev
```

Aplikacja: **http://localhost:3000**

---

## 📦 Build dla Produkcji

### Backend — Gunicorn

```bash
uv run python manage.py collectstatic --noinput
uv run gunicorn accord.wsgi:application --bind 0.0.0.0:8000
```

### Frontend

```bash
cd frontend
npm run build
npm start
```

---

## ☁️ Deployment

### Render (Backend Django)

| Ustawienie | Wartość |
|---|---|
| **Build Command** | `pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput` |
| **Start Command** | `gunicorn accord.wsgi:application` |
| **`DEBUG`** | `False` |
| **`SECRET_KEY`** | własna wartość produkcyjna |
| **`DATABASE_URL`** | URL z Neon / innego PostgreSQL |
| **`DB_SSLMODE`** | `require` |
| **`EMAIL_PASSWORD`** | hasło aplikacji Gmail (fallback SMTP) |
| **`RESEND_API_KEY`** | klucz API z resend.com |
| **`CLOUDINARY_CLOUD_NAME`** | nazwa konta Cloudinary |
| **`CLOUDINARY_API_KEY`** | klucz API Cloudinary |
| **`CLOUDINARY_API_SECRET`** | secret Cloudinary |
| **`RENDER_EXTERNAL_HOSTNAME`** | ustawiana automatycznie przez Render |

> Jeśli `RESEND_API_KEY` jest ustawiony, e-maile są wysyłane przez Resend. W przeciwnym razie używany jest fallback SMTP (Gmail).

### Vercel (Frontend Next.js)

| Ustawienie | Wartość |
|---|---|
| **`BACKEND_URL`** | adres backendu z Rendera, np. `https://twoj-backend.onrender.com` |

Rewrite w `next.config.ts` kieruje `/admin/*`, `/static/*`, `/media/*`, `/api/gallery/*` i `/api/realizations/*` do backendu Django.

---

## 📚 Dokumentacja

Pełna dokumentacja projektu dostępna w [DOKUMENTACJA.md](DOKUMENTACJA.md).

---

## 🏗️ Stack Techniczny

### Backend
- **Django 6.0** — Web framework
- **Django REST Framework** — REST API
- **Django CORS Headers** — CORS support
- **Cloudinary + django-cloudinary-storage** — przechowywanie zdjęć (galeria, realizacje)
- **PostgreSQL** — baza produkcyjna (Neon / Render)
- **SQLite** — fallback lokalny
- **Gunicorn** — WSGI server produkcyjny
- **Uvicorn** — ASGI server (alternatywa dev)
- **Whitenoise** — serwowanie plików statycznych
- **Resend** — wysyłanie e-maili (produkcja)
- **uv** — zarządzanie zależnościami i środowiskiem

### Frontend
- **Next.js 16** — React framework z App Router
- **React 19** — UI library
- **TypeScript 5.7** — Type safety
- **TailwindCSS 3.4** — Utility-first CSS
- **Shadcn/ui** — UI components (Radix UI)
- **Lucide Icons** — biblioteka ikon
- **react-image-gallery** — galeria zdjęć na stronach usług

---

## 📁 Struktura Projektu

```
Accord-Services/
├── accord/                 # Konfiguracja Django (settings, urls, wsgi, asgi)
├── contact/                # Aplikacja kontaktów
│   ├── models.py           # Contact, ContactStatus, EmailRecipient
│   ├── api/                # REST API endpoints + serializers
│   └── utils/              # send_mail (Resend/SMTP), parse_contact, dekoratory
├── gallery/                # Aplikacja galerii zdjęć (Cloudinary)
│   ├── models.py           # GalleryImage
│   └── api/                # GET /api/gallery
├── realization/            # Aplikacja realizacji
│   ├── models.py           # Realization
│   └── api/                # GET /api/realizations
├── chatai/                 # Aplikacja AI (przygotowana, niezaimplementowana)
├── frontend/               # Next.js aplikacja
│   ├── app/                # App Router pages
│   │   ├── page.tsx        # Strona główna
│   │   ├── uslugi/
│   │   │   ├── [service]/[city]/   # Dynamiczne strony lokalne (ISR)
│   │   │   ├── pompy-ciepla/
│   │   │   ├── klimatyzacja/
│   │   │   ├── rekuperacja/
│   │   │   └── fotowoltaika/
│   │   ├── qr/             # Strona QR
│   │   ├── sitemap.ts      # Dynamiczny sitemap
│   │   └── robots.ts       # robots.txt
│   ├── components/         # React components
│   │   ├── Realizations/   # RealizationsCarousel
│   │   ├── Services/       # ServicePage, LocalServicePage, PhotoGallery
│   │   └── fx/             # FadeIn animation
│   ├── hooks/              # use-toast, use-mobile, use-in-view, use-gallery
│   ├── lib/                # utils, types, navLinks, localPages, statsArray
│   └── public/             # Zdjęcia statyczne, logo, favicon
├── DOKUMENTACJA.md
├── requirements.txt
├── pyproject.toml
├── uv.lock
└── manage.py
```

---

## 🔌 API Endpoints

```
# Kontakty
GET    /api/contacts          # Lista zapytań (wymaga loginu)
POST   /api/contacts          # Nowe zapytanie (publiczne)
GET    /api/contacts/<id>/    # Szczegóły (wymaga loginu)
DELETE /api/contacts/<id>/    # Usuń (wymaga loginu)

# Galeria (Cloudinary)
GET    /api/gallery           # Lista zdjęć (?service=pompy|klimatyzacja|...)

# Realizacje
GET    /api/realizations      # Lista realizacji (?service=...&city_slug=...&limit=...)

# System
GET    /health/               # Health check
```

---

## 📧 System E-mail

E-maile wysyłane są po odebraniu nowego zapytania kontaktowego.

**Odbiorcy** zarządzani są z poziomu Django Admin → *Odbiorcy e-mail* (`EmailRecipient`). Można dodawać/wyłączać odbiorców bez zmiany kodu.

**Priorytety wysyłki:**
1. **Resend API** (`RESEND_API_KEY` ustawiony) — rekomendowane na produkcji, wysyła z domeny `kontakt@accord.opole.pl`
2. **SMTP Gmail** (fallback) — używany gdy brak klucza Resend

---

## 🖼️ Galeria i Realizacje

Zdjęcia galerii i realizacje są przechowywane w **Cloudinary** i zarządzane z panelu Django Admin.

**Galeria** (`/admin/gallery/galleryimage/`):
- Przypisanie do usługi: `pompy`, `klimatyzacja`, `rekuperacja`, `fotowoltaika`, `o-nas`
- Kolejność i widoczność (`order`, `is_active`) edytowalne inline

**Realizacje** (`/admin/realization/realization/`):
- Pola: tytuł, miasto, `city_slug`, usługa, opis, model urządzenia, powierzchnia, zdjęcie główne
- Wyświetlane w karuzeli na stronie głównej i stronach lokalnych `/uslugi/[service]/[city]`

---

## 🗺️ Strony i Funkcjonalności

| Ścieżka | Opis |
|---|---|
| `/` | Strona główna (Hero, Usługi, O nas, Proces, Kontakt + karuzela realizacji) |
| `/uslugi/pompy-ciepla` | Strona usługi — Pompy Ciepła |
| `/uslugi/klimatyzacja` | Strona usługi — Klimatyzacja |
| `/uslugi/rekuperacja` | Strona usługi — Rekuperacja |
| `/uslugi/fotowoltaika` | Strona usługi — Fotowoltaika |
| `/uslugi/[service]/[city]` | Dynamiczne strony lokalne (SEO) z ISR |
| `/qr` | Strona QR — szybki dostęp do telefonu, mapy, Google Reviews |
| `/sitemap.xml` | Dynamiczny sitemap (statyczne + strony lokalne z API) |
| `/admin/` | Panel administracyjny Django (proxy przez Next.js) |
| `/health/` | Health check backendu |

---

## 🛠️ Narzędzia Developerskie

```bash
# Backend
uv run python manage.py shell
uv run python manage.py makemigrations
uv run python manage.py migrate

# Frontend
npm run dev      # dev server z hot reload (Turbopack)
npm run build    # produkcyjny build
npm run lint     # ESLint
```

---

## 🔐 Bezpieczeństwo (Produkcja)

⚠️ **Przed deploymentem sprawdź:**

- [ ] `DEBUG = False` (zmienna środowiskowa `DEBUG=False`)
- [ ] `SECRET_KEY` w zmiennych środowiskowych
- [ ] `RESEND_API_KEY` ustawiony
- [ ] `DATABASE_URL` wskazuje na PostgreSQL z `DB_SSLMODE=require`
- [ ] `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` ustawione
- [ ] `ALLOWED_HOSTS` zawiera Twoją domenę
- [ ] CORS skonfigurowany dla właściwych domen
- [ ] `SESSION_COOKIE_SECURE = True` i `CSRF_COOKIE_SECURE = True` (już ustawione)

---

## 📝 TODO / Przyszłe Usprawnienia

- [ ] Integracja ChatAI — asystent na stronie (aplikacja `chatai` jest przygotowana)
- [ ] Refaktoring modelu `Contact` — wydzielenie `services` do osobnego modelu
- [ ] Integracja z systemem CRM
- [ ] Scheduling / rezerwacja usług online
- [ ] System ocen i opinii

---

## 📞 Kontakt & Wsparcie

- **Email:** accordservice@interia.pl
- **Telefon:** +48 601 47 55 47 / +48 783 636 363
- **Lokalizacja:** ul. Opolska 27, 46-024 Masów, woj. opolskie

## 📄 Licencja

Projekt wewnętrzny Accord Services.

---

**Ostatnia aktualizacja:** czerwiec 2026  
**Wersja:** 1.2