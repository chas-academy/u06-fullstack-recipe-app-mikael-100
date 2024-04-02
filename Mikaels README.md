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


2. FormGroup Register

För att kunna skicka form till backend så implementerade jag FormsModule, CommonModule, ReactiveFormsModule i register.components.ts sedan så fick jag göra en NEW formGroup som heter form och binda varje nyckel till ett värde från formuläret. 

![alt text](<Mikael README BILDER/image.png>)

Efter det så jag jag in i min html och deklarerade namet på min formgroup i formuläret och satte en submit på den. När jag trycker på skicka så binds alla värden i formen till form och funktionen register() triggas.

![alt text](<Mikael README BILDER/image2.png>)

på varje input i formuläret satte jag matchade ```formControlName="name"``` ```formControlName="email"``` för att värderna ska bindas i min formgroup.

min funktion register() skickar sedan detta form vidare detta form och triggar registerUser() som finns i auth.service.

registerUser i auth.service har med formets värden och gör sedan en postrequest till laravel och triggar controllern och roputen register som i sin tur lägger in användaren i databasen.

Jag lade även in ```FormControl('', [Validators.required])``` på alla rader för att göra en försäkring att användaren fyller i alla fällt.


3. BehaviorSubject

För att lösa AuthGuard så gjorde jag en behaviorSubject av inloggad. BehaviorSubject funkar så att jag kan sätta ett defoultvärde på variabel som i detta fallet är en boolean som i default är false. Jag gjorde sedan så att jag satte in next i login ```this.inloggad.next(true);``` Next fungerar så att den uppdaterar behaviorSubject värde och alla som subscribar på den. När någon loggar in så kommer värdet på BS att bli true. Föra att få in detta värde till min AuthGuard så var jag tvungen att injecta inloggad. Sedan så satte jag denna variabel på returnen på authGuard som då kommer retunera true eller false ```  return inject(AuthService).inloggad.getValue()```
Genom att sedan sätta en next på logout som ger värdet false till BS så kommer authGuarden att uppdateras med det värdet när man loggar ut med.




4. Searchbar

Det jag började med att göra var att utåka min searchbar och ta in 3 olika dropbdown menyer för att kunna välja mellan Mål, Diet och allergi. Detta gjorde jag med att ta in select tagg som jag har massa options innuti. Jag gjorde en översta option i vardera select till ```select disabled``` för att kunna ha en rubrik för vardera dropdown. Jag lade sedan searchbar och dessa 3 select i ett gemensamt form och satte ```(submit)="submitForm()"````på formen. I detta form så uteslöt jag formGroup och använde istället mig av ngModel. Genom att använda ngModel så använder jag mig av tvåvägsbindning så när man skriver ett ord i inputens sökfält så kommer den stringen att knytas till ngModel filter.query så värdet av denna blir ordet som skrivs in.

Jag var också tvvungen att importera FormModule i Imports för att kunna använda ngModule i app.component.ts.


![alt text](<Mikael README BILDER/image3.png>)

När det kommer till dropdown så satte jag ngModel i select och genom att man väljer något option i dropdownen så kommer filter.mealtype att bli knytas till det value som vals.


![alt text](<Mikael README BILDER/image4.png>)


i min app.component.ts så började jag med att importera interfacet som jag gjort som heter filter. Efter det så skapade jag en funktion som heter submitform() som även finns på mitt form ```(submit)="submitForm()"``` jag använde submit för att det inte finns en knapp att clicka på utan att formen skall triggas när användaren trycker på enter.

Det första som händer i min submitForm är att jag använder this för att stega in till getRecepice funktionen i RecepeService.ts. För att kunna komma åt funktionerna i denna har jag genom dependensiinjection altså genom konstructorn tagit in RecepiService till app.component. Tack vare detta kan jag stega mig fram till  dennas funktioner.

Dependesiinjection: För att komma år RecipeService funktioner

![alt text](<Mikael README BILDER/image6.png>)


Med hjälp av this.recipe.getRecipes() kan jag stega mig in till denna service funktioner.

![alt text](<Mikael README BILDER/image5.png>)

i get recepis så tar jag nu och tar in bindningen som jag gjort med ngmodule i min app.component.html genom att använda ```this.filter.query``` jag gör detta på alla variabler jag vill skicka iväg in i den funktionen. efter detta så gör jag en subscribe på resultatet av denna http förfrågan så att jag kan logga ut detta resultat som en any array för att se vad resultatet blev i console.

Nu över till min recepi.service.ts fil. Här finns getRecipes som nu tar in alla mina parametrar jag skickat och sedan bestämmer jag typen på dessa till string och sedan att de som kommer in ska vara en observeble med en any array. 

Dollar tecknet heter templete literals och kallas även templete strings Och används i min kod för att skapa en URL sträng av värdet från mina variabler. Så ngModule band ju värdet som matades in eller valdes och band de till mealtype, query, diet osv nu tar jag dessa inkommande variabler och med hjälp av templete literals in dom på respektiveplats för att de tillsammans ska skapa en url som jag kan anropa API:et med. Basurl och app_key är deffinerade ovan. basen är de första i strängen och app_key behövs för att indentifiera att jag som ägare av API:et får en validerad sökning.

![alt text](<Mikael README BILDER/image8.png>)


I ut med att denna funktion för sökresultatet ligger i app komponenten som är konstant så kan jag inte göra en ngOnDestroy och göra en un subscribe på denna subscription.



5. Register

För att direigera visare användaren till login efter den har regisrerat sig som användare och den begäran har gått igenom så använde jag mig av klassen Router.
För att kunna använda mig av denna i auth.service så var jag tvungen att injecsera denna i construktorn i auth.service.

![alt text](<Mikael README BILDER/image9.png>)

efter att jag tagin in den classen så lade jag in denna funktion i min registerUser.

![alt text](<Mikael README BILDER/image10.png>)

Jag använde mig även av denna för att dirigera vidare användaren från login.




6. Single Recipe

I min app.component så lade jag in en click funktion som heter ```recipeCardSingle(recipes.id)``` denna funktion har redipe.id inom sig. I ut med att den ligger inom en a tagg som i sig ligger inom en for loop som när api hittar reciept efter sökning kommer varje knapp och a tagg att ha recept id i sig när man klickar på denna funktion.

I min app komponent finns denna funktion som är kopplad till klicket. Denna funktion tar in id som ett nummer sedan så stegar den sig men hjälp av this in i recipe service och triggar getRecipiesInfo och sätter in id i den funktionen och gör om det till string. Jag har sedan en subscribe på denna funktion för att kunna se resultatet och kunna göra en console log på det för att se om det fungerar. 


![alt text](<Mikael README BILDER/image11.png>)


<!-- TO DO -->

gör om din mall av recipe till en interface som du tar in

gör även interface av:

Form

Recipe