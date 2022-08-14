import {NgModule} from '@angular/core';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenubarModule} from 'primeng/menubar';
import {TabViewModule} from 'primeng/tabview';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DividerModule} from 'primeng/divider';
import {PasswordModule} from 'primeng/password';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {SidebarModule} from 'primeng/sidebar';


import {MenuItem} from 'primeng/api';

@NgModule({
    exports: [
        MegaMenuModule,
        MenubarModule,
        TabViewModule,
        ButtonModule,
        CardModule,
        VirtualScrollerModule,
        TableModule,
        DialogModule,
        InputTextModule,
        InputTextareaModule,
        CheckboxModule,
        RadioButtonModule,
        DropdownModule,
        MultiSelectModule,
        ProgressSpinnerModule,
        ToggleButtonModule,
        InputSwitchModule,
        DividerModule,
        PasswordModule,
        AutoCompleteModule,
        SidebarModule
    ]
})

export class primengModule { }