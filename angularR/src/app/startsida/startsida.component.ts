import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-startsida',
  standalone: true,
  imports: [],
  templateUrl: './startsida.component.html',
  styleUrl: './startsida.component.css'
})
export class StartsidaComponent {

 name: string | null = null;

arHenInloggad: boolean = false; 


  constructor(private auth: AuthService) {
  this.name; "";

  this.auth.inloggad.subscribe((inloggad: boolean) => {
  this.arHenInloggad = inloggad;
})

  }

  ngOnInit(): void {
    // Hämta namnet från local storage
    this.name = window.localStorage.getItem('name');
    if (this.name){
    this.name = this.name.toUpperCase();
    }

    console.log(this.name)

}


}
