# 🚀 WebImgConverter - Ultimate Image Converter & SaaS

WebImgConverter is a modern, high-performance web application for converting images (HEIC, JPG, PNG, WEBP), utilizing AI for smart file naming, and integrated with Supabase for user management.

## ✨ Özellikler

- **Gelişmiş Dönüştürücü:** İstemci tarafında (Client-side) güvenli resim işleme. HEIC desteği dahildir.
- **AI Entegrasyonu:** Google Gemini API ile resim içeriğini analiz edip SEO dostu isimler üretme.
- **Kullanıcı Sistemi:** Supabase Auth ve Database ile kredi takibi ve üyelik sistemi (Google Login Dahil).
- **Gelir Modeli:** Google AdSense (Reklam) ve Premium Üyelik (Iyzico/Stripe hazırlığı) altyapısı.
- **Modern UI:** Tailwind CSS, Glassmorphism efektleri ve tamamen mobil uyumlu (Responsive).

---

## 🛠️ Kurulum Rehberi (Adım Adım)

Bu projeyi kendi sunucunuzda veya Vercel'de çalıştırmak için aşağıdaki adımları takip edin.

### 1. Supabase (Veritabanı) Kurulumu

1.  [Supabase.com](https://supabase.com) adresine gidin ve yeni bir proje oluşturun.
2.  Sol menüden **SQL Editor**'ü açın.
3.  Aşağıdaki SQL kodunu yapıştırın ve **RUN** butonuna basın:

```sql
-- Kullanıcı Profilleri Tablosu
create table profiles (
  id uuid references auth.users not null primary key,
  email text,
  credits int default 3,
  is_premium boolean default false,
  last_reset_date date default current_date,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Güvenlik (RLS)
alter table profiles enable row level security;
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Otomatik Profil Oluşturma Tetikleyicisi
create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, credits, is_premium)
  values (new.id, new.email, 3, false);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

4.  **Project Settings > API** kısmına gidin.
    *   `URL` ve `anon public` anahtarlarını kopyalayın.

### 2. Google OAuth (Google ile Giriş) Kurulumu

Google butonunun çalışması için bu ayarı yapmanız zorunludur:

1.  **Google Cloud Console**'a gidin.
2.  Yeni proje oluşturun, **APIs & Services > Credentials** kısmına gidin.
3.  **Create Credentials > OAuth Client ID** seçin.
    *   Application Type: **Web application**.
    *   Authorized JavaScript origins: `https://senin-projen.vercel.app` (Canlı URL) ve `http://localhost:3000`.
    *   Authorized redirect URIs: `https://<SUPABASE_PROJECT_ID>.supabase.co/auth/v1/callback` (Bunu Supabase Auth settings kısmında görebilirsiniz).
4.  Size verilen **Client ID** ve **Client Secret**'ı kopyalayın.
5.  Supabase Panelinde **Authentication > Providers > Google** kısmına gidin.
6.  `Client ID` ve `Client Secret`'ı yapıştırıp **Enable Google** diyerek kaydedin.

### 3. Google Gemini API (AI) Kurulumu

1.  [Google AI Studio](https://aistudio.google.com/) adresine gidin.
2.  **Get API Key** diyerek yeni bir anahtar oluşturun.

### 4. Google AdSense (Reklam) Kurulumu

1.  Google AdSense hesabınızda sitenizi (`WebImgConverter.com` gibi) ekleyin.
2.  Size verilen **Yayıncı Kimliği (Publisher ID)**'ni alın (Örn: `ca-pub-123456...`).
3.  Reklam Birimleri (Ad Units) oluşturun ve **Slot ID**'lerini not edin.

---

## ⚙️ Kod İçindeki Ayarlar

Aşağıdaki dosyalardaki `XXXXXXXX` ile belirtilen yerleri kendi bilgilerinizle değiştirin:

1.  **`services/supabase.ts`**:
    *   `SUPABASE_URL`: Supabase'den aldığınız URL.
    *   `SUPABASE_ANON_KEY`: Supabase'den aldığınız Anon Key.
    *   *(Güvenlik için bunları Vercel Environment Variables kısmına eklemeniz önerilir).*

2.  **`index.html`**:
    *   `ca-pub-XXXXXXXXXXXXXXXX`: AdSense Yayıncı Kimliğiniz.
    *   `G-XXXXXXXXXX`: Google Analytics 4 Ölçüm Kimliğiniz.

3.  **`components/AdBanner.tsx`**:
    *   `adClient`: AdSense Yayıncı Kimliği.
    *   `adSlot`: Oluşturduğunuz reklam birimi ID'si.

---

## 🚀 Yayınlama (Deployment)

Projeyi en kolay **Vercel** üzerinde yayınlayabilirsiniz.

1.  GitHub'a kodları yükleyin.
2.  Vercel'de "New Project" deyin ve repoyu seçin.
3.  **Environment Variables** kısmına şunları ekleyin:
    *   `API_KEY` : (Google Gemini API Anahtarınız)
4.  **Deploy** butonuna basın.

### Ödeme Sistemi Notu
Şu an `types.ts` dosyasında `ENABLE_PREMIUM_SYSTEM = false` olarak ayarlanmıştır. Backend (Node.js) tarafında Iyzico veya Stripe entegrasyonunu tamamladığınızda bunu `true` yapabilirsiniz.

**İyi Günlerde Kullanın! 💸**
WebImgConverter Team