const fs = require('fs');
const path = require('path');
const blogPath = path.join(__dirname, 'pages', 'BlogArticle.tsx');
let content = fs.readFileSync(blogPath, 'utf8');

const gorsel2025 = `
const gorselFormat2025 = {
    tr: {
        title: '2025 Görsel Format Rehberi: AVIF, WebP, HEIC ve JPG Karşılaştırması',
        description: 'Yeni nesil görsel formatları arasında hangisi sizin için en doğru seçim? Kapsamlı teknik Karşılaştırma ve kullanım senaryoları.',
        date: '2025-03-01',
        readTime: '10 dk',
        category: 'Rehber',
        content: \\\`
## 2025 Yılında Hangi Görsel Formatı Kullanılmalı?

İnternetin gelişimiyle birlikte, görsellerin boyutu ve kalitesi web performansını belirleyen en önemli unsurlardan biri haline geldi. 1990'lardan kalma JPG ve PNG formatları hala çalışıyor olsa da, Google ve Apple gibi devlerin yönlendirdiği yeni nesil formatlar oyunun kurallarını tamamen değiştirdi.

Bu rehberde, 2025 yılı itibariyle standart kabul edilen 4 ana formatın (AVIF, WebP, HEIC ve JPG) detaylı incelemesini ve hangisini ne zaman kullanmanız gerektiğini anlatacağız.

## AVIF: Yeni Nesil Şampiyon

AVIF (AV1 Image File Format), AV1 video codec'ini temel alan, bugüne kadar geliştirilmiş en verimli görsel sıkıştırma formatıdır.
- **Avantajı:** WebP'den bile %30, JPG'den ise %50 oranında daha iyi sıkıştırma sağlar. HDR desteği mükemmeldir.
- **Dezavantajı:** Daha fazla işlemci gücü gerektirir. Eski tarayıcılarda (örneğin 2021 öncesi) desteklenmez.
- **Kullanım Yeri:** Maksimum performans arayan modern web siteleri ve e-ticaret devleri.

## WebP: Altın Standart

Google'ın geliştirdiği WebP, artık "geleceğin formatı" değil, **bugünün standardıdır**.
- **Avantajı:** Hem kayıplı (JPG gibi) hem de kayıpsız (PNG gibi) sıkıştırmayı destekler. Şeffaflık (Alpha) kanalı vardır. Her tarayıcıda %100 çalışır.
- **Dezavantajı:** Masaüstündeki eski yazılımlar (eski Photoshop sürümleri vb.) tarafından doğrudan açılamayabilir.
- **Kullanım Yeri:** Tüm web siteleri, blog yazıları ve sosyal medya banner'ları.

## HEIC: Apple'ın Gözbebeği

HEIC (High Efficiency Image Container), Apple cihazlarında depolama alanından devasa tasarruf sağlamak için kullanılır.
- **Avantajı:** Harika sıkıştırma, Live Photos desteği, 16-bit renk derinliği ve derinlik haritası barındırması.
- **Dezavantajı:** Evrensel uyumluluğu zayıftır. Windows'ta veya web sitelerinde yerel olarak açılamaz.
- **Kullanım Yeri:** Yalnızca kişisel arşivleme ve iOS ekosistemi. Paylaşılacağı zaman mutlaka WebImgConverter gibi bir araçla JPG'ye çevrilmelidir.

## JPG: Yaşlı ama Güvenilir

1992'den beri hayatımızda olan JPEG, dijital dünyanın tartışmasız kralıdır.
- **Avantajı:** Evrensel uyumluluk. Akıllı saatinizden televizyonunuza kadar her şey JPG açabilir.
- **Dezavantajı:** Şeffaflık desteklemez ve dosya boyutu rakiplerine göre çok büyüktür.
- **Kullanım Yeri:** Web dışı (offline) paylaşımlar, e-posta ekleri ve maksimum uyumluluk gerektiren her yer.

## Sonuç ve Tavsiye

Eğer bir web sitesi yönetiyorsanız, görsellerinizi mutlaka **WebP veya AVIF** formatında sunmalısınız. Bu, SEO skorlarınızı anında artıracaktır. Eğer telefonunuzdan bilgisayarınıza veya bir arkadaşınıza fotoğraf yollayacaksanız, HEIC dosyalarınızı her ihtimale karşı **JPG'ye çevirerek** göndermeniz en güvenli yoldur.
\\\`
    }
};
articleDatabase['2025-gorsel-format-rehberi'] = gorselFormat2025;
`;

const topluGorsel = `
const topluGorselIsleme = {
    tr: {
        title: 'Toplu Görsel İşleme: 100+ Dosyayı Saniyede Dönüştürmenin Yolları',
        description: 'Yüzlerce fotoğrafı tek seferde dönüştürün, yeniden boyutlandırın ve sıkıştırın. Profesyonel iş akışı için zamandan tasarruf ipuçları.',
        date: '2025-03-15',
        readTime: '5 dk',
        category: 'İpuçları',
        content: \\\`
## Neden Toplu (Batch) İşlem Yapmalıyız?

Bir düğün fotoğrafçısı olduğunuzu, bir e-ticaret sitesine 500 ürün yükleyeceğinizi veya telefonunuzdaki devasa bir HEIC arşivini Windows'a aktaracağınızı hayal edin. Her bir fotoğrafı tek tek seçip dönüştürmek saatlerinizi, hatta günlerinizi alabilir. 

Toplu görsel işleme (Batch Processing) özelliği, tam da bu manuel ve sıkıcı iş yükünü ortadan kaldırmak için tasarlanmıştır.

## Tarayıcı Tabanlı (Client-Side) Toplu İşlem Nedir?

Geleneksel web sitelerinde toplu işlem yapmak bir işkencedir. 100 fotoğrafı önce sunucuya yüklersiniz (ki bu dakikalar sürer), sunucu işler, sonra tekrar indirirsiniz. 

WebImgConverter ise **WebAssembly** ve gelişmiş tarayıcı teknolojileri kullanır:
1. Dosyalar sunucuya YÜKLENMEZ.
2. Sizin bilgisayarınızın RAM ve CPU gücü kullanılarak tarayıcı içinde asenkron olarak işlenir.
3. Hız, tamamen sizin cihazınızın hızına bağlıdır ve genellikle mili-saniyeler içinde gerçekleşir.
4. %100 Gizlilik sağlar. Dosyalarınız bilgisayarınızdan hiç çıkmaz.

## Adım Adım Toplu Dönüştürme Nasıl Yapılır?

1. **Format Seçimi:** İhtiyacınıza uygun aracı seçin (Örn: HEIC to JPG veya PNG to WebP).
2. **Sürükle ve Bırak:** Klasörünüzdeki onlarca veya yüzlerce dosyayı aynı anda seçip (Ctrl+A / Cmd+A) ekrandaki yükleme alanına sürükleyin.
3. **Senkronize Ayarlar:** Tüm fotoğraflar için geçerli olacak kalite (%80), veya boyut (örn: 1000px genişlik) ayarlarını tek bir kez panelden belirleyin.
4. **Başlat ve İndir:** Dönüştür butonuna bastığınızda, sistem çoklu çekirdek mimarisini kullanarak hepsini anında işler ve size tek bir **ZIP** dosyası olarak teslim eder. ZIP dosyası indirildiğinde fotoğraflarınız orijinal isimleriyle klasörlenmiş olur.

## Profesyoneller İçin İpuçları

- **Kalite Optimizasyonu:** Web sitesine yüklenecek yüzlerce ürününüz varsa, sadece format değiştirmekle kalmayın; ayarlar bölümünden kaliteyi **%85** seviyesine çekin. Hem saniyeler içinde JPG/WebP'ye geçmiş olursunuz hem de megabaytlarca tasarruf edersiniz.
- **Klasör Yapısı:** Dosyalarınızı WebImgConverter'a atarken dosya isimlerini karmaşık tutmamaya özen gösterin; çıktı alacağınız ZIP dosyası orijinal isimlerinizi koruyacağı için sonrasında arşivlemeniz çok kolaylaşacaktır.

WebImgConverter'in ücretsiz toplu işlem gücü sayesinde tasarımcılar, geliştiriciler ve fotoğrafçılar günde saatlerce vakit kazanmaktadır.
\\\`
    }
};
articleDatabase['toplu-gorsel-isleme'] = topluGorselIsleme;
`;

if (!content.includes('gorselFormat2025')) {
    content = content.replace('export default function BlogArticlePage()', gorsel2025 + '\n\n' + topluGorsel + '\n\nexport default function BlogArticlePage()');
    fs.writeFileSync(blogPath, content);
    console.log('Successfully injected blog articles.');
} else {
    console.log('Articles already injected.');
}
