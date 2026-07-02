import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

    @Input() collapsed = false;
    @Output() toggleCollapse = new EventEmitter<void>();

    private auth = inject(AuthService);
    private router = inject(Router);

    menus = [
        {
            icon: 'groups',
            title: 'Staff',
            link: '/employees'
        },
    ];

    toggle(): void {
        this.toggleCollapse.emit();
    }

    logout(): void {
        this.auth.logout();
        this.router.navigate(['/login']);
    }
}
