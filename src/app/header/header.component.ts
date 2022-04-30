import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  subscription: Subscription;
  isAuthenticated = false;
 
  constructor(private storageServ: DataStorageService, private authServ: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.authServ.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSaveRecipes() {
    this.storageServ.storeRecipes()
  }

  onFetchRecipes() {
    this.storageServ.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authServ.logout();
  }

}
