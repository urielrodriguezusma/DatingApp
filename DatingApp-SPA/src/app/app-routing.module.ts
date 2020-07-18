import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from './guards/auth.guard';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './resolvers/member-detail.service';
import { MemberListResolver } from './resolvers/member-list.service';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './resolvers/member-edit.service';
import { PreventUnsaveChangesGuard } from './guards/prevent-unsave-changes.guard';
import { ListResolver } from './resolvers/list.service';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MemberListComponent, resolve: { users: MemberListResolver } },
      { path: 'members/:id', component: MemberDetailComponent, resolve: { user: MemberDetailResolver } },
      {
        path: 'member/edit', component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [PreventUnsaveChangesGuard]
      },
      { path: 'messages', component: MessagesComponent },
      { path: 'lists', component: ListComponent, resolve: { users: ListResolver } },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
