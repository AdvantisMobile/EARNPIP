
1. App'a devam için rate us ve review istememiz gerekiyor.
2. Demo otomatik başlasın ve müşteriyi otomatik başlayan bu DEMO hakkında email ve push notification ve App içindeki pop-up ile bilgilendirelim.
3.App store'lardaki tanıtım başlığı ve makalemizi değiştireceğiz. resimlerimizi yenileyeceğiz ve tanıtım videosu ekleyeceğiz.
4. Sitemizdeki copytrading başvurusunu app'ten de alacağız ( https://www.earnpip.com/start-copying form gibi)
5. Kaç kişinin ve kimlerin aktif olduğunu, push notification larının açık olup olmadığını ne kadar sıklıkta ne kadar süre ve kaç kez girdiklerini çıktıklarını vb. yani istatistikleri izleyebilmemiz gerekiyor. varsa bir izleyici/kayıtçı (tracker) veya en azında google analytics veya hotjar-bedava sürümü gibi birşeyler..
6.Membership/üyelik'te:
google ile, facebook ile de  bağlanma ( indirip kullanmaya kaşladıktan sonra 3 gün içinde/ veya dir dahaki girişi 3 günden daha uzun bir süre sonraysa açılır açılmaz kayıt alalım)
ve bir IMEI 'ye bir üyelik olsun, adam yüklerse tanısın.
IMEI+üyelik kaydı başına standard süre belirleme konusunu kontrol paneline koyalım. mesela standard 3 ay olarak koyalım ama ben istersem değiştirebileyim.

7. Earn Bonus bölümünü kaldıracağız

8. Hatırlatma Pazarlaması modelini uygulayabimek için:
1,2,3,5,10,20;30 ,45 ve 60 gün otomatik ve hazır emallerini ve push notification'larını  her üyeye göndereceğiz ( tabi google,facebook veya normal kayıt yaptırdığı 1. gün itibariyle)
Bunu nasıl yapabileceğimi bana öğretebilir misin ve hazır hale getirebilir miyiz?

9. email verification'la ilgili sorunlar oluyor hatta bir tane de olumsuz review olmışız 8 zaten 2 tane rating ve review'imiz olduğu için çok moral bozucu). bana böyle 5-6 şikayet geldi. bunu nasıl daha basit ve hatasız hale getirebiliriz, bir araştırı mısın lütfen? ( bir email örneğini bir sonraki emaille forward'layacağım)
10. japonca, korece ve çince gibi özellikli dillerde olmasının nasıl olacağını/sorun olup olmayacağını öğrenebilir misin lütfen?

* Affiliate marketing ve MLM ( multi level marketing) konusu çok önemli. Geniş zamanında öğrenmeni ve biz nasıl uygulayabiliriz'i konuşabiliriz.
** Bu bitince, varolan şimdiki earnpip üzerinde görsellik değiştirip, birkaç bölümü daha iptal edip parayla satılan bir app daha hazırlayacağız. ona diller ekleyip yerelleştirme yapacağız. orada bu affiliate ve MLM 'ye çok ihtiyaç duyabiliriz. Ürünü ''arkadaşını davet et'' lerle ve '' acentemiz/affiliate'imiz olun'' şeklinde kendi kendine yayılabilen bir yapıya getirmek gerekiyor. Ayrıca ülkeye (IMEI/IP vb ile) göre fiyatlama ve tahsilat sistemi APP içi..

***Kırmızı ile yazılı bölümlerdeki yazıları sana cuma'ya kadar göndereceğim.

kolay gelsin.


----Erhan----
1-Bütün  hardcoded margin,padding ler düzeltilecek.
2-Kalan hardcoded string ler messages dosyasına taşınacak.(alert da title lar düzenlenecek.)
3-Demo sayfasında native base den dolayı arada boşluk var ona tekrar bakılacak.
4-Facebook sdk ve google için ios ayarları yapılacak.(Debug keystore kullanıldı ona bakılacak.)
5-Console.log lar silinecek,bütün errorlar handle edilecek,handle edilmeyenlere global bir mekanizma kurulabilir.(Varsa tabi..)