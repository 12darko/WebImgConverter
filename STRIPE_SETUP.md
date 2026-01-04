# Stripe Entegrasyon Rehberi (VormPixyze)

## 1. Stripe Hesabı Oluşturma (Ücretsiz)
1. [stripe.com](https://stripe.com) adresine git
2. Kayıt ol (Türkiye'de geçerli)
3. E-posta doğrulamasını yap

## 2. Test Mode'u Etkinleştir
- Dashboard'da sağ üstte "Test mode" toggle'ı aktif olmalı
- Test mode'da gerçek para akmaz, sadece simülasyon yapar

## 3. Ürün Oluşturma
1. **Products** → **Add product**
2. Bilgileri doldur:
   - Name: `VormPixyze Premium`
   - Pricing: `Recurring` → `Monthly`
   - Price: `29.99 TRY` (veya $4.99)
3. **Save product**

## 4. Payment Link Oluşturma
1. **Payment Links** → **New link**
2. Oluşturduğun ürünü seç
3. Ayarlar:
   - After payment: `Redirect to URL` → `https://vormpixyze.com/?payment=success`
   - Collect customer address: İhtiyaca göre
4. **Create link** → Linki kopyala

## 5. Projeye Entegrasyon
`.env.local` dosyasına ekle:
```
VITE_STRIPE_CHECKOUT_URL=https://buy.stripe.com/xxx...
```

## 6. Webhook Ayarı (Opsiyonel - Gelişmiş)
Ödeme başarılı olduğunda Supabase'de kullanıcıyı premium yapmak için:

1. **Developers** → **Webhooks** → **Add endpoint**
2. Endpoint URL: `https://senin-domain.com/api/stripe-webhook`
3. Events: `checkout.session.completed`

## 7. Canlıya Geçiş
1. Test mode'u kapat
2. Stripe hesap doğrulamasını tamamla (kimlik, banka bilgisi)
3. Payment Link'i production versiyonuyla değiştir

---

## Fiyatlandırma
| Bölge | Fiyat |
|-------|-------|
| 🇹🇷 Türkiye | ₺29.99/Ay |
| 🇺🇸 ABD | $4.99/Mo |

**Stripe Komisyonu:** %2.9 + 30¢

## Test Kartları
| Kart | Sonuç |
|------|-------|
| 4242 4242 4242 4242 | Başarılı |
| 4000 0000 0000 0002 | Reddedilir |

SKT: 12/34, CVC: 123
