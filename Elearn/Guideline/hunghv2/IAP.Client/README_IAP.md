# IAP

##Generate Directive
run `ng generate directive (directive-name) --no-flat --module=(module-name) --skip-import`

#Note: 
`ng generate directive` - required.
`--no-flat` - optional: create folder named (directive-name).
`--module=(module-name)` - optional: specific module to import.
`--skip-import` - optional: skip import declaration into module.


##Generate Module
run `ng generate module (module-name) --flat`

################# IAP Build-in Component ##################
`iap-box`: create a generic box with box-shadow and some setting:
    - Classes: 
        + `top-bordered | left-bordered`: set border.
        + `thin`: make border smaller (2px width). Default: 5px width.
        + `primary | violet | gold`: Set color of border. Default: primary (#00A19C).


################# IAP Build-in Dỉrective ##################
`iapToggleMenuPopup`: show/hide the target popup when clicked.
    - Input: 
        + `targetSelector`: selector of Popup.
        + `animation`: `up|down` float up| float down popup 

`iapToggleSiblingPopup`: show/hide the sibling next to it when clicked.
    - Input: 
        + `animation`: `up|down` float up| float down popup 

`iapInputNumber`: force text input only type numberic.
    - Input: 
        + `isRealNumber`: `true|false` input decimal number. Default: `false`
        + `acceptNegative`: `true|false` input negative number. Default: `false`
    - How to use: 
        + Create `input` element with type=`text`
    - Example: 
        <input type="text" 
        iapInputNumber 
        [isRealNumber]="true" 
        [acceptNegative]="true">
`iapTextColor` : add text color for element
    - How to use: 
        Add attribute `iapTextcolor` for any element to color
    - Ex: 
       +  <div iapTextColor="{{color}}">This is colored text with 'color' as variable</div>
       +  <p iapTextColor="red">This is colored text with red</p>
`iapControl` : 
    - How to use:
       + Add attribute `iapControl` to element
    - Ex:
       +  <div iapControl="controlName">This control hide or show return from serve with JSON {control: "controlName", isShow: true}</div>

`iapDropdownLoader`: show loader when request data for dropdown.
    - How to use: 
        + Add directive `iapDropdownLoader` to `mat-select` element.
        + Input: `url` (required), `params` (optional)
        + Output: `dataChange` (required)
        + Ex: 
            <mat-select placeholder="Choose an option" iapDropdownLoader [url]="abc.com" [params]="HttpParams" (dataChange)="handleDataChange($event)">
                <mat-option *ngFor="let option of data" value="option.id">{{option.value}}</mat-option>
            </mat-select>
        
            



################# Note for deployment #####################
There are 2 ways for deployment: 
    1. run `ng build --prod` then copy Web.config file in root directory to /dist.
    2. run `npm run production`


################# Web Config ############################
Store environment variable for application. Can change at run time (doesnt need to redeploy).

How to use: 
 - There are 3 files that store config setting: 
    `dev.config.json`: variables for development stage.
    `prod.config.json`: variables for production stage.
    `stage.config.json`: reserved.
- Add key: open these files above and update the object base on JSON format. And then add properties for `AppConfig` model in `app-config.model.ts` file.

- Get key: 
 + Import `APP_CONFIG` variable from `app-config.service`.
 + Example Use: console.log(APP_CONFIG.hostApi);
