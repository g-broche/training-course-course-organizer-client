import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BriefIndexComponent } from './components/briefs/index/index.component';
import { BriefDetailsComponent } from './components/briefs/details/details.component';
import { LegalMentionsComponent } from './pages/legal-mentions/legal-mentions.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'briefs/:id', component: BriefDetailsComponent },
    { path: 'briefs', component: BriefIndexComponent },
    { path: 'legal-mentions', component: LegalMentionsComponent }
];
