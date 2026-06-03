import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../LanguageContext';

export type SeoPageType = 'home' | 'heic-converter' | 'png-converter' | 'webp-converter' | 'jpg-converter' | 'avif-converter' | 'remove-background' | 'compress-image' | 'svg-converter' | 'crop' | 'favicon-generator' | 'rotate-image' | 'watermark-image' | 'black-and-white' | 'heic-to-jpg' | 'png-to-jpg' | 'webp-to-jpg' | 'svg-to-png';

interface SeoContentProps {
    pageType?: SeoPageType;
}

const seoData = {
    tr: {
        'home': {
            title: "Tüm Görsel Araçları Tek Yerde - WebImgConverter",
            intro: "WebImgConverter, görsel dönüştürme ve düzenleme ihtiyaçlarınız için geliştirdiğimiz güvenli ve hızlı bir araç setidir. HEIC'ten JPG'e, WebP dönüştürmeye, arka plan silmeden dosya küçültmeye kadar her şey burada.",
            whyTitle: "Neden WebImgConverter?",
            features: [
                { title: "🔒 Gizlilik Öncelikli", desc: "Dosyalarınız güvende. İşlemler güvenli sunucularımızda anlık yapılır ve hemen silinir." },
                { title: "⚡ Işık Hızında İşlem", desc: "WebAssembly teknolojisi ile saniyeler içinde binlerce görseli işleyin." },
                { title: "📱 Tüm Cihazlar Uyumlu", desc: "Windows, Mac, iPhone veya Android fark etmez, her yerden erişin." },
                { title: "🤖 Yapay Zeka Desteği", desc: "Arka plan silme ve akıllı isimlendirme için en yeni AI modelleri." }
            ],
            faq: [
                { q: "WebImgConverter ücretsiz mi?", a: "Temel dönüştürme araçları ücretsizdir. Arka plan silme gibi gelişmiş özellikler için günlük hediye krediler veya uygun fiyatlı planlar mevcuttur." },
                { q: "Dosyalarım çalınır mı?", a: "Hayır, gizliliğiniz önceliğimizdir. Dosyalarınız asla kalıcı olarak depolanmaz ve işlem sonrası silinir." },
                { q: "Hangi formatları destekliyorsunuz?", a: "HEIC, HEIF, JPG, PNG, WebP, AVIF formatlarını destekliyoruz. İstediğiniz formata dönüştürebilirsiniz." },
                { q: "Mobil cihazlarda çalışır mı?", a: "Evet, iPhone, Android ve tablet dahil tüm modern tarayıcılarda sorunsuz çalışır." },
                { q: "Toplu dönüştürme yapabilir miyim?", a: "Evet, tek seferde 100+ dosya yükleyebilir ve hepsini aynı anda dönüştürebilirsiniz." }
            ]
        },
        'heic-to-jpg': {
            title: "HEIC Dosyasını JPG'ye Çevirme Rehberi: Kapsamlı Teknik Çözüm",
            intro: "WebImgConverter, Apple'ın iOS 11 ile tanıttığı yüksek verimli (HEIC) fotoğraf formatını, dünyanın en yaygın görsel formatı olan JPG'ye saniyeler içinde dönüştürmenizi sağlayan profesyonel bir araçtır. \n\nApple cihazları (iPhone ve iPad) fotoğraf çekerken depolama alanından %50 oranında tasarruf etmek için HEIC formatını kullanır. Ancak bu dosyaları Windows bilgisayarınıza aktardığınızda, Android bir telefona gönderdiğinizde veya bir web sitesine yüklemek istediğinizde 'Desteklenmeyen Format' hatasıyla karşılaşırsınız. İşte tam bu noktada HEIC to JPG dönüştürücümüz devreye girer. \n\nHiçbir yazılım indirmenize veya Windows mağazasından ücretli eklentiler almanıza gerek kalmadan, fotoğraflarınızı doğrudan tarayıcınız üzerinden dönüştürebilirsiniz. İşlem tamamen sizin cihazınızda gerçekleşir, fotoğraflarınız sunucularımızda depolanmaz. Düğün fotoğraflarınız, tatil anılarınız veya e-ticaret ürün çekimleriniz güvendedir.",
            whyTitle: "Neden HEIC'i JPG'ye Çevirmeliyim?",
            features: [
                { title: "Evrensel Uyumluluk (Windows & Android)", desc: "HEIC formatı yüksek sıkıştırma sunsa da Windows 10/11, Android telefonlar ve eski Photoshop sürümlerinde yerel olarak açılamaz. JPG ise 1992'den beri dijital dünyanın evrensel standardıdır. JPG dosyası her akıllı telefonda, her akıllı televizyonda ve her yazılımda kusursuz çalışır." },
                { title: "Saniyeler İçinde Toplu Dönüştürme", desc: "100 adet iPhone fotoğrafını seçip tek seferde JPG formatına çevirebilirsiniz. İşlem gücü, bilgisayarınızın çok çekirdekli mimarisini kullanarak asenkron olarak tamamlanır. Dönüşen dosyalarınız anında bir ZIP paketi olarak bilgisayarınıza indirilir." },
                { title: "EXIF ve Meta Veri Koruma", desc: "Dönüştürme sırasında fotoğrafın nerede ve ne zaman çekildiği (GPS koordinatları, kamera modeli, ISO değerleri) gibi önemli EXIF verileri kaybolmaz. Profesyonel bir arşive sahipseniz bu özellik hayat kurtarıcıdır." },
                { title: "Maksimum Kalite Koruma (Lossless Optimization)", desc: "WebAssembly tabanlı dönüştürücümüz, görsel kalitesini düşürmeden en iyi renk profillerini uygular. Orijinal iPhone fotoğrafınızın keskinliği ve renk doğruluğu JPG formatına birebir aktarılır." }
            ],
            faq: [
                { q: "Windows 10/11'de HEIC dosyaları programsız nasıl açılır?", a: "Windows Fotoğraflar uygulaması varsayılan olarak HEIC dosyalarını açamaz ve sizden Microsoft Store üzerinden ücretli bir 'HEVC Video Uzantıları' paketi almanızı ister. Buna gerek kalmadan, WebImgConverter aracına fotoğraflarınızı sürükleyip JPG'ye çevirerek tüm cihazlarda anında açabilirsiniz." },
                { q: "Toplu işlem sınırınız var mı? Kaç HEIC fotoğrafını aynı anda yükleyebilirim?", a: "Tek seferde yüzlerce fotoğrafı (100+) sürükleyip bırakabilirsiniz. Sunucu tabanlı değil, yerel (tarayıcı içi) çalıştığımız için bir dosya sınırı veya yükleme gecikmesi yaşamazsınız." },
                { q: "HEIF ile HEIC arasındaki fark nedir?", a: "HEIF (High Efficiency Image Format) formatın teknik genel adıdır, HEIC (High Efficiency Image Container) ise Apple'ın bu format için kullandığı dosya uzantısıdır. Aracımız her ikisini de destekler." },
                { q: "Dönüştürme yaparken kalite düşer mi?", a: "Hayır. Sistemimiz, fotoğrafın orijinal piksel verilerini alır ve kayıpsız bir JPG matrisine yazar. Renklerde solma veya piksellenme olmaz." },
                { q: "Fotoğraflarım internete yükleniyor mu? Gizlilik politikası nedir?", a: "Kesinlikle hayır. İşlemler 'Client-Side' (İstemci Tarafı) teknolojisiyle tamamen sizin tarayıcınızın belleğinde yapılır. Fotoğraflarınız bizim veya başka birinin sunucusuna gönderilmez. Maksimum gizlilik garantisi sunuyoruz." }
            ]
        },
        'png-to-jpg': {
            title: "PNG'den JPG'ye Dönüştürme: Dosya Boyutu ve Performans Optimizasyonu",
            intro: "WebImgConverter PNG to JPG dönüştürücü, özellikle web sitelerinin yüklenme hızını artırmak ve gereksiz büyük dosya boyutlarından kurtulmak isteyen kullanıcılar için tasarlanmış profesyonel bir optimizasyon aracıdır.\n\nPNG (Portable Network Graphics) formatı, kayıpsız sıkıştırma sunduğu ve şeffaf (saydam) arka planları desteklediği için logolar, ikonlar ve grafik tasarımları için mükemmeldir. Ancak konu 'fotoğraflar' olduğunda PNG formatı bir kabusa dönüşebilir. 5 MB boyutundaki bir manzara fotoğrafı PNG olarak kaydedildiğinde, aynı fotoğrafın JPG versiyonu (hiçbir gözle görülür kalite farkı olmadan) sadece 500 KB yer kaplar. Web sitenize PNG fotoğraflar yüklerseniz, sitenizin hızı inanılmaz derecede düşecek ve Google Core Web Vitals skorlarınız dibe vuracaktır.\n\nBu araç ile devasa PNG dosyalarınızı saniyeler içinde web uyumlu, hafif ve hızlı açılan JPG dosyalarına dönüştürebilirsiniz. Üstelik şeffaf PNG'ler JPG'ye çevrilirken, arkaplan rengini otomatik algılar veya varsayılan olarak beyaz/siyah renkle doldurarak estetik bir bütünlük sağlar.",
            whyTitle: "PNG Dosyalarını Neden JPG Yapmalısınız?",
            features: [
                { title: "Web Siteleri İçin Devasa Hız Artışı", desc: "Bir web sayfasının yüklenme hızını belirleyen en önemli faktör görsellerdir. PNG formatındaki 2 MB'lık bir fotoğrafı JPG'ye çevirerek 150 KB'a düşürdüğünüzde, ziyaretçilerinizin bekleme süresini saniyelerce azaltmış olursunuz." },
                { title: "Şeffaflık (Alpha Channel) Kontrolü", desc: "JPG formatının mimarisi gereği şeffaf (transparan) arka plan desteği yoktur. Araçlarımız, şeffaf bir PNG'yi JPG yaparken arkasına otomatik olarak saf beyaz (#FFFFFF) veya siyah zemin atarak bozulmaları önler." },
                { title: "Depolama Alanından %80 Tasarruf", desc: "Bilgisayarınızda veya sunucunuzda (hosting) disk alanı sınırına ulaştıysanız, arşivi JPG'ye çevirmek mevcut alanınızı neredeyse 5 katına çıkarır." },
                { title: "Toplu Optimizasyon (Batch Processing)", desc: "100 adet PNG dosyasını aynı anda yükleyin. WebImgConverter hepsini asenkron bir şekilde JPG'ye çevirecek ve size tek bir ZIP dosyası olarak sunacaktır." }
            ],
            faq: [
                { q: "Saydam (Transparan) bir PNG'yi JPG yaparsam arka plan ne renk olur?", a: "JPG formatı saydamlık (Alpha kanalı) desteklemediği için, transparan alanlar varsayılan olarak beyaz renk ile doldurulur. Bu, web standartlarına en uygun davranıştır." },
                { q: "PNG ile JPG arasındaki temel fark nedir?", a: "PNG sıkıştırılırken hiçbir veri kaybetmez (kayıpsızdır) ve saydamlık destekler. JPG ise insan gözünün algılamayacağı verileri atarak dosyayı %80 küçülten kayıplı (lossy) bir formattır. Logolar için PNG, fotoğraflar için JPG idealdir." },
                { q: "Kalitede çok düşüş olur mu?", a: "Kullandığımız akıllı dönüşüm motoru (MozJPEG tabanlı), renk doğruluğunu korurken dosya boyutunu en alt seviyeye çeker. %90 kalite ayarında insan gözü orijinal PNG ile oluşturulan JPG arasındaki farkı kesinlikle ayırt edemez." },
                { q: "SEO (Arama Motoru Optimizasyonu) için hangisi daha iyi?", a: "Google, hızlı açılan siteleri ödüllendirir. Bu yüzden blog içerikleri, ürün fotoğrafları ve bannerlar için kesinlikle JPG (veya WebP) kullanılmalıdır. PNG sadece logo ve basit ikonlar için tercih edilmelidir." },
                { q: "Yüklediğim dosyalar güvende mi?", a: "Evet. Tüm dönüştürme işlemleri tamamen cihazınızın RAM (bellek) sınırları içinde yapılır. Herhangi bir sunucuya dosya gönderimi (upload) yapılmadığı için %100 güvenlik ve mahremiyet sağlanır." }
            ]
        },
        'webp-to-jpg': {
            title: "WebP Dosyalarını JPG ve PNG Yapma: Kesin Çözüm Rehberi",
            intro: "WebP formatı, internet hızını artırmak için harika bir teknolojidir ancak günlük kullanımda sık sık 'Desteklenmeyen Dosya Biçimi' hatasıyla karşılaşmanıza neden olur. WebImgConverter WebP to JPG dönüştürücü, Google'ın bu yeni nesil görsel formatını saniyeler içinde her cihazda açılabilen evrensel JPG veya PNG formatına çevirmenizi sağlayan ücretsiz bir araçtır.\n\nBir web sitesinden ürün fotoğrafı veya tasarım referansı indirdiğinizde, bu dosyanın .webp uzantılı olduğunu ve eski Photoshop sürümlerinde, Windows Fotoğraf Görüntüleyicisi'nde veya bazı video kurgu programlarında açılamadığını fark edersiniz. Sosyal medyaya yüklemek istediğinizde bile sorun çıkarabilir. Bu sorunu çözmek için fotoğrafı tarayıcınızdan sürükleyip WebImgConverter arayüzüne bırakmanız yeterlidir.\n\nYüksek performanslı WebAssembly motorumuz sayesinde dönüştürme işlemi anında tarayıcınızın içinde gerçekleşir. Animasyonlu WebP dosyalarınızın ilk karesi statik JPG'ye çevrilir, şeffaf (transparan) WebP dosyalarınız ise PNG formatına dönüştürüldüğünde saydamlıklarını kusursuz bir şekilde korur.",
            whyTitle: "Neden WebP Dosyalarını Dönüştürmelisiniz?",
            features: [
                { title: "Eski Yazılımlarla Tam Uyumluluk", desc: "Microsoft Word, PowerPoint, eski Adobe Photoshop sürümleri (2021 öncesi) ve pek çok endüstri standardı yazılım WebP dosyalarını tanımaz. JPG'ye çevirerek bu sorunu tamamen ortadan kaldırabilirsiniz." },
                { title: "Sosyal Medya ve E-Ticaret Yüklemeleri", desc: "Instagram, Twitter, eBay veya Shopify gibi platformlara fotoğraf yüklerken WebP formatı genellikle reddedilir. Sistemimiz sayesinde e-ticaret siteleri için saniyeler içinde kabul edilebilir JPG çıktıları alırsınız." },
                { title: "Şeffaflık (Alpha) Koruma Teknolojisi", desc: "Arka planı saydam bir WebP dosyası indirdiyseniz, bunu PNG'ye dönüştürerek saydamlık özelliğini %100 koruyabilirsiniz. Tasarımcılar için hayati bir özelliktir." },
                { title: "Gizlilik ve Güvenlik Odaklı", desc: "Dosyalarınız buluta (cloud) yüklenmez. Dönüştürme, kendi bilgisayarınızın işlemcisi (CPU) kullanılarak RAM üzerinde yapılır ve işlem bittiğinde anında silinir. Veri sızıntısı riski sıfırdır." }
            ],
            faq: [
                { q: "WebP nedir ve neden siteler bunu kullanıyor?", a: "WebP, Google tarafından geliştirilen modern bir görsel formatıdır. JPG'ye göre %30 daha küçük boyut sunduğu için web sitelerinin daha hızlı yüklenmesini sağlar, ancak masaüstü programlarla uyumluluğu düşüktür." },
                { q: "Animasyonlu WebP dosyalarını JPG yapabilir miyim?", a: "Evet. Eğer yüklediğiniz WebP dosyası (tıpkı bir GIF gibi) animasyonluysa, sistemimiz otomatik olarak animasyonun ilk karesini (frame) alır ve yüksek kaliteli statik bir JPG fotoğrafı olarak kaydeder." },
                { q: "Dönüştürme işlemi ücretli mi?", a: "Hayır. Araçlarımız tamamen ücretsizdir. Kayıt olmanıza, kredi kartı bilgisi girmenize veya bir program indirmenize gerek yoktur." },
                { q: "Toplu dönüştürme yapabilir miyim?", a: "Kesinlikle. Klasörünüzdeki onlarca WebP dosyasını aynı anda seçip sürükleyebilirsiniz. Sistem hepsini eşzamanlı olarak işler ve size bir ZIP arşivi sunar." },
                { q: "Dönüştürürken kalite ayarı yapabilir miyim?", a: "Evet, gelişmiş ayarlar bölümünden JPG sıkıştırma kalitesini (%1 ile %100 arası) manuel olarak belirleyebilir, isterseniz dosya boyutunu daha da küçültebilirsiniz." }
            ]
        },
        'remove-background': {
            title: "Yapay Zeka (AI) ile Ücretsiz Arka Plan Silme (Remove BG)",
            intro: "WebImgConverter Arka Plan Silici, en karmaşık fotoğraflardaki arka planları bile yapay zeka destekli gelişmiş makine öğrenimi modelleri kullanarak saniyeler içinde kusursuz bir şekilde temizleyen profesyonel bir araçtır.\n\nEskiden Photoshop üzerinde 'Pen Tool' veya 'Sihirli Değnek' ile saatler süren arka plan temizleme işlemi, artık tek bir tıklamayla gerçekleşiyor. Aracımız fotoğrafınızı analiz eder, ana nesneyi (insan, hayvan, araba veya ürün) arka plandan ayırt eder ve saç telleri, hayvan kürkleri, ağaç yaprakları gibi en zorlu detayları bile piksel hassasiyetinde keser.\n\nE-ticaret siteleri (Amazon, Trendyol) için beyaz arka planlı ürün fotoğrafları hazırlamak, YouTube küçük resimleri (thumbnail) yapmak veya sosyal medya için profesyonel profil fotoğrafları oluşturmak hiç bu kadar kolay olmamıştı. İşlem sonunda görselinizi yüksek çözünürlüklü ve şeffaf (transparan) PNG formatında indirebilirsiniz.",
            whyTitle: "WebImgConverter AI Arka Plan Silici Neden Benzersiz?",
            features: [
                { title: "Ultra Hassas Saç ve Kenar Tespiti", desc: "Geleneksel araçlar saç tellerini veya kürkleri keserken yapay bir görünüm bırakır. Gelişmiş derin öğrenme algoritmamız (Deep Learning), bu tür yarı saydam veya ince detayları ana hatlarıyla koruyarak stüdyo kalitesinde kesim sağlar." },
                { title: "E-Ticaret İçin Otomatik Optimizasyon", desc: "Ürün fotoğraflarınızın arka planını temizledikten sonra, isteğe bağlı olarak saf beyaz (#FFFFFF) bir arka plan ekleyebilir ve Amazon, Shopify, Hepsiburada gibi pazaryerlerinin katı görsel standartlarına anında uyum sağlayabilirsiniz." },
                { title: "Gizlilik Garantisi (Dosyalarınız Silinir)", desc: "Kişisel fotoğraflarınız veya henüz piyasaya çıkmamış ürün görselleriniz tamamen güvendedir. Yüklediğiniz fotoğraflar AI tarafından analiz edildikten hemen sonra sunucularımızdan kalıcı olarak ve geri döndürülemez biçimde silinir." },
                { title: "Çoklu Obje Tanıma Sistemi", desc: "Fotoğrafta sadece bir insan değil, yan yana duran arabalar, eşyalar veya birden fazla evcil hayvan olsa bile, AI hepsini ön plan objesi olarak tanır ve arka planı ustalıkla yok eder." }
            ],
            faq: [
                { q: "Arka planı silinen fotoğrafı hangi formatta indireceğim?", a: "Saydamlığın (transparanlığın) korunması için sonuç dosyasını standart olarak PNG formatında indirirsiniz. İsterseniz ayarlar kısmından arkasına özel bir renk atayarak JPG olarak da indirebilirsiniz." },
                { q: "Hangi tür fotoğraflarda en iyi sonucu verir?", a: "Ön plandaki obje ile arka plan arasında belirgin bir renk veya netlik farkı (kontrast) olan fotoğraflarda mükemmel sonuç verir. İnsan portreleri, ürün çekimleri, araçlar ve evcil hayvanlarda %99 oranında başarı sağlar." },
                { q: "Fotoğraf çözünürlüğüm düşecek mi?", a: "Hayır. Standart kullanımda fotoğrafınızın orijinal boyutları (yükseklik ve genişlik) korunur. Yüksek çözünürlüklü çıktı (HD) almak tamamen mümkündür." },
                { q: "Bu özellik tamamen ücretsiz mi?", a: "Evet, aracımızın temel yapay zeka özellikleri kullanıcılarımız için ücretsiz olarak sunulmaktadır. Hiçbir üyelik şartı aranmaz." },
                { q: "Toplu halde arka plan silebilir miyim?", a: "Toplu işlem özelliği sayesinde birden fazla ürün fotoğrafını aynı anda yükleyebilir ve sırayla tümünün arka planının temizlenmesini sağlayabilirsiniz." }
            ]
        },
        'compress-image': {
            title: "Görsel Sıkıştırma: Kaliteyi Bozmadan Fotoğraf Boyutu Küçültme",
            intro: "WebImgConverter Görsel Sıkıştırıcı (Image Compressor), JPG, PNG, WebP ve HEIC dosyalarınızın dosya boyutunu, insan gözünün fark edemeyeceği algoritmalar kullanarak %90'a varan oranlarda küçülten profesyonel bir optimizasyon servisidir.\n\nİster bir blog yazarı, ister web geliştirici, isterseniz de sadece telefonunda yer kalmamış sıradan bir kullanıcı olun; devasa dosya boyutları her zaman sorundur. Bir web sitesine yüklenen 5 MB'lık tek bir fotoğraf, sitenizin açılış hızını saniyelerce geciktirir. Google, yavaş açılan siteleri arama sonuçlarında (SEO) geriye düşürür. E-posta ile belge gönderirken 'Dosya boyutu çok büyük' hatası alırsınız.\n\nAkıllı sıkıştırma motorumuz (Smart Compression Engine), görseldeki gereksiz meta verileri (EXIF), çıplak gözle görülemeyen renk profili detaylarını ve aşırı piksel verilerini temizler. Sonuç: Birebir aynı görünen ancak megabaytlar yerine kilobaytlar kaplayan optimize edilmiş görsellerdir.",
            whyTitle: "Neden Fotoğrafları Sıkıştırmalısınız?",
            features: [
                { title: "Web Siteleri İçin SEO ve Hız Artışı", desc: "Core Web Vitals skorlarınızı tavan yaptırmanın en kolay yolu görselleri optimize etmektir. 3 MB'lık bir hero banner'ı 300 KB'a düşürmek, sayfa yüklenme sürenizi (Page Load Time) %60 oranında hızlandırabilir." },
                { title: "Kayıplı (Lossy) ve Kayıpsız (Lossless) Seçenekler", desc: "İhtiyacınıza göre iki farklı yöntem sunuyoruz. 'Kayıpsız' modda pikseller asla değişmez, sadece veri kodlaması optimize edilir. 'Kayıplı' modda ise insan gözünün algılayamayacağı detaylar silinerek devasa dosya küçültmeleri sağlanır." },
                { title: "Toplu İşlem ile Zaman Tasarrufu", desc: "Bir klasör dolusu e-ticaret ürün fotoğrafını veya etkinlik çekimini araca sürükleyin. WebImgConverter hepsini saniyeler içinde işler ve ZIP dosyası halinde orijinal isimleriyle size geri verir." },
                { title: "Format Çevirisi ile Birlikte Sıkıştırma", desc: "Fotoğrafları sadece sıkıştırmakla kalmayıp, aynı esnada daha modern ve hafif formatlar olan WebP veya AVIF'e de dönüştürerek çift yönlü bir boyut tasarrufu elde edebilirsiniz." }
            ],
            faq: [
                { q: "Sıkıştırma işlemi fotoğrafımın kalitesini, netliğini bozar mı?", a: "Varsayılan 'Akıllı Sıkıştırma' ayarımızda kalite kaybı insan gözüyle (özellikle telefon ve bilgisayar ekranlarında) kesinlikle fark edilemez. Fotoğrafınız bulanıklaşmaz veya piksellenmez." },
                { q: "Dosya boyutu ne kadar küçülür?", a: "Dosyanın orijinal yapısına bağlı olarak değişir. Ancak bir akıllı telefondan çıkan 6 MB'lık orijinal bir JPG dosyası, genellikle kaliteden ödün vermeden 800 KB - 1 MB arasına (yaklaşık %80-85 oranında) küçültülebilir." },
                { q: "Orijinal dosyamın üzerine mi yazılıyor, silinir mi?", a: "Kesinlikle hayır. Aracımız tarayıcı üzerinden çalışır. Orijinal dosyalarınız bilgisayarınızda veya telefonunuzda olduğu gibi kalır, siz sadece yeni oluşturulmuş 'sıkıştırılmış' kopyayı indirirsiniz." },
                { q: "PNG dosyalarındaki şeffaflık sıkıştırılınca kaybolur mu?", a: "Hayır. PNG dosyalarını sıkıştırırken PNG formatının yapısı (Alpha kanalı) korunur. Şeffaf (saydam) alanlar olduğu gibi kalır, sadece dosyanın renk paleti optimize edilir." },
                { q: "Hangi görsel formatlarını küçültebilirim?", a: "Sistemimiz JPG, JPEG, PNG, WebP ve HEIC formatlarının tamamını desteklemektedir." }
            ]
        },
        'svg-to-png': {
            title: "SVG'den PNG'ye Dönüştürme: Vektörden Piksele Kusursuz Geçiş",
            intro: "WebImgConverter SVG to PNG dönüştürücü, kalite kaybı olmadan sınırsız ölçeklenebilen vektörel (SVG) tasarımlarınızı, her cihazda ve her platformda açılabilen standart piksel (PNG) tabanlı görsellere dönüştüren güçlü bir araçtır.\n\nSVG (Scalable Vector Graphics), kod tabanlı olduğu için web geliştiricileri ve tasarımcılar tarafından çok sevilir. Ancak bir SVG logosunu Microsoft Word belgesine eklemek, WhatsApp üzerinden müşteriye göndermek, Instagram'a yüklemek veya bazı eski yazılımlarda açmak istediğinizde uyumsuzluk hatalarıyla karşılaşırsınız. SVG dosyaları her yerde görüntülenemez.\n\nİşte bu noktada vektörlerinizi rasterleştirmek (pikselleştirmek) gerekir. Aracımız, SVG dosyanızdaki tüm matematiksel eğrileri, renk geçişlerini (gradient) ve saydamlık (transparency) bilgilerini okuyarak, bunları kayıpsız bir şekilde saydam arka planlı PNG dosyalarına çevirir. Üstelik çıktı çözünürlüğünü kendiniz belirleyebilirsiniz.",
            whyTitle: "SVG'yi Neden PNG Yapmalısınız?",
            features: [
                { title: "Tam Uyumluluk ve Paylaşılabilirlik", desc: "PNG formatı sosyal medya platformları (Instagram, Facebook, X), sunum programları (PowerPoint, Keynote) ve tüm işletim sistemleri tarafından yerel olarak desteklenir. Logonuzu PNG'ye çevirdiğinizde herkes sorunsuz görebilir." },
                { title: "Şeffaf Arka Plan Koruması", desc: "SVG dosyalarındaki en büyük avantaj olan şeffaflık, dönüştürme işlemi sırasında PNG'nin Alpha kanalına kusursuz bir şekilde aktarılır. Logolarınızın arkasında beyaz çirkin kareler oluşmaz." },
                { title: "Özel Boyutlandırma (Custom Resizing)", desc: "Dönüştürmeden önce PNG'nin hangi çözünürlükte (Örn: 1920x1080 veya 5000x5000) olmasını istediğinizi seçebilirsiniz. SVG vektörel olduğu için, 10.000 piksel bile yapsanız görüntüde en ufak bir bulanıklaşma (piksellenme) olmaz." },
                { title: "Font ve Stil (CSS) Desteği", desc: "Bazı SVG dosyaları içlerinde özel fontlar ve CSS stilleri barındırır. Gelişmiş dönüştürme motorumuz, bu stilleri doğru bir şekilde yorumlayarak tasarımınızın orijinal halini PNG'ye aktarır." }
            ],
            faq: [
                { q: "SVG nedir ve neden her yerde açılmıyor?", a: "SVG, piksellerden değil, şekillerin matematiksel kodlarından oluşan bir vektör formatıdır. Özünde bir metin/kod dosyası olduğu için, grafik yorumlama motoru olmayan bazı ofis yazılımları ve sosyal medya platformları bu dosyaları fotoğraflayamaz." },
                { q: "SVG'yi PNG yaparken kalite (netlik) düşer mi?", a: "Kalite tamamen sizin seçtiğiniz çıktı çözünürlüğüne bağlıdır. Eğer SVG'yi 500x500 piksellik bir PNG'ye çevirirseniz küçük olur, ancak aracımızda boyutu 4000x4000 piksel olarak ayarlarsanız devasa ve jilet gibi keskin bir PNG elde edersiniz. Vektör olduğu için kalite kaybı yaşanmaz." },
                { q: "Logomun arka planı saydamdı, PNG olunca beyaz mı olacak?", a: "Hayır. PNG formatı saydamlık (Alpha) destekler. Eğer SVG dosyanızda bir arka plan rengi yoksa, elde edeceğiniz PNG dosyası da kesinlikle saydam (transparan) olacaktır." },
                { q: "Toplu logo/ikon dönüştürme işlemi yapabilir miyim?", a: "Evet, bir ikon setiniz (örneğin 50 adet SVG) varsa, hepsini birden sürükleyip bırakarak saniyeler içinde tek bir ZIP dosyası halinde PNG olarak indirebilirsiniz." },
                { q: "Karmaşık SVG'ler (gölgeler, renk geçişleri) destekleniyor mu?", a: "Büyük ölçüde evet. Tarayıcı tabanlı yüksek güçlü 'Canvas' motorumuz, SVG içindeki drop-shadow, blur ve karmaşık gradient (renk geçişi) özelliklerini aslına uygun şekilde render (işleme) eder." }
            ]
        },
        'crop': {
            title: "Akıllı Görsel Kırpma (Smart Cropper): Tam Boyutunda, Tam Ortalanmış",
            intro: "WebImgConverter Akıllı Kırpıcı, fotoğraflarınızı sosyal medya ağları (Instagram, YouTube, Twitter), e-ticaret siteleri veya özel projeleriniz için gereken tam ölçülere milimetrik olarak kesmenizi sağlayan profesyonel bir düzenleme aracıdır.\n\nBazen muhteşem bir fotoğraf çekersiniz ancak kadrajda istenmeyen nesneler vardır. Veya Amazon'a yükleyeceğiniz ürün fotoğrafının tam 1:1 kare (square) olması gerekiyordur. Telefonunuzdaki varsayılan fotoğraf düzenleyicilerle bunu yaparken en boy oranını (Aspect Ratio) tam tutturmak çok zordur.\n\nAkıllı kırpma aracımız, serbest (freeform) kırpma yapmanıza olanak tanıdığı gibi, 16:9, 4:3, 1:1 gibi sabit oranları kilitleyerek de çalışmanıza izin verir. Görselinizi piksellenmeden, orijinal kalitesini koruyarak sadece ihtiyacınız olan bölgeyi ayıracak şekilde kesin ve anında indirin.",
            whyTitle: "Neden WebImgConverter Kırpıcıyı Kullanmalısınız?",
            features: [
                { title: "Sosyal Medya ve E-Ticaret Uyumluluğu", desc: "Instagram profili (1:1), YouTube kapak fotoğrafı (16:9) veya dikey hikayeler (9:16) için önceden belirlenmiş en boy oranlarını kilitleyerek, fotoğrafın yamulmadan tam ölçüsünde kesilmesini sağlarsınız." },
                { title: "Kayıpsız Kırpma ve Yeniden Kodlama", desc: "Fotoğrafın seçtiğiniz alanı kırpıldıktan sonra, en iyi kalite ayarlarıyla (Örn: MozJPEG veya WebP) yeniden kodlanır. Kırpma işlemi fotoğrafı bozmaz, bulanıklaştırmaz." },
                { title: "Tam Güvenli, Tarayıcı İçi İşlem", desc: "Özel hayatınızı içeren fotoğraflarınızı kesmek için bulut sunuculara yüklemenize gerek yok. Fotoğrafınız tarayıcınızdan dışarı çıkmaz, kırpma işlemi bilgisayarınızın RAM'inde yapılır ve tamamen gizlidir." },
                { title: "Kullanıcı Dostu ve Hızlı Arayüz", desc: "Photoshop gibi karmaşık programların yüklenmesini beklemeyin. Fotoğrafı sürükleyin, kırpma kutusunu farenizle (veya parmağınızla) ayarlayın ve 'Kırp' tuşuna basın. Hepsi 3 saniye sürer." }
            ],
            faq: [
                { q: "Hangi formatlardaki görselleri kırpabilirim?", a: "JPG, PNG, WebP, AVIF ve hatta Apple cihazlarından alınan HEIC formatındaki tüm görselleri destekliyoruz. Kırpma işleminden sonra standart olarak JPG, PNG veya WebP olarak indirebilirsiniz." },
                { q: "Kırpma işleminde en boy oranını (Aspect Ratio) kilitleyebilir miyim?", a: "Evet. Arayüzde bulunan 1:1 (Kare), 16:9 (Geniş Ekran) veya 4:3 oranlarından birini seçtiğinizde, kırpma kutusunu ne kadar büyütürseniz büyütün bu oran bozulmayacaktır." },
                { q: "Kırpılan fotoğrafın kalitesi düşer mi?", a: "Hayır, kesinlikle düşmez. Kırpılan bölge orijinal fotoğrafın piksel yoğunluğunu birebir korur. Ancak 4000 piksellik bir fotoğrafın sadece 100 piksellik çok küçük bir noktasını kırparsanız, elde ettiğiniz küçük kare doğal olarak daha az piksele sahip olacaktır." },
                { q: "Telefondan (mobil cihazdan) kırpma yapabilir miyim?", a: "Evet. Arayüzümüz dokunmatik ekranlar için özel olarak optimize edilmiştir. Kırpma kutusunun köşelerinden parmağınızla tutarak rahatça boyutlandırma yapabilirsiniz." },
                { q: "Serbest (kısıtlamasız) kırpma yapabilir miyim?", a: "Elbette. 'Serbest' (Free) modunu seçtiğinizde, kırpma kutusunun enini ve boyunu tamamen bağımsız olarak dilediğiniz gibi şekillendirebilirsiniz." }
            ]
        }
    },
    en: {
        'home': {
            title: "All Image Tools in One Place - WebImgConverter",
            intro: "WebImgConverter is a secure and fast toolkit for all your image conversion and editing needs. From HEIC to JPG, WebP conversion, background removal to compression, it's all here.",
            whyTitle: "Why WebImgConverter?",
            features: [
                { title: "🔒 Privacy First", desc: "Your files are safe. Processing happens securely in the cloud and files are deleted instantly." },
                { title: "⚡ Lightning Fast", desc: "Process thousands of images in seconds with WebAssembly." },
                { title: "📱 Cross-Platform", desc: "Works on Windows, Mac, iPhone, or Android seamlessly." },
                { title: "🤖 AI Powered", desc: "Latest AI models for background removal and smart naming." }
            ],
            faq: [
                { q: "Is WebImgConverter free?", a: "Basic conversion tools are free. Advanced features like background removal utilize daily gift credits or affordable plans." },
                { q: "Are my files safe?", a: "Yes, privacy is our priority. Files are never permanently stored and are deleted immediately after processing." },
                { q: "What formats do you support?", a: "We support HEIC, HEIF, JPG, PNG, WebP, AVIF formats. Convert to any format you need." },
                { q: "Does it work on mobile?", a: "Yes, works flawlessly on all modern browsers including iPhone, Android, and tablets." },
                { q: "Can I batch convert?", a: "Yes, upload 100+ files at once and convert them all simultaneously." }
            ]
        },
        'heic-to-jpg': {
            title: "HEIC to JPG Conversion Guide",
            intro: "WebImgConverter lets you convert Apple's modern HEIC photo format to JPG, PNG, or WEBP in seconds. Use photos from your iPhone and iPad on Windows, Android, and websites seamlessly.",
            whyTitle: "HEIC Conversion Guide",
            features: [
                { title: "Why Convert HEIC to JPG?", desc: "HEIC offers high compression but lacks compatibility. JPG is universal." },
                { title: "Batch Conversion", desc: "Upload and convert hundreds of iPhone photos at once." },
                { title: "No Quality Loss", desc: "Professional compression algorithms preserve original quality." },
                { title: "HEIF Support", desc: "Both HEIC and HEIF are supported. Live Photos convert to JPG." }
            ],
            faq: [
                { q: "How to open HEIC on Windows?", a: "No need to buy extensions, convert to JPG with WebImgConverter and open instantly." },
                { q: "Does quality suffer?", a: "No, we preserve visual quality with top compression algorithms." },
                { q: "What is HEIC?", a: "HEIC (High Efficiency Image Container) is Apple's modern image format since iOS 11. It offers 50% smaller file size than JPG." },
                { q: "How do I transfer iPhone photos?", a: "Connect your iPhone via AirDrop, iCloud, or cable, then drag HEIC files to WebImgConverter." },
                { q: "Can I batch convert HEIC?", a: "Yes, upload 100+ HEIC files at once and convert them all to JPG." }
            ]
        },
        'png-to-jpg': {
            title: "Convert PNG to JPG - Transparency & Size",
            intro: "Convert large PNG files to web-optimized JPG format. Automatically handles transparent backgrounds by turning them white or black.",
            whyTitle: "PNG vs JPG?",
            features: [
                { title: "Smaller File Size", desc: "PNGs can be huge. JPG offers up to 80% better compression." },
                { title: "Web Compatibility", desc: "JPG is the fastest loading format for photographs on websites." },
                { title: "Transparency Control", desc: "Convert PNG transparent areas to your desired color (white/black)." },
                { title: "Color Profile", desc: "sRGB color profile for consistent colors on every screen." }
            ],
            faq: [
                { q: "What happens to transparency?", a: "JPG does not support transparency. Backgrounds become white automatically." },
                { q: "When to use PNG?", a: "Use PNG for logos with transparency, JPG for photographs." },
                { q: "What's the difference between PNG and JPG?", a: "PNG offers lossless compression and transparency, while JPG provides smaller file sizes. JPG for photos, PNG for graphics." },
                { q: "Which is better for websites?", a: "Use JPG for photos, PNG for logos and icons. WebP combines benefits of both." },
                { q: "Can I choose background color?", a: "Yes, when converting transparent PNGs to JPG, you can select white, black, or a custom background color." }
            ]
        },
        'webp-to-jpg': {
            title: "Convert WebP Files to JPG & PNG",
            intro: "Convert Google's WebP format to universally compatible JPG or PNG. Use web-downloaded images in Photoshop and other tools.",
            whyTitle: "About WebP Conversion",
            features: [
                { title: "Universal Compatibility", desc: "WebP doesn't open everywhere. JPG and PNG do." },
                { title: "Reverse Conversion", desc: "We maintain max quality when converting back from WebP." },
                { title: "Animated WebP", desc: "Extract the first frame from animated WebP files." },
                { title: "Transparency Preserved", desc: "Transparency is preserved when converting WebP to PNG." }
            ],
            faq: [
                { q: "What is WebP?", a: "WebP is a next-gen format by Google for faster websites." },
                { q: "Is conversion fast?", a: "Yes, our powerful server technology converts dozens of files per second." },
                { q: "Why convert WebP to JPG?", a: "Photoshop, older browsers, and some apps don't support WebP. JPG provides universal compatibility." },
                { q: "Will there be quality loss?", a: "Minimal quality loss with our conversion. You can adjust the quality level as desired." },
                { q: "Are WebP animations supported?", a: "You can convert animated WebP files to static JPG. Separate files for each frame can also be created." }
            ]
        },
        'remove-background': {
            title: "AI Background Remover",
            intro: "Remove image backgrounds with a single click in seconds. Perfect for products, portraits, and logos.",
            whyTitle: "AI Background Cleaning",
            features: [
                { title: "Auto Detection", desc: "AI understands the subject and makes precise cuts." },
                { title: "Transparent PNG", desc: "Download results as transparent PNGs for your designs." },
                { title: "E-Commerce Ready", desc: "Switch product photos to white background, boost sales." },
                { title: "Social Media", desc: "Instantly clean backgrounds for profile photos and content." }
            ],
            faq: [
                { q: "Is this free?", a: "Basic use is free. Upgrade for high-res and unlimited batching." },
                { q: "What photos work best?", a: "Photos with clear subjects (people, cars, products) work best." },
                { q: "Does it detect hair and fur details?", a: "Yes, our AI detects hair strands, fur, and complex edges with pixel precision." },
                { q: "What's the output format?", a: "Downloaded as transparent PNG. You can also get JPG with white background." },
                { q: "Can I batch remove backgrounds?", a: "Yes, upload multiple photos and remove all backgrounds simultaneously." }
            ]
        },
        'compress-image': {
            title: "Image Compressor & Resizer",
            intro: "Reduce JPG, PNG, and WebP file sizes by up to 90% without quality loss. Speed up your website and save storage.",
            whyTitle: "Smart Compression",
            features: [
                { title: "Lossy & Lossless", desc: "Choose between maximum quality or maximum compression." },
                { title: "Batch Processing", desc: "Compress folder loads of images at once." },
                { title: "Web Performance", desc: "Improve Core Web Vitals scores, boost SEO rankings." },
                { title: "Preview", desc: "Compare compression results before downloading." }
            ],
            faq: [
                { q: "Will quality drop?", a: "We optimize visibly lossless. No pixelation." },
                { q: "Supported formats?", a: "JPG, PNG, WebP, and HEIC supported." },
                { q: "How much compression is possible?", a: "Depending on file type, 50-90% file size reduction is achievable." },
                { q: "How important is this for website speed?", a: "Images account for over 60% of page load time. Compression is critical." },
                { q: "Does my original file change?", a: "No, your original file is preserved. You download a new compressed version separately." }
            ]
        },
        'svg-to-png': {
            title: "Convert SVG to PNG - Rasterize Vector Graphics",
            intro: "Convert your vector SVG files to transparent PNG format without losing quality. Get crisp results at any resolution.",
            whyTitle: "SVG vs PNG?",
            features: [
                { title: "High Resolution", desc: "Convert vectors to crisp PNGs at any size without pixelation." },
                { title: "Transparency Support", desc: "Transparent backgrounds in your SVGs are preserved in PNGs." },
                { title: "Wide Compatibility", desc: "PNG format is universally supported by social media, office apps, and browsers." },
                { title: "Instant Processing", desc: "Conversion in seconds directly on our fast servers." }
            ],
            faq: [
                { q: "What is SVG?", a: "SVG (Scalable Vector Graphics) is a vector format that can be scaled infinitely without losing quality." },
                { q: "Why convert to PNG?", a: "Some platforms don't support SVG, but PNG opens everywhere." },
                { q: "Can I adjust the resolution?", a: "Yes, you can set the output size and quality before converting." },
                { q: "Is transparency preserved?", a: "Yes, any transparent background in the SVG will remain transparent in the PNG." },
                { q: "Can I convert multiple files?", a: "Yes, you can batch convert hundreds of SVG files to PNG at once." }
            ]
        },
        'crop': {
            title: "Smart Image Cropper",
            intro: "Crop and trim your photos to social media dimensions or custom sizes in seconds.",
            whyTitle: "Why Smart Cropper?",
            features: [
                { title: "Free Crop", desc: "Freely select and crop any area you want." },
                { title: "Social Media Sizes", desc: "Perfect crops with ready-made templates for Instagram, Twitter, Facebook." },
                { title: "High Quality", desc: "No quality loss occurs during the cropping process." },
                { title: "Fast & Practical", desc: "Crop and download directly from our platform without installing software." }
            ],
            faq: [
                { q: "What formats can I crop?", a: "We support all popular formats like JPG, PNG, WebP, and HEIC." },
                { q: "Will the quality decrease?", a: "No, original quality is preserved at max level." },
                { q: "Can I enter a custom aspect ratio?", a: "Yes, choose presets like 1:1, 16:9, 4:3, or crop freely." },
                { q: "Is it free?", a: "Basic cropping operations are completely free." },
                { q: "Is it mobile friendly?", a: "Yes, Smart Cropper works with full touch support on phones and tablets." }
            ]
        }
    },
    de: {
        'home': {
            title: "Alle Bildwerkzeuge an einem Ort - WebImgConverter",
            intro: "WebImgConverter ist ein sicheres und schnelles Toolkit für alle Ihre Bildkonvertierungs- und Bearbeitungsbedürfnisse.",
            whyTitle: "Warum WebImgConverter?",
            features: [
                { title: "🔒 Privatsphäre zuerst", desc: "Ihre Dateien sind sicher. Die Verarbeitung erfolgt auf Ihrem Gerät oder sicher in der Cloud." },
                { title: "⚡ Blitzschnell", desc: "Verarbeiten Sie Tausende von Bildern in Sekunden." },
                { title: "📱 Plattformübergreifend", desc: "Funktioniert auf Windows, Mac, iPhone oder Android." },
                { title: "🤖 KI-gestützt", desc: "Neueste KI-Modelle für Hintergrundentfernung." }
            ],
            faq: [
                { q: "Ist WebImgConverter kostenlos?", a: "Grundlegende Konvertierungstools sind kostenlos. Erweiterte Funktionen nutzen tägliche Geschenkgutschriften." },
                { q: "Sind meine Dateien sicher?", a: "Ja, Dateien werden niemals dauerhaft gespeichert und sofort gelöscht." },
                { q: "Welche Formate werden unterstützt?", a: "HEIC, HEIF, JPG, PNG, WebP, AVIF Formate werden unterstützt." },
                { q: "Funktioniert es auf Mobilgeräten?", a: "Ja, funktioniert einwandfrei auf allen modernen Browsern." },
                { q: "Kann ich Stapelverarbeitung durchführen?", a: "Ja, laden Sie 100+ Dateien auf einmal hoch." }
            ]
        },
        'heic-to-jpg': {
            title: "HEIC zu JPG Konvertierungsanleitung",
            intro: "WebImgConverter ermöglicht die Konvertierung von Apples modernem HEIC-Fotoformat in JPG, PNG oder WEBP in Sekunden.",
            whyTitle: "HEIC Konvertierungsanleitung",
            features: [
                { title: "Warum HEIC zu JPG konvertieren?", desc: "HEIC bietet hohe Komprimierung, aber mangelnde Kompatibilität." },
                { title: "Stapelverarbeitung", desc: "Laden Sie Hunderte von iPhone-Fotos auf einmal hoch." },
                { title: "Kein Qualitätsverlust", desc: "Professionelle Komprimierungsalgorithmen erhalten die Originalqualität." },
                { title: "HEIF-Unterstützung", desc: "Sowohl HEIC als auch HEIF werden unterstützt." }
            ],
            faq: [
                { q: "Wie öffnet man HEIC auf Windows?", a: "Keine Erweiterungen nötig, mit WebImgConverter in JPG konvertieren und sofort öffnen." },
                { q: "Leidet die Qualität?", a: "Nein, wir erhalten die visuelle Qualität mit Top-Algorithmen." },
                { q: "Was ist HEIC?", a: "HEIC ist Apples modernes Bildformat seit iOS 11 mit 50% kleinerer Dateigröße als JPG." },
                { q: "Wie übertrage ich iPhone-Fotos?", a: "Verbinden Sie Ihr iPhone über AirDrop, iCloud oder Kabel." },
                { q: "Kann ich HEIC stapelweise konvertieren?", a: "Ja, laden Sie 100+ HEIC-Dateien auf einmal hoch." }
            ]
        },
        'png-to-jpg': {
            title: "PNG zu JPG konvertieren - Transparenz & Größe",
            intro: "Konvertieren Sie große PNG-Dateien in weboptimiertes JPG-Format.",
            whyTitle: "PNG vs JPG?",
            features: [
                { title: "Kleinere Dateigröße", desc: "PNGs können riesig sein. JPG bietet bis zu 80% bessere Komprimierung." },
                { title: "Web-Kompatibilität", desc: "JPG ist das schnellste Ladeformat für Fotos auf Websites." }
            ],
            faq: [
                { q: "Was passiert mit der Transparenz?", a: "JPG unterstützt keine Transparenz. Hintergründe werden automatisch weiß." },
                { q: "Wann PNG verwenden?", a: "Verwenden Sie PNG für Logos mit Transparenz, JPG für Fotos." },
                { q: "Unterschied zwischen PNG und JPG?", a: "PNG bietet verlustfreie Komprimierung und Transparenz, JPG kleinere Dateien." },
                { q: "Welches ist besser für Websites?", a: "JPG für Fotos, PNG für Logos und Icons." },
                { q: "Kann ich die Hintergrundfarbe wählen?", a: "Ja, wählen Sie weiß, schwarz oder eine benutzerdefinierte Farbe." }
            ]
        },
        'webp-to-jpg': {
            title: "WebP-Dateien zu JPG & PNG konvertieren",
            intro: "Konvertieren Sie Googles WebP-Format in universell kompatibles JPG oder PNG.",
            whyTitle: "Über WebP-Konvertierung",
            features: [
                { title: "Universelle Kompatibilität", desc: "WebP öffnet sich nicht überall. JPG und PNG schon." },
                { title: "Rückkonvertierung", desc: "Wir erhalten maximale Qualität bei der Konvertierung von WebP." }
            ],
            faq: [
                { q: "Was ist WebP?", a: "WebP ist ein Next-Gen-Format von Google für schnellere Websites." },
                { q: "Ist die Konvertierung schnell?", a: "Ja, unsere Browser-Technologie konvertiert Dutzende von Dateien pro Sekunde." },
                { q: "Warum WebP zu JPG konvertieren?", a: "Photoshop und ältere Browser unterstützen WebP nicht." },
                { q: "Gibt es Qualitätsverlust?", a: "Minimaler Qualitätsverlust mit unserer Konvertierung." },
                { q: "Werden WebP-Animationen unterstützt?", a: "Sie können animierte WebP-Dateien in statisches JPG konvertieren." }
            ]
        },
        'remove-background': {
            title: "KI Hintergrundentferner",
            intro: "Entfernen Sie Bildhintergründe mit einem Klick in Sekunden. Perfekt für Produkte, Porträts und Logos.",
            whyTitle: "KI Hintergrundbereinigung",
            features: [
                { title: "Auto-Erkennung", desc: "KI versteht das Motiv und macht präzise Schnitte." },
                { title: "Transparentes PNG", desc: "Laden Sie Ergebnisse als transparente PNGs herunter." }
            ],
            faq: [
                { q: "Ist das kostenlos?", a: "Grundlegende Nutzung ist kostenlos. Upgrade für High-Res und unbegrenzte Stapelverarbeitung." },
                { q: "Welche Fotos funktionieren am besten?", a: "Fotos mit klaren Motiven (Menschen, Autos, Produkte)." },
                { q: "Erkennt es Haare und Fell?", a: "Ja, unsere KI erkennt Haarsträhnen und Fell mit Pixelgenauigkeit." },
                { q: "Was ist das Ausgabeformat?", a: "Heruntergeladen als transparentes PNG." },
                { q: "Kann ich Stapel-Hintergrundentfernung durchführen?", a: "Ja, laden Sie mehrere Fotos hoch und entfernen Sie alle Hintergründe gleichzeitig." }
            ]
        },
        'compress-image': {
            title: "Bildkomprimierer & Größenänderer",
            intro: "Reduzieren Sie JPG, PNG und WebP Dateigrößen um bis zu 90% ohne Qualitätsverlust.",
            whyTitle: "Intelligente Komprimierung",
            features: [
                { title: "Verlustbehaftet & Verlustfrei", desc: "Wählen Sie zwischen maximaler Qualität oder maximaler Komprimierung." },
                { title: "Stapelverarbeitung", desc: "Komprimieren Sie Ordner voller Bilder auf einmal." }
            ],
            faq: [
                { q: "Sinkt die Qualität?", a: "Wir optimieren sichtbar verlustfrei. Keine Pixelierung." },
                { q: "Unterstützte Formate?", a: "JPG, PNG, WebP und HEIC unterstützt." },
                { q: "Wie viel Komprimierung ist möglich?", a: "Je nach Dateityp ist eine 50-90%ige Größenreduzierung erreichbar." },
                { q: "Wie wichtig ist das für Website-Geschwindigkeit?", a: "Bilder machen über 60% der Seitenladezeit aus." },
                { q: "Ändert sich meine Originaldatei?", a: "Nein, Ihre Originaldatei bleibt erhalten." }
            ]
        }
    },
    fr: {
        'home': {
            title: "Tous les outils d'image en un seul endroit - WebImgConverter",
            intro: "WebImgConverter est une boîte à outils sécurisée et rapide pour tous vos besoins de conversion et d'édition d'images.",
            whyTitle: "Pourquoi WebImgConverter?",
            features: [
                { title: "🔒 Priorité Vie Privée", desc: "Vos fichiers sont en sécurité. Le traitement se fait sur votre appareil ou de manière sécurisée dans le cloud." },
                { title: "⚡ Ultra rapide", desc: "Traitez des milliers d'images en quelques secondes." },
                { title: "📱 Multi-plateforme", desc: "Fonctionne sur Windows, Mac, iPhone ou Android." },
                { title: "🤖 Propulsé par l'IA", desc: "Derniers modèles IA pour la suppression d'arrière-plan." }
            ],
            faq: [
                { q: "WebImgConverter est-il gratuit?", a: "Les outils de base sont gratuits. Les fonctions avancées utilisent des crédits cadeaux quotidiens." },
                { q: "Mes fichiers sont-ils en sécurité?", a: "Oui, les fichiers ne sont jamais stockés de manière permanente et sont supprimés immédiatement." },
                { q: "Quels formats sont pris en charge?", a: "HEIC, HEIF, JPG, PNG, WebP, AVIF sont pris en charge." },
                { q: "Fonctionne-t-il sur mobile?", a: "Oui, fonctionne parfaitement sur tous les navigateurs modernes." },
                { q: "Puis-je convertir par lot?", a: "Oui, téléchargez plus de 100 fichiers à la fois." }
            ]
        },
        'heic-to-jpg': {
            title: "Guide de conversion HEIC vers JPG",
            intro: "WebImgConverter vous permet de convertir le format photo moderne HEIC d'Apple en JPG, PNG ou WEBP en quelques secondes.",
            whyTitle: "Guide de conversion HEIC",
            features: [
                { title: "Pourquoi convertir HEIC en JPG?", desc: "HEIC offre une haute compression mais manque de compatibilité." },
                { title: "Conversion par lot", desc: "Téléchargez et convertissez des centaines de photos iPhone à la fois." },
                { title: "Pas de perte de qualité", desc: "Les algorithmes professionnels préservent la qualité originale." },
                { title: "Support HEIF", desc: "HEIC et HEIF sont tous deux pris en charge." }
            ],
            faq: [
                { q: "Comment ouvrir HEIC sur Windows?", a: "Pas besoin d'acheter d'extensions, convertissez en JPG avec WebImgConverter." },
                { q: "La qualité souffre-t-elle?", a: "Non, nous préservons la qualité visuelle avec les meilleurs algorithmes." },
                { q: "Qu'est-ce que HEIC?", a: "HEIC est le format d'image moderne d'Apple depuis iOS 11 avec 50% de taille de fichier en moins." },
                { q: "Comment transférer les photos iPhone?", a: "Connectez votre iPhone via AirDrop, iCloud ou câble." },
                { q: "Puis-je convertir HEIC par lot?", a: "Oui, téléchargez plus de 100 fichiers HEIC à la fois." }
            ]
        },
        'png-to-jpg': {
            title: "Convertir PNG en JPG - Transparence & Taille",
            intro: "Convertissez de gros fichiers PNG en format JPG optimisé pour le web.",
            whyTitle: "PNG vs JPG?",
            features: [
                { title: "Taille de fichier plus petite", desc: "Les PNG peuvent être énormes. JPG offre jusqu'à 80% de meilleure compression." },
                { title: "Compatibilité web", desc: "JPG est le format le plus rapide pour les photos sur les sites web." }
            ],
            faq: [
                { q: "Qu'advient-il de la transparence?", a: "JPG ne supporte pas la transparence. Les arrière-plans deviennent blancs automatiquement." },
                { q: "Quand utiliser PNG?", a: "Utilisez PNG pour les logos avec transparence, JPG pour les photos." },
                { q: "Différence entre PNG et JPG?", a: "PNG offre une compression sans perte et la transparence, JPG des fichiers plus petits." },
                { q: "Lequel est meilleur pour les sites web?", a: "JPG pour les photos, PNG pour les logos et icônes." },
                { q: "Puis-je choisir la couleur d'arrière-plan?", a: "Oui, choisissez blanc, noir ou une couleur personnalisée." }
            ]
        },
        'webp-to-jpg': {
            title: "Convertir fichiers WebP en JPG & PNG",
            intro: "Convertissez le format WebP de Google en JPG ou PNG universellement compatible.",
            whyTitle: "À propos de la conversion WebP",
            features: [
                { title: "Compatibilité universelle", desc: "WebP ne s'ouvre pas partout. JPG et PNG oui." },
                { title: "Conversion inverse", desc: "Nous maintenons la qualité maximale lors de la conversion de WebP." }
            ],
            faq: [
                { q: "Qu'est-ce que WebP?", a: "WebP est un format de nouvelle génération de Google pour des sites web plus rapides." },
                { q: "La conversion est-elle rapide?", a: "Oui, notre technologie navigateur convertit des dizaines de fichiers par seconde." },
                { q: "Pourquoi convertir WebP en JPG?", a: "Photoshop et les anciens navigateurs ne supportent pas WebP." },
                { q: "Y aura-t-il une perte de qualité?", a: "Perte de qualité minimale avec notre conversion." },
                { q: "Les animations WebP sont-elles supportées?", a: "Vous pouvez convertir des fichiers WebP animés en JPG statique." }
            ]
        },
        'remove-background': {
            title: "Suppresseur d'arrière-plan IA",
            intro: "Supprimez les arrière-plans d'images en un clic en quelques secondes. Parfait pour les produits, portraits et logos.",
            whyTitle: "Nettoyage d'arrière-plan IA",
            features: [
                { title: "Détection auto", desc: "L'IA comprend le sujet et fait des coupes précises." },
                { title: "PNG transparent", desc: "Téléchargez les résultats en PNG transparents pour vos designs." }
            ],
            faq: [
                { q: "C'est gratuit?", a: "L'utilisation de base est gratuite. Passez à Premium pour haute résolution et lots illimités." },
                { q: "Quelles photos fonctionnent le mieux?", a: "Photos avec des sujets clairs (personnes, voitures, produits)." },
                { q: "Détecte-t-il les cheveux et la fourrure?", a: "Oui, notre IA détecte les mèches de cheveux et la fourrure avec précision au pixel." },
                { q: "Quel est le format de sortie?", a: "Téléchargé en PNG transparent." },
                { q: "Puis-je supprimer les arrière-plans par lot?", a: "Oui, téléchargez plusieurs photos et supprimez tous les arrière-plans simultanément." }
            ]
        },
        'compress-image': {
            title: "Compresseur & Redimensionneur d'images",
            intro: "Réduisez les tailles de fichiers JPG, PNG et WebP jusqu'à 90% sans perte de qualité.",
            whyTitle: "Compression intelligente",
            features: [
                { title: "Avec et sans perte", desc: "Choisissez entre qualité maximale ou compression maximale." },
                { title: "Traitement par lot", desc: "Compressez des dossiers entiers d'images à la fois." }
            ],
            faq: [
                { q: "La qualité baisse-t-elle?", a: "Nous optimisons sans perte visible. Pas de pixelisation." },
                { q: "Formats supportés?", a: "JPG, PNG, WebP et HEIC supportés." },
                { q: "Quelle compression est possible?", a: "Selon le type de fichier, une réduction de 50-90% est réalisable." },
                { q: "Importance pour la vitesse du site?", a: "Les images représentent plus de 60% du temps de chargement de page." },
                { q: "Mon fichier original change-t-il?", a: "Non, votre fichier original est préservé." }
            ]
        }
    }
};

type LangKey = keyof typeof seoData;

export const SeoContent = ({ pageType = 'heic-to-jpg' }: SeoContentProps) => {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;

    const content = seoData[activeLang]?.[pageType] || seoData['en'][pageType];

    // Generate FAQPage Schema.org JSON-LD
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": content.faq.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
    };

    return (
        <section className="bg-slate-50 dark:bg-slate-950/50 border-t border-slate-200 dark:border-slate-800 py-16 px-4 md:px-8 mt-20">
            {/* FAQPage Schema.org for rich snippets */}
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>
            </Helmet>

            <div className="max-w-4xl mx-auto space-y-12 text-slate-600 dark:text-slate-400">

                <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{content.title}</h2>
                    <p className="leading-relaxed text-lg whitespace-pre-line">
                        {content.intro}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {content.features.map((feature, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-card transition-shadow">
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {activeLang === 'tr' ? 'Sıkça Sorulan Sorular (SSS)' : activeLang === 'de' ? 'Häufig gestellte Fragen (FAQ)' : activeLang === 'fr' ? 'Questions Fréquemment Posées (FAQ)' : 'Frequently Asked Questions'}
                    </h3>

                    <div className="space-y-4">
                        {content.faq.map((item, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <h4 className="font-semibold text-brand-600 dark:text-brand-400 mb-2">{item.q}</h4>
                                <p className="text-slate-600 dark:text-slate-400">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};
