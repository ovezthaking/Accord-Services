# Accord Services

Nowoczesna aplikacja webowa dla firmy Accord Services - dostarczającej profesjonalne rozwiązania w zakresie pomp ciepła, klimatyzacji, rekuperacji i fotowoltaiki w Opolu od 1984 roku.

## 🌐 Live Demo

- **Strona www:** [Accord Service](https://www.accord.opole.pl)
- **Telefon:** +48 601 47 55 47 / +48 783 636 363
- **Email:** accordservice@interia.pl

## 🎯 O Projekcie

Aplikacja łączy nowoczesny **frontend (Next.js)** z potężnym **backendem (Django REST API)**:

- ✅ Responsywna strona internetowa z sekcjami: Hero, O nas, Usługi, Proces, Kontakt
- ✅ 4 strony detailowe usług z galeriami zdjęć
- ✅ Formularz kontaktowy z walidacją i wysyłaniem e-maili (Resend API)
- ✅ Panel administracyjny Django do zarządzania kontaktami
- ✅ Zarządzanie odbiorcami e-mail z poziomu panelu admina (model `EmailRecipient`)
- ✅ REST API do integracji z systemami zewnętrznymi
- ✅ Mobile-first design z pełną responsywnością
- ✅ Strona QR (`/qr`) z linkami do kontaktu, mapy i Google Reviews
- ✅ Animacje wejścia/wyjścia elementów (`FadeIn`)

## 🚀 Quick Start

### Wymagania

- Python 3.13+
- Node.js 18+ (v20 rekomendowane)
- Git
- [uv](https://docs.astral.sh/uv/) (rekomendowany) lub pip

### Backend (Django)

```bash
# Klonowanie
git clone https://github.com/ovezthaking/Accord-Services.git
cd Accord-Services
```

#### Uruchomienie przez uv (rekomendowane)

```bash
# uv sam tworzy środowisko i instaluje zależności z uv.lock
uv run python manage.py migrate
uv run python manage.py createsuperuser
uv run python manage.py runserver
```

#### Uruchomienie przez pip + venv

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

npm install        # lub: pnpm install

# Utwórz plik .env.local
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

Lub przez lokalny interpreter (bez uv):

```bash
python manage.py collectstatic --noinput
gunicorn accord.wsgi:application --bind 0.0.0.0:8000
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
| **`RENDER_EXTERNAL_HOSTNAME`** | ustawiana automatycznie przez Render |

> Jeśli `RESEND_API_KEY` jest ustawiony, e-maile są wysyłane przez Resend. W przeciwnym razie używany jest fallback SMTP (Gmail).

### Vercel (Frontend Next.js)

| Ustawienie | Wartość |
|---|---|
| **`BACKEND_URL`** | adres backendu z Rendera, np. `https://twoj-backend.onrender.com` |

Rewrite w `next.config.ts` kieruje `/admin/*` i `/static/*` do backendu Django.

---

## 📚 Dokumentacja

Pełna dokumentacja projektu dostępna w [DOKUMENTACJA.md](DOKUMENTACJA.md).

---

## 🏗️ Stack Techniczny

### Backend
- **Django 6.0** — Web framework
- **Django REST Framework** — REST API
- **Django CORS Headers** — CORS support
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

---

## 📁 Struktura Projektu

```
Accord-Services/
├── accord/                 # Konfiguracja Django (settings, urls, wsgi, asgi)
├── contact/                # Aplikacja kontaktów
│   ├── models.py           # Contact, ContactStatus, EmailRecipient
│   ├── api/                # REST API endpoints + serializers
│   ├── utils/              # send_mail (Resend/SMTP), parse_contact, dekoratory
│   └── migrations/
├── chatai/                 # Aplikacja AI (przygotowana, niezaimplementowana)
├── frontend/               # Next.js aplikacja
│   ├── app/                # App Router pages (/, /uslugi/*, /qr)
│   ├── components/         # React components (Header, Footer, Forms, Services…)
│   ├── lib/                # Utilities, types, navLinks, statsArray
│   ├── hooks/              # use-toast, use-mobile, use-in-view
│   ├── utils/              # findGalleryCandidates
│   └── public/             # Zdjęcia, logo, favicon
├── DOKUMENTACJA.md
├── requirements.txt        # Zależności pip
├── pyproject.toml          # Konfiguracja projektu + zależności uv
├── uv.lock                 # Lock file uv
└── manage.py
```

---

## 🔌 API Endpoints

```
GET    /api/contacts          # Lista zapytań (wymaga loginu)
POST   /api/contacts          # Nowe zapytanie (publiczne)
GET    /api/contacts/<id>/    # Szczegóły (wymaga loginu)
DELETE /api/contacts/<id>/    # Usuń (wymaga loginu)
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

## 🎨 Strony i Funkcjonalności

| Ścieżka | Opis |
|---|---|
| `/` | Strona główna (Hero, Usługi, O nas, Proces, Kontakt) |
| `/uslugi/pompy-ciepla` | Strona usługi — Pompy Ciepła |
| `/uslugi/klimatyzacja` | Strona usługi — Klimatyzacja |
| `/uslugi/rekuperacja` | Strona usługi — Rekuperacja |
| `/uslugi/fotowoltaika` | Strona usługi — Fotowoltaika |
| `/qr` | Strona QR — szybki dostęp do telefonu, mapy, Google Reviews |
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

- [ ] `DEBUG = False` w `settings.py` (lub zmienna środowiskowa `DEBUG=False`)
- [ ] `SECRET_KEY` w zmiennych środowiskowych (nie w kodzie)
- [ ] `RESEND_API_KEY` ustawiony
- [ ] `DATABASE_URL` wskazuje na PostgreSQL
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
**Wersja:** 1.1
