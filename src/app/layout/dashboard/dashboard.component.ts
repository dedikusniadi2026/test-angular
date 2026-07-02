import { Component, HostListener } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, SidebarComponent, TopbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isMobile = window.innerWidth < 768;
  sidebarOpen = !this.isMobile;
  sidebarCollapsed = false;

  @HostListener('window:resize')
  onResize(): void {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.sidebarOpen = false;
    } else {
      this.sidebarOpen = true;
    }
  }

  get sidenavMode(): 'side' | 'over' {
    return this.isMobile ? 'over' : 'side';
  }

  get effectiveMargin(): string {
    if (this.isMobile) return '0';
    return this.sidebarCollapsed ? 'var(--sidebar-mini-w)' : 'var(--sidebar-w)';
  }

  onToggleSidebar(): void {
    if (this.isMobile) {
      this.sidebarOpen = !this.sidebarOpen;
    } else {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    }
  }
}
