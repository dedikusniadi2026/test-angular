import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports:[
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatMenuModule,
        MatDividerModule
    ],

    templateUrl:'./topbar.component.html',
    styleUrl:'./topbar.component.scss'
})
export class TopbarComponent{
    private auth = inject(AuthService);
    private router = inject(Router);

    @Output() toggleDrawer = new EventEmitter<void>();

    toggleDrawerClick(): void {
        this.toggleDrawer.emit();
    }

    currentDate = new Date();
    dayName = this.getDayName(this.currentDate.getDay());
    dateStr = this.formatDate(this.currentDate);

    username = this.auth.getUsername() ?? 'User';

    logout(): void {
        this.auth.logout();
        this.router.navigate(['/login']);
    }

    private getDayName(day: number): string {
        const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        return days[day];
    }

    private formatDate(date: Date): string {
        const months = [
            'January','February','March','April','May','June',
            'July','August','September','October','November','December'
        ];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }
}

