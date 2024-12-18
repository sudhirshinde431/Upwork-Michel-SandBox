import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "my-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent {
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);

  isLoggedIn() {   
    if(globalThis.LoginUserPrincipalName==undefined || globalThis.LoginUserPrincipalName==null)
    {
      return false;
    }
    else{
      return true;
    }
  }
}
