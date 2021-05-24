import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/tab2.module').then(m => m.Tab2PageModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule) },
  { path: 'map', loadChildren: () => import('./map/map.module').then(m => m.MapPageModule) },
  { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchPageModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule) },
  { path: 'partners', loadChildren: () => import('./partners/mytravels.module').then(m => m.MytravelsPageModule) },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule) },
  { path: 'newtravel', loadChildren: () => import('./newtravel/newtravel.module').then(m => m.NewtravelPageModule) },
  { path: 'journal', loadChildren: () => import('./journal/journal.module').then(m => m.JournalPageModule) },
  { path: 'pasttravels', loadChildren: () => import('./pasttravels/pasttravels.module').then(m => m.PasttravelsPageModule) },
  { path: 'password', loadChildren: () => import('./password/password.module').then(m => m.PasswordPageModule) },
  { path: 'location', loadChildren: () => import('./location/location.module').then(m => m.LocationPageModule) },
  { path: 'camera', loadChildren: () => import('./camera/camera.module').then( m => m.CameraPageModule) },
  { path: 'tabs', loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule) },  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then( m => m.LogoutPageModule)
  }




];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
