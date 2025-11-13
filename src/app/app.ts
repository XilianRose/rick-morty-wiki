import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = 'Rick and Morty Wiki';

  constructor(private http: HttpClient) {}

}
