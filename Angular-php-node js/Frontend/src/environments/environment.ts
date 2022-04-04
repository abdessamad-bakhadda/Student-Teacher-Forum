// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false ,
  debut_url : "http://127.0.0.1:3000/" ,
  // backend en php , debut_url :"http://localhost:63344/app_web_mobiles/Tps_me/forum-angular-php/backend/tp2/" ,
  // backend en Node/Express ,debut_url : "http://127.0.0.1:3000/" ,
  //63344 au lieu de 63343 ça crée parfois des problèmes
  // url de mon backend pas celui du prof
  //http://localhost:63343/app_web_mobiles/Tps_me/forum-angular-php/backend/tp2/ +  checkLogin   + .php
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
