import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

export const routes: Routes = [  
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  }, 
  {
    path: 'registro',
    loadComponent: () => import('./components/registro/registro.component').then((m) => m.RegistroComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'cosasLindas',
    loadComponent: () => import('./components/cosas-lindas/cosas-lindas.component').then((m) => m.CosasLindasComponent),
  },
  {
    path: 'cosasFeas',
    loadComponent: () => import('./components/cosas-feas/cosas-feas.component').then((m) => m.CosasFeasComponent),
  },
  {
    path: 'listaLindas',
    loadComponent: () => import('./components/lista-lindas/lista-lindas.component').then((m) => m.ListaLindasComponent),
  },
  {
    path: 'listaFeas',
    loadComponent: () => import('./components/lista-feas/lista-feas.component').then((m) => m.ListaFeasComponent),
  },
  {
    path: 'grafico-torta',
    loadComponent: () => import('./components/graficos-torta/graficos-torta.component').then( m => m.GraficosTortaComponent)
  },
  {
    path: 'grafico-barras',
    loadComponent: () => import('./components/graficos-barras/graficos-barras.component').then( m => m.GraficosBarrasComponent)
  },
  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.page').then( m => m.SplashPage)
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'error',
    loadComponent: () => import('./components/error/error.component').then((m) => m.ErrorComponent),
  },
  {
    path: '**',
    redirectTo: '/error'
  },
];
