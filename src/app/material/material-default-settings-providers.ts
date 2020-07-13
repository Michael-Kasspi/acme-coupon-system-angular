import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {MAT_AUTOCOMPLETE_DEFAULT_OPTIONS} from '@angular/material/autocomplete';


export const materialDefaultSettingsProviders = [
    {
        provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue:
            {duration: 3000, horizontalPosition: 'left'}
    },
    {
        provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, useValue:
            {autoActiveFirstOption: true}
    }
];
