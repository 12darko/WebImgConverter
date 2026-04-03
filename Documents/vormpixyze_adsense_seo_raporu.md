# 🖼️ vormpixyze.com — AdSense Onay Engeli Kapsamlı Site Analiz ve Aksiyon Raporu

| Alan | Değer |
|---|---|
| **Site** | vormpixyze.com |
| **Site Türü** | Online Görsel Dönüştürme Aracı (Tool Site) |
| **Araçlar** | HEIC→JPG, WebP→JPG, PNG→JPG, Arkaplan Kaldırma, Görsel Sıkıştırma |
| **Rapor Tarihi** | 2 Nisan 2026 (v2 — AI İçerik + Tam Sayfa Denetimi) |
| **AdSense Durumu** | ⛔ Müdahale Edilmesi Gerekiyor |
| **Red Gerekçesi** | Düşük Değere Sahip İçerik |
| **ads.txt Durumu** | ❌ Bulunamadı — ACİL EKLE |
| **Tahmini Onay Süresi** | 6–10 Hafta (Aksiyonlar Sonrası) |

> **Önemli Not:** VormPixyze, diğer 3 sitenizden farklı bir kategoridedir. Tool site yapısı AdSense için en zorlu kategorilerden biridir. Aşağıdaki aksiyonlar olmadan onay almak neredeyse imkânsızdır.

---

## 1. Tam Sayfa Denetimi

### 1.1 Kritik Teknik Tespit: SPA / SSR Sorunu

Site büyük ihtimalle React/Next.js veya benzer bir JavaScript framework ile oluşturulmuş. Bu, ciddi bir sorun yaratıyor:

**Tüm sayfalar sunucudan aynı HTML içeriğini döndürüyor.** Sayfalar arası fark tamamen JavaScript ile oluşturuluyor. Google botu bu içeriği okuduğunda:

- `/heic-to-jpg`, `/webp-to-jpg`, `/remove-background` ve ana sayfa — hepsi **birebir aynı HTML**
- Her sayfanın `<title>` etiketi: `"Free HEIC & WebP to JPG Converter Online | VormPixyze"` — aynı
- Her sayfanın body içeriği: 3 madde + 5 link — aynı

Google bu durumu **tüm sayfalar birbirinin kopyası** olarak işaretliyor. Bu tek başına AdSense reddinin yeterli sebebidir.

### 1.2 Sayfa Sayfa Durum Tablosu

| Sayfa / URL | HTML Benzersiz mi? | Meta Title | Kelime Sayısı | Değerlendirme |
|---|---|---|---|---|
| Ana Sayfa `/` | ❌ Hayır | ❌ Genel | ~30 kelime | 3 bullet point + 5 link — içerik sıfır |
| `/heic-to-jpg` | ❌ **Ana sayfa ile aynı** | ❌ **Aynı** | ~30 kelime | SPA sorunu — Google göremez |
| `/webp-to-jpg` | ❌ **Ana sayfa ile aynı** | ❌ **Aynı** | ~30 kelime | SPA sorunu — Google göremez |
| `/png-to-jpg` | ❌ **Ana sayfa ile aynı** | ❌ **Aynı** | ~30 kelime | SPA sorunu — Google göremez |
| `/remove-background` | ❌ **Ana sayfa ile aynı** | ❌ **Aynı** | ~30 kelime | SPA sorunu — Google göremez |
| `/compress-image` | ❌ **Ana sayfa ile aynı** | ❌ **Aynı** | ~30 kelime | SPA sorunu — Google göremez |
| Blog / Makale | ❌ **YOK** | — | — | Tool site için zorunlu |
| Hakkımızda | ❌ **YOK** | — | — | E-E-A-T sinyali sıfır |
| Gizlilik Politikası | ❓ Belirsiz | — | — | AdSense için zorunlu — kontrol et |
| Kullanım Şartları | ❓ Belirsiz | — | — | Kontrol et |
| İletişim | ❓ Belirsiz | — | — | Kontrol et |
| SSS / FAQ | ❌ **YOK** | — | — | Her araç sayfasında bulunmalı |
| ads.txt | ❌ **YOK** | — | — | **ACİL — AdSense başvurusu yapılamaz** |
| Google Index | ⚠️ Sorunlu | — | — | Organik aramada site adı dahi çıkmıyor |
| Schema.org | ❌ YOK | — | — | SoftwareApplication, FAQ eksik |
| Backlink | ❌ Sıfır | — | — | Herhangi bir referans kaynak yok |

### 1.3 AdSense Red — Kök Nedenler

1. **Tüm sayfalar özdeş HTML** (SPA sorunu) — Google tek sayfa olarak görüyor
2. **ads.txt yok** — Google yayıncıyı doğrulayamıyor
3. **Sıfır metin içeriği** — Her sayfada 30 kelimeden az Google'ın okuyabileceği metin
4. **Hakkımızda, Gizlilik, Şartlar eksik** — AdSense minimum gereksinimleri karşılanmıyor
5. **Sıfır organik varlık** — Site adı dahi Google'da organik sonuç üretmiyor
6. **E-E-A-T sinyali sıfır** — Kim yapmış? Neden güvenilmeli? Hiçbir bilgi yok

---

## 2. Rakip Analizi

Tool site kategorisinde AdSense alan rakiplerin ortak özellikleri:

| Rakip | Araç Sayısı | Sayfa Başı Metin | Blog | FAQ | AdSense |
|---|---|---|---|---|---|
| convertio.co | 300+ format | 300-500 kelime | ✅ Var | ✅ Var | ✅ Onaylı |
| ilovemimg.com | 25+ araç | 200-400 kelime | ✅ Var | ✅ Var | ✅ Onaylı |
| freeconvert.com | 100+ araç | 400-600 kelime | ✅ Var | ✅ Var | ✅ Onaylı |
| heic.online | Tek niş | 600+ kelime | ❌ Yok | ✅ Var | ✅ Onaylı |
| cloudconvert.com | 200+ format | 500+ kelime | ✅ Var | ✅ Var | ✅ Onaylı |
| **vormpixyze.com** | 5 araç | **~30 kelime** | ❌ Yok | ❌ Yok | ❌ Red |

**Rakiplerde her araç sayfasında bulunan içerik yapısı:**
- Araç başlığı + kısa açıklama
- Nasıl kullanılır (adım adım)
- Format hakkında bilgi (200-300 kelime)
- Desteklenen cihazlar / işletim sistemleri
- SSS bölümü (5-8 soru)
- Karşılaştırma tablosu
- İlgili araçlara link

Sizde bunların **tamamı** eksik.

---

## 3. Aksiyon Planı

### 🔴 HAFTA 1 — Engelleyici Sorunlar

**Adım 1: ads.txt Oluştur (30 dakika)**

AdSense Publisher ID'nizi alın, `/ads.txt` dosyasını kök dizine koyun:
```
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

**Adım 2: Zorunlu Sayfaları Oluştur (1-2 gün)**

- **Gizlilik Politikası `/privacy-policy`:** Hangi veriler işleniyor, çerez kullanımı — min. 300 kelime
- **Kullanım Şartları `/terms-of-service`:** Hizmet kapsamı, sorumluluk reddi
- **Hakkımızda `/about`:** Kim bu aracı yaptı? Neden? Ne kadar süredir aktif?
- **İletişim `/contact`:** En az bir e-posta adresi

**Adım 3: SPA / Meta Tag Düzeltmesi (1-2 gün)**

Her sayfanın `<title>` ve `<meta description>` etiketi **sunucu tarafında (SSR)** render edilmeli. JavaScript ile sonradan eklenmesi Google tarafından görülmüyor.

Önerilen title formatları:
- Ana sayfa: `"Free Online Image Converter — HEIC, WebP, PNG to JPG | VormPixyze"`
- `/heic-to-jpg`: `"HEIC to JPG Converter — Free, Instant, No Upload Limit | VormPixyze"`
- `/webp-to-jpg`: `"WebP to JPG Converter — Convert WebP Images Free Online | VormPixyze"`
- `/png-to-jpg`: `"PNG to JPG Converter — Compress & Convert PNG Free | VormPixyze"`
- `/remove-background`: `"Remove Image Background Free — AI Background Remover | VormPixyze"`
- `/compress-image`: `"Compress Images Online Free — Reduce JPG, PNG Size | VormPixyze"`

---

### 🔴 HAFTA 2-3 — Her Araç Sayfasına İçerik Ekle

**Hedef: Sayfa başına minimum 500 kelime.** Aşağıdaki şablon her araç için uygulanmalı.

**Bölüm 1 — Başlık + Açıklama (50 kelime)**
Aracın ne yaptığını 2-3 cümleyle anlat.

**Bölüm 2 — Nasıl Kullanılır (100 kelime, adım adım)**
1. Upload HEIC image(s) — up to 50 files at once
2. Select output quality
3. Click Convert
4. Download instantly

**Bölüm 3 — Format Hakkında Bilgi (200-300 kelime) [EN KRİTİK]**
Bu bölüm AdSense için en kritik kısım — gerçek "içerik değeri" burada oluşuyor.

HEIC sayfası için: HEIC nedir? Apple neden geliştirdi? HEIC vs JPG boyut/kalite farkı. Windows'ta neden açılmıyor?
WebP sayfası için: WebP nedir? Google neden geliştirdi? WebP vs JPG vs PNG karşılaştırma. Tarayıcı uyumluluğu.
PNG sayfası için: PNG vs JPG ne zaman kullanılmalı? Şeffaf arka planın avantajları. Kalite farkı.

**Bölüm 4 — Özellikler Karşılaştırma Tablosu**

| Özellik | VormPixyze | Convertio | iLoveIMG |
|---|---|---|---|
| Ücretsiz mi? | ✅ Sınırsız | ⚠️ 25/gün | ⚠️ Saatlik limit |
| Gizlilik | ✅ Lokal işlem | ❌ Sunucuya yüklür | ❌ Sunucuya yüklür |
| Kayıt Gerekli | ❌ Yok | ❌ Yok | ❌ Yok |

**Bölüm 5 — SSS (100-150 kelime, 5 soru)**
- Is VormPixyze really free with no limits?
- Are my files safe? Do you store my images?
- What's the maximum file size?
- Can I convert multiple files at once?
- Does it work on iPhone / Android / Windows / Mac?

---

### 🟠 HAFTA 3-4 — Blog Bölümü Oluştur

**Önerilen ilk 10 makale (İngilizce — global kitle + yüksek CPM):**

1. What is HEIC? Why Apple Uses It and How to Open It on Windows — 800 kelime
2. HEIC vs JPG vs PNG: Which Format Should You Use in 2026? — 1000 kelime
3. How to Change iPhone Camera to Save as JPG Instead of HEIC — 600 kelime
4. WebP Format Explained: Why Google Created It and When to Use It — 700 kelime
5. How to Reduce Image File Size Without Losing Quality — 800 kelime
6. Best Ways to Remove Image Background Free in 2026 — 700 kelime
7. PNG vs JPG: The Complete Guide for Web Developers — 900 kelime
8. How to Batch Convert Images on Windows, Mac, and Online — 600 kelime
9. AVIF vs WebP vs JPEG: Next-Gen Image Formats Compared — 800 kelime
10. Why Your Images Are Too Large and How to Fix It — 700 kelime

---

### 🟠 HAFTA 4-5 — Teknik SEO

**Schema.org:**

| Schema Türü | Nerede | Faydası |
|---|---|---|
| SoftwareApplication | Tüm araç sayfaları | "Free tool" rich snippet |
| FAQPage | Tüm araç sayfaları | SSS kutusu |
| BreadcrumbList | Tüm sayfalar | URL netleşir |
| WebSite + SearchAction | Ana sayfa | Site arama kutusu |
| Article | Blog makaleleri | Makale snippet |

**Google Search Console:**
- Siteyi Search Console'a ekle
- Sitemap.xml oluştur ve gönder
- URL Inspection aracıyla SPA sorununu doğrula: "Rendered HTML" ile kaynak HTML'i karşılaştır
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, mobil PageSpeed 80+

**Yeni Araçlar (SEO long tail için):**
JPG→PNG, JPG→WebP, AVIF→JPG, SVG→PNG, PDF→JPG, Image Resizer, Watermark Remover, EXIF Remover

**Backlink Stratejisi:**
- Product Hunt lansmanı (ücretsiz, yüksek etki)
- Reddit: r/webdev, r/photography paylaşımı
- AlternativeTo, Capterra tool dizinlerine ekle

---

## 4. Tool Sitesi AdSense Özel Notu

**İçerik/Araç Dengesi:** Google tool sitelerini ancak araçların yanında yeterli bilgi içeriği olduğunda onaylıyor. Şu an araç var, içerik sıfır. Hedef: her araç sayfasında **500 kelime içerik + araç**.

**Alternatif Gelir Modeli:** Tool sitelerinde AdSense CPM değeri düşük olabiliyor. Paralel değerlendirin:
- Ücretsiz/Premium plan (aylık X dönüşüm ücretsiz, sınırsız ücretli)
- API erişimi için ücretli tier
- Sponsor banner (doğrudan reklamveren anlaşması)

---

## 5. ⚠️ Google AI İçerik Tespiti ve Korunma Rehberi

### 5.1 Google'ın Gerçek Tutumu (2026 Güncel)

Google, AI ile üretilen içeriği **doğrudan yasaklamıyor.** Resmi açıklama:

> *"Automation — including AI — to generate content with the primary purpose of manipulating ranking in search results is a violation of our spam policies. Not all use of automation, including AI generation, is spam."* — Google Search Central

**SpamBrain sistemi neyi arar?**
- Yüzlerce sayfada aynı cümle kalıpları ve yapısı
- İnsan deneyimi olmayan, özgün bakış açısı taşımayan metin
- Kısa sürede toplu yayın (scaled content abuse)
- Yazar kimliği ve otorite sinyali taşımayan içerik

Ahrefs'in 600.000 sayfalık araştırması: üst sıralardaki sayfaların **%86.5'i AI yardımıyla üretilmiş.** Ceza alan siteler AI kullanan siteler değil — editörsüz toplu yayınlayan siteler.

### 5.2 AI İçerik Güvenli Yayın Protokolü — 5 Adım

**Adım 1 — Ham AI çıktısını asla doğrudan yayınlama**
AI çıktısı her zaman taslak — insan editöründen geçmeden yayına çıkmamalı.

**Adım 2 — Her içeriğe "İnsan Katmanı" ekle**

| AI Taslakta Olan | İnsan Katmanıyla Eklenmeli |
|---|---|
| Genel format bilgisi | Gerçek performans verisi / kişisel test sonucu |
| Standart cümleler | Gerçek kullanıcı senaryosu, somut örnek |
| Robotik anlatım | Doğal, sohbet tonu |
| Genel sonuç | Araç özeline özgün çıkarım |
| Yazar yok | Yazar adı + kısa bio + güncelleme tarihi |

**Adım 3 — AI İmzasını Temizle**

| Kaçınılacak Kalıp | Doğru Alternatif |
|---|---|
| "In this comprehensive guide..." | Doğrudan konuya gir |
| "It's worth noting that..." | Gerek yok, doğrudan söyle |
| Em dash (—) aşırı kullanımı | Normal noktalama |
| "Leverage", "utilize", "seamlessly" | Simple, direct words |
| Her paragraf eşit uzunlukta | Değişken paragraf uzunluğu |
| Fazla nested bullet list | Prosada yaz |

**Adım 4 — Yayın Öncesi AI Testi**

| Araç | URL | Ücret |
|---|---|---|
| GPTZero | gptzero.me | ✅ Kısmen ücretsiz |
| ZeroGPT | zerogpt.com | ✅ Ücretsiz |
| Originality.ai | originality.ai | ❌ Ücretli (en güvenilir) |
| Sapling AI Detector | sapling.ai/ai-content-detector | ✅ Ücretsiz |

> **Hedef:** Originality.ai'de **%30 altında AI skoru**. ZeroGPT'de "Human" veya "Mixed".

**Adım 5 — Yayın Hızını Kontrol Et**

- ✅ Günde maksimum 3-5 sayfa / makale
- ✅ Her yeni araç sayfasını ayrı günde yayınla
- ✅ Blog makaleleri haftada 2'den fazla olmasın (başlangıç aşamasında)
- ❌ 1 günde tüm araç sayfalarını + 10 blog makalesi yayınlama — spam uyarısı tetikler

### 5.3 VormPixyze E-E-A-T Sinyalleri

Tool sitelerinde E-E-A-T özellikle kritik — ziyaretçi "Bu araç güvenli mi?" diye soruyor:

| Sinyal | Durum | Yapılacak |
|---|---|---|
| **Deneyim:** Araçları kim test etti? | ❌ Yok | Hakkımızda sayfasında belirt |
| **Uzmanlık:** Format bilgisi doğru mu? | ❌ Yok | Her araç sayfasında kaynaklı format bilgisi |
| **Otorite:** Başka siteler referans veriyor mu? | ❌ Sıfır | Product Hunt + tool dizinleri |
| **Güvenilirlik:** Dosyalar nasıl işleniyor? | ❌ Belirsiz | "Files processed locally, never uploaded" açıkça belirt |
| **Güncellik:** Site ne zaman güncellenmiş? | ❌ Yok | Blog makalelerine tarih damgası |

### 5.4 VormPixyze İçin AI Kullanım Sınırları

**Güvenli kullanım:**
- Her araç sayfası için format açıklama taslağı → insan editörü → yayınla
- Blog makale taslakları → kişisel test sonucu ve gerçek ekran görüntüleri ekle → yayınla
- SSS taslağı → gerçek kullanıcı sorularıyla zenginleştir

**Riskli (yasak) kullanım:**
- 5 araç sayfasını aynı günde AI ile doldurup doğrudan yayınlamak
- 10 blog makalesini 2 günde yayınlamak
- Format bilgilerini fact-check etmeden yayınlamak (AI hallüsinasyon riski)
- Hakkımızda sayfasını AI ile yazıp editör görmeden koymak

---

## 6. Önceliklendirilmiş Aksiyon Planı

| # | Aksiyon | Açıklama | Öncelik | Efor |
|---|---|---|---|---|
| 1 | ads.txt Oluştur | Publisher ID ile /ads.txt dosyası | 🔴 YÜKSEK | Düşük |
| 2 | Gizlilik Politikası + Şartlar | Min. 300 kelime, gerçek içerik | 🔴 YÜKSEK | Düşük |
| 3 | Hakkımızda + İletişim | E-E-A-T için zorunlu | 🔴 YÜKSEK | Düşük |
| 4 | SSR / Meta Tag Düzeltmesi | Her sayfa benzersiz title + description | 🔴 YÜKSEK | Orta |
| 5 | HEIC→JPG Sayfası İçerik | 500+ kelime, FAQ, format bilgisi | 🔴 YÜKSEK | Orta |
| 6 | WebP→JPG Sayfası İçerik | 500+ kelime, FAQ, format bilgisi | 🔴 YÜKSEK | Orta |
| 7 | PNG→JPG Sayfası İçerik | 500+ kelime, FAQ, format bilgisi | 🔴 YÜKSEK | Orta |
| 8 | Remove Background İçerik | 500+ kelime, kullanım rehberi | 🔴 YÜKSEK | Orta |
| 9 | Compress Image İçerik | 500+ kelime, format karşılaştırma | 🔴 YÜKSEK | Orta |
| 10 | Search Console + Sitemap | Index sorununu tespit et, sitemap gönder | 🔴 YÜKSEK | Düşük |
| 11 | İlk 5 Blog Makalesi | HEIC, WebP, PNG rehber makaleleri | 🟠 ORTA | Yüksek |
| 12 | Schema.org | SoftwareApplication, FAQ, BreadcrumbList | 🟠 ORTA | Orta |
| 13 | Core Web Vitals | PageSpeed 80+ mobil | 🟠 ORTA | Orta |
| 14 | Product Hunt Lansmanı | Backlink + trafik + otorite | 🟠 ORTA | Düşük |
| 15 | 5 Yeni Araç | JPG→PNG, WebP→PNG, AVIF vb. | 🟢 DÜŞÜK | Yüksek |

---

## 7. Zaman Çizelgesi

| Zaman | Aksiyonlar | Hedef |
|---|---|---|
| Hafta 1 | #1, #2, #3, #4, #10 | ads.txt, zorunlu sayfalar, SSR meta düzeltmesi |
| Hafta 2-3 | #5, #6, #7, #8, #9 | 5 araç sayfasının tamamı 500+ kelime içerik |
| Hafta 3-4 | #11, #12 | İlk 5 blog makalesi + schema |
| Hafta 4-5 | #13, #14 | Teknik optimizasyon + Product Hunt |
| **Hafta 6+** | **AdSense Başvurusu** | **Tüm içerik ve teknik şartlar tamamlandıktan sonra** |

---

## 8. Sonuç

VormPixyze, 4 siteniz içinde en zorlu durumda olan site. Üç katmanlı problem var: ads.txt yok, SPA sorunuyla Google sayfaları göremez, içerik sıfır. 

> ✅ **Bugün yapılacak 3 şey:** ads.txt + Gizlilik Politikası + Hakkımızda. Bu 3 sayfa yarım günde bitirilebilir.

> ⚠️ **AI kullanıyorsanız:** Her araç sayfasının içeriğini ayrı günlerde yayınlayın. Format bilgilerini mutlaka fact-check edin (AI hallüsinasyon riski yüksek). Yayın öncesi GPTZero ile test edin.

> 🚫 **namazvakitlerim.com'a göre çok daha fazla iş var.** 4-6 haftadan önce başvuru yapmayın.

---

*Bu rapor vormpixyze.com için hazırlanmıştır. — 2 Nisan 2026 (v2)*
