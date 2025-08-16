import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { ProductBoard } from './features/products/product-board/product-board';
import { Home } from './features/home/home';
import { AboutUs } from './features/about-us/about-us';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { ProductCreate } from './features/products/product-create/product-create';
import { NotFound } from './shared/components/not-found/not-found';
import { ErrorNotification } from './shared/components/error-notification/error-notification';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Header, Footer, ProductBoard, AboutUs, Login, Register, ProductCreate, NotFound, ErrorNotification],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'home-features';
}
