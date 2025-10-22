import { Routes } from '@angular/router';

import { Home } from './components/pages/home/home';
import { Characters } from './components/pages/characters/characters';
import { Episodes } from './components/pages/episodes/episodes';
import { Locations } from './components/pages/locations/locations';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Home  
    },
    {
        path: 'characters',
        component: Characters
    },
    {
        path: 'episodes',
        component: Episodes
    },
    {
        path: 'locations',
        component: Locations
    },
];
