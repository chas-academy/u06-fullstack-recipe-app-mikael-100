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

