import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { ProductBoard } from './features/products/product-board/product-board';
import { Home } from './shared/components/home/home';
import { AboutUs } from './shared/components/about-us/about-us';
import { Register } from './shared/components/register/register';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Header, Footer, ProductBoard, AboutUs],
  imports: [RouterOutlet, Home, Header, Footer, ProductBoard, AboutUs, Login, Register,ProductCreate],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'home-features';
}
