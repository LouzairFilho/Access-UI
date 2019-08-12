import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { ListagemLogComponent } from './listagem-log/listagem-log.component';
import { LogAcessoComponent } from './log-acesso/log-acesso.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:'', component: DashboardComponent },
  {path:'upload-file', component: UploadComponent },
  {path:'listagem-log', component: ListagemLogComponent },
  {path:'cadastro-log', component: LogAcessoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
