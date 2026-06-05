# Accord Services

Nowoczesna aplikacja webowa dla firmy Accord Services - dostarczającej profesjonalne rozwiązania w zakresie pomp ciepła, klimatyzacji, rekuperacji i fotowoltaiki w Opolu od 1984 roku.

## 🌐 Live Demo

- **Strona www:** https://accordproposition.vercel.app/
- **Dotychczasowa Strona www:** https://www.accord.opole.pl
- **Telefon:** +48 601 47 55 47
- **Email:** accordservice@interia.pl

## 🎯 O Projekcie

Aplikacja łączy nowoczesny **frontend (Next.js)** z potężnym **backendem (Django REST API)**:

- ✅ Responsywna strona internetowa z sekcjami: Hero, O nas, Usługi, Proces, Kontakt
- ✅ 4 strony detailowe usług z galeriami zdjęć
- ✅ Formularz kontaktowy z walidacją i wysyłaniem e-maili
- ✅ Panel administracyjny Django do zarządzania kontaktami
- ✅ REST API do integracji z systemami zewnętrznymi
- ✅ Mobile-first design z pełną responsywnością

## 🚀 Quick Start

### Wymagania

- Python 3.13+
- Node.js 18+ (v20 rekomendowane)
- Git

### Backend (Django)

```bash
# Klonowanie i instalacja
git clone https://github.com/ovezthaking/Accord-Services.git
cd Accord-Services

# Wirtualne środowisko
python -m venv .venv
.\.venv\Scripts\activate  # Windows
# source .venv/bin/activate  # Linux/Mac

# Zależności
pip install -r requirements.txt

# Konfiguracja bazy (opcjonalna lokalnie, wymagana na PostgreSQL)
# DATABASE_URL=postgresql://postgres:password@localhost:5432/accord_services
# DB_SSLMODE=require

# Migracje
python manage.py migrate

# Superuser (admin)
python manage.py createsuperuser

# Uruchomienie
python manage.py runserver
```

Jeśli nie aktywujesz środowiska, uruchamiaj komendy backendu przez lokalny interpreter:

```bash
./.venv/bin/python manage.py runserver
```

lub

```bash
uv run python manage.py runserver
```

Serwer: **http://localhost:8000**  
Admin: **http://localhost:8000/admin/**

### Frontend (Next.js)

```bash
cd frontend

# Zależności
npm install
# lub: pnpm install

# .env.local
echo "BACKEND_URL=http://localhost:8000" > .env.local

# Development server
npm run dev
```

Aplikacja: **http://localhost:3000**

## 📚 Dokumentacja

Pełna dokumentacja projektu dostępna w [DOKUMENTACJA.md](DOKUMENTACJA.md):

### Spisy treści
- [Przegląd Projektu](DOKUMENTACJA.md#przegląd-projektu)
- [Architektura Systemu](DOKUMENTACJA.md#architektura-systemu)
- [Backend - Django](DOKUMENTACJA.md#backend---django)
  - [Modele Danych](DOKUMENTACJA.md#modele-danych)
  - [REST API](DOKUMENTACJA.md#rest-api)
- [Frontend - Next.js](DOKUMENTACJA.md#frontend---nextjs)
  - [Komponenty](DOKUMENTACJA.md#komponenty-główne)
  - [Strony i Routing](DOKUMENTACJA.md#strony-i-komponenty)
- [Technologie](DOKUMENTACJA.md#technologie-i-zależności)
- [Przepływy Biznesowe](DOKUMENTACJA.md#przepływy-biznesowe)

## 🏗️ Stack Techniczny

### Backend
- **Django 6.0** - Web framework
- **Django REST Framework** - REST API
- **Django CORS Headers** - CORS support
- **PostgreSQL** - Primary database for deployments
- **SQLite** - Fallback for local development
- **Uvicorn** - ASGI server

### Frontend
- **Next.js 16** - React framework z App Router
- **React 19** - UI library
- **TypeScript 5.7** - Type safety
- **TailwindCSS 3.4** - Utility-first CSS
- **Shadcn/ui** - UI components (Radix UI)
- **Lucide Icons** - Icon library

## 📁 Struktura Projektu

```
Accord-Services/
├── accord/                 # Główna aplikacja Django
├── contact/               # Aplikacja kontaktów
│   ├── models.py         # Contact, ContactStatus
│   ├── api/              # REST API endpoints
│   └── migrations/       # Database migrations
├── chatai/               # Aplikacja AI (przyszłość)
├── frontend/             # Next.js aplikacja
│   ├── app/              # App Router pages
│   ├── components/       # React components
│   ├── lib/              # Utilities & types
│   └── public/           # Static assets
├── DOKUMENTACJA.md       # Pełna dokumentacja
├── requirements.txt      # Python dependencies
└── db.sqlite3           # Database
```

## 🔌 API Endpoints

### Kontakty
```
GET    /api/contacts          # Lista (wymaga login)
POST   /api/contacts          # Nowe zapytanie
GET    /api/contacts/<id>/    # Detail (wymaga login)
DELETE /api/contacts/<id>/    # Usuń (wymaga login)
```

Szczegółowa dokumentacja API: [DOKUMENTACJA.md - REST API](DOKUMENTACJA.md#rest-api)

## 🎨 Features

### Strony
- `GET /` - Strona główna z sekcjami
- `GET /uslugi/pompy-ciepla` - Pompy Ciepła
- `GET /uslugi/klimatyzacja` - Klimatyzacja
- `GET /uslugi/rekuperacja` - Rekuperacja
- `GET /uslugi/fotowoltaika` - Fotowoltaika

### Komponenty
- Header z nawigacją i mobile menu
- Hero section z CTA
- Karuzela usług
- Galeria zdjęć
- Formularz kontaktowy z validacją
- O nas / Proces / Kontakt sekcje
- Footer

## 🛠️ Narzędzia Developerskie

### Backend
- Django Admin: http://localhost:8000/admin/
- Django Shell: `python manage.py shell`
- Migracje: `python manage.py makemigrations`

### Frontend
- Dev server z hot reload
- ESLint dla code quality
- Next.js Turbopack dla szybszej kompilacji
- TypeScript dla type safety

## 📧 Konfiguracja E-maili

System automatycznie wysyła e-maile powiadomienia do administratora.

**Aktualnie wysyła do:** oliwerx12@gmail.com

Aby zmienić, edytuj: [contact/utils/send_mail.py](contact/utils/send_mail.py)

## 🔐 Bezpieczeństwo (Production)

⚠️ **Przed deploymentem:**
- [ ] Zmień `DEBUG = False` w `settings.py`
- [ ] Ustaw `SECRET_KEY` w zmiennych środowiskowych
- [ ] Konfiguruj CORS dla Twojej domeny
- [ ] Ustaw `ALLOWED_HOSTS`
- [ ] Konfiguruj SMTP do wysyłania e-maili
- [ ] Zwiększ ustawienia zabezpieczeń (HTTPS, CSRF, etc.)

## 📦 Build dla Produkcji

### Backend
```bash
python manage.py collectstatic
gunicorn accord.wsgi:application --bind 0.0.0.0:8000
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

Rekomenduję Docker dla obu serwisów.

## 🤝 Contribucja

1. Fork repozytorium
2. Stwórz feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit zmiany (`git commit -m 'Add some AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Otwórz Pull Request

## 📝 TODO / Przyszłe usprawnienia

- [ ] Integracja ChatAI dla asystenta na stronie
- [ ] Refaktoring modelu Contact (oddzielenie services)
- [ ] Integracja z systemem CRM
- [ ] Scheduling/rezerwacja usług
- [ ] System ocen i opinii
- [ ] Newsletter subscription

## 📞 Kontakt & Wsparcie

- **Email:** accordservice@interia.pl
- **Telefon:** +48 601 47 55 47
- **Lokalizacja:** Opole, Polska

## 📄 Licencja

Projekt wewnętrzny Accord Services.

## 🙏 Podziękowania

- [Django](https://www.djangoproject.com/) - Backend framework
- [Next.js](https://nextjs.org/) - Frontend framework
- [Shadcn/ui](https://ui.shadcn.com/) - UI components
- [TailwindCSS](https://tailwindcss.com/) - CSS framework

---

**Ostatnia aktualizacja:** 20 marca 2026  
**Wersja:** 1.0
