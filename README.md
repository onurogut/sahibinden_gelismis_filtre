# Sahibinden Gelişmiş Filtre

![image](https://github.com/onurogut/sahibinden_gelismis_filtre/assets/52832895/3c9424ac-fbed-4aff-90d1-2eed37a398b2)


Bu Chrome eklentisi, Sahibinden web sitesinde belirli bir seriyi gizlemek için kullanılan bir filtreleme aracıdır.

## Kullanım

1. **Gizlenecek Seriyi Ekleyin:** Eklenti, Sahibinden web sitesinde gizlemek istediğiniz bir seri adını girmenize olanak tanır. Ardından, "Gizle" butonuna tıklayarak bu seriyi filtre listenize ekleyebilirsiniz.

2. **Filtre Listesini Gözden Geçirin:** Eklenen seriler, sağ üst köşede bulunan filtre listesinde görüntülenir. Bu liste üzerinden eklediğiniz serileri yönetebilirsiniz.

3. **Filtreyi Temizleyin:** Filtre listesinde bulunan "Filtreyi Temizle" butonuna tıklayarak tüm filtreleri temizleyebilir ve Sahibinden web sitesindeki tüm serileri yeniden görüntüleyebilirsiniz.

## Nasıl Çalışır

Eklenti, Sahibinden web sitesindeki belirli bir seriyi gizlemek için JavaScript'in `executeScript` fonksiyonunu kullanır. Filtre listesi, Chrome'un `chrome.storage.sync` özelliği kullanılarak saklanır, böylece kullanıcılar farklı cihazlarda aynı filtre listesini kullanabilirler.

## Geliştirici

Bu proje [onurogut](https://www.linkedin.com/in/onurogut/) tarafından geliştirilmiştir.

---

**Not:** Bu eklenti, Sahibinden web sitesindeki belirli içerikleri gizlemenize olanak tanır. Web sitesinin güncellenmesi durumunda eklentinin çalışmaması mümkündür. Eklentiyi kullanmadan önce tarayıcınızın güvenlik ayarlarını kontrol ettiğinizden emin olun.
