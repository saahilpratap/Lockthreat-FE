import { PermissionCheckerService } from '@abp/auth/permission-checker.service';
import { AppSessionService } from '@shared/common/session/app-session.service';

import { Injectable } from '@angular/core';
import { AppMenu } from './app-menu';
import { AppMenuItem } from './app-menu-item';

@Injectable()
export class AppNavigationService {
  constructor(
    private _permissionCheckerService: PermissionCheckerService,
    private _appSessionService: AppSessionService
  ) {}

  getMenu(): AppMenu {
    return new AppMenu('MainMenu', 'MainMenu', [
      new AppMenuItem(
        'Dashboard',
        'Pages.Administration.Host.Dashboard',
        'flaticon-line-graph',
        '/app/admin/hostDashboard'
      ),

      new AppMenuItem(
        'Home',
        'Pages.Tenant.Dashboard',
        'flaticon-home-1',
        '',
        [],
        [
          new AppMenuItem(
            'Home Dashboard',
            '',
            'flaticon-map',
            '/app/main/home-dashboard'
          ),
          new AppMenuItem(
            'My Dashboard',
            '',
            'flaticon-map',
            '/app/main/home-dashboard'
          ),
        ]
      ),

      //new AppMenuItem('Home', 'Pages.Tenant.Dashboard', 'flaticon-line-graph', '/app/main/dashboard'),

      new AppMenuItem(
        'Organization',
        'Pages.Tenant.Dashboard',
        'flaticon-map',
        '',
        [],
        [
          new AppMenuItem(
            'Organization Dashboard',
            '',
            'flaticon-map',
            '/app/main/organization-dashboard'
          ),
          new AppMenuItem(
            'Organization Setup',
            '',
            'flaticon-map',
            '/app/admin/organization-setup'
          ),
          new AppMenuItem(
            'Business Management',
            '',
            'flaticon-map',
            '/app/main/business-management'
          ),
        ]
      ),
      new AppMenuItem(
        'Programs & Projects',
        '',
        'flaticon-graphic-1',
        '',
        [],
        [
          new AppMenuItem(
            'Project Management Dashboard',
            '',
            'flaticon-map',
            '/app/main/project-management-dashboard'
          ),
          new AppMenuItem('Project Dashboard', '', 'flaticon-map', ''),
          new AppMenuItem('All Projects', '', 'flaticon-map', ''),
        ]
      ),
      new AppMenuItem(
        'Asset Management',
        'Pages.Tenant.Dashboard',
        'flaticon-signs-1',
        '',
        [],
        [
          new AppMenuItem(
            'Asset Dashboard',
            '',
            'flaticon-map',
            '/app/main/asset-management'
          ),
          new AppMenuItem('Asset Risk', '', 'flaticon-map', ''),
        ]
      ),
      new AppMenuItem(
        'Enterprise Risk Manager',
        'Pages.Tenant.Dashboard',
        'flaticon-signs-1',
        '',
        [],
        [
          new AppMenuItem(
            'Risk Management Dashboard',
            '',
            'flaticon-map',
            '/app/main/risk-management-dashboard'
          ),
          new AppMenuItem(
            'Risk Management',
            '',
            'flaticon-map',
            '/app/main/risk-management'
          ),
          new AppMenuItem(
            'Risk Treatment Plans',
            '',
            'flaticon-map',
            '/app/main/risk-treatment-plans'
          ),
          new AppMenuItem(
            'Remediation Plans',
            '',
            'flaticon-map',
            '/app/main/remediation-plans'
          ),
        ]
      ),
      new AppMenuItem(
        'Policy & Awareness',
        '',
        'flaticon-clipboard',
        '',
        [],
        [
          new AppMenuItem(
            'Dashboard',
            '',
            'flaticon-map',
            '/app/main/policy-awareness-dashboard'
          ),
          new AppMenuItem('All Organization Policies', '', 'flaticon-map', '/app/main/all-organization-policies'),
        ]
      ),
      new AppMenuItem(
        'Compliance Manager',
        'Pages.Tenant.Dashboard',
        'flaticon-dashboard',
        '',
        [],
        [
          new AppMenuItem(
            'Compliance Management Dashboard',
            '',
            'flaticon-map',
            '/app/main/compliance-manager'
          ),
          new AppMenuItem('Organization Setup', '', 'flaticon-map', ''),
        ]
      ),
      new AppMenuItem(
        'Third Party Risk',
        'Pages.Tenant.Dashboard',
        'flaticon-network',
        '',
        [],
        [
          new AppMenuItem(
            'Third Party Dashboard',
            '',
            'flaticon-map',
            '/app/main/third-party-dashboard'
          ),
          new AppMenuItem(
            'All Vendors',
            '',
            'flaticon-map',
            '/app/main/all-vendors'
          ),
        ]
      ),
      new AppMenuItem(
        'Audit Management',
        '',
        'flaticon-signs-1',
        '',
        [],
        [
          new AppMenuItem(
            'Audit Management Dashboard',
            '',
            'flaticon-map',
            '/app/main/active-audits'
          ),
          new AppMenuItem('Audit Personal Dashboard', '', 'flaticon-map', ''),
        ]
      ),

      new AppMenuItem(
        'Incident Management',
        'Pages.Tenant.Dashboard',
        'flaticon-signs-1',
        '',
        [],
        [
          new AppMenuItem(
            'IM Dashboard',
            '',
            'flaticon-map',
            '/app/main/incident-management'
          ),
          new AppMenuItem(
            'Incident Management Dashboard',
            '',
            'flaticon-map',
            '/app/main/incident-management'
          ),
        ]
      ),

      new AppMenuItem(
        'IRM Operations',
        'Pages.Tenant.Dashboard',
        'fflaticon-interface-4',
        '',
        [],
        [
          new AppMenuItem(
            'Minutes of Meeting',
            '',
            'flaticon-map',
            '/app/main/minutes-meeting'
          ),
          //new AppMenuItem('Organization Setup', '', 'flaticon-map', '')
        ]
      ),

      new AppMenuItem(
        'Tenants',
        'Pages.Tenants',
        'flaticon-list-3',
        '/app/admin/tenants'
      ),
      new AppMenuItem(
        'Editions',
        'Pages.Editions',
        'flaticon-app',
        '/app/admin/editions'
      ),

      new AppMenuItem(
        'Administration',
        '',
        'flaticon-interface-8',
        '',
        [],
        [
          new AppMenuItem(
            'OrganizationUnits',
            'Pages.Administration.OrganizationUnits',
            'flaticon-map',
            '/app/admin/organization-units'
          ),
          new AppMenuItem(
            'Roles',
            'Pages.Administration.Roles',
            'flaticon-suitcase',
            '/app/admin/roles'
          ),
          new AppMenuItem(
            'Application Setting',
            '',
            'flaticon-suitcase',
            '/app/main/dynamicparameter-import'
          ),
          new AppMenuItem(
            'Users',
            'Pages.Administration.Users',
            'flaticon-users',
            '/app/admin/users'
          ),
          new AppMenuItem(
            'Languages',
            'Pages.Administration.Languages',
            'flaticon-tabs',
            '/app/admin/languages',
            ['/app/admin/languages/{name}/texts']
          ),
          new AppMenuItem(
            'AuditLogs',
            'Pages.Administration.AuditLogs',
            'flaticon-folder-1',
            '/app/admin/auditLogs'
          ),
          new AppMenuItem(
            'Maintenance',
            'Pages.Administration.Host.Maintenance',
            'flaticon-lock',
            '/app/admin/maintenance'
          ),
          new AppMenuItem(
            'Subscription',
            'Pages.Administration.Tenant.SubscriptionManagement',
            'flaticon-refresh',
            '/app/admin/subscription-management'
          ),
          new AppMenuItem(
            'VisualSettings',
            'Pages.Administration.UiCustomization',
            'flaticon-medical',
            '/app/admin/ui-customization'
          ),
          new AppMenuItem(
            'Settings',
            'Pages.Administration.Host.Settings',
            'flaticon-settings',
            '/app/admin/hostSettings'
          ),
          new AppMenuItem(
            'Settings',
            'Pages.Administration.Tenant.Settings',
            'flaticon-settings',
            '/app/admin/tenantSettings'
          ),
          new AppMenuItem(
            'WebhookSubscriptions',
            'Pages.Administration.WebhookSubscription',
            'flaticon2-world',
            '/app/admin/webhook-subscriptions'
          ),
          new AppMenuItem(
            'DynamicEntityParameters',
            '',
            'flaticon-interface-8',
            '',
            [],
            [
              new AppMenuItem(
                'DynamicParameter',
                'Pages.Administration.DynamicParameters',
                '',
                '/app/admin/dynamic-parameter'
              ),
              new AppMenuItem(
                'EntityDynamicParameter',
                'Pages.Administration.EntityDynamicParameters',
                '',
                '/app/admin/entity-dynamic-parameter'
              ),
            ]
          ),
        ]
      ),

      //new AppMenuItem('DemoUiComponents', 'Pages.DemoUiComponents', 'flaticon-shapes', '/app/admin/demo-ui-components')
    ]);
  }

  checkChildMenuItemPermission(menuItem): boolean {
    for (let i = 0; i < menuItem.items.length; i++) {
      let subMenuItem = menuItem.items[i];

      if (
        subMenuItem.permissionName === '' ||
        subMenuItem.permissionName === null ||
        (subMenuItem.permissionName &&
          this._permissionCheckerService.isGranted(subMenuItem.permissionName))
      ) {
        return true;
      } else if (subMenuItem.items && subMenuItem.items.length) {
        return this.checkChildMenuItemPermission(subMenuItem);
      }
    }

    return false;
  }

  showMenuItem(menuItem: AppMenuItem): boolean {
    if (
      menuItem.permissionName ===
        'Pages.Administration.Tenant.SubscriptionManagement' &&
      this._appSessionService.tenant &&
      !this._appSessionService.tenant.edition
    ) {
      return false;
    }

    let hideMenuItem = false;

    if (menuItem.requiresAuthentication && !this._appSessionService.user) {
      hideMenuItem = true;
    }

    if (
      menuItem.permissionName &&
      !this._permissionCheckerService.isGranted(menuItem.permissionName)
    ) {
      hideMenuItem = true;
    }

    if (
      this._appSessionService.tenant ||
      !abp.multiTenancy.ignoreFeatureCheckForHostUsers
    ) {
      if (
        menuItem.hasFeatureDependency() &&
        !menuItem.featureDependencySatisfied()
      ) {
        hideMenuItem = true;
      }
    }

    if (!hideMenuItem && menuItem.items && menuItem.items.length) {
      return this.checkChildMenuItemPermission(menuItem);
    }

    return !hideMenuItem;
  }

  /**
   * Returns all menu items recursively
   */
  getAllMenuItems(): AppMenuItem[] {
    let menu = this.getMenu();
    let allMenuItems: AppMenuItem[] = [];
    menu.items.forEach((menuItem) => {
      allMenuItems = allMenuItems.concat(
        this.getAllMenuItemsRecursive(menuItem)
      );
    });

    return allMenuItems;
  }

  private getAllMenuItemsRecursive(menuItem: AppMenuItem): AppMenuItem[] {
    if (!menuItem.items) {
      return [menuItem];
    }

    let menuItems = [menuItem];
    menuItem.items.forEach((subMenu) => {
      menuItems = menuItems.concat(this.getAllMenuItemsRecursive(subMenu));
    });

    return menuItems;
  }
}
