Intro

Det första som kommer hända när du kommer till denna sida är att du kommer till välkomssidan. För att kunna göra något på sidan måste du registrera dig som användare och sedan logga in. När du har loggat in kan du gå till ```Sök Recept``` för att kunna få tillgång till searchbaren och kunna söka efter recept. Nör du har skrivit ett sökord och gjort andra val måste du trycka ENTER för att trigga sökningen.

bakgrund

För att veta hur många komponenter jag skulle behöva göra och få ett grepp runt projektet så satte jag mig ner och kollade på sidor där man kunde söka recept. Jag fastnade vid Ica.s och bestämde mig för att utforma min app åt det hållet. Jag började då att göra en simpel Figma för att få koll på vad som behövde skapas. Första veckan av detta projekt satte jag mig ner och gjorde componenterna som skulle behövas enligt figman och gjorde även en grund styling på dessa som gick efter Ica:s färgsättning och styling.

Figma:

https://www.figma.com/file/DU6MjNofPbyV33kRecPxyj/u06?type=design&node-id=0-1&mode=design&t=pxx7v065xVUE95j7-0



Kod Dokumentation:

Nedan så följer dokumentation för min kod. Jag tyckte att det såg väldigt plottrigt ut att ha denna dokumentation i min kod så jag valde att markera upp med nummer och rubrik i koden och gjorde sedan själva förklaringen av koden i detta dokument med bilder (Prisa Tearihandboken ;).





1. Hamburgermenu

För att hamburgermenu så tog jag inspiration av förra uppgiften då jag såg att breeze hade två plika ul listor. En för navbaren med sidorna och en annan för hamburger menu. Jag gjorde så att jag hidade dom länkarna som var uppe i navbaren i mobil läge och valde då istället att visa min andra ul lista som då är vertikal. Jag använde mig sedan av ngClass för att ngClass för att göra trigga cssklasser på diven som ul listan ligger i. ```[ngClass]="{ 'hidden': !menuValue}" [class.mobile_menu]="menuValue"``` denna syftar till att om värdet menuValue är false kommer listan inte att synas. i min app.ts komponent är en variabel satt till boolean false ```menuValue: boolean = false;``` vilket gör att variabeln i default läge är false och listan kommer inte synas. Jag gjorden en funktion:

 <!-- openMenu(){
  this.menuValue = !this.menuValue;
  console.log('Menu value:', this.menuValue);
} -->

denna funktion är sedan kopplas på bilden till hamburger menu med click som gör att när man klickar på bilden så kommer hamburgermenu att visa sig.

<!-- <img class="w-12 text-3xl cursor-pointer md:hidden" src="../assets/bilder/menu-outline.svg" alt="hamburger"
          (click)="openMenu()"> -->

För att sedan få bort menu när man klickas på rätt sida så la jag även ```openMenu()``` på varje länk i hamburgemenu så add den triggar funktionen och sätter variabeln till false så att menu försvinner när man väljer sida.

Jag fick problem med att ul listan i navbaren syntes i mobil läge så jag fick lägga till ```hidden md:block``` För att helt dölja navbaren i mobiltläge. Denna kod i tailwind gör så att i md storlek och uppåt syns navbaren och länkarna med i allt under md så är den hidden och dåld i vyn.


2. FormGroup Register / Registrera

För att kunna skicka form till backend så implementerade jag FormsModule, CommonModule, ReactiveFormsModule i register.components.ts sedan så fick jag göra en NEW formGroup som heter form och binda varje nyckel till ett värde från formuläret. 

![alt text](<Mikael README BILDER/image.png>)

Efter det så jag jag in i min html och deklarerade namet på min formgroup i formuläret och satte en submit på den. När jag trycker på skicka så binds alla värden i formen till form och funktionen register() triggas.

![alt text](<Mikael README BILDER/image2.png>)

på varje input i formuläret satte jag matchade ```formControlName="name"``` ```formControlName="email"``` för att värderna ska bindas i min formgroup.

min funktion register() skickar sedan detta form vidare detta form och triggar registerUser() som finns i auth.service.

registerUser i auth.service har med formets värden och gör sedan en postrequest till laravel och triggar controllern och roputen register som i sin tur lägger in användaren i databasen.

Jag lade även in ```FormControl('', [Validators.required])``` på alla rader för att göra en försäkring att användaren fyller i alla fällt.


3. BehaviorSubject

För att lösa AuthGuard så gjorde jag en behaviorSubject av inloggad. 

![alt text](<Mikael README BILDER/image22.png>)

BehaviorSubject funkar så att jag kan sätta ett defoultvärde på variabel som i detta fallet är en boolean som i default är false. Jag gjorde sedan så att jag satte in next i login ```this.inloggad.next(true);``` 


![alt text](<Mikael README BILDER/image23.png>)


Next fungerar så att den uppdaterar behaviorSubject värde och alla som subscribar på den. När någon loggar in så kommer värdet på BS att bli true. Föra att få in detta värde till min AuthGuard så var jag tvungen att injecta inloggad. 
Sedan så satte jag denna variabel på returnen på authGuard som då kommer retunera true eller false ```  return inject(AuthService).inloggad.getValue()```


![alt text](<Mikael README BILDER/image24.png>)
Genom att sedan sätta en next på logout som ger värdet false till BS så kommer authGuarden att uppdateras med det värdet när man loggar ut med.




4. Searchbar

Det jag började med att göra var att utöka min searchbar och ta in 3 olika dropbdown menyer för att kunna välja mellan Mål, Diet och allergi. Detta gjorde jag med att ta in select tagg som jag har massa options innuti. Jag gjorde en översta option i vardera select till ```select disabled``` för att kunna ha en rubrik för vardera dropdown. Jag lade sedan searchbar och dessa 3 select i ett gemensamt form och satte ```(submit)="submitForm()"````på formen. I detta form så uteslöt jag formGroup och använde istället mig av ngModel. Genom att använda ngModel så använder jag mig av tvåvägsbindning så när man skriver ett ord i inputens sökfält så kommer den stringen att knytas till ngModel filter.query så värdet av denna blir ordet som skrivs in.

Jag var också tvvungen att importera FormModule i Imports för att kunna använda ngModule i app.component.ts.


![alt text](<Mikael README BILDER/image3.png>)

När det kommer till dropdown så satte jag ngModel i select och genom att man väljer något option i dropdownen så kommer filter.mealtype att bli knytas till det value som vals.


![alt text](<Mikael README BILDER/image4.png>)


i min recipe-card.component.ts så började jag med att importera interfacet som jag gjort som heter filter. Efter det så skapade jag en funktion som heter submitform() som även finns på mitt form ```(submit)="submitForm()"``` jag använde submit för att det inte finns en knapp att clicka på utan att formen skall triggas när användaren trycker på enter.

Det första som händer i min submitForm är att jag använder this för att stega in till getRecepice funktionen i RecepeService.ts. För att kunna komma åt funktionerna i denna har jag genom dependensiinjection altså genom konstructorn tagit in RecepiService till app.component. Tack vare detta kan jag stega mig fram till  dennas funktioner.

Dependesiinjection: För att komma år RecipeService funktioner

![alt text](<Mikael README BILDER/image6.png>)


Med hjälp av this.recipe.getRecipes() kan jag stega mig in till denna service funktioner.

![alt text](<Mikael README BILDER/image5.png>)

För att säkerställa typerna för min förfrågan till api har jag importerat ett interface som heter filter. Detta interface har alla sökparametrar och bestämda typer för dom. Detta säkerställer förfrågan till apiet. 

i get recepis så tar jag nu och tar in bindningen som jag gjort med ngmodule i min app.component.html genom att använda ```this.filter.query``` jag gör detta på alla variabler. Genom att skriva ```[(ngModel)]="filter.query"``` 
i min html binder jag de användaren skriver in till interfacer filter i min ts fil. När jag sedan vill skicka iväg dessa värden i submitform använder jag mig av ````this.filter.query``` som då syftar till värdet i htmlet som har skrivits in och bundits till the interfacet ```this.filter.query``` vars typ är bestämd i interfacet som jag vill skicka med i submitform

![alt text](<Mikael README BILDER/image12.png>)


 efter detta så gör jag en subscribe på resultatet av denna http förfrågan så att jag kan logga ut detta resultat som en any array för att se vad resultatet blev i console.



Nu över till min recepi.service.ts fil. Här finns getRecipes som nu tar in alla mina parametrar jag skickat och sedan bestämmer jag typen på dessa till string och sedan att de som kommer in ska vara en observeble med en any array. 

Dollar tecknet heter templete literals och kallas även templete strings Och används i min kod för att skapa en URL sträng av värdet från mina variabler. Så ngModule band ju värdet som matades in eller valdes och band de till mealtype, query, diet osv nu tar jag dessa inkommande variabler och med hjälp av templete literals in dom på respektiveplats för att de tillsammans ska skapa en url som jag kan anropa API:et med. Basurl och app_key är deffinerade ovan. basen är de första i strängen och app_key behövs för att indentifiera att jag som ägare av API:et får en validerad sökning.

![alt text](<Mikael README BILDER/image8.png>)





5. Register

För att dirrigera användaren till login efter den har regisrerat sig som användare och den begäran har gått igenom så använde jag mig av klassen Router.
För att kunna använda mig av denna i auth.service så var jag tvungen att injecsera denna i construktorn i auth.service.

![alt text](<Mikael README BILDER/image9.png>)

efter att jag tagin in den classen så lade jag in denna funktion i min registerUser.

![alt text](<Mikael README BILDER/image10.png>)

Jag använde mig även av denna för att dirrigera vidare användaren till login.






6. Single Recipe

I min recipe-card.component så lade jag in en click funktion som heter ```recipeCardSingle(recipes.id)``` denna funktion har recipes.id inom sig. I ut med att den ligger inom en a tagg som i sig ligger inom en for loop som när api hittar reciept efter sökning kommer varje knapp och a tagg att ha recept id i sig när man klickar på denna funktion.

I min recipe-card.component.ts finns denna funktion som är kopplad till klicket som heter ```recipeCardSingle()``` denna funktion tar in id som typ numer och har defenitionen viod för att den inte returnerar något värde. i denna funktion använder jag mig av Router classen som jag har injeserat i construktorn. Jag använder mig av denna för att kunna byta sida när en användare triggar funktionen och skickar med id från receptet till routen.

För att kunna fånga upp id var jag tvungen att använda mig av ActivatedRoute som jag injeserade i construktorn sedan använde jag mig av snapshot och paramMap och get för att fånga upp värdet av parameter id som skickas i url:en ```this.route.snapshot.paramMap.get('id');``` 

Jag gör en if check på idFranRecipeComponent och kontrollerar så den inte är null. Detta gör jag för att undvika felaktiheter i koden om värdet skulle vara null. efter det så har jag en console.log som visar stringen för att kontrollera så något värde kommer med och så jag kunde så vad det var. Jag injeserad recipeservice i konstruktor och stegar sedan in i recipeservice med hjälp av this.recipe och sedan till funktionen ```getRecipesInfo(idFranRecipeComponent).subscribe((resultatFranApi))``` i den funktionen sätter jag sedan in variabel jag fångat upp skickar in den i den funktionen som är ett API anrop i recipe.service.ts jag subscribar på resultatet från denna funktion och console loggar ut det. När jag fått resultatet så använde jag mig at arrayen recipes genom att skriva this.recepis och sedan lägga in resultatet i den som en array. Jag gjorde efter de en console logg för att se hela resultatet.

Arrayen deffineras i början av koden som ```recipes: any[];``` för att den ska kunna innehålla olika värden. Den läggs sedan in i construktorn för att initialiseras när komponenten skapas för att säkerställa att komponenten hittar arrayen.


![alt text](<Mikael README BILDER/image13.png>)




7. Gömma Länkar i Navbar och Hamburgermenu

Jag gjorde tidigare en behavior subject i auth.service som jag nu valde att subscriba på i app component. För att kunna göra detta så injecerade jag AuthService i construktorn och sedan så använde jag mig utav this för att komma åt authservice och sedan variabeln inloggas och subscriba på den. Efter det så knyter jag inloggad som är en boolean till this.arHenInLoggad. Denna variabel är deklarerad ovanför construktorn som i default är false.

Efter detta så använder jag mig av ```@for(arHenInLoggad){}``` i min html och använder ett utroppstecken om det är false och personen inte är inloggad ```@for(!arHenInLoggad){}``` och då betyder det att dessa inte visas för användaren. Jag sätter de andra värdena i navbar och menu utan utropstecken när användaren är inloggad och då kan du se länkarna.


8. InnerHTML

När jag skulle displaya Summary från Arrayen som kom från API som kom texten med html taggar som detta  ```<b>gluten free</b> recipe you've been looking for. This hor d'oeuvre has <b>121 calories</b>, <b>19g of protein</b>``` 
när jag försökte displaya texten på detta sätt ```{{recipeCardSingleInterface.summary}}```

För att kunna displaya texten på rätt sätt och att html taggarna ska fungera så var jag tvungen att göra det på detta sättet ```<div [innerHTML]="recipeCardSingleInterface.summary"></div>``` 








9. Inloggad User

Jag började med att gå in i auth.service och lägga till name i localstorage på loginUser funktionen där. Detta kommer göra att name också hamnar i loclastorage precis som token.

![alt text](<Mikael README BILDER/image17.png>)

Sedan så gick jag till min startsida.component.ts och skapade en variabel name som har typen string eller null. Jag satte även in denna variabel i constructorn.

efter de så skapade jag en funktion som på ngOnInit altså när komponenten skapas hämtar name från localstorage och sedan gör om den till stora bokstäver och sparar den i variabel name.

![alt text](<Mikael README BILDER/image18.png>)

jag injectade sedan Authservice i min konstruktor och gjorde en subscrivtion på inloggad om knöt det värdet till arHenInloggad. Jag tog även och satte in denna variabel över constructorn med defaultvärde false.

![alt text](<Mikael README BILDER/image19.png>)

Jag gick nu över till min startsida html fil och gjorde en @if där jag satte in arhenInloggad och satte name inom måsvingar. Så när användaren loggar in så kommer denna visas med namet från localstorage.

![alt text](<Mikael README BILDER/image20.png>)




10. Login

För att binda datan man skriver in på email och lösenord i html i login.component använde jag mig av formGroup som jag satte i form taggen och döpte denna till loginForm.

![alt text](<Mikael README BILDER/image14.png>)

Sedan använde jag mig av formControlName på inputsen i email och lösenord. Detta kommer göra att det värdet som skrivs in i dessa kommer bindas till ```formControlName="password"``` password och login.

![alt text](<Mikael README BILDER/image15.png>)

För att sedan få dessa värden till min ts fil var jag tvungen att skapa en ``` new FormGroup``` som har namnet loginForm. Namnet på formgrupen i min html som där heter loginForm måste matcha namnet på new FormGroup som jag har i min ts fil för att de ska bindas. Efter de så skrivar jag email och password och sedan new formcontrol och ger även dessa validatorn för att säkra att användaren skriver in data och vilken typ av data.

![alt text](<Mikael README BILDER/image16.png>)

I min login.component.ts så använder jag mig av mitt imporetade interface av loginDetail för att sätta typ på loginform email och password och sedan så stegar jag in med this. i mit injecerade Authservice för att kunna skicka this.loginDetails till funktionen loginUser.


11. Logout

Jag började med att sätta en funktion på logga ut knappen i navbar och hamburgermenu som heter logout() när användaren klickar på denna så triggar denna funktion som ligger i ts filen funktionen i AuthService.

![alt text](<Mikael README BILDER/image21.png>)

I auth service så hämtas token från localstorage och binds till token. Eftder det så skickas enapi request till  base url plus en logout som triggar constrollern i laravel och användaren loggas ut.

