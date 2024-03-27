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



<!-- TO DO -->

gör om din mall av recipe till en interface som du tar in

gör även interface av:

Form

Recipe