import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BriefIndexComponent } from './components/briefs/index/index.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'briefs', component: BriefIndexComponent }
];
