## `Kurulum`

```
npm install veya yarn
```

## `Kullanilan Kutuphaneler`

- `@reduxjs/toolkit`
- `react-redux`
- `axios`
- `react-router-dom`
- `@mui/material-ui`
- `@emotion/react`
- `@emotion/styled`

## `Kullanilacak Araclar`

- `Redux Dev Tools` : Chrome uzerinde calisan ve global state uzerinde yapilan tum degisikliklerin takip edilmesini saglayan tarayici uzantisidir. Indirmek icin [tiklayiniz.](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?utm_source=chrome-ntp-icon)`

## Uygulamanın Canlı Ornegi:



Proje Yazma Asamalari :

************ 1. bolum ************

Login.jsx / authSlice / PrivateRouter / useAuthCalls sayfalarini ayarliyoruz

1.features dosyasi altinda reducerlarimizi olustururuz.Boylelikle uygulama boyunca kullanacagimiz login ve dashboard duzenleme islemlerini bunlar altinda toplayabiliriz.

2- login sayfasini formik ve yup cagirarak duzenliyoruz

3- service klasoru altinda authApiyi olustururz : amacimiz login ve register fonksiyonlarini burada tanimlamak

4- login fonksiyonumuzu authApi altinda async await olarak cagiracagiz

5- ama api isteginin kolay olmasi icin env dosyasi icinde base url olusturulur.

6- sonra bu env dosyasina gore login fonksiyonumuzdaki axios.post istegi duzenlenir(bu islem start stop ister!!!!)

7- try catch duzenlemeleri ile async li login fonk duzenlendir.Tabi bu post islemi oldugu icin url yaninda veri ister . Bu yuzden bu fonksiyonun icine veri yollamamiz lazim. Bu yuzden bu parametreli bir fonksiyona donusturelerek o parametre url den sonra virgul ile yazilir

8- simdi formik icinde onSubmit kisminda  olunca bu login cagirilir.Burada logine yukarida belirttigimiz veri paslanir.Bu veri values de formik ozelligi olarak zaten tutuluyordu.Direk values burada pas gecilir.

9- su anda login basarili olunca veya olmayinca ne olacak onlari belirleyecegiz.Bunlari toastlari kullanarak yapacagiz.
        basari durumunda  : login fonksiyonunun duzenlenemsi:
        1- navigate hookunu cagirarak basari durumunda stock sayfasina yonlendirmek istiyoruz . bunu useNavigate kullanarak yapacagiz. useNavigate bir react hooku ama logini yazdigimiz authApi bir js dosyasi oldugu icin onun icinde react hooku cagirmak hata vermesine sebeb olacaktir. Cunku react hooku ya component yada customhook olmasi lazim.Biz authApi de bir jsx return etmek istemedigimiz icin onu component yapmamizin bir manasi yok.Ayrica biz redux ile calisiyoruz. zaten useDispatch her turlu gerekecek yani bir hook herturlu devreye girecek.Cozum custom hook olusturmak.Yani authApiCall u useAuthCalls a donusturerek bir custom hook a donusturuyoruz. Tabiki adini degistirdikten sonra bunun icinide return yapacak sekilde ayarliyoruz.Ama suna dikkat yine de bir jsx return etmiyoruz. olusturdugumuz fonksiyonu return ediyoruz.

        2- simdi navigate hookunu useAuthcalls icinde cagiriyoruz.Logine.jsx e customhook daki login fonk u import ediyoruz.

10- simdi istek basarili olduktan sonra gelen data yi ne yapacagiz ? authSlice reducer i na gerekli kodlari yaziyorz.Cunku o veri buraya aktarilacak.Burada initialState i ayarliyoruz. Sonra reducerda ne olacaginiz yazacagiz . Api dan veri gelipte reducera veri verilince asyncThunk kullaniriz normalde. Ama burada islem basladi basarili ve bsarisiz diye 3 durumu tek tek yazarsak thunk a gerek kalmaz.Bunlari export ediyoruz.Ve custom hook icinde cagiriyoruz.Boylece oradan dispatch ile burada calistirilabilsin.

11- simdi bu basarili gitme durumunu useAuthCallsa cagiriyoruz bunu try kisminda dispatch icinde cagiriyoruz. Yani basarili durumunda bu veriyi reducer a paslamak icin dispatch kullanmis olacagiz.Basarisiz olma durumlarini da ayni sekilde yaziyoruz.

12- simdi login olunca bilgiler reducer olan authSlice a gidiyor.Bu Login sayfamizda calistirdigimiz Formik icindeki onSubmitte cagirdigimiz login fonksiyounu ile gerceklesiyor.Bu fonksiyon ise bizim olusturdugumuz customhook olan useAuthCalls dan cagirildi.

13- simdi private kismini duzenleyerek login olamazsak login sayfasina yonlendirmesini sagliyoruz ve dashboardaki login yazisini duzenleyerek logout a donusmesini sagliyoruz


************ 2. bolum ************

Register / RegisterForm / useAuthCalls / useAxios / MenuListItem / Dashboard ve Outlet

1- Login sayfasinda oldugu gibi yup ve Formik cagiriyoruz. Formik i yine Register icine yerlestiriyorumz . Burada farkli olarak yup da kullandigimiz schema yi RegisterForm sayfasinin icerisinde cagirarak Register a import ediyoruz.

2- Su anda Register sayfamizin cindeki Formik de 4 adet prop olacak yani ekstra 4. olan component  ve icinde cagirilan RegisterForm oluyor. Burada onSubmit olunca  farkli olarak register login yerine register fonksiyonunu cagiriyoruz. Bu fonksiyonu yine bizim customhook umuz olan useAuthCalls icinde olusturuyoruz.Bu register fonksiyonunda  fark url sonunda users yaziyor ve register basarili olunca dispatch icinde farklilik var. Burada register olunca gelen cevap biraz farkli oldugu icin authSlice fonksiyonu icinde reducer kisminda registerSuccess olusturarak user bilgilerini payload.data.username olarak cagirmamiz gerekiyor.Sonra register fonksiyonun icinde try durumundaki dispatche registerSuccess fonksiyonunu koymamiz lazim.Registersuccessi export etmeyin unutmayalim

3- simdi logout a tiklayinca ne olacak onu ayarlayalim.Dashboarda gidip onClick fonksiyonunu yaziyoruz.handleLogout fonksiyonunu bunun icine yerlestiriyoruz.logout fonksiyonunuda yine customhook umuz icine yazabilir.(useAuthCalls)Digerleri ile ayni ama bu post degil get . Buna userInfo degil token gondermemiz lazim.Tokeni header icinde gondermemiz lazim.Header i get icinde Authorization key i ile yaziyoruz.Ve navigati stock olarak degil login olarak degistiriyoruz.Toast mesajlarinida duzenliyoruz.LogoutSucces diye ayri bir fonksiyonu authslice icinde reducer da olusturuyoruz.Cunku logout olunca statelerin silinmesini istiyoruz.useAuthCalls da logout fonksiyonu icindeki dispatch icine artik bu fonksiyonu yaziyoruz.Ayrica buradaki const datayi silebiliriz ihtiyacimiz yok ve heards icinde tokenimizi yerlestirmemiz lazim.Token a nasil erisecegim? Global state ulasmam lazim. useSelector ile  useAuthCalls icine bu token i cekiyoruz.Sonra headericine onu yaziyoruz.Dashboarda artik logout buttonunun icinde logout fonksiyonunu onClick ile yazabiliriz.

4- simdi herdefasinda bircok yerde token li islemler yapacagimiz icin axios umuzu revize ediyoruz.env ye fonksiyon atilmaz degiskeneler atilir. Axios instance i kullanarak bunu yapacagiz.Burada her defasinda base url ve headers kullanmaya gerek kalmadan instance i kullanabilir.

5- service altinda bir js aciyorum axionInts adi altinda.buraya token i verilmiy hali ile bir fonksiyon olusturuyorum 'axiosWithToken' .Buraya token i cekmek icin useSelector kullanamiyoruz.Cunku burasai bir js dosyasi. Bu yuzden bunuda custom hook a ceviririz adi useAxios.jsx olsun burada axiosWithToken return edilir . Token da useSelector ile cagrilabilir.

6- useAuthCalls da bu axiosWithToken cagirilir.Bunu logout fonksiyonumda await den sonra kullanirim. Gorulecegi uzere artik tek satirda token gereken fetch islemini gerceklestirmis oluruz.

7- axiosPublic diye bir fonksiyonu useAxios icinde olsutrurum ve token gerektrimenyen fonksiyonlari bunu kullanarak olusturabilirim.

8 - Bundan sonra sitenin icerisi ile ugrasacagiz.Ilk basta acilip kanpanir menuyu yapalim. MUI den responsive drawer i secelim.Bunu Dashboard icine yapistirir ve duzenleriz.
        1.logout butonunu olustur
        2.user i state den cek
        3.logout fonk cek
        4.stock app yazisini duzelt
        5.renkleri ayarla

9- MenuListItem diye bir jsx i components altinda olsuturuyorum. Dashnoarddaki ListItem kismini kesip buraya yapistiriyoruz.Birada icons array i olusturuyoruz.Icine bir obje koyarak icon title url keylerini obje icinde olusturuyorum.Mui den cektigim iconlar saysisinca bu objeyi cogaltip bu array icinde objeleri olusturuyorum.Bu diziyi return altinda map ile gezerek ListItem icinde basalim.Sonra bunlara tiklandiginda ilgili sayfaya yonlendirmek icin navigate vermemiz lazim.Litsitem lara onClick vererek navigateleri bunun icine yerlestirirm

10- Menu deki butonlara basinca yonlendirilen sayfalari nesting olarak olusturmam lazim. AppRouter a giderek Dashboard altina bu nestingi olusturuyorum. Home Purchase vs Routeleri burada olustururm.

11- Dashboard a gelince bu sayfalar basilmasi icin Outlet i burada cagiriyorum

************ 3. bolum ************

1- Acilir kapanir menudeki yazilari stillendirelim.Iconlar svg oldugu icin bunlara stil verirken olduklari yere gitmemiz lazim.MenuListItems da  inline css lerle bu isi yapabiliriz.

2- Refresh yapinca statelerin kaybolmamasini saglayabiliriz.Burada redux-persist i kullaniyoruz. Gerektiginde oradan rehydrate yapacagiz. Bunun default ayarlari localStorage dir. Bunun icin store.jsx e gidiyoruz.Tabi redux-persist i yarn ile kurmayi unutmayalim. Kendi sayfasindan gerekli importlari yapalim. Uygulamanin tamamini persistent yapmak istersek rootReudcer i sarmalarim. Biz burada stock u degil authReducer i persistent yapmak istedgimiz icin persistedReducer fonksiyonumuzun parametresini authReducer yapacarqak store icindeki reducer da auth karsisina persistedreducer i koyabiliriz. Store da artik persistor u export etmemiz lazim. store u persistStore icine atariz.App.js i de duzenlememiz lazim . Buraya PersistGate i ve persistor u import edip Provider icine yerlestiririz.Burada console da bir hata olusacak onu kaldirmak icin redux persisten middleware vs yi import edip store a yapistirirsak sorun cozulecektir.

3- Simdi firma sayfasini duzenleyelim.Ilk amacimiz verileri cekip bunlari global state e aktarmak.Lazim olunca oradan gunceller veya oradan cekeriz.StockSlice.jsx de bunu olusturabiliriz.Bunu store a eklemeliyiz.Orada import edelim.Bize lazim olacak key leri iceren initialState i burada olusturalim. name stock olsun. fetchStart ve fetchFail i authSlice den copy paste yapalim.Fetch basarili olursa getFirmsSccess methodunu cagiririz. Buradaki payload a firma bilgilerini yukleyebiliriz.

4- Firms componentine gidelim.Typograyphy icinde Firms yazariz altina button elementi ekleriz.Verinin backend den cekilmesi lazim . Burada useEffect hooku olustururz. getFirms diye bir async fonk olsun bunu useEffect icinde cagiralim. Bu firma bilgisi bize baska yerlerde de lazim olacagi icin  getFirmsi export ederim ama component icinde dogurudan fonk export edilemez. Component disina cikarsam burada hook kullanamam. O zaman yine bir custom hook yazalim.useStockCalls diye bir hook olusturalim. getFirms fonksiyonunu burada yazar return ederim. Artik bu fonk heryerde cagirilabilir. 

5- useStockCalls icinde getFirms fonksiyonunu yazarken token ister.Api guvenlikli oldugu icin tum get post larda token ister . useAxios da zaten biz axiosWithToken i yazmistik buraya direk cekeriz sonuna /firms/ eklesek yeterli.try catch yapisi ile fonksiyonu tamamliyoruz.Bunu Firms de import ederek useEffect icerisinde artik cagirabiliriz.

6- useStockCalls da getSales diye bir fonksiyon yazalim. getFirms de yaptiklarimizi yapalim.Tabi stockSlice da bu fonksiyonun basarili olmasi durumu ile ilgili methodu reducer icinde olusturmamiz lazim.Firms fonksiyonu icinde bu getSales i cagiralim.

7- burada gozuktugu uzere sayfalarimiza bilgileri cagirirken hemen hemen ayni kodlari yaziyoruz.Demekki useStockCalls da bunlari tek tek yazmak yerine daha pratik sekilde yazabiliriz.Kritik nokta url nin duzenlenmesi. getStocks adinda generic bir fonk yazsam burada parametre olarak url kullansam ki bu url "firms" , "sales" gibi sayfa isimlerine karsilik gelecek ve bunu axiosWithToken icine versem bunu yapalbilirim.Ama basari durumunda dispatch e verilecek fonksiyonlari herseferinde farkli olmasini nasil saglarim ?

8- getStockSucces adinda bir methodu stockSlice reducer i icinde olusturalim. Bir objenin key i degiskense square bracet kullaniyorduk. Aynisini burada yapacagiz . Dispatch icinde type ve payload vardi. Payload icine bir seyler atabiliyorduk. Ben payloadu mu bir obje halilne getirsem. useStockCalls da dispatch icine getStockSucces koyduktan sonra bu fonksiyona parametre olarak bir obje paslasam ve buraya apiData ve url olarak iki key yazsam payload icine bir obje ve bu keyleri koymus olurum.Simdi stockSlice reducer a donsem getStockSucces methodunu buna gore duzenlersem bunu basarabilirim. simdi bu reducer da {payload} icine bu obje gelmis oldu. payload yapisini redux yuzunden bozamiyoruz. simdi methodun icinde payload.url payload.apiData olarak bu bilgileri kullaniyorum.Sonuc olarak Firms sayfamda artik getFirm vs degil getStocks u cagiriyorum.useEffect icinde artik getStocks u defaatle cagirarak icine hangi sayfa gerekli ise onun adini atarak cagiriyorum.

9- simdi firma bilgilerini ekrana basalim. firma verisini useSelector ile globalden Firms e cekelim.Firm dosyamizda responsive lik icin grid icinde firms i mapliyorum her iterasyonda yine bir grid return ediyorum. Bu her grid icinde olusturacagim FirmCard componentini cagiriyorum

10- kartlarim icin component icinde FirmCard componentini olusturuyorum.Tabiki Firm icinde itere edereken olusturdugum bu FirmCard componentine firms datasinin icindeki her firmaya ait veri olan iterasyonda kullandigim firm i pas gecerim.FirmCard da bu firm i yakaldiktan sonra mui den cektigim card yapisinda gerekli yerlere bu firm icinden destructring yaparak cikarttigim bilgileri serpistiririm.Card stillendirmesini yaparak bitiririm

11- src de globalStyles.js dosyasi olusturup button larin stillendirmesini burada yazabilirim.

12- delete buttona onClick ekler burada deleteStock fonksiyonunu cagiririz.firma silinecegi icin bu fonksiyona firmalar ve id pas gecilir. useStockCalls da bu deleteStock fonksiyonunu yazariz. bu da async fonksiyonu olacak. axiosWithtoken a delete yazar ve urlden sonra id yi de ekleriz. Peki bu fonksiyonun dispatch i nasil olacak ? az once api den firmayi sildik . silinmis halini setStock ile deleteStock fonksiyonunun icinde cagirirsak bunu basaririz.Burada yeniden dispatch e gerek yok cungku zaten getStock bir dispatch yayinlayacatir.deleteStock u firmCard da useStockCalls custom hook unu kullanarak import etmeyi unutmayalim


************ 4. bolum ************

1- Yeni firma girme ve modal acma islemlerini yapalim: Mui den istedigimiz modal yapisini aliyouruz.Components de FirmModal componentini olusturuyoruz.Buraya modal i yapistiriyoruz.FirmModal i Firms de button un altina yerlestiriyorum.modal in style ini globalstyle a aktarip oradan import edersek ilerisi icin kolaylik olabilir.Modalin openModal tusundan degilde newFirm butonundan yapilmasini istiyoruz.Bu buton firms de oldugu icin modal i acip kapayan stateleri yukari tasiyorum ve sonra buraya pasliyorum.New firm butonuna onClick vererek butonu aktif hale getiriyorum.

2- FirmModal componentimin icinde modal imiin yapisini duzenliyorum.4 adet TextField ve submit butonumu buraya yerlestiriyorum.info diye bir state olusturuyorum.Bunun icinde bir obje olarak yeni firmanin hangi bilgilerini girmek istiyorsam bus stateler olarak buraya yerlestiriyorum.Tabiki bunlar inputlara karsilik gelecegi ve user bunlari dolduracagi icin her TextField e onChange leri yerlestiriyorum.OnChange e koydugum handleChange fonksiyonunun icinde setInfo yu cagiriyoruz.Ayrica onSubmit e handleSubmit butonunu ekleyebiliriz.Bunun icinde e.preventdefault cagirdigimiz icin modal kendisi kapanmiyor.Bu sebeble bunun altinda handlClose fonksiyonunu cagiriyoruz. 

3- firmModal daki info yu kesip Firm e yapistiriyorum.Cunku onu ust komponente alarak edit kisminda da kullanabilmek icin bunu yapiyorum.

4- submit butonuna basildiginda post istegi atmam lazim . Bunu useStockCalls icinde postStock olarak olusturuyorum.Bunu handleSubmit fonksiyonumun icinde cagiriyorum.

5- put istegini olusturuyorum.Bunu bir elementi degistirmek icin yapiyorum edit kisminda kullanacagim.useStockCalls da putStock fonksiyonumu yaziyorum.FirmCard da edit butonuna onClick e handleOpen yerlestiriyorum.Tabiki bunu import etmeliyiz oncelikle.Boylece edit tusu ile de modalimi acabiliyorum.Ama edit tusuna basinca modalimin dolu gelmesi lazim.Info bir ust componentte duruyoru yani Firms de. Ben firmCard a setInfo yu cagirip firmCard da bunun araciligi ile bilgileri buraya doldurup infoyu degistirebilirim. Edit butonuna basilinca , o zaman , handleOpen yaninda setInfo yuda cagiririz.Peki setInfoya atacagim bilgi nerde? onlari firms i itere ederken firm firm geziyorduk ya o firmi firmCard a pas gecmistik.iste firmi destructure yaparsak icindeki bilgilere ulasmis oluruz.Hatta setInfo icine firms i parametre olarak atarsak bilgiler direk gelir.

6- handlesubmit su anda problem olacak.cunku post istegimi atacak yoksa put istegimi atacak sorusu ortaya cikiyor.O zaman handlesubmit icinde bir if else olusturyorum.Post yaparken bilgiler icinde tabiki id olmayacak cunku biz daha backende yeni yolluyoruz. Ama put yaparken backendden veriyi cekip onu degistirdigimiz icin orada gelen bilgide bir id olacak.Biz ayrimi bunun ustunden yapabiliriz. Eger id varsa yoksa seklinde if else yapabiliriz.Ayni kosulla FirmModal daki submit butonuda kosula gore edit olarak degistirilebilir.

7- Products kismini duzenleyelim.Mui nin icindeki hazir tabloyu kullaniyoruz.Bu filter coloumn gibi ozellikleri bize hazir getiriyor.data-grid projemize kurulmali.Firms componentinin tamamini producta kopyaladiktan sonra gerekli yerleri product olarak degistirebiliriz.En alltaki grid yapisina gerek yok orayi silebiliriz.ProductModal componenti olusturuyoruz.Buda FirmModal in kopyasi olup isimler degistirelecek.2 adet selectbox ve bir adet input olacak burada.useEffectde getStatus da prducts olacak.Components icinde ProductTable componenti aciyoruz.Bunu Products a import ediyoruz.Buraya gerekli tabloyu mui den yapistiriyoruz. Category ve Brand verilerine de bu sayfada ihtiyacimiz var . useEffect altina bunlari getStocks fonksiyonunun parametreisni degistirerek ekliyoruz.Burada olusan id hatasini cozmek icin getRowId fonksiyonunu kullanacagiz

************ 5. bolum ************

1- products a devam ediyoruz. Tabloyu data grid den yapistirmistik. Tablo kismini harici bir komponent yapip products import etmistik.Noramlde backendden gelecek bir seyi field a ddirek yazabiliyorduk. Burada valueGetter kullanacagiz.Bunu diger verileri degistirip farkli sekillerde kullacaksak ise yarayan bir ozellik.Burada valueGetter a props paramatresini verdikten sonra console a bakarsiniz ismin props.row.categoryId.name de oldugunu gorecegiz. Buna gore valueGetter i hazirliyoruz.

2- simdi action kismini olusturalim.Bu hucreyi olusturmak icin renderCellde kullanilabilir ama getActions da kullanilabilir.Buraya istedigimiz iconu import edip pasliyoruz.Silme actionu icin onClick olusturuyoruz.Buraya zaten hazirlamis oldugumuz deleteStock fonksiyonunu onClicke verebiliriz.Bu fonksiyonun icine parametre olarak product silmek istedigimiz icin products i birinci parametre olarak veriyoruz. ikinici parametre id olacak Id ye nasil erisecegiz? getActions fonksiyonuma params parametresini vermistim . Bu params a baktigimizda direk id oldugunu gorecegiz. o zaman params.id olarak id ye ulasabilir ve hangi products in silinecegini belli edebilirim.

3- newProduct ekleme kismini yapalilm.ProductModala bakalim.Burada sadece post istegi olacak digerlerine gerek yok.Products da initialState  state i olusturuyoruz ve icerigini products post da nasil istiyorsa ona gore duzenliyoruz handleCloseda setInfo ya bunu pas gecerek biraz kisaltiiyoruz kodumuzu . Aslinda infonun yukardan gelmesine gerek yok ama formatimizi bozmuyoruz.Tekram ProductModala donersek bir adet TextFiel birakiyoruz bunun label ini Product Name name ini name vs olarak duzenliyoruz.info stateine baslangic dergeri olarak inital state atiyoruz ve infomuzu backend nasil isterse oyle duzenlemis oluyoruz.Post istegini products olarak ayarliyoruz.

4- Mui den select elementi seciyoruz . Basic select bizim ornegimize uygun . Bunu ProductModal da box icine yapistiriyoruz. Importlari aliyoruz.Select deki value label kisimlarini duzenliyoruz.Select de hangi degerler olacaksa bunu MenuItem lara yazmamiz lazim.Tabi ne kadar gelecegini bilmedigimizden hardCode olarak yazamayiz bir dogu ile basmamiz lazim.Global stete den MenuItem deki value icine koymak uzere useSelector hook u ile state icindeki stockdan categories i seciyoruz.Categories i map ile gezerek value icine id yi atmak uzere item._id yaziyoruz.MenuItem lara key propunu veriyoruz.Input taki name i unuttugumuz icin hata verdi burada oraya name =categoruId verelim . 

5- Brand lar icin bir select element olusturyoruz. Ayni sekilde duzenliyoruz. 

6- Su anda Products sayfasinda bir sey olmamasi veya hata olmasi gibi durumlari ayarlayalim.Hata durumu ile basliyoruz.Error varmi yokmu onu cekmemiz lazim .Global state den error ve loading i destructure yapiyoruz.Mesajlarin hepsi icin ayri bir component aciyoruz.DataFetchMsg . Bunun icinde hata durumunu yazicaz. Bu component bir Typography return etsin . Bunu products da import ederek en asagida error varmi yokmu sarti ile ile ErrorMsg componentini bastiriyoruz yoksa ProductTable i yazdiriyoruz.Veri gelmeme durumu icin sartimizi products.length olarak ayarlayabiliriz.Bu durum da mui den bir veri yok mesaji alinabilir.Loading varsa durumuda mui skeleton dan cekilebilir

6- Products veri gelmeme gibi durumlari firms de de yapbiliriz.OLusturdugumuz kosullu durumlari firms e yapsitririz.Tabi oraya stateleri cekmek lazim.

************ 6. bolum ************
  purchase kismi odev olarak verilmisti.

1- error mesajinin birden fazla istek atilmasi yuzunden sifirlanmasi hatasini duzeltecegiz.PromiseAll kullaniyoruz.Purchase conditioan kismini duzenliyoruz.

2- Purchase kismina bir ekstra istek atma fonk yaziyoruz getProBurBranFirm adinda. useStockCalls da bunun icerigini yaziyoruz.Bir async fonksiyon bu.Burada axiosWithToken degil Promise.all cagiriyoruz onun icine axiosWithtoken yaziyoruz.axios icine de url leri sira ile yerlestiriyoruz.fetchStart ve fail urada kullanilabilir ama success kismini nasil yapacagiz. 4 unu birden guncellemek icin stockSlice da yeni bir succes fonksiyonu yaziyoruz . Bu fonksiyona payload olarak useStockCallsdan gerekli olanlari yolluyoruz.Payload lari state lere aktarariken dizi indiz numarasi kullanabiliriz

3- getProPurBranFirmSuccess fonksiyonunun basarili bir sekilde verilerin yollanmasi icin useStockCallsda data.data yapisina dikkat edelim.

4- Dashboard kismina baslayalim.Tremor kullancagiz.Components icine kpi componenti ve Chars compenenti acalim,Bunlari home da import edelim.

5-kpi da kpidata data adinda bir state olusturalim. rerturn kismini flex ile yapalim yani Stack i tercih edebiliriz.Mui den paper elemeni bunun icine yerlestirilebilir.Stacj icinde kpiData yi maple geziyrum ki ne kadar veri varsa o kadar paper bassin.Avatar icinde itemicindeki icon elementini basalim ayrica typography ler ile yazilari basabiliriz bunlar box icinde oluyor.
home icinde useEffect icinde useStockCalldan cagirdigimiz getStock methodunu cagiriyoruz.Kpi icinde  useSelector ile sales i cekiyoruz.Satislari manuel olarak gireriz.Toplam satis miktarini hesaplamak istiyoruz.cektigimiz sales verisi icinde amount olarak bu bilgi var zaten.Yani kpi icinde totalSales diye bir sey olusturursam buradan sales.reduce yaparsak amount toplamlarini bularak toplam satis rakamlarina ulasabiliriz.Buldugumuz totalSales kpi data ile kullanmak icin kpi data yi kpi fonksiyonunun icine koyuyorum. amount kisminin karsisina bactik ile bunu yerlestiriyoruz.Kpi icinde purchase i da cekmemiz lazim sales mantigi ile ayni olarak toplam bulup ilgili yere yerlestirelim.kar kismi ise en basit mantikla ikisinin farki olacak. ilgili yerde bunlarin farkini yaziyoruz . Boylelik le paper kismi tamamlanir.

6- Chart kismini yapalim tremor ve tailwind kurulumlarini yapalim index css de gerekli importlari yapalim.Istedigimiz charti tremordan kopyalayabiliriz.Gerekli duzenlemeleri yapalim . Veriyi burada nasil duzenleyecegiz ? Apiden bilgilerin gelmesi lazim. Charts icinde useSelector ile sales purchase i cekmemiz lazim. Grafik bizden nasil bir veri istiyor ona bakalim. Obje seklinde istiyoru. Sales icin salesdata adinda salesi map ile gezerek data price key lerini olusturan bir obje olusturalim.Bu kelerin value larini console dan bakarak nasil verecegimize karar veririz. Bunlari grafige nasil basacagiz ? Once date i tolocalDateString ile formatlayalim. categories icine  amount yazalim

7- Purchase icin sales de yaptiklarimizi kopyalariz gerekli duzenlemeleri yapariz.Gerekli stillendirmeleri yapalim
