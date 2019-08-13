import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MessageService} from 'primeng/components/common/messageservice';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UploadComponent } from './upload/upload.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { LogAcessoComponent } from './log-acesso/log-acesso.component';
import { ListagemLogComponent } from './listagem-log/listagem-log.component';

import { NgxSpinnerModule } from "ngx-spinner";

import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {PaginatorModule} from 'primeng/paginator';
import {InputMaskModule} from 'primeng/inputmask';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ChartModule} from 'primeng/chart';
import {AccordionModule} from 'primeng/accordion';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    UploadComponent,
    MenuLateralComponent,
    LogAcessoComponent,
    ListagemLogComponent,
    DashboardComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FileUploadModule,
    TableModule,
    BrowserAnimationsModule,
    TooltipModule,
    MessagesModule,
    MessageModule,
    PaginatorModule,
    InputMaskModule,
    ChartModule,
    AccordionModule,
    NgxSpinnerModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
